import { useState, useEffect } from 'react';
import { ArrowPathIcon, SunIcon } from '@heroicons/react/24/outline'; // Heroicons for refresh and sun

export default function WeatherCard() {
    const [currentDateTime, setCurrentDateTime] = useState(new Date());
    const [temperature, setTemperature] = useState('N/A');
    const [weatherCondition, setWeatherCondition] = useState('Loading...');
    const [location, setLocation] = useState('Loading...');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Replace with your actual OpenWeatherMap API key
    // You can get one for free from https://openweathermap.org/api
    const OPENWEATHER_API_KEY = ''; // Leave this empty, Canvas will provide it at runtime

    // Function to fetch weather data
    const fetchWeatherData = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const city = 'Hyderabad';
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHER_API_KEY}&units=metric`;

            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            setTemperature(Math.round(data.main.temp));
            setWeatherCondition(data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1));
            setLocation(data.name);
        } catch (err) {
            console.error("Failed to fetch weather data:", err);
            setError("Failed to load weather data.");
            setTemperature('N/A');
            setWeatherCondition('Error');
            setLocation('Unknown');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        // Fetch weather data on component mount
        fetchWeatherData();

        // Set up interval for date/time update
        const timer = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000);

        return () => clearInterval(timer); // Cleanup on unmount
    }, []); // Empty dependency array means this runs once on mount

    // Format date and time
    const optionsDate = { day: '2-digit', month: 'long', year: 'numeric', weekday: 'long' };
    const formattedDate = currentDateTime.toLocaleDateString('en-US', optionsDate);
    const formattedTime = currentDateTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

    // Array to generate multiple snowflakes for animation
    const snowflakes = Array.from({ length: 20 }).map((_, i) => (
        <div
            key={i}
            className="absolute text-white opacity-75 animate-fall-zigzag"
            style={{
                left: `${Math.random() * 100}%`, // Random horizontal position
                animationDuration: `${Math.random() * 8 + 6}s`, // Longer, random fall duration
                animationDelay: `${Math.random() * 6}s`, // Random start delay
                fontSize: `${Math.random() * 0.8 + 0.4}rem`, // Smaller size
                top: `-${Math.random() * 50}%` // Start further above the visible area
            }}
        >
            &#10052; {/* Snowflake Unicode character */}
        </div>
    ));

    return (
        <div className="relative bg-blue-500 text-white p-6 rounded-lg shadow-xl w-full h-72 overflow-hidden">
            {/* Animated snowflakes */}
            {snowflakes}

            {/* Header with Weather, Refresh, and Sun Icon */}
            <div className="flex justify-between items-center mb-4 z-10 relative">
                <h2 className="text-2xl font-bold">Weather</h2>
                <div className="flex space-x-2">
                    <button
                        onClick={fetchWeatherData} // Refresh button now fetches data
                        className="bg-blue-400 bg-opacity-20 p-2 rounded-full hover:bg-opacity-30 transition-all"
                        disabled={isLoading} // Disable while loading
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
                    {isLoading ? '...' : error ? '26°C' : `${temperature}°C`}
                </p>
                <div className="ml-4 bg-blue-400 bg-opacity-30 px-3 py-1 rounded-md text-sm font-semibold">
                    {formattedTime.replace(' ', '')}
                </div>
            </div>

            {/* Weather Condition */}
            <p className="text-lg font-semibold mb-1 z-10 relative">
                {isLoading ? 'Loading...' : error ? 'Error' : weatherCondition}
            </p>

            {/* Date and Location */}
            <p className="text-sm z-10 relative">
                {formattedDate} {isLoading ? '...' : error ? 'Hyderabad' : location}
            </p>

            {/* Tailwind CSS keyframes for animation */}
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
          animation-timing-function: ease-in-out; /* Smoother zig-zag */
          animation-iteration-count: infinite;
        }
      `}</style>
        </div>
    );
}
