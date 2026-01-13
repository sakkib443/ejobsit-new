'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FiArrowLeft,
    FiClock,
    FiUser,
    FiCalendar,
    FiHeart,
    FiMessageCircle,
    FiShare2,
    FiBookOpen,
    FiTag,
    FiEye,
    FiSend,
    FiTwitter,
    FiFacebook,
    FiLinkedin,
    FiCopy,
    FiCheck,
    FiArrowRight,
    FiBookmark,
    FiPlay,
} from 'react-icons/fi';
import { API_BASE_URL } from '@/config/api';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

export default function SingleBlogPage() {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug;
    const user = useSelector(state => state.auth?.user);

    const [blog, setBlog] = useState(null);
    const [relatedBlogs, setRelatedBlogs] = useState([]);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [commentText, setCommentText] = useState('');
    const [submittingComment, setSubmittingComment] = useState(false);
    const [showShareMenu, setShowShareMenu] = useState(false);
    const [copied, setCopied] = useState(false);
    const [readProgress, setReadProgress] = useState(0);

    // Reading progress bar
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrollTop / docHeight) * 100;
            setReadProgress(Math.min(100, Math.max(0, progress)));
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Fetch blog data
    useEffect(() => {
        const fetchBlog = async () => {
            if (!slug) return;

            setLoading(true);
            try {
                const token = localStorage.getItem('accessToken');
                const headers = token ? { Authorization: `Bearer ${token}` } : {};

                const res = await fetch(`${API_BASE_URL}/blogs/slug/${slug}`, { headers });
                const data = await res.json();

                if (data.success && data.data) {
                    setBlog(data.data);
                    setRelatedBlogs(data.data.relatedBlogs || []);
                    setIsLiked(data.data.isLiked || false);
                    setLikeCount(data.data.likeCount || 0);

                    const commentsRes = await fetch(`${API_BASE_URL}/blogs/${data.data._id}/comments`);
                    const commentsData = await commentsRes.json();
                    if (commentsData.success) setComments(commentsData.data || []);
                } else {
                    router.push('/blog');
                }
            } catch (error) {
                console.error('Failed to fetch blog:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchBlog();
    }, [slug, router]);

    const handleLike = async () => {
        if (!user) { toast.error('লগইন করুন'); return; }
        try {
            const token = localStorage.getItem('accessToken');
            const res = await fetch(`${API_BASE_URL}/blogs/${blog._id}/toggle-like`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            if (data.success) {
                setIsLiked(data.data.isLiked);
                setLikeCount(data.data.likeCount);
            }
        } catch (error) {
            toast.error('Failed to like');
        }
    };

    const handleSubmitComment = async (e) => {
        e.preventDefault();
        if (!user) { toast.error('লগইন করুন'); return; }
        if (!commentText.trim()) return;

        setSubmittingComment(true);
        try {
            const token = localStorage.getItem('accessToken');
            const res = await fetch(`${API_BASE_URL}/blogs/${blog._id}/comments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({ content: commentText }),
            });
            const data = await res.json();
            if (data.success) {
                setComments([data.data, ...comments]);
                setCommentText('');
                toast.success('মন্তব্য যোগ হয়েছে!');
            }
        } catch (error) {
            toast.error('Failed to add comment');
        } finally {
            setSubmittingComment(false);
        }
    };

    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
    const shareTitle = blog?.title || '';

    const handleShare = (platform) => {
        const urls = {
            twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
        };
        if (urls[platform]) window.open(urls[platform], '_blank', 'width=600,height=400');
        setShowShareMenu(false);
    };

    const copyLink = () => {
        navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        toast.success('লিংক কপি হয়েছে!');
        setTimeout(() => setCopied(false), 2000);
        setShowShareMenu(false);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white dark:bg-slate-900 flex items-center justify-center">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 border-4 border-teal-500/30 border-t-teal-500 rounded-full"
                />
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="min-h-screen bg-white dark:bg-slate-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-teal-500/20 to-cyan-500/20 flex items-center justify-center">
                        <FiBookOpen className="text-teal-500" size={40} />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">ব্লগ পাওয়া যায়নি</h2>
                    <Link href="/blog" className="text-teal-500 font-semibold hover:underline">← ব্লগে ফিরে যান</Link>
                </div>
            </div>
        );
    }

    return (
        <>
            {/* Reading Progress Bar */}
            <div className="fixed top-0 left-0 right-0 h-1 z-50">
                <motion.div
                    style={{ width: `${readProgress}%` }}
                    className="h-full bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500"
                />
            </div>

            <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">

                {/* Epic Hero Banner */}
                <div className="relative h-[70vh] md:h-[80vh] overflow-hidden">
                    {/* Background */}
                    <div className="absolute inset-0">
                        {blog.thumbnail ? (
                            <Image src={blog.thumbnail} alt={blog.title} fill className="object-cover" priority />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-700" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />

                        {/* Animated overlay */}
                        <motion.div
                            animate={{ opacity: [0.3, 0.5, 0.3] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-transparent"
                        />
                    </div>

                    {/* Back Button - Fixed */}
                    <div className="absolute top-6 left-6 z-20">
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white/20 transition-all"
                        >
                            <FiArrowLeft size={18} />
                            <span className="font-medium">ব্লগ</span>
                        </Link>
                    </div>

                    {/* Content */}
                    <div className="relative h-full container mx-auto px-4 flex flex-col justify-end pb-16 md:pb-20">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="max-w-4xl"
                        >
                            {/* Category & Reading Time */}
                            <div className="flex flex-wrap items-center gap-3 mb-6">
                                {blog.category && (
                                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-sm font-semibold shadow-lg shadow-teal-500/30">
                                        {blog.category.name}
                                    </span>
                                )}
                                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-white text-sm">
                                    <FiClock size={14} /> {blog.readingTime} মিনিট পড়া
                                </span>
                                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-white text-sm">
                                    <FiEye size={14} /> {blog.totalViews || 0} ভিউ
                                </span>
                            </div>

                            {/* Title */}
                            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-outfit text-white leading-tight mb-8">
                                {blog.title}
                            </h1>

                            {/* Author & Date */}
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-4">
                                    <div className="relative">
                                        {blog.author?.avatar ? (
                                            <Image src={blog.author.avatar} alt={blog.author.firstName} width={56} height={56} className="rounded-full border-3 border-white/30" />
                                        ) : (
                                            <div className="w-14 h-14 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 flex items-center justify-center text-white text-xl font-bold border-3 border-white/30">
                                                {blog.author?.firstName?.[0]}
                                            </div>
                                        )}
                                        <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white" />
                                    </div>
                                    <div>
                                        <p className="text-white font-bold text-lg">
                                            {blog.author?.firstName} {blog.author?.lastName}
                                        </p>
                                        <p className="text-white/60 text-sm">
                                            {new Date(blog.publishedAt || blog.createdAt).toLocaleDateString('bn-BD', {
                                                year: 'numeric', month: 'long', day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Scroll Indicator */}
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute bottom-8 left-1/2 -translate-x-1/2"
                    >
                        <div className="w-8 h-12 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
                            <motion.div
                                animate={{ y: [0, 16, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="w-2 h-2 rounded-full bg-white"
                            />
                        </div>
                    </motion.div>
                </div>

                {/* Content Section */}
                <div className="container mx-auto px-4 py-12 md:py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                        {/* Sticky Social Bar - Left */}
                        <div className="hidden lg:block lg:col-span-1">
                            <div className="sticky top-24 flex flex-col items-center gap-4">
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleLike}
                                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${isLiked
                                            ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-500/30'
                                            : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-rose-100 hover:text-rose-500'
                                        }`}
                                >
                                    <FiHeart size={20} className={isLiked ? 'fill-current' : ''} />
                                </motion.button>
                                <span className="text-sm font-bold text-slate-600 dark:text-slate-400">{likeCount}</span>

                                <div className="w-8 h-px bg-slate-200 dark:bg-slate-700 my-2" />

                                <button className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
                                    <FiMessageCircle size={20} />
                                </button>
                                <span className="text-sm font-bold text-slate-600 dark:text-slate-400">{comments.length}</span>

                                <div className="w-8 h-px bg-slate-200 dark:bg-slate-700 my-2" />

                                <button className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
                                    <FiBookmark size={20} />
                                </button>

                                <div className="relative">
                                    <button
                                        onClick={() => setShowShareMenu(!showShareMenu)}
                                        className="w-12 h-12 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-white flex items-center justify-center shadow-lg shadow-teal-500/30 hover:shadow-xl transition-all"
                                    >
                                        <FiShare2 size={20} />
                                    </button>
                                    <AnimatePresence>
                                        {showShareMenu && (
                                            <motion.div
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -10 }}
                                                className="absolute left-full ml-3 top-0 py-2 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 min-w-[140px]"
                                            >
                                                <button onClick={() => handleShare('twitter')} className="w-full px-4 py-2 flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300">
                                                    <FiTwitter className="text-sky-500" /> Twitter
                                                </button>
                                                <button onClick={() => handleShare('facebook')} className="w-full px-4 py-2 flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300">
                                                    <FiFacebook className="text-blue-600" /> Facebook
                                                </button>
                                                <button onClick={() => handleShare('linkedin')} className="w-full px-4 py-2 flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300">
                                                    <FiLinkedin className="text-blue-700" /> LinkedIn
                                                </button>
                                                <hr className="my-2 border-slate-100 dark:border-slate-700" />
                                                <button onClick={copyLink} className="w-full px-4 py-2 flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300">
                                                    {copied ? <FiCheck className="text-green-500" /> : <FiCopy />} {copied ? 'Copied!' : 'Copy'}
                                                </button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>

                        {/* Main Content */}
                        <motion.article
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="lg:col-span-7"
                        >
                            {/* Excerpt Box */}
                            <div className="relative mb-12 p-8 rounded-3xl bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 border border-teal-100 dark:border-teal-800/50">
                                <div className="absolute top-0 left-8 -translate-y-1/2 px-4 py-1 bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-sm font-semibold rounded-full">
                                    সারসংক্ষেপ
                                </div>
                                <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed italic">
                                    "{blog.excerpt}"
                                </p>
                            </div>

                            {/* Blog Content */}
                            <div
                                className="prose prose-lg max-w-none 
                                    prose-headings:font-outfit prose-headings:text-slate-900 dark:prose-headings:text-white 
                                    prose-p:text-slate-600 dark:prose-p:text-slate-300 prose-p:leading-relaxed
                                    prose-a:text-teal-600 dark:prose-a:text-teal-400 prose-a:no-underline hover:prose-a:underline
                                    prose-strong:text-slate-900 dark:prose-strong:text-white 
                                    prose-img:rounded-2xl prose-img:shadow-xl
                                    prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-pre:rounded-2xl
                                    prose-blockquote:border-teal-500 prose-blockquote:bg-slate-50 dark:prose-blockquote:bg-slate-800/50 prose-blockquote:rounded-r-2xl prose-blockquote:py-4
                                    prose-li:text-slate-600 dark:prose-li:text-slate-300"
                                dangerouslySetInnerHTML={{ __html: blog.content }}
                            />

                            {/* Video Section */}
                            {blog.videoUrl && (
                                <div className="mt-12 p-6 bg-slate-900 rounded-3xl">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-red-500 to-rose-500 flex items-center justify-center text-white">
                                            <FiPlay size={18} />
                                        </div>
                                        <h3 className="text-white font-bold">ভিডিও টিউটোরিয়াল</h3>
                                    </div>
                                    <div className="aspect-video rounded-2xl overflow-hidden bg-slate-800">
                                        <iframe src={blog.videoUrl} className="w-full h-full" allowFullScreen />
                                    </div>
                                </div>
                            )}

                            {/* Tags */}
                            {blog.tags?.length > 0 && (
                                <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
                                    <div className="flex items-center gap-3 flex-wrap">
                                        <FiTag className="text-slate-400" size={20} />
                                        {blog.tags.map((tag, idx) => (
                                            <Link
                                                key={idx}
                                                href={`/blog?tag=${tag}`}
                                                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm font-medium hover:bg-teal-500 hover:text-white transition-all"
                                            >
                                                #{tag}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Mobile Social Bar */}
                            <div className="lg:hidden mt-10 p-6 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-around">
                                <button onClick={handleLike} className={`flex flex-col items-center gap-1 ${isLiked ? 'text-rose-500' : 'text-slate-500'}`}>
                                    <FiHeart size={24} className={isLiked ? 'fill-current' : ''} />
                                    <span className="text-xs font-bold">{likeCount}</span>
                                </button>
                                <button className="flex flex-col items-center gap-1 text-slate-500">
                                    <FiMessageCircle size={24} />
                                    <span className="text-xs font-bold">{comments.length}</span>
                                </button>
                                <button onClick={() => setShowShareMenu(!showShareMenu)} className="flex flex-col items-center gap-1 text-teal-500">
                                    <FiShare2 size={24} />
                                    <span className="text-xs font-bold">Share</span>
                                </button>
                            </div>

                            {/* Author Card */}
                            <div className="mt-12 p-8 bg-gradient-to-br from-slate-50 to-teal-50/50 dark:from-slate-800 dark:to-teal-900/20 rounded-3xl border border-slate-100 dark:border-slate-700">
                                <div className="flex items-start gap-6">
                                    {blog.author?.avatar ? (
                                        <Image src={blog.author.avatar} alt={blog.author.firstName} width={80} height={80} className="rounded-2xl" />
                                    ) : (
                                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-500 flex items-center justify-center text-white text-3xl font-bold">
                                            {blog.author?.firstName?.[0]}
                                        </div>
                                    )}
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                                                {blog.author?.firstName} {blog.author?.lastName}
                                            </h4>
                                            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 capitalize">
                                                {blog.authorRole}
                                            </span>
                                        </div>
                                        <p className="text-slate-500 dark:text-slate-400 mb-4">
                                            এই প্ল্যাটফর্মের একজন নিবেদিতপ্রাণ কন্টেন্ট ক্রিয়েটর। নতুন জ্ঞান শেয়ার করতে ভালোবাসেন।
                                        </p>
                                        <Link href={`/blog?author=${blog.author?._id}`} className="inline-flex items-center gap-2 text-teal-600 dark:text-teal-400 font-semibold hover:gap-3 transition-all">
                                            সব আর্টিকেল দেখুন <FiArrowRight />
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Comments Section */}
                            <div className="mt-16">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white">
                                        <FiMessageCircle size={22} />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">মন্তব্য</h3>
                                        <p className="text-slate-400 text-sm">{comments.length} টি মন্তব্য</p>
                                    </div>
                                </div>

                                {/* Comment Form */}
                                {blog.allowComments && (
                                    <form onSubmit={handleSubmitComment} className="mb-10 p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-lg">
                                        <textarea
                                            value={commentText}
                                            onChange={(e) => setCommentText(e.target.value)}
                                            placeholder={user ? "আপনার মতামত লিখুন..." : "মন্তব্য করতে লগইন করুন"}
                                            disabled={!user}
                                            rows={4}
                                            className="w-full px-5 py-4 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 resize-none focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 text-slate-800 dark:text-white placeholder-slate-400 disabled:opacity-60"
                                        />
                                        <div className="flex justify-end mt-4">
                                            <button
                                                type="submit"
                                                disabled={!user || !commentText.trim() || submittingComment}
                                                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold disabled:opacity-50 hover:shadow-lg transition-all"
                                            >
                                                <FiSend size={16} />
                                                {submittingComment ? 'পোস্ট হচ্ছে...' : 'মন্তব্য করুন'}
                                            </button>
                                        </div>
                                    </form>
                                )}

                                {/* Comments List */}
                                <div className="space-y-4">
                                    {comments.length === 0 ? (
                                        <div className="text-center py-12 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                                            <FiMessageCircle className="mx-auto text-slate-300 dark:text-slate-600 mb-4" size={40} />
                                            <p className="text-slate-500">কোনো মন্তব্য নেই। প্রথম মন্তব্য করুন!</p>
                                        </div>
                                    ) : (
                                        comments.map((comment, idx) => (
                                            <motion.div
                                                key={comment._id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: idx * 0.1 }}
                                                className="p-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700"
                                            >
                                                <div className="flex items-start gap-4">
                                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-slate-400 to-slate-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                                                        {comment.user?.firstName?.[0] || 'U'}
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-3 mb-2">
                                                            <span className="font-semibold text-slate-900 dark:text-white">
                                                                {comment.user?.firstName} {comment.user?.lastName}
                                                            </span>
                                                            <span className="text-xs text-slate-400">
                                                                {new Date(comment.createdAt).toLocaleDateString('bn-BD')}
                                                            </span>
                                                        </div>
                                                        <p className="text-slate-600 dark:text-slate-300">{comment.content}</p>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </motion.article>

                        {/* Sidebar */}
                        <aside className="lg:col-span-4">
                            <div className="sticky top-24 space-y-8">
                                {/* Related Posts */}
                                {relatedBlogs.length > 0 && (
                                    <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-100 dark:border-slate-700 shadow-lg">
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center text-white">
                                                <FiBookOpen size={18} />
                                            </div>
                                            সম্পর্কিত পোস্ট
                                        </h3>
                                        <div className="space-y-4">
                                            {relatedBlogs.map((related) => (
                                                <Link key={related._id} href={`/blog/${related.slug}`} className="group flex gap-4">
                                                    <div className="w-20 h-16 relative rounded-xl overflow-hidden flex-shrink-0">
                                                        {related.thumbnail ? (
                                                            <Image src={related.thumbnail} alt={related.title} fill className="object-cover group-hover:scale-110 transition-transform" />
                                                        ) : (
                                                            <div className="w-full h-full bg-slate-100 dark:bg-slate-700" />
                                                        )}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="font-medium text-slate-900 dark:text-white line-clamp-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors text-sm">
                                                            {related.title}
                                                        </h4>
                                                        <span className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                                                            <FiClock size={10} /> {related.readingTime} min
                                                        </span>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* CTA */}
                                <div className="relative overflow-hidden rounded-3xl p-8">
                                    <div className="absolute inset-0 bg-gradient-to-br from-teal-500 via-cyan-500 to-blue-600" />
                                    <motion.div
                                        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
                                        transition={{ duration: 5, repeat: Infinity }}
                                        className="absolute top-0 right-0 w-40 h-40 bg-white/20 rounded-full blur-2xl"
                                    />
                                    <div className="relative z-10 text-center">
                                        <div className="text-5xl mb-4">🚀</div>
                                        <h3 className="text-xl font-bold text-white mb-2">আরও শিখতে চান?</h3>
                                        <p className="text-white/80 text-sm mb-6">আমাদের সব ব্লগ পোস্ট এক জায়গায়</p>
                                        <Link href="/blog" className="inline-block py-3 px-8 bg-white text-teal-600 font-bold rounded-xl hover:shadow-xl transition-all">
                                            সব ব্লগ দেখুন
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        </>
    );
}
