"use client";

import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchWebsiteById } from "@/redux/websiteSlice";
import { useLanguage } from "@/context/LanguageContext";
import { addToCart } from "@/redux/cartSlice";
import {
    LuExternalLink, LuBadgeCheck, LuGlobe, LuClock,
    LuShieldCheck, LuShoppingCart, LuStar, LuShare2, LuEye, LuHeart, LuPlus
} from "react-icons/lu";
import { motion } from "framer-motion";

const WebsiteDetailsPage = () => {
    const { id } = useParams();
    const router = useRouter();
    const dispatch = useDispatch();
    const { singleWebsite: website, loading, error } = useSelector((state) => state.websites || {});
    const { language } = useLanguage();
    const bengaliClass = language === "bn" ? "hind-siliguri" : "";

    useEffect(() => {
        if (id) {
            dispatch(fetchWebsiteById(id));
        }
    }, [id, dispatch]);

    const handleAddToCart = () => {
        if (!website) return;
        dispatch(addToCart({
            id: website._id,
            title: website.title,
            price: website.price,
            image: website.images?.[0] || website.image || "/images/placeholder.png",
            type: 'website'
        }));
    };

    const handleBuyNow = () => {
        handleAddToCart();
        router.push('/cart');
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="w-12 h-12 border-4 border-[#41bfb8] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error || !website) {
        return (
            <div className="text-center py-20 bg-red-50 min-h-[60vh] flex flex-col items-center justify-center">
                <h3 className="text-2xl font-bold text-red-600 mb-2">Error Loading Website</h3>
                <p className="text-red-500 mb-6">{error || "Website not found"}</p>
                <button
                    onClick={() => router.push('/website')}
                    className="px-6 py-2 bg-[#41bfb8] text-white rounded-lg font-bold"
                >
                    Back to Websites
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Product Hero */}
            <section className="bg-gray-50 border-b border-gray-100 py-12 lg:py-20">
                <div className="container mx-auto px-4 lg:px-16">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                        {/* Left: Image/Gallery */}
                        <div className="lg:col-span-7 space-y-6">
                            <div className="bg-white p-4 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden group">
                                <div className="relative overflow-hidden rounded-2xl">
                                    <img
                                        src={website.images?.[0] || website.image || "/images/placeholder.png"}
                                        alt={website.title}
                                        className="w-full aspect-video object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <button className="px-8 py-3 bg-white text-gray-900 rounded-full font-bold flex items-center gap-2 shadow-2xl">
                                            <LuEye /> View Full Screenshots
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Feature Highlights - Screenshots */}
                            <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
                                {website.images?.slice(1, 6).map((img, idx) => (
                                    <div key={idx} className="bg-white p-1 rounded-xl border border-gray-100 shadow-sm cursor-pointer hover:border-[#41bfb8] transition-all overflow-hidden group">
                                        <img src={img} alt={`${website.title} view`} className="w-full aspect-video object-cover rounded-lg group-hover:scale-125 transition-transform" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right: Info & Pricing */}
                        <div className="lg:col-span-5 space-y-8">
                            <div className="space-y-4">
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-3 py-1 bg-teal-50 text-[#41bfb8] rounded-full text-[10px] font-black uppercase tracking-wider">
                                        {website.projectType || 'Premium Ready-made'}
                                    </span>
                                    <span className="px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-[10px] font-black uppercase tracking-wider">
                                        {website.accessType}
                                    </span>
                                </div>
                                <h1 className={`text-3xl lg:text-5xl font-black text-gray-900 leading-tight uppercase tracking-tighter ${bengaliClass}`}>
                                    {website.title}
                                </h1>
                                <div className="flex items-center gap-6">
                                    <div className="flex items-center gap-1 text-amber-500">
                                        <LuStar className="fill-amber-500" />
                                        <span className="font-bold text-gray-800">{website.rating || '4.9'}</span>
                                        <span className="text-gray-400 text-sm">({website.reviewCount || '12'} reviews)</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-gray-500 text-sm font-bold">
                                        <LuEye className="text-[#41bfb8]" /> {website.viewCount || '1.2k'}
                                    </div>
                                    <div className="flex items-center gap-1.5 text-gray-500 text-sm font-bold">
                                        <LuHeart className="text-red-400" /> {website.likeCount || '450'}
                                    </div>
                                </div>
                            </div>

                            {/* Price Card */}
                            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-teal-500/10 space-y-8">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <div className="flex items-center gap-4">
                                            <span className="text-5xl font-black text-gray-900">${website.price}</span>
                                            {website.offerPrice && (
                                                <span className="text-xl text-gray-400 line-through font-bold">${website.offerPrice}</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1">Total Sales</p>
                                        <span className="text-2xl font-black text-[#41bfb8]">{website.salesCount || '89'}</span>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <button
                                            onClick={handleBuyNow}
                                            className="flex items-center justify-center gap-3 py-5 bg-[#41bfb8] hover:bg-[#38a89d] text-white rounded-2xl font-bold text-xl shadow-xl shadow-[#41bfb8]/30 transition-all active:scale-[0.98]"
                                        >
                                            <LuShoppingCart />
                                            Buy Now
                                        </button>
                                        <button
                                            onClick={handleAddToCart}
                                            className="flex items-center justify-center gap-3 py-5 bg-gray-900 hover:bg-black text-white rounded-2xl font-bold text-xl shadow-xl shadow-gray-900/20 transition-all active:scale-[0.98]"
                                        >
                                            <LuPlus />
                                            Add to Cart
                                        </button>
                                    </div>
                                    {website.previewUrl && (
                                        <a
                                            href={website.previewUrl}
                                            target="_blank"
                                            className="w-full flex items-center justify-center gap-3 py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-black transition-all"
                                        >
                                            <LuExternalLink />
                                            Live Website Preview
                                        </a>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 gap-4 pt-8 border-t border-gray-50">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[10px] text-gray-400 uppercase font-bold">Project Type</span>
                                        <span className="text-sm font-bold text-gray-800">{website.projectType}</span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[10px] text-gray-400 uppercase font-bold">Platform</span>
                                        <span className="text-sm font-bold text-gray-800">Custom Built</span>
                                    </div>
                                </div>
                            </div>

                            {/* Share & Support Widget */}
                            <div className="p-6 bg-[#41bfb8]/5 rounded-3xl border border-[#41bfb8]/10 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-[#41bfb8] rounded-xl flex items-center justify-center text-white shadow-lg">
                                        <LuShieldCheck />
                                    </div>
                                    <span className="text-sm font-bold text-gray-700">6 Months Free Support</span>
                                </div>
                                <button className="text-[#41bfb8] hover:text-[#38a89d] font-black text-xs uppercase tracking-widest border-b-2 border-[#41bfb8]/20">
                                    Learn More
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Details Tabs/Content */}
            <section className="py-20 container mx-auto px-4 lg:px-16">
                <div className="max-w-4xl mx-auto space-y-20">

                    {/* Overview */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tighter">
                                Website <span className="text-[#41bfb8]">Overview</span>
                            </h2>
                            <div className="h-1 w-20 bg-[#41bfb8] rounded-full"></div>
                        </div>
                        <div className="prose prose-xl max-w-none text-gray-600 leading-relaxed font-medium">
                            {website.description}
                        </div>
                        {website.longDescription && (
                            <div className="prose prose-xl max-w-none text-gray-600 leading-relaxed pt-4">
                                {website.longDescription}
                            </div>
                        )}
                    </div>

                    {/* Tech Stack Highights */}
                    <div className="p-12 bg-[#0f172a] rounded-[3rem] text-white space-y-10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#41bfb8]/10 blur-[100px] rounded-full"></div>
                        <div className="relative z-10 space-y-8">
                            <h3 className="text-2xl font-black uppercase tracking-widest text-[#41bfb8]">Technology Stack</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                                {website.technologies?.map((tech, idx) => (
                                    <div key={idx} className="flex flex-col items-center gap-3 p-6 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 hover:bg-white/10 transition-all group cursor-default">
                                        <LuGlobe className="text-[#41bfb8] group-hover:scale-125 transition-transform" />
                                        <span className="text-sm font-bold tracking-tight">{tech}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Core Features */}
                    <div className="space-y-10">
                        <h3 className="text-3xl font-black text-gray-900 uppercase tracking-tighter text-center">Core Features & Benefits</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {website.features?.map((feature, idx) => (
                                <div key={idx} className="flex items-center gap-5 p-6 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
                                    <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center text-[#41bfb8] group-hover:bg-[#41bfb8] group-hover:text-white transition-all">
                                        <LuBadgeCheck size={22} />
                                    </div>
                                    <span className="text-lg font-bold text-gray-800 leading-tight">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Meta Footer */}
                    <div className="pt-20 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="flex gap-12">
                            <div className="space-y-1">
                                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Released</p>
                                <p className="font-extrabold text-gray-900">{new Date(website.publishDate || website.createdAt).toLocaleDateString()}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Last Updated</p>
                                <p className="font-extrabold text-gray-900">{new Date(website.updatedAt).toLocaleDateString()}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-bold text-gray-500">Secure Product by</span>
                            <div className="px-4 py-2 bg-gray-900 text-white rounded-xl font-black text-xs uppercase tracking-widest">
                                MotionBoss
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default WebsiteDetailsPage;
