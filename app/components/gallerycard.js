'use client';
import { MagnifyingGlassIcon, SunIcon } from '@heroicons/react/24/solid';
import { useEffect, useRef, useState } from 'react';


// Dummy data for friends search
const friends = [
  {
    name: 'Vyshali G',
    email: 'vyshali.g123@example.com',
    following: 321,
    likes: 12453,
    followers: 5401,
    profileImage: 'https://randomuser.me/api/portraits/women/12.jpg',
    coverImage: 'https://picsum.photos/1200/400?random=1',
  },
  {
    name: 'Bheema Guguloth',
    email: 'bheema.guguloth88@example.com',
    following: 578,
    likes: 21200,
    followers: 6892,
    profileImage: 'https://randomuser.me/api/portraits/men/1.jpg',
    coverImage: 'https://picsum.photos/1200/400?random=2',
  },
  {
    name: 'Charlie Brown',
    email: 'charlie.brown@example.com',
    following: 402,
    likes: 9870,
    followers: 3381,
    profileImage: 'https://randomuser.me/api/portraits/men/2.jpg',
    coverImage: 'https://picsum.photos/1200/400?random=3',
  },
  {
    name: 'Diana Prince',
    email: 'diana.prince@example.com',
    following: 719,
    likes: 18004,
    followers: 9203,
    profileImage: 'https://randomuser.me/api/portraits/women/3.jpg',
    coverImage: 'https://picsum.photos/1200/400?random=4',
  },
  {
    name: 'Vikranth B',
    email: 'vikranth.b@example.com',
    following: 215,
    likes: 7341,
    followers: 2433,
    profileImage: 'https://randomuser.me/api/portraits/men/4.jpg',
    coverImage: 'https://picsum.photos/1200/400?random=5',
  },
  {
    name: 'Fiona Gallagher',
    email: 'fiona.g@example.com',
    following: 387,
    likes: 19843,
    followers: 5602,
    profileImage: 'https://randomuser.me/api/portraits/women/5.jpg',
    coverImage: 'https://picsum.photos/1200/400?random=6',
  },
  {
    name: 'Bheemudu G',
    email: 'bheemudu.g@example.com',
    following: 431,
    likes: 15422,
    followers: 3765,
    profileImage: 'https://randomuser.me/api/portraits/men/6.jpg',
    coverImage: 'https://picsum.photos/1200/400?random=7',
  },
  {
    name: 'Hannah Scott',
    email: 'hannah.scott@example.com',
    following: 524,
    likes: 20419,
    followers: 6100,
    profileImage: 'https://randomuser.me/api/portraits/women/7.jpg',
    coverImage: 'https://picsum.photos/1200/400?random=8',
  },
  {
    name: 'Isaac Newton',
    email: 'isaac.newton@example.com',
    following: 610,
    likes: 25134,
    followers: 7430,
    profileImage: 'https://randomuser.me/api/portraits/men/8.jpg',
    coverImage: 'https://picsum.photos/1200/400?random=9',
  },
  {
    name: 'Jessica Alba',
    email: 'jessica.alba@example.com',
    following: 280,
    likes: 18724,
    followers: 5099,
    profileImage: 'https://randomuser.me/api/portraits/women/9.jpg',
    coverImage: 'https://picsum.photos/1200/400?random=10',
  },
  {
    name: 'Bheem Sagar',
    email: 'bheem.sagar@example.com',
    following: 690,
    likes: 29852,
    followers: 8923,
    profileImage: 'https://randomuser.me/api/portraits/men/10.jpg',
    coverImage: 'https://picsum.photos/1200/400?random=11',
  },
  {
    name: 'Laura Croft',
    email: 'laura.croft@example.com',
    following: 312,
    likes: 13304,
    followers: 4002,
    profileImage: 'https://randomuser.me/api/portraits/women/11.jpg',
    coverImage: 'https://picsum.photos/1200/400?random=12',
  },
  {
    name: 'Mike Tyson',
    email: 'mike.tyson@example.com',
    following: 472,
    likes: 16690,
    followers: 5321,
    profileImage: 'https://randomuser.me/api/portraits/men/13.jpg',
    coverImage: 'https://picsum.photos/1200/400?random=13',
  },
  {
    name: 'Nancy Drew',
    email: 'nancy.drew@example.com',
    following: 337,
    likes: 14322,
    followers: 4123,
    profileImage: 'https://randomuser.me/api/portraits/women/14.jpg',
    coverImage: 'https://picsum.photos/1200/400?random=14',
  },
  {
    name: 'Oliver Twist',
    email: 'oliver.twist@example.com',
    following: 506,
    likes: 17489,
    followers: 5977,
    profileImage: 'https://randomuser.me/api/portraits/men/15.jpg',
    coverImage: 'https://picsum.photos/1200/400?random=15',
  },
];

export default function GalleryCard() {

  const [searchQuery, setSearchQuery] = useState('');
  const [showFriendsSearch, setShowFriendsSearch] = useState(false);
  const searchRef = useRef(null);
  // Effect to handle clicks outside the search dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowFriendsSearch(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchRef]);

  // Filter the friends based on the search query
  const filteredFriends = friends.filter(friend =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFriendClick = (friend) => {
    setSearchQuery(friend.name);
    setShowFriendsSearch(false);
  };
  return (
    <div className="bg-gray-700 text-white rounded-lg shadow w-[90%] m-auto">
      <div className="flex justify-between items-center mb-4 z-10">
        <div>
          <h2 className="text-lg font-bold">Friends</h2>
          <p className="text-sm">Start New Conversation</p>
        </div>
        <div className="flex space-x-2">
          <button className="bg-gray-400 bg-opacity-20 cursor-pointer p-2 rounded-xl hover:bg-opacity-30 transition-all">
            <SunIcon className="h-5 w-5 text-white" />
          </button>
        </div>
      </div>

      <div className="flex items-center w-full" ref={searchRef}>
        <div className="flex items-center bg-gray-800/20 rounded-md px-3 py-2">
          <MagnifyingGlassIcon className="h-5 w-5 text-white mr-2" />
          <input
            type="text"
            placeholder="Find Friends..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowFriendsSearch(e.target.value.length > 0);
            }}
            onFocus={() => setShowFriendsSearch(searchQuery.length > 0)}
            className="bg-transparent text-white placeholder-white outline-none text-sm"
          />
        </div>
        {showFriendsSearch && (
          <div className="absolute top-full mt-2 w-full bg-gray-800 text-white rounded-lg shadow-lg max-h-64 overflow-y-auto z-50">
            {filteredFriends.length > 0 ? (
              filteredFriends.map((friend, index) => (
                <div
                  key={index}
                  onClick={() => handleFriendClick(friend)}
                  className="flex items-center gap-3 p-2 hover:bg-gray-100 cursor-pointer">
                  <img src={friend.profileImage} className="w-8 h-8 rounded-full object-cover" />
                  <p className="font-semibold text-sm">{friend.name}</p>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500">No friends found</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
