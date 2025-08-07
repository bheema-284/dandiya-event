'use client';
import {
  MagnifyingGlassIcon,
  HomeIcon,
  UserPlusIcon,
  BellIcon,
  ChatBubbleOvalLeftIcon,
  EllipsisHorizontalIcon,
  PencilSquareIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
  ArrowRightStartOnRectangleIcon,
  DocumentIcon,
  StarIcon,
  UserGroupIcon,
  CalendarIcon,
  GiftIcon,
  BriefcaseIcon,
  CakeIcon,
  CheckBadgeIcon,
  TrophyIcon,
} from '@heroicons/react/24/outline';
// Import the solid icons for the active state
import {
  DocumentIcon as DocumentIconSolid,
  StarIcon as StarIconSolid,
  UserGroupIcon as UserGroupIconSolid,
  CalendarIcon as CalendarIconSolid,
  GiftIcon as GiftIconSolid,
  BriefcaseIcon as BriefcaseIconSolid,
  CakeIcon as CakeIconSolid,
  CheckBadgeIcon as CheckBadgeIconSolid,
  TrophyIcon as TrophyIconSolid,
} from '@heroicons/react/24/solid';

import { useState } from 'react';
import ThemeToggle from './common/themetoggle';
import { UserIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';

const dandiyaIcons = [
  { icon: DocumentIcon, solidIcon: DocumentIconSolid, name: 'Day 1: Opening Ceremony' },
  { icon: CalendarIcon, solidIcon: CalendarIconSolid, name: 'Day 2: Stand-up & Bhangra' },
  { icon: UserGroupIcon, solidIcon: UserGroupIconSolid, name: 'Day 3: Kids Dandiya' },
  { icon: StarIcon, solidIcon: StarIconSolid, name: 'Day 4: Bollywood Extravaganza' },
  { icon: CheckBadgeIcon, solidIcon: CheckBadgeIconSolid, name: 'Day 5: Fusion Night' },
  { icon: CakeIcon, solidIcon: CakeIconSolid, name: 'Day 6: Dandiya Battle' },
  { icon: BriefcaseIcon, solidIcon: BriefcaseIconSolid, name: 'Day 7: Grand Finale' },
  { icon: GiftIcon, solidIcon: GiftIconSolid, name: 'Day 8: Folk Dance Night' },
  { icon: TrophyIcon, solidIcon: TrophyIconSolid, name: 'Day 9: Garba Workshop' },
];

export default function Navbar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [activeIcon, setActiveIcon] = useState(dandiyaIcons[0].name);
  const router = useRouter();

  const handleIconClick = (index, iconName) => {
    setActiveIcon(iconName);
    router.push(`/days/${index + 1}`);
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 flex flex-wrap items-center justify-between bg-[#0288D1] px-4 py-3 text-white">
        {/* Logo */}
        <div onClick={() => router.push('/')} className="text-xl cursor-pointer font-bold mb-2 sm:mb-0">
          <span className="relative inline-block pl-[0.5rem]">
            Dandiya Event
            <span className="absolute left-0 top-0 h-full w-[2.6ch] bg-red/20 rounded-lg z-50"></span>
          </span>
        </div>

        {/* Search + Icons */}
        <div className="flex items-center gap-3 mb-2 sm:mb-0">
          <div className="hidden md:flex items-center bg-white/20 rounded-md px-3 py-1">
            <MagnifyingGlassIcon className="h-5 w-5 text-white mr-2" />
            <input
              type="text"
              placeholder="Find Friends..."
              className="bg-transparent text-white placeholder-white outline-none text-sm"
            />
          </div>
          <HomeIcon className="h-6 w-6 cursor-pointer" />
          <UserPlusIcon className="h-6 w-6 cursor-pointer" />
        </div>

        {/* Desktop Stats - Now using dandiyaIcons */}
        <div className="hidden lg:flex gap-2">
          {dandiyaIcons.map((item, index) => {
            // Select the correct icon based on the active state
            const IconComponent = activeIcon === item.name ? item.solidIcon : item.icon;
            const isActive = activeIcon === item.name;
            return (
              <div
                key={index}
                className={`relative flex flex-col items-center justify-center cursor-pointer px-1`}
                onClick={() => handleIconClick(index, item.name)}
              >
                <IconComponent className="h-7 w-7 text-white hover:text-gray-200 transition-colors duration-200" />
                {isActive && (
                  <span className="absolute bottom-0 top-11 left-0 right-0 h-[2.5px] bg-white"></span>
                )}
              </div>
            );
          })}
        </div>

        {/* Buy Ticket Button */}
        <div className="animate-float hover:bg-white/20 px-3 py-1 rounded cursor-pointer shadow-lg transition-all duration-300">
          <button
            className="cursor-pointer bg-transparent text-white outline-none text-sm font-semibold animate-pulse focus:scale-105 transform transition duration-300"
            onClick={() => router.push('/ticketing')}
          >
            🎟️ Buy Ticket
          </button>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <ChatBubbleOvalLeftIcon
              className="h-6 w-6 cursor-pointer"
              onClick={() => {
                setShowMessages(!showMessages);
                setShowNotifications(false);
                setShowProfile(false);
              }}
            />
            <span className="absolute -top-2 -right-2 bg-green-500 text-xs w-5 h-5 flex items-center justify-center rounded-full">
              2
            </span>
            {showMessages && (
              <div className="absolute right-0 mt-3 w-72 sm:w-96 bg-white text-black rounded-lg shadow-lg z-50">
                <div className="flex items-center justify-between p-4 border-b font-semibold">
                  <span>Messages</span>
                  <div className="flex gap-2">
                    <EllipsisHorizontalIcon className="h-5 w-5 text-gray-500" />
                    <PencilSquareIcon className="h-5 w-5 text-gray-500" />
                  </div>
                </div>
                <div className="p-3">
                  <div className="flex items-center bg-gray-100 p-2 rounded-md">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-500 mr-2" />
                    <input
                      type="text"
                      placeholder="Search Messages..."
                      className="bg-transparent outline-none text-sm"
                    />
                  </div>
                </div>
                <div className="divide-y">
                  {[{ name: 'Paige Turner', message: 'Are You There ?', avatar: 'https://randomuser.me/api/portraits/women/3.jpg', status: 'green' },
                  { name: 'Bob Frapples', message: 'Hello ! How Are You ?', avatar: 'https://randomuser.me/api/portraits/men/2.jpg', status: 'red' }].map((m, i) => (
                    <div key={i} className="flex items-center gap-3 p-4">
                      <div className="relative">
                        <img src={m.avatar} className="w-10 h-10 rounded-full object-cover" />
                        <span className={`absolute bottom-0 right-0 w-2 h-2 rounded-full bg-${m.status}-500 border-2 border-white`}></span>
                      </div>
                      <div>
                        <p className="font-semibold">{m.name}</p>
                        <p className="text-sm text-gray-500">{m.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Notifications */}
          <div className="relative">
            <BellIcon
              className="h-6 w-6 cursor-pointer"
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowMessages(false);
                setShowProfile(false);
              }}
            />
            <span className="absolute -top-2 -right-2 bg-red-600 text-xs w-5 h-5 flex items-center justify-center rounded-full">
              2
            </span>
            {showNotifications && (
              <div className="absolute right-0 mt-3 w-72 sm:w-80 bg-white text-black rounded-lg shadow-lg z-50">
                <div className="p-4 font-semibold border-b">Notifications</div>
                <div className="divide-y">
                  {[{
                    name: 'Paige Turner', action: 'Send You A Friend Request', info: '1 Mutual Friend', avatar: 'https://randomuser.me/api/portraits/women/1.jpg', buttons: true,
                  }, {
                    name: 'Bob Frapples', action: 'Add Their Stories', info: '8 Hours Ago', avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
                  }, {
                    name: 'Josephin Water', action: 'Have Birthday Today', info: 'Sun At 5.55 AM', avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
                  }].map((n, i) => (
                    <div key={i} className="flex items-start gap-3 p-4">
                      <img src={n.avatar} className="w-10 h-10 rounded-full object-cover" />
                      <div className="flex-1">
                        <p><span className="font-bold">{n.name}</span> {n.action}</p>
                        <p className="text-sm text-gray-500">{n.info}</p>
                      </div>
                      {n.buttons && (
                        <div className="flex gap-2">
                          <button className="bg-blue-600 text-white p-1 rounded">&#10003;</button>
                          <button className="bg-blue-600 text-white p-1 rounded">&#10005;</button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => {
                setShowProfile(!showProfile);
                setShowNotifications(false);
                setShowMessages(false);
              }}
            >
              <div className="relative w-10 h-10">
                <img src="https://randomuser.me/api/portraits/men/4.jpg" className="rounded-full w-full h-full object-cover" />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
              </div>
              <div className="text-sm leading-tight hidden sm:block">
                <div className="font-semibold">Bheema G</div>
                <div className="text-xs">Active Now</div>
              </div>
            </div>

            {showProfile && (
              <div className="absolute right-0 mt-3 w-72 sm:w-80 bg-white text-black rounded-lg shadow-lg z-50">
                <div className="p-4 font-semibold border-b">Profile</div>
                <div className="divide-y">
                  <div className="flex items-start gap-3 p-4 cursor-pointer hover:bg-gray-50">
                    <UserIcon className="h-5 w-5 mt-1 text-gray-500" />
                    <div>
                      <p className="font-semibold">Profile</p>
                      <p className="text-sm text-gray-500">Profile Preview & Settings</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 cursor-pointer hover:bg-gray-50">
                    <Cog6ToothIcon className="h-5 w-5 mt-1 text-gray-500" />
                    <div>
                      <p className="font-semibold">Settings & Privacy</p>
                      <p className="text-sm text-gray-500">All Settings & Privacy</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 cursor-pointer hover:bg-gray-50">
                    <QuestionMarkCircleIcon className="h-5 w-5 mt-1 text-gray-500" />
                    <div>
                      <p className="font-semibold">Help & Support</p>
                      <p className="text-sm text-gray-500">Browse Help Here</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 cursor-pointer hover:bg-gray-50">
                    <ArrowRightStartOnRectangleIcon className="h-5 w-5 mt-1 text-gray-500" />
                    <div>
                      <p className="font-semibold">Log Out</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Stats Bar - Now using dandiyaIcons */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#0288D1] flex justify-around items-center lg:hidden">
        {dandiyaIcons.map((item, index) => {
          // Select the correct icon based on the active state
          const IconComponent = activeIcon === item.name ? item.solidIcon : item.icon;
          const isActive = activeIcon === item.name;
          return (
            <div
              key={index}
              className={`relative flex flex-col items-center justify-center cursor-pointer p-2`}
              onClick={() => handleIconClick(index, item.name)}
            >
              <IconComponent className="h-6 w-6 text-white hover:text-gray-200 transition-colors duration-200" />
              {isActive && (
                <span className="absolute top-0 left-0 right-0 h-[2.5px] bg-white"></span>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}