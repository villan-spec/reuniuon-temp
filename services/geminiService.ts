import { GoogleGenAI, Modality } from "@google/genai";
import { decode, decodeAudioData } from '../utils/audioUtils';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // This is a placeholder. In a real app, the key is expected to be set in the environment.
  console.warn("API_KEY environment variable not set. Please set it to use Gemini API.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });
const model = "gemini-2.5-flash-preview-tts";

export const generateSpeech = async (text: string): Promise<AudioBuffer | null> => {
    if (!API_KEY) {
        throw new Error("API key is not configured.");
    }
    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: [{ parts: [{ text: `Say with a very cheerful and friendly tone: ${text}` }] }],
            config: {
                responseModalities: [Modality.AUDIO],
                speechConfig: {
                    voiceConfig: {
                        prebuiltVoiceConfig: { voiceName: 'Puck' }, // A fun, expressive voice
                    },
                },
            },
        });

        const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

        if (base64Audio) {
            const audioBytes = decode(base64Audio);
            // Fix: Cast window to any to allow for vendor-prefixed webkitAudioContext
            const outputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
            return await decodeAudioData(audioBytes, outputAudioContext, 24000, 1);
        }
        return null;
    } catch (error) {
        console.error("Error generating speech with Gemini:", error);
        throw error;
    }
};
