"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Image as ImageIcon, Trash2, UploadCloud, Loader2, Filter, Grid, MonitorPlay, Menu, X, IndianRupee, Save, ChevronDown } from "lucide-react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

const CATEGORIES = ["All", "Newborn Babys", "Wedding", "Pre Weddings", "Models", "Maternity", "Birthdays", "Events", "Uncategorized"];
const SERVICES_CATEGORIES = ["Newborn Babys", "Wedding", "Pre Weddings", "Models", "Birthdays", "Maternity"];

export default function AdminDashboard() {
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isUploading, setIsUploading] = useState(false);
    const [deletingPath, setDeletingPath] = useState(null);
    const [filterCategory, setFilterCategory] = useState("All");
    const [uploadCategory, setUploadCategory] = useState("Newborn Babys");
    const [activeTab, setActiveTab] = useState("gallery"); // "gallery" or "hero"
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
    // Pricing state
    const [pricingPlans, setPricingPlans] = useState([]);
    const [isSavingPricing, setIsSavingPricing] = useState(false);

    const fileInputRef = useRef(null);
    const router = useRouter();

    useEffect(() => {
        if (activeTab === "pricing") {
            fetchPricingPlans();
        } else {
            fetchImages();
        }
    }, [activeTab]);

    const handleLogout = () => {
        // Clear cookie and redirect
        document.cookie = "admin_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        router.push("/");
    };

    const fetchPricingPlans = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('pricing_plans')
                .select('*')
                .order('order', { ascending: true });
                
            if (error) throw error;
            if (data) setPricingPlans(data);
        } catch (err) {
            console.error("Failed to fetch pricing plans:", err);
            alert("Failed to load pricing plans. Make sure you created the 'pricing_plans' table.");
        } finally {
            setIsLoading(false);
        }
    };

    const handlePricingChange = (planIndex, field, value) => {
        setPricingPlans(prev => prev.map((p, i) => i === planIndex ? { ...p, [field]: value } : p));
    };

    const handlePricingFeatureChange = (planIndex, featureIndex, value) => {
        setPricingPlans(prev => prev.map((p, i) => {
            if (i === planIndex) {
                const newFeatures = p.features ? [...p.features] : [];
                newFeatures[featureIndex] = value;
                return { ...p, features: newFeatures };
            }
            return p;
        }));
    };

    const savePricingPlans = async () => {
        setIsSavingPricing(true);
        try {
            for (const plan of pricingPlans) {
                const { error } = await supabase
                    .from('pricing_plans')
                    .update({
                        badge: plan.badge,
                        title: plan.title,
                        subtitle: plan.subtitle,
                        price: plan.price,
                        duration: plan.duration,
                        features: plan.features
                    })
                    .eq('id', plan.id);
                    
                if (error) throw error;
            }
            alert("Pricing plans successfully updated!");
        } catch (error) {
            console.error("Save error:", error);
            alert(`Failed to save pricing: ${error.message}`);
        } finally {
            setIsSavingPricing(false);
        }
    };

    const fetchImages = async () => {
        setIsLoading(true);
        const folderName = activeTab === "hero" ? "hero" : activeTab === "services" ? "services" : "uploads";
        try {
             const { data, error } = await supabase.storage
                .from('gallery-images')
                .list(folderName, { 
                    limit: 100, 
                    offset: 0, 
                    sortBy: { column: 'created_at', order: 'desc' },
                });
            
            if (error) {
                console.error("Error fetching images:", error);
                return;
            }

            // Filter out empty folder placeholders and map to get public URLs
            const imageObjects = data
                ? data.filter(file => file.name !== '.emptyFolderPlaceholder' && file.name !== folderName).map(file => {
                    const filePath = `${folderName}/${file.name}`;
                    const { data: { publicUrl } } = supabase.storage
                        .from('gallery-images')
                        .getPublicUrl(filePath);
                    
                    const parts = file.name.split('_');
                    const category = parts.length > 1 ? parts[0] : "Uncategorized";

                    return {
                        name: file.name,
                        path: filePath,
                        url: publicUrl,
                        category: category,
                        id: file.id || file.name
                    };
                }) : [];
            
            setImages(imageObjects);
        } catch (err) {
            console.error("Failed to fetch gallery:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFileSelect = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        // Reset input so the same file could be re-selected if needed
        e.target.value = null;

        try {
            // 1. Build the file path directly — same convention as before
            const folder = activeTab === "hero" ? "hero" : activeTab === "services" ? "services" : "uploads";
            const category = activeTab === "hero" ? "Hero" : uploadCategory;
            const fileExt = file.name.split('.').pop();
            const safeCategory = category.replace(/[^a-zA-Z0-9-]/g, '');
            const fileName = `${safeCategory}_${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
            const filePath = `${folder}/${fileName}`;

            // 2. Upload directly from the browser to Supabase Storage
            // This bypasses Vercel's body-size limit — file goes browser → Supabase, not through your server
            const { error: uploadError } = await supabase.storage
                .from('gallery-images')
                .upload(filePath, file, {
                    contentType: file.type,
                    upsert: false,
                });

            if (uploadError) throw new Error(uploadError.message);

            // 3. Refresh gallery to show the newly uploaded image
            await fetchImages();

        } catch (error) {
            console.error("Upload error:", error);
            alert(`Upload failed: ${error.message}`);
        } finally {
            setIsUploading(false);
        }
    };

    const handleDelete = async (path) => {
        if (!confirm("Are you sure you want to delete this photo?")) return;

        setDeletingPath(path);
        try {
            const res = await fetch('/api/gallery/delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ path }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || 'Failed to delete image');
            }

            // Remove from local state immediately for snappy UI
            setImages(prev => prev.filter(img => img.path !== path));
            
        } catch (error) {
            console.error("Delete error:", error);
            alert(`Delete failed: ${error.message}`);
        } finally {
            setDeletingPath(null);
        }
    };

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden text-brand-dark">
            
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar Navigation */}
            <aside className={`
                fixed md:static inset-y-0 left-0 bg-brand-dark text-white w-64 flex flex-col z-50 transform transition-transform duration-300 ease-in-out
                ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
            `}>
                <div className="p-6 border-b border-white/10 flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-heading font-bold text-brand-orange leading-tight">Focus Moments</h2>
                        <span className="text-xs text-gray-400 tracking-wider uppercase font-medium mt-1 block">Studio Admin</span>
                    </div>
                    <button className="md:hidden text-gray-400 hover:text-white" onClick={() => setIsSidebarOpen(false)}>
                        <X size={20} />
                    </button>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-2">
                    <button
                        onClick={() => { setActiveTab("gallery"); setIsSidebarOpen(false); }}
                        className={`w-full flex items-center gap-3 px-4 py-3 transition-all font-space-grotesk text-md ${
                            activeTab === "gallery" 
                            ? "bg-brand-orange text-white " 
                            : "text-gray-300 hover:bg-white/5 hover:text-white"
                        }`}
                    >
                        <Grid size={18} />
                        Gallery Photos
                    </button>

                    <button
                        onClick={() => { setActiveTab("hero"); setIsSidebarOpen(false); }}
                        className={`w-full flex items-center gap-3 px-4 py-3  transition-all font-space-grotesk text-md ${
                            activeTab === "hero" 
                            ? "bg-brand-orange text-white " 
                            : "text-gray-300 hover:bg-white/5 hover:text-white"
                        }`}
                    >
                        <MonitorPlay size={18} />
                        Hero Banners
                    </button>

                    <button
                        onClick={() => { setActiveTab("services"); setIsSidebarOpen(false); }}
                        className={`w-full flex items-center gap-3 px-4 py-3  transition-all font-space-grotesk text-md ${
                            activeTab === "services" 
                            ? "bg-brand-orange text-white shadow-lg shadow-brand-orange/20" 
                            : "text-gray-300 hover:bg-white/5 hover:text-white"
                        }`}
                    >
                        <ImageIcon size={18} />
                        Services Categories
                    </button>

                    <button
                        onClick={() => { setActiveTab("pricing"); setIsSidebarOpen(false); }}
                        className={`w-full flex items-center gap-3 px-4 py-3  transition-all font-space-grotesk text-md ${
                            activeTab === "pricing" 
                            ? "bg-brand-orange text-white " 
                            : "text-gray-300 hover:bg-white/5 hover:text-white"
                        }`}
                    >
                        <IndianRupee size={18} />
                        Pricing Plans
                    </button>
                </nav>

                <div className="p-4 mt-auto border-t border-white/10">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 text-red-400 hover:bg-red-400/10  transition-colors text-md font-space-grotesk"
                    >
                        <LogOut size={16} />
                        Logout Session
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-full overflow-hidden">
                {/* Mobile Header Toolbar */}
                <header className="md:hidden bg-white px-4 py-4 shadow-sm flex items-center gap-4 z-10 border-b border-gray-200">
                    <button onClick={() => setIsSidebarOpen(true)} className="text-brand-dark p-2 -ml-2 hover:bg-gray-100 rounded-lg">
                        <Menu size={24} />
                    </button>
                    <h1 className="text-lg font-bold text-gray-900 leading-none">
                        {activeTab === "gallery" ? "Gallery Manager" : activeTab === "hero" ? "Hero Banners" : activeTab === "services" ? "Services Slider" : "Pricing Plans"}
                    </h1>
                </header>

                <main className="flex-1 p-4 md:p-8 overflow-y-auto w-full">
                    <div className="max-w-6xl mx-auto pb-20">
                        {/* Page Header */}
                        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 mb-8">
                            <div className="hidden md:block">
                                <h1 className="text-3xl font-faculty-glyphic text-gray-900">
                                    {activeTab === "gallery" ? "Photo Gallery Manager" : activeTab === "hero" ? "Hero Banner Manager" : activeTab === "services" ? "Services Image Manager" : "Pricing Plans Manager"}
                                </h1>
                                <p className="text-gray-500 font-space-grotesk mt-2">
                                    {activeTab === "gallery" 
                                        ? "Upload and manage images appearing on your portfolio grids."
                                        : activeTab === "hero" 
                                        ? "Upload large horizontal images exactly as you want them to appear on the homepage."
                                        : activeTab === "services"
                                        ? "Upload category images for the Services horizontal slider."
                                        : "Edit the prices and features for your photography packages."}
                                </p>
                            </div>
                            
                            {activeTab !== "pricing" && (
                                <div className="flex flex-col sm:flex-row items-stretch gap-3 w-full xl:w-auto">
                                    {(activeTab === "gallery" || activeTab === "services") && (
                                        <div className="relative w-full sm:w-48">
                                            <select 
                                                value={uploadCategory}
                                                onChange={(e) => setUploadCategory(e.target.value)}
                                                className="px-4 py-3 pr-10 border border-gray-300 bg-white cursor-pointer text-brand-dark focus:ring-2 focus:ring-brand-orange outline-none font-space-grotesk font-medium text-md w-full appearance-none shadow-sm rounded-lg hover:border-brand-orange transition-colors"
                                            >
                                                {(activeTab === "gallery" ? CATEGORIES.filter(c => c !== "All") : SERVICES_CATEGORIES).map(cat => (
                                                    <option key={cat} value={cat}>{cat}</option>
                                                ))}
                                            </select>
                                            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-500">
                                                <ChevronDown size={18} />
                                            </div>
                                        </div>
                                    )}
                                <input 
                                    type="file" 
                                    ref={fileInputRef}
                                    onChange={handleFileSelect}
                                    className="hidden" 
                                    accept="image/jpeg, image/png, image/webp"
                                />
                                <button 
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={isUploading}
                                    className="flex items-center gap-2 bg-brand-dark text-white px-6 py-3 rounded-lg hover:bg-brand-orange cursor-pointer hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 shadow-sm disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:bg-brand-dark disabled:hover:shadow-sm disabled:cursor-not-allowed font-medium w-full sm:w-auto justify-center whitespace-nowrap"
                                >
                                    {isUploading ? <Loader2 size={18} className="animate-spin" /> : <UploadCloud size={18} />}
                                    {isUploading ? 'Uploading...' : 'Upload Photo'}
                                </button>
                                </div>
                            )}

                            {activeTab === "pricing" && (
                                <button
                                    onClick={savePricingPlans}
                                    disabled={isSavingPricing}
                                    className="flex items-center gap-2 bg-brand-orange text-white px-8 py-3 rounded-lg hover:bg-amber-700 transition-colors shadow-md shadow-brand-orange/30 disabled:opacity-70 disabled:cursor-not-allowed font-medium w-full xl:w-auto justify-center whitespace-nowrap"
                                >
                                    {isSavingPricing ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                                    {isSavingPricing ? 'Saving Changes...' : 'Save Pricing Plans'}
                                </button>
                            )}
                        </div>

                    {/* Filters (Gallery Only) */}
                    {activeTab === "gallery" && (
                            <div className="flex items-center font-space-grotesk gap-3 mb-8 pb-4 overflow-x-auto hide-scrollbar border-b border-gray-200">
                                <div className="flex items-center gap-2 text-gray-500 font-medium text-lg pr-4 border-r border-gray-200 shrink-0">
                                    <Filter size={16} />
                                    Categories
                                </div>
                                <div className="flex gap-2">
                                    {CATEGORIES.map((cat) => (
                                        <button
                                            key={cat}
                                            onClick={() => setFilterCategory(cat)}
                                            className={`px-4 py-1.5 text-sm font-medium rounded-full whitespace-nowrap transition-colors ${
                                                filterCategory === cat
                                                    ? "bg-brand-dark text-white"
                                                    : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-100 shadow-sm"
                                            }`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    
                    {isLoading ? (
                        <div className="flex justify-center items-center py-32 bg-white rounded-2xl border border-gray-200 shadow-sm">
                            <Loader2 className="animate-spin text-brand-orange h-12 w-12" />
                        </div>
                    ) : activeTab === "pricing" ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {pricingPlans.map((plan, planIndex) => (
                                <div key={plan.id || planIndex} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col gap-4">
                                    <div>
                                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Badge</label>
                                        <input type="text" value={plan.badge || ''} onChange={(e) => handlePricingChange(planIndex, 'badge', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-brand-orange outline-none" />
                                    </div>
                                    <div>
                                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Title</label>
                                        <input type="text" value={plan.title || ''} onChange={(e) => handlePricingChange(planIndex, 'title', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-bold text-gray-900 focus:ring-2 focus:ring-brand-orange outline-none" />
                                    </div>
                                    <div>
                                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Subtitle</label>
                                        <input type="text" value={plan.subtitle || ''} onChange={(e) => handlePricingChange(planIndex, 'subtitle', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-500 focus:ring-2 focus:ring-brand-orange outline-none" />
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="flex-1">
                                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Price</label>
                                            <input type="text" value={plan.price || ''} onChange={(e) => handlePricingChange(planIndex, 'price', e.target.value)} className="w-full px-3 py-2 border border-brand-orange/50 bg-orange-50 rounded-lg text-lg font-bold text-brand-orange focus:ring-2 focus:ring-brand-orange outline-none" />
                                        </div>
                                        <div className="flex-1">
                                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Duration</label>
                                            <input type="text" value={plan.duration || ''} onChange={(e) => handlePricingChange(planIndex, 'duration', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 focus:ring-2 focus:ring-brand-orange outline-none" />
                                        </div>
                                    </div>
                                    <div className="pt-2 border-t border-gray-100">
                                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 block">Features List</label>
                                        <div className="space-y-2">
                                            {(plan.features || []).map((feature, idx) => (
                                                <input 
                                                    key={idx} 
                                                    type="text" 
                                                    value={feature || ''} 
                                                    onChange={(e) => handlePricingFeatureChange(planIndex, idx, e.target.value)} 
                                                    className="w-full px-3 py-1.5 border border-gray-200 rounded text-sm text-gray-700 focus:border-brand-orange outline-none" 
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {pricingPlans.length === 0 && (
                                <div className="col-span-full bg-orange-50 text-orange-800 p-6 rounded-xl border border-orange-200 text-center">
                                    No pricing plans found. Please ensure you created the `pricing_plans` table and inserted the initial data.
                                </div>
                            )}
                        </div>
                    ) : images.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-3">
                            {images
                                .filter(img => activeTab === "hero" || activeTab === "services" || filterCategory === "All" || img.category === filterCategory)
                                .map((img) => (
                                <div key={img.id} className="group relative overflow-hidden bg-gray-200 border border-gray-200 shadow-sm aspect-square">
                                    <Image 
                                        src={img.url}
                                        alt={img.name}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                                    />
                                    {/* Hover overlay with delete action */}
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                                        <button 
                                            onClick={() => handleDelete(img.path)}
                                            disabled={deletingPath === img.path}
                                            className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition-transform hover:scale-110 disabled:opacity-50 disabled:hover:scale-100 shadow-lg"
                                            title="Delete Photo"
                                        >
                                            {deletingPath === img.path ? (
                                                <Loader2 size={24} className="animate-spin" />
                                            ) : (
                                                <Trash2 size={24} />
                                            )}
                                        </button>
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                        <p className="text-white text-xs truncate">{img.name}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white p-16 text-center rounded-2xl border border-gray-200 shadow-sm flex flex-col items-center justify-center min-h-[400px]">
                            <div className="h-20 w-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                <ImageIcon className="h-10 w-10 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">Your gallery is currently empty</h3>
                            <p className="mt-2 text-sm text-gray-500 max-w-sm mx-auto">
                                Click the "Upload New Photo" button above to add your first image to the Supabase storage bucket.
                            </p>
                        </div>
                    )}
                </div>
            </main>
        </div>
        </div>
    );
}
