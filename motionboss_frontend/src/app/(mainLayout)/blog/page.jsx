'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
    FiSearch,
    FiClock,
    FiUser,
    FiHeart,
    FiMessageCircle,
    FiTrendingUp,
    FiBookOpen,
    FiArrowRight,
    FiEye,
    FiCalendar,
    FiChevronLeft,
    FiChevronRight,
    FiStar,
    FiZap,
} from 'react-icons/fi';
import { API_BASE_URL } from '@/config/api';

export default function BlogPage() {
    const [blogs, setBlogs] = useState([]);
    const [featuredBlogs, setFeaturedBlogs] = useState([]);
    const [popularBlogs, setPopularBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [activeCategory, setActiveCategory] = useState('all');

    const categories = [
        { id: 'all', name: 'সব পোস্ট', nameEn: 'All Posts' },
        { id: 'technology', name: 'টেকনোলজি', nameEn: 'Technology' },
        { id: 'design', name: 'ডিজাইন', nameEn: 'Design' },
        { id: 'tutorial', name: 'টিউটোরিয়াল', nameEn: 'Tutorial' },
        { id: 'career', name: 'ক্যারিয়ার', nameEn: 'Career' },
    ];

    useEffect(() => {
        const fetchBlogs = async () => {
            setLoading(true);
            try {
                let url = `${API_BASE_URL}/blogs?status=published&page=${currentPage}&limit=9`;
                if (searchTerm) url += `&searchTerm=${searchTerm}`;

                const res = await fetch(url);
                const data = await res.json();
                if (data.success) {
                    setBlogs(data.data || []);
                    setTotalPages(data.meta?.totalPages || 1);
                }

                const featuredRes = await fetch(`${API_BASE_URL}/blogs/featured?limit=3`);
                const featuredData = await featuredRes.json();
                if (featuredData.success) setFeaturedBlogs(featuredData.data || []);

                const popularRes = await fetch(`${API_BASE_URL}/blogs/popular?limit=5`);
                const popularData = await popularRes.json();
                if (popularData.success) setPopularBlogs(popularData.data || []);
            } catch (error) {
                console.error('Failed to fetch blogs:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, [currentPage, searchTerm]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">

            {/* Stunning Hero Section */}
            <section className="relative overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-700" />
                    <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-10" />

                    {/* Floating Elements */}
                    <motion.div
                        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-20 left-[10%] w-72 h-72 bg-white/10 rounded-full blur-3xl"
                    />
                    <motion.div
                        animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute bottom-10 right-[15%] w-96 h-96 bg-amber-500/20 rounded-full blur-3xl"
                    />
                    <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-400/10 rounded-full blur-3xl"
                    />
                </div>

                <div className="relative z-10 container mx-auto px-4 py-24 md:py-32">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-sm font-semibold mb-8"
                        >
                            <FiZap className="text-amber-300" />
                            <span>নতুন আর্টিকেল প্রতিদিন</span>
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        </motion.div>

                        {/* Title */}
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-outfit text-white mb-6 leading-tight">
                            জ্ঞানের{' '}
                            <span className="relative">
                                <span className="bg-gradient-to-r from-amber-300 via-yellow-300 to-orange-300 bg-clip-text text-transparent">
                                    ভান্ডার
                                </span>
                                <motion.svg
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                    className="absolute -bottom-2 left-0 w-full"
                                    viewBox="0 0 200 10"
                                >
                                    <motion.path
                                        d="M0,5 Q50,0 100,5 T200,5"
                                        stroke="rgba(251,191,36,0.6)"
                                        strokeWidth="3"
                                        fill="none"
                                    />
                                </motion.svg>
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl text-white/80 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
                            টেকনোলজি, ডিজাইন এবং ক্যারিয়ার সম্পর্কে বিশেষজ্ঞদের লেখা আর্টিকেল পড়ুন
                        </p>

                        {/* Search Bar - Premium */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="max-w-2xl mx-auto"
                        >
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500" />
                                <div className="relative flex items-center bg-white dark:bg-slate-800 rounded-2xl shadow-2xl">
                                    <FiSearch className="absolute left-6 text-slate-400" size={22} />
                                    <input
                                        type="text"
                                        placeholder="আর্টিকেল খুঁজুন..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-16 pr-6 py-5 rounded-2xl bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none text-lg"
                                    />
                                    <button className="absolute right-3 px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all">
                                        Search
                                    </button>
                                </div>
                            </div>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="flex flex-wrap justify-center gap-8 md:gap-16 mt-12"
                        >
                            {[
                                { number: '150+', label: 'আর্টিকেল' },
                                { number: '50+', label: 'লেখক' },
                                { number: '10K+', label: 'পাঠক' },
                            ].map((stat, idx) => (
                                <div key={idx} className="text-center">
                                    <div className="text-3xl md:text-4xl font-bold text-white">{stat.number}</div>
                                    <div className="text-white/60 text-sm mt-1">{stat.label}</div>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>

                {/* Wave Divider */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0,60 C360,120 1080,0 1440,60 L1440,120 L0,120 Z" className="fill-slate-50 dark:fill-slate-900" />
                    </svg>
                </div>
            </section>

            {/* Category Tabs */}
            <section className="py-8 -mt-4 relative z-10">
                <div className="container mx-auto px-4">
                    <div className="flex justify-center">
                        <div className="inline-flex items-center gap-2 p-2 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700">
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.id)}
                                    className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${activeCategory === cat.id
                                            ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg shadow-teal-500/30'
                                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                                        }`}
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Section - Premium Cards */}
            {featuredBlogs.length > 0 && (
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center justify-between mb-10"
                        >
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white">
                                        <FiStar size={20} />
                                    </div>
                                    <span className="text-amber-600 dark:text-amber-400 font-semibold text-sm uppercase tracking-wider">Featured</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white font-outfit">
                                    বিশেষ আর্টিকেল
                                </h2>
                            </div>
                            <Link href="/blog?featured=true" className="hidden md:flex items-center gap-2 text-teal-600 dark:text-teal-400 font-semibold hover:gap-3 transition-all">
                                সব দেখুন <FiArrowRight />
                            </Link>
                        </motion.div>

                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                        >
                            {/* Main Featured */}
                            {featuredBlogs[0] && (
                                <motion.div variants={itemVariants} className="lg:row-span-2">
                                    <Link href={`/blog/${featuredBlogs[0].slug}`} className="group block h-full">
                                        <div className="relative h-full min-h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                                            {featuredBlogs[0].thumbnail ? (
                                                <Image
                                                    src={featuredBlogs[0].thumbnail}
                                                    alt={featuredBlogs[0].title}
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-br from-teal-500 to-cyan-600" />
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                                            {/* Badge */}
                                            <div className="absolute top-6 left-6">
                                                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-bold shadow-lg">
                                                    <FiStar size={14} /> Featured
                                                </span>
                                            </div>

                                            {/* Content */}
                                            <div className="absolute bottom-0 left-0 right-0 p-8">
                                                <div className="flex items-center gap-4 mb-4 text-white/70">
                                                    <span className="flex items-center gap-1.5">
                                                        <FiUser size={14} />
                                                        {featuredBlogs[0].author?.firstName} {featuredBlogs[0].author?.lastName}
                                                    </span>
                                                    <span className="flex items-center gap-1.5">
                                                        <FiClock size={14} />
                                                        {featuredBlogs[0].readingTime} min
                                                    </span>
                                                </div>
                                                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-amber-300 transition-colors line-clamp-2">
                                                    {featuredBlogs[0].title}
                                                </h3>
                                                <p className="text-white/70 line-clamp-2 mb-6">
                                                    {featuredBlogs[0].excerpt}
                                                </p>
                                                <div className="inline-flex items-center gap-2 text-amber-400 font-semibold group-hover:gap-4 transition-all">
                                                    পড়ুন <FiArrowRight />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            )}

                            {/* Secondary Featured */}
                            <div className="space-y-6">
                                {featuredBlogs.slice(1, 3).map((blog, index) => (
                                    <motion.div key={blog._id} variants={itemVariants}>
                                        <Link href={`/blog/${blog.slug}`} className="group flex gap-5 p-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 hover:shadow-xl hover:border-teal-500/30 transition-all duration-300">
                                            <div className="w-40 h-32 relative rounded-xl overflow-hidden flex-shrink-0">
                                                {blog.thumbnail ? (
                                                    <Image src={blog.thumbnail} alt={blog.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                                                ) : (
                                                    <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600" />
                                                )}
                                            </div>
                                            <div className="flex-1 flex flex-col justify-center">
                                                <div className="flex items-center gap-3 mb-2 text-sm text-slate-500 dark:text-slate-400">
                                                    <span className="flex items-center gap-1"><FiClock size={12} /> {blog.readingTime} min</span>
                                                    <span className="flex items-center gap-1"><FiEye size={12} /> {blog.totalViews || 0}</span>
                                                </div>
                                                <h4 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors line-clamp-2 mb-2">
                                                    {blog.title}
                                                </h4>
                                                <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2">
                                                    {blog.excerpt}
                                                </p>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </section>
            )}

            {/* Main Blog Grid */}
            <section className="py-16 bg-slate-50/50 dark:bg-slate-800/30">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        {/* Blog Grid - 2/3 */}
                        <div className="lg:col-span-2">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white font-outfit">
                                    সাম্প্রতিক পোস্ট
                                </h2>
                            </div>

                            {loading ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="bg-white dark:bg-slate-800 rounded-2xl p-5 animate-pulse">
                                            <div className="h-48 bg-slate-200 dark:bg-slate-700 rounded-xl mb-4" />
                                            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-3" />
                                            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2" />
                                        </div>
                                    ))}
                                </div>
                            ) : blogs.length === 0 ? (
                                <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700">
                                    <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-teal-500/20 to-cyan-500/20 flex items-center justify-center">
                                        <FiBookOpen className="text-teal-500" size={32} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">কোনো ব্লগ পাওয়া যায়নি</h3>
                                    <p className="text-slate-500">শীঘ্রই নতুন কন্টেন্ট আসছে!</p>
                                </div>
                            ) : (
                                <motion.div
                                    variants={containerVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                                >
                                    {blogs.map((blog) => (
                                        <motion.div key={blog._id} variants={itemVariants}>
                                            <Link href={`/blog/${blog.slug}`} className="group block bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-700 hover:shadow-2xl hover:border-teal-500/30 hover:-translate-y-1 transition-all duration-300">
                                                <div className="relative h-52 overflow-hidden">
                                                    {blog.thumbnail ? (
                                                        <Image src={blog.thumbnail} alt={blog.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                                                    ) : (
                                                        <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center">
                                                            <FiBookOpen className="text-slate-400" size={40} />
                                                        </div>
                                                    )}
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                                </div>
                                                <div className="p-5">
                                                    <div className="flex items-center gap-3 mb-3 text-sm text-slate-500 dark:text-slate-400">
                                                        <span className="flex items-center gap-1"><FiCalendar size={12} /> {new Date(blog.createdAt).toLocaleDateString('bn-BD')}</span>
                                                        <span className="flex items-center gap-1"><FiClock size={12} /> {blog.readingTime} min</span>
                                                    </div>
                                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors line-clamp-2 mb-3">
                                                        {blog.title}
                                                    </h3>
                                                    <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2 mb-4">
                                                        {blog.excerpt}
                                                    </p>
                                                    {blog.tags?.length > 0 && (
                                                        <div className="flex flex-wrap gap-2">
                                                            {blog.tags.slice(0, 3).map((tag, idx) => (
                                                                <span key={idx} className="px-3 py-1 text-xs font-medium rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400">
                                                                    #{tag}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </Link>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            )}

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex justify-center items-center gap-3 mt-12">
                                    <button
                                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                        disabled={currentPage === 1}
                                        className="w-12 h-12 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-400 disabled:opacity-50 hover:border-teal-500 hover:text-teal-600 transition-all"
                                    >
                                        <FiChevronLeft size={20} />
                                    </button>
                                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map((page) => (
                                        <button
                                            key={page}
                                            onClick={() => setCurrentPage(page)}
                                            className={`w-12 h-12 rounded-xl font-semibold transition-all ${currentPage === page
                                                    ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg shadow-teal-500/30'
                                                    : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-teal-500'
                                                }`}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                    <button
                                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                        disabled={currentPage === totalPages}
                                        className="w-12 h-12 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-400 disabled:opacity-50 hover:border-teal-500 hover:text-teal-600 transition-all"
                                    >
                                        <FiChevronRight size={20} />
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Sidebar - 1/3 */}
                        <aside className="space-y-8">
                            {/* Popular Posts */}
                            {popularBlogs.length > 0 && (
                                <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-100 dark:border-slate-700 shadow-lg">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center text-white">
                                            <FiTrendingUp size={18} />
                                        </div>
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">জনপ্রিয় পোস্ট</h3>
                                    </div>
                                    <div className="space-y-4">
                                        {popularBlogs.map((blog, index) => (
                                            <Link key={blog._id} href={`/blog/${blog.slug}`} className="group flex items-start gap-4">
                                                <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center text-slate-600 dark:text-slate-300 font-bold text-lg group-hover:from-teal-500 group-hover:to-cyan-500 group-hover:text-white transition-all">
                                                    {String(index + 1).padStart(2, '0')}
                                                </span>
                                                <div className="flex-1">
                                                    <h4 className="font-semibold text-slate-900 dark:text-white line-clamp-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors text-sm">
                                                        {blog.title}
                                                    </h4>
                                                    <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
                                                        <span className="flex items-center gap-1"><FiEye size={10} /> {blog.totalViews || 0}</span>
                                                        <span className="flex items-center gap-1"><FiHeart size={10} /> {blog.likeCount || 0}</span>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Newsletter CTA */}
                            <div className="relative overflow-hidden rounded-3xl p-8">
                                <div className="absolute inset-0 bg-gradient-to-br from-teal-500 via-cyan-500 to-blue-600" />
                                <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-10" />
                                <motion.div
                                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                    className="absolute top-0 right-0 w-40 h-40 bg-white/20 rounded-full blur-2xl"
                                />
                                <div className="relative z-10">
                                    <div className="text-4xl mb-4">📬</div>
                                    <h3 className="text-xl font-bold text-white mb-2">নিউজলেটার সাবস্ক্রাইব করুন</h3>
                                    <p className="text-white/80 text-sm mb-6">সাপ্তাহিক আপডেট পেতে সাবস্ক্রাইব করুন</p>
                                    <Link
                                        href="/contact"
                                        className="block text-center py-3.5 px-6 bg-white text-teal-600 font-bold rounded-xl hover:bg-white/90 hover:shadow-xl transition-all"
                                    >
                                        সাবস্ক্রাইব করুন
                                    </Link>
                                </div>
                            </div>

                            {/* Tags Cloud */}
                            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-100 dark:border-slate-700">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">ট্যাগসমূহ</h3>
                                <div className="flex flex-wrap gap-2">
                                    {['javascript', 'react', 'nextjs', 'typescript', 'nodejs', 'design', 'css', 'tutorial'].map((tag) => (
                                        <Link
                                            key={tag}
                                            href={`/blog?tag=${tag}`}
                                            className="px-4 py-2 text-sm font-medium rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-teal-500 hover:text-white transition-all"
                                        >
                                            #{tag}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>
        </div>
    );
}
