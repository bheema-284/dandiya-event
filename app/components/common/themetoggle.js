'use client';
import { useState, useEffect } from 'react';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';

export default function ThemeToggle() {
    const [darkMode, setDarkMode] = useState(false);

    // Load saved theme from localStorage (optional)
    useEffect(() => {
        const isDark = localStorage.getItem('theme') === 'dark';
        setDarkMode(isDark);
        document.documentElement.classList.toggle('dark', isDark);
    }, []);

    const toggleTheme = () => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        document.documentElement.classList.toggle('dark', newMode);
        localStorage.setItem('theme', newMode ? 'dark' : 'light');
    };

    return (
        <button onClick={toggleTheme} className="p-2 rounded cursor-pointer">
            {darkMode ? (
                <SunIcon className="h-6 w-6 text-white" />
            ) : (
                <MoonIcon className="h-6 w-6 text-white" />
            )}
        </button>
    );
}
