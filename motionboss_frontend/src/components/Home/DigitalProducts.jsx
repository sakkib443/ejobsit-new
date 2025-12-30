"use client";

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSoftware } from '@/redux/softwareSlice';
import { fetchWebsites } from '@/redux/websiteSlice';
import ProductCard from '@/components/sheard/ProductCard';
import { useLanguage } from '@/context/LanguageContext';
import { LuCpu, LuGlobe, LuChevronRight } from 'react-icons/lu';
import Link from 'next/link';

const DigitalProducts = () => {
    const dispatch = useDispatch();
    const { softwareList = [] } = useSelector((state) => state.software || {});
    const { websiteList = [] } = useSelector((state) => state.websites || {});
    const { t, language } = useLanguage();
    const [activeType, setActiveType] = useState('software');
    const bengaliClass = language === "bn" ? "hind-siliguri" : "";

    useEffect(() => {
        dispatch(fetchSoftware());
        dispatch(fetchWebsites());
    }, [dispatch]);

    const displayList = activeType === 'software' ? softwareList.slice(0, 4) : websiteList.slice(0, 4);

    return (
        <section className="py-20 bg-gray-50/50">
            <div className="container mx-auto px-4 lg:px-16">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
                    <div className="max-w-2xl">
                        <h2 className={`text-3xl lg:text-5xl font-black text-gray-900 mb-4 uppercase tracking-tighter ${bengaliClass}`}>
                            {language === 'bn' ? 'আমাদের ডিজিটাল পণ্য' : 'Top Digital Products'}
                        </h2>
                        <p className="text-gray-500 font-medium text-lg">
                            Explore our collection of premium software and ready-made websites designed to scale your business operations.
                        </p>
                    </div>

                    <div className="flex bg-white p-1.5 rounded-2xl shadow-sm border border-gray-100">
                        <button
                            onClick={() => setActiveType('software')}
                            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeType === 'software' ? 'bg-[#41bfb8] text-white shadow-lg shadow-[#41bfb8]/20' : 'text-gray-500 hover:text-gray-800'}`}
                        >
                            <LuCpu size={18} />
                            Software
                        </button>
                        <button
                            onClick={() => setActiveType('website')}
                            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeType === 'website' ? 'bg-[#41bfb8] text-white shadow-lg shadow-[#41bfb8]/20' : 'text-gray-500 hover:text-gray-800'}`}
                        >
                            <LuGlobe size={18} />
                            Websites
                        </button>
                    </div>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {displayList.map((item) => (
                        <ProductCard key={item._id} product={item} type={activeType} />
                    ))}
                    {displayList.length === 0 && (
                        <div className="col-span-full py-20 text-center bg-white rounded-[2.5rem] border border-dashed border-gray-200">
                            <p className="text-gray-400 font-bold">No products found in this category yet.</p>
                        </div>
                    )}
                </div>

                {/* View All */}
                <div className="text-center">
                    <Link
                        href={activeType === 'software' ? '/software' : '/website'}
                        className="inline-flex items-center gap-2 text-[#41bfb8] font-black uppercase tracking-widest text-sm group"
                    >
                        Explore All {activeType === 'software' ? 'Software' : 'Websites'}
                        <LuChevronRight className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default DigitalProducts;
