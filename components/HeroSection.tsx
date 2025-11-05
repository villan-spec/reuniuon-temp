import React, { useState, useEffect, useCallback } from 'react';
import { generateSpeech } from '../services/geminiService';
import { useAudioPlayer } from '../hooks/useAudioPlayer';
import { Chalkboard } from './Chalkboard';
import { InteractiveBell } from './InteractiveElements';

interface HeroSectionProps {
  onInteract: () => void;
  hasInteracted: boolean;
  userName: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onInteract, hasInteracted, userName }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { playAudioBuffer } = useAudioPlayer();

  const handleGreeting = useCallback(async () => {
    if (isGenerating || !hasInteracted || !userName) return;
    setIsGenerating(true);
    try {
      const personalizedGreeting = `வணக்கம் ${userName}! ரொம்ப நாள் ஆச்சு பார்த்து! ரீயூனியனுக்கு ரெடியா?`;
      const audioBuffer = await generateSpeech(personalizedGreeting);
      if (audioBuffer) {
        await playAudioBuffer(audioBuffer);
      }
    } catch (error) {
      console.error("Failed to generate or play speech:", error);
      alert("Oops! Couldn't generate the welcome voice. Please check your API key and try again.");
    } finally {
      setIsGenerating(false);
    }
  }, [isGenerating, playAudioBuffer, hasInteracted, userName]);

  useEffect(() => {
    if (hasInteracted) {
      // Small delay to let the UI settle after the interaction overlay disappears.
      const timer = setTimeout(() => {
        handleGreeting();
      }, 500);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasInteracted]);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-cover bg-center" style={{backgroundImage: "url('https://picsum.photos/seed/classroom/1920/1080')"}}>
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
        <div className="relative z-10 w-full max-w-4xl flex flex-col items-center justify-center gap-12">
            <div className="w-full md:w-3/4 flex flex-col items-center animate-slide-in-up" style={{ animationDelay: '200ms' }}>
                <Chalkboard />
            </div>
            <div className="flex flex-col items-center animate-slide-in-up" style={{ animationDelay: '400ms' }}>
              <button 
                onClick={handleGreeting} 
                disabled={isGenerating || !hasInteracted}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 disabled:bg-gray-400 transition-all duration-300 flex items-center gap-2 text-lg font-bold font-tamil"
              >
                 {isGenerating ? 'பேசுகிறது...' : 'மீண்டும் வணக்கம் சொல்!'}
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 3a1 1 0 011 1v1.443a6.993 6.993 0 014.266 3.482 1 1 0 11-1.732.998A4.993 4.993 0 0010 7.557V10l3.707 3.707a1 1 0 01-1.414 1.414L10 12.414V16a1 1 0 11-2 0v-3.586l-2.293-2.293a1 1 0 011.414-1.414L10 10V4a1 1 0 01-1-1z" />
                    <path d="M10 3a1 1 0 011 1v1.443a6.993 6.993 0 014.266 3.482 1 1 0 11-1.732.998A4.993 4.993 0 0010 7.557V10l3.707 3.707a1 1 0 01-1.414 1.414L10 12.414V16a1 1 0 11-2 0v-3.586l-2.293-2.293a1 1 0 011.414-1.414L10 10V4a1 1 0 01-1-1z" clipRule="evenodd" />
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm0 2a10 10 0 100-20 10 10 0 000 20z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
        </div>
        <div className="absolute top-5 right-5 z-10 animate-fade-in" style={{ animationDelay: '500ms' }}>
            <InteractiveBell onInteract={onInteract} />
        </div>
    </section>
  );
};

export default HeroSection;