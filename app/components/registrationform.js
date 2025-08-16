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
    const [mobile, setMobile] = useState('');
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

        const newUser = {
            name: `${firstName} ${surname}`.trim(),
            email,
            password,
            gender,
            mobile,
            role: "user", // default
            date_of_birth: formatDOB(),
        };

        try {
            const res = await fetch('/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUser),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Failed to register');
            }

            // setMessage(`✅ User created! ID: ${data.insertedId}`);
            router.push("/")
            const resp = {
                ...rootContext,
                authenticated: true,
                loader: false,
                user: {
                    name: `${firstName} ${surname}`.trim(),
                    email: email,
                    password: password,
                    mobile: mobile,
                    token: "token",
                },
            };
            setRootContext({
                ...resp,
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
            setRootContext((prevContext) => ({
                ...prevContext,
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
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-2 py-1.5 border border-gray-300 rounded-lg"
                    />
                    <input
                        type="mobile"
                        placeholder="Mobile"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
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
                    <div className="text-center mt-6">
                        <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-16 rounded-lg">
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
