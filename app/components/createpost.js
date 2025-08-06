import { useState } from 'react';
// Importing icons from @heroicons/react/24/outline
import { CameraIcon, FaceSmileIcon, MapPinIcon, TagIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function CreatePost({ onAddPost }) {
    // State for the main post content
    const [text, setText] = useState('');
    // State for the selected background color (gradient class)
    const [selectedColor, setSelectedColor] = useState('');
    // State for the image file to be uploaded
    const [imageFile, setImageFile] = useState(null);
    // State to control album upload visibility (now handled by the image preview)
    const [showAlbumUpload, setShowAlbumUpload] = useState(false);
    // State for changing textarea placeholder
    const [placeholderIndex, setPlaceholderIndex] = useState(0);
    // State to control search box visibility
    const [showSearchBox, setShowSearchBox] = useState(false);
    // State for changing search box placeholder
    const [searchPlaceholderIndex, setSearchPlaceholderIndex] = useState(0);
    // State for search box input
    const [searchQuery, setSearchQuery] = useState('');

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

    // Handles the file selection and sets the image state
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(URL.createObjectURL(file));
            setSelectedColor(''); // Clear color if an image is selected
            setShowAlbumUpload(false);
        }
    };

    // Handles clearing the selected image
    const handleClearImage = () => {
        setImageFile(null);
    };

    const handlePost = () => {
        // Pass all relevant data to the parent component
        onAddPost({ text, color: selectedColor, searchQuery, imageUrl: imageFile });
        // Reset all states after posting
        setText('');
        setSelectedColor('');
        setImageFile(null);
        setShowAlbumUpload(false);
        setShowSearchBox(false);
        setSearchQuery('');
    };

    const handleClearColor = () => {
        setSelectedColor(''); // Clear the selected background color
    };

    const handleAlbumClick = () => {
        // Now, this button simply toggles a visual state
        // The actual file input is handled by a hidden input element
        setShowAlbumUpload(!showAlbumUpload);
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
        <div className="bg-white p-6 rounded-lg shadow w-full mx-auto max-w-2xl">
            <h3 className="font-bold text-lg mb-4 text-gray-800">Create Post</h3>

            {/* Textarea for post content */}
            <div className="relative mb-4">
                <textarea
                    placeholder={placeholders[placeholderIndex]}
                    className={`z rounded-lg w-full p-3 pr-10 text-gray-700 focus:ring-blue-500 focus:border-blue-500 resize-none h-24 ${selectedColor}`}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onClick={handleTextareaClick}
                ></textarea>
                {selectedColor && (
                    <button
                        onClick={handleClearColor}
                        className="absolute right-3 top-3 text-gray-600 hover:text-gray-900"
                        aria-label="Clear selected color"
                    >
                        <XMarkIcon className="h-5 w-5" />
                    </button>
                )}
                {!selectedColor && (
                    <span className="absolute right-3 top-3 text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-type">
                            <polyline points="4 7 4 4 20 4 20 7" />
                            <line x1="9" x2="15" y1="20" y2="20" />
                            <line x1="12" x2="12" y1="4" y2="20" />
                        </svg>
                    </span>
                )}
            </div>

            {/* Image Preview */}
            {imageFile && (
                <div className="relative mb-4">
                    <img src={imageFile} alt="Post Preview" className="w-full h-auto max-h-96 object-cover rounded-lg shadow" />
                    <button
                        onClick={handleClearImage}
                        className="absolute top-2 right-2 p-1 bg-black/50 text-white rounded-full hover:bg-black/70 transition"
                        aria-label="Remove image"
                    >
                        <XMarkIcon className="h-5 w-5" />
                    </button>
                </div>
            )}

            {/* Color Palette */}
            <div className="flex flex-wrap gap-2 mb-4">
                {gradientColors.map((colorClass, index) => (
                    <div
                        key={index}
                        className={`w-6 h-6 rounded-full cursor-pointer ${colorClass} ${selectedColor === colorClass ? 'ring-2 ring-blue-500 ring-offset-1' : ''}`}
                        onClick={() => { setSelectedColor(colorClass); setImageFile(null); }} // Clear image when a color is selected
                        title={colorClass.replace('bg-gradient-to-r from-', '').replace('to-', ' to ')}
                    ></div>
                ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2 mb-4">
                <label className="flex items-center space-x-2 border border-gray-300 px-4 py-2 rounded-full text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer">
                    <CameraIcon className="h-5 w-5" />
                    <span>Album</span>
                    {/* Hidden input to handle file selection */}
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
                <button
                    onClick={handleSearchButtonClick}
                    className="flex items-center space-x-2 border border-gray-300 px-4 py-2 rounded-full text-gray-700 hover:bg-gray-50 transition-colors"
                >
                    <FaceSmileIcon className="h-5 w-5" />
                    <span>Feelings & Activity</span>
                </button>
                <button
                    onClick={handleSearchButtonClick}
                    className="flex items-center space-x-2 border border-gray-300 px-4 py-2 rounded-full text-gray-700 hover:bg-gray-50 transition-colors"
                >
                    <MapPinIcon className="h-5 w-5" />
                    <span>Check In</span>
                </button>
                <button
                    onClick={handleSearchButtonClick}
                    className="flex items-center space-x-2 border border-gray-300 px-4 py-2 rounded-full text-gray-700 hover:bg-gray-50 transition-colors"
                >
                    <TagIcon className="h-5 w-5" />
                    <span>Tag Friends</span>
                </button>
            </div>

            {/* Search Box */}
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
                className="bg-blue-500 cursor-pointer text-white px-6 py-3 rounded-lg w-full font-semibold hover:bg-blue-600 transition-colors shadow-md"
            >
                Post
            </button>
        </div>
    );
}

