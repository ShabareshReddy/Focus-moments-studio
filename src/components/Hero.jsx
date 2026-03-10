"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";



// images come pre-fetched from the server via page.js (SSR)
// No client-side Supabase call needed — images are ready on first render
export default function Hero({ images = [] }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Track the very first render so we can skip the opacity-0 fade-in
    // for the initial image. Subsequent slideshow transitions still fade.
    const [isFirstRender, setIsFirstRender] = useState(true);
    useEffect(() => {
        setIsFirstRender(false);
    }, []);

    // Auto-cycle slideshow every 6 seconds
    useEffect(() => {
        if (images.length === 0) return;
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 6000);
        return () => clearInterval(timer);
    }, [images]);

    return (
        <section className="relative h-screen min-h-[600px] flex items-end sm:items-center justify-center overflow-hidden bg-brand-dark">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <AnimatePresence mode="popLayout">
                    {images.length > 0 && (
                        <motion.div
                            key={currentIndex}
                            // First image on first render: show immediately (no fade-in)
                            // All subsequent transitions: fade in normally
                            initial={
                                isFirstRender && currentIndex === 0
                                    ? { opacity: 1, scale: 1.08 }  // skip fade but keep zoom
                                    : { opacity: 0, scale: 1.15 }
                            }
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{
                                opacity: { duration: 0.8, ease: "easeInOut" },
                                scale: { duration: 7, ease: "linear" },
                            }}
                            className="absolute inset-0"
                        >
                            <Image
                                src={images[currentIndex]}
                                alt="Focus Moments Studio photography background"
                                fill
                                priority={currentIndex === 0}
                                className="object-cover object-center"
                                sizes="100vw"
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
                {/* Dark overlay */}
                {/* Left-side gradient so text stays readable, image peeks on right */}
                <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/85 via-brand-dark/50 to-brand-dark/10 z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/70 via-transparent to-transparent z-10" />
            </div>

            {/* Hero Content */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-start text-left pb-20 sm:pb-0 sm:mt-20">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.2, // Stagger each child by 0.2s
                                delayChildren: 0.3    // Initial delay before staggering starts
                            }
                        }
                    }}
                    className="max-w-2xl"
                >
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
                            visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } }
                        }}
                    >
                        <span className="inline-block py-1 px-3 rounded-2xl bg-white/20 backdrop-blur-sm text-white border border-white/10 text-xs sm:text-sm font-outfit tracking-wider mb-4 uppercase">
                            Tirupati&apos;s Premier Photo Studio
                        </span>
                    </motion.div>

                    <motion.h1
                        variants={{
                            hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
                            visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } }
                        }}
                        className="text-4xl sm:text-7xl md:text-7xl font-gloock text-white mb-5 leading-tighter drop-shadow-lg"
                    >
                        Capturing Life&apos;s <br className="hidden sm:block" />
                        <span className="text-brand-orange font-medium">Most Precious</span> Moments ~
                    </motion.h1>

                    <motion.p
                        variants={{
                            hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
                            visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } }
                        }}
                        className="text-base sm:text-lg md:text-xl text-white/80 mb-8 font-outfit font-normal max-w-lg leading-relaxed"
                    >
                        We capture the essence of your moments, preserving them for generations to come.
                    </motion.p>

                    <motion.div
                        variants={{
                            hidden: { opacity: 0, y: 30, filter: "blur(5px)" },
                            visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } }
                        }}
                        className="flex sm:flex-row items-stretch sm:items-center justify-start gap-4 w-full sm:w-auto"
                    >
                        <Link
                            href="#portfolio"
                            className="w-full sm:w-auto text-center px-8 py-3.5 bg-brand-orange text-white rounded-full 
                            font-outfit font-semibold text-base tracking-wide flex items-center justify-center
                            hover:bg-amber-700 hover:scale-[1.03] 
                            active:scale-95 transition-all duration-200  gap-2"
                        >
                            View Our Work
                        </Link>

                        <Link
                            href="tel:+918328191729"
                            className="w-full sm:w-auto text-center px-8 py-3.5 flex items-center justify-center
                            bg-white/10 backdrop-blur-md text-white border border-white/30 rounded-full 
                            font-outfit font-semibold text-base tracking-wide 
                            hover:bg-white hover:text-brand-dark hover:scale-[1.03]
                            active:scale-95 transition-all duration-200 gap-2"
                        >
                            Book a Session
                        </Link>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll indicator — hidden on mobile to avoid overlap with bottom content */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="hidden sm:flex absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-2 z-10"
            >
                <span className="text-white/70 text-xs font-medium uppercase tracking-widest">
                    Scroll to Explore
                </span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    className="w-0.5 h-12 bg-gradient-to-b from-brand-orange/80 to-transparent rounded-full"
                />
            </motion.div>
        </section>
    );
}
