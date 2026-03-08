"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { Loader2 } from "lucide-react";

const CATEGORIES = ["All", "Wedding", "Pre-Wedding", "Maternity", "Birthdays", "Engagement", "Reception", "Haldi", "Events", "Uncategorized"];

export default function GalleryPage() {
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState("All");

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase.storage
                .from('gallery-images')
                .list('uploads', { 
                    limit: 100, 
                    offset: 0, 
                    sortBy: { column: 'created_at', order: 'desc' },
                }); 
            
            if (error) {
                console.error("Error fetching images:", error);
                return;
            }

            // Filter out empty folder placeholders and map to get public URLs
            const imageObjects = data
                ? data.filter(file => file.name !== '.emptyFolderPlaceholder' && file.name !== 'uploads').map(file => {
                    const filePath = `uploads/${file.name}`;
                    const { data: { publicUrl } } = supabase.storage
                        .from('gallery-images')
                        .getPublicUrl(filePath);
                    
                    const parts = file.name.split('_');
                    const category = parts.length > 1 ? parts[0] : "Uncategorized";

                    return {
                        name: file.name,
                        url: publicUrl,
                        category: category,
                        id: file.id || file.name
                    };
                }) : [];
            
            setImages(imageObjects);
        } catch (err) {
            console.error("Failed to fetch gallery:", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-brand-dark px-4 py-20 pb-32">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
                        Our <span className="text-brand-orange">Gallery</span>
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Explore some of our favorite moments captured in the studio. 
                    </p>
                </div>

                {/* Category Filters */}
                <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
                    {CATEGORIES.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                                activeCategory === category
                                    ? "bg-brand-orange text-white shadow-lg shadow-brand-orange/20"
                                    : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center py-20">
                        <Loader2 className="animate-spin text-brand-orange h-10 w-10" />
                    </div>
                ) : images.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
                        {images
                            .filter(img => activeCategory === "All" || img.category === activeCategory)
                            .map((img) => (
                            <div key={img.id} className="relative w-full aspect-square group overflow-hidden rounded-xl shadow-lg bg-white/5 border border-white/10 hover:border-brand-orange/50 transition-colors duration-300">
                                <Image
                                    src={img.url}
                                    alt={img.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                />
                                {/* Optional dark overlay gradient for a premium look */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10">
                        <p className="text-gray-400">No images have been added to the gallery yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
