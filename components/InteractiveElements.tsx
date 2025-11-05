import React, { useState } from 'react';
import { useAudioPlayer } from '../hooks/useAudioPlayer';

interface InteractiveBellProps {
  onInteract: () => void;
}
export const InteractiveBell: React.FC<InteractiveBellProps> = ({ onInteract }) => {
  const [isRinging, setIsRinging] = useState(false);
  const { playAudioFile } = useAudioPlayer();

  const handleBellClick = () => {
    onInteract();
    playAudioFile('https://cdn.pixabay.com/download/audio/2021/08/04/audio_c683b58145.mp3');
    setIsRinging(true);
    setTimeout(() => setIsRinging(false), 500); // Animation duration
  };

  const ringingClass = isRinging ? 'animate-swing' : '';

  return (
    <button
      onClick={handleBellClick}
      className="p-3 bg-yellow-400 rounded-full shadow-lg hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-opacity-50"
      aria-label="Ring the school bell"
    >
      <style>{`
        @keyframes swing {
          20% { transform: rotate3d(0, 0, 1, 15deg); }
          40% { transform: rotate3d(0, 0, 1, -10deg); }
          60% { transform: rotate3d(0, 0, 1, 5deg); }
          80% { transform: rotate3d(0, 0, 1, -5deg); }
          100% { transform: rotate3d(0, 0, 1, 0deg); }
        }
        .animate-swing {
          animation: swing 0.5s ease-in-out;
          transform-origin: top center;
        }
      `}</style>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`h-8 w-8 text-gray-800 transition-transform duration-300 ${ringingClass}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
        />
      </svg>
    </button>
  );
};