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
        <div className="min-h-screen bg-gray-100 font-sans">

            {/* Main Content */}
            {screen === "vendor" && <main className="container mx-auto p-4 md:p-8">
                {/* Vendor Category Section */}
                <section className="text-center my-12">
                    <h2 className="text-2xl font-bold text-gray-800 tracking-wide mb-8">CHOOSE YOUR VENDOR CATEGORY</h2>

                    {/* Category cards - using placeholder images */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {/* Food Stall */}
                        <div onClick={() => handleCategorySelect('Food Court')} className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform transform hover:scale-105">
                            <img src="https://placehold.co/400x300/F4D03F/ffffff?text=Food+Stall" alt="Food Stall" className="w-full h-auto" />
                        </div>

                        {/* Flea Market */}
                        <div onClick={() => handleCategorySelect('Flea Market')} className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform transform hover:scale-105">
                            <img src="https://placehold.co/400x300/9B59B6/ffffff?text=Flea+Market" alt="Flea Market" className="w-full h-auto" />
                        </div>

                        {/* Fun Fair */}
                        <div onClick={() => handleCategorySelect('Fun Zone')} className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform transform hover:scale-105">
                            <img src="https://placehold.co/400x300/E74C3C/ffffff?text=Fun+Fair" alt="Fun Fair" className="w-full h-auto" />
                        </div>
                    </div>
                </section>

                {/* Dandiya Village Section */}
                <section className="text-center my-16">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500 tracking-wide">
                        DANDIYA VILLAGE
                    </h1>
                    <p className="text-xl md:text-2xl font-semibold text-gray-700 mt-4 tracking-wider">
                        FUN | FOOD | FLEA
                    </p>

                    <div className="max-w-4xl mx-auto mt-12 p-6 bg-white rounded-2xl shadow-xl text-left">
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
            {screen === "form" && <VendorRegistrationPage selectedCategory={selectedCategory} />}
        </div>
    );
};

export default VendorRegistration;
