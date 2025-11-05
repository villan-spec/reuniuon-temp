import React from 'react';

interface AvatarProps {
  isTalking: boolean;
  size?: string;
  src?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ isTalking, size = 'w-48 h-48', src }) => {
  const talkingClass = isTalking ? 'animate-bounce' : '';
  const avatarImage = src || `https://api.dicebear.com/8.x/adventurer/svg?seed=Milo&mouth=variant1,variant2,variant3,variant4,variant5&backgroundColor=b6e3f4,c0aede,d1d4f9`;

  return (
    <div className={`relative ${size} transition-all duration-300`}>
      <img
        src={avatarImage}
        alt="Friend Avatar"
        className={`rounded-full border-4 border-white shadow-lg ${talkingClass}`}
      />
      {isTalking && (
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
            <span className="w-2 h-2 bg-white rounded-full animate-pulse" style={{animationDelay: '100ms'}}></span>
            <span className="w-2 h-2 bg-white rounded-full animate-pulse" style={{animationDelay: '200ms'}}></span>
        </div>
      )}
    </div>
  );
};
