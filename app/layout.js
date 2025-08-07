'use client';

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import HomePage from "./components/home";
import { useState } from "react";
import { usePathname } from "next/navigation";
import FriendProfilePage from "./components/profile";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedFriend, setSelectedFriend] = useState(null);
  const pathName = usePathname()
  const handleSelectFriend = (friend) => {
    setSelectedFriend(friend);
    setCurrentPage('profile');
  };

  const renderPage = () => {
    if (currentPage === 'profile') {
      return <FriendProfilePage friend={selectedFriend} />;
    }
    return (
      <HomePage currentPage={currentPage} />
    );
  };

  return (
    <html lang="en">
      <body
        className={`
    ${geistSans.variable} ${geistMono.variable}
    antialiased min-h-screen flex flex-col bg-smile
  `}
      >
        <Navbar onSelectFriend={handleSelectFriend} />
        <div className={`w-full sm:w-[85%] m-auto flex flex-1 pt-24 sm:pt-16`}>
          <main className={`flex-1 overflow-y-auto`}>
            {pathName === '/' && renderPage()}
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
