'use client';

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import { useEffect, useState } from "react";
import { ThemeContext } from "./config/themecontext";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



const themeColors = {
  light: {
    '--bg-primary': '#ffffff',
    '--bg-card': '#f9f9ffff', // dark navy like in the image
    '--text-primary': '#252627ff',
    '--text-secondary': '#373b40ff',
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

export default function RootLayout({ children }) {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };
  useEffect(() => {
    const root = document.documentElement;
    const colors = themeColors[theme];
    for (const key in colors) {
      root.style.setProperty(key, colors[key]);
    }
  }, [theme]);
  return (
    <html lang="en">
      <body
        className={`
    ${geistSans.variable} ${geistMono.variable}
    antialiased min-h-screen flex flex-col bg-smile
  `}
      >
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
          <Navbar />
          <div className={`w-full sm:w-[80%] m-auto flex flex-1`}>
            <main className={`flex-1 overflow-y-auto`}>
              {children}
            </main>
          </div>
        </ThemeContext.Provider>
      </body>
    </html>
  );
}
