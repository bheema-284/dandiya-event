import { UsersIcon, CheckIcon, XMarkIcon } from '@heroicons/react/20/solid'

export default function EventCard() {
  return (
    <div className="max-w-md mx-auto bg-gray-800 rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div>
        <img 
          className="h-48 w-full object-cover" 
          src="https://picsum.photos/id/20/600/400" 
          alt="Christmas event" 
        />
      </div>
      <div className="p-8">
        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Christmas 2021</div>
        <a href="#" className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">
          26 January 2021
        </a>
        <p className="mt-2 text-slate-500">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
        </p>
        <div className="mt-4 flex items-center text-gray-600">
          <UsersIcon className="h-5 w-5 text-gray-400" />
          <span className="ml-2">15256 People Going</span>
        </div>
        <div className="mt-4 flex space-x-2">
          <button className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <CheckIcon className="h-4 w-4" />
            <span className="ml-2">Going</span>
          </button>
          <button className="flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <XMarkIcon className="h-4 w-4" />
            <span className="ml-2">Not Going</span>
          </button>
        </div>
      </div>
    </div>
  );
}