"use client";
import { useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { motion } from "framer-motion";
import { CheckIcon } from "@heroicons/react/20/solid";

const stallData = {
    'Food Court': [
        "Rajasthani Thali House", "Gujarati Thali House", "Punjabi Thali House", "South Indian Thali House",
        "Bengali Thali House", "Maharashtrian Thali House", "Chaats & Snacks Corner", "Vada Pav Junction",
        "Momo Mania", "Biryani & Kebabs", "Noodle Station", "Dosa King", "Pani Puri Paradise",
        "Jalebi & Rabri", "Gulab Jamun & Kala Jamun", "Matka Kulfi Studio", "Royal Falooda Factory",
        "Traditional Ice Creams", "Sugarcane Juice Press", "Fresh Fruit Juices"
    ],
    'Flea Market': [
        "Banarasi Saree House", "Ajrakh & Bagru Prints", "Ikat Handloom Corner", "Men’s Kurta & Dhoti",
        "Banjara Embroidery Boutique", "Kids’ Ethnic Wear", "Khadi & Cotton Bazaar", "Designer Blouse & Dupattas",
        "Oxidized Jewelry Hub", "Handcrafted Silver Gems", "Terracotta Earrings", "Beaded & Thread Jewelry",
        "Mojari & Jutti Store", "Potli Bag Emporium", "Hand-painted Clutches", "Folk Instruments Corner",
        "Resin Art (Folk Motifs)", "Rudraksha & Spiritual Beads", "Attars & Ittar Oils", "Jaggery & Festive Sweets",
        "Shola Pith Crafts", "Herbal Skincare Products"
    ],
    'Fun Zone': [
        "Giant Wheel", "Carousel (Merry-Go-Round)", "Bungee Trampoline", "Mechanical Bull Ride",
        "Meltdown Sweeper", "Kids Soft Play Zone", "Ball Pit & Slides", "Archery & Shooting",
        "Darts & Ring Toss", "Break the Pot", "Balloon Shooting", "Human Claw Machine",
        "Folk Costume Photo Booth", "Henna & Temporary Tattoos", "Puppet Show Theatre",
        "Street Magic Stage", "Pottery Wheel Experience", "Rangoli Workshop", "Kite Making Corner",
        "Face Painting Kiosk"
    ]
};

const steps = ["Personal Info", "Stall Selection", "Review & Submit"];

const colors = {
    primary: "bg-[#0b1d51]", // Navy blue
    saffron: "bg-[#ff9933]", // Saffron
    gold: "bg-[#ffd700]", // Gold
    maroonText: "text-[#800000]", // Maroon
    lightBg: "bg-[#fff9f0]", // Cream background
};

export default function VendorRegistration({ selectedCategory = "Food Court" }) {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({
        vendorName: "",
        email: "",
        contactNumber: "",
        stallChoice: "",
        additionalNotes: "",
    });
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);

    const validateStep = () => {
        const newErrors = {};
        if (step === 0) {
            if (!/^[a-zA-Z\s]+$/.test(formData.vendorName.trim())) {
                newErrors.vendorName = "Valid Vendor Name is required.";
            }
            if (!/^\d{10}$/.test(formData.contactNumber)) {
                newErrors.contactNumber = "Enter a valid 10-digit number.";
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                newErrors.email = "Enter a valid email.";
            }
        }
        if (step === 1) {
            if (!formData.stallChoice) {
                newErrors.stallChoice = "Please select a stall.";
            }
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = (e) => {
        e.preventDefault();
        setSuccess(false); // ✅ ensure no success message when just moving steps
        if (validateStep()) {
            setStep((prev) => prev + 1);
        }
    };

    const handlePrev = () => {
        setSuccess(false); // ✅ same for going back
        setStep((prev) => prev - 1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateStep() && step === 2) {
            console.log("Form Submitted:", { ...formData, category: selectedCategory });
            setSuccess(true); // ✅ only here!
            setTimeout(() => {
                setFormData({
                    vendorName: "",
                    email: "",
                    contactNumber: "",
                    stallChoice: "",
                    additionalNotes: "",
                });
                setStep(0);
                setSuccess(false);
            }, 3000);
        }
    };


    return (
        <div className={`${colors.lightBg} min-h-screen flex items-center text-gray-900 justify-center p-6`}>
            <div className="bg-white rounded-2xl shadow-lg w-full max-w-2xl p-6">

                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className={`text-3xl font-extrabold ${colors.maroonText}`}>
                        Vendor Registration
                    </h1>
                    <p className="text-gray-600">Register for the {selectedCategory}.</p>
                </div>

                {/* Progress Bar */}
                <div className="relative mb-8">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className={`h-2 rounded-full bg-gradient-to-r from-[#ff9933] to-[#ffd700]`}
                            style={{
                                width: `${(step / (steps.length - 1)) * 100}%`, // ✅ correct scaling
                            }}
                        ></div>
                    </div>
                    <div className="flex justify-between text-xs font-semibold mt-2">
                        {steps.map((label, index) => (
                            <span
                                key={index}
                                className={index <= step ? colors.maroonText : "text-gray-400"} // ✅ highlight current
                            >
                                {label}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Success Message */}
                {success && (
                    <div className="p-4 mb-4 text-green-700 bg-green-100 rounded-lg text-center font-semibold">
                        ✅ Registration submitted successfully!
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    {/* Step 1 - Personal Info */}
                    {step === 0 && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                            <InputField
                                label="Vendor Name"
                                name="vendorName"
                                value={formData.vendorName}
                                onChange={(e) => setFormData({ ...formData, vendorName: e.target.value })}
                                error={errors.vendorName}
                            />
                            <InputField
                                label="Email"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                error={errors.email}
                            />
                            <InputField
                                label="Contact Number"
                                type="tel"
                                name="contactNumber"
                                value={formData.contactNumber}
                                onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                                error={errors.contactNumber}
                            />
                        </motion.div>
                    )}

                    {/* Step 2 - Stall Selection */}
                    {step === 1 && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                            <Listbox value={formData.stallChoice} onChange={(val) => setFormData({ ...formData, stallChoice: val })}>
                                {({ open }) => (
                                    <div>
                                        <Listbox.Label className="block text-sm font-medium text-gray-700">
                                            Choose {selectedCategory === "Fun Zone" ? "Attraction" : "Stall"}
                                        </Listbox.Label>
                                        <div className="relative mt-1">
                                            <Listbox.Button className="relative w-full bg-white border border-yellow-300 rounded-md py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm">
                                                <span className="block truncate">{formData.stallChoice || "Select an option"}</span>
                                            </Listbox.Button>
                                            <Transition
                                                show={open}
                                                as="div"
                                                leave="transition ease-in duration-100"
                                                leaveFrom="opacity-100"
                                                leaveTo="opacity-0"
                                            >
                                                <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md text-base ring-1 ring-yellow-300 ring-opacity-5 overflow-auto sm:text-sm">
                                                    {stallData[selectedCategory].map((stall, idx) => (
                                                        <Listbox.Option
                                                            key={idx}
                                                            className={({ active }) =>
                                                                `${active ? "text-white bg-yellow-600" : "text-gray-900"}
                              cursor-pointer select-none relative py-2 pl-10 pr-4`
                                                            }
                                                            value={stall}
                                                        >
                                                            {({ selected, active }) => (
                                                                <>
                                                                    <span className={`${selected ? "font-semibold" : "font-normal"} block truncate`}>
                                                                        {stall}
                                                                    </span>
                                                                    {selected ? (
                                                                        <span
                                                                            className={`${active ? "text-white" : "text-yellow-600"}
                                    absolute inset-y-0 left-0 flex items-center pl-3`}
                                                                        >
                                                                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                        </span>
                                                                    ) : null}
                                                                </>
                                                            )}
                                                        </Listbox.Option>
                                                    ))}
                                                </Listbox.Options>
                                            </Transition>
                                        </div>
                                    </div>
                                )}
                            </Listbox>
                            {errors.stallChoice && <ErrorText>{errors.stallChoice}</ErrorText>}
                            <TextAreaField
                                label="Additional Notes"
                                name="additionalNotes"
                                value={formData.additionalNotes}
                                onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                            />
                        </motion.div>
                    )}

                    {/* Step 3 - Review & Submit */}
                    {step === 2 && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 bg-green-100 rounded-lg p-3">
                            <h3 className="text-lg font-semibold">Review Your Details</h3>
                            <ul className="space-y-2">
                                <li><strong>Vendor Name:</strong> {formData.vendorName}</li>
                                <li><strong>Email:</strong> {formData.email}</li>
                                <li><strong>Contact Number:</strong> {formData.contactNumber}</li>
                                <li><strong>Stall Choice:</strong> {formData.stallChoice}</li>
                                <li><strong>Additional Notes:</strong> {formData.additionalNotes || "None"}</li>
                            </ul>
                        </motion.div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="mt-6 flex justify-between">
                        {step > 0 ? (
                            <button
                                type="button"
                                onClick={handlePrev}
                                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                            >
                                Back
                            </button>
                        ) : <div />}

                        {step < steps.length - 1 ? (
                            <button
                                type="button" // ✅ prevents accidental form submit
                                onClick={handleNext}
                                className={`px-4 py-2 rounded-md ${colors.primary} text-white hover:bg-[#13294b]`}
                            >
                                Next
                            </button>
                        ) : (
                            <button
                                type="submit" // ✅ will trigger handleSubmit only here
                                className="px-4 py-2 rounded-md bg-gradient-to-r from-[#ff9933] to-[#ffd700] text-white font-bold"
                            >
                                Submit
                            </button>
                        )}
                    </div>

                </form>
            </div>
        </div>
    );
}

/* ---------- Reusable Components ---------- */
function InputField({ label, type = "text", name, value, onChange, error }) {

    return (
        <div>
            <label className="block text-sm font-medium">{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className={`mt-1 block p-2 w-full rounded-md border-2 ${error ? "border-red-500" : "border-gray-300"
                    } shadow-sm focus:border-yellow-500 focus:ring-yellow-500 sm:text-sm`}
            />
            {error && <ErrorText>{error}</ErrorText>}
        </div>
    );
}

function TextAreaField({ label, name, value, onChange }) {
    return (
        <div>
            <label className="block text-sm font-medium">{label}</label>
            <textarea
                name={name}
                value={value}
                onChange={onChange}
                rows="3"
                className={`mt-1 block w-full rounded-md p-2 border border-yellow-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 sm:text-sm`}
            ></textarea>
        </div>
    );
}

function ErrorText({ children }) {
    return <p className="mt-1 text-sm text-red-600">{children}</p>;
}
