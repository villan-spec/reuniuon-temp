import { useState, useRef, useCallback } from 'react';

export const useAudioRecorder = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);

    const startRecording = useCallback(async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream);
            
            mediaRecorderRef.current.ondataavailable = (event) => {
                audioChunksRef.current.push(event.data);
            };

            mediaRecorderRef.current.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
                const url = URL.createObjectURL(audioBlob);
                setAudioUrl(url);
                audioChunksRef.current = [];
                // Stop all tracks to release microphone
                stream.getTracks().forEach(track => track.stop());
            };
            
            audioChunksRef.current = [];
            mediaRecorderRef.current.start();
            setIsRecording(true);
            setAudioUrl(null);
        } catch (err) {
            console.error("Error starting recording:", err);
            alert("Could not start recording. Please make sure microphone access is allowed.");
        }
    }, []);

    const stopRecording = useCallback(() => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    }, [isRecording]);

    const resetRecording = useCallback(() => {
      setAudioUrl(null);
    }, []);

    return { isRecording, startRecording, stopRecording, audioUrl, resetRecording };
};
