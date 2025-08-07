'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';

export default function Ticketing() {
    const [ticketCount, setTicketCount] = useState(1);
    const [totalPrice, setTotalPrice] = useState(25.00);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [showQrCode, setShowQrCode] = useState(false);
    const [timeLeft, setTimeLeft] = useState(1.5 * 60);
    const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
    const [paymentMessage, setPaymentMessage] = useState('');
    const [ticketCode, setTicketCode] = useState('');
    const router = useRouter();
    const TICKET_PRICE = 25.00;
    useEffect(() => {
        setTotalPrice(ticketCount * TICKET_PRICE);
    }, [ticketCount]);

    useEffect(() => {
        if (!showQrCode || timeLeft === 0) {
            return;
        }
        const timerId = setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1);
        }, 1000);
        return () => clearInterval(timerId);
    }, [showQrCode, timeLeft]);

    const handleIncrease = () => {
        setTicketCount(prevCount => prevCount + 1);
    };

    const handleDecrease = () => {
        setTicketCount(prevCount => (prevCount > 1 ? prevCount - 1 : 1));
    };

    const handleBuyTicket = () => {
        setIsProcessing(false);
        setShowQrCode(false);
        setIsPaymentSuccessful(false);
        setPaymentMessage('');
        setIsModalOpen(true);
        setTimeLeft(1.5 * 60);
    };

    const handlePayment = () => {
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            setShowQrCode(true);
        }, 2000);
    };

    const handleSimulatePaymentSuccess = () => {
        setPaymentMessage('Payment successful!');
        const code = `DND-${Date.now().toString().slice(-6)}`; // Unique ticket code like: DND-349021
        setTicketCode(code);
        setIsPaymentSuccessful(true);
    };

    const handleDone = () => {
        setIsModalOpen(false);
        setTimeLeft(0);
        setIsProcessing(false);
        setShowQrCode(false);
        setIsPaymentSuccessful(false);
        setPaymentMessage('');
    };

    // Automatically close the modal if the timer runs out.
    useEffect(() => {
        if (timeLeft === 0 && isModalOpen && !isPaymentSuccessful) {
            setPaymentMessage('Payment timed out. Please try again.');
            // Wait a moment to show the message before closing.
            setTimeout(() => {
                handleDone();
            }, 3000);
        }
    }, [timeLeft, isModalOpen, isPaymentSuccessful]);

    // Automatically close the modal if the payment is successful.
    useEffect(() => {
        if (isPaymentSuccessful) {
            const timerId = setTimeout(() => {
                handleDone(); // close modal
                router.push('/'); // redirect to home
            }, 3000);
            return () => clearTimeout(timerId);
        }
    }, [isPaymentSuccessful]);


    // Format the time remaining for display.
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };


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

                {/* Ticket Selection Section */}
                <div className="w-full bg-gray-50 rounded-lg p-6 shadow-inner border border-gray-200">
                    <div className="flex justify-between items-center">
                        <span className="text-xl font-semibold text-gray-700">Dandiya Pass</span>
                        <span className="text-xl font-bold text-gray-800">₹{TICKET_PRICE.toFixed(2)}</span>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">Includes entry, a complimentary Dandiya stick rental, and access to all performances.</p>

                    <div className="flex items-center justify-center mt-6 space-x-4">
                        <button
                            onClick={handleDecrease}
                            className="bg-gray-200 cursor-pointer text-gray-700 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-gray-300 active:bg-gray-400 focus:outline-none"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                            </svg>
                        </button>
                        <span className="text-3xl font-extrabold text-gray-800 w-12 text-center">{ticketCount}</span>
                        <button
                            onClick={handleIncrease}
                            className="bg-blue-500 cursor-pointer text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-blue-400 active:bg-blue-400 focus:outline-none"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Total Price and Button Section */}
                <div className="w-full">
                    <div className="flex justify-between items-center text-xl font-semibold text-gray-700 mb-4">
                        <span>Total:</span>
                        <span className="text-blue-400 font-bold">₹{totalPrice.toFixed(2)}</span>
                    </div>

                    <button
                        onClick={handleBuyTicket}
                        className="w-full bg-blue-500 cursor-pointer text-white py-4 rounded-xl text-lg font-bold shadow-lg transition-all duration-200 hover:bg-blue-400 hover:shadow-xl active:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
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
                                <div className="bg-blue-40 p-4 rounded-lg flex justify-between items-center mb-6">
                                    <span className="text-gray-800">
                                        <span className="font-bold">{ticketCount}</span> Ticket{ticketCount > 1 ? 's' : ''}
                                    </span>
                                    <span className="text-xl font-bold text-blue-400">₹{totalPrice.toFixed(2)}</span>
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
                                    src={'/qr-code.jpeg'}
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

                        {/* Payment Successful State */}
                        {isPaymentSuccessful && (
                            <div className="flex flex-col items-center text-center py-8">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <p className="mt-4 text-lg font-semibold text-green-700">{paymentMessage}</p>
                                <p className="mt-2 text-gray-500 text-sm">Your entry code:</p>
                                <div className="bg-gray-100 text-xl font-mono font-bold text-blue-600 py-2 px-4 rounded-lg mt-2 mb-4">{ticketCode}</div>
                                <p className="text-sm text-gray-400">Redirecting to homepage in 5 seconds...</p>
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

// Add a simple fade-in animation for the modal.
// In a real Next.js app, you'd place this in a CSS module or a global CSS file.
// For this self-contained example, we can include it here.
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

<style jsx>{`
                @keyframes fall-zigzag {
                    0% {
                        transform: translateY(-100px) translateX(0px);
                        opacity: 0.1;
                    }
                    10% {
                        opacity: 2;
                    }
                    25% {
                        transform: translateY(50px) translateX(20px);
                    }
                    50% {
                        transform: translateY(150px) translateX(-20px);
                    }
                    75% {
                        transform: translateY(250px) translateX(20px);
                    }
                    100% {
                        transform: translateY(350px) translateX(0px);
                        opacity: 0.5;
                    }
                }
                .animate-fall-zigzag {
                    animation-name: fall-zigzag;
                    animation-timing-function: ease-in-out;
                    animation-iteration-count: infinite;
                }
            `}</style>
