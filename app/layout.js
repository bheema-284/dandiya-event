'use client';

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`
    ${geistSans.variable} ${geistMono.variable}
    antialiased min-h-screen flex flex-col bg-smile
  `}
      >
        <Navbar />
        <div className={`w-full sm:w-[85%] m-auto flex flex-1 pt-24 sm:pt-16`}>
          <main className={`flex-1 overflow-y-auto`}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
