"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";

export default function GlobalLayoutWrapper({ children }) {
    const pathname = usePathname();
    const [isLoading, setIsLoading] = useState(true);

    // Only show loading on initial page hit/refresh
    useEffect(() => {
        // Simple timeout to hide the loading screen
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000); // reduced to 1.5s for simplicity

        return () => clearTimeout(timer);
    }, []);

    // Check if we are on any admin route
    const isAdminRoute = pathname?.startsWith("/admin");

    return (
        <>
            {isLoading && <LoadingScreen />}

            {!isAdminRoute && <Navbar />}
            <main className="flex-grow">
                {children}
            </main>
            {!isAdminRoute && <Footer />}
        </>
    );
}
