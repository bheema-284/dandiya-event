export default function BirthdayCard() {
    return (
        <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white p-6 rounded-lg shadow w-64">
            <h3 className="text-xl font-bold mb-2">Birthday !!!!</h3>
            <p className="text-sm mb-2">Today Your College Friend's Birthday</p>
            <div className="flex items-center space-x-3 mb-2">
                <img
                    src="https://randomuser.me/api/portraits/women/2.jpg"
                    alt="friend"
                    className="rounded-full w-12 h-12"
                />
                <div>
                    <p className="font-bold">Sufiya Elija</p>
                    <p className="text-xs">Glasgow, Scotland</p>
                </div>
            </div>
            <p className="text-sm mb-4">
                Lorem 5th Sept 2019 dummy text of the printing and typesetting industry.
            </p>
            <button className="bg-white text-purple-600 font-bold px-4 py-2 rounded w-full">
                Wish Birthday To Your Friend →
            </button>
        </div>
    );
}
