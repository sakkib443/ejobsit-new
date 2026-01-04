"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { LuGraduationCap, LuCode, LuGlobe, LuWrench, LuArrowRight } from 'react-icons/lu';
import { motion } from 'framer-motion';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://motionboss-backend.vercel.app/api';

// Professional Animation variants like Hero section
const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
    }
};

const fadeInScale = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
    }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.1
        }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94]
        }
    }
};

// Inner card content animations
const iconVariants = {
    hidden: { opacity: 0, scale: 0, rotate: -180 },
    visible: {
        opacity: 1,
        scale: 1,
        rotate: 0,
        transition: {
            duration: 0.5,
            delay: 0.1,
            ease: [0.25, 0.46, 0.45, 0.94]
        }
    }
};

const textVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.4,
            delay: 0.2,
            ease: "easeOut"
        }
    }
};

const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
        scaleX: 1,
        transition: {
            duration: 0.6,
            delay: 0.3,
            ease: [0.25, 0.46, 0.45, 0.94]
        }
    }
};

const HomeCategory = () => {
    const [stats, setStats] = useState(null);
    const { language } = useLanguage();
    const bengaliClass = language === "bn" ? "hind-siliguri" : "";

    // Fetch real stats from database
    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch(`${API_URL}/stats/dashboard`);
                const data = await res.json();
                if (data.success && data.data) {
                    setStats(data.data);
                }
            } catch (error) {
                console.error('Error fetching stats:', error);
            }
        };
        fetchStats();
    }, []);

    // Get dynamic count for each category
    const getCategoryCount = (id) => {
        if (!stats?.breakdown) return '0';

        switch (id) {
            case 'courses':
                return stats.breakdown.courses || 0;
            case 'software':
                return stats.breakdown.software || 0;
            case 'websites':
                return stats.breakdown.websites || 0;
            case 'tools':
                // Tools can be a subset or same as software
                return stats.breakdown.software || 0;
            default:
                return 0;
        }
    };

    const categories = [
        {
            id: 'courses',
            icon: LuGraduationCap,
            title: language === 'bn' ? 'কোর্স সমূহ' : 'Courses',
            subtitle: language === 'bn' ? 'প্রফেশনাল স্কিল শিখুন' : 'Professional Skills',
            itemLabel: language === 'bn' ? 'কোর্স' : 'Courses',
            color: 'teal',
            href: '/courses'
        },
        {
            id: 'software',
            icon: LuCode,
            title: language === 'bn' ? 'সফটওয়্যার' : 'Software',
            subtitle: language === 'bn' ? 'প্রিমিয়াম স্ক্রিপ্ট' : 'Premium Scripts',
            itemLabel: language === 'bn' ? 'আইটেম' : 'Items',
            color: 'orange',
            href: '/software'
        },
        {
            id: 'websites',
            icon: LuGlobe,
            title: language === 'bn' ? 'ওয়েবসাইট' : 'Websites',
            subtitle: language === 'bn' ? 'প্রিমিয়াম টেমপ্লেট' : 'Premium Templates',
            itemLabel: language === 'bn' ? 'টেমপ্লেট' : 'Templates',
            color: 'teal',
            href: '/website'
        },
        {
            id: 'tools',
            icon: LuWrench,
            title: language === 'bn' ? 'টুলস' : 'Tools',
            subtitle: language === 'bn' ? 'প্রোডাক্টিভিটি টুলস' : 'Productivity Tools',
            itemLabel: language === 'bn' ? 'টুলস' : 'Tools',
            color: 'orange',
            href: '/tools'
        }
    ];

    const getColorClasses = (color) => {
        if (color === 'teal') {
            return {
                gradient: 'from-[#41bfb8] to-[#2dd4bf]',
                light: 'bg-[#41bfb8]/5',
                text: 'text-[#41bfb8]',
                border: 'border-[#41bfb8]/15',
                shadow: 'shadow-[#41bfb8]/10'
            };
        }
        return {
            gradient: 'from-[#F79952] to-[#fb923c]',
            light: 'bg-[#F79952]/5',
            text: 'text-[#F79952]',
            border: 'border-[#F79952]/15',
            shadow: 'shadow-[#F79952]/10'
        };
    };

    return (
        <section className='relative py-24 overflow-hidden'>

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
                <div className="absolute top-20 left-[10%] w-72 h-72 bg-gradient-to-br from-[#41bfb8]/5 to-transparent rounded-full blur-3xl animate-float"></div>
                <div className="absolute bottom-20 right-[10%] w-80 h-80 bg-gradient-to-br from-[#F79952]/5 to-transparent rounded-full blur-3xl animate-float-reverse"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-[#41bfb8]/3 to-[#F79952]/3 rounded-full blur-3xl animate-pulse-slow"></div>

                {/* Geometric Shapes */}
                <div className="absolute top-32 right-[15%] w-16 h-16 border-2 border-[#41bfb8]/20 rounded-xl animate-float" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/4 left-[8%] w-12 h-12 border-2 border-[#F79952]/20 rounded-full animate-float-reverse" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute bottom-1/4 right-[8%] w-20 h-20 border-2 border-[#41bfb8]/15 rounded-2xl animate-spin-slow"></div>
                <div className="absolute bottom-32 left-[20%] w-8 h-8 bg-[#F79952]/10 rounded-lg animate-float" style={{ animationDelay: '2s' }}></div>

                {/* Dots Pattern */}
                <div className="absolute top-40 left-[5%] flex flex-col gap-2 opacity-30">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex gap-2">
                            {[...Array(3)].map((_, j) => (
                                <div key={j} className="w-1.5 h-1.5 bg-[#41bfb8] rounded-full"></div>
                            ))}
                        </div>
                    ))}
                </div>
                <div className="absolute bottom-40 right-[5%] flex flex-col gap-2 opacity-30">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex gap-2">
                            {[...Array(3)].map((_, j) => (
                                <div key={j} className="w-1.5 h-1.5 bg-[#F79952] rounded-full"></div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            <div className='container mx-auto px-4 lg:px-16 relative z-10'>
                {/* Premium Section Header */}
                <motion.div
                    className="text-center mb-14"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                    {/* Premium Badge */}
                    <motion.div
                        className="inline-flex items-center gap-3 mb-5 px-5 py-2.5 rounded-full bg-white dark:bg-black/50 border border-teal-500/30 dark:border-teal-500/20 shadow-sm backdrop-blur-md"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-teal-500/20 to-cyan-500/20 flex items-center justify-center">
                            <span className="w-2.5 h-2.5 bg-teal-500 rounded-full animate-pulse"></span>
                        </div>
                        <span className={`text-xs font-black text-teal-600 dark:text-teal-400 uppercase tracking-[0.2em] ${bengaliClass}`}>
                            {language === 'bn' ? 'আমাদের প্রোডাক্ট' : 'Our Products'}
                        </span>
                    </motion.div>

                    {/* Premium Title */}
                    <motion.h2
                        className={`text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-5 tracking-tight ${bengaliClass}`}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        {language === 'bn'
                            ? <>ক্যাটাগরি <span className="text-primary">অনুযায়ী</span> খুঁজুন</>
                            : <>Browse by <span className="text-primary">Category</span></>}
                    </motion.h2>

                    <motion.p
                        className={`text-gray-500 dark:text-gray-400 text-base lg:text-lg max-w-2xl mx-auto leading-relaxed ${bengaliClass}`}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        {language === 'bn'
                            ? 'আমাদের বিভিন্ন ক্যাটাগরি থেকে আপনার প্রয়োজনীয় প্রোডাক্ট খুঁজে নিন। কোর্স, সফটওয়্যার, ওয়েবসাইট টেমপ্লেট এবং প্রোডাক্টিভিটি টুলস - সবই এক জায়গায়।'
                            : 'Explore our diverse categories to find exactly what you need. Courses, software, website templates, and productivity tools - all in one place.'}
                    </motion.p>
                </motion.div>

                {/* Categories Grid */}
                <motion.div
                    className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {categories.map((cat, index) => {
                        const Icon = cat.icon;
                        const colors = getColorClasses(cat.color);
                        const count = getCategoryCount(cat.id);

                        return (
                            <motion.div
                                key={cat.id}
                                variants={cardVariants}
                                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                            >
                                <Link
                                    href={cat.href}
                                    className="group relative bg-white dark:bg-[#0d0d0d] rounded-[2rem] p-8 border border-gray-200 dark:border-white/10 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)] overflow-hidden block"
                                >
                                    {/* Card Background Pattern */}
                                    <motion.div
                                        className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: 0.3 }}
                                    >
                                        <div className={`absolute top-4 right-4 w-24 h-24 rounded-full bg-gradient-to-br ${colors.gradient} opacity-10 blur-xl`}></div>
                                    </motion.div>

                                    {/* Decorative Corner */}
                                    <div className={`absolute -top-10 -right-10 w-24 h-24 rounded-full bg-gradient-to-br ${colors.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>

                                    {/* Card Inner Design Lines */}
                                    <motion.div
                                        className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-white/10 to-transparent"
                                        initial={{ scaleX: 0, opacity: 0 }}
                                        whileInView={{ scaleX: 1, opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8, delay: 0.4 }}
                                    ></motion.div>

                                    {/* Content */}
                                    <div className="relative z-10">
                                        {/* Icon with Ring - Animated */}
                                        <motion.div
                                            className="relative mb-5"
                                            initial={{ opacity: 0, y: 20, scale: 0.8 }}
                                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{
                                                duration: 0.5,
                                                delay: index * 0.08,
                                                ease: [0.25, 0.46, 0.45, 0.94]
                                            }}
                                        >
                                            <div className={`w-16 h-16 ${colors.light} rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg`}>
                                                <motion.div
                                                    whileHover={{ scale: 1.15 }}
                                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                                >
                                                    <Icon size={28} className={`${colors.text} transition-all duration-300`} />
                                                </motion.div>
                                            </div>
                                            {/* Decorative ring on hover */}
                                            <div className={`absolute inset-0 w-16 h-16 rounded-2xl border-2 ${colors.border} scale-100 opacity-0 group-hover:scale-125 group-hover:opacity-100 transition-all duration-500`}></div>
                                        </motion.div>

                                        {/* Title - Animated */}
                                        <motion.h3
                                            className={`text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-gray-800 dark:group-hover:text-white transition-colors ${bengaliClass}`}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
                                        >
                                            {cat.title}
                                        </motion.h3>

                                        {/* Subtitle - Animated */}
                                        <motion.p
                                            className={`text-sm text-gray-500 dark:text-gray-400 mb-4 ${bengaliClass}`}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
                                        >
                                            {cat.subtitle}
                                        </motion.p>

                                        {/* Bottom Row - Animated */}
                                        <motion.div
                                            className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-white/10"
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.4, delay: index * 0.1 + 0.4 }}
                                        >
                                            {/* Dynamic Items Count */}
                                            <motion.span
                                                className={`text-sm font-semibold ${colors.text} ${bengaliClass}`}
                                                initial={{ opacity: 0 }}
                                                whileInView={{ opacity: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.3, delay: index * 0.1 + 0.5 }}
                                            >
                                                {count}+ {cat.itemLabel}
                                            </motion.span>

                                            {/* Arrow - Animated */}
                                            <motion.div
                                                className={`w-8 h-8 rounded-lg ${colors.light} flex items-center justify-center transition-all duration-300 group-hover:bg-gradient-to-r group-hover:${colors.gradient}`}
                                                whileHover={{ scale: 1.1, x: 3 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <LuArrowRight size={16} className={`${colors.text} transition-all duration-300 group-hover:text-white`} />
                                            </motion.div>
                                        </motion.div>
                                    </div>

                                    {/* Bottom Accent Line - Animated */}
                                    <motion.div
                                        className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${colors.gradient} rounded-b-2xl`}
                                        initial={{ width: 0 }}
                                        whileHover={{ width: "100%" }}
                                        transition={{ duration: 0.5 }}
                                    ></motion.div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default HomeCategory;
