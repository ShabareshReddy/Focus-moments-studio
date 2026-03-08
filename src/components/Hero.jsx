"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function Hero() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHeroImages = async () => {
            try {
                const { data, error } = await supabase.storage
                    .from('gallery-images')
                    .list('hero', {
                        limit: 20,
                        offset: 0,
                        sortBy: { column: 'created_at', order: 'desc' },
                    });

                if (error) throw error;

                if (data && data.length > 0) {
                    const validFiles = data.filter(
                        file => file.name !== '.emptyFolderPlaceholder' && file.name !== 'hero'
                    );
                    const urls = validFiles.map(file => {
                        const { data: { publicUrl } } = supabase
                            .storage
                            .from('gallery-images')
                            .getPublicUrl(`hero/${file.name}`);
                        return publicUrl;
                    });
                    setImages(urls);
                }
            } catch (error) {
                console.error('Error fetching hero images:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchHeroImages();
    }, []);

    useEffect(() => {
        if (images.length === 0) return;
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 6000); // Change image every 6 seconds
        return () => clearInterval(timer);
    }, [images]);

    return (
        <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-brand-dark">
            {/* Background Image Setup */}
            <div className="absolute inset-0 z-0">
                <AnimatePresence mode="popLayout">
                    {images.length > 0 && (
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, scale: 1.15 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{
                                opacity: { duration: 1.5, ease: "easeInOut" },
                                scale: { duration: 10, ease: "linear" }
                            }}
                            className="absolute inset-0"
                        >
                            <Image
                                src={images[currentIndex]}
                                alt="Focus Moments Studio baby photography background"
                                fill
                                priority={currentIndex === 0}
                                className="object-cover object-center"
                                sizes="100vw"
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
                {/* Dark overlay for contrast */}
                <div className="absolute inset-0 bg-brand-dark/40 sm:bg-brand-dark/30 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent z-10"></div>
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center mt-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-3xl"
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30 text-xs sm:text-sm font-semibold tracking-wider mb-6 uppercase">
                        Tirupati's Premier Photo Studio
                    </span>
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-heading font-bold text-white mb-6 leading-tight drop-shadow-lg">
                        Capturing Life's <br className="hidden sm:block" />
                        <span className="text-brand-orange">Most Precious</span> Moments
                    </h1>


                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="#services"
                            className="w-full sm:w-auto px-8 py-4 bg-brand-orange text-white rounded-full font-semibold text-lg hover:bg-white hover:text-brand-orange transition-all duration-300 shadow-lg"
                        >
                            View Our Work
                        </Link>
                        <Link
                            href="tel:+918328191729"
                            className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-md text-white border-2 border-white/50 rounded-full font-semibold text-lg hover:bg-white hover:text-brand-dark transition-all duration-300"
                        >
                            Book a Session
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
            >
                <span className="text-white/70 text-xs font-medium uppercase tracking-widest">Scroll to Explore</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    className="w-0.5 h-12 bg-gradient-to-b from-brand-orange/80 to-transparent rounded-full"
                />
            </motion.div>
        </section>
    );
}
