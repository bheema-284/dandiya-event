'use client';
import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../config/themecontext';
import { useRouter } from 'next/navigation';
import { MoonIcon, SunIcon } from '@heroicons/react/20/solid';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();

  return (
    <header
      className="w-full flex items-center justify-between px-6 py-1.5"
      style={{ backgroundColor: '#0b0a2b' }}
    >
      {/* Left Logo + Title */}
      <div className="flex cursor-pointer items-center">
        {/* Durga icon cropped */}
        <div
          onClick={() => router.push('/')}
          className="h-14 w-auto flex items-center justify-center bg-transparent"
        >
          <img
            src="/Durga.png"
            alt="Durga"
            className="h-full w-full object-contain"
            style={{
              filter: "drop-shadow(0 0 1px white) drop-shadow(0 0 3px white) drop-shadow(0 0 6px white)"
            }}
          />
        </div>

        {/* Event logo */}
        <div className="h-10 w-34 overflow-hidden flex items-center justify-center bg-transparent rounded-full">
          <img
            src="/Dandiya Carnival Logo.png"
            alt="event"
            className="h-full w-full object-contain"
          />
        </div>
      </div>

      {/* Center Nav Icons */}
      <div className="hidden md:flex items-center gap-8 cursor-pointer">
        <img src="/News Feed.png" alt="News" className="h-6 w-auto" />
        <img src="/Friends.png" alt="Friends" className="h-6 w-auto scale-90" />
        <img src="/Shop.png" alt="Shop" className="h-6 w-auto" />
        <img src="/Event Icon.png" alt="Events" className="h-6 w-auto" />
      </div>

      {/* Ticket Icon cropped */}
      <div onClick={() => router.push('/ticketing')} className="h-14 w-auto cursor-pointer overflow-hidden flex items-center justify-center bg-transparent rounded-lg">
        <img
          src="/Buy Tickets.png"
          alt="Buy Tickets"
          className="h-full w-full object-cover scale-75"
        />
      </div>

      {/* Right Icons */}
      <div className="flex items-center gap-6 cursor-pointer">
        <img src="/Chat icon.png" alt="Chat" className="h-6 w-auto" />
        <img src="/Notifications.png" alt="Notifications" className="h-6 w-auto" />
        <button onClick={toggleTheme} className="flex items-center cursor-pointer">
          {theme === 'light'
            ? <MoonIcon className="w-6 text-yellow-500" />
            : <SunIcon className="w-6 text-yellow-500" />}
        </button>
        <img src="/Profile Icon.jpg" alt="Profile" className="h-6 w-8 rounded-full object-cover" />
      </div>
    </header>
  );
}
