"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Camera, Menu, X } from "lucide-react";
import BrandLogo from "./BrandLogo";

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
        { name: "Portfolio", href: "#portfolio" },
        { name: "Reviews", href: "#reviews" },
        { name: "About", href: "#about" },
    ];

    const isSolid = isScrolled || isMobileMenuOpen;

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${isSolid
                ? "bg-white/95 backdrop-blur-md shadow-sm py-1.5"
                : "bg-gradient-to-b from-black/50 to-transparent backdrop-blur-xs py-2"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    {/* Logo: SVG icon + stacked text side by side */}
                    <Link href="/" className="flex items-center gap-1 group">

                        <div className="flex items-center justify-center w-[60px] h-[44px]">
                            <BrandLogo
                                className="w-full h-full scale-[1.6] origin-center transition-transform duration-200 group-hover:scale-[1.7]"
                                variant={isSolid ? "colored" : "white"}
                            />
                        </div>

                        <div className="flex flex-col justify-center leading-tight">
                            <span
                                className={`font-heading font-bold text-[18px] tracking-tight ${isSolid ? "text-brand-dark" : "text-white"
                                    }`}
                            >
                                FOCUS MOMENTS
                            </span>

                            <span className="text-[12px] font-bold tracking-[0.17em] text-brand-orange">
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
                                    className={`text-md font-outfit font-medium transition-colors hover:text-brand-orange ${isSolid ? "text-brand-dark" : "text-white/90"
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
                            className={isSolid ? "text-brand-dark" : "text-white"}
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
