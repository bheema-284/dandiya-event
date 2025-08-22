'use client';
import { useState, useMemo } from 'react';
import { Ticket } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function Ticketing() {
    const [selectedDays, setSelectedDays] = useState([]); // holds numbers 1..10 (1 = SEASON PASS)
    const router = useRouter();
    const colorClasses = [
        { label: "SEASON PASS", bg: "bg-orange-400 text-white", hover: "hover:bg-orange-100 hover:text-orange-500" },
        { label: "DAY 1", bg: "bg-red-500 text-white", hover: "hover:bg-red-100 hover:text-red-500" },
        { label: "DAY 2", bg: "bg-purple-500 text-white", hover: "hover:bg-purple-100 hover:text-purple-500" },
        { label: "DAY 3", bg: "bg-yellow-500 text-white", hover: "hover:bg-yellow-100 hover:text-yellow-500" },
        { label: "DAY 4", bg: "bg-green-500 text-white", hover: "hover:bg-green-100 hover:text-green-500" },
        { label: "DAY 5", bg: "bg-pink-500 text-white", hover: "hover:bg-pink-100 hover:text-pink-500" },
        { label: "DAY 6", bg: "bg-indigo-500 text-white", hover: "hover:bg-indigo-100 hover:text-indigo-500" },
        { label: "DAY 7", bg: "bg-blue-500 text-white", hover: "hover:bg-blue-100 hover:text-blue-500" },
        { label: "DAY 8", bg: "bg-cyan-500 text-white", hover: "hover:bg-cyan-100 hover:text-cyan-500" },
        { label: "DAY 9", bg: "bg-rose-500 text-white", hover: "hover:bg-rose-100 hover:text-rose-500" }
    ];

    // map day number (1..10) -> colorClasses entry
    const dayColorMap = useMemo(() => {
        const map = {};
        for (let i = 1; i <= colorClasses.length; i++) {
            map[i] = colorClasses[i - 1];
        }
        return map;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // colorClasses is static here

    // The textual details you provided (mapped to day numbers).
    // Note: index 1 corresponds to SEASON PASS; 2..10 correspond to Day 1..Day 9 respectively.
    const dayDetails = {
        2: "Day 1 Pass – 6:16 PM to 1:11 AM | Entry valid for one person only | Celebrate Navratri opening with Pooja & Grand Laser Show.",
        3: "Day 2 Pass – 6:16 PM to 1:11 AM | Entry valid for one person only | Dance into the night with vibrant festive beats.",
        4: "Day 3 Pass – 6:16 PM to 1:11 AM | Entry valid for one person only | Elegant rhythms & non-stop dandiya fun await.",
        5: "Day 4 Pass – 6:16 PM to 1:11 AM | Entry valid for one person only | Pure tradition, high-energy garba, and joy.",
        6: "Day 5 Pass – 6:16 PM to 1:11 AM | Entry valid for one person only | Twirl, groove, and sparkle through the night.",
        7: "Day 6 Pass – 6:16 PM to 1:11 AM | Entry valid for one person only | Fusion beats and electric dandiya vibes.",
        8: "Day 7 Pass – 6:16 PM to 1:11 AM | Entry valid for one person only | Carnival of lights, music, and dance.",
        9: "Day 8 Pass – 6:16 PM to 1:11 AM | Entry valid for one person only | Celebrate under the stars with festive magic.",
        10: "Day 9 Pass – 6:16 PM to 1:11 AM | Entry valid for one person only | Grand Navratri finale with ultimate dandiya energy."
    };

    const artists = useMemo(() => [
        { name: "DJ Ananya", img: "https://randomuser.me/api/portraits/women/10.jpg" },
        { name: "DJ Rohan", img: "https://randomuser.me/api/portraits/men/12.jpg" },
        { name: "DJ Zara", img: "https://randomuser.me/api/portraits/women/24.jpg" },
        { name: "DJ Arjun", img: "https://randomuser.me/api/portraits/men/33.jpg" },
    ], []);

    const seasonSelected = selectedDays.includes(1);

    const handleDayToggle = (day) => {
        // day is a number 1..10
        if (day === 1) {
            // toggle season pass: select all or clear
            if (seasonSelected) {
                setSelectedDays([]);
            } else {
                setSelectedDays(Array.from({ length: colorClasses.length }, (_, i) => i + 1));
            }
            return;
        }

        // if season pass already selected, other buttons are disabled — ignore extra clicks
        if (seasonSelected) return;

        setSelectedDays((prev) =>
            prev.includes(day)
                ? prev.filter((d) => d !== day)
                : [...prev, day].sort((a, b) => a - b)
        );
    };

    // build the list to render on the right side
    const selectedInfoList = useMemo(() => {
        if (seasonSelected) {
            // show all day details (2..10)
            return Object.keys(dayDetails)
                .map(k => Number(k))
                .sort((a, b) => a - b)
                .map((k) => dayDetails[k]);
        }
        // otherwise show only chosen day details (exclude season index 1)
        return selectedDays
            .filter(d => d !== 1 && dayDetails[d])
            .sort((a, b) => a - b)
            .map(d => dayDetails[d]);
    }, [selectedDays, seasonSelected]);

    const eventTitle = seasonSelected
        ? "Season Pass (All Days)"
        : selectedInfoList.length > 0
            ? "Selected Passes"
            : "No Pass Selected";


    const termsAndConditions = [
        "Pass Validity: Entry is valid only for the date and day mentioned on the pass.",
        "Entry Time: Gates open at 6:16 PM and close at 1:11 AM. Late entries may not be permitted.",
        "Non-Transferable: Passes are strictly non-transferable and non-refundable.",
        "Age Restrictions: Children below 5 years are allowed free with parents; above 5 years require a valid pass.",
        "Dress Code: Traditional/ethnic attire is encouraged; management reserves the right to deny entry for inappropriate dressing.",
        "Security Check: All guests are subject to security checks. Outside food, beverages, sharp objects, and prohibited substances are not allowed.",
        "On-Ground Conduct: Any unruly behavior, intoxication, or misconduct will lead to immediate removal without refund.",
        "Photography/Videography: The event may be photographed or recorded; entry implies consent to be featured in promotional material.",
        "Pass Misuse: Lost or damaged passes will not be reissued. Duplicate entries are strictly prohibited.",
        "Event Rights: Organizers reserve the right to make changes to the program, artist lineup, or schedule without prior notice.",
        "Risk Disclaimer: Attendees participate at their own risk; organizers are not liable for personal injury, loss, or damage to property."
    ];

    return (
        <div className="min-h-screen bg-white text-blue-900">
            {/* Day Selection */}
            <div className="flex flex-col items-center gap-4 py-6">
                <div className="flex flex-wrap gap-2 justify-center">
                    {colorClasses.map((item, i) => {
                        const day = i + 1;
                        const isSelected = selectedDays.includes(day);
                        const disabled = seasonSelected && day !== 1;
                        const { hover, bg } = dayColorMap[day];
                        return (
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                whileHover={{ scale: 1.05 }}
                                key={day}
                                onClick={() => handleDayToggle(day)}
                                disabled={disabled}
                                className={`px-3 md:px-4 py-1 rounded-full font-semibold border-2 text-xs md:text-sm transition-all duration-200
                    ${isSelected ? `${bg} shadow-md shadow-yellow-300` : `bg-gray-200 text-gray-700 ${hover}`}
                    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                            >
                                {item.label}
                            </motion.button>
                        );
                    })}
                </div>
            </div>

            {/* Banner */}
            <div className="flex flex-col lg:flex-row bg-yellow-200 w-full h-[55vh]">
                {/* Left side - Image (60%) */}
                <div className="w-full lg:w-3/5 h-full">
                    <div className="flex-1 flex justify-center items-center w-full h-full">
                        <img
                            src="/dandiyanight.PNG"
                            alt="dandiya dancers"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* Right side - Info (40%) */}
                <div className="shadow-md flex flex-col w-full lg:w-2/5 h-full bg-white text-gray-900 relative">
                    <h3 className="font-bold text-sm md:text-md text-center border-b border-dotted border-yellow-500 pb-1">
                        {eventTitle}
                    </h3>
                    <div className="mt-3 flex-1 pb-14 overflow-y-auto">
                        {Object.keys(selectedInfoList).length > 0 ? (
                            <ul className="list-disc pl-6 space-y-3 text-xs">
                                {Object.values(selectedInfoList).map((line, idx) => {
                                    const [heading, ...rest] = line.split(" – ");
                                    return (
                                        <li key={idx} className="leading-snug">
                                            <strong>{heading} –</strong> {rest.join(" – ")}
                                        </li>
                                    );
                                })}
                            </ul>
                        ) : (
                            <p className="text-sm text-center">
                                Select a day or the Season Pass to see details here.
                            </p>
                        )}
                    </div>

                    {/* Book Now Button */}
                    <div onClick={() => { router.push(`/shopcart?days=${selectedDays.join(",")}`); }} className="flex justify-center mt-4">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center justify-center gap-2 py-2 px-4
                    bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400 
                    text-white font-bold text-sm md:text-base shadow-lg 
                    rounded-t-lg border-t-4 border-yellow-200"
                        >
                            <Ticket size={18} />
                            Book Your Ticket Now
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* About */}
            <section className="px-6 py-8">
                <h2 className="text-xl font-bold mb-4 text-center">ABOUT THE EVENT</h2>
                <p>
                    This Navratri, Hyderabad’s nights will sparkle like never before as
                    the International Dandiya Carnival takes over the city for 9
                    unforgettable days! Step into a world where tradition meets grand
                    celebration — vibrant colors, rhythmic beats, and the electrifying
                    energy of thousands dancing in unison...
                </p>
            </section>

            {/* Artists Section */}
            <section className="px-6 py-8">
                <h2 className="text-2xl font-bold mb-4 text-center">ARTISTS</h2>
                <div className="flex flex-wrap justify-center gap-6">
                    {artists.map((artist, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <img src={artist.img} alt={artist.name} className="h-24 w-24 rounded-full object-cover border-4 border-yellow-400" />
                            <p className="mt-2 text-sm font-semibold">{artist.name}</p>
                        </div>
                    ))}
                </div>
            </section>


            {/* Map Location */}
            <section className="px-6 pb-10">
                <h2 className="uppercase text-xl font-bold mb-4 text-center">Map Location</h2>
                <div className="flex justify-center w-full">
                    <img src="/googlemap.png" alt="Google Maps QR Code" className="h-52 w-52 md:h-80 md:w-80" />
                </div>
            </section>

            {/* Facilities */}
            <section className="px-6 pb-10">
                <h2 className="text-xl font-bold mb-4 text-center">EVENT FACILITIES</h2>
                <div className="flex flex-wrap gap-6 text-3xl justify-center">
                    <img src="/Parking.png" alt="parking" className="h-8 sm:h-20 w-auto" />
                    <img src="/Taxi.png" alt="taxi" className="h-8 sm:h-20 w-auto" />
                    <img src="/hotel.png" alt="hotel" className="h-8 sm:h-20 w-auto" />
                    <img src="/All age groups.png" alt="all age groups" className="h-8 sm:h-20 w-auto" />
                    <img src="/rest rooms.png" alt="rest rooms" className="h-8 sm:h-20 w-auto" />
                    <img src="/Pet friendly.png" alt="pet" className="h-8 sm:h-20 w-auto" />
                </div>
            </section>

            {/* Restrictions */}
            <section className="px-6 pb-10">
                <h2 className="text-xl font-bold mb-4 text-center uppercase">Restrictions</h2>
                <div className="flex flex-wrap gap-6 text-3xl justify-center">
                    <img src="/no drugs icon.jpg" alt="drugs" className="h-8 sm:h-20 w-auto" />
                    <img src="/Non liquor zone.jpg" alt="liquor" className="h-8 sm:h-20 w-auto" />
                </div>
            </section>

            {/* Terms & Conditions */}
            <section className="px-6 pb-10 text-center">
                <h2 className="uppercase text-xl font-bold mb-4">Terms & Conditions</h2>
                <div className="space-y-4 font-semibold">
                    {termsAndConditions.map((term, index) => {
                        if (term.includes("inappropriate dressing")) {
                            const [before, after] = term.split("inappropriate dressing");
                            return (
                                <p key={index} className="text-sm">
                                    {before}
                                    <span className="text-red-600 font-bold">inappropriate dressing</span>
                                    {after}
                                </p>
                            );
                        }
                        return (
                            <p key={index} className="text-sm">
                                {term}
                            </p>
                        );
                    })}
                </div>
            </section>
        </div>
    );
}
