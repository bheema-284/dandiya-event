"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
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

  // Update image sources for users and stories to use picsum.photos for reliability
  useEffect(() => {
    const updatedUsers = users.map((user, userIndex) => ({
      ...user,
      image: user.type === "add"
        ? "https://picsum.photos/id/99/100/100"
        : `https://picsum.photos/id/${1000 + userIndex}/100/100`,
      stories: user.stories ? user.stories.map((story, storyIndex) => ({
        ...story,
        image: `https://picsum.photos/id/${2000 + userIndex * 10 + storyIndex}/800/600`,
      })) : undefined,
    }));
  }, []);

  return (
    <div className="dark:bg-gray-900 min-h-screen text-black dark:text-white">
      <div className="relative min-h-screen dark:bg-gray-900">
        <div
          className="absolute inset-0 z-0 opacity-20"
          style={{
            backgroundImage: "url('/background-pattern.png')", // You would need to create a `background-pattern.png` image with the emojis and thumb-up icons.
            backgroundSize: '250px', // Adjust size as needed
            backgroundRepeat: 'repeat',
          }}
        />
        <div className="relative z-10 p-3">
          <Swiper
            spaceBetween={10}
            breakpoints={{
              320: { slidesPerView: 2.5 },
              480: { slidesPerView: 3.5 },
              768: { slidesPerView: 4.5 },
              1024: { slidesPerView: 5.5 },
              1280: { slidesPerView: 6.5 },
            }}
            className="mb-8"
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
                  className={`relative cursor-pointer h-32 sm:h-52 w-full rounded-xl overflow-hidden text-white flex flex-col justify-end 
                        ${user.type === "add" ? "bg-blue-500" : ""}
                    `}
                >
                  <div className="absolute bottom-0 left-0 w-full h-[30%] bg-gradient-to-t from-black/70 to-transparent z-10" />

                  <img
                    src={user.image}
                    alt={user.name}
                    className="absolute inset-0 w-full h-full object-cover"
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
              className={`fixed top-0 right-0 z-50 h-full w-full bg-black/90 backdrop-blur-sm transform transition-transform duration-500 ease-in-out ${isViewerOpen ? "translate-x-0" : "translate-x-full"
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
                  initialStoryIndex={selectedStoryIndex}
                  onClose={() => {
                    setIsViewerOpen(false);
                    setTimeout(() => setSelectedUser(null), 500);
                  }}
                />
              </div>
            </div>
          )}

          {/* Main Content Grid - Adjusted to match the visual layout in the image */}
          {/* The image shows three columns. The middle column contains a `CreatePost` and `PostFeed` component.
                The left column has a `ProfileCard` and a 'Friend Suggestion' section (which can be `WeatherCard` in this context).
                The right column has an `EventCard` and a `GalleryCard`.
            */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Left Column */}
            <div className="flex flex-col gap-4">
              <ProfileCard />
              {/* The image shows a 'Friend Suggestion' card here. You can rename WeatherCard or create a new component. */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
                <h4 className="font-semibold text-lg mb-2">Friend Suggestion</h4>
                {/* Add your friend suggestion UI here */}
                <p className="text-gray-600 dark:text-gray-400">Content for friend suggestions...</p>
              </div>
            </div>

            {/* Middle Column */}
            <div className="flex flex-col gap-4 md:col-span-1">
              <CreatePost onAddPost={handleAddPost} />
              <PostFeed posts={posts} />
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-4">
              {/* The image has a Birthday/Event Card and a Gallery card in the right column */}
              <EventCard />
              <GalleryCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}