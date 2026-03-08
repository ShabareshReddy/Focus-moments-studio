import Link from "next/link";
import { Camera, MapPin, Phone, Instagram, Clock, Heart } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-brand-dark text-white/80 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

                    {/* Brand Col */}
                    <div className="flex flex-col gap-4">
                        <Link href="/" className="flex items-center gap-2 group w-fit">
                            <div className="bg-brand-orange p-2 rounded-lg text-white">
                                <Camera size={24} />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-heading font-black text-xl tracking-tight leading-none text-white">
                                    FOCUS MOMENTS
                                </span>
                                <span className="text-[10px] font-bold tracking-[0.2em] leading-none text-brand-orange">
                                    STUDIO
                                </span>
                            </div>
                        </Link>
                        <p className="text-sm leading-relaxed mt-2 text-white/60">
                            Capturing life's most beautiful moments with patience, creativity, and professional care in Tirupati.
                        </p>
                        <a
                            href="https://www.instagram.com/focus_momentsstudio/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-brand-orange hover:text-white transition-colors mt-2"
                        >
                            <Instagram size={20} />
                            <span className="font-medium">Follow on Instagram</span>
                        </a>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-col gap-4">
                        <h3 className="font-heading font-semibold text-white text-lg">Quick Links</h3>
                        <ul className="flex flex-col gap-2">
                            <li><Link href="#services" className="hover:text-brand-orange transition-colors">Our Services</Link></li>
                            <li><Link href="#portfolio" className="hover:text-brand-orange transition-colors">Portfolio Gallery</Link></li>
                            <li><Link href="#reviews" className="hover:text-brand-orange transition-colors">Client Reviews</Link></li>
                            <li><Link href="#about" className="hover:text-brand-orange transition-colors">About the Studio</Link></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div className="flex flex-col gap-4">
                        <h3 className="font-heading font-semibold text-white text-lg">Photography</h3>
                        <ul className="flex flex-col gap-2">
                            <li>Baby & Newborn</li>
                            <li>Family Portraits</li>
                            <li>1-Year Milestones</li>
                            <li>Event Coverage</li>
                            <li>Outdoor & Indoor Shoots</li>
                        </ul>
                    </div>

                    {/* Contact Col */}
                    <div className="flex flex-col gap-4">
                        <h3 className="font-heading font-semibold text-white text-lg">Contact Us</h3>
                        <div className="flex items-start gap-3">
                            <MapPin size={20} className="text-brand-orange shrink-0 mt-1" />
                            <p className="text-sm">
                                5-1-78, Sarojini Devi Rd, Opp. Sri Sai Multi-Speciality Hospital, Nehru Nagar, Tirupati – 517501
                            </p>
                        </div>
                        <div className="flex items-center gap-3 mt-2">
                            <Phone size={20} className="text-brand-orange shrink-0" />
                            <p className="text-sm font-medium">+91 83281 91729</p>
                        </div>
                        <div className="flex items-center gap-3 mt-2">
                            <Clock size={20} className="text-brand-orange shrink-0" />
                            <p className="text-sm font-medium">Open 24 Hours</p>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/40">
                    <p>© {new Date().getFullYear()} Focus Moments Studio. All rights reserved.</p>
                    <p className="flex items-center gap-1">
                        Made with <Heart size={14} className="text-brand-orange" /> in Tirupati
                    </p>
                </div>
            </div>
        </footer>
    );
}
