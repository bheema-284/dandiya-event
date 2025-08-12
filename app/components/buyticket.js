'use client';
import { useState, useMemo } from 'react';
import { useTheme } from '../config/themecontext';

export default function Ticketing() {
    const [selectedDays, setSelectedDays] = useState([]);
    const { theme } = useTheme();

    const colorClasses = [
        { label: "SEASON PASS", selectedBg: "bg-orange-400 text-black", bg: "bg-orange-100 text-orange-500" },
        { label: "DAY 1", selectedBg: "bg-red-500 text-white", bg: "bg-red-100 text-red-500" },
        { label: "DAY 2", selectedBg: "bg-purple-500 text-white", bg: "bg-purple-100 text-purple-500" },
        { label: "DAY 3", selectedBg: "bg-yellow-500 text-black", bg: "bg-yellow-100 text-yellow-500" },
        { label: "DAY 4", selectedBg: "bg-green-500 text-white", bg: "bg-green-100 text-green-500" },
        { label: "DAY 5", selectedBg: "bg-pink-500 text-white", bg: "bg-pink-100 text-pink-500" },
        { label: "DAY 6", selectedBg: "bg-indigo-500 text-white", bg: "bg-indigo-100 text-indigo-500" },
        { label: "DAY 7", selectedBg: "bg-emerald-500 text-white", bg: "bg-emerald-100 text-emerald-500" },
        { label: "DAY 8", selectedBg: "bg-cyan-500 text-white", bg: "bg-cyan-100 text-cyan-500" },
        { label: "DAY 9", selectedBg: "bg-rose-500 text-white", bg: "bg-rose-100 text-rose-500" }
    ];


    const dayColorMap = useMemo(() => {
        const map = {};
        for (let i = 1; i <= 10; i++) {
            map[i] = colorClasses[i % colorClasses.length];
        }
        return map;
    }, []);

    const isAllDaysSelected = selectedDays.length === 11;

    const handleDayToggle = (day) => {
        if (day === 'all') {
            if (isAllDaysSelected) {
                setSelectedDays([]);
            } else {
                setSelectedDays(Array.from({ length: 9 }, (_, i) => i + 1));
            }
        } else {
            setSelectedDays((prev) =>
                prev.includes(day)
                    ? prev.filter((d) => d !== day)
                    : [...prev, day].sort((a, b) => a - b)
            );
        }
    };

    return (
        <div style={{
            backgroundColor: "var(--bg-card)",
            color: theme === 'dark' ? "var(--card-text)" : "var(--text-primary)"
        }} className="min-h-screen">
            {/* Day Selection */}
            <div className="flex flex-col items-center gap-4 py-6">
                <div className="flex flex-wrap gap-2 justify-center">
                    {colorClasses.map((item, i) => {
                        const day = i + 1;
                        const isSelected = selectedDays.includes(day) || isAllDaysSelected;
                        const { bg, selectedBg } = dayColorMap[day];
                        return (
                            <button
                                key={day}
                                onClick={() => handleDayToggle(day)}
                                disabled={isAllDaysSelected}
                                className={`px-2 py-0.5 rounded-full cursor-pointer text-center border-2 ${theme === "light" ? "border-gray-300":"border-white"} font-semibold text-sm transition-all duration-200 ${isSelected
                                    ? `${selectedBg} shadow-md`
                                    : `hover:gray-400 ${bg}`
                                    } ${isAllDaysSelected ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {item.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Banner */}
            <div className="flex flex-col lg:flex-row bg-yellow-200 w-full">
                <div className="w-full lg:w-[80%]">
                    <div className="flex-1 flex justify-center items-center w-full h-full">
                        <img
                            src="/dandiyanight.PNG"
                            alt="dandiya dancers"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                <div style={{
                    backgroundColor: "var(--bg-primary)",
                    color: "var(--text-primary)"
                }} className="p-2 shadow-md flex flex-col justify-center items-center w-full lg:w-[20%]">
                    <h3 className="font-bold text-xl">DAY 1 PASS</h3>
                    <p className="text-center text-sm mt-2">
                        GRAND OPENING ✨<br />
                        Pooja, RFC Laser Show &<br />
                        The First Beats of Dandiya Magic!
                    </p>
                    <img src="/Book Now.png" alt="book" className="h-24 w-auto mt-4" />
                </div>
            </div>

            {/* About */}
            <section className="px-6 py-8">
                <h2 className="text-xl font-bold mb-4">ABOUT THE EVENT</h2>
                <p>
                    This Navratri, Hyderabad’s nights will sparkle like never before as
                    the International Dandiya Carnival takes over the city for 9
                    unforgettable days! Step into a world where tradition meets grand
                    celebration — vibrant colors, rhythmic beats, and the electrifying
                    energy of thousands dancing in unison...
                </p>
            </section>

            {/* Facilities */}
            <section className="px-6 pb-10">
                <h2 className="text-xl font-bold mb-4">EVENT FACILITIES</h2>
                <div className="flex flex-wrap gap-6 text-3xl">
                    <img src="/Parking.png" alt="parking" className="h-8 w-auto" />
                    <img src="/Taxi.png" alt="taxi" className="h-8 w-auto" />
                    <img src="/hotel.png" alt="hotel" className="h-8 w-auto" />
                    <img src="/All age groups.png" alt="all age groups" className="h-8 w-auto" />
                    <img src="/rest rooms.png" alt="rest rooms" className="h-8 w-auto" />
                    <img src="/Non liquor zone.jpg" alt="liquor" className="h-8 w-auto" />
                    <img src="/no drugs icon.jpg" alt="drugs" className="h-8 w-auto" />
                    <img src="/Pet friendly.png" alt="pet" className="h-8 w-auto" />
                </div>
            </section>
        </div>
    );
}
