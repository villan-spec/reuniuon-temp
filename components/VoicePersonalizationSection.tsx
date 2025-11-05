import React, { useState } from 'react';
import { useAudioRecorder } from '../hooks/useAudioRecorder';

const VoicePersonalizationSection: React.FC = () => {
    const {
        isRecording,
        startRecording,
        stopRecording,
        audioUrl,
        resetRecording,
    } = useAudioRecorder();
    const [uploadedAudioUrl, setUploadedAudioUrl] = useState<string | null>(null);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setUploadedAudioUrl(URL.createObjectURL(file));
            resetRecording(); // Clear any existing recording
        }
    };

    const finalAudioUrl = audioUrl || uploadedAudioUrl;

    return (
        <section className="py-20 px-4 bg-[#FDF6E4]" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/notebook-dark.png')" }}>
            <div className="container mx-auto max-w-3xl text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-800 font-chalk mb-4">Add Your Voice!</h2>
                <p className="text-lg text-gray-600 mb-8">Record a message or upload a clip to send with your RSVP!</p>
                
                <div className="bg-white p-8 rounded-lg shadow-xl border-2 border-dashed border-gray-300">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
                        <button
                            onClick={isRecording ? stopRecording : startRecording}
                            className={`w-full sm:w-auto px-6 py-3 font-bold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white`}
                        >
                            {isRecording ? (
                                <>
                                    <span className="w-4 h-4 bg-white rounded-sm animate-pulse"></span>
                                    Stop Recording
                                </>
                            ) : (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
                                    Record Voice
                                </>
                            )}
                        </button>
                        
                        <span className="text-gray-500 font-bold">OR</span>

                        <label htmlFor="audio-upload" className="w-full sm:w-auto px-6 py-3 font-bold rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300 cursor-pointer flex items-center justify-center gap-2">
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                             Upload File
                        </label>
                        <input id="audio-upload" type="file" accept="audio/*" className="hidden" onChange={handleFileUpload} />
                    </div>

                    {finalAudioUrl && (
                        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                            <h4 className="font-bold text-gray-700 mb-2">Your Message:</h4>
                            <audio controls src={finalAudioUrl} className="w-full">
                                Your browser does not support the audio element.
                            </audio>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default VoicePersonalizationSection;
