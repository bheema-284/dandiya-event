'use client';

import { UserGroupIcon, HomeIcon, CogIcon, UsersIcon, UserIcon } from '@heroicons/react/24/solid';

export default function GradientIcons() {
  const gradientId = 'icon-gradient';

  return (
    <div className="flex gap-6 p-6 bg-gray-100 min-h-screen items-center justify-center">
      {/* Define gradient */}
      <svg width="0" height="0">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop stopColor="#bdc319ff" offset="0%" />  
            <stop stopColor="#80920a" offset="50%" />
            <stop stopColor="#e3611bff" offset="100%" />
          </linearGradient>
        </defs>
      </svg>

      {/* Icons with gradient fill */}
      <UserGroupIcon style={{ fill: `url(#${gradientId})` }} className="h-12 w-12" />
      <HomeIcon style={{ fill: `url(#${gradientId})` }} className="h-12 w-12" />
      <UserIcon style={{ fill: `url(#${gradientId})` }} className="h-12 w-12" />
      <UsersIcon style={{ fill: `url(#${gradientId})` }} className="h-12 w-12" />
      <CogIcon style={{ fill: `url(#${gradientId})` }} className="h-12 w-12" />
    </div>
  );
}
