import { useTheme } from "../config/themecontext";

export default function ProfileCard() {
    const { theme } = useTheme();

    return (
        <div style={{
            backgroundColor: "var(--bg-card)",
            color: theme === 'dark' ? "var(--card-text)" : "var(--text-primary)"
        }} className="rounded-lg p-6 shadow w-full">
            <div className="flex flex-col items-center">
                <img
                    src="https://randomuser.me/api/portraits/women/12.jpg"
                    alt="profile"
                    className="rounded-full w-24 h-24 mb-4"
                />
                <h2 className="font-bold text-xl">Kelin Jasen ❤️</h2>
                <p className="text-gray-500 mb-2">kelin.jasen156@gmail.com</p>
                <p className="text-sm text-gray-400 mb-4">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                </p>
                <div className="flex justify-around w-full mb-4">
                    <div className="text-center">
                        <p className="font-bold">0</p>
                        <p className="text-xs text-gray-400">Following</p>
                    </div>
                    <div className="text-center">
                        <p className="font-bold">0</p>
                        <p className="text-xs text-gray-400">Likes</p>
                    </div>
                    <div className="text-center">
                        <p className="font-bold">0</p>
                        <p className="text-xs text-gray-400">Followers</p>
                    </div>
                </div>
                <button className="bg-blue-500 px-4 py-2 rounded">
                    View Profile
                </button>
            </div>
        </div>
    );
}
