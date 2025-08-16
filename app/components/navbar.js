'use client';
import React, { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDownIcon, UserIcon } from '@heroicons/react/20/solid';
import RootContext from './config/rootcontext';

export default function Navbar() {
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const { rootContext, setRootContext } = useContext(RootContext);

  const logOut = () => {
    localStorage.clear();
    const updatedContext = {
      ...rootContext,
      authenticated: false,
    };

    setRootContext(updatedContext);
    router.push(`/`);
  };

  const userProfile = () => {
    router.push(`/profile`);
  }

  return (
    <header
      className="w-full h-16 fixed z-50 top-0 flex items-center justify-center"
      style={{ backgroundColor: '#1a1945ff' }}
    >
      <div className="w-full sm:w-[80%] flex items-center justify-between">
        {/* Left Logo + Title */}
        <div className="flex cursor-pointer items-center">
          <div
            onClick={() => router.push('/')}
            className="h-14 w-auto flex items-center justify-center bg-transparent"
          >
            <img
              src="/Durga.png"
              alt="Durga"
              className="h-full w-full object-contain"
              style={{
                filter:
                  'drop-shadow(0 0 1px white) drop-shadow(0 0 3px white) drop-shadow(0 0 6px white)',
              }}
            />
          </div>

          <div className="h-12 w-40 overflow-hidden hidden sm:flex flex-1 items-center justify-center bg-transparent rounded-full">
            <img
              src="/Dandiya Carnival Logo.png"
              alt="event"
              className="h-full w-full object-contain"
            />
          </div>
        </div>

        {/* ✅ Center Nav Icons (show on mobile & desktop) */}
        <div className="flex items-center gap-3 sm:gap-8 cursor-pointer">
          <img src="/News Feed.png" alt="News" className="h-7 w-auto sm:h-8" />
          <img src="/Friends.png" alt="Friends" className="h-7 w-auto sm:scale-75" />
          <img
            onClick={() => router.push('/vendor')}
            src="/shop1.jpeg"
            alt="Events"
            className="h-7 w-auto scale-90"
          />
        </div>

        {/* Ticket Icon */}
        <div
          onClick={() => router.push('/ticketing')}
          className="h-6 sm:h-14 w-auto cursor-pointer flex items-center justify-center bg-transparent rounded-lg"
        >
          <img
            src="/Buy Tickets.png"
            alt="Buy Tickets"
            className="h-full w-full object-cover sm:scale-75"
          />
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-3 sm:gap-6 cursor-pointer text-white capitalize relative">
          <img src="/Chat icon.png" alt="Chat" className="h-6 sm:h-7 w-auto" />
          <img src="/Notifications.png" alt="Notifications" className="h-6 sm:h-7 w-auto" />

          <div
            className="flex items-center gap-1 cursor-pointer"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <UserIcon className="w-6 h-6 sm:h-8 sm:h-8 text-yellow-400" />
            <div className="text-sm flex flex-col sm:flex-row sm:items-center gap-1">
              {/* Small screen: initial in a circle */}
              <div className="sm:hidden w-6 h-6 rounded-full bg-indigo-900 text-white flex items-center justify-center font-semibold">
                {(rootContext?.user?.name || 'U').charAt(0).toUpperCase()}
              </div>

              {/* Larger screen: full name */}
              <div className="hidden sm:flex flex-col">
                <p className="font-semibold">{rootContext?.user?.name || 'User'}</p>
              </div>
            </div>
            <p className="hidden sm:block">
              <ChevronDownIcon className="w-4 h-4 text-gray-400" />
            </p>
          </div>

          {/* ✅ Dropdown with responsive width */}
          {showDropdown && (
            <div className="absolute top-full right-0 mt-2 w-[80%] sm:w-36 bg-white shadow-lg border rounded-md z-50">
              <button
                onClick={userProfile}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 rounded-t-md hover:bg-gray-100"
              >
                Profile
              </button>
              <button
                onClick={logOut}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 rounded-b-md hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}