'use client';
import React, { useEffect, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function StoryViewer({ stories = [], onClose, selectedIndex = 0 }) {
    const [currentIndex, setCurrentIndex] = useState(selectedIndex);
    const [progress, setProgress] = useState(0);

    const totalStories = stories.length;

    useEffect(() => {
        let interval;

        if (progress < 100) {
            interval = setInterval(() => {
                setProgress((prev) => Math.min(prev + 1, 100));
            }, 30); // speed of progress
        } else {
            handleNext();
        }

        return () => clearInterval(interval);
    }, [progress]);

    useEffect(() => {
        setProgress(0);
    }, [currentIndex]);

    const handleNext = () => {
        if (currentIndex < totalStories - 1) {
            setCurrentIndex((prev) => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1);
        }
    };

    // New effect to handle the end of all stories
    useEffect(() => {
        if (progress === 100 && currentIndex === totalStories - 1) {
            // Optional: Close the viewer or show a message when all stories are done
            // onClose();
        }
    }, [progress, currentIndex, totalStories, onClose]);


    if (!stories[currentIndex]) return null;

    return (
        <div className="fixed inset-0 z-50 flex flex-col md:flex-row mt-20 h-screen md:h-auto">
            {/* Left Side - Stories List */}
            <div className="w-full md:w-[30%] bg-gray-800 h-[40%] md:h-[90%] rounded-b-lg md:rounded-lg p-4 overflow-y-auto">
                <div className='flex gap-5 justify-between items-center'>
                    <h2 className="font-bold text-lg md:text-2xl">Stories</h2>
                    <button
                        className="text-white w-9 h-9 hover:text-gray-400 hover:bg-gray-300 rounded-full flex items-center justify-center"
                        onClick={onClose}
                    >
                        <XMarkIcon className="h-6 w-6 text-red-300" />
                    </button>
                </div>

                <div className="mb-4">
                    <div className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gray-100 flex items-center justify-center shadow-md">
                            <PlusIcon className="w-5 h-5 md:w-6 md:h-6 text-blue-500" />
                        </div>
                        <div>
                            <p className="font-medium text-sm md:text-base">Create a story</p>
                            <p className="text-xs md:text-sm text-gray-500">Share a photo or write something.</p>
                        </div>
                    </div>
                </div>

                <div className="hidden md:block">
                    {stories.map((story, index) => (
                        <div
                            key={story.id}
                            onClick={() => setCurrentIndex(index)}
                            className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer mb-2 ${index === currentIndex ? "bg-blue-100 font-semibold" : "hover:bg-gray-100"}`}
                        >
                            <img src={story.image} alt="story-thumb" className="w-12 h-12 md:w-16 md:h-16 rounded-full" />
                            <div>
                                <p>{story.username}</p>
                                <p className="text-xs text-gray-500">13h</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Side - Story Viewer */}
            <div className="flex-1 w-full md:w-[70%] bg-black relative flex items-center justify-center h-[60%] md:h-[90%]">
                {/* Progress bars */}
                <div className="absolute top-4 md:top-6 left-4 md:left-6 right-4 md:right-6 flex gap-2 px-2 z-10">
                    {stories.map((_, i) => (
                        <div key={i} className="flex-1 bg-gray-700 h-1 rounded overflow-hidden">
                            <div
                                className={`h-full ${i < currentIndex ? 'bg-gray-800' : i === currentIndex ? 'bg-gray-800' : 'bg-transparent'}`}
                                style={{
                                    width: i === currentIndex ? `${progress}%` : i < currentIndex ? '100%' : '0%',
                                    transition: 'width 0.2s linear',
                                }}
                            />
                        </div>
                    ))}
                </div>

                {/* Image */}
                <img
                    src={stories[currentIndex].image}
                    alt={`Story ${currentIndex + 1}`}
                    className="max-h-[85%] max-w-full object-contain"
                />

                {/* Previous Button */}
                {currentIndex > 0 && (
                    <button
                        onClick={handlePrevious}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/50 p-2 rounded-full hover:bg-black hidden md:block"
                    >
                        <ChevronLeftIcon className="h-6 w-6" />
                    </button>
                )}

                {/* Next Button */}
                {currentIndex < totalStories - 1 && (
                    <button
                        onClick={handleNext}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/50 p-2 rounded-full hover:bg-black hidden md:block"
                    >
                        <ChevronRightIcon className="h-6 w-6" />
                    </button>
                )}

                {/* Mobile Navigation */}
                <div className="absolute inset-0 flex">
                    <div onClick={handlePrevious} className="flex-1"></div>
                    <div onClick={handleNext} className="flex-1"></div>
                </div>
            </div>
        </div>
    );
}