"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function Services() {
    const router = useRouter();

    const handleCardClick = (category) => {
        // Update the URL so Gallery reads the new category param
        router.push(`/?category=${encodeURIComponent(category)}`, { scroll: false });

        // Smooth-scroll to the portfolio/gallery section
        setTimeout(() => {
            const el = document.getElementById("portfolio");
            if (el) {
                el.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }, 50);
    };

    const baseCategories = [
        {
            title: "Newborn Babys",
            category: "Newborn Babys",
            image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=800&auto=format&fit=crop",
        },
        {
            title: "Weddings",
            category: "Wedding",
            image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop",
        },
        {
            title: "Pre Weddings",
            category: "Pre Weddings",
            image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop",
        },
        {
            title: "Models",
            category: "Models",
            image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
        },
        {
            title: "Birthdays",
            category: "Birthdays",
            image: "https://images.unsplash.com/photo-1530103862676-de88d12226dd?q=80&w=800&auto=format&fit=crop",
        },
        {
            title: "Maternity",
            category: "Maternity",
            image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=800&auto=format&fit=crop",
        },
        {
            title: "Haldi",
            category: "Haldi",
            image: "https://images.unsplash.com/photo-1601662528567-526cd06f6582?q=80&w=800&auto=format&fit=crop",
        },
        {
            title: "Saree Functions",
            category: "Saree Functions",
            image: "https://images.unsplash.com/photo-1583391733956-6c78276477e1?q=80&w=800&auto=format&fit=crop",
        },
    ];

    const [serviceCategories, setServiceCategories] = useState(baseCategories);

    // Fetch matching category images from Supabase storage
    useEffect(() => {
        async function fetchServiceImages() {
            try {
                const { data, error } = await supabase.storage.from("gallery-images").list("services", {
                    limit: 100,
                    offset: 0,
                    sortBy: { column: 'created_at', order: 'desc' },
                });

                if (error || !data) return;

                const updatedCategories = baseCategories.map(cat => {
                    // Strip spaces so "Newborn Babys" → "newbornbabys" to match filename prefix
                    const safeCategory = cat.category.replace(/[^a-zA-Z0-9-]/g, '').toLowerCase();
                    const matchingFile = data.find(f => f.name.toLowerCase().startsWith(safeCategory));

                    if (matchingFile) {
                        const { data: { publicUrl } } = supabase.storage
                            .from("gallery-images")
                            .getPublicUrl(`services/${matchingFile.name}`);
                        // Use a STABLE cache-buster based on file creation time.
                        const fileTimestamp = matchingFile.created_at ? new Date(matchingFile.created_at).getTime() : Date.now();
                        return { ...cat, image: `${publicUrl}?v=${fileTimestamp}` };
                    }
                    return cat;
                });

                setServiceCategories(updatedCategories);
            } catch (err) {
                console.error("Failed to load services images:", err);
            }
        }

        fetchServiceImages();
    }, []);

    return (
        <section id="services" className="py-24 bg-[#f8f9fa] overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
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
                    className="flex flex-col items-center justify-center text-center mb-12"
                >
                    <motion.h2
                        variants={{ hidden: { opacity: 0, y: 40, filter: "blur(10px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } } }}
                        className="text-sm font-space-grotesk rounded-md px-2 py-1 border border-black/20 font-bold tracking-widest text-brand-orange uppercase mb-3"
                    >
                        Our Expertise
                    </motion.h2>
                    <motion.h3
                        variants={{ hidden: { opacity: 0, y: 40, filter: "blur(10px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } } }}
                        className="text-4xl md:text-5xl lg:text-6xl font-instrument italic font-medium text-brand-dark mb-4"
                    >
                        Photography Services
                    </motion.h3>
                    <motion.p
                        variants={{ hidden: { opacity: 0, y: 40, filter: "blur(10px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } } }}
                        className="text-brand-dark/60 font-space-grotesk max-w-lg text-base md:text-lg mx-auto"
                    >
                        Swipe through to discover our specialized sessions.
                    </motion.p>
                </motion.div>
            </div>

            {/* Native Horizontally scrolling container */}
            <div className="w-full relative">
                <div className="flex gap-3 lg:gap-4 overflow-x-auto snap-x snap-mandatory px-4 sm:px-6 lg:px-8 pb-12 pt-4 scrollbar-hide">
                    {serviceCategories.map((category, idx) => (
                        <div
                            key={idx}
                            onClick={() => handleCardClick(category.category)}
                            className="block shrink-0 snap-center first:ml-auto last:mr-[calc(100vw-85vw-32px)] sm:last:mr-[calc(100vw-400px-48px)] lg:last:mr-[calc(100vw-350px-64px)] xl:last:mr-auto cursor-pointer"
                        >
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.6, delay: idx * 0.1 }}
                                className="group relative w-[75vw] sm:w-[250px] lg:w-[280px] xl:w-[320px] aspect-[4/5] md:aspect-[3/4] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-black/5"
                            >
                                {/* Background Image */}
                                <Image
                                    src={category.image}
                                    alt={category.title}
                                    fill
                                    unoptimized
                                    priority={idx < 3}
                                    loading={idx < 3 ? undefined : "lazy"}
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 640px) 100vw, 350px"
                                />

                                {/* Dark Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/50 via-brand-dark/20 to-transparent flex flex-col items-start justify-end p-6 sm:p-8" />

                                {/* Content */}
                                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 flex justify-between items-end">
                                    <h4 className="text-2xl sm:text-3xl font-space-grotesk  font-xl text-white drop-shadow-md pr-2">
                                        {category.title}
                                    </h4>

                                    {/* Arrow icon reveals on hover for desktop, always visible on mobile */}
                                    <div className="bg-white/30 backdrop-blur-md p-3 rounded-full text-white transform transition-all duration-300 border border-white/30 hover:bg-white hover:text-brand-dark flex-shrink-0
                                        opacity-100 translate-y-0
                                        lg:opacity-0 lg:translate-y-4 
                                        lg:group-hover:opacity-100 lg:group-hover:translate-y-0
                                    ">
                                        <ArrowUpRight strokeWidth={2.5} size={22} />
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
