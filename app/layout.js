'use client';

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import { useState } from "react";
import { ThemeContext } from "./config/themecontext";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({ children }) {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };
  
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
          <div className={`w-full sm:w-[75%] m-auto flex flex-1`}>
            <main className={`flex-1 overflow-y-auto`}>
              {children}
            </main>
          </div>
        </ThemeContext.Provider>
      </body>
    </html>
  );
}
