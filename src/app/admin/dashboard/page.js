"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Image as ImageIcon, MessageSquare, Trash2, UploadCloud } from "lucide-react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState("photos");
    const router = useRouter();

    const handleLogout = () => {
        // Clear cookie and redirect
        document.cookie = "admin_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        router.push("/admin");
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
            {/* Sidebar nav */}
            <aside className="w-full md:w-64 bg-brand-dark text-white p-6 shadow-xl flex flex-col">
                <div className="mb-10">
                    <h2 className="text-xl font-heading font-bold text-brand-orange uppercase tracking-widest">
                        Focus Moments
                    </h2>
                    <p className="text-sm text-gray-400 mt-1">Admin Dashboard</p>
                </div>

                <nav className="flex-1 space-y-2">
                    <button
                        onClick={() => setActiveTab("photos")}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                            activeTab === "photos" ? "bg-amber-500 text-white" : "text-gray-400 hover:bg-white/10"
                        }`}
                    >
                        <ImageIcon size={20} />
                        <span className="font-medium">Manage Photos</span>
                    </button>
                    <button
                        onClick={() => setActiveTab("messages")}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                            activeTab === "messages" ? "bg-amber-500 text-white" : "text-gray-400 hover:bg-white/10"
                        }`}
                    >
                        <MessageSquare size={20} />
                        <span className="font-medium">Client Leads</span>
                    </button>
                </nav>

                <div className="mt-8">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-400/10 rounded-lg text-left transition-colors"
                    >
                        <LogOut size={20} />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                <div className="max-w-5xl mx-auto">
                    {activeTab === "photos" && (
                        <div>
                            <div className="flex justify-between items-center mb-8">
                                <h1 className="text-3xl font-bold text-gray-900">Photo Gallery</h1>
                                <button className="flex items-center gap-2 bg-brand-dark text-white px-5 py-2.5 rounded-lg hover:bg-brand-dark/90 transition-colors shadow-sm">
                                    <UploadCloud size={18} />
                                    Upload New Photo
                                </button>
                            </div>
                            
                            <div className="bg-white p-12 text-center rounded-xl border border-gray-200 shadow-sm">
                                <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                                <h3 className="mt-2 text-sm font-semibold text-gray-900">No photos uploaded yet</h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    Set up your Supabase 'images' table to start seeing photos here.
                                </p>
                            </div>
                        </div>
                    )}

                    {activeTab === "messages" && (
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-8">Client Inquiries</h1>
                            
                            <div className="bg-white p-12 text-center rounded-xl border border-gray-200 shadow-sm">
                                <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
                                <h3 className="mt-2 text-sm font-semibold text-gray-900">No leads yet</h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    Set up your Supabase 'contacts' table to catch form submissions from your website.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
