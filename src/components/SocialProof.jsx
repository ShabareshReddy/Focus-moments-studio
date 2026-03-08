"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

export default function SocialProof() {
    // Top row reviews (moving left)
    const reviewsRow1 = [
        {
            text: "Very professional and patient during the newborn photoshoot. The studio was very clean with many props available.",
            author: "Sonia G.",
            role: "Parent"
        },
        {
            text: "Tulasi Prasad is highly skilled. The environment is comfortable and delivery is exceptionally quick.",
            author: "Kiran R.",
            role: "Groom"
        },
        {
            text: "Best baby photography in Tirupati! Loved their creativity and how they handled our baby.",
            author: "Mounika P.",
            role: "Parent"
        },
        {
            text: "Absolutely stunning wedding shots. They managed to capture every raw emotion without being intrusive.",
            author: "Rakesh V.",
            role: "Customer"
        }
    ];


    return (
        <section id="reviews" className="py-24 bg-black overflow-hidden relative">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-orange/10 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-16 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="inline-block px-4 py-1.5 rounded bg-transparent border border-white/20 text-brand-orange text-xs font-semibold tracking-[0.2em] mb-6 uppercase">
                        Hear From Our Clients
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 leading-tight">
                        We Help Capture Your <br className="hidden md:block" /> Most Precious Memories.
                    </h2>
                </motion.div>
            </div>

            {/* Marquee Section */}
            <div className="relative flex flex-col gap-6 overflow-x-hidden group pb-8">
                {/* Fade transparent gradients on edges */}
                <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none"></div>
                <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none"></div>

                {/* Top Row: Scrolling Left */}
                <div className="flex animate-marquee gap-6 px-3 w-max">
                    {[...reviewsRow1, ...reviewsRow1, ...reviewsRow1].map((review, index) => (
                        <ReviewCard key={`row1-${index}`} review={review} />
                    ))}
                </div>


            </div>
        </section>
    );
}

// Reusable Review Card Component to match the user's reference exactly
function ReviewCard({ review }) {
    return (
        <div className="w-[320px] md:w-[380px] bg-[#0A0A0A] border border-white/5 rounded-2xl p-6 md:p-8 flex flex-col shrink-0 transition-transform hover:-translate-y-1 shadow-2xl">
            {/* Header: Avatar, Name, Role */}
            <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white font-bold text-lg border border-white/10 shrink-0">
                    {review.author.charAt(0)}
                </div>
                <div>
                    <h4 className="text-[#E0E0E0] font-medium text-sm md:text-base leading-tight">{review.author}</h4>
                    <p className="text-gray-500 text-xs md:text-sm mt-0.5">{review.role}</p>
                </div>
            </div>

            {/* Subtle Divider */}
            <div className="w-full h-[1px] bg-gradient-to-r from-white/10 to-transparent mb-5"></div>

            {/* Rating */}
            <div className="flex items-center gap-1.5 mb-4">
                <span className="text-gray-400 font-medium text-sm mr-1">5.0</span>
                {[...Array(5)].map((_, i) => (
                    <Star key={i} className="fill-[#FACC15] text-[#FACC15] w-4 h-4" />
                ))}
            </div>

            {/* Quote */}
            <p className="text-[#b3b3b3] text-sm md:text-[15px] leading-relaxed">
                {review.text}
            </p>
        </div>
    );
}
