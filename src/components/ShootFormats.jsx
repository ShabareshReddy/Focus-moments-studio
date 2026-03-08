"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Sun, Home } from "lucide-react";

export default function ShootFormats() {
    return (
        <section className="py-24 bg-brand-dark text-white overflow-hidden relative">
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-brand-orange/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 bg-brand-orange/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-sm font-bold tracking-widest text-brand-orange uppercase mb-3">Shoot Formats</h2>
                    <h3 className="text-4xl md:text-5xl font-heading font-extrabold text-white">Your Perfect Setting</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">

                    {/* Indoor Studio */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.7 }}
                        className="flex flex-col md:flex-row gap-6 bg-white/5 rounded-3xl p-6 md:p-8 backdrop-blur-sm border border-white/10 hover:border-brand-orange/50 transition-colors"
                    >
                        <div className="relative w-full md:w-48 h-48 md:h-auto rounded-2xl overflow-hidden shrink-0">
                            <Image
                                src=""
                                alt="Indoor Photography Studio"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="flex flex-col justify-center">
                            <div className="flex items-center gap-3 mb-3">
                                <Home className="text-brand-orange" size={24} />
                                <h4 className="text-2xl font-heading font-bold">Indoor Studio</h4>
                            </div>
                            <p className="text-white/70 leading-relaxed">
                                Our controlled studio environment in Tirupati is fully equipped with creative props and professional lighting—perfect for beautiful newborn shoots and intimate family portraits.
                            </p>
                        </div>
                    </motion.div>

                    {/* Outdoor */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="flex flex-col md:flex-row gap-6 bg-white/5 rounded-3xl p-6 md:p-8 backdrop-blur-sm border border-white/10 hover:border-brand-orange/50 transition-colors"
                    >
                        <div className="relative w-full md:w-48 h-48 md:h-auto rounded-2xl overflow-hidden shrink-0">
                            <Image
                                src="https://images.unsplash.com/photo-1541216970279-affbfdd55aa8?q=80&w=800&auto=format&fit=crop"
                                alt="Outdoor Photography Session"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="flex flex-col justify-center">
                            <div className="flex items-center gap-3 mb-3">
                                <Sun className="text-brand-orange" size={24} />
                                <h4 className="text-2xl font-heading font-bold">Outdoor</h4>
                            </div>
                            <p className="text-white/70 leading-relaxed">
                                Utilize natural light and stunning scenic backgrounds. Ideal for dynamic candid moments, maternity shoots, and natural-feeling lifestyle photography.
                            </p>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
