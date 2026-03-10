import Link from "next/link";
import { MapPin, Phone, Instagram, Clock, Heart, Lock } from "lucide-react";
import BrandLogo from "./BrandLogo";

export default function Footer() {
    return (
        <footer className="bg-[#080808] text-white/60 pt-16 pb-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Main Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

                    {/* Brand Col */}
                    <div className="flex flex-col gap-2">
                        <Link href="/" className="flex items-center gap-1 group w-fit">

                            <div className="flex items-center justify-center w-[56px] h-[42px]">
                                <BrandLogo
                                    className="w-full h-full scale-[1.6] origin-center"
                                    variant="white"
                                />
                            </div>

                            <div className="flex flex-col justify-center leading-tight">
                                <span className="font-heading font-bold text-[16px] tracking-tight text-white">
                                    FOCUS MOMENTS
                                </span>

                                <span className="text-[10px] font-semibold tracking-[0.28em] text-brand-orange">
                                    STUDIO
                                </span>
                            </div>

                        </Link>
                        <p className="text-sm leading-relaxed text-white/40 max-w-xs">
                            Capturing life's most beautiful moments with patience, creativity, and care in Tirupati.
                        </p>
                        {/* Social Icon */}
                        <a
                            href="https://www.instagram.com/focus_momentsstudio/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-white/40 hover:text-brand-orange active:scale-90 active:opacity-70 transition-all duration-150 w-fit"
                            aria-label="Instagram"
                        >
                            <Instagram size={20} />
                        </a>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-[11px] font-bold tracking-[0.18em] text-white uppercase">Quick Links</h4>
                        <ul className="flex flex-col gap-3 text-sm">
                            <li><Link href="#portfolio" className="hover:text-brand-orange transition-colors">Our Services</Link></li>
                            <li><Link href="#reviews" className="hover:text-brand-orange transition-colors">Client Reviews</Link></li>
                            <li><Link href="#pricing" className="hover:text-brand-orange transition-colors">Pricing</Link></li>
                            <li><Link href="#about" className="hover:text-brand-orange transition-colors">About the Studio</Link></li>
                        </ul>
                    </div>

                    {/* Photography */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-[11px] font-bold tracking-[0.18em] text-white uppercase">Photography</h4>
                        <ul className="flex flex-col gap-3 text-sm">
                            <li>Baby &amp; Newborn</li>
                            <li>Family Portraits</li>
                            <li>1-Year Milestones</li>
                            <li>Event Coverage</li>
                            <li>Outdoor &amp; Indoor Shoots</li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-[11px] font-bold tracking-[0.18em] text-white uppercase">Contact</h4>
                        <div className="flex flex-col gap-3 text-sm">
                            <div className="flex items-start gap-2">
                                <MapPin size={15} className="text-brand-orange shrink-0 mt-0.5" />
                                <p>5-1-78, Sarojini Devi Rd, Nehru Nagar, Tirupati – 517501</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone size={15} className="text-brand-orange shrink-0" />
                                <a href="tel:+918328191729" className="hover:text-brand-orange active:opacity-60 transition-all duration-150 font-medium">+91 83281 91729</a>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock size={15} className="text-brand-orange shrink-0" />
                                <p>Open 24 Hours</p>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/30">
                    <p>
                        © {new Date().getFullYear()} All rights reserved. Focus Moments Studio.
                        {/* Secret Admin Link */}
                        <Link href="/admin" className="opacity-0 hover:opacity-100 transition-opacity ml-2 focus:opacity-100 outline-none">
                            <span className="sr-only">Admin</span>
                        </Link>
                    </p>
                    <p className="flex items-center gap-2">
                        Made with <Heart size={13} className="text-brand-orange fill-brand-orange" /> in Tirupati
                        <Link
                            href="/admin"
                            className="text-white/20 hover:text-white/60 transition-colors duration-200 ml-1"
                            title="Admin"
                        >
                            <Lock size={13} />
                        </Link>
                    </p>
                </div>

            </div>
        </footer>
    );
}
