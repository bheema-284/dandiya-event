'use client'
import "./globals.css";
import { Inter } from 'next/font/google';
import RootContext from "./components/config/rootcontext";
import Navbar from "./components/navbar";
import Login from "./components/common/login";
import Toast from "./components/common/toast";
import RegistrationForm from './components/registrationform';
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"], display: "swap" });

// ✅ Layouts MUST be server components → no "use client" at the top
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Favicon */}
        <link rel="icon" type="image/png" href="/favicon.ico" />
        {/* Optional: other meta tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Dandiya Carnival</title>
      </head>
      <body className="bg-image antialiased">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}

// ✅ Move your client-side logic into a separate provider component
function RootProvider({ children }) {
  const pathName = usePathname();
  const [rootContext, setRootContext] = useState({
    authenticated: false,
    loader: true,
    user: { name: "", email: "", mobile: "", password: "", token: "", isAdmin: "" },
    accessToken: '',
    toast: { show: false, dismiss: true, type: '', title: '', message: '' }
  });

  useEffect(() => {
    const user_details =
      typeof window !== "undefined" &&
      JSON.parse(localStorage.getItem("user_details"));

    const updatedContext = { ...rootContext, loader: false };

    if (user_details) {
      updatedContext.authenticated = true;
      updatedContext.user = user_details;
    } else {
      updatedContext.authenticated = false;
    }

    setRootContext(updatedContext);
  }, []);

  // Bypass layout for API routes (if ever rendered in browser)
  if (pathName?.startsWith("/api")) return children;

  return (
    <RootContext.Provider value={{ rootContext, setRootContext }}>
      {!rootContext.authenticated ? (
        <Login />
      ) : pathName === "/signup" && !rootContext.authenticated ? (
        <RegistrationForm />
      ) : (
        <div>
          <Navbar />
          <div className="w-full sm:w-[80%] m-auto flex flex-1 mt-16">
            <main className="flex-1 overflow-y-auto">{children}</main>
          </div>
        </div>
      )}
      {rootContext?.toast && <Toast />}
    </RootContext.Provider>
  );
}
