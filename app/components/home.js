'use client';
import {
    Plus, ThumbsUp, MoreHorizontal, Heart
} from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useTheme } from '../config/themecontext';
import { useEffect } from 'react';

const themeColors = {
    light: {
        '--bg-primary': '#ffffff',
        '--bg-card': '#f9f9ffff', // dark navy like in the image
        '--text-primary': '#252627ff',
        '--text-secondary': '#373b40ff',
        '--accent': '#4F46E5',
        '--accent-hover': '#4338CA',
    },
    dark: {
        '--bg-primary': '#1f2937',
        '--bg-card': '#0b0a2b',
        '--text-primary': '#f9fafb',
        '--text-secondary': '#d1d5db',
        '--card-text': '#ffffff',
        '--accent': '#facc15',
        '--accent-hover': '#eab308',
    }
};

export default function Home() {
    const { theme } = useTheme();
    useEffect(() => {
        const root = document.documentElement;
        const colors = themeColors[theme];
        for (const key in colors) {
            root.style.setProperty(key, colors[key]);
        }
    }, [theme]);
    const profileData = {
        name: "Kelin Jasen",
        email: "kelin.jasen156@gmail.com",
        avatar: "https://placehold.co/100x100/A0AEC0/ffffff?text=KJ",
        bio: "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
        following: "546",
        likes: "26335",
        followers: "6845"
    };

    const storyColors = [
        "#512E91", "#E6982D", "#EC8989", "#D6C3B5",
        "#F8D94A", "#B3A4C4", "#EA9595", "#9E93AD"
    ];

    const postData = {
        author: "Sufiya Eliza",
        time: "30 Mins ago",
        avatar: "https://placehold.co/100x100/94A3B8/ffffff?text=SE",
        title: "Celebration new album song launched",
        content: "#Musiccelebration, #music, #party, #music\nLorem ipsum is simply dummy text of the printing and typesetting industry, has been the industry's standard dummy text ever since the 1500s",
        reactions: 12
    };

    const friendsList = [
        { name: "Paige Turner", location: "Alabama, USA", avatar: "https://placehold.co/100x100/94A3B8/ffffff?text=PT" },
        { name: "Bob Frapples", location: "Alabama, USA", avatar: "https://placehold.co/100x100/94A3B8/ffffff?text=BF" },
    ];

    return (
        <div className="container w-full mx-auto">
            <Swiper
                spaceBetween={15}
                slidesPerView={8}
                className="mt-5 px-2"
            >
                <SwiperSlide>
                    <div
                        className="w-full aspect-square rounded-lg shadow-md flex items-center justify-center flex-col cursor-pointer"
                        style={{
                            backgroundColor: "var(--bg-card)",
                            color: theme === 'dark' ? "var(--card-text)" : "var(--text-primary)"
                        }}
                    >
                        <Plus size={32} style={{ color: "var(--accent)" }} />
                        <p className="mt-2 text-sm font-semibold">Add Stories</p>
                    </div>
                </SwiperSlide>
                {storyColors.map((color, index) => (
                    <SwiperSlide key={index}>
                        <div
                            className="w-full aspect-square rounded-lg shadow-md"
                            style={{ backgroundColor: color }}
                        ></div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="mt-5 flex flex-col lg:flex-row gap-6 lg:gap-8">
                {/* Left Sidebar */}
                <div className="w-full lg:w-1/4 flex flex-col gap-6">
                    <div
                        className="rounded-lg shadow-md p-6"
                        style={{
                            backgroundColor: "var(--bg-card)",
                            color: theme === 'dark' ? "var(--card-text)" : "var(--text-primary)"
                        }}
                    >
                        <div className="flex flex-col items-center">
                            <img
                                src={profileData.avatar}
                                alt="Profile"
                                className="w-24 h-24 rounded-full border-4"
                                style={{ borderColor: "var(--bg-primary)" }}
                            />
                            <div className="text-center mt-4">
                                <h2 className="font-bold text-xl flex items-center justify-center">
                                    {profileData.name}{" "}
                                    <Heart
                                        className="h-4 w-4 ml-2 text-red-500"
                                        fill="currentColor"
                                    />
                                </h2>
                                <p style={{ color: "var(--text-secondary)" }}>
                                    {profileData.email}
                                </p>
                                <p
                                    className="mt-2 text-sm"
                                >
                                    {profileData.bio}
                                </p>
                            </div>
                            <div className="flex justify-around w-full mt-6 text-center">
                                {["Following", "Likes", "Followers"].map((label, idx) => {
                                    const value = [
                                        profileData.following,
                                        profileData.likes,
                                        profileData.followers
                                    ][idx];
                                    return (
                                        <div key={label}>
                                            <p className="font-bold">{value}</p>
                                            <p style={{ color: "var(--text-secondary)" }}>{label}</p>
                                        </div>
                                    );
                                })}
                            </div>
                            <button
                                className="mt-6 w-full py-2 font-semibold rounded-full hover:opacity-90 transition-colors"
                                style={{ backgroundColor: "var(--accent)", color: "var(--text-primary)" }}
                            >
                                View Profile
                            </button>
                        </div>
                    </div>
                </div>

                {/* Center Content */}
                <div className="w-full lg:w-1/2 flex flex-col gap-6">
                    <div
                        className="rounded-lg shadow-md p-6"
                        style={{
                            backgroundColor: "var(--bg-card)",
                            color: theme === 'dark' ? "var(--card-text)" : "var(--text-primary)"
                        }}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <p className="font-bold">Create Post</p>
                            <MoreHorizontal
                                className="cursor-pointer"
                                style={{ color: "var(--text-secondary)" }}
                            />
                        </div>
                        <textarea
                            placeholder="Write Something Here..."
                            className="w-full p-2 rounded-lg focus:outline-none"
                            style={{
                                backgroundColor: "var(--bg-primary)",
                                color: "var(--text-primary)"
                            }}
                            rows="3"
                        ></textarea>
                    </div>

                    <div
                        className="rounded-lg shadow-md p-6"
                        style={{
                            backgroundColor: "var(--bg-card)",
                            color: theme === 'dark' ? "var(--card-text)" : "var(--text-primary)"
                        }}
                    >
                        <div className="flex items-center space-x-4 mb-4">
                            <img
                                src={postData.avatar}
                                alt="Author"
                                className="w-12 h-12 rounded-full"
                            />
                            <div>
                                <p className="font-bold">{postData.author}</p>
                                <p style={{ color: "var(--text-secondary)" }}>
                                    {postData.time}
                                </p>
                            </div>
                        </div>
                        <h3 className="font-bold mb-2">{postData.title}</h3>
                        <p>{postData.content}</p>
                        <div
                            className="flex items-center mt-4"
                            style={{ color: "var(--text-secondary)" }}
                        >
                            <ThumbsUp size={16} />{" "}
                            <span className="ml-1">
                                +{postData.reactions} people react this post
                            </span>
                        </div>
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="w-full lg:w-1/4 flex flex-col gap-6">
                    <div
                        className="rounded-lg shadow-md p-4"
                        style={{
                            backgroundColor: "var(--bg-card)",
                            color: theme === 'dark' ? "var(--card-text)" : "var(--text-primary)"
                        }}
                    >
                        <h2 className="font-bold mb-2">FIND MY DANDIYA PARTNER</h2>
                        <img
                            src="https://placehold.co/400x200/F56565/ffffff?text=Dandiya Partner"
                            alt="Dandiya Partner"
                            className="rounded-lg w-full"
                        />
                    </div>
                    <div
                        className="rounded-lg shadow-md p-4"
                        style={{
                            backgroundColor: "var(--bg-card)",
                            color: theme === 'dark' ? "var(--card-text)" : "var(--text-primary)"
                        }}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <span className="font-bold">Friends</span>
                            <MoreHorizontal className="cursor-pointer" />
                        </div>
                        {friendsList.map((friend, index) => (
                            <div
                                key={index}
                                className="flex items-center space-x-3 mb-3"
                            >
                                <img
                                    src={friend.avatar}
                                    alt="Friend"
                                    className="w-10 h-10 rounded-full"
                                />
                                <div>
                                    <p className="font-semibold">{friend.name}</p>
                                    <p style={{ color: "var(--text-secondary)" }}>
                                        {friend.location}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
