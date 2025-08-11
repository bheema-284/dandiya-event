// app/page.js or pages/index.js
'use client';
import Image from 'next/image';

export default function Ticketing() {
    const days = [
        { label: 'SEASON PASS', color: 'bg-yellow-400 text-black' },
        { label: 'DAY 1', color: 'bg-red-600 text-white' },
        { label: 'DAY 2', color: 'bg-gray-200 text-black' },
        { label: 'DAY 3', color: 'bg-pink-200 text-black' },
        { label: 'DAY 4', color: 'bg-gray-200 text-black' },
        { label: 'DAY 5', color: 'bg-yellow-500 text-black' },
        { label: 'DAY 6', color: 'bg-blue-400 text-black' },
        { label: 'DAY 7', color: 'bg-green-400 text-black' },
        { label: 'DAY 8', color: 'bg-yellow-300 text-black' },
        { label: 'DAY 9', color: 'bg-red-500 text-white' },
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Day Tabs */}
            <div className="flex flex-wrap cursor-pointer gap-2 justify-center py-4">
                {days.map((day, idx) => (
                    <button
                        key={idx}
                        className={`px-4 py-1 border-gray-300 cursor-pointer rounded-full font-semibold ${day.color}`}
                    >
                        {day.label}
                    </button>
                ))}
            </div>

            {/* Banner */}
            <div className="flex flex-col lg:flex-row bg-yellow-200 w-full">              
                <div className="flex-1 flex justify-center items-center w-[80%]">
                    <img
                        src="/dandiyanight.PNG"
                        alt="dandiya dancers"
                        width={'full'}
                        height={'full'}
                        className="object-contain"
                    />
                </div>
                <div className="bg-white p-6 border border-gray-600 shadow-md flex flex-col justify-center items-center w-full sm:w-[20%]">
                    <h3 className="font-bold text-xl">DAY 1 PASS</h3>
                    <p className="text-center text-sm mt-2">
                        GRAND OPENING ✨<br />
                        Pooja, RFC Laser Show &<br />
                        The First Beats of Dandiya Magic!
                    </p>
                    <img src="/Book Now.png" alt="pet" className="h-24 w-auto" />
                </div>
            </div>

            {/* About */}
            <section className="px-6 py-8">
                <h2 className="text-xl font-bold mb-4">ABOUT THE EVENT</h2>
                <p className="text-gray-700">
                    This Navratri, Hyderabad’s nights will sparkle like never before as
                    the International Dandiya Carnival takes over the city for 9
                    unforgettable days! Step into a world where tradition meets grand
                    celebration — vibrant colors, rhythmic beats, and the electrifying
                    energy of thousands dancing in unison. From dazzling laser shows to
                    live Dandiya bands, top DJs, celebrity appearances, and themed nights,
                    every moment is designed to keep the festive spirit alive. Whether
                    you’re a seasoned dancer or just here for the music and magic, the
                    carnival promises memories you’ll cherish for a lifetime.
                </p>
            </section>

            {/* Facilities */}
            <section className="px-6 pb-10">
                <h2 className="text-xl font-bold mb-4">EVENT FACILITIES</h2>
                <div className="flex gap-6 text-3xl">
                    <img src="/Parking.png" alt="parking" className="h-8 w-auto" />
                    <img src="/Taxi.png" alt="taxi" className="h-8 w-auto" />
                    <img src="/hotel.png" alt="hotel" className="h-8 w-auto" />
                    <img src="/All age groups.png" alt="all age grous" className="h-8 w-auto" />
                    <img src="/rest rooms.png" alt="rest rooms" className="h-8 w-auto" />
                    <img src="/Non liquor zone.jpg" alt="liquor" className="h-8 w-auto" />
                    <img src="/no drugs icon.jpg" alt="drugs" className="h-8 w-auto" />
                    <img src="/Pet friendly.png" alt="pet" className="h-8 w-auto" />
                </div>
            </section>
        </div>
    );
}
