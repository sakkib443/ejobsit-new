"use client";

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '@/redux/cartSlice';
import Link from 'next/link';
import { LuTrash2, LuShoppingBag, LuChevronRight, LuArrowLeft, LuShieldCheck } from 'react-icons/lu';
import { useLanguage } from '@/context/LanguageContext';

const CartPage = () => {
    const { items, totalAmount } = useSelector((state) => state.cart || { items: [], totalAmount: 0 });
    const dispatch = useDispatch();
    const { language } = useLanguage();
    const bengaliClass = language === "bn" ? "hind-siliguri" : "";

    if (items.length === 0) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-50 px-4">
                <div className="w-24 h-24 bg-white rounded-3xl shadow-xl flex items-center justify-center mb-8 animate-bounce">
                    <LuShoppingBag className="text-[#41bfb8] text-4xl" />
                </div>
                <h2 className={`text-3xl font-black text-gray-900 mb-4 tracking-tight ${bengaliClass}`}>
                    {language === 'bn' ? 'আপনার কার্ট খালি' : 'Your cart is empty'}
                </h2>
                <p className="text-gray-500 mb-10 text-center max-w-sm font-normal">
                    Looks like you haven't added anything to your cart yet. Explore our products and find something you love!
                </p>
                <Link
                    href="/software"
                    className="px-10 py-4 bg-[#41bfb8] text-white rounded-md font-bold shadow-xl shadow-[#41bfb8]/30 hover:scale-105 transition-all active:scale-95"
                >
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 lg:py-20">
            <div className="container mx-auto px-4 lg:px-16">
                {/* Header */}
                <div className="flex items-center gap-4 mb-10">
                    <Link href="/" className="p-3 bg-white rounded-md border border-gray-100/50 shadow-sm text-gray-400 hover:text-[#41bfb8] transition-all">
                        <LuArrowLeft size={20} />
                    </Link>
                    <h1 className={`text-3xl lg:text-4xl font-black text-gray-900 uppercase tracking-tighter ${bengaliClass}`}>
                        Shopping <span className="text-[#41bfb8]">Cart</span>
                    </h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Items List */}
                    <div className="lg:col-span-8 space-y-4">
                        {items.map((item) => (
                            <div key={item.id} className="bg-white p-4 lg:p-6 rounded-md border border-gray-100/50 shadow-sm flex flex-col sm:flex-row items-center gap-6 group hover:shadow-md hover:border-[#41bfb8]/20 transition-all">
                                <div className="w-full sm:w-32 aspect-square rounded-md overflow-hidden bg-gray-100 shrink-0">
                                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                </div>
                                <div className="flex-1 space-y-2 text-center sm:text-left">
                                    <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-1">
                                        <span className="px-2 py-0.5 bg-gray-100 text-[10px] font-bold uppercase text-gray-500 rounded">
                                            {item.type}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-black text-gray-900 group-hover:text-[#41bfb8] transition-colors line-clamp-1">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-gray-400 font-normal">MotionBoss verified digital asset</p>
                                </div>
                                <div className="flex items-center gap-6">
                                    <span className="text-2xl font-black text-[#41bfb8]">${item.price}</span>
                                    <button
                                        onClick={() => dispatch(removeFromCart(item.id))}
                                        className="p-3 bg-red-50 text-red-400 hover:bg-red-500 hover:text-white rounded-md transition-all border border-gray-100/50"
                                    >
                                        <LuTrash2 size={20} />
                                    </button>
                                </div>
                            </div>
                        ))}

                        <div className="pt-6">
                            <button
                                onClick={() => dispatch(clearCart())}
                                className="text-sm font-bold text-gray-400 hover:text-red-500 transition-colors uppercase tracking-widest flex items-center gap-2"
                            >
                                <LuTrash2 size={16} />
                                Clear Entire Cart
                            </button>
                        </div>
                    </div>

                    {/* Summary */}
                    <div className="lg:col-span-4 lg:sticky lg:top-28">
                        <div className="bg-white p-8 rounded-md border border-gray-100/50 shadow-sm space-y-8">
                            <h3 className="text-xl font-black text-gray-900 border-b border-gray-50 pb-6 uppercase tracking-wider">Order Summary</h3>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-gray-500 font-normal">
                                    <span>Subtotal ({items.length} items)</span>
                                    <span className="text-gray-900 font-semibold">${totalAmount.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center text-gray-500 font-normal">
                                    <span>Processing Fee</span>
                                    <span className="text-[#41bfb8] font-bold">FREE</span>
                                </div>
                                <div className="pt-6 border-t border-gray-50 flex justify-between items-center">
                                    <span className="text-gray-900 font-black uppercase tracking-tight">Total Amount</span>
                                    <span className="text-3xl font-black text-[#41bfb8]">${totalAmount.toFixed(2)}</span>
                                </div>
                            </div>

                            <Link
                                href="/checkout"
                                className="w-full flex items-center justify-center gap-3 py-5 bg-[#41bfb8] hover:bg-[#38a89d] text-white rounded-md font-bold text-xl shadow-lg shadow-[#41bfb8]/20 transition-all active:scale-95 group"
                            >
                                Checkout Now
                                <LuChevronRight className="group-hover:translate-x-1 transition-transform" />
                            </Link>

                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-md border border-gray-100/50">
                                <LuShieldCheck className="text-[#41bfb8] text-xl" />
                                <p className="text-[10px] text-gray-500 font-normal leading-tight">
                                    Secure Checkout powered by SSL encryption. 100% money-back guarantee.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
