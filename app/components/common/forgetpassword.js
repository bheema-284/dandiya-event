"use client";
import React, { useState, Fragment, useContext } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { EyeIcon, EyeSlashIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import RootContext from "../config/rootcontext";
import { XMarkIcon } from "@heroicons/react/24/solid";

export default function ForgetPassword({ setScreen }) {
    const [inputType, setInputType] = useState("email");
    const [inputValue, setInputValue] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState({
        old: false,
        new: false,
        confirm: false,
    });
    const [loading, setLoading] = useState(false);
    const [isUserNotFound, setIsUserNotFound] = useState(false);
    const toggleInputType = () => {
        setInputType(inputType === "email" ? "mobile" : "email");
        setInputValue("");
    };
    const { setRootContext } = useContext(RootContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setRootContext((prevContext) => ({
                ...prevContext,
                toast: {
                    show: true,
                    dismiss: true,
                    type: "error",
                    title: "Error",
                    message: "New password and confirm password do not match.",
                },
            }));
            return;
        }

        // Basic client-side validation for new password length
        if (newPassword.length < 6) {
            setRootContext((prevContext) => ({
                ...prevContext,
                toast: {
                    show: true,
                    dismiss: true,
                    type: "warning",
                    title: "Warning",
                    message: "New password must be at least 6 characters long.",
                },
            }));
            return;
        }

        try {
            setLoading(true);
            const payload = {
                [inputType]: inputValue,
                newPassword,
            };

            const res = await fetch("/api/users", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json();
            if (res.ok) {
                setRootContext((prevContext) => ({
                    ...prevContext,
                    toast: {
                        show: true,
                        dismiss: true,
                        type: "success",
                        title: "Successful",
                        message: `${data.message || "Password updated successfully!"}`,
                    },
                }));
                setNewPassword("");
                setConfirmPassword("");
                setScreen("login");
            } else if (res.status === 404) {
                setIsUserNotFound(true);
            } else {
                setRootContext((prevContext) => ({
                    ...prevContext,
                    toast: {
                        show: true,
                        dismiss: true,
                        type: "error",
                        title: "Failed",
                        message: `${data.error || "Something went wrong."}`,
                    },
                }));
            }
        } catch (err) {
            setRootContext((prevContext) => ({
                ...prevContext,
                toast: {
                    show: true,
                    dismiss: true,
                    type: "error",
                    title: "Failed",
                    message: "Network error, please try again.",
                },
            }));
        } finally {
            setLoading(false);
        }
    };

    const renderPasswordInput = (id, label, value, setValue, showKey) => (
        <div className="relative">
            <input
                type={showPassword[showKey] ? "text" : "password"}
                id={id}
                placeholder={label}
                className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                required
            />
            <button
                type="button"
                onClick={() =>
                    setShowPassword((prev) => ({
                        ...prev,
                        [showKey]: !prev[showKey],
                    }))
                }
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
            >
                {showPassword[showKey] ? (
                    <EyeSlashIcon className="h-5 w-5" />
                ) : (
                    <EyeIcon className="h-5 w-5" />
                )}
            </button>
        </div>
    );

    return (
        <div className="flex pt-32 min-h-screen items-center justify-center p-4 font-sans antialiased">
            <div className="relative w-full max-w-md overflow-hidden rounded-xl bg-white p-8 text-center shadow-2xl">
                {/* X mark at top-right */}
                <button
                    onClick={() => setScreen("login")}
                    className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-200"
                >
                    <XMarkIcon className="w-5 h-5 text-gray-700" />
                </button>

                {/* Lock icon center */}
                <div className="flex justify-center">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                        </svg>
                    </div>
                </div>

                <h1 className="mb-2 text-2xl font-bold text-gray-800">Update Password</h1>
                <p className="mb-6 text-sm text-gray-600">
                    Enter your{" "}
                    {inputType === "email" ? "email" : "mobile number"} and we'll send you a
                    link to reset your password.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                    <input
                        type={inputType === "email" ? "email" : "tel"}
                        placeholder={
                            inputType === "email" ? "Email address" : "Mobile number"
                        }
                        className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        required
                    />

                    {renderPasswordInput(
                        "newPassword",
                        "New Password",
                        newPassword,
                        setNewPassword,
                        "new"
                    )}
                    {renderPasswordInput(
                        "confirmPassword",
                        "Confirm Password",
                        confirmPassword,
                        setConfirmPassword,
                        "confirm"
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-blue-500 p-3 font-semibold hover:rounded-full text-white shadow-md transition duration-200 hover:bg-blue-600 disabled:opacity-50"
                    >
                        {loading ? "Updating..." : "Update Password"}
                    </button>
                </form>

                <button
                    onClick={toggleInputType}
                    className="mt-4 w-full border border-blue-300 rounded-lg hover:rounded-full p-3 text-sm font-semibold text-blue-500 transition-colors duration-200 hover:text-blue-600"
                >
                    Search by{" "}
                    {inputType === "email"
                        ? "mobile number instead"
                        : "email address instead"}
                </button>

            </div>

            <Modal
                isOpen={isUserNotFound}
                onClose={() => setIsUserNotFound(false)}
                title="User Not Found"
                icon={<InformationCircleIcon className="h-10 w-10 text-blue-500" />}
            >
                <p>
                    The user you are trying to find was not found. Please check the {inputType} and try again.
                </p>
            </Modal>
        </div>

    );
}

/* ----------------------------
    Reusable Headless UI Modal
----------------------------- */
function Modal({ isOpen, onClose, title, icon, children }) {
    return (
        <Transition show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-200"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
                </Transition.Child>

                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-200"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-150"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel className="w-full max-w-sm rounded-xl bg-white p-6 text-center shadow-2xl">
                            {icon && (
                                <div className="mb-4 flex items-center justify-center">
                                    {icon}
                                </div>
                            )}
                            <Dialog.Title className="text-lg font-bold text-gray-800 mb-2">
                                {title}
                            </Dialog.Title>
                            <div className="text-sm text-gray-600">{children}</div>

                            <button
                                onClick={onClose}
                                className="mt-6 w-full rounded-lg bg-gray-200 p-3 font-semibold text-gray-800 shadow-md hover:bg-gray-300"
                            >
                                Close
                            </button>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
}