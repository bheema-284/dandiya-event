"use client";
import { useState } from 'react';
import {
    Building2,
    User,
    Mail,
    Phone,
    MapPin,
    CheckCircle2,
    AlertCircle,
} from 'lucide-react';

export default function VendorRegistrationPage() {
    const [formData, setFormData] = useState({
        businessName: '',
        contactName: '',
        email: '',
        phone: '',
        address: ''
    });

    // New state to manage validation errors
    const [errors, setErrors] = useState({});

    // State to manage the success message after form submission
    const [submissionSuccess, setSubmissionSuccess] = useState(false);

    // Handle changes to the form inputs and clear errors as the user types
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        // Clear the error for the current field as the user types
        if (errors[name]) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: null,
            }));
        }
    };

    // Function to validate the form data
    const validateForm = () => {
        const newErrors = {};

        // Basic validation checks
        if (!formData.businessName.trim()) {
            newErrors.businessName = 'Business Name is required.';
        }
        if (!formData.contactName.trim()) {
            newErrors.contactName = 'Contact Person is required.';
        }
        if (!formData.email.trim()) {
            newErrors.email = 'Email Address is required.';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email Address is invalid.';
        }
        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone Number is required.';
        } else if (!/^\d{10}$/.test(formData.phone)) {
            newErrors.phone = 'Phone Number must be 10 digits.';
        }
        if (!formData.address.trim()) {
            newErrors.address = 'Business Address is required.';
        }

        setErrors(newErrors);
        // Return true if there are no errors, false otherwise
        return Object.keys(newErrors).length === 0;
    };

    // Handle the form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        // Validate the form before submitting
        if (validateForm()) {
            // If validation passes, proceed with submission
            console.log('Vendor Registration Data:', formData);

            // Show a success message to the user
            setSubmissionSuccess(true);

            // Reset the form and success message after a short delay
            setTimeout(() => {
                setFormData({
                    businessName: '',
                    contactName: '',
                    email: '',
                    phone: '',
                    address: '',
                });
                setSubmissionSuccess(false);
            }, 3000);
        } else {
            console.log('Form validation failed.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full">
                {/* Page Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">
                        Vendor Registration
                    </h1>
                    <p className="text-gray-500 text-lg">
                        Join our network of trusted vendors today.
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
                    {/* Business Name Field */}
                    <div>
                        <label htmlFor="businessName" className="block text-sm font-medium text-gray-700">
                            Business Name
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Building2 className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </div>
                            <input
                                type="text"
                                name="businessName"
                                id="businessName"
                                value={formData.businessName}
                                onChange={handleChange}
                                className={`block w-full pl-10 pr-3 py-2 border ${errors.businessName ? 'border-red-500' : 'border-gray-300'
                                    } rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 sm:text-sm`}
                                placeholder="e.g., Acme Corp"
                            />
                        </div>
                        {errors.businessName && (
                            <p className="mt-2 text-sm text-red-600 flex items-center">
                                <AlertCircle className="h-4 w-4 mr-1" />
                                {errors.businessName}
                            </p>
                        )}
                    </div>

                    {/* Contact Person Field */}
                    <div>
                        <label htmlFor="contactName" className="block text-sm font-medium text-gray-700">
                            Contact Person
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </div>
                            <input
                                type="text"
                                name="contactName"
                                id="contactName"
                                value={formData.contactName}
                                onChange={handleChange}
                                className={`block w-full pl-10 pr-3 py-2 border ${errors.contactName ? 'border-red-500' : 'border-gray-300'
                                    } rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 sm:text-sm`}
                                placeholder="e.g., Jane Doe"
                            />
                        </div>
                        {errors.contactName && (
                            <p className="mt-2 text-sm text-red-600 flex items-center">
                                <AlertCircle className="h-4 w-4 mr-1" />
                                {errors.contactName}
                            </p>
                        )}
                    </div>

                    {/* Email Address Field */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </div>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`block w-full pl-10 pr-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'
                                    } rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 sm:text-sm`}
                                placeholder="you@example.com"
                            />
                        </div>
                        {errors.email && (
                            <p className="mt-2 text-sm text-red-600 flex items-center">
                                <AlertCircle className="h-4 w-4 mr-1" />
                                {errors.email}
                            </p>
                        )}
                    </div>

                    {/* Phone Number Field */}
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                            Phone Number
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Phone className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </div>
                            <input
                                type="tel"
                                name="phone"
                                id="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className={`block w-full pl-10 pr-3 py-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'
                                    } rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 sm:text-sm`}
                                placeholder="e.g., 5551234567"
                            />
                        </div>
                        {errors.phone && (
                            <p className="mt-2 text-sm text-red-600 flex items-center">
                                <AlertCircle className="h-4 w-4 mr-1" />
                                {errors.phone}
                            </p>
                        )}
                    </div>

                    {/* Business Address Field */}
                    <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                            Business Address
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <MapPin className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </div>
                            <input
                                type="text"
                                name="address"
                                id="address"
                                value={formData.address}
                                onChange={handleChange}
                                className={`block w-full pl-10 pr-3 py-2 border ${errors.address ? 'border-red-500' : 'border-gray-300'
                                    } rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 sm:text-sm`}
                                placeholder="e.g., 123 Main St, Anytown, USA"
                            />
                        </div>
                        {errors.address && (
                            <p className="mt-2 text-sm text-red-600 flex items-center">
                                <AlertCircle className="h-4 w-4 mr-1" />
                                {errors.address}
                            </p>
                        )}
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
