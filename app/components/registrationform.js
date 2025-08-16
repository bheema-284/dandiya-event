'use client'
import React, { useContext, useState } from 'react';
import RootContext from './config/rootcontext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import Loader from './common/loader';

export default function RegistrationForm() {
    const [firstName, setFirstName] = useState('');
    const [surname, setSurname] = useState('');
    const [dobDay, setDobDay] = useState('Day');
    const [dobMonth, setDobMonth] = useState('Month');
    const [dobYear, setDobYear] = useState('Year');
    const [gender, setGender] = useState('');
    const [contact, setContact] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const { rootContext, setRootContext } = useContext(RootContext);
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [serviceCall, setServiceCall] = useState(false);
    // Format DOB into "DD-MM-YYYY" for backend
    const formatDOB = () => {
        if (dobDay === 'Day' || dobMonth === 'Month' || dobYear === 'Year') return '';
        const monthMap = {
            Jan: '01', Feb: '02', Mar: '03', Apr: '04',
            May: '05', Jun: '06', Jul: '07', Aug: '08',
            Sep: '09', Oct: '10', Nov: '11', Dec: '12'
        };
        return `${dobDay.padStart(2, '0')}-${monthMap[dobMonth]}-${dobYear}`;
    };

    // Validation function
    const validateForm = () => {
        const newErrors = {};
        if (!firstName.trim()) newErrors.firstName = "First name is required";
        if (!surname.trim()) newErrors.surname = "Surname is required";
        if (dobDay === 'Day' || dobMonth === 'Month' || dobYear === 'Year') newErrors.dob = "Date of birth is required";
        if (!gender) newErrors.gender = "Please select a gender";
        if (!contact.trim()) newErrors.contact = "Email or mobile is required";
        else {
            const isMobile = /^\d+$/.test(contact.trim());
            const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.trim());
            if (isMobile && contact.trim().length !== 10) newErrors.contact = "Mobile number must be 10 digits";
            if (!isMobile && !isEmail) newErrors.contact = "Enter a valid email address";
        }
        if (!password) newErrors.password = "Password is required";
        else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setServiceCall(true)
        if (!validateForm()) return;

        const isMobile = /^\d+$/.test(contact.trim());
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.trim());

        const newUser = {
            name: `${firstName} ${surname}`.trim(),
            password,
            gender,
            role: "user",
            date_of_birth: formatDOB(),
        };
        if (isMobile) {
            newUser.mobile = contact.trim()
        }
        if (isEmail) {
            newUser.email = contact.trim()
        }
        try {
            const res = await fetch('/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUser),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Failed to register');

            router.push("/");
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
            setServiceCall(false)
            // Reset form
            setFirstName('');
            setSurname('');
            setDobDay('Day');
            setDobMonth('Month');
            setDobYear('Year');
            setGender('');
            setContact('');
            setPassword('');
            setErrors({});
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
        }
    };
    const getColor = (g) => {
        if (g === "male") return "bg-red-500";
        if (g === "female") return "bg-yellow-400";
        if (g === "custom") return "bg-gradient-to-r from-red-500 to-yellow-400";
        return "bg-white";
    };

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
                                placeholder="First name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-fuchsia-500"
                            />
                            {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                        </div>
                        <div className="flex-1">
                            <input
                                type="text"
                                placeholder="Surname"
                                value={surname}
                                onChange={(e) => setSurname(e.target.value)}
                                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-fuchsia-500"
                            />
                            {errors.surname && <p className="text-red-500 text-xs mt-1">{errors.surname}</p>}
                        </div>
                    </div>

                    {/* Date of Birth */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Date of birth</label>
                        <div className="grid grid-cols-3 gap-2">
                            <select value={dobDay} onChange={(e) => setDobDay(e.target.value)} className="px-3 py-2 border rounded-lg">
                                <option>Day</option>
                                {[...Array(31).keys()].map(d => <option key={d + 1}>{d + 1}</option>)}
                            </select>
                            <select value={dobMonth} onChange={(e) => setDobMonth(e.target.value)} className="px-3 py-2 border rounded-lg">
                                <option>Month</option>
                                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => <option key={m}>{m}</option>)}
                            </select>
                            <select value={dobYear} onChange={(e) => setDobYear(e.target.value)} className="px-3 py-2 border rounded-lg">
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
                                <label key={g} className="flex-1 items-center flex justify-between border px-2 py-1.5 rounded-lg cursor-pointer">
                                    {g.charAt(0).toUpperCase() + g.slice(1)}
                                    <input type="radio" className='hidden' name="gender" value={g} checked={gender === g} onChange={(e) => setGender(e.target.value)} />
                                    <span
                                        className={`w-4 h-4 rounded-full border-2 border-gray-400 flex-shrink-0 
            ${gender === g ? getColor(g) : "bg-white"}`}
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
                            placeholder="Mobile number or email address"
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-fuchsia-500"
                        />
                        {errors.contact && <p className="text-red-500 text-xs mt-1">{errors.contact}</p>}
                    </div>

                    {/* Password */}
                    <div>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-fuchsia-500"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
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
                        <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-16 rounded-lg">
                            Sign Up
                        </button>
                    </div>

                    <p className="text-xs text-gray-600 mb-2 whitespace-nowrap overflow-hidden text-ellipsis">
                        People who use our service may have uploaded your contact information to Facebook.
                        <Link href="#" className="text-blue-500 inline"> Learn more</Link>.
                    </p>
                    <p className="text-xs text-gray-600 mb-4 whitespace-nowrap overflow-hidden text-ellipsis">
                        By clicking Sign Up, you agree to our
                        <Link href="#" className="text-blue-500 inline"> Terms</Link>,
                        <Link href="#" className="text-blue-500 inline"> Privacy Policy</Link> and
                        <Link href="#" className="text-blue-500 inline"> Cookies Policy</Link>.
                        You may receive SMS notifications from us and can opt out at any time.
                    </p>
                    <div className="text-center">
                        <Link href="/" className="text-blue-500 text-sm">Already have an account?</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
