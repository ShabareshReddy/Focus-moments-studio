"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function GlobalLayoutWrapper({ children }) {
    const pathname = usePathname();

    // Check if we are on any admin route
    const isAdminRoute = pathname?.startsWith("/admin");

    return (
        <>
            {!isAdminRoute && <Navbar />}
            <main className="flex-grow">
                {children}
            </main>
            {!isAdminRoute && <Footer />}
        </>
    );
}
