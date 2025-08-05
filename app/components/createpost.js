import { useState } from 'react';
// Importing icons from @heroicons/react/24/outline
import { CameraIcon, FaceSmileIcon, MapPinIcon, TagIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function CreatePost({ onAddPost }) {
    const [text, setText] = useState('');
    const [selectedColor, setSelectedColor] = useState(''); // State for selected background color (gradient class)
    const [showAlbumUpload, setShowAlbumUpload] = useState(false); // State to control album upload visibility
    const [placeholderIndex, setPlaceholderIndex] = useState(0); // State for changing textarea placeholder
    const [showSearchBox, setShowSearchBox] = useState(false); // State to control search box visibility
    const [searchPlaceholderIndex, setSearchPlaceholderIndex] = useState(0); // State for changing search box placeholder
    const [searchQuery, setSearchQuery] = useState(''); // State for search box input

    // Define gradient color palette data
    const gradientColors = [
        'bg-gradient-to-r from-pink-200 to-red-200',
        'bg-gradient-to-r from-blue-200 to-cyan-200',
        'bg-gradient-to-r from-gray-200 to-gray-400',
        'bg-gradient-to-r from-green-200 to-teal-200',
        'bg-gradient-to-r from-purple-200 to-indigo-200',
        'bg-gradient-to-r from-yellow-200 to-orange-200',
        'bg-gradient-to-r from-red-200 to-pink-300',
        'bg-gradient-to-r from-teal-200 to-blue-300',
        'bg-gradient-to-r from-indigo-200 to-purple-300',
        'bg-gradient-to-r from-lime-200 to-green-300',
        'bg-gradient-to-r from-cyan-200 to-blue-400',
        'bg-gradient-to-r from-fuchsia-200 to-pink-400',
        'bg-gradient-to-r from-rose-200 to-red-300'
    ];

    // Define an array of placeholder texts for the main textarea
    const placeholders = [
        "What's on your mind?",
        "Share something new...",
        "Tell us what's happening...",
        "Express yourself...",
        "Write a quick thought...",
    ];

    // Define an array of placeholder texts for the search box
    const searchPlaceholders = [
        "Search feelings...",
        "Search activities...",
        "Search locations...",
        "Search friends...",
        "Find something...",
    ];

    const handlePost = () => {
        onAddPost({ text, color: selectedColor, searchQuery }); // Pass text, color, and search query
        setText('');
        setSelectedColor(''); // Reset color after posting
        setShowAlbumUpload(false); // Hide album upload after posting
        setShowSearchBox(false); // Hide search box after posting
        setSearchQuery(''); // Clear search query
    };

    const handleClearColor = () => {
        setSelectedColor(''); // Clear the selected background color
    };

    const handleAlbumClick = () => {
        setShowAlbumUpload(!showAlbumUpload); // Toggle album upload visibility
        setShowSearchBox(false); // Hide search box if album is opened
    };

    const handleTextareaClick = () => {
        // Change placeholder on each click, cycling through the array
        setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
    };

    const handleSearchButtonClick = () => {
        setShowSearchBox(true); // Always show search box when these buttons are clicked
        setSearchPlaceholderIndex((prevIndex) => (prevIndex + 1) % searchPlaceholders.length); // Cycle search placeholder
        setShowAlbumUpload(false); // Hide album upload if search is opened
    };

    const handleCloseSearchBox = () => {
        setShowSearchBox(false);
        setSearchQuery(''); // Clear search query when closing
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow w-full mx-auto">
            <h3 className="font-bold text-lg mb-4 text-gray-800">Create Post</h3>

            {/* Textarea with icon and optional close button */}
            <div className="relative mb-4">
                <textarea
                    placeholder={placeholders[placeholderIndex]}
                    className={`border rounded-lg w-full p-3 pr-10 text-gray-700 focus:ring-blue-500 focus:border-blue-500 resize-none h-24 ${selectedColor}`}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onClick={handleTextareaClick} // Add onClick to change placeholder
                ></textarea>
                {selectedColor && ( // Show X icon only if a color is selected
                    <button
                        onClick={handleClearColor}
                        className="absolute right-3 top-3 text-gray-600 hover:text-gray-900"
                        aria-label="Clear selected color"
                    >
                        <XMarkIcon className="h-5 w-5" />
                    </button>
                )}
                {!selectedColor && ( // Show original icon only if no color is selected
                    <span className="absolute right-3 top-3 text-gray-400">
                        {/* Using a simple SVG for the icon, similar to the screenshot */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-type">
                            <polyline points="4 7 4 4 20 4 20 7" />
                            <line x1="9" x2="15" y1="20" y2="20" />
                            <line x1="12" x2="12" y1="4" y2="20" />
                        </svg>
                    </span>
                )}
            </div>

            {/* Color Palette */}
            <div className="flex flex-wrap gap-2 mb-4">
                {gradientColors.map((colorClass, index) => (
                    <div
                        key={index}
                        className={`w-6 h-6 rounded-full cursor-pointer ${colorClass} ${selectedColor === colorClass ? 'ring-2 ring-blue-500 ring-offset-1' : ''}`}
                        onClick={() => setSelectedColor(colorClass)}
                        title={colorClass.replace('bg-gradient-to-r from-', '').replace('to-', ' to ')} // Tooltip for color name
                    ></div>
                ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2 mb-4">
                <button
                    onClick={handleAlbumClick} // Add onClick for Album functionality
                    className="flex items-center space-x-2 border border-gray-300 px-4 py-2 rounded-full text-gray-700 hover:bg-gray-50 transition-colors"
                >
                    <CameraIcon className="h-5 w-5" />
                    <span>Album</span>
                </button>
                <button
                    onClick={handleSearchButtonClick} // Open search box for Feelings & Activity
                    className="flex items-center space-x-2 border border-gray-300 px-4 py-2 rounded-full text-gray-700 hover:bg-gray-50 transition-colors"
                >
                    <FaceSmileIcon className="h-5 w-5" />
                    <span>Feelings & Activity</span>
                </button>
                <button
                    onClick={handleSearchButtonClick} // Open search box for Check In
                    className="flex items-center space-x-2 border border-gray-300 px-4 py-2 rounded-full text-gray-700 hover:bg-gray-50 transition-colors"
                >
                    <MapPinIcon className="h-5 w-5" />
                    <span>Check In</span>
                </button>
                <button
                    onClick={handleSearchButtonClick} // Open search box for Tag Friends
                    className="flex items-center space-x-2 border border-gray-300 px-4 py-2 rounded-full text-gray-700 hover:bg-gray-50 transition-colors"
                >
                    <TagIcon className="h-5 w-5" />
                    <span>Tag Friends</span>
                </button>
            </div>

            {/* Simulated Album Upload Area */}
            {showAlbumUpload && (
                <div className="border border-dashed border-gray-400 rounded-lg p-6 text-center text-gray-500 mb-4">
                    <p>Click or drag to upload image(s)</p>
                    <input type="file" className="hidden" multiple />
                    <button className="mt-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200">
                        Browse Files
                    </button>
                </div>
            )}

            {/* Single Search Box for Feelings, Check-in, Tag Friends */}
            {showSearchBox && (
                <div className="relative mb-4">
                    <input
                        type="text"
                        placeholder={searchPlaceholders[searchPlaceholderIndex]}
                        className="border rounded-lg w-full p-3 pr-10 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button
                        onClick={handleCloseSearchBox}
                        className="absolute right-3 top-3 text-gray-600 hover:text-gray-900"
                        aria-label="Close search box"
                    >
                        <XMarkIcon className="h-5 w-5" />
                    </button>
                </div>
            )}

            {/* Post Button */}
            <button
                onClick={handlePost}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg w-full font-semibold hover:bg-blue-600 transition-colors shadow-md"
            >
                Post
            </button>
        </div>
    );
}
