import React from 'react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/cartSlice';
import { LuShoppingCart, LuArrowRight } from 'react-icons/lu';

const ProductCard = ({ product, type }) => {
    const dispatch = useDispatch();
    const detailUrl = `/${type}/${product._id}`;

    const handleAddToCart = (e) => {
        e.preventDefault();
        dispatch(addToCart({
            id: product._id,
            title: product.title || product.name,
            price: product.price,
            image: product.image || "/images/placeholder.png",
            type: type
        }));
    };

    return (
        <div className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
            {/* Image Container */}
            <div className="relative aspect-[16/10] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={product.image || "/images/placeholder.png"}
                    alt={product.title || product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full shadow-sm">
                    <span className="text-[10px] font-bold text-[#41bfb8] uppercase tracking-wider">
                        {product.category?.name || 'Digital Product'}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-gray-800 line-clamp-1 group-hover:text-[#41bfb8] transition-colors">
                        {product.title || product.name}
                    </h3>
                    <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded text-amber-600">
                        <span className="text-xs font-bold">★ {product.averageRating || '4.5'}</span>
                    </div>
                </div>

                <p className="text-xs text-gray-500 line-clamp-2 mb-4 h-8">
                    {product.description}
                </p>

                {/* Info Row */}
                <div className="flex items-center justify-between mb-5 py-3 border-y border-gray-50">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-gray-400 uppercase">Price</span>
                        <span className="text-lg font-bold text-[#41bfb8]">${product.price || '0.00'}</span>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] text-gray-400 uppercase">Sales</span>
                        <span className="text-sm font-bold text-gray-700">{product.totalSales || product.salesCount || '0'}</span>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-2">
                    <Link
                        href={detailUrl}
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#41bfb8] text-white rounded-lg text-sm font-bold hover:bg-[#38a89d] transition-all shadow-sm shadow-[#41bfb8]/20"
                    >
                        View Details
                    </Link>
                    <button
                        onClick={handleAddToCart}
                        className="w-11 h-11 flex items-center justify-center border border-gray-200 rounded-lg text-gray-400 hover:text-[#41bfb8] hover:border-[#41bfb8] transition-all"
                    >
                        <LuShoppingCart size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
