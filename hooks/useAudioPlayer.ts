import { useRef, useCallback } from 'react';

// Ensure AudioContext is defined in a way that works in SSR/Node environments
// Fix: Cast window to any to allow for vendor-prefixed webkitAudioContext
const AudioContext = window.AudioContext || (window as any).webkitAudioContext;

export const useAudioPlayer = () => {
    const audioContextRef = useRef<AudioContext | null>(null);

    const getAudioContext = useCallback(() => {
        if (!audioContextRef.current && AudioContext) {
            audioContextRef.current = new AudioContext();
        }
        return audioContextRef.current;
    }, []);

    const playAudioBuffer = useCallback(async (audioBuffer: AudioBuffer): Promise<void> => {
        return new Promise((resolve, reject) => {
            const context = getAudioContext();
            if (!context) {
                console.error("AudioContext not supported");
                return reject(new Error("AudioContext not supported"));
            }

            if (context.state === 'suspended') {
              context.resume();
            }

            const source = context.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(context.destination);
            source.onended = () => resolve();
            source.start();
        });
    }, [getAudioContext]);

    const playAudioFile = useCallback((url: string) => {
        const context = getAudioContext();
        if (context && context.state === 'suspended') {
            context.resume();
        }
        const audio = new Audio(url);
        audio.play().catch(e => console.error("Error playing audio file:", e));
    }, [getAudioContext]);

    return { playAudioBuffer, playAudioFile };
};
