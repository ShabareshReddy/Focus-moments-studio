"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Baby, Users, PartyPopper, Camera } from "lucide-react";

export default function Services() {
    const serviceCategories = [
        {
            title: "Studio & Family Photography",
            description: "Timeless portraits of your loved ones, captured in our comfortable Tirupati studio.",
            icon: <Baby className="text-white w-6 h-6" />,
            image: "",
            items: [
                "Newborn photography",
                "Baby photoshoots",
                "1-year baby milestone shoots",
                "Family portraits",
                "Studio photography sessions"
            ]
        },
        {
            title: "Event & Occasion Photography",
            description: "Comprehensive coverage for your special days, preserving every candid emotion.",
            icon: <PartyPopper className="text-white w-6 h-6" />,
            image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200&auto=format&fit=crop",
            items: [
                "Event photography",
                "Function photography",
                "Candid photography",
                "Photography & videography coverage"
            ]
        }
    ];

    return (
        <section id="services" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-sm font-bold tracking-widest text-brand-orange uppercase mb-3">Our Expertise</h2>
                    <h3 className="text-4xl md:text-5xl font-heading font-extrabold text-brand-dark">Photography Services</h3>
                    <p className="mt-4 text-brand-dark/70 max-w-2xl mx-auto text-lg">
                        From your baby's first steps to grand family celebrations, we capture the essence of your most important milestones.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
                    {serviceCategories.map((category, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: idx * 0.2 }}
                            className="group rounded-3xl overflow-hidden bg-brand-light border border-black/5 hover:shadow-2xl hover:shadow-brand-orange/10 transition-all duration-300"
                        >
                            <div className="relative h-64 sm:h-80 w-full overflow-hidden">
                                <div className="w-full h-full bg-brand-dark/10 flex items-center justify-center text-brand-dark/40">
                                    Placeholder Image
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/20 to-transparent flex items-end p-8">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-brand-orange p-3 rounded-xl shadow-lg">
                                            {category.icon}
                                        </div>
                                        <h4 className="text-2xl sm:text-3xl font-heading font-bold text-white drop-shadow-md">
                                            {category.title}
                                        </h4>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8">
                                <p className="text-brand-dark/80 mb-6 text-lg">
                                    {category.description}
                                </p>
                                <ul className="space-y-3">
                                    {category.items.map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-brand-dark font-medium">
                                            <div className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
