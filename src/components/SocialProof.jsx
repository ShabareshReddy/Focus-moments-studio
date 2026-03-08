"use client";

import { motion } from "framer-motion";
import { Star, ShieldCheck, HeartPulse, Clock } from "lucide-react";

export default function SocialProof() {
    const reviews = [
        { text: "Very professional and patient during the newborn photoshoot. The studio was very clean with many props available.", author: "Sonia G." },
        { text: "Tulasi Prasad is highly skilled. The environment is comfortable and delivery is exceptionally quick.", author: "Kiran R." },
        { text: "Best baby photography in Tirupati! Loved their creativity and how they handled our baby.", author: "Mounika P." },
    ];

    return (
        <section id="reviews" className="py-20 bg-brand-light">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-16 items-center">

                    {/* Rating Block */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className="lg:w-1/3 flex flex-col items-center lg:items-start text-center lg:text-left"
                    >
                        <div className="flex gap-1 mb-4">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="fill-brand-orange text-brand-orange w-8 h-8" />
                            ))}
                        </div>
                        <h2 className="text-4xl md:text-5xl font-heading font-bold text-brand-dark mb-2">5.0 / 5</h2>
                        <p className="text-xl text-brand-dark/70 font-medium mb-6">Based on 31 Google Reviews</p>
                        <p className="text-lg text-brand-dark/80 mb-8 max-w-sm">
                            Consistently praised locally for our professionalism, creativity, patience, and quick delivery of beautifully captured memories.
                        </p>

                        <div className="w-full grid grid-cols-2 gap-4">
                            <div className="bg-white p-4 rounded-xl shadow-sm border border-black/5 flex flex-col items-center text-center">
                                <HeartPulse className="text-brand-orange mb-2" size={28} />
                                <span className="text-sm font-semibold text-brand-dark">Patient handling</span>
                            </div>
                            <div className="bg-white p-4 rounded-xl shadow-sm border border-black/5 flex flex-col items-center text-center">
                                <Clock className="text-brand-orange mb-2" size={28} />
                                <span className="text-sm font-semibold text-brand-dark">Fast Delivery</span>
                            </div>
                            <div className="bg-white p-4 rounded-xl shadow-sm border border-black/5 col-span-2 flex flex-col sm:flex-row items-center justify-center gap-3 text-center sm:text-left">
                                <ShieldCheck className="text-brand-orange shrink-0" size={28} />
                                <span className="text-sm font-semibold text-brand-dark">Clean, Comfortable Environment</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Review Cards Block */}
                    <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                        {reviews.map((review, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: index * 0.15 }}
                                className={`bg-white p-8 rounded-2xl shadow-lg border border-brand-orange/10 relative ${index === 2 ? "md:col-span-2 md:max-w-xl md:mx-auto" : ""
                                    }`}
                            >
                                {/* Quote Icon SVG overlay */}
                                <div className="absolute top-6 left-6 text-brand-orange/10 z-0">
                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                    </svg>
                                </div>
                                <div className="relative z-10 flex flex-col h-full justify-between">
                                    <div className="flex gap-1 mb-4">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="fill-brand-yellow text-brand-yellow w-4 h-4" />
                                        ))}
                                    </div>
                                    <p className="text-brand-dark/80 text-lg sm:text-xl font-medium leading-relaxed mb-6 italic">
                                        "{review.text}"
                                    </p>
                                    <p className="font-heading font-bold text-brand-dark uppercase tracking-wide text-sm">
                                        - {review.author}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}
