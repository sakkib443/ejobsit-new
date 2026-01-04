"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "@/redux/cartSlice";
import { BiCategory } from "react-icons/bi";
import { FaStar, FaArrowRight } from "react-icons/fa";
import { LuBookOpenCheck, LuClock, LuUsers, LuPlay, LuLayoutGrid, LuShoppingCart, LuHeart, LuList, LuCheck, LuEye } from "react-icons/lu";
import { HiOutlineAcademicCap } from "react-icons/hi2";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/providers/ThemeProvider";

const CourseCard = ({ course, view = "grid" }) => {
  const { isDark } = useTheme();
  const dispatch = useDispatch();
  const [isAdded, setIsAdded] = useState(false);
  const courseId = course._id || course.id;
  const { items: categories = [] } = useSelector((state) => state.categories);
  const { t, language } = useLanguage();
  const bengaliClass = language === "bn" ? "hind-siliguri" : "";

  // Get category name from ID or object
  const getCategoryName = (categoryData) => {
    if (!categoryData) return t("coursesPage.category") || "General";
    if (typeof categoryData === "object" && categoryData.name) return categoryData.name;
    const category = categories.find(cat => cat._id === categoryData || cat.id === categoryData);
    return category?.name || categoryData || "General";
  };

  // Field mapping
  const title = course.title || "Untitled Course";
  const thumbnail = course.thumbnail || course.image || "/placeholder-course.jpg";
  const price = course.price !== undefined ? course.price : (parseInt(course.fee?.replace(/[^\d]/g, '') || 0));
  const discountPrice = course.discountPrice;
  const type = course.courseType || course.type || "Recorded";
  const totalLessons = course.totalLessons || course.totalVideos || 10;
  const lessons = `${totalLessons} Lessons`;
  const students = course.totalEnrollments !== undefined ? `${course.totalEnrollments}+ Enrolled` : "50+ Enrolled";
  const rating = course.averageRating || course.rating || 5;
  const lastUpdated = course.updatedAt ? new Date(course.updatedAt).toLocaleDateString() : "Recently Updated";
  const duration = course.duration || course.totalDuration || "3 Months";
  const displayPrice = discountPrice || price;

  // Handle Add to Cart
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart({
      id: courseId,
      title: title,
      price: displayPrice,
      image: thumbnail,
      type: "course"
    }));
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  // List View Rendering
  if (view === "list") {
    return (
      <div className="group w-full flex flex-col md:flex-row bg-white dark:bg-[#0d0d0d] rounded-md border border-gray-100 dark:border-white/10 overflow-hidden hover:shadow-xl transition-all duration-300">
        {/* Left: Image (35%) */}
        <div className="relative w-full md:w-[35%] h-56 md:h-auto shrink-0 overflow-hidden p-3">
          <Link href={`/courses/${courseId}`} className="block h-full w-full">
            <Image
              width={400}
              height={300}
              src={thumbnail}
              alt={title}
              className="h-full w-full object-cover rounded-lg transition-transform duration-700 group-hover:scale-105"
            />
          </Link>
          {/* Play Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20 backdrop-blur-[1px]">
            <Link href={`/courses/${courseId}`} className="w-12 h-12 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/50 hover:bg-[#41bfb8] hover:border-[#41bfb8] transition-colors">
              <LuPlay className="ml-1" fill="currentColor" />
            </Link>
          </div>
        </div>

        {/* Middle: Content (40%) */}
        <div className="flex-1 p-6 border-r border-gray-50 flex flex-col justify-center">
          <Link href={`/courses/${courseId}`}>
            <h3 className={`text-xl font-bold text-slate-800 leading-tight mb-2 hover:text-[#41bfb8] transition-colors ${bengaliClass}`}>
              {title}
            </h3>
          </Link>
          <div className="flex items-center gap-2 mb-4 text-sm text-slate-500">
            <span className="italic">in</span>
            <span className="font-medium text-slate-700 bg-slate-100 px-2 py-0.5 rounded text-xs uppercase tracking-wide">
              {getCategoryName(course.category)}
            </span>
          </div>

          <ul className="space-y-2 mb-4">
            <li className="flex items-start gap-2 text-sm text-slate-600">
              <LuClock className="text-[#41bfb8] mt-0.5 shrink-0" size={16} />
              <span>Duration: {duration}</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-slate-600">
              <LuUsers className="text-[#41bfb8] mt-0.5 shrink-0" size={16} />
              <span>{students}</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-slate-600">
              <LuCheck className="text-[#41bfb8] mt-0.5 shrink-0" size={16} />
              <span>Lifetime Access</span>
            </li>
          </ul>
        </div>

        {/* Right: Actions (25%) */}
        <div className="w-full md:w-[25%] p-6 bg-gray-50/50 flex flex-col items-center justify-center text-center gap-1 border-l border-gray-100">
          {/* Icons Top Right (Absolute in relative container if needed, but here simple column) */}
          <div className="flex w-full justify-end gap-2 mb-2 text-slate-400">
            <button className="hover:text-[#41bfb8]"><LuList size={18} /></button>
            <button className="hover:text-amber-500"><LuHeart size={18} /></button>
          </div>

          <div className="text-3xl font-bold text-[#41bfb8] font-outfit mb-1">
            ৳{(discountPrice || price).toLocaleString()}
          </div>

          <div className="flex text-amber-500 gap-0.5 text-xs mb-1">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className={i < Math.round(rating) ? "fill-current" : "text-slate-200"} />
            ))}
            <span className="text-slate-400 ml-1">({course.reviews?.length || 0})</span>
          </div>

          <p className="text-xs text-slate-500 mb-1">{students}</p>
          <p className="text-[10px] text-slate-400 mb-4">Last updated: {lastUpdated}</p>

          <div className="flex items-center gap-3 w-full">
            <button
              onClick={handleAddToCart}
              disabled={isAdded}
              className={`p-2.5 border rounded-md transition-colors shadow-sm ${isAdded ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-white border-slate-200 text-slate-600 hover:text-[#41bfb8] hover:border-[#41bfb8]'}`}
            >
              {isAdded ? <LuCheck size={20} /> : <LuShoppingCart size={20} />}
            </button>
            <Link
              href={`/courses/${courseId}`}
              className="flex-1 py-2.5 bg-white border border-[#41bfb8] text-[#41bfb8] rounded-md text-sm font-normal hover:bg-[#41bfb8] hover:text-white transition-all shadow-sm flex items-center justify-center gap-2"
            >
              Details
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Grid View Rendering
  return (
    <div className="group w-full h-full flex flex-col">
      <div className={`relative h-full bg-white dark:bg-[#0d0d0d] rounded-md border border-gray-100 dark:border-white/10 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col`}>

        {/* Image Section */}
        <div className="relative h-48 w-full overflow-hidden shrink-0 p-3">
          <Link href={`/courses/${courseId}`} className="block h-full w-full">
            <Image
              width={400}
              height={250}
              src={thumbnail}
              alt={title}
              className="h-full w-full object-cover rounded-lg transition-transform duration-700 group-hover:scale-105"
            />
          </Link>

          {/* Type Badge (Top Left) */}
          <div className="absolute top-3 left-3">
            <span className={`inline-block px-3 py-1 rounded-md text-xs font-bold text-white shadow-sm ${type.toLowerCase() === 'offline' ? 'bg-[#F79952]' : 'bg-[#F79952]'
              }`}>
              {type}
            </span>
          </div>

          {/* Rating Badge (Top Right) */}
          <div className="absolute top-3 right-3 bg-white rounded-md px-2 py-1 flex items-center gap-1 shadow-sm">
            <FaStar className="text-amber-500 text-xs" />
            <span className="text-xs font-bold text-slate-800">{rating}</span>
          </div>

          {/* Play Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20 backdrop-blur-[1px]">
            <Link href={`/courses/${courseId}`} className="w-12 h-12 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/50 hover:bg-[#41bfb8] hover:border-[#41bfb8] transition-colors">
              <LuPlay className="ml-1" fill="currentColor" />
            </Link>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4 flex flex-col flex-1">
          {/* Category */}
          <div className="flex items-center gap-2 mb-2 text-slate-500">
            <LuLayoutGrid className="text-[#41bfb8]" />
            <span className={`text-xs font-medium ${bengaliClass}`}>
              {getCategoryName(course.category)}
            </span>
          </div>

          {/* Title */}
          <Link href={`/courses/${courseId}`} className="mb-3 block">
            <h3 className={`text-lg font-bold text-slate-800 leading-tight line-clamp-2 hover:text-[#41bfb8] transition-colors ${bengaliClass}`}>
              {title}
            </h3>
          </Link>

          {/* Metadata */}
          <div className="flex items-center gap-4 mb-4 text-xs text-slate-500 font-medium pb-4 border-b border-slate-50">
            <div className="flex items-center gap-1.5">
              <LuBookOpenCheck className="text-[#41bfb8]" />
              <span>{lessons}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <LuUsers className="text-[#41bfb8]" />
              <span>{students}</span>
            </div>
          </div>

          {/* Price & Rating Row */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-[10px] text-slate-400 font-medium mb-0.5">Course Fee</p>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-[#41bfb8] font-outfit">
                  ৳{(discountPrice || price).toLocaleString()}
                </span>
                {discountPrice && (
                  <span className="text-xs text-slate-300 line-through">৳{price.toLocaleString()}</span>
                )}
              </div>
            </div>
            <div className="flex text-amber-500 gap-0.5 text-xs">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className={i < Math.round(rating) ? "fill-current" : "text-slate-200"} />
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-2 gap-3 mt-auto">
            <Link
              href={`/courses/${courseId}`}
              className="flex items-center justify-center gap-2 py-2.5 bg-[#41bfb8] text-white rounded-md text-sm font-normal hover:bg-[#3aa8a2] transition-colors"
            >
              <LuBookOpenCheck size={16} />
              Details
            </Link>
            <button
              onClick={handleAddToCart}
              disabled={isAdded}
              className={`flex items-center justify-center gap-2 py-2.5 border rounded-md text-sm font-normal transition-colors ${isAdded ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-white border-[#41bfb8] text-[#41bfb8] hover:bg-teal-50'}`}
            >
              {isAdded ? <LuCheck size={16} /> : <LuShoppingCart size={16} />}
              {isAdded ? 'Added' : 'Add To Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
