'use client';
import React, { useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../config/themecontext';
import { useRouter } from 'next/navigation';

const themeColors = {
  light: {
    '--bg-primary': '#ffffff',
    '--bg-card': '#0b0a2b',
    '--text-primary': '#eff2f7ff',
    '--text-secondary': '#4b5563',
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

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  useEffect(() => {
    const root = document.documentElement;
    const colors = themeColors[theme];
    for (const key in colors) {
      root.style.setProperty(key, colors[key]);
    }
  }, [theme]);

  return (
    <header
      className="w-full flex items-center justify-between px-6 py-3"
      style={{ backgroundColor: '#0b0a2b' }}
    >
      {/* Left Logo + Title */}
      <div className="flex cursor-pointer items-center">
        {/* Durga icon cropped */}
        <div onClick={() => router.push('/')} className="h-12 w-24 rounded-full overflow-hidden flex items-center justify-center bg-transparent">
          <img
            src="/Durga.png"
            alt="durga"
            className="h-full w-full object-cover scale-125" // zoom to remove border
          />
        </div>
        {/* Event logo */}
        <div className="h-14 w-52 overflow-hidden flex items-center justify-center bg-transparent rounded-full">
          <img
            src="/Dandiya Carnival Logo.png"
            alt="event"
            className="h-full w-full object-contain"
          />
        </div>
      </div>

      {/* Center Nav Icons */}
      <div className="hidden md:flex items-center gap-8">
        <img src="/News Feed.png" alt="News" className="h-8 w-auto" />
        <img src="/Friends.png" alt="Friends" className="h-8 w-auto" />
        <img src="/Shop.png" alt="Shop" className="h-8 w-auto" />
        <img src="/Event Icon.png" alt="Events" className="h-8 w-auto" />
      </div>

      {/* Ticket Icon cropped */}
      <div onClick={() => router.push('/ticketing')} className="h-12 w-32 cursor-pointer overflow-hidden flex items-center justify-center bg-transparent rounded-lg">
        <img
          src="/Buy Tickets.png"
          alt="Buy Tickets"
          className="h-full w-full object-cover scale-110"
        />
      </div>

      {/* Right Icons */}
      <div className="flex items-center gap-6">
        <img src="/Chat icon.png" alt="Chat" className="h-8 w-auto" />
        <img src="/Notifications.png" alt="Notifications" className="h-8 w-auto" />
        <button onClick={toggleTheme} className="flex items-center">
          {theme === 'light'
            ? <Moon size={26} className="text-yellow-400" />
            : <Sun size={26} className="text-yellow-400" />}
        </button>
        <img src="/Profile Icon.jpg" alt="Profile" className="h-8 w-8 rounded-full object-cover" />
      </div>
    </header>
  );
}
