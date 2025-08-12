'use client';
import {
    Plus, ThumbsUp, MoreHorizontal, Heart,
    PlusCircle
} from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useTheme } from '../config/themecontext';
import CreatePost from './createpost';
import DandiyaPartner from './dandiyapartner';
import ProfileCard from './profilecard';
import EventCard from './eventcard';


export default function Home() {
    const { theme } = useTheme();
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
                breakpoints={{
                    0: { slidesPerView: 2 },
                    640: { slidesPerView: 4 },
                    720: { slidesPerView: 6 },
                    1024: { slidesPerView: 8 },
                    1440: { slidesPerView: 10 }
                }}
                className="mt-5 px-2"
            >
                <SwiperSlide>
                    <div
                        className="w-full aspect-[1/1.2] rounded-xl shadow-lg flex items-center justify-center flex-col cursor-pointer"
                        style={{
                            backgroundColor: "var(--bg-card)",
                            color: theme === "dark" ? "var(--card-text)" : "var(--text-primary)",
                        }}
                    >
                        <PlusCircle size={36} style={{ color: "var(--accent)" }} />
                        <p className="mt-2 text-sm font-semibold">Add Stories</p>
                    </div>
                </SwiperSlide>

                {storyColors.map((color, index) => (
                    <SwiperSlide key={index}>
                        <div
                            className="w-full aspect-[1/1.2] rounded-xl shadow-lg"
                            style={{ backgroundColor: color }}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="mt-5 flex flex-col lg:flex-row gap-2">
                {/* Center Content */}
                <div className="w-full lg:w-1/2 flex flex-col gap-6 order-1 lg:order-2">
                    <CreatePost />
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
                            <ThumbsUp size={16} />
                            <span className="ml-1">
                                +{postData.reactions} people react this post
                            </span>
                        </div>
                    </div>
                </div>

                {/* Left Sidebar */}
                <div className="w-full lg:w-1/4 flex flex-col gap-6 order-2 lg:order-1">
                    <ProfileCard />
                    <EventCard />
                </div>

                {/* Right Sidebar */}
                <div className="w-full lg:w-1/4 flex flex-col gap-6 order-3 lg:order-3">
                    <DandiyaPartner />
                </div>
            </div>
        </div>
    );
}