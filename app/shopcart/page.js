'use client'
import { useState, useEffect } from 'react';
import { Minus, Plus, Trash2, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';

export default function ShopCartPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const daysParam = searchParams.get("days");
    const selectedDays = daysParam ? daysParam.split(",") : [];

    // Prices can be dynamic per day
    const dayPrices = {
        "Day 1": 200,
        "Day 2": 250,
        "Day 3": 300,
    };

    const [cart, setCart] = useState([]);

    // 🔥 Initialize cart with selected days
    useEffect(() => {
        if (selectedDays.length > 0) {
            const initialCart = selectedDays.map((day, index) => ({
                id: index + 1,
                name: `${day} Pass`,
                price: dayPrices[day] || 200, // fallback price
                quantity: 1,
            }));
            setCart(initialCart);
        }
    }, [daysParam]); // re-run if query changes

    const updateQuantity = (id, change) => {
        setCart((prev) =>
            prev.map((item) =>
                item.id === id
                    ? { ...item, quantity: Math.max(item.quantity + change, 0) }
                    : item
            )
        );
    };

    const removeItem = (id) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
    };

    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-orange-100 p-6">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6">

                {/* Header */}
                <h1 className="text-3xl font-bold text-center text-orange-600 mb-6 flex items-center justify-center gap-2">
                    <ShoppingCart size={28} /> Your Tickets
                </h1>

                {/* Cart List */}
                {cart.length === 0 ? (
                    <p className="text-center text-gray-500">Your cart is empty.</p>
                ) : (
                    <div className="space-y-4">
                        {cart.map((item) => (
                            <motion.div
                                key={item.id}
                                whileHover={{ scale: 1.02 }}
                                className="flex items-center justify-between bg-orange-50 border border-orange-200 rounded-xl p-4"
                            >
                                <div>
                                    <h2 className="font-semibold text-lg text-gray-800">{item.name}</h2>
                                    <p className="text-sm text-gray-600">₹{item.price}</p>
                                </div>

                                <div className="flex items-center gap-3">
                                    {/* Decrease */}
                                    <button
                                        onClick={() => updateQuantity(item.id, -1)}
                                        className="p-2 rounded-full text-white bg-gray-400 hover:bg-gray-300"
                                    >
                                        <Minus size={16} />
                                    </button>

                                    {/* Quantity */}
                                    <span className="font-medium text-gray-700 w-6 text-center">{item.quantity}</span>

                                    {/* Increase */}
                                    <button
                                        onClick={() => updateQuantity(item.id, 1)}
                                        className="p-2 rounded-full bg-orange-500 text-white hover:bg-orange-600"
                                    >
                                        <Plus size={16} />
                                    </button>

                                    {/* Remove */}
                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="ml-3 text-red-500 hover:text-red-600"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Divider */}
                <div className="my-6 border-t border-gray-200"></div>

                {/* Total + Checkout */}
                <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-gray-800">Total: ₹{totalAmount}</h3>
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        whileHover={{ scale: 1.05 }}
                        disabled={totalAmount === 0}
                        onClick={() => alert('Proceeding to checkout...')}
                        className="bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400 
                       text-white px-6 py-3 rounded-xl font-semibold shadow-md transition
                       disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Checkout
                    </motion.button>
                </div>

                {/* Back to Ticketing */}
                <div className="flex justify-center mt-6">
                    <button
                        onClick={() => router.push('/ticketing')}
                        className="text-sm text-gray-600 underline hover:text-orange-600"
                    >
                        ← Back to Ticketing
                    </button>
                </div>
            </div>
        </div>
    );
}
