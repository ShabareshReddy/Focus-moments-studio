"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Camera, Menu, X, ArrowUpRight, ArrowRight } from "lucide-react";
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
        { name: "Services", href: "#services" },
        { name: "Portfolio", href: "#portfolio" },
        { name: "Reviews", href: "#reviews" },
        { name: "About", href: "#about" },
    ];

    const isSolid = isScrolled && !isMobileMenuOpen;

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${isMobileMenuOpen
                ? "bg-black py-1"
                : isSolid
                    ? "bg-white/80 backdrop-blur-xs shadow-sm py-1"
                    : "bg-gradient-to-b from-black/50 to-transparent backdrop-blur-xs py-1"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-3">
                <div className="flex  justify-between items-center">
                    {/* Logo: SVG icon + stacked text side by side */}
                    <Link href="/" className="flex items-center gap-[6px]">

                        <BrandLogo className="w-[55px] h-[54px] mt-1 -mr-4" />

                        <div className="flex flex-col leading-none">
                            <span
                                className={`font-space-grotesk mt-1.5 leading-tighter font-extrabold text-[17px] transition-colors duration-300 ${isSolid ? "text-brand-dark" : "text-white"
                                    }`}
                            >
                                FOCUS MOMENTS
                            </span>

                            <span className="text-[12.5px] tracking-[0.18em] text-brand-orange font-extrabold font-space-grotesk transition-colors duration-300">
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
                                    className={`text-md font-space-grotesk font-medium transition-colors
                                         hover:text-brand-orange active:opacity-60 ${isSolid ? "text-brand-dark font-medium" : "text-white"
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                        <a
                            href="tel:+918328191729"
                            className="bg-brand-orange/90 text-white px-3.5 py-1.5 rounded-sm text-sm font-space-grotesk font-medium hover:bg-amber-700  active:scale-95  transition-all duration-150 "
                        >
                            Contact Us
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className={`p-2 rounded-full active:scale-90 active:opacity-70 transition-all duration-150 ${isSolid ? "text-brand-dark" : "text-white"}`}
                        >
                            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Nav */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full w-full font-space-grotesk bg-black/95 border-t border-white/10 shadow-2xl py-6 flex flex-col items-start px-8 gap-1">
                    {navLinks.map((link) => (
                        <div key={link.name} className="w-full">
                            <Link
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className=" flex  items-center block w-full text-left font-space-grotesk py-3 text-xl font-medium text-white/90 hover:text-brand-orange active:text-brand-orange active:scale-95 transition-all duration-150 tracking-wide"
                            >
                                {link.name}
                            </Link>
                        </div>
                    ))}
                    <div className="mt-6 w-full">
                        <a
                            href="tel:+918328191729"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="inline-block text-left  bg-brand-orange text-white px-6 py-3 text-xl font-space-grotesk hover:bg-white hover:text-brand-orange active:scale-95 active:opacity-80 transition-all duration-150"
                        >
                            📞 Call Now: +91 8328191729
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
}
