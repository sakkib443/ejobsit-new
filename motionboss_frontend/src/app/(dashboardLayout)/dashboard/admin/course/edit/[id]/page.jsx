'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter, useParams } from 'next/navigation';
import {
  FiPlus, FiTrash2, FiSave, FiArrowLeft, FiImage, FiVideo,
  FiBookOpen, FiDollarSign, FiGlobe, FiLayers, FiCheck,
  FiTarget, FiList, FiAward, FiTag, FiSearch, FiLayout, FiClock, FiLoader
} from 'react-icons/fi';
import Link from 'next/link';

// Zod Schema updated to match ICourse interface
const courseValidationSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  titleBn: z.string().min(3, "Bengali title must be at least 3 characters").optional().or(z.literal('')),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().min(50, "Description must be at least 50 characters"),
  descriptionBn: z.string().min(50, "Bengali description must be at least 50 characters").optional().or(z.literal('')),
  shortDescription: z.string().max(500).optional().or(z.literal('')),
  shortDescriptionBn: z.string().max(500).optional().or(z.literal('')),
  thumbnail: z.string().url("Must be a valid URL"),
  bannerImage: z.string().url("Must be a valid URL").optional().or(z.literal('')),
  category: z.string().min(1, "Category is required"),
  price: z.coerce.number().min(0, "Price must be positive"),
  discountPrice: z.coerce.number().min(0).optional().nullable(),
  courseType: z.enum(['online', 'offline', 'recorded']),
  level: z.enum(['beginner', 'intermediate', 'advanced']),
  language: z.enum(['bangla', 'english', 'both']),
  tags: z.array(z.string()).optional(),
  features: z.array(z.string()).optional(),
  requirements: z.array(z.string()).optional(),
  whatYouWillLearn: z.array(z.string()).optional(),
  targetAudience: z.array(z.string()).optional(),
  previewVideo: z.string().url().optional().or(z.literal('')),
  totalDuration: z.coerce.number().min(0).optional(),
  totalLessons: z.coerce.number().min(0).optional(),
  totalModules: z.coerce.number().min(0).optional(),
  metaTitle: z.string().max(100).optional().or(z.literal('')),
  metaDescription: z.string().max(300).optional().or(z.literal('')),
  status: z.enum(['draft', 'published', 'archived']),
  isFeatured: z.boolean().optional(),
  isPopular: z.boolean().optional(),
});

const EditCourse = () => {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  const { id } = useParams();

  const { register, control, handleSubmit, setValue, reset, formState: { errors } } = useForm({
    resolver: zodResolver(courseValidationSchema),
    defaultValues: {
      courseType: 'online',
      level: 'beginner',
      language: 'bangla',
      status: 'draft',
      features: [''],
      requirements: [''],
      whatYouWillLearn: [''],
      targetAudience: [''],
      tags: [''],
      isFeatured: false,
      isPopular: false,
    }
  });

  const featuresFields = useFieldArray({ control, name: 'features' });
  const requirementsFields = useFieldArray({ control, name: 'requirements' });
  const learningFields = useFieldArray({ control, name: 'whatYouWillLearn' });
  const audienceFields = useFieldArray({ control, name: 'targetAudience' });
  const tagsFields = useFieldArray({ control, name: 'tags' });

  const fetchData = useCallback(async () => {
    if (!id) return;
    const BASE_URL = 'http://localhost:5000/api';
    const token = localStorage.getItem('token');

    try {
      setFetching(true);
      const [catRes, courseRes] = await Promise.all([
        fetch(`${BASE_URL}/categories`),
        fetch(`${BASE_URL}/courses/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ]);

      const catData = await catRes.json();
      const courseData = await courseRes.json();

      setCategories(catData.data || []);

      const course = courseData.data;
      if (course) {
        reset({
          ...course,
          category: course.category?._id || course.category,
          features: course.features?.length ? course.features : [''],
          requirements: course.requirements?.length ? course.requirements : [''],
          whatYouWillLearn: course.whatYouWillLearn?.length ? course.whatYouWillLearn : [''],
          targetAudience: course.targetAudience?.length ? course.targetAudience : [''],
          tags: course.tags?.length ? course.tags : [''],
          previewVideo: course.previewVideo || '',
          bannerImage: course.bannerImage || '',
          shortDescription: course.shortDescription || '',
          shortDescriptionBn: course.shortDescriptionBn || '',
          metaTitle: course.metaTitle || '',
          metaDescription: course.metaDescription || '',
        });
      }
    } catch (err) {
      console.error(err);
      alert('Failed to load course data');
    } finally {
      setFetching(false);
    }
  }, [id, reset]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onSubmit = async (data) => {
    setLoading(true);
    const BASE_URL = 'http://localhost:5000/api';
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`${BASE_URL}/courses/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Course Updated Successfully! ✅');
        router.push('/dashboard/admin/course');
      } else {
        // Detailed error reporting
        const errorMsg = result.errorMessages
          ? result.errorMessages.map(err => `${err.path.split('.').pop()}: ${err.message}`).join('\n')
          : result.message;
        alert(`Update Failed ❌\n\n${errorMsg}`);
      }
    } catch (error) {
      alert('Network error!');
    } finally {
      setLoading(false);
    }
  };

  const FormField = ({ label, icon: Icon, error, children, required }) => (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
        {Icon && <Icon size={14} className="text-slate-400" />}
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {error && <p className="text-red-500 text-xs font-medium">{error.message}</p>}
    </div>
  );

  const SectionHeader = ({ title, icon: Icon, className = "" }) => (
    <div className={`px-6 py-4 border-b border-slate-100 ${className}`}>
      <h2 className="font-semibold text-slate-800 flex items-center gap-2">
        {Icon && <Icon size={18} className="text-indigo-600" />}
        {title}
      </h2>
    </div>
  );

  const inputBase = "w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all";
  const selectBase = "w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all appearance-none cursor-pointer";

  if (fetching) return (
    <div className="h-screen flex items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-4">
        <FiLoader className="animate-spin text-indigo-600" size={40} />
        <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Loading Course Data...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto p-6 pb-20">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Link href="/dashboard/admin/course" className="p-3 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-slate-800 hover:border-slate-300 shadow-sm transition-all">
              <FiArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Edit Course</h1>
              <p className="text-slate-500 text-sm mt-1">Modify course details and publish changes</p>
            </div>
          </div>
          <button
            onClick={handleSubmit(onSubmit)}
            disabled={loading}
            className="flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/25 transition-all disabled:opacity-50"
          >
            {loading ? <><FiLoader className="animate-spin" /> Updating...</> : <><FiSave /> Save Changes</>}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Left Column - 8 Cols */}
          <div className="lg:col-span-8 space-y-6">

            {/* Basic Info */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <SectionHeader title="Basic Information" icon={FiBookOpen} className="bg-gradient-to-r from-indigo-50 to-purple-50" />
              <div className="p-6 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormField label="Course Title (English)" error={errors.title} required>
                    <input {...register('title')} className={inputBase} placeholder="e.g. Complete Video Editing Masterclass" />
                  </FormField>
                  <FormField label="Course Title (বাংলা)" error={errors.titleBn}>
                    <input {...register('titleBn')} className={inputBase} placeholder="যেমনঃ প্রফেশনাল ভিডিও এডিটিং কোর্স" />
                  </FormField>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormField label="Short Description (English)" error={errors.shortDescription}>
                    <textarea {...register('shortDescription')} rows={2} className={inputBase} placeholder="A brief one-liner summary..." />
                  </FormField>
                  <FormField label="Short Description (বাংলা)" error={errors.shortDescriptionBn}>
                    <textarea {...register('shortDescriptionBn')} rows={2} className={inputBase} placeholder="কোর্স সম্পর্কে ছোট একটি বাক্য..." />
                  </FormField>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormField label="Full Description (English)" error={errors.description} required>
                    <textarea {...register('description')} rows={5} className={inputBase} placeholder="Write detailed course description..." />
                  </FormField>
                  <FormField label="Full Description (বাংলা)" error={errors.descriptionBn}>
                    <textarea {...register('descriptionBn')} rows={5} className={inputBase} placeholder="কোর্সের বিস্তারিত তথ্য লিখুন..." />
                  </FormField>
                </div>
              </div>
            </div>

            {/* Media */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <SectionHeader title="Media & Video" icon={FiImage} className="bg-gradient-to-r from-pink-50 to-rose-50" />
              <div className="p-6 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormField label="Thumbnail Image URL" icon={FiImage} error={errors.thumbnail} required>
                    <input {...register('thumbnail')} className={inputBase} placeholder="https://..." />
                  </FormField>
                  <FormField label="Banner Image URL" icon={FiLayout} error={errors.bannerImage}>
                    <input {...register('bannerImage')} className={inputBase} placeholder="https://..." />
                  </FormField>
                </div>
                <FormField label="Preview Video URL (YouTube/Vimeo)" icon={FiVideo} error={errors.previewVideo}>
                  <input {...register('previewVideo')} className={inputBase} placeholder="https://..." />
                </FormField>
              </div>
            </div>

            {/* Dynamic Content Lists */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Features */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-5 py-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                  <h3 className="text-sm font-bold text-slate-700 flex items-center gap-2 italic"><FiCheck className="text-emerald-500" /> features</h3>
                  <button type="button" onClick={() => featuresFields.append('')} className="p-1.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"><FiPlus size={14} /></button>
                </div>
                <div className="p-5 space-y-3">
                  {featuresFields.fields.map((field, index) => (
                    <div key={field.id} className="flex gap-2">
                      <input {...register(`features.${index}`)} className={`${inputBase} py-2`} placeholder="Feature..." />
                      <button type="button" onClick={() => featuresFields.remove(index)} className="text-red-400 hover:text-red-600"><FiTrash2 size={16} /></button>
                    </div>
                  ))}
                </div>
              </div>

              {/* What You'll Learn */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-5 py-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                  <h3 className="text-sm font-bold text-slate-700 flex items-center gap-2 italic"><FiTarget className="text-indigo-500" /> whatYouWillLearn</h3>
                  <button type="button" onClick={() => learningFields.append('')} className="p-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"><FiPlus size={14} /></button>
                </div>
                <div className="p-5 space-y-3">
                  {learningFields.fields.map((field, index) => (
                    <div key={field.id} className="flex gap-2">
                      <input {...register(`whatYouWillLearn.${index}`)} className={`${inputBase} py-2`} placeholder="Outcome..." />
                      <button type="button" onClick={() => learningFields.remove(index)} className="text-red-400 hover:text-red-600"><FiTrash2 size={16} /></button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Requirements */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-5 py-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                  <h3 className="text-sm font-bold text-slate-700 flex items-center gap-2 italic"><FiList className="text-rose-500" /> Roadmap</h3>
                  <button type="button" onClick={() => requirementsFields.append('')} className="p-1.5 bg-rose-600 text-white rounded-lg hover:bg-rose-700"><FiPlus size={14} /></button>
                </div>
                <div className="p-5 space-y-3">
                  {requirementsFields.fields.map((field, index) => (
                    <div key={field.id} className="flex gap-2">
                      <input {...register(`requirements.${index}`)} className={`${inputBase} py-2`} placeholder="Req..." />
                      <button type="button" onClick={() => requirementsFields.remove(index)} className="text-red-400 hover:text-red-600"><FiTrash2 size={16} /></button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tags & Audience */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Tags */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-5 py-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                  <h3 className="text-sm font-bold text-slate-700 flex items-center gap-2 italic"><FiTag className="text-blue-500" /> Search Tags</h3>
                  <button type="button" onClick={() => tagsFields.append('')} className="p-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700"><FiPlus size={14} /></button>
                </div>
                <div className="p-5 space-y-3">
                  {tagsFields.fields.map((field, index) => (
                    <div key={field.id} className="flex gap-2">
                      <input {...register(`tags.${index}`)} className={`${inputBase} py-2`} placeholder="Tag..." />
                      <button type="button" onClick={() => tagsFields.remove(index)} className="text-red-400 hover:text-red-600"><FiTrash2 size={16} /></button>
                    </div>
                  ))}
                </div>
              </div>

              {/* targetAudience */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-5 py-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                  <h3 className="text-sm font-bold text-slate-700 flex items-center gap-2 italic"><FiTarget className="text-purple-500" /> Target Audience</h3>
                  <button type="button" onClick={() => audienceFields.append('')} className="p-1.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700"><FiPlus size={14} /></button>
                </div>
                <div className="p-5 space-y-3">
                  {audienceFields.fields.map((field, index) => (
                    <div key={field.id} className="flex gap-2">
                      <input {...register(`targetAudience.${index}`)} className={`${inputBase} py-2`} placeholder="Audience..." />
                      <button type="button" onClick={() => audienceFields.remove(index)} className="text-red-400 hover:text-red-600"><FiTrash2 size={16} /></button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - 4 Cols */}
          <div className="lg:col-span-4 space-y-6">

            {/* Pricing */}
            <div className="bg-slate-900 rounded-2xl p-6 shadow-xl border border-slate-800">
              <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2"><FiDollarSign className="text-emerald-400" /> Financial Settings</h2>
              <div className="space-y-4">
                <FormField label="Regular Price (BDT)" required>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">৳</span>
                    <input type="number" {...register('price')} className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white font-bold outline-none focus:border-indigo-500 transition-all" />
                  </div>
                </FormField>
                <FormField label="Discount Price (Optional)">
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">৳</span>
                    <input type="number" {...register('discountPrice')} className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white font-bold outline-none focus:border-emerald-500 transition-all" />
                  </div>
                </FormField>
              </div>
            </div>

            {/* Settings */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <SectionHeader title="Classification" icon={FiLayers} className="bg-slate-50" />
              <div className="p-6 space-y-4">
                <FormField label="Category" required error={errors.category}>
                  <select {...register('category')} className={selectBase}>
                    <option value="">Select Category</option>
                    {categories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
                  </select>
                </FormField>
                <div className="grid grid-cols-2 gap-4">
                  <FormField label="Lessons (Auto)">
                    <input type="number" {...register('totalLessons')} className={`${inputBase} bg-slate-100 text-slate-500 cursor-not-allowed`} readOnly />
                  </FormField>
                  <FormField label="Modules (Auto)">
                    <input type="number" {...register('totalModules')} className={`${inputBase} bg-slate-100 text-slate-500 cursor-not-allowed`} readOnly />
                  </FormField>
                </div>
                <FormField label="Course Type">
                  <select {...register('courseType')} className={selectBase}>
                    <option value="recorded">Pre-recorded</option>
                    <option value="online">Online Live</option>
                    <option value="offline">Offline</option>
                  </select>
                </FormField>
                <FormField label="Difficulty Level">
                  <select {...register('level')} className={selectBase}>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </FormField>
                <FormField label="Language">
                  <select {...register('language')} className={selectBase}>
                    <option value="bangla">Bangla</option>
                    <option value="english">English</option>
                    <option value="both">Both</option>
                  </select>
                </FormField>
              </div>
            </div>

            {/* Status & SEO */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <SectionHeader title="Visibility & SEO" icon={FiSearch} className="bg-slate-50" />
              <div className="p-6 space-y-4">
                <FormField label="Slug (Auto)">
                  <input {...register('slug')} className={`${inputBase} bg-slate-100 text-slate-400`} readOnly />
                </FormField>
                <FormField label="Status">
                  <select {...register('status')} className={selectBase}>
                    <option value="draft">Draft</option>
                    <option value="published">Published (Live)</option>
                    <option value="archived">Archived</option>
                  </select>
                </FormField>
                <div className="flex flex-wrap gap-4 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" {...register('isFeatured')} className="w-4 h-4 rounded text-indigo-600" />
                    <span className="text-xs font-bold text-slate-600">Featured</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" {...register('isPopular')} className="w-4 h-4 rounded text-purple-600" />
                    <span className="text-xs font-bold text-slate-600">Popular</span>
                  </label>
                </div>
                <hr className="my-2 border-slate-100" />
                <FormField label="Meta Title">
                  <input {...register('metaTitle')} className={inputBase} maxLength={100} />
                </FormField>
                <FormField label="Meta Description">
                  <textarea {...register('metaDescription')} rows={3} className={inputBase} maxLength={300} />
                </FormField>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default EditCourse;