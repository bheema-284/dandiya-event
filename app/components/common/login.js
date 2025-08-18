"use client"
import React, { useContext, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import RootContext from "../config/rootcontext";
import { useSWRFetch } from "../config/useswrfetch";
import Loader from "./loader";
import ForgetPassword from "./forgetpassword";
import RegistrationForm from "../registrationform";
import bcrypt from "bcryptjs";

const Login = () => {
    const { rootContext, setRootContext } = useContext(RootContext);

    const { data, error } = useSWRFetch(`/api/users`)
    //const mutated = Mutated(`/api/masters/hotels/boardtype?search_text=${searchText}`)

    const [formData, setFormData] = useState({
        mobile: "",
        email: "",
        password: "",
        remember: false,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [screen, setScreen] = useState("login");

    const onSave = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const user = data.find(
            (u) => u.email === formData.email || u.mobile === formData.email
        );

        if (!user) {
            setRootContext((prevContext) => ({
                ...prevContext,
                toast: {
                    show: true,
                    dismiss: true,
                    type: "error",
                    title: "Login Failed",
                    message: "User not found. Please sign up.",
                },
            }));
            setIsLoading(false);
            return;
        }

        // 🔑 Compare entered password with hashed password in DB
        const isMatch = await bcrypt.compare(formData.password, user.password);

        if (!isMatch) {
            setRootContext((prevContext) => ({
                ...prevContext,
                toast: {
                    show: true,
                    dismiss: true,
                    type: "error",
                    title: "Login Failed",
                    message: "Incorrect password. Please try again.",
                },
            }));
            setIsLoading(false);
            return;
        }

        // ✅ Successful login
        const username = user.name || user.email?.split("@")[0];
        const resp = {
            ...rootContext,
            authenticated: true,
            loader: false,
            user: {
                name: username,
                email: user.email,
                mobile: user.mobile,
                token: user.token,
            },
        };

        setRootContext({
            ...resp,
            toast: {
                show: true,
                dismiss: true,
                type: "success",
                title: "Login Successful",
                message: "Welcome back!",
            },
        });

        localStorage.setItem("user_details", JSON.stringify(resp.user));
        setIsLoading(false);
    };



    return (
        <>
            <header className="w-full h-24 fixed z-50 top-0 flex items-center justify-center bg-[#1a1945]">
                <div className="w-full sm:w-[60%] m-auto flex items-center justify-between">
                    {/* Left Durga Image */}
                    <div className="flex items-center">
                        <img
                            src="/Durga.png"
                            alt="Durga"
                            className="h-16 w-auto object-contain"
                            style={{
                                filter:
                                    'drop-shadow(0 0 2px white) drop-shadow(0 0 6px white)',
                            }}
                        />
                    </div>

                    {/* Title Logo */}
                    <div className="flex-1 flex justify-center">
                        <img
                            src="/Dandiya Carnival Logo.png"
                            alt="event"
                            className="h-14 sm:h-16 w-auto object-contain"
                        />
                    </div>

                    {/* Empty Spacer for alignment */}
                    <div className="w-20"></div>
                </div>
            </header>
            {screen === "login" ? <section className="pt-32">
                {isLoading && <Loader />}
                <div className="flex flex-col items-center justify-center">
                    <form onSubmit={onSave} className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Sign in to your account
                            </h1>
                            <div className="space-y-4 md:space-y-6">
                                <input
                                    title={"Email or Mobile"}
                                    type={"text"}
                                    placeholder={"Email or phone number"}
                                    className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-fuchsia-500"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    errormsg={"Enter Valid Email"}
                                    required={true}
                                />

                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Password"
                                        className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-fuchsia-500"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        onClick={() => setScreen("otp")}
                                        className="text-sm font-semibold text-purple-500 hover:underline"
                                    >
                                        Forgot Password?
                                    </button>
                                </div>
                                <button
                                    type="submit"
                                    className={`w-full p-3 rounded-lg hover:rounded-full font-bold text-white transition-colors duration-300
                  ${isLoading ? 'bg-fuchsia-400 cursor-not-allowed' : 'bg-fuchsia-600 hover:bg-fuchsia-700'}
                `}
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Loading...' : 'Log In'}
                                </button>
                                <div className="text-sm font-light text-gray-500 text-center dark:text-gray-400">
                                    New User ?{" "}
                                    <p onClick={() => setScreen("registration")} className="font-medium inline cursor-pointer text-purple-500 hover:underline dark:text-primary-500">
                                        Sign up Now
                                    </p>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </section> : screen === "otp" ? <ForgetPassword setScreen={setScreen} /> :
                <RegistrationForm setScreen={setScreen} />}
            <div className="relative w-full h-52">
                <div className="absolute top-80vh bottom-5 left-0 right-0 flex justify-between z-0 px-10">
                    <img src="/layer_8.png" className="h-36" />
                    <img src="/layer_10.png" className="h-36" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 flex w-full flex justify-between items-end z-10">
                    <img src="/layer_9.png" className="w-full h-20" />
                    <img src="/layer_11.png" className="w-full h-20" />
                    <img src="/layer_12.png" className="w-full h-20" />
                    <img src="/layer_13.png" className="w-full h-20" />
                </div>
            </div>
        </>
    );
};

export default Login;
