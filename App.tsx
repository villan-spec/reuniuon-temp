import React, { useState, useEffect, useRef } from 'react';
import HeroSection from './components/HeroSection';
import DetailsSection from './components/DetailsSection';
import VoicePersonalizationSection from './components/VoicePersonalizationSection';
import EndingSection from './components/EndingSection';

const App: React.FC = () => {
  const [userInteracted, setUserInteracted] = useState(false);
  const [userName, setUserName] = useState('');
  const classroomChatterRef = useRef<HTMLAudioElement>(null);
  const birdsSoundRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (userInteracted) {
      classroomChatterRef.current?.play().catch(e => console.error("Audio play failed:", e));
      birdsSoundRef.current?.play().catch(e => console.error("Audio play failed:", e));
    }
  }, [userInteracted]);

  const handleInteraction = () => {
    if (!userInteracted && userName.trim()) {
      setUserInteracted(true);
    } else {
        alert('Please enter your name!');
    }
  };

  return (
    <div 
      className="bg-[#FDF6E4] min-h-screen overflow-x-hidden"
      style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/notebook-dark.png')" }}
    >
      {!userInteracted && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center text-white text-center p-4">
          <div className="bg-gray-800 p-8 rounded-lg shadow-2xl animate-fade-in w-full max-w-sm">
            <h2 className="text-3xl font-bold mb-4 font-chalk">Welcome Back, Friend!</h2>
            <p className="text-lg mb-6">What should we call you?</p>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your name..."
              className="w-full px-4 py-2 mb-6 text-black rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 font-sans"
              onKeyUp={(e) => e.key === 'Enter' && handleInteraction()}
            />
            <button 
              onClick={handleInteraction}
              disabled={!userName.trim()}
              className="px-6 py-3 bg-yellow-500 text-gray-900 font-bold rounded-lg hover:bg-yellow-400 transition-all duration-200 hover:scale-105 disabled:bg-gray-500 disabled:cursor-not-allowed disabled:scale-100"
            >
              Let's Go!
            </button>
          </div>
        </div>
      )}
      
      <main className="relative">
        <HeroSection onInteract={handleInteraction} hasInteracted={userInteracted} userName={userName} />
        <DetailsSection />
        <VoicePersonalizationSection />
        <EndingSection />
      </main>
      
      {/* Background audio files */}
      <audio ref={classroomChatterRef} src="https://cdn.pixabay.com/audio/2022/02/11/audio_a62d0a876a.mp3" loop volume={0.1}></audio>
      <audio ref={birdsSoundRef} src="https://cdn.pixabay.com/audio/2022/04/19/audio_34b07147b3.mp3" loop volume={0.05}></audio>
    </div>
  );
};

export default App;