// StoryViewer.jsx
import React, { useEffect, useState } from "react";

const StoryViewer = ({ stories, onClose, initialStoryIndex }) => {
    const [currentIndex, setCurrentIndex] = useState(initialStoryIndex || 0);

    useEffect(() => {
        setCurrentIndex(initialStoryIndex); // reset when prop changes
    }, [initialStoryIndex]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (currentIndex < stories.length - 1) {
                setCurrentIndex(currentIndex + 1);
            } else {
                onClose(); // Close viewer after last story
            }
        }, 3000); // 3 seconds per story

        return () => clearTimeout(timer);
    }, [currentIndex, stories.length, onClose]);

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black/10 backdrop-blur-xs flex flex-col items-center justify-center z-50">
            <div className="w-full p-20 relative rounded overflow-hidden shadow-lg bg-black/10 backdrop-blur-xs">
                {/* Progress bar */}
                <div className="absolute top-2 left-2 right-2 flex gap-1 z-10">
                    {stories.map((_, index) => (
                        <div
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className="h-1 flex-1 rounded-full bg-white/30 overflow-hidden cursor-pointer"
                        >
                            <div
                                key={currentIndex === index ? `active-${Date.now()}` : `inactive-${index}`}
                                className={`h-full transition-all ease-linear ${index < currentIndex
                                    ? "bg-white w-full"
                                    : index === currentIndex
                                        ? "bg-white animate-fill"
                                        : "w-0"
                                    }`}
                            ></div>
                        </div>
                    ))}
                </div>


                {/* Story Image */}
                <img
                    src={stories[currentIndex].image}
                    alt={`Story ${currentIndex}`}
                    className="w-full h-full object-cover"
                />

                {/* Close Button */}
                <button
                    className="absolute top-2 cursor-pointer right-2 text-white text-2xl font-bold z-10"
                    onClick={onClose}
                >
                    ×
                </button>
                <div className="flex items-center gap-2 p-2 rounded-md mt-2">
                    <input
                        type="text"
                        placeholder="Reply..."
                        className="flex-1 p-2 rounded bg-white text-black outline-none"
                    />
                    <button className="text-xl">😊</button>
                </div>

            </div>
        </div>
    );
};

export default StoryViewer;
