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
    "Specialized in newborn and baby photography",
    "Patient and safe handling during baby photoshoots",
    "Creative wedding and function photography",
    "Clean studio setup with professional props",
    "Trusted by families across Tirupati",
];

export default function About() {
    return (
        <section id="about" className="py-24 bg-purple-50 overflow-hidden">
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
                        className="text-4xl md:text-5xl font-instrument italic text-brand-dark"
                    >
                        About Us ~
                    </motion.h3>
                </motion.div>



                {/* Main two-column block */}
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">

                    {/* Left: Image */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={{
                            hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
                            visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } }
                        }}
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
                        className="w-full lg:w-7/12 flex flex-col items-start text-left"
                    >
                        <motion.h3 
                            variants={{ hidden: { opacity: 0, y: 40, filter: "blur(10px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } } }}
                            className="text-3xl md:text-4xl font-playfair font-medium text-brand-dark mb-5 leading-tight"
                        >
                            Crafting Your Story With{" "}
                            <span className="text-brand-orange">Patience & Care</span>
                        </motion.h3>
                        <motion.p 
                            variants={{ hidden: { opacity: 0, y: 40, filter: "blur(10px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } } }}
                            className="text-brand-zinc font-space-grotesk text-md leading-relaxed mb-4"
                        >
                            At <strong>Focus Moments Studio,</strong> photography is more than just taking pictures — it is about capturing the genuine emotions and meaningful moments that make every story unique. Led by <strong>Tulasi Prasad,</strong> the studio is known for its calm approach, attention to detail, and dedication to creating photographs that families will cherish for years.
                        </motion.p>
                        <motion.p 
                            variants={{ hidden: { opacity: 0, y: 40, filter: "blur(10px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } } }}
                            className="text-brand-zinc font-space-grotesk text-md leading-relaxed mb-8"
                        >
                            Based in <strong>Tirupati,</strong>  Focus Moments Studio specializes in <strong>newborn photography,</strong>  baby milestone shoots, weddings, and family functions. Each photoshoot is carefully planned to create a comfortable environment so natural expressions and real emotions can shine through in every photograph.
                        </motion.p>

                        <ul className="space-y-3 mb-10">
                            {highlights.map((item, idx) => (
                                <motion.li
                                    key={idx}
                                    variants={{ hidden: { opacity: 0, y: 20, filter: "blur(5px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5, ease: "easeOut" } } }}
                                    className="flex font-space-grotesk items-start gap-2"
                                >
                                    <CheckCircle2 className="text-brand-orange/90 shrink-0 mt-0.5" size={22} />
                                    <span className="text-brand-zinc font-sm text-md ">{item}</span>
                                </motion.li>
                            ))}
                        </ul>

                    </motion.div>
                </div>

            </div>
        </section>
    );
}
