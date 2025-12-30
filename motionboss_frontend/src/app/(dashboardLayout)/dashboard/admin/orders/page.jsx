'use client';

import React, { useEffect, useState } from 'react';
import {
    FiShoppingBag, FiSearch, FiRefreshCw, FiEye,
    FiChevronLeft, FiChevronRight, FiCalendar, FiUser,
    FiDollarSign, FiPackage, FiCheck, FiClock, FiX
} from 'react-icons/fi';

export default function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const BASE_URL = 'http://localhost:5000/api';

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const res = await fetch(`${BASE_URL}/orders`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            setOrders(data.data || []);
        } catch (err) {
            console.error('Error fetching orders:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const updateOrderStatus = async (orderId, status) => {
        try {
            const token = localStorage.getItem('token');
            await fetch(`${BASE_URL}/orders/${orderId}/status`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status })
            });
            fetchOrders();
        } catch (err) {
            console.error('Update error:', err);
        }
    };

    const filteredOrders = orders.filter(order =>
        order.orderNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.user?.firstName?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const itemsPerPage = 10;
    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
    const paginatedOrders = filteredOrders.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const getStatusStyle = (status) => {
        switch (status) {
            case 'completed': return 'bg-emerald-100 text-emerald-700';
            case 'pending': return 'bg-amber-100 text-amber-700';
            case 'processing': return 'bg-blue-100 text-blue-700';
            case 'cancelled': return 'bg-red-100 text-red-700';
            default: return 'bg-slate-100 text-slate-700';
        }
    };

    const getPaymentStyle = (status) => {
        switch (status) {
            case 'completed': return 'bg-emerald-100 text-emerald-700';
            case 'pending': return 'bg-amber-100 text-amber-700';
            case 'failed': return 'bg-red-100 text-red-700';
            default: return 'bg-slate-100 text-slate-700';
        }
    };

    // Stats
    const totalRevenue = orders.filter(o => o.paymentStatus === 'completed').reduce((sum, o) => sum + (o.totalAmount || 0), 0);
    const pendingOrders = orders.filter(o => o.paymentStatus === 'pending').length;
    const completedOrders = orders.filter(o => o.paymentStatus === 'completed').length;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Orders</h1>
                    <p className="text-slate-500 text-sm mt-1">Manage all customer orders</p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-2xl border border-slate-200 p-5">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white">
                            <FiDollarSign size={24} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-slate-800">৳{totalRevenue.toLocaleString()}</p>
                            <p className="text-sm text-slate-500">Total Revenue</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl border border-slate-200 p-5">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white">
                            <FiClock size={24} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-slate-800">{pendingOrders}</p>
                            <p className="text-sm text-slate-500">Pending Orders</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl border border-slate-200 p-5">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white">
                            <FiCheck size={24} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-slate-800">{completedOrders}</p>
                            <p className="text-sm text-slate-500">Completed Orders</p>
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
                            placeholder="Search by order number or customer..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
                        />
                    </div>
                    <button
                        onClick={fetchOrders}
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
                                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Order ID</th>
                                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Customer</th>
                                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Items</th>
                                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Amount</th>
                                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Payment</th>
                                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                                <th className="text-right px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center">
                                        <FiRefreshCw className="animate-spin mx-auto mb-2 text-indigo-500" size={24} />
                                        <p className="text-slate-500">Loading orders...</p>
                                    </td>
                                </tr>
                            ) : paginatedOrders.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                                        No orders found
                                    </td>
                                </tr>
                            ) : (
                                paginatedOrders.map((order) => (
                                    <tr key={order._id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <span className="font-semibold text-indigo-600">#{order.orderNumber || order._id?.slice(-6).toUpperCase()}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
                                                    {order.user?.firstName?.charAt(0) || 'U'}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-slate-800 text-sm">{order.user?.firstName} {order.user?.lastName}</p>
                                                    <p className="text-xs text-slate-500">{order.user?.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-slate-600">{order.items?.length || 0} items</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="font-bold text-emerald-600">৳{order.totalAmount?.toLocaleString()}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getPaymentStyle(order.paymentStatus)}`}>
                                                {order.paymentStatus}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-slate-600">
                                                {order.orderDate ? new Date(order.orderDate).toLocaleDateString() : 'N/A'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => setSelectedOrder(order)}
                                                className="p-2 rounded-lg hover:bg-indigo-100 text-indigo-600 transition-colors"
                                            >
                                                <FiEye size={16} />
                                            </button>
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
                            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredOrders.length)} of {filteredOrders.length}
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

            {/* Order Detail Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
                        <div className="p-6 border-b border-slate-100">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-bold text-slate-800">Order #{selectedOrder.orderNumber || selectedOrder._id?.slice(-6).toUpperCase()}</h3>
                                <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-slate-100 rounded-lg">
                                    <FiX size={20} />
                                </button>
                            </div>
                        </div>
                        <div className="p-6 space-y-6">
                            {/* Customer Info */}
                            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
                                    {selectedOrder.user?.firstName?.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-semibold text-slate-800">{selectedOrder.user?.firstName} {selectedOrder.user?.lastName}</p>
                                    <p className="text-sm text-slate-500">{selectedOrder.user?.email}</p>
                                </div>
                            </div>

                            {/* Items */}
                            <div>
                                <h4 className="font-semibold text-slate-800 mb-3">Order Items</h4>
                                <div className="space-y-2">
                                    {selectedOrder.items?.map((item, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                                            <span className="text-slate-700">{item.title || item.name}</span>
                                            <span className="font-semibold text-slate-800">৳{item.price?.toLocaleString()}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Total */}
                            <div className="flex items-center justify-between p-4 bg-indigo-50 rounded-xl">
                                <span className="font-semibold text-slate-700">Total Amount</span>
                                <span className="text-2xl font-bold text-indigo-600">৳{selectedOrder.totalAmount?.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
