"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import StoryViewer from "./components/storyviwer";
import { useRouter } from "next/navigation";
import GalleryCard from "./components/gallerycard";
import EentCard from "./components/eventcard";
import PostFeed from "./components/postfeed";
import CreatePost from "./components/createpost";
import ProfileCard from "./components/profilecard";
import WeatherCard from "./components/weathercard";

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
        image: "https://randomuser.me/api/portraits/men/37.jpg",
        caption: "City lights",
      },
      {
        image: "https://randomuser.me/api/portraits/men/35.jpg",
        caption: "City lights",
      },
      {
        image: "https://randomuser.me/api/portraits/men/81.jpg",
        caption: "City lights",
      },
      {
        image: "https://randomuser.me/api/portraits/women/95.jpg",
        caption: "City lights",
      },
      {
        image: "https://randomuser.me/api/portraits/men/55.jpg",
        caption: "City lights",
      },
      {
        image: "https://randomuser.me/api/portraits/women/15.jpg",
        caption: "City lights",
      },
    ],
  },
  {
    name: "Josephin Water",
    image: "https://randomuser.me/api/portraits/women/71.jpg",
    stories: [
      {
        image: "https://source.unsplash.com/random/800x602?mountains",
        caption: "Hiking adventure",
      },
      {
        image: "https://source.unsplash.com/random/800x603?lake",
        caption: "Peaceful moments",
      },
    ],
  },
  {
    name: "Petey Cruiser",
    image: "https://randomuser.me/api/portraits/men/65.jpg",
    stories: [
      {
        image: "https://randomuser.me/api/portraits/men/37.jpg",
        caption: "City lights",
      },
      {
        image: "https://randomuser.me/api/portraits/men/35.jpg",
        caption: "City lights",
      },
      {
        image: "https://randomuser.me/api/portraits/men/81.jpg",
        caption: "City lights",
      },
      {
        image: "https://randomuser.me/api/portraits/women/95.jpg",
        caption: "City lights",
      },
      {
        image: "https://randomuser.me/api/portraits/men/55.jpg",
        caption: "City lights",
      },
      {
        image: "https://randomuser.me/api/portraits/women/15.jpg",
        caption: "City lights",
      },
    ],
  },

  {
    name: "Anna Mull",
    image: "https://randomuser.me/api/portraits/men/21.jpg",
    stories: [
      {
        image: "https://randomuser.me/api/portraits/men/17.jpg",
        caption: "City lights",
      },
      {
        image: "https://randomuser.me/api/portraits/men/45.jpg",
        caption: "City lights",
      },
      {
        image: "https://randomuser.me/api/portraits/men/11.jpg",
        caption: "City lights",
      },
      {
        image: "https://randomuser.me/api/portraits/women/775.jpg",
        caption: "City lights",
      },
      {
        image: "https://randomuser.me/api/portraits/men/32.jpg",
        caption: "City lights",
      },
      {
        image: "https://randomuser.me/api/portraits/men/65.jpg",
        caption: "City lights",
      },
    ],
  },
  {
    name: "Josephin Water",
    image: "https://randomuser.me/api/portraits/women/70.jpg",
    stories: [
      {
        image: "https://source.unsplash.com/random/800x602?mountains",
        caption: "Hiking adventure",
      },
      {
        image: "https://source.unsplash.com/random/800x603?lake",
        caption: "Peaceful moments",
      },
    ],
  },
  {
    name: "Petey Cruiser",
    image: "https://randomuser.me/api/portraits/men/39.jpg",
    stories: [
      {
        image: "https://randomuser.me/api/portraits/men/77.jpg",
        caption: "City lights",
      },
      {
        image: "https://randomuser.me/api/portraits/men/05.jpg",
        caption: "City lights",
      },
      {
        image: "https://randomuser.me/api/portraits/men/90.jpg",
        caption: "City lights",
      },
      {
        image: "https://randomuser.me/api/portraits/women/96.jpg",
        caption: "City lights",
      },
      {
        image: "https://randomuser.me/api/portraits/men/79.jpg",
        caption: "City lights",
      },
      {
        image: "https://randomuser.me/api/portraits/women/13.jpg",
        caption: "City lights",
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
      color: 'bg-gradient-to-r from-pink-200 to-red-200', // Gradient background for text post
    },
    {
      id: 2,
      text: "Look at this amazing view from my hike!",
      imageUrl: "https://picsum.photos/id/10/600/400", // Example image URL
      videoUrl: null,
      color: null, // No background for image post
    },
    {
      id: 3,
      text: "A quick video from my trip to the mountains.",
      imageUrl: null,
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", // Example video URL (will show placeholder)
      color: null, // No background for video post
    },
    {
      id: 4,
      text: "Just a thought for the day: Be kind.",
      imageUrl: null,
      videoUrl: null,
      color: 'bg-gradient-to-r from-blue-200 to-cyan-200', // Gradient background for text post
    },
    {
      id: 5,
      text: "Here's another great shot!",
      imageUrl: "https://picsum.photos/id/20/600/400",
      videoUrl: null,
      color: null, // No background for image post
    },
    {
      id: 6,
      text: "Thinking about new adventures!",
      imageUrl: null,
      videoUrl: null,
      color: 'bg-gradient-to-r from-purple-200 to-indigo-200', // Gradient background for text post
    },
    {
      id: 7,
      text: "What a lovely evening!",
      imageUrl: null,
      videoUrl: null,
      color: 'bg-gradient-to-r from-green-200 to-teal-200', // Gradient background for text post
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
      videoUrl: "https://www.w3schools.com/html/movie.mp4", // Another example video URL
      color: null,
    },
  ]);

  const handleAddPost = ({ text, imageUrl = null, videoUrl = null, color = null }) => {
    const newPost = {
      id: Date.now(),
      text,
      imageUrl,
      videoUrl,
      color,
    };
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="p-3 bg-[#F1F8FD] dark:bg-gray-900 min-h-screen text-black dark:text-white">
      <Swiper
        spaceBetween={0}
        breakpoints={{
          320: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
        }}
      >
        {users.map((user, index) => (
          <SwiperSlide key={index}>
            <div
              onClick={() => {
                if (user.type !== "add") {
                  setSelectedUser(user);
                  setIsViewerOpen(true);
                  setSelectedStoryIndex(0);
                }
              }}
              className={`relative cursor-pointer h-52 w-36 sm:w-48 md:w-52 md:h-64 rounded-xl overflow-hidden text-white flex flex-col justify-end ${user.type === "add" ? "bg-[#0086D5]" : ""
                }`}
            >
              <Image
                src={user.image}
                alt={user.name}
                fill
                className={`object-cover transition-all duration-300 ${user.type === "add" ? "blur-sm scale-105" : ""
                  }`}
              />
              {user.type === "add" && (
                <div className="absolute inset-0 bg-blue-500/40 backdrop-blur-sm z-0" />
              )}
              <div className="relative p-2 z-10">
                {user.type === "add" ? (
                  <div onClick={() => router.push('/stories')} className="flex flex-col items-center">
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
      {/* Story Viewer */}
      {selectedUser && (
        <div
          className={`fixed top-0 right-0 z-50 h-full w-full md:w-[40%] bg-black/9 backdrop-blur-xs transform transition-transform duration-500 ease-in-out ${isViewerOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
        >

          <div className="text-center mb-4">
            <h2 className="text-lg font-semibold">{selectedUser.name}</h2>
          </div>

          {/* Use imported StoryViewer */}
          <StoryViewer
            stories={selectedUser.stories}
            initialStoryIndex={selectedStoryIndex}
            onClose={() => {
              setIsViewerOpen(false);
              setTimeout(() => setSelectedUser(null), 500);
            }}
          />
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-10">
        <div className="flex flex-col flex-1 gap-4">
          <ProfileCard />
          <WeatherCard />
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <CreatePost onAddPost={handleAddPost} />
          <PostFeed posts={posts} />
        </div>
        <div className="flex flex-col gap-4">
          <EentCard />
          <GalleryCard />
        </div>
      </div>
    </div>
  );
}
