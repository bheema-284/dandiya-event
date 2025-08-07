"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image"; // Image import is not directly used for images in this component's JSX, but kept for Next.js context.
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
// Assuming these components are defined elsewhere and correctly imported
import StoryViewer from "./components/storyviwer";
import { useRouter } from "next/navigation";
import GalleryCard from "./components/gallerycard";
import EventCard from "./components/eventcard";
import PostFeed from "./components/postfeed";
import CreatePost from "./components/createpost";
import ProfileCard from "./components/profilecard";
import WeatherCard from "./components/weathercard";
import Head from 'next/head'; // Added Head for styling

const users = [
  {
    type: "add",
    name: "Add Stories",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    name: "Anna Mull",
    image: "https://randomuser.me/api/portraits/women/31.jpg",
    stories: [
      {
        image: "https://picsum.photos/id/100/800/600",
        caption: "City lights",
      },
      {
        image: "https://picsum.photos/id/101/800/600",
        caption: "Urban exploration",
      },
      {
        image: "https://picsum.photos/id/102/800/600",
        caption: "Night views",
      },
      {
        image: "https://picsum.photos/id/103/800/600",
        caption: "Downtown vibes",
      },
      {
        image: "https://picsum.photos/id/104/800/600",
        caption: "Skyscrapers",
      },
      {
        image: "https://picsum.photos/id/105/800/600",
        caption: "Metropolitan life",
      },
    ],
  },
  {
    name: "Josephin Water",
    image: "https://randomuser.me/api/portraits/women/71.jpg",
    stories: [
      {
        image: "https://picsum.photos/id/106/800/600",
        caption: "Hiking adventure",
      },
      {
        image: "https://picsum.photos/id/107/800/600",
        caption: "Peaceful moments",
      },
    ],
  },
  {
    name: "Petey Cruiser",
    image: "https://randomuser.me/api/portraits/men/65.jpg",
    stories: [
      {
        image: "https://picsum.photos/id/108/800/600",
        caption: "Morning run",
      },
      {
        image: "https://picsum.photos/id/109/800/600",
        caption: "Fitness goals",
      },
      {
        image: "https://picsum.photos/id/110/800/600",
        caption: "Healthy lifestyle",
      },
    ],
  },
  {
    name: "Anna Mull",
    image: "https://randomuser.me/api/portraits/men/21.jpg",
    stories: [
      {
        image: "https://picsum.photos/id/111/800/600",
        caption: "Coffee break",
      },
      {
        image: "https://picsum.photos/id/112/800/600",
        caption: "Work flow",
      },
      {
        image: "https://picsum.photos/id/113/800/600",
        caption: "Productivity",
      },
    ],
  },
  {
    name: "Josephin Water",
    image: "https://randomuser.me/api/portraits/women/70.jpg",
    stories: [
      {
        image: "https://picsum.photos/id/114/800/600",
        caption: "Beach vibes",
      },
      {
        image: "https://picsum.photos/id/115/800/600",
        caption: "Sunset stroll",
      },
    ],
  },
  {
    name: "Petey Cruiser",
    image: "https://randomuser.me/api/portraits/men/39.jpg",
    stories: [
      {
        image: "https://picsum.photos/id/116/800/600",
        caption: "Gaming night",
      },
      {
        image: "https://picsum.photos/id/117/800/600",
        caption: "Level up!",
      },
    ],
  },
];

export default function StorySlider() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(0);
  const router = useRouter();
  const [posts, setPosts] = useState([
    {
      id: 1,
      text: "Enjoying a beautiful sunny day!",
      imageUrl: null,
      videoUrl: null,
      color: "bg-gradient-to-r from-pink-200 to-red-200",
    },
    {
      id: 2,
      text: "Look at this amazing view from my hike!",
      imageUrl: "https://picsum.photos/id/10/600/400",
      videoUrl: null,
      color: null,
    },
    {
      id: 3,
      text: "A quick video from my trip to the mountains.",
      imageUrl: null,
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      color: null,
    },
    {
      id: 4,
      text: "Just a thought for the day: Be kind.",
      imageUrl: null,
      videoUrl: null,
      color: "bg-gradient-to-r from-blue-200 to-cyan-200",
    },
    {
      id: 5,
      text: "Here's another great shot!",
      imageUrl: "https://picsum.photos/id/20/600/400",
      videoUrl: null,
      color: null,
    },
    {
      id: 6,
      text: "Thinking about new adventures!",
      imageUrl: null,
      videoUrl: null,
      color: "bg-gradient-to-r from-purple-200 to-indigo-200",
    },
    {
      id: 7,
      text: "What a lovely evening!",
      imageUrl: null,
      videoUrl: null,
      color: "bg-gradient-to-r from-green-200 to-teal-200",
    },
    {
      id: 8,
      text: "Exploring new places.",
      imageUrl: "https://picsum.photos/id/30/600/400",
      videoUrl: null,
      color: null,
    },
    {
      id: 9,
      text: "A short clip of the city lights.",
      imageUrl: null,
      videoUrl: "https://www.w3schools.com/html/movie.mp4",
      color: null,
    },
  ]);

  const handleAddPost = ({ text, imageUrl, videoUrl = null, color = null }) => {
    const newPost = {
      id: Date.now(),
      text,
      imageUrl,
      videoUrl,
      color,
    };
    setPosts([newPost, ...posts]);
  };

  // The useEffect for updating user images is removed as the `users` array is static
  // and the image URLs are already set to use picsum.photos directly in the array definition.

  return (
    <div className="dark:bg-gray-900 min-h-screen text-black dark:text-white mt-5">
      <div className="relative min-h-screen dark:bg-gray-900">
        <div
          className="absolute inset-0 z-0 opacity-20"
          style={{
            backgroundImage: "url('/background-pattern.png')", // You would need to create a `background-pattern.png` image with the emojis and thumb-up icons.
            backgroundSize: '250px', // Adjust size as needed
            backgroundRepeat: 'repeat',
          }}
        />
        <div className="relative z-10">
          {(!users || users.length === 0) ? <p className="text-center">Loading...</p> : <div className="px-2 sm:p-0">
            <Swiper
              spaceBetween={16}
              slidesPerView="auto"
              breakpoints={{
                320: { slidesPerView: 2 },
                480: { slidesPerView: 2.5 },
                640: { slidesPerView: 3 },
                768: { slidesPerView: 3.5 },
                1024: { slidesPerView: 4 },
                1280: { slidesPerView: 5 },
              }}
              className="mb-5 px-4 sm:px-6 lg:px-8 justify-between"
            >
              {users && users.map((user, index) => (
                <SwiperSlide key={index} className="w-40 min-w-40"> {/* Add a fixed width here */}
                  <div
                    onClick={() => {
                      if (user.type !== "add") {
                        setSelectedUser(user);
                        setIsViewerOpen(true);
                        setSelectedStoryIndex(0);
                      }
                    }}
                    className={`relative cursor-pointer min-w-40 h-52 sm:h-64 rounded-xl overflow-hidden text-white flex flex-col justify-end
          ${user.type === "add" ? "bg-blue-500" : ""}
        `} >
                    <div className="absolute bottom-0 left-0 min-w-40 w-full h-[30%] bg-gradient-to-t from-black/70 to-transparent z-10" />
                    <img
                      src={user.image}
                      alt={user.name}
                      className={`absolute inset-0 w-full h-full object-cover`}
                      onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/100x100/CCCCCC/000000?text=User"; }}
                    />
                    {user.type === "add" && (
                      <div className="absolute inset-0 bg-blue-500/40 backdrop-blur-sm z-0" />
                    )}
                    <div className="relative p-2 z-10">
                      {user.type === "add" ? (
                        <div onClick={() => router.push("/stories")} className="flex flex-col items-center text-center">
                          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/30 flex items-center justify-center backdrop-blur-md shadow-md">
                            <PlusIcon className="w-6 h-6 text-white" />
                          </div>
                          <span className="mt-2 text-center font-medium text-white text-sm sm:text-base">
                            {user.name}
                          </span>
                        </div>
                      ) : (
                        <div>
                          <h4 className="font-semibold text-sm sm:text-base">{user.name}</h4>
                          <p className="text-xs sm:text-sm">Active now</p>
                        </div>
                      )}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            {/* Story Viewer Modal */}
            {selectedUser && (
              <div
                className={`fixed top-0 right-0 z-50 h-full w-full bg-white backdrop-blur-sm transform transition-transform duration-500 ease-in-out ${isViewerOpen ? "translate-x-0" : "translate-x-full"
                  }`}
              >
                <button
                  onClick={() => {
                    setIsViewerOpen(false);
                    setTimeout(() => setSelectedUser(null), 500);
                  }}
                  className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
                  aria-label="Close story viewer"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
                <div className="flex items-center justify-center h-full w-full p-4">
                  <StoryViewer
                    stories={selectedUser.stories}
                    user={selectedUser}
                    initialStoryIndex={selectedStoryIndex}
                    onClose={() => {
                      setIsViewerOpen(false);
                      setTimeout(() => setSelectedUser(null), 500);
                    }}
                  />
                </div>
              </div>
            )}
          </div>}
          {/* Main content grid for columns */}
          {/* Using flex-col for mobile and grid for md and larger */}
          <div className="flex flex-col gap-4 md:grid md:grid-cols-[27%_43%_27%] md:gap-2 w-full justify-between">
            {/* Left Column - Default order 0 (first in source) on desktop, order-2 on mobile */}
            <div className="flex flex-col gap-4 order-2 md:order-none">
              <ProfileCard />
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
                <h4 className="font-semibold text-lg mb-2">Friend Suggestion</h4>
                <p className="text-gray-600 dark:text-gray-400">Content for friend suggestions...</p>
              </div>
              <WeatherCard />
            </div>

            {/* Middle Column - Default order 0 (second in source) on desktop, order-1 on mobile */}
            <div className="flex flex-col gap-4 order-1 md:order-none">
              <CreatePost onAddPost={handleAddPost} />
              <PostFeed posts={posts} />
            </div>

            {/* Right Column - Default order 0 (third in source) on desktop, order-3 on mobile */}
            <div className="flex flex-col gap-4 order-3 md:order-none">
              <EventCard />
              <GalleryCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}