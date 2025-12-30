"use client";

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '@/redux/cartSlice';
import { createOrder, resetOrderState } from '@/redux/orderSlice';
import { useRouter } from 'next/navigation';
import { LuShieldCheck, LuPackage, LuCreditCard, LuChevronLeft, LuBadgeCheck } from 'react-icons/lu';
import { useLanguage } from '@/context/LanguageContext';
import toast from 'react-hot-toast';

const CheckoutPage = () => {
    const { items, totalAmount } = useSelector((state) => state.cart || { items: [], totalAmount: 0 });
    const { loading, success, error } = useSelector((state) => state.order || {});
    const dispatch = useDispatch();
    const router = useRouter();
    const { language } = useLanguage();
    const [isSuccessLocal, setIsSuccessLocal] = useState(false);

    // Auth Check
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error("Please login to place an order");
            router.push('/login?redirect=/checkout');
        }
    }, [router]);

    // Handle order success
    useEffect(() => {
        if (success) {
            setIsSuccessLocal(true);
            dispatch(clearCart());
            dispatch(resetOrderState());

            // Redirect after success animation
            setTimeout(() => {
                router.push('/dashboard/user/purchases');
            }, 3000);
        }
        if (error) {
            toast.error(error);
            dispatch(resetOrderState());
        }
    }, [success, error, dispatch, router]);

    // Form state
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: ''
    });

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (user) {
            setFormData({
                fullName: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
                email: user.email || '',
                phone: user.phone || '',
                address: user.address || ''
            });
        }
    }, []);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePlaceOrder = (e) => {
        e.preventDefault();

        const orderData = {
            items: items.map(item => ({
                productId: item.id,
                productType: item.type, // 'software' or 'website'
                title: item.title,
                price: item.price,
                image: item.image
            })),
            paymentMethod: 'stripe', // Defaulting to stripe for simulation
            paymentStatus: 'completed' // Assuming payment is successful for this simulation
        };

        dispatch(createOrder(orderData));
    };

    if (isSuccessLocal) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
                <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-8 animate-[bounce_1s_infinite]">
                    <LuBadgeCheck className="text-green-500 text-5xl" />
                </div>
                <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tighter uppercase">Order Placed Successfully!</h1>
                <p className="text-gray-500 text-lg font-medium text-center max-w-md">
                    Thank you for your purchase. Your digital assets are ready. You will be redirected to your dashboard shortly.
                </p>
            </div>
        );
    }

    if (items.length === 0 && !isSuccessLocal) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
                <button onClick={() => router.push('/software')} className="px-6 py-2 bg-[#41bfb8] text-white rounded-lg font-bold">
                    Browse Products
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 lg:py-20">
            <div className="container mx-auto px-4 lg:px-16">
                <div className="flex flex-col lg:flex-row gap-12">

                    {/* Left: Billing Form */}
                    <div className="flex-1 space-y-10">
                        <div className="flex items-center gap-4">
                            <button onClick={() => router.back()} className="p-3 bg-white rounded-xl shadow-sm hover:text-[#41bfb8] transition-all">
                                <LuChevronLeft size={20} />
                            </button>
                            <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tighter italic">Checkout</h1>
                        </div>

                        <div className="bg-white p-8 lg:p-12 rounded-[2.5rem] border border-gray-100 shadow-xl space-y-10">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-[#41bfb8]/10 rounded-2xl flex items-center justify-center text-[#41bfb8]">
                                    <LuCreditCard size={24} />
                                </div>
                                <h2 className="text-2xl font-black text-gray-900 uppercase">Billing Information</h2>
                            </div>

                            <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-xs font-black uppercase text-gray-400 tracking-widest pl-1">Full Name</label>
                                    <input
                                        type="text" required name="fullName" value={formData.fullName} onChange={handleInputChange}
                                        placeholder="John Doe"
                                        className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-1 focus:ring-[#41bfb8] transition-all font-bold text-gray-800 placeholder:text-gray-300"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase text-gray-400 tracking-widest pl-1">Email Address</label>
                                    <input
                                        type="email" required name="email" value={formData.email} onChange={handleInputChange}
                                        placeholder="john@example.com"
                                        className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-1 focus:ring-[#41bfb8] transition-all font-bold text-gray-800 placeholder:text-gray-300"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase text-gray-400 tracking-widest pl-1">Phone Number</label>
                                    <input
                                        type="text" required name="phone" value={formData.phone} onChange={handleInputChange}
                                        placeholder="+880 1XXX-XXXXXX"
                                        className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-1 focus:ring-[#41bfb8] transition-all font-bold text-gray-800 placeholder:text-gray-300"
                                    />
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-xs font-black uppercase text-gray-400 tracking-widest pl-1">Complete Address</label>
                                    <textarea
                                        rows="3" name="address" value={formData.address} onChange={handleInputChange}
                                        placeholder="Enter your street address, city, country..."
                                        className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-1 focus:ring-[#41bfb8] transition-all font-bold text-gray-800 placeholder:text-gray-300 md:resize-none"
                                    ></textarea>
                                </div>

                                <div className="md:col-span-2 pt-6">
                                    <button
                                        disabled={loading}
                                        className="w-full py-5 bg-[#41bfb8] hover:bg-[#38a89d] disabled:bg-gray-300 text-white rounded-2xl font-black text-xl shadow-xl shadow-[#41bfb8]/30 transition-all active:scale-95 flex items-center justify-center gap-3"
                                    >
                                        {loading ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                Processing Order...
                                            </>
                                        ) : (
                                            <>
                                                <LuPackage size={22} />
                                                Confirm & Place Order
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Right: Order Summary */}
                    <div className="w-full lg:w-[450px]">
                        <div className="bg-white p-8 lg:p-10 rounded-[2.5rem] border border-gray-100 shadow-xl space-y-8 lg:sticky lg:top-10">
                            <h3 className="text-xl font-black text-gray-900 border-b border-gray-50 pb-6 uppercase tracking-wider">Order Summary</h3>

                            <div className="space-y-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                {items.map((item) => (
                                    <div key={item.id} className="flex gap-4 items-center">
                                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-50 shrink-0 border border-gray-100">
                                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-sm font-bold text-gray-800 truncate mb-1">{item.title}</h4>
                                            <span className="text-xs font-bold text-[#41bfb8] uppercase tracking-widest">{item.type}</span>
                                        </div>
                                        <div className="text-gray-900 font-black">${item.price}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-8 space-y-4 border-t border-gray-50">
                                <div className="flex justify-between items-center text-gray-500 font-bold text-sm uppercase tracking-widest">
                                    <span>Subtotal</span>
                                    <span className="text-gray-900">${totalAmount.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center text-gray-500 font-bold text-sm uppercase tracking-widest">
                                    <span>Tax (0%)</span>
                                    <span className="text-gray-900">$0.00</span>
                                </div>
                                <div className="pt-6 flex justify-between items-center">
                                    <span className="text-gray-900 font-black uppercase text-lg tracking-tighter italic">Grand Total</span>
                                    <span className="text-3xl font-black text-[#41bfb8]">${totalAmount.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-4 bg-teal-50 rounded-2xl border border-teal-100">
                                <LuShieldCheck className="text-[#41bfb8] text-xl" />
                                <p className="text-[10px] text-gray-600 font-bold leading-tight">
                                    Your data is encrypted. We don't store your credit card information. Guaranteed secure checkout.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
