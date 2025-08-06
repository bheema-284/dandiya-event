'use client';

import { useState, useEffect } from 'react';
import { ArrowPathIcon, SunIcon } from '@heroicons/react/24/outline';

export default function WeatherCard() {
    const [currentDateTime, setCurrentDateTime] = useState(new Date());
    const [temperature, setTemperature] = useState('N/A');
    const [weatherCondition, setWeatherCondition] = useState('Loading...');
    const [location, setLocation] = useState('Loading...');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [snowflakes, setSnowflakes] = useState([]);

    const OPENWEATHER_API_KEY = '7784e3c3b8d70bbca3988cf5c57a5271'; // Add your API key here

    const fetchWeatherData = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const city = 'Hyderabad';
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHER_API_KEY}&units=metric`;

            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const data = await response.json();
            setTemperature(Math.round(data.main.temp));
            setWeatherCondition(
                data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1)
            );
            setLocation(data.name);
        } catch (err) {
            console.error('Failed to fetch weather data:', err);
            setError('Failed to load weather data.');
            setTemperature('N/A');
            setWeatherCondition('Error');
            setLocation('Unknown');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchWeatherData();

        const timer = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Generate snowflakes client-side to avoid hydration mismatch
    useEffect(() => {
        const flakes = Array.from({ length: 15 }).map((_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 8 + 6}s`,
            animationDelay: `${Math.random() * 6}s`,
            fontSize: `${Math.random() * 1 + 0.6}rem`,
            top: `-${Math.random() * 50}%`
        }));
        setSnowflakes(flakes);
    }, []);

    const optionsDate = { day: '2-digit', month: 'long', year: 'numeric', weekday: 'long' };
    const formattedDate = currentDateTime.toLocaleDateString('en-US', optionsDate);
    const formattedTime = currentDateTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });

    return (
        <div className="relative bg-blue-500 text-white p-6 rounded-lg shadow-xl w-full h-72 overflow-hidden">
            {/* Animated snowflakes */}
            {snowflakes.map((flake) => (
                <div
                    key={flake.id}
                    className="absolute text-white opacity-75 animate-fall-zigzag"
                    style={{
                        left: flake.left,
                        animationDuration: flake.animationDuration,
                        animationDelay: flake.animationDelay,
                        fontSize: flake.fontSize,
                        top: flake.top
                    }}
                >
                    ❄
                </div>
            ))}

            {/* Header */}
            <div className="flex justify-between items-center mb-4 z-10 relative">
                <h2 className="text-2xl font-bold">Weather</h2>
                <div className="flex space-x-2">
                    <button
                        onClick={fetchWeatherData}
                        className="bg-blue-400 bg-opacity-20 p-2 rounded-full hover:bg-opacity-30 transition-all"
                        disabled={isLoading}
                    >
                        <ArrowPathIcon className={`h-5 w-5 text-white ${isLoading ? 'animate-spin' : ''}`} />
                    </button>
                    <button className="bg-blue-400 bg-opacity-20 p-2 rounded-full hover:bg-opacity-30 transition-all">
                        <SunIcon className="h-5 w-5 text-white" />
                    </button>
                </div>
            </div>

            {/* Temperature and Time */}
            <div className="flex items-center mb-2 z-10 relative">
                <p className="text-5xl font-bold">
                    {isLoading ? '...' : error ? '!' : `${temperature}°C`}
                </p>
                <div className="ml-4 bg-blue-400 bg-opacity-30 px-3 py-1 rounded-md text-sm font-semibold">
                    {formattedTime.replace(' ', '')}
                </div>
            </div>

            {/* Condition */}
            <p className="text-lg font-semibold mb-1 z-10 relative">
                {isLoading ? 'Loading...' : error ? 'Error' : weatherCondition}
            </p>

            {/* Date and Location */}
            <p className="text-sm z-10 relative">
                {formattedDate} {isLoading ? '...' : error ? 'Error' : location}
            </p>

            {/* Custom Animation Styles */}
            <style jsx>{`
                @keyframes fall-zigzag {
                    0% {
                        transform: translateY(-100px) translateX(0px);
                        opacity: 0;
                    }
                    10% {
                        opacity: 0.8;
                    }
                    25% {
                        transform: translateY(50px) translateX(20px);
                    }
                    50% {
                        transform: translateY(150px) translateX(-20px);
                    }
                    75% {
                        transform: translateY(250px) translateX(20px);
                    }
                    100% {
                        transform: translateY(350px) translateX(0px);
                        opacity: 0;
                    }
                }
                .animate-fall-zigzag {
                    animation-name: fall-zigzag;
                    animation-timing-function: ease-in-out;
                    animation-iteration-count: infinite;
                }
            `}</style>
        </div>
    );
}
