'use client';

import React, { useEffect, useState } from 'react';
import {
    FiBarChart2, FiTrendingUp, FiDollarSign, FiUsers,
    FiShoppingBag, FiBook, FiDownload, FiRefreshCw,
    FiCalendar
} from 'react-icons/fi';

export default function AnalyticsPage() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [dateRange, setDateRange] = useState('30');

    const BASE_URL = 'http://localhost:5000/api';

    const fetchAnalytics = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const res = await fetch(`${BASE_URL}/analytics/dashboard`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const result = await res.json();
            setData(result.data);
        } catch (err) {
            console.error('Error fetching analytics:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAnalytics();
    }, []);

    const stats = [
        {
            title: 'Total Revenue',
            value: `৳${(data?.totalRevenue || 0).toLocaleString()}`,
            icon: FiDollarSign,
            gradient: 'from-emerald-500 to-teal-500',
            change: '+18.2%',
            positive: true
        },
        {
            title: 'Total Users',
            value: data?.totalUsers || 0,
            icon: FiUsers,
            gradient: 'from-blue-500 to-indigo-500',
            change: '+12.5%',
            positive: true
        },
        {
            title: 'Total Orders',
            value: data?.totalOrders || 0,
            icon: FiShoppingBag,
            gradient: 'from-amber-500 to-orange-500',
            change: '+8.3%',
            positive: true
        },
        {
            title: 'Total Courses',
            value: data?.totalCourses || 0,
            icon: FiBook,
            gradient: 'from-violet-500 to-purple-500',
            change: '+5',
            positive: true
        },
        {
            title: 'Enrollments',
            value: data?.totalEnrollments || 0,
            icon: FiUsers,
            gradient: 'from-pink-500 to-rose-500',
            change: '+24.1%',
            positive: true
        },
        {
            title: 'Websites',
            value: data?.totalWebsites || 0,
            icon: FiBarChart2,
            gradient: 'from-cyan-500 to-blue-500',
            change: '+3',
            positive: true
        },
    ];

    const revenueBreakdown = [
        { label: 'Courses', value: data?.monthlyRevenue * 0.6 || 0, color: '#6366F1' },
        { label: 'Websites', value: data?.monthlyRevenue * 0.25 || 0, color: '#10B981' },
        { label: 'Software', value: data?.monthlyRevenue * 0.15 || 0, color: '#F59E0B' },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Analytics</h1>
                    <p className="text-slate-500 text-sm mt-1">Platform performance overview</p>
                </div>
                <div className="flex items-center gap-3">
                    <select
                        value={dateRange}
                        onChange={(e) => setDateRange(e.target.value)}
                        className="px-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none text-sm"
                    >
                        <option value="7">Last 7 days</option>
                        <option value="30">Last 30 days</option>
                        <option value="90">Last 90 days</option>
                        <option value="365">Last year</option>
                    </select>
                    <button
                        onClick={fetchAnalytics}
                        className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors"
                    >
                        <FiRefreshCw size={16} className={loading ? 'animate-spin' : ''} />
                        Refresh
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            {loading ? (
                <div className="flex items-center justify-center py-12">
                    <FiRefreshCw className="animate-spin text-indigo-500" size={32} />
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {stats.map((stat) => {
                            const Icon = stat.icon;
                            return (
                                <div key={stat.title} className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-2">{stat.title}</p>
                                            <p className="text-3xl font-bold text-slate-800">{stat.value}</p>
                                            <div className={`flex items-center gap-1 mt-2 text-xs font-semibold ${stat.positive ? 'text-emerald-600' : 'text-red-500'}`}>
                                                <FiTrendingUp size={12} />
                                                <span>{stat.change}</span>
                                            </div>
                                        </div>
                                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg`}>
                                            <Icon className="text-2xl text-white" />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Revenue Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Revenue Breakdown */}
                        <div className="bg-white rounded-2xl border border-slate-200 p-6">
                            <h3 className="text-lg font-bold text-slate-800 mb-6">Revenue by Category</h3>
                            <div className="space-y-4">
                                {revenueBreakdown.map((item) => (
                                    <div key={item.label}>
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="text-slate-600">{item.label}</span>
                                            <span className="font-semibold text-slate-800">৳{item.value.toLocaleString()}</span>
                                        </div>
                                        <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full rounded-full transition-all duration-500"
                                                style={{
                                                    width: `${(item.value / (data?.monthlyRevenue || 1)) * 100}%`,
                                                    backgroundColor: item.color
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-6 text-white">
                            <h3 className="text-lg font-bold mb-6">This Month Summary</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                                    <span className="text-slate-300">Monthly Revenue</span>
                                    <span className="text-2xl font-bold">৳{(data?.monthlyRevenue || 0).toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                                    <span className="text-slate-300">Today's Revenue</span>
                                    <span className="text-2xl font-bold text-emerald-400">৳{(data?.todayRevenue || 0).toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                                    <span className="text-slate-300">New Users This Month</span>
                                    <span className="text-2xl font-bold text-blue-400">+{data?.newUsersThisMonth || 0}</span>
                                </div>
                                <div className="flex justify-between items-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                                    <span className="text-slate-300">Completed Orders</span>
                                    <span className="text-2xl font-bold text-purple-400">{data?.completedOrders || 0}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Additional Stats Row */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
                            <p className="text-2xl font-bold text-slate-800">{data?.totalStudents || 0}</p>
                            <p className="text-xs text-slate-500 mt-1">Total Students</p>
                        </div>
                        <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
                            <p className="text-2xl font-bold text-slate-800">{data?.publishedCourses || 0}</p>
                            <p className="text-xs text-slate-500 mt-1">Published Courses</p>
                        </div>
                        <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
                            <p className="text-2xl font-bold text-slate-800">{data?.totalSoftware || 0}</p>
                            <p className="text-xs text-slate-500 mt-1">Total Software</p>
                        </div>
                        <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
                            <p className="text-2xl font-bold text-slate-800">{data?.pendingOrders || 0}</p>
                            <p className="text-xs text-slate-500 mt-1">Pending Orders</p>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
