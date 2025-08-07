'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { format } from 'date-fns';


export default function Ticketing() {
    // State variables for ticket and food selection
    const [selectedDays, setSelectedDays] = useState([]);
    const [selectedFoods, setSelectedFoods] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [whatsappNumber, setWhatsappNumber] = useState('');
    const [mobileNumberError, setMobileNumberError] = useState('');

    // Modal and payment state variables
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [showQrCode, setShowQrCode] = useState(false);
    const [timeLeft, setTimeLeft] = useState(90);
    const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
    const [paymentMessage, setPaymentMessage] = useState('');
    const [ticketCode, setTicketCode] = useState('');

    // Constant prices
    const TICKET_PRICE_PER_DAY = 25.00;

    // Food options data
    const foodOptions = [
        { name: 'Pav Bhaji', id: 'pavbhaji', price: 150.00 },
        { name: 'Pani Puri', id: 'panipuri', price: 80.00 },
        { name: 'Vada Pav', id: 'vadapav', price: 60.00 },
        { name: 'Dosa', id: 'dosa', price: 75.00 },
        { name: 'Chicken Biryani', id: 'cbiryani', price: 260.00 },
        { name: 'Hyderabad Dum Biryani', id: 'hydbriyani', price: 180.00 },
    ];

    // Event data for each day
    const eventSchedule = [
        { day: 1, event: 'Opening Ceremony & Live Band' },
        { day: 2, event: 'Garba Workshop & DJ Night' },
        { day: 3, event: 'Traditional Folk Dance Night' },
        { day: 4, event: 'Bollywood Dance Extravaganza' },
        { day: 5, event: 'Fusion Night & Celebrity Guest' },
        { day: 6, event: 'Kids Dandiya & Family Fun' },
        { day: 7, event: 'Energetic Dandiya Battle' },
        { day: 8, event: 'Live Stand-up & Bhangra' },
        { day: 9, event: 'Grand Finale with Firework Show' },
    ];

    // Recalculate total price whenever the selected days or food changes
    useEffect(() => {
        const totalDays = selectedDays.length;
        let foodCostPerDay = 0;

        selectedFoods.forEach(foodId => {
            const foodItem = foodOptions.find(f => f.id === foodId);
            if (foodItem) {
                foodCostPerDay += foodItem.price;
            }
        });

        let ticketCost = totalDays * TICKET_PRICE_PER_DAY;
        let foodCost = foodCostPerDay * totalDays;
        let total = ticketCost + foodCost;
        setTotalPrice(total);
    }, [selectedDays, selectedFoods]);

    // Add this new useEffect hook inside the Ticketing component
    useEffect(() => {
        const style = document.createElement('style');
        style.innerHTML = `
        @keyframes fade-in-up {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        .animate-fade-in-up {
            animation: fade-in-up 0.3s ease-out forwards;
        }
    `;
        document.head.appendChild(style);

        // Clean up the style element when the component unmounts
        return () => {
            if (document.head.contains(style)) {
                document.head.removeChild(style);
            }
        };
    }, []); // The empty array ensures this runs once on mount

    // Timer logic for the payment modal
    useEffect(() => {
        if (!showQrCode || timeLeft <= 0) {
            return;
        }
        const timerId = setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1);
        }, 1000);
        return () => clearInterval(timerId);
    }, [showQrCode, timeLeft]);

    // Handle opening the payment modal with validation
    const handleBuyTicket = () => {
        setMobileNumberError('');
        if (selectedDays.length === 0) {
            setMobileNumberError("Please select at least one day for your ticket.");
            return;
        }
        const mobileRegex = /^[0-9]{10}$/;
        if (!whatsappNumber || !mobileRegex.test(whatsappNumber)) {
            setMobileNumberError("Please enter a valid 10-digit mobile number.");
            return;
        }
        setIsProcessing(false);
        setShowQrCode(false);
        setIsPaymentSuccessful(false);
        setPaymentMessage('');
        setIsModalOpen(true);
        setTimeLeft(90);
    };

    // Handle starting the simulated payment process
    const handlePayment = () => {
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            setShowQrCode(true);
        }, 2000);
    };

    // --- UPDATED: handleSimulatePaymentSuccess to send detailed info and save to Firestore ---
    const handleSimulatePaymentSuccess = async () => {
        const code = `DND-${Date.now().toString().slice(-6)}`;
        setTicketCode(code);

        // Get event details for selected days
        const selectedEvents = selectedDays.map(day => {
            const eventDetail = eventSchedule.find(e => e.day === day);
            return eventDetail ? eventDetail.event : `Event for Day ${day}`;
        });

        // Get selected food details with price
        const selectedFoodDetails = getSelectedFoodDetails();

        // Simulate sending a WhatsApp message
        try {
            // Note: This API call is a placeholder and won't actually work without a backend
            // implementation.
            const response = await fetch('/api/sendwhatsapp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    to: `+91${whatsappNumber}`,
                    ticketCode: code,
                    selectedDays,
                    foodDetails: selectedFoodDetails,
                    events: selectedEvents,
                    totalPrice: totalPrice.toFixed(2),
                })
            });

            const data = await response.json();
            if (data.success) {
                console.log('WhatsApp message sent successfully!');
            } else {
                console.error('Failed to send WhatsApp message:', data.error);
            }

            setPaymentMessage('Payment successful!');
            setIsPaymentSuccessful(true);

        } catch (error) {
            console.error('Error sending WhatsApp message:', error);
            setPaymentMessage('Payment successful, but failed to send WhatsApp message.');
            setIsPaymentSuccessful(true);
        }
    };


    // Handle closing the modal and resetting state
    const handleDone = () => {
        setIsModalOpen(false);
        setTimeLeft(0);
        setIsProcessing(false);
        setShowQrCode(false);
        setPaymentMessage('');
        setIsPaymentSuccessful(false);
        setTicketCode('');
        // We'll clear the mobile number only on successful purchase
        if (isPaymentSuccessful) {
            setWhatsappNumber('');
            setSelectedDays([]);
            setSelectedFoods([]);
        }
    };

    // Automatically close the modal if the timer runs out
    useEffect(() => {
        if (timeLeft === 0 && isModalOpen && !isPaymentSuccessful) {
            setPaymentMessage('Payment timed out. Please try again.');
            setTimeout(() => {
                handleDone();
            }, 3000);
        }
    }, [timeLeft, isModalOpen, isPaymentSuccessful]);

    // Automatically close the modal and reset on payment success
    useEffect(() => {
        if (isPaymentSuccessful) {
            const timerId = setTimeout(() => {
                handleDone();
            }, 3000);
            return () => clearTimeout(timerId);
        }
    }, [isPaymentSuccessful]);

    // Toggle day selection
    const handleDayToggle = (day) => {
        if (day === 'all') {
            if (selectedDays.length === 9) {
                setSelectedDays([]);
            } else {
                setSelectedDays(Array.from({ length: 9 }, (_, i) => i + 1));
            }
        } else {
            setSelectedDays(prevDays =>
                prevDays.includes(day)
                    ? prevDays.filter(d => d !== day)
                    : [...prevDays, day].sort((a, b) => a - b)
            );
        }
    };

    // Toggle food selection
    const handleFoodToggle = (foodId) => {
        setSelectedFoods(prevFoods =>
            prevFoods.includes(foodId)
                ? prevFoods.filter(f => f !== foodId)
                : [...prevFoods, foodId]
        );
    };

    const handleNoFoodToggle = () => {
        setSelectedFoods([]);
    };

    // Format the time remaining for display
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    // Helper function to get detailed food info with prices
    const getSelectedFoodDetails = () => {
        return selectedFoods.map(foodId => {
            const foodItem = foodOptions.find(f => f.id === foodId);
            return foodItem ? { name: foodItem.name, price: foodItem.price } : null;
        }).filter(Boolean);
    };

    const isAllDaysSelected = selectedDays.length === 9;

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4 font-sans">
            <div className="bg-white rounded-xl shadow-2xl p-8 max-w-lg w-full flex flex-col items-center space-y-6">

                {/* Event Header Section */}
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-800">Dandiya Night</h1>
                    <p className="mt-2 text-gray-500">An unforgettable night of music, dance, and culture!</p>
                    <p className="mt-1 text-sm text-gray-400">
                        Date: {format(new Date(), 'MMMM d, yyyy')} | Location: Ramoji Film City Hyderabad
                    </p>
                </div>

                {/* Ticket and Food Selection Section */}
                <div className="w-full bg-gray-50 rounded-lg p-6 shadow-inner border border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Select Your Days (₹{TICKET_PRICE_PER_DAY.toFixed(2)}/day)</h2>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium text-gray-700">Ticket Days</h3>
                        <button
                            onClick={() => handleDayToggle('all')}
                            className={`px-4 py-2 rounded-full font-semibold cursor-pointer transition-all duration-200 text-sm ${isAllDaysSelected
                                ? 'bg-purple-500 text-white shadow-md'
                                : 'bg-gray-200 text-gray-700 hover:bg-purple-100 hover:text-purple-500'
                                }`}
                        >
                            All Days
                        </button>
                    </div>
                    <div className="grid grid-cols-3 md:grid-cols-5 gap-2 mb-6">
                        {Array.from({ length: 9 }, (_, i) => i + 1).map(day => (
                            <button
                                key={day}
                                onClick={() => handleDayToggle(day)}
                                disabled={isAllDaysSelected}
                                className={`px-4 py-2 rounded-full font-semibold cursor-pointer transition-all duration-200 text-sm ${selectedDays.includes(day) || isAllDaysSelected
                                    ? 'bg-blue-500 text-white shadow-md'
                                    : 'bg-gray-200 text-gray-700 hover:bg-blue-100 hover:text-blue-500'
                                    } ${isAllDaysSelected ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                Day {day}
                            </button>
                        ))}
                    </div>

                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Add Food Items</h2>
                    <div className="flex flex-col space-y-2">
                        {foodOptions.map(food => (
                            <label key={food.id} className="flex items-center justify-between space-x-3 p-3 bg-white rounded-lg shadow-sm cursor-pointer hover:bg-gray-100 transition-colors">
                                {/* Checkbox and Food Name */}
                                <div className="flex items-center space-x-3">
                                    <input
                                        type="checkbox"
                                        checked={selectedFoods.includes(food.id)}
                                        onChange={() => handleFoodToggle(food.id)}
                                        className="h-4 w-4 text-blue-500 rounded focus:ring-blue-400"
                                    />
                                    <span className="font-medium text-gray-700">{food.name}</span>
                                </div>
                                {/* Food Price on the right corner */}
                                <span className="text-gray-500 text-sm">₹{food.price.toFixed(2)}</span>
                            </label>
                        ))}
                        <label className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm cursor-pointer hover:bg-gray-100 transition-colors">
                            <input
                                type="checkbox"
                                checked={selectedFoods.length === 0}
                                onChange={handleNoFoodToggle}
                                className="h-4 w-4 text-blue-500 rounded focus:ring-blue-400"
                            />
                            <span className="font-medium text-gray-700">No Food</span>
                        </label>
                    </div>
                </div>

                {/* Mobile Number Input */}
                <div className="w-full">
                    <label htmlFor="whatsapp-number" className="block text-xl font-semibold text-gray-700 mb-2">Mobile Number</label>
                    <input
                        id="whatsapp-number"
                        type="tel"
                        value={whatsappNumber}
                        onChange={(e) => setWhatsappNumber(e.target.value)}
                        placeholder="Enter your 10-digit number"
                        pattern="[0-9]{10}"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-700"
                    />
                    {mobileNumberError && (
                        <p className="mt-2 text-red-500 text-sm font-medium">{mobileNumberError}</p>
                    )}
                </div>

                {/* Total Price and Button Section */}
                <div className="w-full">
                    <div className="flex justify-between items-center text-xl font-semibold text-gray-700 mb-4">
                        <span>Total:</span>
                        <span className="text-blue-400 font-bold">₹{totalPrice.toFixed(2)}</span>
                    </div>

                    <button
                        onClick={handleBuyTicket}
                        disabled={selectedDays.length === 0}
                        className={`${selectedDays.length === 0 ? "cursor-not-allowed opacity-75" : "cursor-pointer opacity-100 hover:bg-blue-400 hover:shadow-xl"} w-full bg-blue-500 text-white py-4 rounded-xl text-lg font-bold shadow-lg transition-all duration-200 active:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50`}
                    >
                        Buy Ticket
                    </button>
                </div>
            </div>

            {/* Payment Modal using React Portal */}
            {isModalOpen && createPortal(
                <div className="fixed inset-0 bg-black/25 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl shadow-3xl p-8 max-w-md w-full animate-fade-in-up">

                        {/* Modal Header */}
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">Confirm Payment</h2>
                            <button onClick={handleDone} className="text-gray-400 hover:text-gray-600 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Initial Payment Confirmation State */}
                        {!showQrCode && !isProcessing && !isPaymentSuccessful && (
                            <>
                                <p className="text-lg text-gray-700 mb-2">You are about to purchase:</p>
                                <div className="bg-gray-100 p-4 rounded-lg mb-6">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-800 font-semibold">Dandiya Pass ({selectedDays.length} day{selectedDays.length > 1 ? 's' : ''})</span>
                                        <span className="text-lg font-bold text-blue-400">₹{(selectedDays.length * TICKET_PRICE_PER_DAY).toFixed(2)}</span>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Days: {selectedDays.join(', ')}</p>
                                    {selectedFoods.length > 0 && (
                                        <>
                                            <div className="flex justify-between items-center mt-2 text-sm text-gray-600">
                                                <span>Food ({selectedFoods.length} item{selectedFoods.length > 1 ? 's' : ''})</span>
                                                <span>
                                                    ₹{(
                                                        selectedFoods.reduce((total, foodId) => {
                                                            const food = foodOptions.find(f => f.id === foodId);
                                                            return total + (food ? food.price : 0);
                                                        }, 0) * selectedDays.length
                                                    ).toFixed(2)}
                                                </span>
                                            </div><div className="mt-2">
                                                <p className="text-xs text-gray-500">Selected Days & Events:</p>
                                                <ul className="text-xs text-gray-600 list-disc list-inside">
                                                    {selectedDays.map(day => {
                                                        const event = eventSchedule.find(e => e.day === day);
                                                        return (
                                                            <li key={day}>Day {day} - {event ? event.event : 'Event not found'}</li>
                                                        );
                                                    })}
                                                </ul>
                                            </div>
                                            <div className="mt-2">
                                                <p className="text-xs text-gray-500">Food Items Selected:</p>
                                                <ul className="text-xs text-gray-600 list-disc list-inside">
                                                    {selectedFoods.map(foodId => {
                                                        const food = foodOptions.find(f => f.id === foodId);
                                                        return food ? (
                                                            <li key={foodId}>{food.name} (₹{food.price.toFixed(2)})</li>
                                                        ) : null;
                                                    })}
                                                </ul>
                                            </div>
                                        </>
                                    )}

                                </div>
                                <div className="flex justify-between items-center text-xl font-bold text-gray-800 mb-6">
                                    <span>Total:</span>
                                    <span className="text-blue-500">₹{totalPrice.toFixed(2)}</span>
                                </div>
                                <button
                                    onClick={handlePayment}
                                    className="w-full cursor-pointer bg-blue-500 text-white py-3 rounded-lg text-lg font-semibold transition-all duration-200 hover:bg-blue-400"
                                >
                                    Pay Now
                                </button>
                            </>
                        )}

                        {/* Processing State */}
                        {isProcessing && (
                            <div className="flex flex-col items-center justify-center py-8">
                                <svg className="animate-spin h-10 w-10 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <p className="mt-4 text-gray-600 font-semibold text-lg">Generating QR code...</p>
                            </div>
                        )}

                        {/* QR Code Display State */}
                        {showQrCode && !isPaymentSuccessful && (
                            <div className="flex flex-col items-center text-center">
                                <p className="text-lg text-gray-700 mb-4">Scan the QR code below to complete your payment.</p>
                                <img
                                    src={'https://placehold.co/200x200/5267a5/ffffff?text=QR+Code'}
                                    alt="Payment QR Code"
                                    className="rounded-lg w-48 h-48 shadow-md mb-6"
                                />
                                <div className="text-gray-500 text-sm font-semibold mb-4">
                                    Time Remaining: <span className="text-blue-400 font-bold">{formatTime(timeLeft)}</span>
                                </div>
                                <p className="text-sm text-gray-500 mb-4">This is a placeholder QR code. In a real application, a unique QR code would be generated here.</p>
                                <button
                                    onClick={handleSimulatePaymentSuccess}
                                    className="w-full cursor-pointer bg-green-500 text-white py-3 rounded-lg text-lg font-semibold transition-all duration-200 hover:bg-green-600"
                                >
                                    Simulate Successful Scan
                                </button>
                            </div>
                        )}

                        {/* Payment Successful State with detailed info */}
                        {isPaymentSuccessful && (
                            <div className="flex flex-col items-center text-center py-8">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <p className="mt-4 text-lg font-semibold text-green-700">{paymentMessage}</p>
                                <p className="mt-2 text-gray-500 text-sm">Your entry code:</p>
                                <div className="bg-gray-100 text-xl font-mono font-bold text-blue-600 py-2 px-4 rounded-lg mt-2 mb-4">{ticketCode}</div>

                                {/* Days and Events */}
                                <div className="text-left w-full mt-4">
                                    <p className="text-md font-semibold text-gray-700">Days & Events:</p>
                                    <ul className="text-gray-600 text-sm list-disc list-inside mt-1">
                                        {selectedDays.map(day => {
                                            const eventDetail = eventSchedule.find(e => e.day === day);
                                            return (
                                                <li key={day}>Day {day} - {eventDetail ? eventDetail.event : 'No event specified'}</li>
                                            );
                                        })}
                                    </ul>
                                </div>

                                {/* Food Items */}
                                <div className="text-left w-full mt-4">
                                    <p className="text-md font-semibold text-gray-700">Food Items:</p>
                                    {selectedFoods.length > 0 ? (
                                        <ul className="text-gray-600 text-sm list-disc list-inside mt-1">
                                            {getSelectedFoodDetails().map((food, index) => (
                                                <li key={index}>{food.name} (₹{food.price.toFixed(2)})</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-gray-500 text-sm mt-1 italic">No food selected.</p>
                                    )}
                                </div>

                                <p className="text-gray-500 text-sm font-semibold mt-4">
                                    Total Paid: <span className="text-blue-500">₹{totalPrice.toFixed(2)}</span>
                                </p>
                                <p className="text-sm text-gray-400 mt-4">
                                    A message with your ticket details would have been sent to {whatsappNumber}.
                                </p>
                                <button
                                    onClick={handleDone}
                                    className="w-full cursor-pointer bg-blue-500 text-white py-3 rounded-lg text-lg font-semibold transition-all duration-200 hover:bg-blue-400 mt-4"
                                >
                                    Done
                                </button>
                            </div>
                        )}


                        {/* Payment Timeout State */}
                        {timeLeft === 0 && !isPaymentSuccessful && (
                            <div className="flex flex-col items-center text-center py-8">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                                <p className="mt-4 text-lg font-semibold text-red-700">{paymentMessage}</p>
                                <p className="mt-2 text-sm text-gray-500">This window will close shortly.</p>
                            </div>
                        )}
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
}
