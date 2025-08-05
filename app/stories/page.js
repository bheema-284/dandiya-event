'use client';
import React, { useState } from 'react';
import {
    FaceSmileIcon,
    HeartIcon,
    StarIcon,
    SunIcon,
    MoonIcon,
} from '@heroicons/react/24/solid';
import { ChatBubbleLeftRightIcon, PhotoIcon } from '@heroicons/react/24/outline';

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
    const [bgClass, setBgClass] = useState('bg-white');
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
        setBgClass('bg-white');
        setIconBg(null);
        setShowConfirm(false);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
            <h2 className="text-2xl font-bold mb-4">Create Your Story</h2>

            {!type && (
                <div className="flex justify-center gap-6 mt-10 cursor-pointer">
                    {/* Photo Story Button */}
                    <button
                        onClick={() => setType('photo')}
                        className="w-64 h-80 rounded-xl cursor-pointer bg-gradient-to-br from-indigo-500 to-blue-300 flex flex-col items-center justify-center shadow-lg hover:scale-105 transition"
                    >
                        <div className="bg-white rounded-full p-4 mb-4">
                            <PhotoIcon className="h-10 w-10 text-indigo-500" />
                        </div>
                        <span className="text-white text-lg font-semibold">Create a Photo Story</span>
                    </button>

                    {/* Text Story Button */}
                    <button
                        onClick={() => setType('text')}
                        className="w-64 h-80 rounded-xl cursor-pointer bg-gradient-to-br from-pink-500 to-purple-500 flex flex-col items-center justify-center shadow-lg hover:scale-105 transition"
                    >
                        <div className="bg-white rounded-full p-4 mb-4">
                            <ChatBubbleLeftRightIcon className="h-10 w-10 text-pink-500" />
                        </div>
                        <span className="text-white text-lg font-semibold">Create a Text Story</span>
                    </button>
                </div>
            )}

            {type === 'photo' && (
                <div className="mt-6">
                    <input type="file" accept="image/*" onChange={handleImageUpload} />
                    {photo && (
                        <img src={photo} alt="Preview" className="mt-4 w-64 h-64 object-cover rounded shadow" />
                    )}
                </div>
            )}

            {type === 'text' && (
                <div className="mt-6 w-full max-w-5xl flex flex-col gap-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                        <div className="flex-1">
                            <textarea
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                placeholder="Write your story..."
                                className="w-full p-4 text-xl rounded resize-none h-40 shadow"
                                style={{ backgroundColor: 'transparent' }}
                            />

                            <h3 className="mt-4 font-semibold">Choose Background Color</h3>
                            <div className="grid grid-cols-5 gap-2 mt-2">
                                {bgColors.map((bg, i) => (
                                    <div
                                        key={i}
                                        className={`w-8 h-8 rounded-full cursor-pointer ${bg}`}
                                        onClick={() => {
                                            setBgClass(bg);
                                            setIconBg(null);
                                        }}
                                    />
                                ))}
                            </div>

                            <h3 className="mt-4 font-semibold">Or Choose an Icon Background</h3>
                            <div className="flex mt-2 space-x-4">
                                {iconBgs.map(({ key, icon }) => (
                                    <div
                                        key={key}
                                        className="cursor-pointer w-12 h-12 flex items-center justify-center bg-white border rounded-full hover:scale-110 transition"
                                        onClick={() => {
                                            setIconBg(icon);
                                            setBgClass('bg-white');
                                        }}
                                    >
                                        {icon}
                                    </div>
                                ))}
                            </div>

                        </div>

                        {/* Preview section */}
                        <div className="flex-1">
                            <h3 className="font-semibold">Preview</h3>
                            <div className={`mt-2 p-6 h-60 rounded-lg shadow text-white text-center flex items-center justify-center text-3xl font-bold ${bgClass}`}>
                                {iconBg ? iconBg : text || 'Your preview will appear here'}
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-4 mt-4">
                        <button
                            className="px-4 cursor-pointer py-2 bg-gray-300 text-gray-800 rounded"
                            onClick={() => setShowConfirm(true)}
                        >
                            Discard
                        </button>
                        <button className="px-4 cursor-pointer py-2 bg-blue-600 text-white rounded">
                            Share Story
                        </button>
                    </div>
                </div>
            )}

            {/* Discard Confirmation Modal */}
            {showConfirm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/10 backdrop-blur-xs z-50">
                    <div className="bg-white p-6 rounded shadow-md max-w-md w-full text-center">
                        <p className="text-lg font-semibold mb-2">Are you sure you want to discard this story?</p>
                        <p className="text-sm text-gray-600 mb-6">Your story won&apos;t be saved.</p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="px-4 cursor-pointer py-2 bg-gray-200 hover:bg-blue-200 hover:text-white text-gray-800 rounded"
                            >
                                Continue Editing
                            </button>
                            <button
                                onClick={handleDiscard}
                                className="px-4 py-2 cursor-pointer bg-blue-600 text-white rounded"
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
