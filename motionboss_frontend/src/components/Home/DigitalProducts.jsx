"use client";

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSoftware } from '@/redux/softwareSlice';
import { fetchWebsites } from '@/redux/websiteSlice';
import ProductCard from '@/components/sheard/ProductCard';
import { useLanguage } from '@/context/LanguageContext';
import { LuCpu, LuGlobe, LuSparkles, LuArrowRight } from 'react-icons/lu';
import Link from 'next/link';

const DigitalProducts = () => {
    const dispatch = useDispatch();
    const { softwareList = [] } = useSelector((state) => state.software || {});
    const { websiteList = [] } = useSelector((state) => state.websites || {});
    const { language } = useLanguage();
    const [activeType, setActiveType] = useState('software');
    const [isVisible, setIsVisible] = useState(false);
    const bengaliClass = language === "bn" ? "hind-siliguri" : "";

    useEffect(() => {
        dispatch(fetchSoftware());
        dispatch(fetchWebsites());
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, [dispatch]);

    const displayList = activeType === 'software' ? softwareList.slice(0, 4) : websiteList.slice(0, 4);

    return (
        <section className="relative py-24 overflow-hidden">

            {/* CSS for Animations */}
            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(5deg); }
                }
                @keyframes float-reverse {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(20px) rotate(-5deg); }
                }
                @keyframes pulse-slow {
                    0%, 100% { opacity: 0.4; transform: scale(1); }
                    50% { opacity: 0.7; transform: scale(1.05); }
                }
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-float { animation: float 6s ease-in-out infinite; }
                .animate-float-reverse { animation: float-reverse 7s ease-in-out infinite; }
                .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
                .animate-spin-slow { animation: spin-slow 20s linear infinite; }
            `}</style>

            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Floating Circles */}
                <div className="absolute top-20 right-[10%] w-72 h-72 bg-gradient-to-br from-[#F79952]/10 to-transparent rounded-full blur-3xl animate-float"></div>
                <div className="absolute bottom-20 left-[10%] w-80 h-80 bg-gradient-to-br from-[#41bfb8]/10 to-transparent rounded-full blur-3xl animate-float-reverse"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-[#F79952]/5 to-[#41bfb8]/5 rounded-full blur-3xl animate-pulse-slow"></div>

                {/* Geometric Shapes */}
                <div className="absolute top-32 left-[15%] w-16 h-16 border-2 border-[#F79952]/20 rounded-xl animate-float" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/4 right-[8%] w-12 h-12 border-2 border-[#41bfb8]/20 rounded-full animate-float-reverse" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute bottom-1/4 left-[8%] w-20 h-20 border-2 border-[#F79952]/15 rounded-2xl animate-spin-slow"></div>
                <div className="absolute bottom-32 right-[20%] w-8 h-8 bg-[#41bfb8]/10 rounded-lg animate-float" style={{ animationDelay: '2s' }}></div>

                {/* Dots Pattern */}
                <div className="absolute top-40 right-[5%] flex flex-col gap-2 opacity-30">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex gap-2">
                            {[...Array(3)].map((_, j) => (
                                <div key={j} className="w-1.5 h-1.5 bg-[#F79952] rounded-full"></div>
                            ))}
                        </div>
                    ))}
                </div>
                <div className="absolute bottom-40 left-[5%] flex flex-col gap-2 opacity-30">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex gap-2">
                            {[...Array(3)].map((_, j) => (
                                <div key={j} className="w-1.5 h-1.5 bg-[#41bfb8] rounded-full"></div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            <div className="container mx-auto px-4 lg:px-16 relative z-10">
                {/* Premium Section Header - Same as HomeCategory */}
                <div className={`text-center mb-14 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                    {/* Premium Badge */}
                    <div className="inline-flex items-center gap-3 mb-5 px-5 py-2.5 rounded-full bg-white dark:bg-black/50 border border-[#F79952]/30 dark:border-[#F79952]/20 shadow-sm backdrop-blur-md transition-all">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#F79952]/20 to-amber-500/20 flex items-center justify-center">
                            <LuSparkles className="text-[#F79952]" size={14} />
                        </div>
                        <span className={`text-xs font-black text-[#F79952] uppercase tracking-[0.2em] ${bengaliClass}`}>
                            {language === 'bn' ? 'ডিজিটাল পণ্য' : 'Digital Products'}
                        </span>
                    </div>

                    {/* Premium Title */}
                    <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-5 tracking-tight ${bengaliClass}`}>
                        {language === 'bn'
                            ? <>আমাদের <span className="text-[#F79952]">প্রিমিয়াম</span> ডিজিটাল পণ্য</>
                            : <>Premium <span className="text-[#F79952]">Digital</span> Products</>}
                    </h2>

                    <p className={`text-gray-500 dark:text-gray-400 text-base lg:text-lg max-w-2xl mx-auto leading-relaxed ${bengaliClass}`}>
                        {language === 'bn'
                            ? 'আমাদের প্রিমিয়াম সফটওয়্যার এবং রেডিমেড ওয়েবসাইট কালেকশন আপনার ব্যবসা বাড়াতে সাহায্য করবে।'
                            : 'Explore our collection of premium software and ready-made websites designed to scale your business.'}
                    </p>
                </div>

                {/* Tab Filters - Same card style as HomeCategory */}
                <div className={`flex justify-center mb-12 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                    <div className="inline-flex bg-white dark:bg-[#0d0d0d] rounded-2xl p-2 border border-gray-200 dark:border-white/10 shadow-sm">
                        <button
                            onClick={() => setActiveType('software')}
                            className={`group relative flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${activeType === 'software'
                                    ? 'bg-[#41bfb8]/10 text-[#41bfb8]'
                                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white'
                                }`}
                        >
                            <LuCpu size={18} />
                            <span className={bengaliClass}>{language === 'bn' ? 'সফটওয়্যার' : 'Software'}</span>
                            {activeType === 'software' && (
                                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#41bfb8] to-[#2dd4bf] rounded-b-xl"></div>
                            )}
                        </button>
                        <button
                            onClick={() => setActiveType('website')}
                            className={`group relative flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${activeType === 'website'
                                    ? 'bg-[#F79952]/10 text-[#F79952]'
                                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white'
                                }`}
                        >
                            <LuGlobe size={18} />
                            <span className={bengaliClass}>{language === 'bn' ? 'ওয়েবসাইট' : 'Websites'}</span>
                            {activeType === 'website' && (
                                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#F79952] to-[#fb923c] rounded-b-xl"></div>
                            )}
                        </button>
                    </div>

                    {/* Count Badge */}
                    <div className="hidden sm:flex items-center gap-2 ml-4 px-4 py-2 bg-white dark:bg-[#0d0d0d] rounded-xl border border-gray-200 dark:border-white/10">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                        <span className={`text-xs font-bold text-gray-500 dark:text-gray-400 ${bengaliClass}`}>
                            {displayList.length}+ {activeType === 'software'
                                ? (language === 'bn' ? 'রেডি স্ক্রিপ্ট' : 'Ready Scripts')
                                : (language === 'bn' ? 'প্রিমিয়াম টেমপ্লেট' : 'Premium Templates')}
                        </span>
                    </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
                    {displayList.map((item, index) => (
                        <div
                            key={item._id}
                            className={`transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
                            style={{ transitionDelay: `${(index + 2) * 100}ms` }}
                        >
                            <ProductCard product={item} type={activeType} />
                        </div>
                    ))}
                    {displayList.length === 0 && (
                        <div className="col-span-full py-20 text-center bg-white dark:bg-[#0d0d0d] rounded-[2rem] border border-dashed border-gray-200 dark:border-white/10">
                            <LuSparkles className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                            <p className={`text-gray-400 font-medium ${bengaliClass}`}>
                                {language === 'bn' ? 'এই ক্যাটাগরিতে এখনো কোনো প্রোডাক্ট নেই।' : 'No products found in this category yet.'}
                            </p>
                        </div>
                    )}
                </div>

                {/* CTA Section - Same card style as HomeCategory */}
                <div className={`relative bg-white dark:bg-[#0d0d0d] rounded-[2rem] p-8 lg:p-12 border border-gray-200 dark:border-white/10 transition-all duration-500 overflow-hidden ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                    {/* Decorative Corner */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br from-[#F79952] to-[#fb923c] opacity-10"></div>
                    <div className="absolute -bottom-10 -left-10 w-24 h-24 rounded-full bg-gradient-to-br from-[#41bfb8] to-[#2dd4bf] opacity-10"></div>

                    <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div className="text-center sm:text-left">
                            <h3 className={`text-xl lg:text-2xl font-black text-gray-900 dark:text-white mb-2 ${bengaliClass}`}>
                                {language === 'bn' ? 'আপনার ব্যবসা শুরু করুন আজই' : 'Ready to Launch Your Business?'}
                            </h3>
                            <p className={`text-gray-500 dark:text-gray-400 font-medium ${bengaliClass}`}>
                                {language === 'bn' ? 'আমাদের সব ডিজিটাল প্রোডাক্ট এক্সপ্লোর করুন' : 'Discover all our digital assets in one place'}
                            </p>
                        </div>

                        <Link
                            href={activeType === 'software' ? '/software' : '/website'}
                            className={`group relative bg-white dark:bg-[#0d0d0d] rounded-2xl px-8 py-4 border border-gray-200 dark:border-white/10 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)] flex items-center gap-4 ${bengaliClass}`}
                        >
                            <span className="font-bold text-gray-900 dark:text-white">
                                {language === 'bn'
                                    ? `সব ${activeType === 'software' ? 'সফটওয়্যার' : 'ওয়েবসাইট'} দেখুন`
                                    : `Explore All ${activeType === 'software' ? 'Software' : 'Websites'}`}
                            </span>
                            <div className="w-10 h-10 rounded-xl bg-[#F79952]/10 flex items-center justify-center transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-[#F79952] group-hover:to-[#fb923c]">
                                <LuArrowRight size={18} className="text-[#F79952] transition-all duration-300 group-hover:text-white group-hover:translate-x-0.5" />
                            </div>
                            {/* Bottom Accent Line */}
                            <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-[#F79952] to-[#fb923c] group-hover:w-full transition-all duration-500 rounded-b-2xl"></div>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DigitalProducts;
