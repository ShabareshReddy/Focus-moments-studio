"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Image as ImageIcon, Trash2, UploadCloud, Loader2, Filter, Grid, MonitorPlay, Menu, X } from "lucide-react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

const CATEGORIES = ["All", "Wedding", "Pre-Wedding", "Maternity", "Birthdays", "Engagement", "Reception", "Haldi", "Events", "Uncategorized"];

export default function AdminDashboard() {
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isUploading, setIsUploading] = useState(false);
    const [deletingPath, setDeletingPath] = useState(null);
    const [filterCategory, setFilterCategory] = useState("All");
    const [uploadCategory, setUploadCategory] = useState("Wedding");
    const [activeTab, setActiveTab] = useState("gallery"); // "gallery" or "hero"
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const fileInputRef = useRef(null);
    const router = useRouter();

    useEffect(() => {
        fetchImages();
    }, [activeTab]);

    const handleLogout = () => {
        // Clear cookie and redirect
        document.cookie = "admin_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        router.push("/");
    };

    const fetchImages = async () => {
        setIsLoading(true);
        const folderName = activeTab === "hero" ? "hero" : "uploads";
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
        // Reset input so the same file could be selected again if needed
        e.target.value = null;

        const formData = new FormData();
        formData.append('file', file);
        formData.append('category', activeTab === "hero" ? "Hero" : uploadCategory);
        formData.append('folder', activeTab === "hero" ? "hero" : "uploads");

        try {
            const res = await fetch('/api/gallery/upload', {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || 'Failed to upload image');
            }

            // Successfully uploaded, refresh the gallery
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
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${
                            activeTab === "gallery" 
                            ? "bg-brand-orange text-white shadow-lg shadow-brand-orange/20" 
                            : "text-gray-300 hover:bg-white/5 hover:text-white"
                        }`}
                    >
                        <Grid size={18} />
                        Gallery Photos
                    </button>

                    <button
                        onClick={() => { setActiveTab("hero"); setIsSidebarOpen(false); }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${
                            activeTab === "hero" 
                            ? "bg-brand-orange text-white shadow-lg shadow-brand-orange/20" 
                            : "text-gray-300 hover:bg-white/5 hover:text-white"
                        }`}
                    >
                        <MonitorPlay size={18} />
                        Hero Banners
                    </button>
                </nav>

                <div className="p-4 mt-auto border-t border-white/10">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 text-red-400 hover:bg-red-400/10 rounded-xl transition-colors text-sm font-medium"
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
                        {activeTab === "gallery" ? "Gallery Manager" : "Hero Banners"}
                    </h1>
                </header>

                <main className="flex-1 p-4 md:p-8 overflow-y-auto w-full">
                    <div className="max-w-6xl mx-auto pb-20">
                        {/* Page Header */}
                        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 mb-8">
                            <div className="hidden md:block">
                                <h1 className="text-3xl font-bold text-gray-900">
                                    {activeTab === "gallery" ? "Photo Gallery Manager" : "Hero Banner Manager"}
                                </h1>
                                <p className="text-gray-500 mt-2">
                                    {activeTab === "gallery" 
                                        ? "Upload and manage images appearing on your portfolio grids."
                                        : "Upload large horizontal images exactly as you want them to appear on the homepage."}
                                </p>
                            </div>
                            
                            <div className="flex flex-col sm:flex-row items-stretch gap-3 w-full xl:w-auto">
                                {activeTab === "gallery" && (
                                    <select 
                                        value={uploadCategory}
                                        onChange={(e) => setUploadCategory(e.target.value)}
                                        className="px-4 py-3 rounded-lg border border-gray-300 bg-white text-brand-dark focus:ring-2 focus:ring-brand-orange outline-none font-medium text-sm w-full sm:w-48 appearance-none shadow-sm"
                                    >
                                        {CATEGORIES.filter(c => c !== "All").map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
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
                                className="flex items-center gap-2 bg-brand-dark text-white px-6 py-3 rounded-lg hover:bg-brand-dark/90 transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed font-medium w-full sm:w-auto justify-center whitespace-nowrap"
                            >
                                {isUploading ? <Loader2 size={18} className="animate-spin" /> : <UploadCloud size={18} />}
                                {isUploading ? 'Uploading...' : 'Upload Photo'}
                            </button>
                        </div>
                    </div>

                    {/* Filters (Gallery Only) */}
                        {activeTab === "gallery" && (
                            <div className="flex items-center gap-3 mb-8 pb-4 overflow-x-auto hide-scrollbar border-b border-gray-200">
                                <div className="flex items-center gap-2 text-gray-500 font-medium text-sm pr-4 border-r border-gray-200 shrink-0">
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
                    ) : images.length > 0 ? (
                        <div className={
                            activeTab === "gallery" 
                            ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6"
                            : "grid grid-cols-1 sm:grid-cols-2 gap-6"
                        }>
                            {images
                                .filter(img => activeTab === "hero" || filterCategory === "All" || img.category === filterCategory)
                                .map((img) => (
                                <div key={img.id} className={`group relative rounded-xl overflow-hidden bg-gray-200 border border-gray-200 shadow-sm ${activeTab === 'hero' ? 'aspect-video' : 'aspect-square'}`}>
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
