'use client';
import React, { useState } from 'react';
import {
    FaceSmileIcon,
    HeartIcon,
    StarIcon,
    SunIcon,
    MoonIcon,
} from '@heroicons/react/24/solid';
import { ChatBubbleLeftRightIcon, PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

const bgColors = [
    'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-400', 'bg-pink-500',
    'bg-purple-500', 'bg-orange-500', 'bg-teal-500', 'bg-gray-500', 'bg-indigo-500',
    'bg-gradient-to-r from-pink-500 to-yellow-500',
    'bg-gradient-to-r from-green-400 to-blue-500',
    'bg-gradient-to-r from-indigo-400 to-purple-500',
    'bg-gradient-to-r from-yellow-400 to-red-500',
    'bg-gradient-to-r from-cyan-400 to-blue-500',
];

const iconBgs = [
    { key: 'smile', icon: <FaceSmileIcon className="h-10 w-10 text-gray-700" /> },
    { key: 'heart', icon: <HeartIcon className="h-10 w-10 text-red-500" /> },
    { key: 'star', icon: <StarIcon className="h-10 w-10 text-yellow-500" /> },
    { key: 'sun', icon: <SunIcon className="h-10 w-10 text-orange-400" /> },
    { key: 'moon', icon: <MoonIcon className="h-10 w-10 text-indigo-500" /> },
];


export default function Page() {
    const [type, setType] = useState(null);
    const [text, setText] = useState('');
    const [photo, setPhoto] = useState(null);
    const [bgClass, setBgClass] = useState('bg-gray-800');
    const [iconBg, setIconBg] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) setPhoto(URL.createObjectURL(file));
    };

    const handleDiscard = () => {
        setText('');
        setPhoto(null);
        setType(null);
        setBgClass('bg-gray-800');
        setIconBg(null);
        setShowConfirm(false);
    };

    const userName = "Bheema Guguloth";
    const userProfilePic = "https://placehold.co/40x40/000000/FFFFFF?text=BG";
    const router = useRouter();

    return (
        <div className="h-screen flex flex-col md:flex-row font-sans">
            {/* Left Sidebar for User Info (Visible on all devices, but layout changes) */}
            <div className="w-full md:w-1/4 bg-gray-800 p-4 shadow-md flex flex-col items-center border-b md:border-b-0 md:border-r border-gray-200">
                <div className="flex items-center justify-between w-full mb-4 md:mb-6">
                    <h2 className="font-bold text-lg md:text-xl text-gray-800">Your story</h2>
                    <XMarkIcon onClick={() => router.back()} className="h-6 w-6 text-gray-500 cursor-pointer hover:text-gray-700" />
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg w-full hover:bg-gray-100 cursor-pointer transition-colors">
                    <img
                        src={userProfilePic}
                        alt="User Profile"
                        className="w-10 h-10 rounded-full object-cover"
                        onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/40x40/CCCCCC/000000?text=User"; }}
                    />
                    <span className="font-semibold text-gray-700">{userName}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-auto text-gray-500 hidden md:block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="3" />
                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1.51-1V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                    </svg>
                </div>
                <hr className="w-full border-t border-gray-300 my-4" />
            </div>

            {/* Right Content Area */}
            <div className="flex-1 bg-gray-200 p-4 md:p-6 flex flex-col items-center justify-start md:justify-center">
                <div className="w-full max-w-5xl flex flex-col items-center">
                    {!type && (
                        <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-6 mt-4 md:mt-10 w-full">
                            {/* Photo Story Button */}
                            <button
                                onClick={() => setType('photo')}
                                className="w-full md:w-64 h-48 md:h-96 rounded-xl cursor-pointer bg-gradient-to-br from-indigo-500 to-blue-300 flex flex-col items-center justify-center shadow-lg hover:scale-105 transition"
                            >
                                <div className="bg-gray-800 rounded-full p-4 mb-4">
                                    <PhotoIcon className="h-8 w-8 md:h-10 md:w-10 text-indigo-500" />
                                </div>
                                <span className="text-white text-base md:text-lg font-semibold">Create a Photo Story</span>
                            </button>
                            {/* Text Story Button */}
                            <button
                                onClick={() => setType('text')}
                                className="w-full md:w-64 h-48 md:h-96 rounded-xl cursor-pointer bg-gradient-to-br from-pink-500 to-purple-500 flex flex-col items-center justify-center shadow-lg hover:scale-105 transition"
                            >
                                <div className="bg-gray-800 rounded-full p-4 mb-4">
                                    <ChatBubbleLeftRightIcon className="h-8 w-8 md:h-10 md:w-10 text-pink-500" />
                                </div>
                                <span className="text-white text-base md:text-lg font-semibold">Create a Text Story</span>
                            </button>
                        </div>
                    )}

                    {type === 'photo' && (
                        <div className="mt-6 flex flex-col items-center w-full max-w-lg">
                            <label className="flex items-center justify-center p-4 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-100 transition w-full">
                                <PhotoIcon className="h-5 w-5 mr-2" />
                                <span>Upload a Photo</span>
                                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                            </label>
                            {photo && (
                                <img src={photo} alt="Preview" className="mt-4 w-full h-auto object-cover max-h-96 rounded shadow-lg" />
                            )}
                            <div className="mt-4 flex gap-4 w-full justify-end">
                                <button onClick={() => setShowConfirm(true)} className="px-4 py-2 rounded hover:bg-gray-400 transition">Discard</button>
                                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Share Story</button>
                            </div>
                        </div>
                    )}

                    {type === 'text' && (
                        <div className="mt-6 w-full flex flex-col gap-6 max-w-3xl">
                            <div className="flex flex-col lg:flex-row gap-6">
                                <div className="flex-1">
                                    <textarea
                                        value={text}
                                        onChange={(e) => setText(e.target.value)}
                                        placeholder="Write your story..."
                                        className="w-full p-4 text-base md:text-xl rounded resize-none h-32 md:h-40 shadow text-gray-800 focus:outline-none"
                                    />
                                    <h3 className="mt-4 font-semibold">Choose Background</h3>
                                    <div className="grid grid-cols-5 md:grid-cols-6 gap-2 mt-2">
                                        {bgColors.map((bg, i) => (
                                            <div
                                                key={i}
                                                className={`w-8 h-8 md:w-10 md:h-10 rounded-full cursor-pointer border-2 ${bg} ${bgClass === bg ? 'border-blue-500 scale-110' : 'border-transparent'}`}
                                                onClick={() => { setBgClass(bg); setIconBg(null); }}
                                            />
                                        ))}
                                    </div>
                                    <h3 className="mt-4 font-semibold">Or Choose an Icon Background</h3>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {iconBgs.map(({ key, icon }) => (
                                            <div
                                                key={key}
                                                className={`cursor-pointer w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full border-2 hover:scale-110 transition ${iconBg && iconBg.key === key ? 'border-blue-500' : 'border-transparent'}`}
                                                onClick={() => { setIconBg({ key, icon }); setBgClass('bg-gray-800'); }}
                                            >
                                                {icon}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-800">Preview</h3>
                                    <div className={`mt-2 p-4 md:p-6 h-60 rounded-lg shadow flex items-center justify-center text-center text-xl md:text-3xl font-bold ${bgClass}`}>
                                        {iconBg ? iconBg.icon : text || <span className="text-gray-500">Your preview will appear here</span>}
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end gap-4 mt-4">
                                <button onClick={() => setShowConfirm(true)} className="px-4 py-2  rounded hover:bg-gray-400 transition">Discard</button>
                                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Share Story</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Discard Confirmation Modal */}
            {showConfirm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-50 p-4">
                    <div className="bg-gray-800 p-6 rounded shadow-lg max-w-sm w-full text-center">
                        <p className="text-lg font-semibold mb-2">Are you sure you want to discard this story?</p>
                        <p className="text-sm text-gray-600 mb-6">Your story won&apos;t be saved.</p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="px-4 py-2 rounded hover:bg-gray-300 transition"
                            >
                                Continue Editing
                            </button>
                            <button
                                onClick={handleDiscard}
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                            >
                                Discard
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
