import React from 'react';
import { Avatar } from './Avatar';

const EndingSection: React.FC = () => {
    return (
        <section className="py-20 px-4 bg-gradient-to-t from-[#6E4C1E] to-[#D2B48C]">
            <div className="container mx-auto max-w-3xl text-center text-white">
                <h2 className="text-4xl md:text-6xl font-bold font-chalk drop-shadow-lg mb-8">
                    See you soon, machi!
                </h2>
                
                <div className="flex justify-center items-center gap-4 sm:gap-8 animate-pulse">
                    <div className="transform -rotate-12">
                      <Avatar isTalking={false} size="w-24 h-24 sm:w-32 sm:h-32" src="https://api.dicebear.com/8.x/adventurer/svg?seed=Max&backgroundColor=d1d4f9"/>
                    </div>
                    <Avatar isTalking={false} size="w-32 h-32 sm:w-40 sm:h-40" src="https://api.dicebear.com/8.x/adventurer/svg?seed=Bandit&backgroundColor=b6e3f4"/>
                    <div className="transform rotate-12">
                      <Avatar isTalking={false} size="w-24 h-24 sm:w-32 sm:h-32" src="https://api.dicebear.com/8.x/adventurer/svg?seed=Sheba&backgroundColor=c0aede"/>
                    </div>
                </div>

                <p className="mt-8 text-xl">Can't wait to catch up!</p>
            </div>
        </section>
    );
};

export default EndingSection;
