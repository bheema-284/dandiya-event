'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  DocumentChartBarIcon,
  UserGroupIcon,
  HomeModernIcon,
  FilmIcon,
  TicketIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  BellIcon,
  UserCircleIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/solid';

export default function Navbar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#1a1840]">
      <div className="w-[90%] mx-auto h-16 flex items-center justify-between">
        {/* Left: Logo + Title */}
        <div
          onClick={() => router.push('/')}
          className="flex items-center gap-3 cursor-pointer flex-shrink-0"
        >
          <div className="rounded-full p-1 bg-gradient-to-tr from-yellow-300 via-white to-pink-300 shadow-[0_8px_30px_rgba(250,204,21,0.12)]">
            <img
              src="/durga-mata.jpg"
              alt="durga"
              className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover"
            />
          </div>
          <span className="hidden sm:flex flex-1 text-white font-extrabold text-sm sm:text-lg tracking-widest uppercase whitespace-nowrap">
            DANDIYA CARNIVAL
          </span>
        </div>

        {/* Desktop Nav Icons */}
        <nav className="hidden md:flex items-center gap-6">
          <DocumentChartBarIcon className="h-6 w-6 text-yellow-400 hover:text-white transition-colors duration-200" />
          <div className="flex items-center justify-center">
            <svg className="h-6 w-6">
              <defs>
                <linearGradient id="redYellowBlue" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="red" />
                  <stop offset="50%" stopColor="yellow" />
                  <stop offset="100%" stopColor="blue" />
                </linearGradient>
              </defs>
              <UserGroupIcon style={{ fill: 'url(#redYellowBlue)' }} />
            </svg>
          </div>
          <HomeModernIcon className="h-6 w-6 text-emerald-400 hover:text-white transition-colors duration-200" />
          <FilmIcon className="h-6 w-6 text-indigo-400 hover:text-white transition-colors duration-200" />
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Tickets Button - always visible */}
          <button
            onClick={() => router.push('/ticketing')}
            className="flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-yellow-600 to-yellow-600 text-white px-2 py-1.5 sm:px-4 sm:py-2 rounded-md font-bold shadow-md text-xs sm:text-sm"
          >
            <TicketIcon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            <span className="uppercase">Buy Tickets</span>
          </button>

          {/* Messages */}
          <div className="relative">
            <button
              onClick={() => {
                setShowMessages(!showMessages);
                setShowNotifications(false);
              }}
              className="relative"
            >
              <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6 text-yellow-400 hover:text-white transition-colors duration-200" />
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] sm:text-xs w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center rounded-full">
                2
              </span>
            </button>

            {showMessages && (
              <div className="absolute right-0 mt-3 w-72 sm:w-80 bg-gray-800 text-white rounded-lg shadow-lg z-50">
                <div className="p-4 border-b font-semibold">Messages</div>
                <div className="p-3 space-y-3">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://randomuser.me/api/portraits/women/3.jpg"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold">Paige Turner</div>
                      <div className="text-sm text-gray-500">Are You There?</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <img
                      src="https://randomuser.me/api/portraits/men/2.jpg"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold">Bob Frapples</div>
                      <div className="text-sm text-gray-500">
                        Hello! How are you?
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowMessages(false);
              }}
            >
              <BellIcon className="h-6 w-6 text-yellow-400 hover:text-white transition-colors duration-200" />
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] sm:text-xs w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center rounded-full">
                1
              </span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-3 w-72 sm:w-80 bg-gray-800 text-white rounded-lg shadow-lg z-50">
                <div className="p-4 border-b font-semibold">Notifications</div>
                <div className="p-3">
                  <div className="flex items-start gap-3">
                    <img
                      src="https://randomuser.me/api/portraits/women/1.jpg"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div>
                        <span className="font-bold">Paige Turner</span> sent you
                        a friend request
                      </div>
                      <div className="text-sm text-gray-500">
                        1 mutual friend
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <button className="flex items-center">
            <UserCircleIcon className="h-8 w-8 text-pink-400" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#1a1840] border-t border-gray-700">
          <nav className="flex flex-col p-4 space-y-4">
            <DocumentChartBarIcon className="h-6 w-6 text-yellow-400" />
            <UserGroupIcon className="h-6 w-6 text-pink-400" />
            <HomeModernIcon className="h-6 w-6 text-emerald-400" />
            <FilmIcon className="h-6 w-6 text-indigo-400" />
          </nav>
        </div>
      )}
    </header>
  );
}
