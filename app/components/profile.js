'use client';
import React, { useState, useEffect, useContext } from 'react';
import {
    ClockIcon,
    UserCircleIcon,
    UsersIcon,
    PhotoIcon,
    MagnifyingGlassIcon,
    RssIcon,
    PencilIcon
} from '@heroicons/react/24/outline';
import {
    ClockIcon as ClockIconSolid,
    UserCircleIcon as UserCircleIconSolid,
    UsersIcon as UsersIconSolid,
    PhotoIcon as PhotoIconSolid,
    RssIcon as RssIconSolid
} from '@heroicons/react/24/solid';
import RootContext from './config/rootcontext';


// Dummy data for friends
const dummyFriends = [
    { name: 'Alice Smith', avatar: 'https://randomuser.me/api/portraits/women/12.jpg' },
    { name: 'Bob Johnson', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { name: 'Charlie Brown', avatar: 'https://randomuser.me/api/portraits/men/2.jpg' },
    { name: 'Diana Prince', avatar: 'https://randomuser.me/api/portraits/women/3.jpg' },
    { name: 'Edward Jones', avatar: 'https://randomuser.me/api/portraits/men/4.jpg' },
    { name: 'Fiona Gallagher', avatar: 'https://randomuser.me/api/portraits/women/5.jpg' },
    { name: 'George Miller', avatar: 'https://randomuser.me/api/portraits/men/6.jpg' },
    { name: 'Hannah Scott', avatar: 'https://randomuser.me/api/portraits/women/7.jpg' },
    { name: 'Isaac Newton', avatar: 'https://randomuser.me/api/portraits/men/8.jpg' },
    { name: 'Jessica Alba', avatar: 'https://randomuser.me/api/portraits/women/9.jpg' },
    { name: 'Kevin Durant', avatar: 'https://randomuser.me/api/portraits/men/10.jpg' },
    { name: 'Laura Croft', avatar: 'https://randomuser.me/api/portraits/women/11.jpg' },
    { name: 'Mike Tyson', avatar: 'https://randomuser.me/api/portraits/men/13.jpg' },
    { name: 'Nancy Drew', avatar: 'https://randomuser.me/api/portraits/women/14.jpg' },
    { name: 'Oliver Twist', avatar: 'https://randomuser.me/api/portraits/men/15.jpg' },
];

// Content for the About tab
const AboutContent = () => (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-bold mb-4">About Kelin Jasen</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <h4 className="font-semibold text-lg">Personal Info</h4>
                <ul className="text-gray-600 dark:text-gray-400">
                    <li><strong>Birthday:</strong> January 15, 1995</li>
                    <li><strong>Hometown:</strong> New York, NY</li>
                    <li><strong>Relationship Status:</strong> Single</li>
                </ul>
            </div>
            <div>
                <h4 className="font-semibold text-lg">Work & Education</h4>
                <ul className="text-gray-600 dark:text-gray-400">
                    <li><strong>Occupation:</strong> Software Developer at TechCorp</li>
                    <li><strong>Education:</strong> B.S. in Computer Science from MIT</li>
                </ul>
            </div>
        </div>
    </div>
);

// Content for the Friends tab
const FriendsContent = () => (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-bold mb-4">Friends ({dummyFriends.length})</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {dummyFriends.map((friend, index) => (
                <div key={index} className="flex flex-col items-center p-2 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <img src={friend?.avatar} alt={friend?.name} className="w-16 h-16 rounded-full object-cover mb-2" />
                    <p className="text-sm font-semibold text-center">{friend?.name}</p>
                </div>
            ))}
        </div>
    </div>
);

// Content for the Photos tab
const PhotosContent = () => (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-bold mb-4">Photos</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 12 }).map((_, index) => (
                <div key={index} className="relative aspect-square overflow-hidden rounded-lg">
                    <img src={`https://picsum.photos/400/400?random=${index + 10}`} alt={`Gallery image ${index + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                </div>
            ))}
        </div>
    </div>
);

// Timeline content with a simple post component
const TimelineContent = ({ posts }) => (
    <div className="flex flex-col gap-6">
        {posts.map((post) => (
            <div key={post.id} className="bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="flex items-center gap-3 mb-4">
                    <img src={post.avatar} alt={post.author} className="w-10 h-10 rounded-full" />
                    <div>
                        <p className="font-bold">{post.author}</p>
                        <p className="text-sm text-gray-200">{post.timestamp}</p>
                    </div>
                </div>
                <p className="mb-4">{post.content}</p>
                {post.image && (
                    <img src={post.image} alt="Post content" className="w-full rounded-lg mb-4" />
                )}
                <div className="flex justify-between text-gray-200 text-sm">
                    <span>{post.likes} Likes</span>
                    <span>{post.comments} Comments</span>
                </div>
            </div>
        ))}
    </div>
);

export default function FriendProfilePage() {
    const [activeTab, setActiveTab] = useState('Timeline');
    const { rootContext } = useContext(RootContext)
    const friend = rootContext.user.name || "Un Know"
    // Define the tabs for the navigation bar
    const tabs = [
        { name: 'Timeline', icon: ClockIcon, solidIcon: ClockIconSolid },
        { name: 'About', icon: UserCircleIcon, solidIcon: UserCircleIconSolid },
        { name: 'Friends', icon: UsersIcon, solidIcon: UsersIconSolid },
        { name: 'Photos', icon: PhotoIcon, solidIcon: PhotoIconSolid },
        { name: 'Activity Feed', icon: RssIcon, solidIcon: RssIconSolid },
    ];
    const dummyPosts = [
        {
            id: 1,
            author: friend?.name,
            timestamp: '2 hours ago',
            content: 'Just uploaded a new cover photo! What do you guys think?',
            image: 'https://picsum.photos/800/600?random=2',
            likes: 124,
            comments: 32
        },
        {
            id: 2,
            author: friend?.name,
            timestamp: '5 hours ago',
            content: 'Had a great time at the event last night. Dandiya night was amazing!',
            image: null,
            likes: 89,
            comments: 15
        },
        {
            id: 3,
            author: friend?.name,
            timestamp: '1 day ago',
            content: 'Throwback to last year\'s celebration. So much fun!',
            image: 'https://picsum.photos/800/600?random=3',
            likes: 201,
            comments: 50
        },
    ];
    // Function to render content based on the active tab
    const renderContent = () => {
        switch (activeTab) {
            case 'Timeline':
                return <TimelineContent posts={dummyPosts} />;
            case 'About':
                return <AboutContent />;
            case 'Friends':
                return <FriendsContent />;
            case 'Photos':
                return <PhotosContent />;
            case 'Activity Feed':
                return <TimelineContent posts={dummyPosts} />; // Using Timeline content as a placeholder
            default:
                return <div>Select a tab to view content.</div>;
        }
    };

    return (
        <div>
            <div className="min-h-screen bg-gray-100 text-white dark:text-white p-4 sm:p-6 lg:p-8">
                {/* Cover Photo and Profile Card Section */}
                <div className="relative bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                    {/* Cover Photo */}
                    <div
                        className="relative w-full h-48 md:h-64 bg-cover bg-center"
                        style={{ backgroundImage: `url(${friend?.coverImage || ""})` }}
                    >
                        <div className="absolute inset-0 bg-black/30 flex items-end justify-end p-4">
                            <button className="flex items-center gap-1 text-white bg-black/50 hover:bg-black/70 px-4 py-2 rounded-full backdrop-blur-sm transition-colors">
                                <PencilIcon className="h-4 w-4" /> Edit Cover
                            </button>
                        </div>
                    </div>

                    {/* Profile Details Card */}
                    <div className="relative -mt-20 md:-mt-24 ml-4 md:ml-8 lg:ml-12 p-4 md:p-6 bg-gray-800 rounded-lg shadow-xl w-[95%] sm:w-3/4 md:w-2/3 lg:w-1/3">
                        <div className="absolute -top-16 md:-top-20 left-1/2 -translate-x-1/2 md:left-4 md:translate-x-0">
                            <img src={friend?.profileImage || ""} alt="Profile" className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white dark:border-gray-800 shadow-lg" />
                        </div>

                        <div className="mt-10 md:mt-16 text-center md:text-left">
                            <h2 className="text-2xl font-bold flex items-center justify-center md:justify-start gap-2">
                                {friend?.name} ❤️
                            </h2>
                            <p className="text-gray-200 dark:text-gray-400">{friend?.email}</p>

                            {/* Social Stats */}
                            <div className="flex justify-around md:justify-start gap-4 my-4">
                                <div className="text-center">
                                    <p className="font-bold">{friend?.following}</p>
                                    <p className="text-sm text-gray-200">Following</p>
                                </div>
                                <div className="text-center">
                                    <p className="font-bold">{friend?.likes}</p>
                                    <p className="text-sm text-gray-200">Likes</p>
                                </div>
                                <div className="text-center">
                                    <p className="font-bold">{friend?.followers}</p>
                                    <p className="text-sm text-gray-200">Followers</p>
                                </div>
                            </div>

                            <button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition-colors">
                                Edit Profile
                            </button>
                        </div>
                    </div>
                </div>

                {/* Navigation and Main Content Section */}
                <div className="mt-8">
                    {/* Navigation Tabs */}
                    <div className="bg-gray-800 rounded-lg shadow-md mb-6 p-4">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                            {tabs.map((tab) => {
                                const isActive = activeTab === tab.name;
                                const IconComponent = isActive ? tab.solidIcon : tab.icon;
                                return (
                                    <button
                                        key={tab.name}
                                        onClick={() => setActiveTab(tab.name)}
                                        className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${isActive
                                            ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300'
                                            : 'text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
                                            }`}
                                    >
                                        <IconComponent className="h-5 w-5" />
                                        <span className="font-semibold text-sm hidden sm:inline">{tab.name}</span>
                                    </button>
                                );
                            })}
                            <div className="relative flex-grow text-gray-700">
                                <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search Here..."
                                    className="w-full bg-gray-100 dark:bg-gray-700 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="mt-6">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    );
}