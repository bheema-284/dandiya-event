'use client';
import {
    DocumentIcon,
    CalendarIcon,
    UserGroupIcon,
    StarIcon,
    CheckBadgeIcon,
    CakeIcon,
    BriefcaseIcon,
    GiftIcon,
    TrophyIcon,
} from '@heroicons/react/24/outline';

// Data for each of the 9 Dandiya event days.
// The 'id' property should match the parameter in the URL.
const daysData = [
    {
        id: 'Day 1: Opening Ceremony',
        title: 'Day 1: The Grand Opening Ceremony 🎉',
        description: "Join us for the spectacular opening ceremony! Experience the fusion of traditional rituals and modern performances as we kick off the 9-day Dandiya celebration. The night will feature a special guest performance and a community aarti.",
        icon: DocumentIcon,
    },
    {
        id: 'Day 2: Stand-up & Bhangra',
        title: 'Day 2: Stand-up Comedy & Bhangra Night 😂',
        description: "Get ready to laugh and dance! This night is a mix of high-energy Bhangra performances and side-splitting stand-up comedy from local artists. It's a perfect blend of culture and entertainment.",
        icon: CalendarIcon,
    },
    {
        id: 'Day 3: Kids Dandiya',
        title: 'Day 3: Kids Dandiya Carnival 🎈',
        description: "A special night dedicated to our little ones! The Kids Dandiya carnival features face painting, fun games, special Dandiya routines for children, and lots of treats. A family-friendly evening for all.",
        icon: UserGroupIcon,
    },
    {
        id: 'Day 4: Bollywood Extravaganza',
        title: 'Day 4: Bollywood Extravaganza Night 🌟',
        description: "Dress up in your best Bollywood attire and dance to the latest hits! A night filled with vibrant music, dazzling lights, and a dance floor that will have you moving all night long. Special prizes for the best-dressed couple!",
        icon: StarIcon,
    },
    {
        id: 'Day 5: Fusion Night',
        title: 'Day 5: Fusion Dance Night 🎶',
        description: "East meets West on this special night. Our DJs will be mixing traditional Garba and Dandiya beats with international music genres like EDM and hip-hop. Prepare for a unique dance experience!",
        icon: CheckBadgeIcon,
    },
    {
        id: 'Day 6: Dandiya Battle',
        title: 'Day 6: The Ultimate Dandiya Battle ⚔️',
        description: "Show off your skills in our Dandiya Battle! Dancers will face off in friendly competitions for a chance to win grand prizes. Judges will be looking for creativity, rhythm, and style.",
        icon: CakeIcon,
    },
    {
        id: 'Day 7: Grand Finale',
        title: 'Day 7: The Grand Finale Celebration 🎇',
        description: "The final night is here! We'll be celebrating with a massive firework display, a special performance from a renowned artist, and the announcement of the Dandiya Battle winners. Don't miss this epic conclusion!",
        icon: BriefcaseIcon,
    },
    {
        id: 'Day 8: Folk Dance Night',
        title: 'Day 8: Traditional Folk Dance Night 💃',
        description: "Step back in time with a night dedicated to authentic folk dances from across India. Learn different styles and appreciate the rich cultural heritage that Dandiya and Garba represent.",
        icon: GiftIcon,
    },
    {
        id: 'Day 9: Garba Workshop',
        title: 'Day 9: Garba Workshop & Community Feast 🍽️',
        description: "A final farewell with a dedicated Garba workshop for beginners and a grand community feast. Share stories, food, and laughter as we close out the festivities until next year.",
        icon: TrophyIcon,
    },
];

export default function DaysPage(days) {
    const currentDay = daysData.find((_, index) => String(index + 1) === days.days);
    return (
        <div className="min-h-screen text-gray-900 dark:text-white p-4 sm:p-8">
            <div className="max-w-4xl mx-auto mt-20 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                {currentDay ? (
                    // Display content if the day is found
                    <div className="flex flex-col items-center text-center">
                        <div className="flex items-center justify-center h-24 w-24 rounded-full bg-[#0288D1] text-white mb-6 shadow-xl">
                            <currentDay.icon className="h-12 w-12" />
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-bold mb-4">{currentDay.title}</h1>
                        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                            {currentDay.description}
                        </p>
                    </div>
                ) : (
                    // Display a message if the day is not found
                    <div className="flex flex-col items-center text-center py-10">
                        <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-red-500">Day Not Found</h1>
                        <p className="text-lg text-gray-600 dark:text-gray-300">
                            The page you are looking for does not exist. Please navigate back to the main event page.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
