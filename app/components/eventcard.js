import { UsersIcon, CheckIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { useTheme } from '../config/themecontext';

export default function EventCard() {
  const { theme } = useTheme();

  return (
    <div style={{
      backgroundColor: "var(--bg-card)",
      color: theme === 'dark' ? "var(--card-text)" : "var(--text-primary)"
    }} className="rounded-xl shadow-md overflow-hidden">
      <div>
        <img
          className="h-48 w-full object-cover"
          src="https://picsum.photos/id/20/600/400"
          alt="Christmas event"
        />
      </div>
      <div className="p-2">
        <div className="tracking-wide text-md font-semibold">Christmas 2025</div>
        <a href="#" className="block mt-1 text-sm leading-tight hover:underline">
          26 January 2025
        </a>
        <p className="mt-2 text-slate-500">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
        </p>
        <div className="mt-4 flex items-center text-gray-600">
          <UsersIcon className="h-5 w-5 text-gray-400" />
          <span className="ml-2">15256 People Going</span>
        </div>
        <div className="mt-4 flex space-x-2">
          <button className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-md">
            <span className="text-blue-800">Going/Not Going</span>
          </button>         
        </div>
      </div>
    </div>
  );
}