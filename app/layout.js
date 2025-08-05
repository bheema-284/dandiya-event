'use client';

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";

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
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`} >
        <Navbar />
        <div className={`flex flex-1 pt-20`}>
          <Sidebar />
          <main className={`flex-1 p-4 overflow-y-auto pl-24`}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
