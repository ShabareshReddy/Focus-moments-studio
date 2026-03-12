"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Check, Star, Phone, ChevronLeft, ChevronRight } from "lucide-react";
import { supabase } from "@/lib/supabase";

const FALLBACK_PLANS = [
    {
        id: "newborn",
        title: "Newborn Babys",
        subtitle: "Cherish those first precious moments",
        price: "₹4,999",
        duration: "2–3 hrs session",
        highlight: false,
        features: [
            "Indoor studio setup",
            "Theme-based backdrop & props",
            "50+ edited photos",
            "Online gallery delivery",
        ],
    },
    {
        id: "birthday",
        title: "Birthday Shoot",
        subtitle: "Milestone celebrations done right",
        price: "₹4,999",
        duration: "2–3 hrs session",
        highlight: false,
        features: [
            "Indoor studio setup",
            "Theme-based backdrop & props",
            "50+ edited photos",
            "Online gallery delivery",
            "1 printed frame (8×10)",
            "Candid + posed shots",
        ],
    },
    {
        id: "pre-wedding",
        title: "Pre-Wedding Shoot",
        subtitle: "Your love story, beautifully told",
        price: "₹9,999",
        duration: "4–5 hrs session",
        highlight: false,
        features: [
            "Outdoor + indoor locations",
            "2 outfit changes",
            "100+ edited photos",
            "Cinematic reel (30 sec)",
            "Premium album (20 pages)",
            "Same-day preview shots",
            "Dedicated photographer",
        ],
    },
    {
        id: "wedding",
        title: "Wedding Package",
        subtitle: "Every precious moment captured",
        price: "₹24,999",
        duration: "Full-day coverage",
        highlight: false,
        features: [
            "Ceremony + reception coverage",
            "2 photographers",
            "500+ edited photos",
            "Highlight reel video (3 min)",
            "Luxury album (40 pages)",
            "Same-day edited slideshow",
            "Drone shots (if permitted)",
            "Online gallery for guests",
        ],
    },
    {
        id: "maternity",
        title: "Maternity Shoot",
        subtitle: "Celebrate the miracle of life",
        price: "₹5,999",
        duration: "2–3 hrs session",
        highlight: false,
        features: [
            "Outdoor + indoor locations",
            "Gown rentals available",
            "50+ edited photos",
            "Online gallery delivery",
        ],
    },
    {
        id: "models",
        title: "Portfolio Shoot",
        subtitle: "Professional portfolio building",
        price: "₹5,999",
        duration: "3–4 hrs session",
        highlight: false,
        features: [
            "Indoor studio setup",
            "3 outfit changes",
            "30+ high-end retouched photos",
            "Online gallery delivery",
        ],
    },
    {
        id: "haldi",
        title: "Haldi Ceremony",
        subtitle: "Vibrant and colorful memories",
        price: "₹9,999",
        duration: "4–5 hrs session",
        highlight: false,
        features: [
            "Event coverage",
            "Candid + traditional photography",
            "150+ edited photos",
            "Short highlight video",
        ],
    },
    {
        id: "saree-functions",
        title: "Saree Ceremony",
        subtitle: "Traditional celebration moments",
        price: "₹9,999",
        duration: "4–5 hrs session",
        highlight: false,
        features: [
            "Event coverage",
            "Candid + traditional photography",
            "150+ edited photos",
            "Short highlight video",
        ],
    }
];

export default function Pricing() {
    const [plans, setPlans] = useState(FALLBACK_PLANS);
    const [loading, setLoading] = useState(true);
    const scrollContainerRef = useRef(null);

    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            const scrollAmount = 350; // Adjust as needed based on card width
            scrollContainerRef.current.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
        }
    };

    useEffect(() => {
        async function fetchPlans() {
            try {
                const { data, error } = await supabase
                    .from('pricing_plans')
                    .select('*')
                    .order('id', { ascending: true });

                if (error) {
                    throw error;
                }

                if (data && data.length > 0) {
                    setPlans(data);
                }
            } catch (err) {
                console.error("Failed to fetch pricing plans, using fallbacks:", err);
            } finally {
                setLoading(false);
            }
        }

        fetchPlans();
    }, []);

    return (
        <section id="pricing" className="py-20 bg-[#080808] overflow-hidden relative">
            {/* Background glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-brand-orange/5 blur-[130px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Header */}
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
                    className="text-center mb-10"
                >
                    <motion.span
                        variants={{
                            hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
                            visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } }
                        }}
                        className="inline-block px-4 py-1.5 rounded bg-transparent border border-white/20 text-brand-orange text-xs font-semibold tracking-[0.3em] mb-5 uppercase"
                    >
                        Pricing
                    </motion.span>
                    <motion.h2
                        variants={{
                            hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
                            visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } }
                        }}
                        className="text-4xl md:text-5xl lg:text-6xl font-instrument italic text-white tracking-wide leading-relaxed"
                    >
                        Simple & Transparent{" "}
                        <span className="text-brand-orange">Packages</span>
                    </motion.h2>
                    <motion.p
                        variants={{
                            hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
                            visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } }
                        }}
                        className="mt-3 font-space-grotesk text-white/40 text-base md:text-lg max-w-xl mx-auto"
                    >
                        Flexible photography packages for newborn shoots, baby milestones, weddings, and family celebrations in Tirupati.
                    </motion.p>
                </motion.div>
            </div>

            {/* Cards — horizontal scroll on all devices */}
            <div className="w-full relative group/slider">

                {/* Left/Right Navigation Buttons */}
                <button
                    onClick={() => scroll("left")}
                    className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-brand-orange text-white p-3 md:p-4 rounded-full backdrop-blur-md transition-all duration-300 shadow-lg border border-white/20 hover:scale-105 hidden sm:flex"
                    aria-label="Scroll left"
                >
                    <ChevronLeft strokeWidth={2.5} size={24} />
                </button>
                <button
                    onClick={() => scroll("right")}
                    className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-brand-orange text-white p-3 md:p-4 rounded-full backdrop-blur-md transition-all duration-300 shadow-lg border border-white/20 hover:scale-105 hidden sm:flex"
                    aria-label="Scroll right"
                >
                    <ChevronRight strokeWidth={2.5} size={24} />
                </button>

                <div ref={scrollContainerRef} className="flex gap-4 lg:gap-5 overflow-x-auto snap-x snap-mandatory px-4 sm:px-6 lg:px-8 pt-4 pb-12 scrollbar-none">
                    {plans.map((plan, i) => (
                        <div key={plan.id || i} className="flex shrink-0 snap-center h-auto first:ml-auto last:mr-[calc(100vw-85vw-32px)] sm:last:mr-[calc(100vw-360px-48px)] xl:last:mr-auto py-2">
                            <div
                                className="group relative w-[82vw] sm:w-[340px] lg:w-[calc(33.333vw-2rem)] xl:w-[400px] h-full flex flex-col rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 border border-white/8 hover:border-brand-orange hover:shadow-[0_0_20px_rgba(234,88,12,0.1)]"
                            >
                                <div className="p-6 md:p-8 flex flex-col flex-1 bg-[#121212]">
                                    {/* Badge + title */}
                                    <h3 className="text-xl md:text-2xl font-playfair font-medium text-white mb-2 tracking-wide">{plan.title}</h3>
                                    <p className="text-white/60 font-space-grotesk text-sm mb-6">{plan.subtitle}</p>

                                    {/* Price */}
                                    <div className="flex items-end gap-2 mb-2">
                                        <span className="text-4xl md:text-5xl font-bold font-space-grotesk tracking-tight transition-colors duration-300 text-white group-hover:text-brand-orange">
                                            {plan.price}
                                        </span>
                                    </div>
                                    <span className="text-white/50 font-space-grotesk text-md mb-6 block">{plan.duration}</span>

                                    {/* Divider */}
                                    <div className="w-full h-px bg-white/10 mb-6" />

                                    {/* Features */}
                                    <ul className="space-y-3.5 mb-8 flex-1">
                                        {plan.features.map((f, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-white/80 font-space-grotesk text-sm">
                                                <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full flex items-center justify-center transition-colors duration-300 bg-white/10 text-white/60 group-hover:bg-brand-orange/20 group-hover:text-brand-orange">
                                                    <Check size={12} strokeWidth={3} />
                                                </span>
                                                <span className="leading-snug">{f}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* CTA */}
                                    <a
                                        href="tel:+918328191729"
                                        className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold text-base transition-all duration-300 active:scale-95 mt-auto bg-white/10 text-white group-hover:bg-brand-orange group-hover:shadow-[0_8px_20px_rgba(234,88,12,0.3)]"
                                    >
                                        <Phone size={16} />
                                        Book This Shoot
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
