"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

export default function About() {
    const highlights = [
        "Professional, patient handling of newborns",
        "Clean studio environment with engaging props",
        "Locally trusted with a 5.0 Google Rating",
        "Creative direction by Tulasi Prasad",
    ];

    return (
        <section id="about" className="py-24 bg-brand-light overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-16">

                    {/* Image Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.8 }}
                        className="w-full lg:w-1/2 relative"
                    >
                        <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl aspect-[4/5] max-w-md mx-auto lg:mx-0">
                            <Image
                                src="https://images.unsplash.com/photo-1554047688-6625fb4791da?q=80&w=1000&auto=format&fit=crop"
                                alt="Photographer at work"
                                fill
                                className="object-cover"
                            />
                        </div>
                        {/* Decorative backing */}
                        <div className="absolute top-8 -right-4 lg:right-12 bottom-8 left-8 lg:-left-8 border-2 border-brand-orange rounded-3xl -z-10" />
                        <div className="absolute -bottom-6 -right-6 lg:right-4 bg-white p-6 rounded-2xl shadow-xl z-20 hidden sm:block">
                            <p className="font-heading font-bold text-4xl text-brand-dark mb-1">100+</p>
                            <p className="text-brand-dark/70 font-medium">Happy Families</p>
                        </div>
                    </motion.div>

                    {/* Text Side */}
                    <div className="w-full lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-sm font-bold tracking-widest text-brand-orange uppercase mb-3">About The Studio</h2>
                            <h3 className="text-4xl md:text-5xl font-heading font-extrabold text-brand-dark mb-6 leading-tight">
                                Crafting Memories With Patience & Care
                            </h3>
                            <p className="text-lg text-brand-dark/70 mb-6 leading-relaxed">
                                At Focus Moments Studio, led by <strong>Tulasi Prasad</strong>, we believe photography is more than just taking pictures—it's about telling your unique story. Located in the heart of Tirupati, we have built a local reputation for our exceptional patience and calming presence, especially during newborn and baby sessions.
                            </p>
                            <p className="text-lg text-brand-dark/70 mb-8 leading-relaxed">
                                Whether you're visiting our clean, fully-equipped indoor studio or scheduling an on-location event shoot, our goal is to provide a comfortable environment where authentic moments happen naturally.
                            </p>

                            <ul className="space-y-4 mb-10">
                                {highlights.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <CheckCircle2 className="text-brand-orange shrink-0 mt-0.5" size={24} />
                                        <span className="text-brand-dark font-medium text-lg">{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <a
                                href="tel:+918328191729"
                                className="inline-flex items-center justify-center px-8 py-4 bg-brand-dark text-white rounded-full font-semibold text-lg hover:bg-brand-orange transition-colors duration-300 shadow-xl shadow-brand-dark/20"
                            >
                                Contact Tulasi Prasad
                            </a>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}
