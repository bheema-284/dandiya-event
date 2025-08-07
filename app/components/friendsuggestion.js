'use client';
import { useEffect, useRef } from 'react';
import { ArrowPathIcon, SunIcon } from '@heroicons/react/24/outline';

const friends = [
    {
        name: 'Josephin Water',
        status: 'Active Now',
        img: 'https://randomuser.me/api/portraits/women/15.jpg',
        gradient: 'from-red-400 to-red-300',
    },
    {
        name: 'Josephin Water',
        status: 'Active Now',
        img: 'https://randomuser.me/api/portraits/men/11.jpg',
        gradient: 'from-blue-500 to-indigo-500',
    },
    {
        name: 'Bheema G',
        status: 'Active Now',
        img: 'https://randomuser.me/api/portraits/men/25.jpg',
        gradient: 'from-green-500 to-green-400',
    },
    {
        name: 'Josephin Water',
        status: 'Active Now',
        img: 'https://randomuser.me/api/portraits/men/15.jpg',
        gradient: 'from-purple-500 to-purple-400',
    },
];

export default function FriendSuggestionCarousel() {
    const containerRef = useRef(null);

    useEffect(() => {
        const scrollContainer = containerRef.current;
        const cardWidth = 125; // Tailwind w-48 (12rem = 192px)
        const gap = 4; // Tailwind gap-4 (1rem = 16px)

        const interval = setInterval(() => {
            if (scrollContainer) {
                const maxScrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth;
                if (scrollContainer.scrollLeft >= maxScrollLeft - 10) {
                    scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    scrollContainer.scrollBy({ left: cardWidth + gap, behavior: 'smooth' });
                }
            }
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative bg-white p-6 rounded-lg shadow-xl w-full max-w-xl overflow-hidden">
            <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-semibold">Friend Suggestion</h2>
                <div className="flex gap-2">
                    <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                        <ArrowPathIcon className="w-5 h-5 text-gray-600" />
                    </button>
                    <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                        <SunIcon className="w-5 h-5 text-gray-600" />
                    </button>
                </div>
            </div>

            <div
                ref={containerRef}
                className="flex overflow-x-auto gap-4 scroll-smooth hide-scrollbar no-scrollbar"
                style={{ width: '100%' }}
            >
                {friends.map((friend, index) => (
                    <div
                        key={index}
                        className={`flex-shrink-0 w-32 h-40 rounded-2xl text-white relative bg-gradient-to-t ${friend.gradient}`}
                    >
                        <img
                            src={friend.img}
                            alt={friend.name}
                            className="absolute w-full h-full object-cover rounded-2xl opacity-60"
                        />
                        <div className="absolute bottom-4 left-4 z-10">
                            <h3 className="font-semibold text-lg">{friend.name}</h3>
                            <p className="text-sm">{friend.status}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
