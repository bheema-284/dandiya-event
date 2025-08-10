'use client';
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  DocumentChartBarIcon,
  UserGroupIcon,
  HomeModernIcon,
  FilmIcon,
  TicketIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  BellIcon,
  UserCircleIcon,
} from '@heroicons/react/24/solid'

export default function Navbar() {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showMessages, setShowMessages] = useState(false)
  const router = useRouter()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#1a1840]">
      <div className="w-[90%] mx-auto h-16 flex items-center justify-between">
        {/* Left: logo + title */}
        <div onClick={() => router.push('/')} className="flex items-center gap-4 cursor-pointer">
          <div className="rounded-full p-1 bg-gradient-to-tr from-yellow-300 via-white to-pink-300 shadow-[0_8px_30px_rgba(250,204,21,0.12)]">
            {/* replace with your Durga image if you have one (public/durga-mata.jpg) */}
            <img src="/durga-mata.jpg" alt="durga" className="h-12 w-12 rounded-full object-cover" />
          </div>

          <span className="text-white font-extrabold text-lg tracking-widest uppercase">DANDIYA CARNIVAL</span>
        </div>

        {/* Middle icons (Heroicons) */}
        <nav className="hidden sm:flex items-center gap-8">
          <DocumentChartBarIcon className="h-6 w-6 text-yellow-400 hover:text-white transition-colors duration-200" />

          <div className="flex items-center justify-center bg-[#1a1840]">
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
          {/* <UserGroupIcon className="h-6 w-6 text-pink-400 hover:text-white transition-colors duration-200" /> */}
          <HomeModernIcon className="h-6 w-6 text-emerald-400 hover:text-white transition-colors duration-200" />
          <FilmIcon className="h-6 w-6 text-indigo-400 hover:text-white transition-colors duration-200" />
        </nav>

        {/* Right area: ticket + messages + notifications + profile */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => router.push('/ticketing')}
            className="flex items-center gap-2 bg-gradient-to-r from-yellow-600 to-yellow-600 text-white px-4 py-2 rounded-md font-bold shadow-md"
            aria-label="Buy Tickets"
          >
            <TicketIcon className="h-5 w-5 text-white" />
            <span className="uppercase">Buy Tickets</span>
          </button>

          {/* Messages */}
          <div className="relative">
            <button
              onClick={() => { setShowMessages(!showMessages); setShowNotifications(false); }}
              className="relative"
              aria-label="Messages"
            >
              <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6 text-yellow-400 hover:text-white transition-colors duration-200" />
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">2</span>
            </button>

            {showMessages && (
              <div className="absolute right-0 mt-3 w-80 bg-gray-800 text-white rounded-lg shadow-lg z-50">
                <div className="p-4 border-b font-semibold">Messages</div>
                <div className="p-3">
                  <div className="flex items-center gap-3">
                    <img src="https://randomuser.me/api/portraits/women/3.jpg" className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <div className="font-semibold">Paige Turner</div>
                      <div className="text-sm text-gray-500">Are You There?</div>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-3">
                    <img src="https://randomuser.me/api/portraits/men/2.jpg" className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <div className="font-semibold">Bob Frapples</div>
                      <div className="text-sm text-gray-500">Hello! How are you?</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => { setShowNotifications(!showNotifications); setShowMessages(false); }}
              aria-label="Notifications"
            >
              <BellIcon className="h-6 w-6 text-yellow-400 hover:text-white transition-colors duration-200" />
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">1</span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-3 w-80 bg-gray-800 text-white rounded-lg shadow-lg z-50">
                <div className="p-4 border-b font-semibold">Notifications</div>
                <div className="p-3">
                  <div className="flex items-start gap-3">
                    <img src="https://randomuser.me/api/portraits/women/1.jpg" className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <div><span className="font-bold">Paige Turner</span> sent you a friend request</div>
                      <div className="text-sm text-gray-500">1 mutual friend</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <button className="flex items-center" aria-label="Profile">
            <UserCircleIcon className="h-8 w-8 text-pink-400" />
          </button>
        </div>
      </div>
    </header>
  )
}
