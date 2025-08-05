"use client";
import React from "react";
import {
  SparklesIcon,
  FireIcon,
  StarIcon,
  SunIcon,
  MusicalNoteIcon,
  HeartIcon,
  BoltIcon,
  FaceSmileIcon,
  GiftIcon,
} from "@heroicons/react/24/solid";

const days = [
  { label: "Day 1", icon: SparklesIcon },
  { label: "Day 2", icon: FireIcon },
  { label: "Day 3", icon: StarIcon },
  { label: "Day 4", icon: SunIcon },
  { label: "Day 5", icon: MusicalNoteIcon },
  { label: "Day 6", icon: HeartIcon },
  { label: "Day 7", icon: BoltIcon },
  { label: "Day 8", icon: FaceSmileIcon },
  { label: "Day 9", icon: GiftIcon },
];
const navbarHeight = 'h-16';
const sidebarWidth = 'w-24';
const Sidebar = ({ selectedDay, onDaySelect }) => {
  return (
    <aside className={`bg-gradient-to-b from-pink-100 to-blue-100 shadow-xl rounded-r-xl p-4 space-y-4 overflow-y-auto h-screen fixed top-${navbarHeight.replace('h-', '')} left-0 bottom-0 z-40 ${sidebarWidth} bg-gray-900 text-white`}>
      {days.map((day, index) => {
        const Icon = day.icon;
        return (
          <button
            key={index}
            onClick={() => onDaySelect(index)}
            className={`group flex items-center space-x-3 w-full p-1.5 rounded-lg transition-all duration-300 ${selectedDay === index
              ? "bg-blue-300 text-white font-semibold shadow-md"
              : "hover:bg-pink-200 text-gray-700 text-center justify-center"
              }`}
          >
            <Icon className="w-6 h-6 text-blue-600 group-hover:scale-120 transition-transform" />
          </button>
        );
      })}
    </aside>
  );
};

export default Sidebar;