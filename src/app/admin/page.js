"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export default function AdminLogin() {
    const [email, setEmail]= useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = (e) => {
        e.preventDefault();
        
        // Using environment variable for email and password gate
        if (email === process.env.NEXT_PUBLIC_ADMIN_EMAIL && password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
            // Set cookie for middleware check (expires in 1 day)
            document.cookie = `admin_auth=true; path=/; max-age=86400`;
            router.push("/admin/dashboard");
        } else {
            setError("Incorrect email or password");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg border border-gray-100">
                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-brand-orange/10 rounded-full flex items-center justify-center mb-4">
                        <Lock className="text-brand-orange" size={32} />
                    </div>
                    <h2 className="text-center text-3xl font-space-grotesk font-extrabold text-brand-dark">
                        Studio Admin
                    </h2>
                    <p className="mt-2 text-center text-sm font-space-grotesk text-gray-500">
                        Enter your studio master password to access.
                    </p>
                </div>
                
                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    <div className="space-y-4">
                        <input
                            type="email"
                            required
                            className="appearance-none font-space-grotesk rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-brand-orange focus:border-brand-orange sm:text-sm"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            required
                            className="appearance-none font-space-grotesk rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-brand-orange focus:border-brand-orange sm:text-sm"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm text-center font-medium">{error}</p>}
                    <button
                        type="submit"
                        className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold font-space-grotesk rounded-lg text-white bg-brand-orange hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-orange transition-all duration-300 shadow-md"
                    >
                        Access Dashboard
                    </button>
                </form>
            </div>
        </div>
    );
}
