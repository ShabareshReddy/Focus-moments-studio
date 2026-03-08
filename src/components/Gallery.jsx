"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Filter, ImageIcon } from "lucide-react";

// Placeholder images - Replace the URLs with your Supabase storage public URLs once uploaded.
const galleryData = [
    { id: 1, category: "Wedding Photography", src: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop", height: "h-[450px]" },
    { id: 2, category: "Pre-Wedding Shots", src: "https://images.unsplash.com/photo-1543884841-db4cc21b5be7?q=80&w=800&auto=format&fit=crop", height: "h-[300px]", textOverlay: { label: "ENGAGEMENT", title: "Arjun & Sneha" } },
    { id: 3, category: "Maternity", src: "https://images.unsplash.com/photo-1554047688-6625fb4791da?q=80&w=800&auto=format&fit=crop", height: "h-[500px]" },
    { id: 4, category: "Reception", src: "https://images.unsplash.com/photo-1530103862676-de8892bc952f?q=80&w=800&auto=format&fit=crop", height: "h-[400px]", textOverlay: { label: "RECEPTION", title: "Nikith & Ramaya", count: "4 Photos" } },
    { id: 5, category: "Engagement", src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop", height: "h-[350px]" },
    { id: 6, category: "Birthdays", src: "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?q=80&w=800&auto=format&fit=crop", height: "h-[400px]" },
    { id: 7, category: "Haldi", src: "https://images.unsplash.com/photo-1583939006951-4091cdbae887?q=80&w=800&auto=format&fit=crop", height: "h-[250px]" },
    { id: 8, category: "Wedding Photography", src: "https://images.unsplash.com/photo-1627506972051-76882aed68ab?q=80&w=800&auto=format&fit=crop", height: "h-[450px]" },
];

const categories = ["All", "Wedding Photography", "Pre-Wedding Shots", "Maternity", "Birthdays", "Engagement", "Reception", "Haldi"];

export default function Gallery() {
    const [filter, setFilter] = useState("All");
    const [mediaType, setMediaType] = useState("Gallery");

    const filteredImages = galleryData.filter(
        (img) => filter === "All" || img.category === filter
    );

    return (
        <section id="portfolio" className="py-20 bg-white min-h-screen">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header & Type Toggle */}
                <div className="flex justify-center mb-10">
                    <div className="flex bg-gray-100 rounded-lg p-1">
                        <button
                            onClick={() => setMediaType("Gallery")}
                            className={`px-8 py-2.5 rounded-md text-sm font-medium transition-all duration-300 ${mediaType === "Gallery" ? "bg-brand-orange text-white shadow-md" : "text-gray-600 hover:text-gray-900"
                                }`}
                        >
                            Gallery
                        </button>
                        <button
                            onClick={() => setMediaType("Videos")}
                            className={`px-8 py-2.5 rounded-md text-sm font-medium transition-all duration-300 ${mediaType === "Videos" ? "bg-brand-orange text-white shadow-md" : "text-gray-600 hover:text-gray-900"
                                }`}
                        >
                            Videos
                        </button>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row items-center gap-4 mb-10 pb-6 overflow-x-auto hide-scrollbar">
                    <button className="flex items-center gap-2 px-6 py-2 border border-gray-200 rounded-full text-brand-dark whitespace-nowrap hover:bg-gray-50 transition-colors bg-white shrink-0">
                        <Filter size={16} />
                        <span className="font-semibold text-sm">Filter</span>
                    </button>

                    <div className="flex gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-5 py-2 text-xs sm:text-sm font-medium rounded-full whitespace-nowrap transition-colors border ${filter === cat
                                    ? "bg-amber-500 text-white border-amber-500 shadow-sm"
                                    : "bg-[#fcfaf2] text-brand-dark/80 border-transparent hover:bg-[#f5f1de]"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Masonry Image Layout */}
                <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                    <AnimatePresence>
                        {filteredImages.map((img) => (
                            <motion.div
                                layout
                                key={img.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.4 }}
                                className={`relative w-full ${img.height} bg-gray-100 overflow-hidden group mb-4 block`}
                            >
                                <Image
                                    src={img.src}
                                    alt={`Focus Moments Studio ${img.category} photography`}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />

                                {img.textOverlay && (
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                                        <p className="text-amber-500 text-xs font-bold tracking-widest uppercase mb-1">
                                            {img.textOverlay.label}
                                        </p>
                                        <h4 className="text-white font-heading font-bold text-xl drop-shadow-md">
                                            {img.textOverlay.title}
                                        </h4>
                                        {img.textOverlay.count && (
                                            <p className="text-white/80 text-xs mt-2 flex items-center gap-1.5 font-medium">
                                                <ImageIcon size={14} />
                                                {img.textOverlay.count}
                                            </p>
                                        )}
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
