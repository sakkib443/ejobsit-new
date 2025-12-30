'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
    FiUserCheck, FiSearch, FiFilter, FiRefreshCw,
    FiChevronLeft, FiChevronRight, FiEye, FiBook, FiUser, FiCalendar
} from 'react-icons/fi';

export default function EnrollmentsPage() {
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const BASE_URL = 'http://localhost:5000/api';

    const fetchEnrollments = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const res = await fetch(`${BASE_URL}/enrollments`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            setEnrollments(data.data || []);
        } catch (err) {
            console.error('Error fetching enrollments:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEnrollments();
    }, []);

    const filteredEnrollments = enrollments.filter(enroll =>
        enroll.user?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        enroll.course?.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const itemsPerPage = 10;
    const totalPages = Math.ceil(filteredEnrollments.length / itemsPerPage);
    const paginatedEnrollments = filteredEnrollments.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const getStatusStyle = (status) => {
        switch (status) {
            case 'active': return 'bg-emerald-100 text-emerald-700';
            case 'completed': return 'bg-blue-100 text-blue-700';
            case 'expired': return 'bg-red-100 text-red-700';
            default: return 'bg-slate-100 text-slate-700';
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Enrollments</h1>
                    <p className="text-slate-500 text-sm mt-1">Manage student course enrollments</p>
                </div>
                <div className="flex items-center gap-2 text-sm">
                    <span className="px-3 py-1.5 bg-indigo-100 text-indigo-700 rounded-lg font-medium">
                        Total: {enrollments.length}
                    </span>
                </div>
            </div>

            {/* Search */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search by student or course..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
                        />
                    </div>
                    <button
                        onClick={fetchEnrollments}
                        className="flex items-center gap-2 px-4 py-3 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-600 transition-colors"
                    >
                        <FiRefreshCw size={16} />
                        Refresh
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Student</th>
                                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Course</th>
                                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Enrolled At</th>
                                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Progress</th>
                                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center">
                                        <FiRefreshCw className="animate-spin mx-auto mb-2 text-indigo-500" size={24} />
                                        <p className="text-slate-500">Loading enrollments...</p>
                                    </td>
                                </tr>
                            ) : paginatedEnrollments.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                                        No enrollments found
                                    </td>
                                </tr>
                            ) : (
                                paginatedEnrollments.map((enroll) => (
                                    <tr key={enroll._id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
                                                    {enroll.user?.firstName?.charAt(0) || 'U'}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-slate-800">{enroll.user?.firstName} {enroll.user?.lastName}</p>
                                                    <p className="text-sm text-slate-500">{enroll.user?.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="font-medium text-slate-700">{enroll.course?.title || 'N/A'}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-slate-600">
                                                <FiCalendar size={14} />
                                                <span className="text-sm">
                                                    {enroll.enrolledAt ? new Date(enroll.enrolledAt).toLocaleDateString() : 'N/A'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                                                        style={{ width: `${enroll.progress || 0}%` }}
                                                    />
                                                </div>
                                                <span className="text-sm text-slate-600 font-medium">{enroll.progress || 0}%</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(enroll.status)}`}>
                                                {enroll.status || 'active'}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100">
                        <p className="text-sm text-slate-500">
                            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredEnrollments.length)} of {filteredEnrollments.length}
                        </p>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-50"
                            >
                                <FiChevronLeft size={16} />
                            </button>
                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-50"
                            >
                                <FiChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
