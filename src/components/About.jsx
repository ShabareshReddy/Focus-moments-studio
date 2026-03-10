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
    "Locally trusted with a 4+★ Google Rating",
    "Creative direction personally by Tulasi Prasad",
];

export default function About() {
    return (
        <section id="about" className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
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
                    className="text-center mb-16"
                >
                    <motion.h3
                        variants={{
                            hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
                            visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } }
                        }}
                        className="text-4xl md:text-5xl font-gloock font-medium text-brand-dark"
                    >
                        About Us ~
                    </motion.h3>
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
                        <h3 className="text-3xl md:text-4xl font-gloock font-large text-brand-dark mb-5 leading-tight">
                            Crafting Your Story With{" "}
                            <span className="text-brand-orange">Patience & Care</span>
                        </h3>
                        <p className="text-brand-zinc font-outfit  text-lg leading-relaxed mb-4">
                            At <strong>Focus Moments Studio</strong>, led by <strong>Tulasi Prasad</strong>, we believe photography is more than just taking pictures — it's about capturing the raw, unscripted emotions that make your story unique.
                        </p>
                        <p className="text-brand-zinc font-outfit  text-lg leading-relaxed mb-8">
                            Located in the heart of <strong>Tirupati</strong>, We specialize in capturing authentic and heartfelt moments, whether it’s
                            a wedding celebration, a family portrait, or a special milestone. Our goal
                            is to create images that allow you to relive your most important memories
                            for years to come.
                        </p>

                        <ul className="space-y-3 mb-10">
                            {highlights.map((item, idx) => (
                                <motion.li
                                    key={idx}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                                    className="flex font-outfit items-start gap-3"
                                >
                                    <CheckCircle2 className="text-brand-orange shrink-0 mt-0.5" size={22} />
                                    <span className="text-brand-dark font-medium text-base">{item}</span>
                                </motion.li>
                            ))}
                        </ul>


                    </motion.div>
                </div>

            </div>
        </section>
    );
}
