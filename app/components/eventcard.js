import { useState } from 'react';
import Image from 'next/image';
import { UserIcon } from '@heroicons/react/24/solid';
import { Sun, Search, ChevronDown, Bell, MessageSquare } from 'lucide-react';

const users = [
    { id: 1, name: 'Paige Turner', location: 'Alabama, USA', status: 'online', avatar: 'https://randomuser.me/api/portraits/women/14.jpg' },
    { id: 2, name: 'Bob Frapples', location: 'Alabama, USA', status: 'online', avatar: 'https://randomuser.me/api/portraits/men/16.jpg' },
    { id: 3, name: 'Josephine Water', location: 'Alabama, USA', status: 'offline', avatar: 'https://randomuser.me/api/portraits/women/10.jpg' },
    { id: 4, name: 'Petey Cruiser', location: 'Alabama, USA', status: 'offline', avatar: 'https://randomuser.me/api/portraits/men/10.jpg' },
];

export default function App() {
    const [activeTab, setActiveTab] = useState('friends');
    const [showFriends, setShowFriends] = useState(true);
    const [showRecents, setShowRecents] = useState(true);

    const toggleFriends = () => setShowFriends(!showFriends);
    const toggleRecents = () => setShowRecents(!showRecents);

    const TabButton = ({ label, icon: Icon, tabName }) => (
        <button
            onClick={() => setActiveTab(tabName)}
            className={`flex-1 flex flex-col items-center justify-center p-3 rounded-xl transition-colors duration-200 ${activeTab === tabName ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:bg-gray-700'
                }`}
        >
            <Icon size={24} />
            <span className="text-xs mt-1">{label}</span>
        </button>
    );

    const UserItem = ({ user }) => (
        <div className="flex items-center space-x-4 p-4 rounded-xl hover:bg-gray-700 transition-colors duration-200 cursor-pointer">
            <div className="relative">
                <Image
                    src={user.avatar}
                    alt={user.name}
                    width={56}
                    height={56}
                    className="rounded-full object-cover w-14 h-14"
                />
                <div className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full ring-2 ring-gray-800 ${user.status === 'online' ? 'bg-green-500' : 'bg-red-500'}`}></div>
            </div>
            <div className="flex-1">
                <p className="font-semibold text-white">{user.name}</p>
                <p className="text-sm text-gray-400">{user.location}</p>
            </div>
        </div>
    );

    return (
        <div>
            <div className="bg-gradient-to-r from-orange-400 to-red-500 text-white p-6 rounded-lg shadow w-full">
                <h3 className="text-xl font-bold mb-2">Find My Dandiya Partner</h3>
                <div className="flex items-center space-x-3 mb-2 justify-center">
                    <img src={'/dandiya.png'}/>
                </div>
            </div>
            <div className="max-w-md mx-auto bg-gray-800 rounded-2xl shadow-lg overflow-hidden mt-5">
                {/* Header Section */}
                <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <div className="space-y-1">
                            <h1 className="text-3xl font-bold text-white">Friends</h1>
                            <p className="text-gray-400">Start New Conversation</p>
                        </div>
                        <button className="p-2 rounded-full bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors duration-200">
                            <Sun size={20} />
                        </button>
                    </div>

                    {/* Search Bar */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Find Friends..."
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    </div>
                </div>

                {/* Close Friends Section */}
                <div className="px-6 py-4 border-t border-gray-700">
                    <button onClick={toggleFriends} className="flex justify-between items-center w-full focus:outline-none">
                        <h2 className="text-xl font-semibold text-white">Close Friends</h2>
                        <ChevronDown className={`text-gray-400 transform transition-transform duration-200 ${showFriends ? 'rotate-180' : 'rotate-0'}`} />
                    </button>
                    {showFriends && (
                        <div className="mt-4 space-y-2">
                            {users.slice(0, 2).map((user) => (
                                <UserItem key={user.id} user={user} />
                            ))}
                        </div>
                    )}
                </div>

                {/* Recent Chats Section */}
                <div className="px-6 py-4 border-t border-gray-700">
                    <button onClick={toggleRecents} className="flex justify-between items-center w-full focus:outline-none">
                        <h2 className="text-xl font-semibold text-white">Recent Chats</h2>
                        <ChevronDown className={`text-gray-400 transform transition-transform duration-200 ${showRecents ? 'rotate-180' : 'rotate-0'}`} />
                    </button>
                    {showRecents && (
                        <div className="mt-4 space-y-2">
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
