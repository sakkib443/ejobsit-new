"use client";

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "next/navigation";
import { fetchCoursesData } from "../../redux/CourseSlice";
import CourseCard from "../sheard/CourseCard";
import { LuLayoutGrid, LuList, LuArrowUpDown, LuLoader } from "react-icons/lu";
import { HiOutlineSparkles } from "react-icons/hi2";

// Loading Skeleton
const CourseCardSkeleton = () => (
  <div className="w-full animate-pulse">
    <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden h-[500px]">
      <div className="h-52 bg-slate-100"></div>
      <div className="p-6 space-y-4">
        <div className="h-4 bg-slate-100 rounded-full w-1/4"></div>
        <div className="h-8 bg-slate-100 rounded-2xl w-3/4"></div>
        <div className="grid grid-cols-2 gap-4">
          <div className="h-10 bg-slate-100 rounded-xl"></div>
          <div className="h-10 bg-slate-100 rounded-xl"></div>
        </div>
        <div className="h-px bg-slate-50"></div>
        <div className="flex justify-between items-center pt-4">
          <div className="h-10 bg-slate-100 rounded-xl w-24"></div>
          <div className="h-12 bg-slate-100 rounded-2xl w-32"></div>
        </div>
      </div>
    </div>
  </div>
);

const RightCoursesDetalis = ({ searchQuery, selectedType }) => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();

  const { courses = [], loading = false } = useSelector((state) => state.courses || {});
  const { items: categories = [], selectedCategories = [] } = useSelector((state) => state.categories || {});

  const [sortBy, setSortBy] = useState("default");
  const [isGridView, setIsGridView] = useState(true);

  useEffect(() => {
    dispatch(fetchCoursesData());
  }, [dispatch]);

  // Get category name from ID
  const getCategoryName = (categoryId) => {
    if (!categoryId) return "";
    if (typeof categoryId === "object" && categoryId.name) return categoryId.name;
    if (typeof categoryId === "string" && categoryId.length < 20) return categoryId;
    const category = categories.find(cat => cat._id === categoryId || cat.id === categoryId);
    return category?.name || "";
  };

  // Filter courses
  const filteredCourses = courses.filter((course) => {
    if (!course) return false;

    // Type filter
    // Normalize type from course object (support multiple field names)
    const rawType = course?.courseType || course?.type || course?.mode || "";
    const cType = rawType.toString().toLowerCase();
    const sType = (selectedType || "All").toLowerCase();

    // If selected is 'all', match everything. Otherwise match specific type.
    // If course has no type, we might want to default it or exclude it. 
    // Assuming 'Recorded' might be default if missing, but let's be strict if field exists.
    // If rawType is empty, let's assume it *might* match if we are loose, but better to check if your data actually has these fields.
    // For now, loose match:
    const typeMatch = sType === "all" || cType === sType;

    // Category filter
    let categoryMatch = true;
    if (selectedCategories.length > 0) {
      const courseCategoryName = getCategoryName(course.category);
      categoryMatch = selectedCategories.includes(courseCategoryName);
    }

    // Search filter
    const q = (searchQuery || "").trim().toLowerCase();
    const searchMatch =
      q === "" ||
      (course.title && course.title.toLowerCase().includes(q)) ||
      (course.technology && course.technology.toLowerCase().includes(q)) ||
      getCategoryName(course.category).toLowerCase().includes(q);

    return typeMatch && categoryMatch && searchMatch;
  });

  // Sort courses
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    const aPrice = a.price || (parseInt(a.fee?.replace(/[^\d]/g, '') || 0));
    const bPrice = b.price || (parseInt(b.fee?.replace(/[^\d]/g, '') || 0));
    const aRating = a.averageRating || a.rating || 5;
    const bRating = b.averageRating || b.rating || 5;
    const aStudents = a.totalEnrollments || a.totalStudentsEnroll || 0;
    const bStudents = b.totalEnrollments || b.totalStudentsEnroll || 0;

    switch (sortBy) {
      case "rating":
        return bRating - aRating;
      case "price-low":
        return aPrice - bPrice;
      case "price-high":
        return bPrice - aPrice;
      case "students":
        return bStudents - aStudents;
      default:
        return 0;
    }
  });

  return (
    <div className="space-y-8">
      {/* Top Bar - Simplified */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border border-slate-100 rounded-2xl p-4 shadow-sm sticky top-20 z-10 backdrop-blur-md bg-white/90">
        {/* Left - Course Count */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#41bfb8]/10 rounded-lg">
          <HiOutlineSparkles className="text-[#41bfb8]" />
          <span className="text-slate-800 font-bold outfit text-xs">
            {sortedCourses.length} <span className="text-slate-500 font-normal">Courses Found</span>
          </span>
        </div>

        {/* Right - Sort & View Toggle */}
        <div className="flex items-center gap-3">
          {/* Sort Dropdown */}
          <div className="relative group">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs font-medium text-slate-600 focus:outline-none focus:ring-2 focus:ring-[#41bfb8]/20 focus:border-[#41bfb8] cursor-pointer transition-all hover:bg-white"
            >
              <option value="default">Sort By</option>
              <option value="rating">Top Rated</option>
              <option value="students">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
            <LuArrowUpDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
          </div>

          {/* View Toggle */}
          <div className="flex items-center p-1 bg-slate-100 rounded-xl">
            <button
              onClick={() => setIsGridView(true)}
              className={`p-1.5 rounded-lg transition-all ${isGridView ? 'bg-white text-[#41bfb8] shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <LuLayoutGrid size={16} />
            </button>
            <button
              onClick={() => setIsGridView(false)}
              className={`p-1.5 rounded-lg transition-all ${!isGridView ? 'bg-white text-[#41bfb8] shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <LuList size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      {loading ? (
        <div className={`grid gap-8 ${isGridView ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <CourseCardSkeleton key={i} />
          ))}
        </div>
      ) : sortedCourses.length > 0 ? (
        <div className={`grid gap-6 ${isGridView ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
          {sortedCourses.map((course) => (
            <CourseCard
              key={course?._id || course?.id}
              course={course}
              view={isGridView ? 'grid' : 'list'}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white border border-slate-100 rounded-[3rem] shadow-sm">
          <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <HiOutlineSparkles className="w-12 h-12 text-slate-300" />
          </div>
          <h3 className="text-2xl font-black text-slate-800 outfit uppercase tracking-tight mb-2">No courses matching</h3>
          <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">Try adjusting your filters or search query</p>
        </div>
      )}
    </div>
  );
};

export default RightCoursesDetalis;
