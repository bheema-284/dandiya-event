import { useState } from 'react';
import Image from 'next/image';
import { Sun, Search, ChevronDown, Bell, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

const users = [
    { id: 1, name: 'Paige Turner', location: 'Alabama, USA', status: 'online', avatar: 'https://randomuser.me/api/portraits/women/14.jpg' },
    { id: 2, name: 'Bob Frapples', location: 'Alabama, USA', status: 'online', avatar: 'https://randomuser.me/api/portraits/men/16.jpg' },
    { id: 3, name: 'Josephine Water', location: 'Alabama, USA', status: 'offline', avatar: 'https://randomuser.me/api/portraits/women/17.jpg' },
    { id: 4, name: 'Petey Cruiser', location: 'Alabama, USA', status: 'offline', avatar: 'https://randomuser.me/api/portraits/men/10.jpg' },
];

export default function DandiyaPartner() {
    const [activeTab, setActiveTab] = useState('friends');
    const [showFriends, setShowFriends] = useState(true);
    const [showRecents, setShowRecents] = useState(true);

    const toggleFriends = () => setShowFriends(!showFriends);
    const toggleRecents = () => setShowRecents(!showRecents);

    const TabButton = ({ label, icon: Icon, tabName }) => (
        <button
            onClick={() => setActiveTab(tabName)}
            className={`flex-1 flex flex-col items-center justify-center p-3 rounded-xl transition-colors duration-200 ${activeTab === tabName ? 'bg-indigo-600' : 'text-gray-400 hover:bg-gray-700'
                }`}
        >
            <Icon size={24} />
            <span className="text-xs mt-1">{label}</span>
        </button>
    );

    const UserItem = ({ user }) => (
        <div className="flex items-center space-x-4 p-4 rounded-xl hover:bg-gray-700 hover:text-white transition-colors duration-200 cursor-pointer">
            <div className="relative">
                <Image
                    src={user.avatar}
                    alt={user.name}
                    width={46}
                    height={46}
                    className="rounded-xl object-cover w-14 h-14"
                />
                <div className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full ring-2 ring-gray-800 ${user.status === 'online' ? 'bg-green-500' : 'bg-red-500'}`}></div>
            </div>
            <div className="flex-1">
                <p className="text-sm font-semibold">{user.name}</p>
                <p className="text-xs text-gray-400">{user.location}</p>
            </div>
        </div>
    );

    return (
        <div>
            <div className="bg-gradient-to-r from-orange-400 to-red-500 rounded-lg shadow w-full">
                {/* <h2 className="font-semibold text-lg sm:text-sm text-center">FIND MY DANDIYA PARTNER</h2> */}
                <motion.button
                    whileHover={{ scale: 1 }}
                    whileTap={{ scale: 0.65 }}
                    className="sticky bottom-0 cursor-pointer left-0 w-full flex items-center justify-center gap-2 py-2 
                                       bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400 
                                       text-white font-bold text-sm md:text-base shadow-lg 
                                       rounded-t-lg border-t-4 border-yellow-200"
                >
                    FIND MY DANDIYA PARTNER
                </motion.button>
                <div className="flex items-center space-x-3 mb-2 justify-center p-6">
                    <img src={'/dandiya.png'} />
                </div>
            </div>
            <div className="max-w-md mx-auto bg-gray-700 text-white rounded-2xl shadow-lg overflow-hidden mt-5">
                {/* Header Section */}
                <div className="p-6">
                    <div className="flex justify-between items-center">
                        <div className="space-y-1">
                            <h1 className="text-lg font-bold ">Friends</h1>
                        </div>
                        <button className={`p-2 rounded-xl cursor-pointer transition-colors duration-200`}>
                            <Sun size={20} />
                        </button>
                    </div>
                    <p className="text-xs mb-4">Start New Conversation</p>
                    {/* Search Bar */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Find Friends..."
                            className="w-full pl-10 pr-4 py-3 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    </div>
                </div>

                {/* Close Friends Section */}
                <div className="px-6 py-4 border-t border-dotted border-gay-500">
                    <button onClick={toggleFriends} className="flex justify-between items-center w-full focus:outline-none">
                        <h2 className="text-md font-semibold">Close Friends</h2>
                        <ChevronDown className={`text-gray-400 transform transition-transform duration-200 ${showFriends ? 'rotate-180' : 'rotate-0'}`} />
                    </button>
                    {showFriends && (
                        <div className="mt-4 space-y-0.5">
                            {users.slice(0, 2).map((user) => (
                                <UserItem key={user.id} user={user} />
                            ))}
                        </div>
                    )}
                </div>

                {/* Recent Chats Section */}
                <div className="px-6 py-4 border-t border-dotted border-gay-500">
                    <button onClick={toggleRecents} className="flex justify-between items-center w-full focus:outline-none">
                        <h2 className="text-md font-semibold">Recent Chats</h2>
                        <ChevronDown className={`text-gray-400 transform transition-transform duration-200 ${showRecents ? 'rotate-180' : 'rotate-0'}`} />
                    </button>
                    {showRecents && (
                        <div className="mt-4 space-y-0.5">
                            {users.slice(2, 4).map((user) => (
                                <UserItem key={user.id} user={user} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
