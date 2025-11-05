import React, { useState } from 'react';

const DetailsSection: React.FC = () => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <section className="py-20 px-4 bg-[#D2B48C] relative" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/wood-pattern.png')"}}>
             <div className="absolute top-0 left-0 w-full h-full bg-black/10"></div>
            <div className="container mx-auto max-w-3xl flex flex-col items-center relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold text-white font-chalk mb-8 text-center drop-shadow-lg">The Deets!</h2>
                
                <div 
                    className="w-full max-w-xl h-80 perspective-1000"
                    onClick={() => setIsFlipped(!isFlipped)}
                >
                    <div 
                        className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}
                    >
                        {/* Front of the page */}
                        <div className="absolute w-full h-full backface-hidden bg-white rounded-lg shadow-2xl p-6 flex flex-col items-center justify-center cursor-pointer"
                             style={{
                                backgroundImage: `
                                linear-gradient(90deg, #E8F1F5 1px, transparent 1px),
                                linear-gradient(#E8F1F5 1px, transparent 1px)`,
                                backgroundSize: '2rem 2rem',
                                borderLeft: '3px solid #FF6B6B'
                            }}
                        >
                            <h3 className="text-3xl font-bold text-gray-800 font-chalk">When & Where?</h3>
                            <p className="mt-4 text-gray-600 text-lg">Click to flip the page!</p>
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mt-4 text-gray-400 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                            </svg>
                        </div>

                        {/* Back of the page */}
                        <div className="absolute w-full h-full backface-hidden bg-white rounded-lg shadow-2xl p-6 flex flex-col justify-center transform rotate-y-180 cursor-pointer"
                            style={{
                                backgroundImage: `
                                linear-gradient(90deg, #E8F1F5 1px, transparent 1px),
                                linear-gradient(#E8F1F5 1px, transparent 1px)`,
                                backgroundSize: '2rem 2rem',
                                borderLeft: '3px solid #FF6B6B'
                            }}
                        >
                            <div className="text-gray-800 text-center">
                                <p className="font-bold text-2xl mb-2 font-chalk">Date:</p>
                                <p className="text-xl mb-4">Saturday, October 26th</p>
                                
                                <p className="font-bold text-2xl mb-2 font-chalk">Time:</p>
                                <p className="text-xl mb-4">6:00 PM Onwards</p>

                                <p className="font-bold text-2xl mb-2 font-chalk">Venue:</p>
                                <p className="text-xl">The Old School Hall (Just kidding, it's 'The Hangout Cafe')</p>
                            </div>
                        </div>
                    </div>
                </div>

                <button className="mt-10 px-8 py-4 bg-green-600 text-white font-bold text-xl rounded-lg shadow-lg hover:bg-green-700 transition-transform duration-200 hover:scale-105 hover:animate-bounce">
                    I'll be there! (RSVP)
                </button>
            </div>
            <style>{`
                .perspective-1000 { perspective: 1000px; }
                .transform-style-preserve-3d { transform-style: preserve-3d; }
                .rotate-y-180 { transform: rotateY(180deg); }
                .backface-hidden { backface-visibility: hidden; }
            `}</style>
        </section>
    );
}

export default DetailsSection;
