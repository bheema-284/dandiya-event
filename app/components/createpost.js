import { useState } from 'react';

export default function CreatePost({ onAddPost }) {
    const [text, setText] = useState('');

    const handlePost = () => {
        onAddPost(text);
        setText('');
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-bold text-lg mb-2">Create Post</h3>
            <input
                type="text"
                placeholder="What's on your mind?"
                className="border rounded w-full p-2 mb-4"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <div className="flex space-x-2">
                <button
                    onClick={handlePost}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Add Post
                </button>
                <button className="border px-4 py-2 rounded text-gray-600">
                    Album
                </button>
                <button className="border px-4 py-2 rounded text-gray-600">
                    Tag Friends
                </button>
            </div>
        </div>
    );
}
