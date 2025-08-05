export default function PostFeed({ posts }) {
    return (
        <div className="bg-white p-6 w-full rounded-lg shadow">
            {posts.length === 0 ? (
                <p className="text-gray-400">No posts yet.</p>
            ) : (
                posts.map((post) => (
                    <div key={post.id} className="border-b py-4">
                        <p>{post.text}</p>
                    </div>
                ))
            )}
        </div>
    );
}
