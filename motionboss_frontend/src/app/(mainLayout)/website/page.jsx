"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWebsites } from "@/redux/websiteSlice";
import ProductCard from "@/components/sheard/ProductCard";
import { useLanguage } from "@/context/LanguageContext";
import { LuSearch, LuGlobe, LuLayoutGrid, LuList } from "react-icons/lu";

const WebsitePage = () => {
    const dispatch = useDispatch();
    const { websiteList = [], loading, error } = useSelector((state) => state.websites || {});
    const { t, language } = useLanguage();
    const [searchQuery, setSearchQuery] = useState("");
    const bengaliClass = language === "bn" ? "hind-siliguri" : "";

    useEffect(() => {
        dispatch(fetchWebsites());
    }, [dispatch]);

    const filteredWebsites = websiteList.filter((item) =>
        (item.title || item.name || "").toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Hero Header */}
            <section className="relative bg-[#0f172a] py-20 overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#41bfb8_1px,transparent_1px)] [background-size:20px_20px]"></div>
                <div className="container mx-auto px-4 lg:px-16 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-[#41bfb8]/10 border border-[#41bfb8]/20 rounded-full">
                        <LuGlobe className="text-[#41bfb8]" />
                        <span className="text-[#41bfb8] text-sm font-bold tracking-wider uppercase">Premium Ready-made Websites</span>
                    </div>
                    <h1 className={`text-4xl lg:text-6xl font-black text-white mb-6 uppercase tracking-tight ${bengaliClass}`}>
                        {language === 'bn' ? 'আমাদের ওয়েবসাইট মার্কেটপ্লেস' : 'Our Website Marketplace'}
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg mb-10">
                        Fully functional, ready-to-deploy websites for startups and enterprises. Get online in minutes.
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-xl mx-auto relative group">
                        <LuSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#41bfb8] transition-colors" />
                        <input
                            type="text"
                            placeholder={language === 'bn' ? 'ওয়েবসাইট খুঁজুন...' : 'Search websites...'}
                            className="w-full pl-14 pr-6 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#41bfb8]/50 transition-all font-medium"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="container mx-auto px-4 lg:px-16 -translate-y-10">
                <div className="flex justify-between items-center mb-10 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 p-1 bg-gray-100 rounded-lg">
                            <button className="p-2 bg-white rounded-md shadow-sm text-[#41bfb8]">
                                <LuLayoutGrid size={20} />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-gray-600">
                                <LuList size={20} />
                            </button>
                        </div>
                        <span className="text-gray-500 text-sm font-medium">
                            Showing {filteredWebsites.length} results
                        </span>
                    </div>

                    <div className="flex items-center gap-3">
                        <select className="bg-gray-50 border-none text-sm font-bold text-gray-700 py-2.5 px-4 rounded-xl focus:ring-0 cursor-pointer">
                            <option>Newest First</option>
                            <option>Price: Low to High</option>
                            <option>Price: High to Low</option>
                            <option>Most Popular</option>
                        </select>
                    </div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                            <div key={i} className="bg-white rounded-xl h-[400px] animate-pulse">
                                <div className="bg-gray-200 h-[200px] w-full rounded-t-xl"></div>
                                <div className="p-5 space-y-4">
                                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                                    <div className="h-10 bg-gray-200 rounded w-full mt-4"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : error ? (
                    <div className="text-center py-20 bg-red-50 rounded-3xl border border-red-100">
                        <h3 className="text-xl font-bold text-red-600 mb-2">Error Loading Websites</h3>
                        <p className="text-red-500">{error}</p>
                    </div>
                ) : filteredWebsites.length === 0 ? (
                    <div className="text-center py-24 bg-white rounded-3xl border border-gray-100 shadow-sm">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <LuSearch className="text-gray-300 text-3xl" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">No items found</h3>
                        <p className="text-gray-500">We couldn't find any website matching your search query.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredWebsites.map((item) => (
                            <ProductCard key={item._id} product={item} type="website" />
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default WebsitePage;
