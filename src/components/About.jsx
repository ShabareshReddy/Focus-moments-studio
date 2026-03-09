"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle2, Camera, Star, Heart, Award } from "lucide-react";

const stats = [
    { icon: Heart, value: "500+", label: "Families Served" },
    { icon: Star, value: "5.0", label: "Google Rating" },
    { icon: Camera, value: "8+", label: "Years Experience" },
    { icon: Award, value: "100%", label: "Satisfaction" },
];

const highlights = [
    "Professional, patient handling of newborns & babies",
    "Clean studio environment with engaging props",
    "Locally trusted with a 5.0 ★ Google Rating",
    "Creative direction personally by Tulasi Prasad",
];

export default function About() {
    return (
        <section id="about" className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="px-4 py-1.5 rounded-full bg-brand-orange/10 text-brand-orange text-lg font-bold tracking-[0.2em] uppercase mb-4">
                        About The Studio
                    </span>

                </motion.div>



                {/* Main two-column block */}
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                    {/* Left: Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full lg:w-5/12 relative"
                    >
                        {/* Orange accent frame */}
                        <div className="absolute -top-4 -left-4 w-full h-full border-2 border-brand-orange/40 rounded-3xl" />
                        <div className="relative z-10 rounded-3xl aspect-[4/5] overflow-hidden shadow-2xl">
                            <Image
                                src="/image/tobias-pfeifer-W_9dsX-Go5A-unsplash.jpg"
                                alt="Focus Moments Studio Photography"
                                fill
                                className="object-cover object-center"
                                sizes="(max-width: 768px) 100vw, 40vw"
                            />
                        </div>
                    </motion.div>

                    {/* Right: Text */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full lg:w-7/12"
                    >
                        <h3 className="text-3xl md:text-4xl font-heading font-extrabold text-brand-dark mb-5 leading-tight">
                            Crafting Your Story With{" "}
                            <span className="text-brand-orange">Patience & Care</span>
                        </h3>
                        <p className="text-brand-zinc text-lg leading-relaxed mb-4">
                            At <strong>Focus Moments Studio</strong>, led by <strong>Tulasi Prasad</strong>, we believe photography is more than just taking pictures — it's about capturing the raw, unscripted emotions that make your story unique.
                        </p>
                        <p className="text-brand-zinc text-lg leading-relaxed mb-8">
                            Located in the heart of <strong>Tirupati</strong>, our fully-equipped studio is designed to create a calm, comfortable space — especially important for baby, newborn, and family sessions. Every session is handled with exceptional patience and creative care.
                        </p>

                        <ul className="space-y-3 mb-10">
                            {highlights.map((item, idx) => (
                                <motion.li
                                    key={idx}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                                    className="flex items-start gap-3"
                                >
                                    <CheckCircle2 className="text-brand-orange shrink-0 mt-0.5" size={22} />
                                    <span className="text-brand-dark font-medium text-base">{item}</span>
                                </motion.li>
                            ))}
                        </ul>

                        <div className="flex flex-wrap gap-4">
                            <a
                                href="tel:+918328191729"
                                className="inline-flex items-center justify-center px-8 py-3.5 bg-brand-orange text-white rounded-full font-semibold text-base hover:bg-brand-dark active:scale-95 transition-all duration-150 shadow-lg shadow-brand-orange/30"
                            >
                                📞 Call Us Now
                            </a>
                            <a
                                href="https://www.instagram.com/focus_momentsstudio/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center px-8 py-3.5 border-2 border-brand-dark text-brand-dark rounded-full font-semibold text-base hover:bg-brand-dark hover:text-white active:scale-95 transition-all duration-150"
                            >
                                📷 Our Instagram
                            </a>
                        </div>
                    </motion.div>
                </div>

            </div>
        </section>
    );
}
