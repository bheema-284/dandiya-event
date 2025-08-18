'use client'
import React, { useContext, useEffect, useState } from 'react';
import RootContext from './config/rootcontext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import Loader from './common/loader';

export default function RegistrationForm() {
    const [formData, setFormData] = useState({
        firstName: '',
        surname: '',
        dobDay: 'Day',
        dobMonth: 'Month',
        dobYear: 'Year',
        gender: '',
        contact: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [serviceCall, setServiceCall] = useState(false);

    const { rootContext, setRootContext } = useContext(RootContext);
    const router = useRouter();

    // 🚀 Redirect if already authenticated
    useEffect(() => {
        if (rootContext?.authenticated) {
            router.push("/");
        }
    }, [rootContext?.authenticated, router]);

    // Update field values
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Format DOB into "DD-MM-YYYY" for backend
    const formatDOB = () => {
        const { dobDay, dobMonth, dobYear } = formData;
        if (dobDay === 'Day' || dobMonth === 'Month' || dobYear === 'Year') return '';
        const monthMap = {
            Jan: '01', Feb: '02', Mar: '03', Apr: '04',
            May: '05', Jun: '06', Jul: '07', Aug: '08',
            Sep: '09', Oct: '10', Nov: '11', Dec: '12'
        };
        return `${dobDay.padStart(2, '0')}-${monthMap[dobMonth]}-${dobYear}`;
    };

    // Validation
    const validateForm = () => {
        const { firstName, surname, dobDay, dobMonth, dobYear, gender, contact, password } = formData;
        const newErrors = {};

        if (!firstName.trim()) newErrors.firstName = "First name is required";
        if (!surname.trim()) newErrors.surname = "Surname is required";
        if (dobDay === 'Day' || dobMonth === 'Month' || dobYear === 'Year')
            newErrors.dob = "Date of birth is required";
        if (!gender) newErrors.gender = "Please select a gender";
        if (!contact.trim()) newErrors.contact = "Email or mobile is required";
        else {
            const isMobile = /^\d+$/.test(contact.trim());
            const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.trim());
            if (isMobile && contact.trim().length !== 10)
                newErrors.contact = "Mobile number must be 10 digits";
            if (!isMobile && !isEmail)
                newErrors.contact = "Enter a valid email address";
        }
        if (!password) newErrors.password = "Password is required";
        else if (password.length < 6)
            newErrors.password = "Password must be at least 6 characters";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Check if all fields filled
    const isFormFilled = () => {
        const { firstName, surname, dobDay, dobMonth, dobYear, gender, contact, password } = formData;
        return (
            firstName.trim() &&
            surname.trim() &&
            dobDay !== 'Day' &&
            dobMonth !== 'Month' &&
            dobYear !== 'Year' &&
            gender &&
            contact.trim() &&
            password
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setServiceCall(true);

        if (!validateForm()) {
            setServiceCall(false);
            return;
        }

        const { firstName, surname, gender, contact, password } = formData;
        const isMobile = /^\d+$/.test(contact.trim());
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.trim());

        const newUser = {
            name: `${firstName} ${surname}`.trim(),
            password,
            gender,
            role: "user",
            date_of_birth: formatDOB(),
        };
        if (isMobile) newUser.mobile = contact.trim();
        if (isEmail) newUser.email = contact.trim();

        try {
            const res = await fetch('/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUser),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Failed to register');

            setRootContext({
                ...rootContext,
                authenticated: true,
                loader: false,
                user: {
                    name: newUser.name,
                    email: newUser.email,
                    mobile: newUser.mobile,
                    token: "token",
                },
                toast: {
                    show: true,
                    dismiss: true,
                    type: "success",
                    title: "Successful",
                    message: "Registration Successful!",
                },
            });
            setServiceCall(false);

        } catch (err) {
            setRootContext((prev) => ({
                ...prev,
                toast: {
                    show: true,
                    dismiss: true,
                    type: "error",
                    title: "Failed",
                    message: `❌ ${err.message}`,
                },
            }));
            setServiceCall(false);
        }
    };
    const getColor = (g) => {
        if (g === "male") return "bg-red-500";
        if (g === "female") return "bg-yellow-400";
        if (g === "custom") return "bg-gradient-to-r from-red-500 to-yellow-400";
        return "bg-white";
    };
    // 🚀 Don't render form if already authenticated
    if (rootContext?.authenticated) return null;

    return (
        <div className="flex items-center justify-center min-h-screen p-4">
            {serviceCall && <Loader />}
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl font-inter">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Create a new account</h1>
                    <p className="text-gray-500 mt-1 text-base">It's quick and easy.</p>
                </div>

                <hr className="mb-6 border-gray-200" />

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* First Name & Surname */}
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <input
                                type="text"
                                name="firstName"
                                placeholder="First name"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-fuchsia-500"
                            />
                            {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                        </div>
                        <div className="flex-1">
                            <input
                                type="text"
                                name="surname"
                                placeholder="Surname"
                                value={formData.surname}
                                onChange={handleChange}
                                className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-fuchsia-500"
                            />
                            {errors.surname && <p className="text-red-500 text-xs mt-1">{errors.surname}</p>}
                        </div>
                    </div>

                    {/* Date of Birth */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Date of birth</label>
                        <div className="grid grid-cols-3 gap-2">
                            <select name="dobDay" value={formData.dobDay} onChange={handleChange} className="px-3 py-2 border border-gray-300 focus:outline-none focus:border-fuchsia-500 rounded-lg">
                                <option>Day</option>
                                {[...Array(31).keys()].map(d => <option key={d + 1}>{d + 1}</option>)}
                            </select>
                            <select name="dobMonth" value={formData.dobMonth} onChange={handleChange} className="px-3 py-2 border border-gray-300 focus:outline-none focus:border-fuchsia-500 rounded-lg">
                                <option>Month</option>
                                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => <option key={m}>{m}</option>)}
                            </select>
                            <select name="dobYear" value={formData.dobYear} onChange={handleChange} className="px-3 py-2 border border-gray-300 focus:outline-none focus:border-fuchsia-500 rounded-lg">
                                <option>Year</option>
                                {[...Array(100).keys()].map(y => <option key={2025 - y}>{2025 - y}</option>)}
                            </select>
                        </div>
                        {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob}</p>}
                    </div>

                    {/* Gender */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Gender</label>
                        <div className="flex gap-2">
                            {['female', 'male', 'custom'].map(g => (
                                <label key={g} className="flex-1 items-center flex justify-between border border-gray-300 focus:outline-none focus:border-fuchsia-500 px-2 py-1.5 rounded-lg cursor-pointer">
                                    {g.charAt(0).toUpperCase() + g.slice(1)}
                                    <input
                                        type="radio"
                                        name="gender"
                                        value={g}
                                        checked={formData.gender === g}
                                        onChange={handleChange}
                                        className="hidden"
                                    />
                                    <span
                                        className={`w-4 h-4 rounded-full border-2 border-gray-400 flex-shrink-0 ${formData.gender === g ? getColor(g) : "bg-white"}`}
                                    ></span>
                                </label>
                            ))}
                        </div>
                        {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
                    </div>

                    {/* Contact */}
                    <div>
                        <input
                            type="text"
                            name="contact"
                            placeholder="Mobile number or email address"
                            value={formData.contact}
                            onChange={handleChange}
                            className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-fuchsia-500"
                        />
                        {errors.contact && <p className="text-red-500 text-xs mt-1">{errors.contact}</p>}
                    </div>

                    {/* Password */}
                    <div>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-fuchsia-500"
                            />
                            <span
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                            >
                                {showPassword ? (
                                    <EyeIcon className="w-4 h-4 text-gray-400" />
                                ) : (
                                    <EyeSlashIcon className="w-4 h-4 text-gray-400" />
                                )}
                            </span>
                        </div>
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                    </div>

                    {/* Submit */}
                    <div className="text-center my-6">
                        <button
                            type="submit"
                            disabled={!isFormFilled()}
                            className={`font-bold py-3 px-16 rounded-lg ${isFormFilled()
                                ? "bg-green-600 hover:bg-green-700 text-white"
                                : "bg-gray-400 text-gray-200 cursor-not-allowed"
                                }`}
                        >
                            Sign Up
                        </button>
                    </div>

                    {/* Terms */}
                    <p className="text-xs text-gray-600 mb-2">
                        People who use our service may have uploaded your contact information to Facebook.
                        <Link href="#" className="text-blue-500 inline"> Learn more</Link>.
                    </p>
                    <p className="text-xs text-gray-600 mb-4">
                        By clicking Sign Up, you agree to our
                        <Link href="#" className="text-blue-500 inline"> Terms</Link>,
                        <Link href="#" className="text-blue-500 inline"> Privacy Policy</Link> and
                        <Link href="#" className="text-blue-500 inline"> Cookies Policy</Link>.
                    </p>
                    <div className="text-center">
                        <Link href="/" className="text-blue-500 text-sm">Already have an account?</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
