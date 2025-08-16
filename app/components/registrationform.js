'use client'
import React, { useContext, useState } from 'react';
import RootContext from './config/rootcontext';
import { useRouter } from 'next/navigation';

export default function RegistrationForm() {
    const [firstName, setFirstName] = useState('');
    const [surname, setSurname] = useState('');
    const [dobDay, setDobDay] = useState('Day');
    const [dobMonth, setDobMonth] = useState('Month');
    const [dobYear, setDobYear] = useState('Year');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { rootContext, setRootContext } = useContext(RootContext);
    const router = useRouter();
    // Format DOB into "DD-MM-YYYY" for Joi validation
    const formatDOB = () => {
        if (dobDay === 'Day' || dobMonth === 'Month' || dobYear === 'Year') return '';
        const monthMap = {
            Jan: '01', Feb: '02', Mar: '03', Apr: '04',
            May: '05', Jun: '06', Jul: '07', Aug: '08',
            Sep: '09', Oct: '10', Nov: '11', Dec: '12'
        };
        return `${dobDay.padStart(2, '0')}-${monthMap[dobMonth]}-${dobYear}`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Determine what the user entered
        const isMobile = /^\d{10}$/.test(email); // if 10 digits → treat as mobile
        const isEmail = /\S+@\S+\.\S+/.test(email); // if email format → treat as email

        // Construct payload
        const newUser = {
            name: `${firstName} ${surname}`.trim(),
            password,
            gender,
            role: "user",
            date_of_birth: formatDOB(),
            mobile: isMobile ? email : "", // if mobile, set mobile key
            email: isEmail ? email : "",   // if email, set email key
        };

        try {
            const res = await fetch('/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUser),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.error || 'Failed to register');

            // Update rootContext & redirect
            router.push("/");
            setRootContext({
                ...rootContext,
                authenticated: true,
                loader: false,
                user: {
                    name: `${firstName} ${surname}`.trim(),
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

            // Reset form
            setFirstName('');
            setSurname('');
            setDobDay('Day');
            setDobMonth('Month');
            setDobYear('Year');
            setGender('');
            setEmail('');
            setPassword('');

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

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl font-inter">
                {/* Header Section */}
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Create a new account</h1>
                    <p className="text-gray-500 mt-1 text-base">It's quick and easy.</p>
                </div>

                <hr className="mb-6 border-gray-200" />

                {/* Registration Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* First Name & Surname */}
                    <div className="flex flex-col md:flex-row gap-4">
                        <input
                            type="text"
                            placeholder="First name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                            className="w-full px-2 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="text"
                            placeholder="Surname"
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                            required
                            className="w-full px-2 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
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
                    </div>

                    {/* Gender */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Gender</label>
                        <div className="flex gap-2">
                            {['female', 'male', 'custom'].map(g => (
                                <label key={g} className="flex-1 flex justify-between border px-2 py-1.5 rounded-lg cursor-pointer">
                                    {g.charAt(0).toUpperCase() + g.slice(1)}
                                    <input
                                        type="radio"
                                        name="gender"
                                        value={g}
                                        checked={gender === g}
                                        onChange={(e) => setGender(e.target.value)}
                                    />
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Email & Password */}
                    <input
                        type="email"
                        placeholder="Mobile number or email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-2 py-1.5 border border-gray-300 rounded-lg"
                    />
                    <input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-2 py-1.5 border border-gray-300 rounded-lg"
                    />

                    {/* Sign Up button */}
                    <div className="text-center my-6">
                        <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-16 rounded-lg">
                            Sign Up
                        </button>
                    </div>
                    {/* Info paragraphs (forced to single line each) */}
                    <p className="text-xs text-gray-600 mb-2 whitespace-nowrap overflow-hidden text-ellipsis">
                        People who use our service may have uploaded your contact information to Facebook.
                        <a href="#" className="text-blue-500 inline"> Learn more</a>.
                    </p>

                    <p className="text-xs text-gray-600 mb-4 whitespace-nowrap overflow-hidden text-ellipsis">
                        By clicking Sign Up, you agree to our
                        <a href="#" className="text-blue-500 inline"> Terms</a>,
                        <a href="#" className="text-blue-500 inline"> Privacy Policy</a> and
                        <a href="#" className="text-blue-500 inline"> Cookies Policy</a>.
                        You may receive SMS notifications from us and can opt out at any time.
                    </p>
                    <div className="text-center">
                        <a href="/" className="text-blue-500 text-sm">Already have an account?</a>
                    </div>
                </form>
            </div>
        </div>
    );
}
