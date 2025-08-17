"use client"
import React, { useContext, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import RootContext from "../config/rootcontext";
import { useSWRFetch } from "../config/useswrfetch";
import Link from "next/link";
import Loader from "./loader";
import ForgetPassword from "./forgetpassword";

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
    const [serviceCall, setServiceCall] = useState(false);
    const [showLogin, setShowLogin] = useState(true);
    console.log("showLogin", showLogin)

    const onSave = (e) => {
        e.preventDefault(); // Prevent page refresh
        setIsLoading(true);
        setServiceCall(true)
        const user = data.find((user) => (user.email === formData.email || user.mobile === formData.email));
        const userByEmail = data.find((user) => (user.email === formData.email || user.mobile === formData.email));
        const userByPassword = data.find((user) => user.password === formData.password);
        if (!userByEmail && !userByPassword) {
            // User not found
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
            setIsLoading(false)
        }
        else if (!userByEmail) {
            // Email not found
            setRootContext((prevContext) => ({
                ...prevContext,
                toast: {
                    show: true,
                    dismiss: true,
                    type: "error",
                    title: "Login Failed",
                    message: "Email not found. Please sign up.",
                },
            }));
            setIsLoading(false)

        } else if (!userByPassword) {
            // Email found, but password wrong
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
            setIsLoading(false)

        } else {
            // Email and password correct
            const username = user.name || userByEmail.email.split("@")[0];
            const resp = {
                ...rootContext,
                authenticated: true,
                loader: false,
                user: {
                    name: username,
                    email: userByEmail.email,
                    mobile: userByEmail.mobile,
                    password: userByEmail.password,
                    token: userByEmail.token,
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
            setServiceCall(false)
        }
    };


    return (
        <>
            {showLogin ? <section className="">
                {serviceCall && <Loader />}
                <div className="flex flex-col items-center justify-center">
                    <div className="flex-1 text-center my-5">
                        <h1 className="text-3xl text-center font-bold text-fuchsia-600 mb-2">Dandiya Carnival</h1>
                        <p className="text-md italic text-center text-gray-800">
                            Find your perfect rhythm and partner for the Navratri season.
                        </p>
                    </div>
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
                                        onClick={() => setShowLogin(false)}
                                        className="text-sm font-semibold text-blue-500 hover:underline"
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
                                <p className="text-sm font-light text-gray-500 text-center dark:text-gray-400">
                                    New User ?{" "}
                                    <Link href={'/signup'} className="font-medium inline cursor-pointer text-purple-500 hover:underline dark:text-primary-500">
                                        Sign up Now
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </form>
                </div>
            </section> : <ForgetPassword setShowLogin={setShowLogin} />}
        </>
    );
};

export default Login;
