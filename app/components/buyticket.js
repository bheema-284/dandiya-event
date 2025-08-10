'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { format } from 'date-fns';

export default function Ticketing() {
    const [selectedDays, setSelectedDays] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [whatsappNumber, setWhatsappNumber] = useState('');
    const [mobileNumberError, setMobileNumberError] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [showQrCode, setShowQrCode] = useState(false);
    const [timeLeft, setTimeLeft] = useState(90);
    const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
    const [paymentMessage, setPaymentMessage] = useState('');
    const [ticketCode, setTicketCode] = useState('');

    const TICKET_PRICE_PER_DAY = 25.00;

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

    const colorClasses = [
        { bg: 'bg-red-500', hover: 'hover:bg-red-100 hover:text-red-500' },
        { bg: 'bg-purple-500', hover: 'hover:bg-purple-100 hover:text-purple-500' },
        { bg: 'bg-yellow-500', hover: 'hover:bg-yellow-100 hover:text-yellow-500' },
        { bg: 'bg-green-500', hover: 'hover:bg-green-100 hover:text-green-500' },
        { bg: 'bg-pink-500', hover: 'hover:bg-pink-100 hover:text-pink-500' },
        { bg: 'bg-indigo-500', hover: 'hover:bg-indigo-100 hover:text-indigo-500' },
        { bg: 'bg-emerald-500', hover: 'hover:bg-emerald-100 hover:text-emerald-500' },
        { bg: 'bg-cyan-500', hover: 'hover:bg-cyan-100 hover:text-cyan-500' },
        { bg: 'bg-rose-500', hover: 'hover:bg-rose-100 hover:text-rose-500' },
    ];

    const dayColorMap = useMemo(() => {
        const map = {};
        for (let i = 1; i <= 9; i++) {
            map[i] = colorClasses[i % colorClasses.length];
        }
        return map;
    }, []);

    useEffect(() => {
        setTotalPrice(selectedDays.length * TICKET_PRICE_PER_DAY);
    }, [selectedDays]);

    useEffect(() => {
        const style = document.createElement('style');
        style.innerHTML = `
        @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
            animation: fade-in-up 0.3s ease-out forwards;
        }
    `;
        document.head.appendChild(style);
        return () => { if (document.head.contains(style)) document.head.removeChild(style); };
    }, []);

    useEffect(() => {
        if (!showQrCode || timeLeft <= 0) return;
        const timerId = setInterval(() => setTimeLeft(t => t - 1), 1000);
        return () => clearInterval(timerId);
    }, [showQrCode, timeLeft]);

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

    const handlePayment = () => {
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            setShowQrCode(true);
        }, 2000);
    };

    const handleSimulatePaymentSuccess = async () => {
        const code = `DND-${Date.now().toString().slice(-6)}`;
        setTicketCode(code);

        const selectedEvents = selectedDays.map(day => {
            const eventDetail = eventSchedule.find(e => e.day === day);
            return eventDetail ? eventDetail.event : `Event for Day ${day}`;
        });

        try {
            const response = await fetch('/api/sendwhatsapp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    to: `+91${whatsappNumber}`,
                    ticketCode: code,
                    selectedDays,
                    events: selectedEvents,
                    totalPrice: totalPrice.toFixed(2),
                })
            });

            const data = await response.json();
            if (data.success) console.log('WhatsApp message sent!');
            else console.error('WhatsApp send failed:', data.error);

            setPaymentMessage('Payment successful!');
            setIsPaymentSuccessful(true);

        } catch (err) {
            console.error('WhatsApp error:', err);
            setPaymentMessage('Payment successful, but WhatsApp failed.');
            setIsPaymentSuccessful(true);
        }
    };

    const handleDone = () => {
        setIsModalOpen(false);
        setTimeLeft(0);
        setIsProcessing(false);
        setShowQrCode(false);
        setPaymentMessage('');
        setIsPaymentSuccessful(false);
        setTicketCode('');
        if (isPaymentSuccessful) {
            setWhatsappNumber('');
            setSelectedDays([]);
        }
    };

    useEffect(() => {
        if (timeLeft === 0 && isModalOpen && !isPaymentSuccessful) {
            setPaymentMessage('Payment timed out. Please try again.');
            setTimeout(() => handleDone(), 3000);
        }
    }, [timeLeft, isModalOpen, isPaymentSuccessful]);

    useEffect(() => {
        if (isPaymentSuccessful) {
            const timerId = setTimeout(() => handleDone(), 3000);
            return () => clearTimeout(timerId);
        }
    }, [isPaymentSuccessful]);

    const handleDayToggle = (day) => {
        if (day === 'all') {
            setSelectedDays(prev =>
                prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
            );
        } else {
            setSelectedDays(prev =>
                prev.includes(day)
                    ? prev.filter(d => d !== day)
                    : [...prev, day].sort((a, b) => a - b)
            );
        }
    };


    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    const isAllDaysSelected = selectedDays.length === 9;

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4 font-sans">
            <div className="bg-gray-800 text-white rounded-xl shadow-2xl p-8 max-w-lg w-full flex flex-col items-center space-y-6">

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
                            className={`px-4 py-2 rounded-full font-semibold cursor-pointer transition-all duration-200 text-sm
    ${isAllDaysSelected
                                    ? 'bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 via-purple-500 to-pink-500 text-white shadow-md'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gradient-to-r hover:from-red-100 hover:via-yellow-100 hover:via-green-100 hover:via-blue-100 hover:via-purple-100 hover:to-pink-100 hover:text-purple-600'
                                }`}
                        >
                            All Days
                        </button>

                    </div>
                    <div className="grid grid-cols-3 md:grid-cols-5 gap-2 mb-6">
                        {Array.from({ length: 9 }, (_, i) => {
                            const day = i + 1;
                            const isSelected = selectedDays.includes(day) || isAllDaysSelected;
                            const { bg, hover } = dayColorMap[day];

                            return (
                                <button
                                    key={day}
                                    onClick={() => handleDayToggle(day)}
                                    disabled={isAllDaysSelected}
                                    className={`px-4 py-2 rounded-full font-semibold cursor-pointer transition-all duration-200 text-sm
              ${isSelected ? `${bg} text-white shadow-md` : `bg-gray-200 text-gray-700 ${hover}`}
              ${isAllDaysSelected ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    Day {day}
                                </button>
                            );
                        })}
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
                    <div className="bg-gray-800 rounded-2xl shadow-3xl p-8 max-w-md w-full animate-fade-in-up">

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
                                    <div className="mt-2">
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
