import React from "react";

const Loader = () => {
    return (
        <div className="absolute top-[50%] right-[50%] bg-gradient-to-r from-red-400  to-yellow-600 z-50">
            <span className="animate-ping absolute w-10 h-10 inline-flex items-center rounded-full border-4 bg-gradient-to-r from-red-500 via-orange-300 via-green-300 via-blue-300 to-yellow-400 opacity-50"></span>
        </div>
    );
};

export default Loader;
