"use client";
import { useState } from 'react';
import {
    Table,
    Tag,
    Ruler,
    Zap,
    IndianRupee,
    Pencil,
    CheckCircle2,
    AlertCircle,
    SquareStack
} from 'lucide-react';

export default function VendorRegistrationPage() {
    const [formData, setFormData] = useState({
        stallNo: '',
        category: '',
        stallName: '',
        size: '',
        powerSupply: '',
        cost: '',
        notes: ''
    });

    const [errors, setErrors] = useState({});
    const [submissionSuccess, setSubmissionSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        if (errors[name]) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: null,
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.stallNo.trim()) {
            newErrors.stallNo = 'Stall No. is required.';
        }
        if (!formData.category) {
            newErrors.category = 'Category is required.';
        }
        if (!formData.stallName.trim()) {
            newErrors.stallName = 'Stall Name is required.';
        }
        if (!formData.size.trim()) {
            newErrors.size = 'Size is required.';
        }
        if (!formData.powerSupply.trim()) {
            newErrors.powerSupply = 'Power Supply is required.';
        } else if (isNaN(formData.powerSupply) || parseFloat(formData.powerSupply) <= 0) {
            newErrors.powerSupply = 'Power Supply must be a positive number.';
        }
        if (!formData.cost.trim()) {
            newErrors.cost = 'Cost is required.';
        } else if (isNaN(formData.cost) || parseFloat(formData.cost) <= 0) {
            newErrors.cost = 'Cost must be a positive number.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            console.log('Vendor Registration Data:', formData);

            setSubmissionSuccess(true);

            setTimeout(() => {
                setFormData({
                    stallNo: '',
                    category: '',
                    stallName: '',
                    size: '',
                    powerSupply: '',
                    cost: '',
                    notes: '',
                });
                setSubmissionSuccess(false);
            }, 3000);
        } else {
            console.log('Form validation failed.');
        }
    };

    const categories = [
        "Food & Beverages",
        "Fashion & Accessories",
        "Games & Activities",
        "Art & Handicrafts",
        "Flea Market",
        "Fun Fair"
    ];

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full">
                {/* Page Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">
                        Vendor Registration
                    </h1>
                    <p className="text-gray-500 text-lg">
                        Please provide details for your vendor stall.
                    </p>
                </div>

                {/* Success Message */}
                {submissionSuccess && (
                    <div className="flex items-center justify-center p-4 mb-6 text-green-700 bg-green-100 rounded-lg">
                        <CheckCircle2 className="w-6 h-6 mr-3" />
                        <span className="font-medium">
                            Registration submitted successfully!
                        </span>
                    </div>
                )}

                {/* Registration Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Stall No. Field */}
                    <div>
                        <label htmlFor="stallNo" className="block text-sm font-medium text-gray-700">
                            Stall No.
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <SquareStack className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </div>
                            <input
                                type="text"
                                name="stallNo"
                                id="stallNo"
                                value={formData.stallNo}
                                onChange={handleChange}
                                className={`block w-full pl-10 pr-3 py-2 border ${errors.stallNo ? 'border-red-500' : 'border-gray-300'
                                    } rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 sm:text-sm`}
                                placeholder="e.g., A-101"
                            />
                        </div>
                        {errors.stallNo && (
                            <p className="mt-2 text-sm text-red-600 flex items-center">
                                <AlertCircle className="h-4 w-4 mr-1" />
                                {errors.stallNo}
                            </p>
                        )}
                    </div>

                    {/* Category Field */}
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                            Category
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Tag className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </div>
                            <select
                                name="category"
                                id="category"
                                value={formData.category}
                                onChange={handleChange}
                                className={`block w-full pl-10 pr-3 py-2 border ${errors.category ? 'border-red-500' : 'border-gray-300'
                                    } rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 sm:text-sm`}
                            >
                                <option value="" disabled>Select a category</option>
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {errors.category && (
                            <p className="mt-2 text-sm text-red-600 flex items-center">
                                <AlertCircle className="h-4 w-4 mr-1" />
                                {errors.category}
                            </p>
                        )}
                    </div>

                    {/* Stall Name Field */}
                    <div>
                        <label htmlFor="stallName" className="block text-sm font-medium text-gray-700">
                            Stall Name
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Table className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </div>
                            <input
                                type="text"
                                name="stallName"
                                id="stallName"
                                value={formData.stallName}
                                onChange={handleChange}
                                className={`block w-full pl-10 pr-3 py-2 border ${errors.stallName ? 'border-red-500' : 'border-gray-300'
                                    } rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 sm:text-sm`}
                                placeholder="e.g., Happy Bites"
                            />
                        </div>
                        {errors.stallName && (
                            <p className="mt-2 text-sm text-red-600 flex items-center">
                                <AlertCircle className="h-4 w-4 mr-1" />
                                {errors.stallName}
                            </p>
                        )}
                    </div>

                    {/* Size Field */}
                    <div>
                        <label htmlFor="size" className="block text-sm font-medium text-gray-700">
                            Size
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Ruler className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </div>
                            <input
                                type="text"
                                name="size"
                                id="size"
                                value={formData.size}
                                onChange={handleChange}
                                className={`block w-full pl-10 pr-3 py-2 border ${errors.size ? 'border-red-500' : 'border-gray-300'
                                    } rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 sm:text-sm`}
                                placeholder="e.g., 10x10 ft"
                            />
                        </div>
                        {errors.size && (
                            <p className="mt-2 text-sm text-red-600 flex items-center">
                                <AlertCircle className="h-4 w-4 mr-1" />
                                {errors.size}
                            </p>
                        )}
                    </div>

                    {/* Power Supply (kW) Field */}
                    <div>
                        <label htmlFor="powerSupply" className="block text-sm font-medium text-gray-700">
                            Power Supply (kW)
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Zap className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </div>
                            <input
                                type="number"
                                name="powerSupply"
                                id="powerSupply"
                                value={formData.powerSupply}
                                onChange={handleChange}
                                className={`block w-full pl-10 pr-3 py-2 border ${errors.powerSupply ? 'border-red-500' : 'border-gray-300'
                                    } rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 sm:text-sm`}
                                placeholder="e.g., 5"
                            />
                        </div>
                        {errors.powerSupply && (
                            <p className="mt-2 text-sm text-red-600 flex items-center">
                                <AlertCircle className="h-4 w-4 mr-1" />
                                {errors.powerSupply}
                            </p>
                        )}
                    </div>

                    {/* Cost per Stall (₹ Lakhs) Field */}
                    <div>
                        <label htmlFor="cost" className="block text-sm font-medium text-gray-700">
                            Cost per Stall (₹ Lakhs)
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <IndianRupee className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </div>
                            <input
                                type="number"
                                name="cost"
                                id="cost"
                                value={formData.cost}
                                onChange={handleChange}
                                className={`block w-full pl-10 pr-3 py-2 border ${errors.cost ? 'border-red-500' : 'border-gray-300'
                                    } rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 sm:text-sm`}
                                placeholder="e.g., 1.5"
                            />
                        </div>
                        {errors.cost && (
                            <p className="mt-2 text-sm text-red-600 flex items-center">
                                <AlertCircle className="h-4 w-4 mr-1" />
                                {errors.cost}
                            </p>
                        )}
                    </div>

                    {/* Notes Field */}
                    <div>
                        <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                            Notes
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute top-3 left-0 pl-3 flex items-start pointer-events-none">
                                <Pencil className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </div>
                            <textarea
                                name="notes"
                                id="notes"
                                rows="3"
                                value={formData.notes}
                                onChange={handleChange}
                                className={`block w-full pl-10 pr-3 py-2 border ${errors.notes ? 'border-red-500' : 'border-gray-300'
                                    } rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 sm:text-sm`}
                                placeholder="Any additional information..."
                            ></textarea>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
