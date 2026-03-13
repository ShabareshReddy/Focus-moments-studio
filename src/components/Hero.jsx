"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";



export default function Hero() {
    const [images, setImages] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Track the very first render so we can skip the opacity-0 fade-in
    // for the initial image. Subsequent slideshow transitions still fade.
    const [isFirstRender, setIsFirstRender] = useState(true);

    useEffect(() => {
        setIsFirstRender(false);
    }, []);

    // Fetch hero images client-side to ensure bypass of Next.js static cache
    useEffect(() => {
        async function fetchHeroImages() {
            try {
                const { data, error } = await supabase.storage.from("gallery-images").list("hero", {
                    limit: 10,
                    offset: 0,
                    sortBy: { column: 'created_at', order: 'desc' },
                });

                if (error || !data) return;

                const validFiles = data.filter(
                    (file) => file.name !== ".emptyFolderPlaceholder" && file.name !== "hero"
                );

                const imageUrls = validFiles.map((file) => {
                    const { data: { publicUrl } } = supabase.storage
                        .from("gallery-images")
                        .getPublicUrl(`hero/${file.name}`);
                    // Cache bust based on creation time so deleted images don't linger
                    return `${publicUrl}?t=${new Date(file.created_at || Date.now()).getTime()}`;
                });

                setImages(imageUrls);
            } catch (err) {
                console.error("Failed to load hero images:", err);
            }
        }

        fetchHeroImages();
    }, []);

    useEffect(() => {
        if (images.length === 0) return;

        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 6000); // change every 6 seconds

        return () => clearInterval(timer);
    }, [images]); return (
        <section className="relative h-screen min-h-[600px] flex items-end justify-center overflow-hidden bg-brand-dark">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                {images.map((imgSrc, index) => {
                    const isCurrent = index === currentIndex;
                    const isPrev = index === (currentIndex - 1 + images.length) % images.length;

                    return (
                        <motion.div
                            key={imgSrc}
                            initial={false}
                            animate={{
                                opacity: isCurrent ? 1 : 0,
                                zIndex: isCurrent ? 10 : (isPrev ? 5 : 0),
                                scale: isCurrent ? 1 : 1.08
                            }}
                            transition={{
                                opacity: {
                                    duration: 2.5,
                                    ease: "easeInOut",
                                    delay: isCurrent ? 0 : 2.5 // Hold previous image visible during crossfade
                                },
                                zIndex: { duration: 0 },
                                scale: { duration: 15, ease: "linear" }
                            }}
                            className="absolute inset-0"
                        >
                            <Image
                                src={imgSrc}
                                alt={`Focus Moments Studio Background ${index + 1}`}
                                fill
                                priority={index === 0}
                                className="object-cover object-center"
                                sizes="100vw"
                            />
                        </motion.div>
                    );
                })}
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/70 via-transparent to-transparent z-10" />
            </div>

            {/* Hero Content */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-start text-left  pb-24 sm:pb-32 sm:mt-20">
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
                        <span className="inline-block py-1 px-3 text-white border border-white/10 text-xs sm:text-sm font-space-grotesk tracking-[0.3em] leading-relaxed mb-2 uppercase">
                            FOCUS MOMENTS STUDIO
                        </span>
                    </motion.div>

                    <motion.h1
                        variants={{
                            hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
                            visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } }
                        }}
                        className="text-4xl sm:text-7xl md:text-7xl font-instrument italic text-white mb-5 leading-tighter tracking-tight drop-shadow-lg"
                    >
                        Capturing Life&apos;s <br className="hidden sm:block" />
                        <span className="text-brand-orange font-medium">Most Precious</span> Moments ~
                    </motion.h1>

                    <motion.p
                        variants={{
                            hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
                            visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } }
                        }}
                        className="text-base sm:text-lg md:text-xl text-white/80 mb-8 font-space-grotesk font-normal max-w-lg leading-relaxed"
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
                            className="w-full sm:w-auto text-center px-4 py-2 bg-brand-orange text-white rounded-sm 
                            font-space-grotesk font-semibold text-base tracking-wide flex items-center justify-center
                            hover:bg-amber-700 hover:scale-[1.03] 
                            active:scale-95 transition-all duration-200 gap-2"
                        >
                            View Our Work
                        </Link>

                        <Link
                            href="tel:+918328191729"
                            className="w-full sm:w-auto text-center px-4 py-2 flex items-center justify-center
                            bg-white/10 backdrop-blur-md text-white border border-white/30 rounded-sm 
                            font-space-grotesk font-semibold text-base tracking-wide 
                            hover:bg-white/20 hover:text-white hover:scale-[1.03]
                            active:scale-95 transition-all duration-100 gap-2"
                        >
                            Get in Touch
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
