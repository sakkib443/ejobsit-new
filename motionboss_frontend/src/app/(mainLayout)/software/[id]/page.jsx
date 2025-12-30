"use client";

import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchSoftwareById } from "@/redux/softwareSlice";
import { useLanguage } from "@/context/LanguageContext";
import { addToCart } from "@/redux/cartSlice";
import {
    LuDownload, LuExternalLink, LuBadgeCheck, LuCpu, LuClock,
    LuShieldCheck, LuShoppingCart, LuStar, LuShare2, LuCalendar, LuLayers, LuPlus
} from "react-icons/lu";
import { motion } from "framer-motion";

const SoftwareDetailsPage = () => {
    const { id } = useParams();
    const router = useRouter();
    const dispatch = useDispatch();
    const { singleSoftware: software, loading, error } = useSelector((state) => state.software || {});
    const { language } = useLanguage();
    const bengaliClass = language === "bn" ? "hind-siliguri" : "";

    useEffect(() => {
        if (id) {
            dispatch(fetchSoftwareById(id));
        }
    }, [id, dispatch]);

    const handleAddToCart = () => {
        if (!software) return;
        dispatch(addToCart({
            id: software._id,
            title: software.title,
            price: software.price,
            image: software.images?.[0] || software.image || "/images/placeholder.png",
            type: 'software'
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

    if (error || !software) {
        return (
            <div className="text-center py-20 bg-red-50 min-h-[60vh] flex flex-col items-center justify-center">
                <h3 className="text-2xl font-bold text-red-600 mb-2">Error Loading Software</h3>
                <p className="text-red-500 mb-6">{error || "Software not found"}</p>
                <button
                    onClick={() => router.push('/software')}
                    className="px-6 py-2 bg-[#41bfb8] text-white rounded-lg font-bold"
                >
                    Back to Software
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
                            <div className="bg-white p-4 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
                                <img
                                    src={software.images?.[0] || software.image || "/images/placeholder.png"}
                                    alt={software.title}
                                    className="w-full aspect-[16/10] object-cover rounded-2xl"
                                />
                            </div>

                            {/* Feature Highlights */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                {software.images?.slice(1, 5).map((img, idx) => (
                                    <div key={idx} className="bg-white p-2 rounded-2xl border border-gray-100 shadow-sm cursor-pointer hover:border-[#41bfb8] transition-all">
                                        <img src={img} alt={`${software.title} screenshot`} className="w-full aspect-square object-cover rounded-xl" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right: Info & Pricing */}
                        <div className="lg:col-span-5 space-y-8">
                            <div className="space-y-4">
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#41bfb8]/10 text-[#41bfb8] rounded-full text-xs font-bold uppercase tracking-wider">
                                    {software.softwareType}
                                </div>
                                <h1 className={`text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight ${bengaliClass}`}>
                                    {software.title}
                                </h1>
                                <div className="flex items-center gap-6">
                                    <div className="flex items-center gap-1 text-amber-500">
                                        <LuStar className="fill-amber-500" />
                                        <span className="font-bold text-gray-800">{software.rating || '4.8'}</span>
                                        <span className="text-gray-400 text-sm">({software.reviewCount || '24'} reviews)</span>
                                    </div>
                                    <div className="w-px h-4 bg-gray-200"></div>
                                    <div className="text-sm font-medium text-gray-500">
                                        <span className="text-gray-800 font-bold">{software.salesCount || '150'}+</span> Sales
                                    </div>
                                </div>
                            </div>

                            {/* Price Card */}
                            <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/40 space-y-6">
                                <div>
                                    <div className="flex items-center gap-4 mb-2">
                                        <span className="text-4xl font-black text-gray-900">${software.price}</span>
                                        {software.offerPrice && (
                                            <span className="text-xl text-gray-400 line-through font-bold">${software.offerPrice}</span>
                                        )}
                                    </div>
                                    <p className={`text-sm text-gray-500 font-medium ${bengaliClass}`}>
                                        {language === 'bn' ? 'এককালীন পেমেন্ট, লাইফটাইম অ্যাক্সেস' : 'One-time payment, lifetime access'}
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <button
                                            onClick={handleBuyNow}
                                            className="flex items-center justify-center gap-3 py-4 bg-[#41bfb8] hover:bg-[#38a89d] text-white rounded-2xl font-bold text-lg shadow-lg shadow-[#41bfb8]/30 transition-all active:scale-[0.98]"
                                        >
                                            <LuShoppingCart />
                                            Buy Now
                                        </button>
                                        <button
                                            onClick={handleAddToCart}
                                            className="flex items-center justify-center gap-3 py-4 bg-gray-900 hover:bg-black text-white rounded-2xl font-bold text-lg shadow-lg shadow-gray-900/20 transition-all active:scale-[0.98]"
                                        >
                                            <LuPlus />
                                            Add to Cart
                                        </button>
                                    </div>
                                    {software.previewUrl && (
                                        <a
                                            href={software.previewUrl}
                                            target="_blank"
                                            className="w-full flex items-center justify-center gap-3 py-4 bg-white border-2 border-gray-100 hover:border-[#41bfb8] hover:text-[#41bfb8] text-gray-700 rounded-2xl font-bold transition-all"
                                        >
                                            <LuExternalLink />
                                            Live Demo Preview
                                        </a>
                                    )}
                                </div>

                                <div className="pt-6 border-t border-gray-50 space-y-4">
                                    <div className="flex items-center gap-3 text-sm text-gray-600 font-medium">
                                        <LuShieldCheck className="text-green-500 text-lg" />
                                        Verified & Scanned by MotionBoss
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-600 font-medium">
                                        <LuClock className="text-[#41bfb8] text-lg" />
                                        Last Update: {new Date(software.lastUpdate).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>

                            {/* Share & Support */}
                            <div className="flex gap-4">
                                <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-xl font-bold transition-all">
                                    <LuShare2 size={18} />
                                    Share Product
                                </button>
                                <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-xl font-bold transition-all">
                                    Support Policy
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Details Tabs/Content */}
            <section className="py-16 container mx-auto px-4 lg:px-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-8 space-y-12">

                        {/* Description */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-extrabold text-gray-900 border-l-4 border-[#41bfb8] pl-5 uppercase tracking-tight">
                                Product Overview
                            </h2>
                            <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed font-medium">
                                {software.description}
                            </div>
                            {software.longDescription && (
                                <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
                                    {software.longDescription}
                                </div>
                            )}
                        </div>

                        {/* Features */}
                        <div className="space-y-6 bg-gray-50 p-8 lg:p-12 rounded-[2.5rem] border border-gray-100">
                            <h2 className="text-2xl font-extrabold text-gray-900 border-l-4 border-amber-500 pl-5 uppercase tracking-tight">
                                Key Features
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {software.features?.map((feature, idx) => (
                                    <div key={idx} className="flex items-start gap-4 p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
                                        <div className="bg-green-50 text-green-500 p-1.5 rounded-lg mt-1">
                                            <LuBadgeCheck size={18} />
                                        </div>
                                        <span className="text-gray-700 font-bold text-sm leading-tight">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Technical Specs */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                    <LuCpu className="text-[#41bfb8]" /> Tech Stack
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {software.technologies?.map((tech, idx) => (
                                        <span key={idx} className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-600">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                    <LuLayers className="text-[#41bfb8]" /> Platforms
                                </h3>
                                <div className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-600 inline-block">
                                    {software.platform}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Details */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-lg space-y-6">
                            <h3 className="text-xl font-bold text-gray-900 border-b border-gray-50 pb-4">Product Details</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center py-1">
                                    <span className="text-gray-500 text-sm font-medium">Version</span>
                                    <span className="text-gray-900 font-bold bg-gray-100 px-3 py-1 rounded-lg text-xs">{software.version}</span>
                                </div>
                                <div className="flex justify-between items-center py-1">
                                    <span className="text-gray-500 text-sm font-medium">Released</span>
                                    <span className="text-gray-900 font-bold text-sm">{new Date(software.publishDate || software.createdAt).toLocaleDateString()}</span>
                                </div>
                                <div className="flex justify-between items-center py-1">
                                    <span className="text-gray-500 text-sm font-medium">Update</span>
                                    <span className="text-gray-900 font-bold text-sm">{new Date(software.lastUpdate).toLocaleDateString()}</span>
                                </div>
                                <div className="flex justify-between items-center py-1">
                                    <span className="text-gray-500 text-sm font-medium">License</span>
                                    <span className="text-[#41bfb8] font-bold text-sm">MotionBoss Verified</span>
                                </div>
                            </div>

                            {software.documentationUrl && (
                                <a
                                    href={software.documentationUrl}
                                    target="_blank"
                                    className="w-full flex items-center justify-center gap-2 py-3 bg-gray-900 text-white rounded-xl font-bold text-sm hover:bg-black transition-all"
                                >
                                    View Documentation
                                </a>
                            )}
                        </div>

                        {/* Requirements */}
                        <div className="bg-amber-50 p-8 rounded-[2rem] border border-amber-100 space-y-6">
                            <h3 className="text-xl font-bold text-gray-900">System Requirements</h3>
                            <ul className="space-y-3">
                                {software.requirements?.map((req, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-700 font-medium">
                                        <div className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-1.5 flex-shrink-0"></div>
                                        {req}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SoftwareDetailsPage;
