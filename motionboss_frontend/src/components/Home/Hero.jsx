"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { LuSearch, LuArrowRight, LuPlay, LuZap, LuUsers, LuDownload, LuCode, LuGlobe, LuSparkles, LuRocket } from "react-icons/lu";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://motionboss-backend.vercel.app/api';

// Typing Animation Component
const TypingText = ({ text, className, delay = 0, speed = 0.03 }) => {
    if (!text) return null;
    const letters = text.split("");

    return (
        <span className={className}>
            {letters.map((letter, index) => (
                <motion.span
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        duration: 0.1,
                        delay: delay + (index * speed),
                        ease: "linear"
                    }}
                >
                    {letter}
                </motion.span>
            ))}
        </span>
    );
};

const Hero = () => {
    const { language } = useLanguage();
    const [searchQuery, setSearchQuery] = useState("");
    const [heroData, setHeroData] = useState(null);

    const bengaliClass = language === "bn" ? "hind-siliguri" : "";
    const headingFont = "font-outfit";

    // Fetch hero design from API
    useEffect(() => {
        const fetchHeroDesign = async () => {
            try {
                const res = await fetch(`${API_URL}/design/hero`);
                const data = await res.json();
                if (data.success && data.data?.heroContent) {
                    setHeroData(data.data.heroContent);
                }
            } catch (error) {
                console.error('Error fetching hero design:', error);
            }
        };
        fetchHeroDesign();
    }, [language]);

    // Fetch stats
    const [softwareCount, setSoftwareCount] = useState(0);
    const [websiteCount, setWebsiteCount] = useState(0);

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                const [softRes, webRes] = await Promise.all([
                    fetch(`${API_URL}/software`),
                    fetch(`${API_URL}/websites`)
                ]);
                const softData = await softRes.json();
                const webData = await webRes.json();

                setSoftwareCount(softData.meta?.total || (Array.isArray(softData.data) ? softData.data.length : 0));
                setWebsiteCount(webData.meta?.total || (Array.isArray(webData.data) ? webData.data.length : 0));
            } catch (error) {
                console.error('Error fetching counts:', error);
            }
        };
        fetchCounts();
    }, []);

    const getHeading = () => language === 'bn' ? 'সেরা' : 'THE BEST';
    const getHeadingLine2 = () => language === 'bn' ? 'বিজনেস সলিউশন' : 'BUSINESS SOLUTION &';
    const getHeadingLine3 = () => language === 'bn' ? 'প্রিমিয়াম কোর্স' : 'PREMIUM COURSES';

    const getDescriptionText = () => {
        if (heroData?.description) {
            const text = language === 'bn' ? heroData.description.textBn : heroData.description.text;
            if (text && text.trim()) return text;
        }
        return language === 'bn' ? 'সবচেয়ে নির্ভরযোগ্য লার্নিং প্ল্যাটফর্ম' : 'The most powerful learning and creative platform by';
    };

    const getSearchPlaceholder = () => {
        if (heroData?.searchPlaceholder) {
            return language === 'bn' ? heroData.searchPlaceholder.textBn : heroData.searchPlaceholder.text;
        }
        return language === 'bn' ? 'কোর্স, সফটওয়্যার, থিম খুঁজুন...' : 'Search courses, software, themes...';
    };

    const descriptionText = getDescriptionText();
    const brandName = heroData?.description?.brandName || 'ejobs it';

    const marqueeItems = [
        { icon: LuZap, text: 'EJOBSIT', color: 'text-[#F79952]', bg: 'bg-[#F79952]/10' },
        { icon: LuUsers, text: language === 'bn' ? 'কোর্স' : 'Courses', color: 'text-teal-500', bg: 'bg-teal-500/10' },
        { icon: LuDownload, text: language === 'bn' ? 'সফটওয়্যার' : 'Software', color: 'text-teal-500', bg: 'bg-teal-500/10' },
        { icon: LuZap, text: language === 'bn' ? 'থিম' : 'Themes', color: 'text-[#F79952]', bg: 'bg-[#F79952]/10' },
        { icon: LuGlobe, text: language === 'bn' ? 'ওয়েবসাইট' : 'Websites', color: 'text-teal-500', bg: 'bg-teal-500/10' },
        { icon: LuCode, text: language === 'bn' ? 'সফটওয়্যার' : 'Scripts', color: 'text-[#F79952]', bg: 'bg-[#F79952]/10' },
    ];

    return (
        <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-white dark:bg-[#020202] transition-colors duration-700 pt-8 pb-32">
            {/* Background Effects - WATER-LIKE BLOBS & GRID */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Subtle Radial Gradients */}
                <div className="absolute inset-0 opacity-30 dark:opacity-20">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(20,184,166,0.15),transparent)]" />
                </div>

                {/* Animated Liquid/Water Blobs (The "Panir Moto" Effect) */}
                <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-teal-500/10 dark:bg-teal-500/5 rounded-full blur-[120px] animate-blob" />
                <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-[100px] animate-blob animation-delay-2000" />
                <div className="absolute bottom-[20%] left-[20%] w-[450px] h-[450px] bg-orange-500/10 dark:bg-orange-500/5 rounded-full blur-[110px] animate-blob animation-delay-4000" />

                {/* Static Grid Pattern from About Page */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-50 dark:opacity-30" />

                {/* Transparent Large Text */}
                <div className={`absolute -top-[5%] -left-[5%] text-[25vw] font-black text-gray-950/[0.03] dark:text-white/[0.012] select-none leading-none whitespace-nowrap ${headingFont}`}>
                    EJOBSIT
                </div>
            </div>

            <div className="container mx-auto px-4 lg:px-16 relative z-10 -mt-9">
                <div className="max-w-6xl">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/70 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-700/50 mb-6 backdrop-blur-xl shadow-lg"
                    >
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 flex items-center justify-center">
                            <LuSparkles className="text-white" size={12} />
                        </div>
                        <span className={`text-[10px] font-bold tracking-[0.2em] uppercase text-gray-700 dark:text-gray-300 ${bengaliClass}`}>
                            <TypingText text={language === 'bn' ? 'প্রিমিয়াম লার্নিং প্ল্যাটফর্ম' : 'PREMIUM LEARNING PLATFORM'} delay={0.2} speed={0.02} />
                        </span>
                    </motion.div>

                    {/* Main Title */}
                    <div className="mb-6">
                        <h1 className={`font-black tracking-tight flex flex-col ${language === 'bn' ? 'hind-siliguri text-3xl sm:text-5xl lg:text-[60px] leading-[1.1] gap-2' : 'font-outfit text-4xl sm:text-6xl lg:text-[70px] leading-[0.95] gap-2'}`}>
                            <TypingText
                                text={getHeading()}
                                className="bg-gradient-to-r from-[#F79952] via-amber-500 to-[#F79952] bg-clip-text text-transparent"
                                delay={0.5}
                                speed={0.05}
                            />

                            <div className={`inline-flex items-center gap-4 flex-wrap ${language === 'bn' ? 'hind-siliguri font-bold' : 'italic font-serif'}`}>
                                <TypingText
                                    text={getHeadingLine2()}
                                    className="text-primary"
                                    delay={0.8}
                                    speed={0.04}
                                />
                                <motion.span
                                    className={`h-[3px] ${language === 'bn' ? 'w-12 lg:w-24' : 'w-16 lg:w-32'} bg-gradient-to-r from-teal-500 to-cyan-500 inline-block rounded-full`}
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ duration: 0.8, delay: 1.5 }}
                                />
                            </div>

                            <TypingText
                                text={getHeadingLine3()}
                                className="text-gray-900 dark:text-white drop-shadow-sm"
                                delay={1.2}
                                speed={0.04}
                            />
                        </h1>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-10 items-start">
                        <div>
                            <div className={`text-sm lg:text-base text-gray-500 dark:text-gray-500 leading-relaxed mb-8 font-normal ${bengaliClass}`}>
                                <TypingText text={descriptionText} delay={1.8} speed={0.015} />
                                {" "}
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1.8 + (descriptionText.length * 0.015) }}
                                    className="font-bold text-teal-600"
                                >
                                    {brandName}
                                </motion.span>
                                {language === 'bn' && <TypingText text=" দ্বারা তৈরি।" delay={1.8 + (descriptionText.length * 0.015) + 0.3} speed={0.02} />}
                            </div>

                            {/* Search Bar */}
                            <motion.div
                                className="max-w-xl mb-10"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 2.2, duration: 0.5 }}
                            >
                                <div className="relative group">
                                    <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-30 blur transition-opacity duration-500" />
                                    <div className="relative flex items-center bg-white dark:bg-gray-900/80 border border-gray-400/20 dark:border-gray-700/50 rounded-2xl overflow-hidden backdrop-blur-xl shadow-lg">
                                        <div className="absolute left-5 w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center">
                                            <LuSearch className="w-5 h-5 text-teal-500" />
                                        </div>
                                        <input
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            placeholder={getSearchPlaceholder()}
                                            className={`w-full pl-16 pr-36 py-4 bg-transparent text-gray-700 dark:text-gray-200 placeholder-gray-400 focus:outline-none ${bengaliClass}`}
                                        />
                                        <Link
                                            href={`/courses${searchQuery ? `?search=${searchQuery}` : ''}`}
                                            className="absolute right-2 px-6 py-2.5 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-bold rounded-xl transition-all"
                                        >
                                            {language === 'bn' ? 'খুঁজুন' : 'Search'}
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>

                            {/* CTA Buttons */}
                            <motion.div
                                className="flex flex-wrap items-center gap-5"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 2.5, duration: 0.5 }}
                            >
                                <Link
                                    href="/courses"
                                    className="group relative px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-2xl font-bold text-sm shadow-xl shadow-teal-500/30"
                                >
                                    <span className={`relative z-10 flex items-center gap-3 ${headingFont}`}>
                                        <LuRocket className="w-5 h-5" />
                                        {language === 'bn' ? 'কোর্স নিন' : 'GET COURSES'}
                                        <LuArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </Link>

                                <button className="flex items-center gap-4 group">
                                    <div className="relative w-14 h-14 rounded-2xl border-2 border-gray-400/20 dark:border-gray-700/50 flex items-center justify-center bg-white dark:bg-gray-900/80 shadow-lg group-hover:bg-[#F79952] group-hover:border-transparent transition-all">
                                        <LuPlay className="ml-1 text-[#F79952] group-hover:text-white" size={20} />
                                    </div>
                                    <div className="flex flex-col items-start">
                                        <span className={`font-black text-sm uppercase text-gray-900 dark:text-white ${headingFont}`}>
                                            {language === 'bn' ? 'ভিডিও দেখুন' : 'Watch Demo'}
                                        </span>
                                    </div>
                                </button>
                            </motion.div>
                        </div>

                        <div className="hidden lg:grid grid-cols-2 gap-6 translate-x-[480px]">
                            {[
                                {
                                    icon: LuCode,
                                    value: `${softwareCount}+`,
                                    label: language === 'bn' ? 'সফটওয়্যার' : 'Software',
                                    color: 'text-teal-500',
                                    bgGlow: 'group-hover:bg-teal-500/10',
                                    borderGlow: 'group-hover:border-teal-500/30',
                                    delay: 2.8
                                },
                                {
                                    icon: LuGlobe,
                                    value: `${websiteCount}+`,
                                    label: language === 'bn' ? 'ওয়েবসাইট' : 'Website',
                                    color: 'text-[#F79952]',
                                    bgGlow: 'group-hover:bg-[#F79952]/10',
                                    borderGlow: 'group-hover:border-[#F79952]/30',
                                    delay: 3.0
                                }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    whileHover={{ y: -5, scale: 1.02 }}
                                    transition={{ delay: item.delay, duration: 0.5 }}
                                    className={`group relative p-8 rounded-3xl bg-white/50 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-700/50 shadow-lg backdrop-blur-md overflow-hidden transition-all duration-300 ${item.borderGlow}`}
                                >
                                    {/* Hover Gradient Background */}
                                    <div className={`absolute inset-0 opacity-0 transition-opacity duration-300 ${item.bgGlow}`} />

                                    <div className="relative z-10">
                                        <div className={`w-14 h-14 rounded-2xl bg-white dark:bg-gray-800/80 flex items-center justify-center mb-5 shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                                            <item.icon className={item.color} size={28} />
                                        </div>
                                        <div className={`${headingFont} text-4xl font-black mb-1 text-gray-900 dark:text-white tracking-tight`}>
                                            {item.value}
                                        </div>
                                        <div className={`text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest ${bengaliClass}`}>
                                            {item.label}
                                        </div>
                                    </div>

                                    {/* Decorative Circle */}
                                    <div className={`absolute -bottom-6 -right-6 w-24 h-24 rounded-full opacity-5 group-hover:opacity-10 transition-all duration-300 ${item.color.replace('text-', 'bg-')}`} />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Carousel (Marquee) */}
            <motion.div
                className="absolute bottom-12 left-0 w-full overflow-hidden z-20"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3.2, duration: 0.8 }}
            >
                <div className="relative border-y border-gray-100 dark:border-gray-800 bg-white/70 dark:bg-gray-950/90 backdrop-blur-2xl py-6">
                    <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white dark:from-gray-950 to-transparent z-10" />
                    <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white dark:from-gray-950 to-transparent z-10" />

                    <motion.div
                        className="flex items-center gap-16 whitespace-nowrap min-w-full"
                        animate={{ x: [0, -1000] }}
                        transition={{
                            x: {
                                repeat: Infinity,
                                repeatType: "loop",
                                duration: 30,
                                ease: "linear",
                            },
                        }}
                    >
                        {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
                            <div key={i} className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center`}>
                                    <item.icon className={item.color} size={18} />
                                </div>
                                <span className={`text-xl font-bold tracking-[0.1em] text-gray-800 dark:text-gray-200 uppercase ${headingFont}`}>
                                    {item.text}
                                </span>
                                <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-700 ml-8" />
                            </div>
                        ))}
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;
