"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { Loader2, X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

const CATEGORIES = ["All", "Wedding", "Pre-Wedding", "Maternity", "Birthdays", "Engagement", "Reception", "Haldi", "Events", "Uncategorized"];

export default function Gallery() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState("All");
    const [lightboxIndex, setLightboxIndex] = useState(null); // null = closed

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const { data, error } = await supabase
                .storage
                .from('gallery-images')
                .list('uploads', {
                    limit: 100,
                    offset: 0,
                    sortBy: { column: 'created_at', order: 'desc' },
                });

            if (error) throw error;

            if (data) {
                const validImages = data.filter(file => file.name !== '.emptyFolderPlaceholder' && file.name !== 'uploads');
                const imagesWithUrls = validImages.map(file => {
                    const { data: { publicUrl } } = supabase
                        .storage
                        .from('gallery-images')
                        .getPublicUrl(`uploads/${file.name}`);

                    const parts = file.name.split('_');
                    const category = parts.length > 1 ? parts[0] : "Uncategorized";

                    return {
                        id: file.id || file.name,
                        name: file.name,
                        url: publicUrl,
                        category: category,
                    };
                });
                setImages(imagesWithUrls);
            }
        } catch (error) {
            console.error('Error fetching images:', error);
        } finally {
            setLoading(false);
        }
    };

    // The filtered list used for both grid AND lightbox navigation
    const filteredImages = images.filter(
        img => activeCategory === "All" || img.category === activeCategory
    ).slice(0, 8);

    const openLightbox = (index) => setLightboxIndex(index);
    const closeLightbox = () => setLightboxIndex(null);

    const goPrev = useCallback(() => {
        setLightboxIndex(prev => (prev - 1 + filteredImages.length) % filteredImages.length);
    }, [filteredImages.length]);

    const goNext = useCallback(() => {
        setLightboxIndex(prev => (prev + 1) % filteredImages.length);
    }, [filteredImages.length]);

    // Keyboard navigation
    useEffect(() => {
        if (lightboxIndex === null) return;
        const onKey = (e) => {
            if (e.key === "Escape") closeLightbox();
            if (e.key === "ArrowLeft") goPrev();
            if (e.key === "ArrowRight") goNext();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [lightboxIndex, goPrev, goNext]);

    // Prevent body scroll when lightbox is open
    useEffect(() => {
        if (lightboxIndex !== null) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [lightboxIndex]);

    return (
        <section id="portfolio" className="py-20 bg-white min-h-screen">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-12">
                    <h2 className="text-sm font-bold tracking-widest text-brand-orange uppercase mb-3">Portfolio</h2>
                    <h3 className="text-4xl md:text-5xl font-heading font-extrabold text-brand-dark">Our Gallery</h3>
                </div>

                {/* Category Filters */}
                <div className="flex flex-wrap justify-center gap-1 md:gap-2 mb-12">
                    {CATEGORIES.map((category) => (
                        <button
                            key={category}
                            onClick={() => { setActiveCategory(category); setLightboxIndex(null); }}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 active:scale-95 ${activeCategory === category
                                ? "bg-brand-orange text-white shadow-lg shadow-brand-orange/20"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <Loader2 className="w-10 h-10 animate-spin text-brand-orange" />
                    </div>
                ) : images.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-brand-dark/50 text-lg">No images in the gallery yet.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3">
                        <AnimatePresence>
                            {filteredImages.map((img, index) => (
                                <motion.div
                                    layout
                                    key={img.id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.4 }}
                                    onClick={() => openLightbox(index)}
                                    className="relative w-full aspect-square bg-gray-100 overflow-hidden group shadow-sm hover:shadow-xl transition-all cursor-pointer"
                                >
                                    <Image
                                        src={img.url}
                                        alt={`Gallery Image ${img.name}`}
                                        fill
                                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 25vw"
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    {/* Hover overlay with zoom icon */}
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                                        <ZoomIn
                                            className="text-white opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100"
                                            size={36}
                                            strokeWidth={1.5}
                                        />
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>

            {/* ── LIGHTBOX ── */}
            <AnimatePresence>
                {lightboxIndex !== null && filteredImages[lightboxIndex] && (
                    <motion.div
                        key="lightbox"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm"
                        onClick={closeLightbox} // click backdrop to close
                    >
                        {/* Stop click propagation on the image wrapper */}
                        <motion.div
                            key={lightboxIndex}
                            initial={{ opacity: 0, scale: 0.92 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.92 }}
                            transition={{ duration: 0.25 }}
                            className="relative w-full h-full max-w-5xl max-h-[90vh] mx-4 my-8 flex items-center justify-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={filteredImages[lightboxIndex].url}
                                alt={`Lightbox ${filteredImages[lightboxIndex].name}`}
                                fill
                                className="object-contain"
                                sizes="100vw"
                                priority
                            />
                        </motion.div>

                        {/* Close Button */}
                        <button
                            onClick={closeLightbox}
                            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 active:scale-90 backdrop-blur-md flex items-center justify-center text-white transition-all duration-150"
                            aria-label="Close"
                        >
                            <X size={20} />
                        </button>

                        {/* Prev Button */}
                        {filteredImages.length > 1 && (
                            <button
                                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                                className="absolute left-3 sm:left-6 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 active:scale-90 backdrop-blur-md flex items-center justify-center text-white transition-all duration-150"
                                aria-label="Previous"
                            >
                                <ChevronLeft size={24} />
                            </button>
                        )}

                        {/* Next Button */}
                        {filteredImages.length > 1 && (
                            <button
                                onClick={(e) => { e.stopPropagation(); goNext(); }}
                                className="absolute right-3 sm:right-6 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 active:scale-90 backdrop-blur-md flex items-center justify-center text-white transition-all duration-150"
                                aria-label="Next"
                            >
                                <ChevronRight size={24} />
                            </button>
                        )}

                        {/* Image counter */}
                        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white text-sm font-medium">
                            {lightboxIndex + 1} / {filteredImages.length}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
