"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Camera, Menu, X } from "lucide-react";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Services", href: "#services" },
        { name: "Reviews", href: "#socialproof" },
        { name: "About", href: "#about" },
    ];

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled
                ? "bg-white/90 backdrop-blur-md shadow-sm py-3"
                : "bg-transparent py-5"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="bg-brand-orange p-2 rounded-lg text-white group-hover:bg-brand-dark transition-colors">
                            <Camera size={24} />
                        </div>
                        <div className="flex flex-col">
                            <span className={`font-heading font-black text-xl tracking-tight leading-none ${isScrolled ? "text-brand-dark" : "text-brand-dark lg:text-white"}`}>
                                FOCUS MOMENTS
                            </span>
                            <span className={`text-[10px] font-bold tracking-[0.2em] leading-none ${isScrolled ? "text-brand-orange" : "text-brand-orange lg:text-white/80"}`}>
                                STUDIO
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        <div className="flex gap-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`text-sm font-medium transition-colors hover:text-brand-orange ${isScrolled ? "text-brand-dark/80" : "text-brand-dark lg:text-white/90"
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                        <a
                            href="tel:+918328191729"
                            className="bg-brand-orange text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-brand-dark transition-colors shadow-lg shadow-brand-orange/20"
                        >
                            Book Session
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className={isScrolled ? "text-brand-dark" : "text-brand-dark"}
                        >
                            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Nav */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-xl py-4 flex flex-col items-center gap-4">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-brand-dark font-medium w-full text-center py-2"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <a
                        href="tel:+918328191729"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="mt-2 bg-brand-orange text-white px-8 py-3 rounded-full font-semibold"
                    >
                        Call Now: +91 8328191729
                    </a>
                </div>
            )}
        </nav>
    );
}
