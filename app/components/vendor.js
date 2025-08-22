'use client'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import VendorRegistrationPage from './vendorform';
// Main App component for the page
const VendorRegistration = () => {
    const router = useRouter();
    const [screen, setScreen] = useState("vendor");
    const [selectedCategory, setSelectedCategory] = useState('');
    // Handles category selection and displays the form
    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setScreen('form');
    };
    return (
        <div className="min-h-screen bg-white font-sans" >

            {/* Main Content */}
            {screen === "vendor" && <main className="container mx-auto p-4 md:p-8">
                {/* Vendor Category Section */}
                <section className="text-center my-12">
                    <h2 className="text-2xl font-bold text-gray-800 tracking-wide mb-8">CHOOSE YOUR VENDOR CATEGORY</h2>

                    {/* Category cards - using placeholder images */}
                    <div className="flex w-3/4 mx-auto text-center gap-3 justify-between items-center">
                        {/* Food Stall */}
                        <div onClick={() => handleCategorySelect('Food Court')} className="bg-white w-full h-auto cursor-pointer rounded-xl shadow-lg overflow-hidden transition-transform transform hover:scale-105">
                            <img src='/layer_6.png' alt="Food Stall" className="w-full object-contain" />
                        </div>

                        {/* Flea Market */}
                        <div onClick={() => handleCategorySelect('Flea Market')} className="bg-white w-full h-auto cursor-pointer rounded-xl shadow-lg overflow-hidden transition-transform transform hover:scale-105">
                            <img src="/layer_7.png" alt="Flea Market" className="w-full h-full" />
                        </div>

                        {/* Fun Fair */}
                        <div onClick={() => handleCategorySelect('Fun Zone')} className="bg-white w-full h-auto cursor-pointer rounded-xl shadow-lg overflow-hidden transition-transform transform hover:scale-105">
                            <img src="/layer_5.png" alt="Fun Fair" className="w-full h-full" />
                        </div>
                    </div>
                </section>

                {/* Dandiya Village Section */}
                <section className="text-center my-16">
                    <div className="flex items-center justify-center">
                        <div className="text-4xl md:text-6xl w-64 h-8 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500 tracking-wide">
                            <img src="/dandiya_village.png" alt="Fun Fair" className="w-full h-auto" />
                        </div>
                    </div>
                    <p className="text-lg md:text-xl font-semibold text-gray-700 mt-4 tracking-wider">
                        FUN | FOOD | FLEA
                    </p>
                    <div className="w-full mx-auto mt-12 p-6 text-centetr">
                        <p className="text-gray-600 mb-4 text-sm md:text-base">
                            <strong className="text-gray-800">100+ Stalls = Food & Beverages / Fashion & Accessories / Games & Activities / Art & Handicrafts</strong>
                            <br />
                            Step into the vibrant Dandiya Village at the International Dandiya Carnival, where tradition meets celebration! Spread across a colorful landscape with 100+ curated stalls, the village showcases:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-gray-600 text-sm md:text-base pl-4">
                            <li>Ethnic fashion, handcrafted jewelry, and festive accessories</li>
                            <li>Lip-smacking regional cuisines and fusion food delights</li>
                            <li>Fun games, mehendi artists, tarot readers, & activity corners</li>
                            <li>Art, decor, wellness, and personalized gifting stalls</li>
                            <li>Interactive zones, cultural booths, influencer spots & more!</li>
                        </ul>
                        <p className="text-gray-600 mt-6 font-semibold text-sm md:text-base">
                            A shopping paradise with a festive soul - only at Ramoji Film City, this Navratri!
                        </p>
                    </div>
                </section>
            </main>}
            {screen === "form" && <VendorRegistrationPage setScreen={setScreen} selectedCategory={selectedCategory} />}
            <div className="relative w-full mt-10">
                {/* Shading overlay (soft white fade like reference) */}
                <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-white via-white/60 to-transparent z-20 pointer-events-none"></div>

                {/* Top floating images (rides) */}
                <div className="absolute -top-20 sm:-top-24 left-4 sm:left-10 z-0">
                    <img
                        src="/layer_8.png"
                        className="h-24 sm:h-32 md:h-36 object-contain"
                    />
                </div>
                <div className="absolute  -top-20 sm:-top-26 right-4 sm:right-10 z-0">
                    <img
                        src="/layer_10.png"
                        className="h-28 sm:h-36 md:h-40 object-contain"
                    />
                </div>

                {/* Bottom decorative strip */}
                <div className="relative flex flex-wrap justify-between items-end w-full z-10">
                    <img src="/layer_9.png" className="flex-1 h-10 sm:h-18 md:h-20 object-cover" />
                    <img src="/layer_12.png" className="flex-1 h-10 sm:h-18 md:h-20 object-cover" />
                    <img src="/layer_11.png" className="flex-1 h-10 sm:h-18 md:h-20 object-cover" />
                    <img src="/layer_13.png" className="flex-1 h-10 sm:h-18 md:h-20 object-cover" />
                </div>
            </div>
        </div>
    );
};

export default VendorRegistration;
