"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { Loader2, X, ChevronLeft, ChevronRight, ZoomIn, ChevronDown } from "lucide-react";

const CATEGORIES = ["All", "Newborn Babys", "Wedding", "Pre Weddings", "Models", "Maternity", "Birthdays", "Events", "Haldi", "Saree Functions", "Uncategorized"];

// Maps safe filenames like "NewbornBabys" back to display names like "Newborn Babys"
const CATEGORY_MAP = Object.fromEntries(
    CATEGORIES.filter(c => c !== "All").map(cat => [cat.replace(/[^a-zA-Z0-9-]/g, ''), cat])
);

function GalleryContent() {
    const searchParams = useSearchParams();
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState("All");
    const [lightboxIndex, setLightboxIndex] = useState(null); // null = closed
    const [visibleCount, setVisibleCount] = useState(20);

    // Initial load and URL param parsing
    useEffect(() => {
        fetchImages();

        const categoryParam = searchParams.get("category");
        if (categoryParam && CATEGORIES.includes(categoryParam)) {
            setActiveCategory(categoryParam);
        }
    }, [searchParams]);

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
                    const rawCategory = parts.length > 1 ? parts[0] : "Uncategorized";
                    // Reverse lookup: "NewbornBabys" → "Newborn Babys"
                    const category = CATEGORY_MAP[rawCategory] || rawCategory;

                    const fileTimestamp = file.created_at ? new Date(file.created_at).getTime() : Date.now();
                    return {
                        id: file.id || file.name,
                        name: file.name,
                        url: `${publicUrl}?v=${fileTimestamp}`,
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
    );

    const displayedImages = filteredImages.slice(0, visibleCount);

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
            <div className="max-w-[1400px] w-full lg:w-[95%] xl:w-[85%] mx-auto px-4 sm:px-6 lg:px-8">

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: { staggerChildren: 0.15, delayChildren: 0.1 }
                        }
                    }}
                    className="text-center mb-12"
                >
                    <motion.span
                        variants={{
                            hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
                            visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } }
                        }}
                        className="inline-block px-2 py-1 rounded-sm bg-transparent border border-black/30 text-brand-orange text-sm font-bold tracking-[0.2em] mb-3 uppercase"
                    >
                        Portfolio
                    </motion.span>
                    <motion.h3
                        variants={{
                            hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
                            visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } }
                        }}
                        className="text-3xl md:text-5xl font-instrument italic font-medium tracking-wide text-brand-dark"
                    >
                        Our Gallery
                    </motion.h3>
                </motion.div>

                {/* Category Filters */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: { staggerChildren: 0.05, delayChildren: 0.2 }
                        }
                    }}
                    className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12"
                >
                    {CATEGORIES.map((category) => (
                        <motion.button
                            variants={{
                                hidden: { opacity: 0, y: 20, filter: "blur(5px)" },
                                visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5, ease: "easeOut" } }
                            }}
                            key={category}
                            onClick={() => { setActiveCategory(category); setLightboxIndex(null); setVisibleCount(20); }}
                            className={`px-6 py-2 rounded-full text-sm font-medium font-space-grotesk transition-all duration-300 hover:scale-[1.05] active:scale-95 ${activeCategory === category
                                ? "bg-brand-orange text-white shadow-md shadow-brand-orange/30"
                                : "bg-gray-100 text-zinc-900 hover:bg-gray-200 hover:shadow-sm border border-black/5"
                                }`}
                        >
                            {category}
                        </motion.button>
                    ))}
                </motion.div>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <Loader2 className="w-10 h-10 animate-spin text-brand-orange" />
                    </div>
                ) : images.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-brand-dark/50 font-space-grotesk text-lg">No images in the gallery yet.</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1 md:gap-2 w-full">
                            <AnimatePresence>
                                {displayedImages.map((img, index) => (
                                    <motion.div
                                        layout
                                        key={img.id}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.4 }}
                                        onClick={() => openLightbox(index)}
                                        className="relative w-full aspect-[4/5] bg-gray-100 overflow-hidden group shadow-sm hover:shadow-xl transition-all cursor-pointer"
                                    >
                                        <Image
                                            src={img.url}
                                            alt={`Gallery Image ${img.name}`}
                                            fill
                                            unoptimized
                                            priority={index < 4}
                                            loading={index < 4 ? undefined : "lazy"}
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

                        {/* Load More Button */}
                        {visibleCount < filteredImages.length && (
                            <div className="mt-12 flex justify-center">
                                <button
                                    onClick={() => setVisibleCount(prev => prev + 20)}
                                    className="flex items-center gap-2 px-8 py-3.5 bg-brand-orange text-white rounded-full font-semibold font-space-grotesk hover:bg-amber-700 transition-colors shadow-lg shadow-brand-orange/30 group active:scale-95"
                                >
                                    Load More
                                    <ChevronDown className="group-hover:translate-y-1 transition-transform" />
                                </button>
                            </div>
                        )}
                    </>
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
                                                unoptimized
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

export default function Gallery() {
    return (
        <Suspense fallback={
            <div className="flex justify-center items-center py-20 min-h-screen">
                <Loader2 className="w-10 h-10 animate-spin text-brand-orange" />
            </div>
        }>
            <GalleryContent />
        </Suspense>
    );
}
