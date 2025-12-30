'use client';

import React, { useEffect, useState } from 'react';
import {
    FiStar, FiSearch, FiRefreshCw, FiTrash2,
    FiChevronLeft, FiChevronRight, FiUser, FiMessageCircle
} from 'react-icons/fi';

export default function ReviewsPage() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [deleteModal, setDeleteModal] = useState({ show: false, id: null });

    const BASE_URL = 'http://localhost:5000/api';

    const fetchReviews = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const res = await fetch(`${BASE_URL}/reviews`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            setReviews(data.data || []);
        } catch (err) {
            console.error('Error fetching reviews:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('token');
            await fetch(`${BASE_URL}/reviews/${deleteModal.id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setDeleteModal({ show: false, id: null });
            fetchReviews();
        } catch (err) {
            console.error('Delete error:', err);
        }
    };

    const filteredReviews = reviews.filter(review =>
        review.user?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.comment?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const itemsPerPage = 10;
    const totalPages = Math.ceil(filteredReviews.length / itemsPerPage);
    const paginatedReviews = filteredReviews.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const renderStars = (rating) => {
        return [...Array(5)].map((_, i) => (
            <FiStar
                key={i}
                size={14}
                className={i < rating ? 'text-amber-400 fill-amber-400' : 'text-slate-300'}
            />
        ));
    };

    // Stats
    const avgRating = reviews.length > 0
        ? (reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length).toFixed(1)
        : 0;
    const fiveStarCount = reviews.filter(r => r.rating === 5).length;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Reviews</h1>
                    <p className="text-slate-500 text-sm mt-1">Manage customer reviews and ratings</p>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-2xl border border-slate-200 p-5">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white">
                            <FiStar size={24} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-slate-800">{avgRating}</p>
                            <p className="text-sm text-slate-500">Average Rating</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl border border-slate-200 p-5">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white">
                            <FiMessageCircle size={24} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-slate-800">{reviews.length}</p>
                            <p className="text-sm text-slate-500">Total Reviews</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl border border-slate-200 p-5">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white">
                            <FiStar size={24} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-slate-800">{fiveStarCount}</p>
                            <p className="text-sm text-slate-500">5-Star Reviews</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search reviews..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
                        />
                    </div>
                    <button
                        onClick={fetchReviews}
                        className="flex items-center gap-2 px-4 py-3 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-600 transition-colors"
                    >
                        <FiRefreshCw size={16} />
                        Refresh
                    </button>
                </div>
            </div>

            {/* Reviews Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {loading ? (
                    <div className="col-span-2 py-12 text-center">
                        <FiRefreshCw className="animate-spin mx-auto mb-2 text-indigo-500" size={24} />
                        <p className="text-slate-500">Loading reviews...</p>
                    </div>
                ) : paginatedReviews.length === 0 ? (
                    <div className="col-span-2 py-12 text-center text-slate-500">
                        No reviews found
                    </div>
                ) : (
                    paginatedReviews.map((review) => (
                        <div key={review._id} className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-lg transition-shadow">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
                                        {review.user?.firstName?.charAt(0) || 'U'}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-800">{review.user?.firstName} {review.user?.lastName}</p>
                                        <div className="flex items-center gap-1 mt-0.5">
                                            {renderStars(review.rating)}
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setDeleteModal({ show: true, id: review._id })}
                                    className="p-2 rounded-lg hover:bg-red-100 text-red-500 transition-colors"
                                >
                                    <FiTrash2 size={16} />
                                </button>
                            </div>
                            <p className="text-slate-600 text-sm leading-relaxed mb-3">{review.comment}</p>
                            <div className="pt-3 border-t border-slate-100">
                                <p className="text-xs text-slate-400">
                                    Product: <span className="text-slate-600">{review.product?.title || review.website?.title || 'N/A'}</span>
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2">
                    <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-50"
                    >
                        <FiChevronLeft size={16} />
                    </button>
                    <span className="px-4 py-2 text-sm text-slate-600">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-50"
                    >
                        <FiChevronRight size={16} />
                    </button>
                </div>
            )}

            {/* Delete Modal */}
            {deleteModal.show && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 shadow-2xl">
                        <h3 className="text-lg font-bold text-slate-800 mb-2">Delete Review</h3>
                        <p className="text-slate-600 mb-6">
                            Are you sure you want to delete this review? This action cannot be undone.
                        </p>
                        <div className="flex items-center gap-3 justify-end">
                            <button
                                onClick={() => setDeleteModal({ show: false, id: null })}
                                className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-5 py-2.5 rounded-xl bg-red-600 text-white hover:bg-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
