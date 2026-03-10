"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, ArrowRight, Instagram } from "lucide-react";

export default function Contact() {
    return (
        <section id="contact" className="py-24 bg-gray-50 overflow-hidden">
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
                    <motion.span
                        variants={{
                            hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
                            visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } }
                        }}
                        className="inline-block px-4 py-1.5 rounded bg-transparent border border-black/10 text-brand-orange text-xs font-bold tracking-[0.2em] mb-4 uppercase"
                    >
                        Get In Touch
                    </motion.span>
                    <motion.h3
                        variants={{
                            hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
                            visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } }
                        }}
                        className="text-4xl md:text-5xl font-gloock font-medium text-brand-dark mb-4"
                    >
                        Let&apos;s Create Magic <span className="text-brand-orange">Together</span>
                    </motion.h3>
                    <motion.p
                        variants={{
                            hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
                            visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } }
                        }}
                        className="text-brand-zinc text-lg max-w-2xl mx-auto font-outfit"
                    >
                        Have a question or ready to book a session? Fill out the form below or visit our studio in Tirupati.
                    </motion.p>
                </motion.div>

                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">

                    {/* Left: Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full lg:w-1/2 bg-white rounded-3xl p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-black/5"
                    >
                        <h4 className="text-2xl font-heading font-bold text-brand-dark mb-6">Send us a message</h4>

                        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-brand-dark/80">First Name</label>
                                    <input
                                        type="text"
                                        placeholder="John"
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-colors"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-brand-dark/80">Last Name</label>
                                    <input
                                        type="text"
                                        placeholder="Doe"
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-brand-dark/80">Email Address</label>
                                <input
                                    type="email"
                                    placeholder="john@example.com"
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-colors"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-brand-dark/80">Phone Number</label>
                                <input
                                    type="tel"
                                    placeholder="+91 00000 00000"
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-colors"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-brand-dark/80">Message</label>
                                <textarea
                                    rows="4"
                                    placeholder="Tell us about your requirements..."
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-colors resize-none"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full mt-2 flex items-center justify-center gap-2 group px-8 py-4 bg-brand-orange text-white rounded-xl font-outfit font-semibold text-base tracking-wide hover:bg-amber-700 hover:scale-[1.02] active:scale-95 transition-all duration-200 shadow-sm shadow-brand-orange/40"
                            >
                                Send Message
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                            </button>
                        </form>
                    </motion.div>

                    {/* Right: Map & Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full lg:w-1/2 flex flex-col gap-8"
                    >
                        {/* Map container */}
                        <div className="w-full h-[300px] md:h-[350px] rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-black/5 relative group">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3877.294132338777!2d79.4144!3d13.6288!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4d4b1a1a1a1a1a%3A0x1a1a1a1a1a1a1a1a!2sNehru%20Nagar%2C%20Tirupati%2C%20Andhra%20Pradesh%20517501!5e0!3m2!1sen!2sin!4v1655000000000!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="grayscale transition-all duration-500 group-hover:grayscale-0"
                            ></iframe>
                        </div>

                        {/* Contact Info Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-white p-6 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-black/5 flex flex-col gap-3">
                                <div className="w-10 h-10 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange">
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <h5 className="font-bold text-brand-dark mb-1">Our Studio</h5>
                                    <p className="text-sm text-brand-zinc leading-relaxed">
                                        5-1-78, Sarojini Devi Rd, <br />
                                        Nehru Nagar, Tirupati – 517501
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col gap-4">
                                <a href="tel:+918328191729" className="bg-white p-6 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-black/5 flex items-center gap-4 hover:border-brand-orange/30 hover:shadow-lg transition-all group">
                                    <div className="w-10 h-10 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-colors">
                                        <Phone size={20} />
                                    </div>
                                    <div>
                                        <h5 className="font-bold text-brand-dark text-sm">Call Us</h5>
                                        <p className="text-sm font-medium text-brand-zinc">+91 83281 91729</p>
                                    </div>
                                </a>

                                <a href="https://www.instagram.com/focus_momentsstudio/" target="_blank" rel="noopener noreferrer" className="bg-white p-6 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-black/5 flex items-center gap-4 hover:border-brand-orange/30 hover:shadow-lg transition-all group">
                                    <div className="w-10 h-10 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-colors">
                                        <Instagram size={20} />
                                    </div>
                                    <div>
                                        <h5 className="font-bold text-brand-dark text-sm">Instagram</h5>
                                        <p className="text-sm font-medium text-brand-zinc">@focus_momentsstudio</p>
                                    </div>
                                </a>
                            </div>
                        </div>

                    </motion.div>

                </div>
            </div>
        </section>
    );
}
