import React, { useState, useEffect } from 'react';

const TEXT_TO_TYPE = "பழைய கதைகள், புதிய நினைவுகள். மீண்டும் சந்தித்து மேலும் உருவாக்குவோம்!";

export const Chalkboard: React.FC = () => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    setDisplayedText(''); // Reset on mount
    let i = 0;
    const intervalId = setInterval(() => {
      setDisplayedText(TEXT_TO_TYPE.substring(0, i + 1));
      i++;
      if (i === TEXT_TO_TYPE.length) {
        clearInterval(intervalId);
      }
    }, 80); // Typing speed
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="bg-[#2C5F2D] border-8 border-[#6E4C1E] rounded-lg p-6 shadow-2xl w-full max-w-md transform rotate-[-2deg] hover:rotate-0 transition-transform duration-300">
      <h2 className="text-3xl md:text-4xl text-white font-chalk border-b-2 border-dashed border-gray-400 pb-2 mb-4 font-tamil">
        நமது ரீயூனியன்!
      </h2>
      <p className="text-white text-lg md:text-xl font-chalk h-24 font-tamil">
        {displayedText}
        <span className="animate-pulse">_</span>
      </p>
    </div>
  );
};