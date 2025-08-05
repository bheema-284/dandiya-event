export default function EventCard() {
    return (
        <div className="bg-gradient-to-r from-orange-400 to-red-500 text-white p-6 rounded-lg shadow w-full">
            <h3 className="text-xl font-bold mb-2">Dandiya Night!</h3>
            <p className="text-sm mb-2">Get ready for a vibrant Dandiya Night!</p>
            <div className="flex items-center space-x-3 mb-2">
                <img
                    src="https://picsum.photos/id/1011/60/60" // Placeholder image, could be a person in traditional attire
                    alt="Dandiya participant"
                    className="rounded-full w-12 h-12 object-cover"
                />
                <div>
                    <p className="font-bold">Priya Sharma</p>
                    <p className="text-xs">Mumbai, India</p>
                </div>
            </div>
            <p className="text-sm mb-4">
                Join us for an evening of energetic Dandiya and Garba dances, delicious food, and festive fun. Celebrate the spirit of Navratri with friends and family!
            </p>
            <button className="bg-white text-orange-600 font-bold px-4 py-2 rounded w-full">
                Join the Dandiya Fun →
            </button>
        </div>
    );
}
