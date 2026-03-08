"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { Loader2 } from "lucide-react";

const CATEGORIES = ["All", "Wedding", "Pre-Wedding", "Maternity", "Birthdays", "Engagement", "Reception", "Haldi", "Events", "Uncategorized"];

export default function Gallery() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState("All");

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
                            onClick={() => setActiveCategory(category)}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === category
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
                    <>
                        {/* Standard CSS Grid Layout */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3">
                            <AnimatePresence>
                                {images
                                    .filter(img => activeCategory === "All" || img.category === activeCategory)
                                    .slice(0, 8)
                                    .map((img) => (
                                        <motion.div
                                            layout
                                            key={img.id}
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ duration: 0.4 }}
                                            className="relative w-full aspect-square bg-gray-100 overflow-hidden group shadow-sm hover:shadow-xl transition-all"
                                        >
                                            <Image
                                                src={img.url}
                                                alt={`Gallery Image ${img.name}`}
                                                fill
                                                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                            {/* Hover Overlay */}
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                                        </motion.div>
                                    ))}
                            </AnimatePresence>
                        </div>
                    </>
                )}
            </div>
        </section >
    );
}
