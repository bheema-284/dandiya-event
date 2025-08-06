export default function PostFeed({ posts }) {
    return (
        <div className="bg-white p-6 w-full rounded-lg shadow">
            {posts.length === 0 ? (
                <p className="text-gray-400">No posts yet.</p>
            ) : (
                posts.map((post) => (
                    <div key={post.id} className="border-b border-gray-200 py-4 last:border-b-0">
                        {/* Display text if present */}
                        {post.text && (
                            <div className={`p-3 rounded-lg mb-2 ${post.color || 'bg-gray-100 text-gray-800'}`}>
                                <p className={post.color ? 'text-black' : 'text-gray-800'}>
                                    {post.text}
                                </p>
                            </div>
                        )}

                        {/* Display image if imageUrl is present */}
                        {post.imageUrl && (
                            <div className="w-full h-auto rounded-lg overflow-hidden mb-2">
                                <img
                                    src={post.imageUrl}
                                    alt={post.text || "Post image"}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        // Fallback for broken images
                                        e.target.onerror = null;
                                        e.target.src = "https://placehold.co/600x400/CCCCCC/000000?text=Image+Not+Found";
                                    }}
                                />
                            </div>
                        )}

                        {/* Display video placeholder if videoUrl is present */}
                        {post.videoUrl && (
                            <div className="relative w-full h-48 bg-gray-300 flex items-center justify-center rounded-lg overflow-hidden mb-2">
                                {/* Simple play icon for video placeholder */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-16 w-16 text-white opacity-75"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                                <p className="absolute bottom-2 right-2 text-white text-xs bg-black bg-opacity-50 px-2 py-1 rounded">Video Preview</p>
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    );
}
