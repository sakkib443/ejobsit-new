// ===================================================================
// MotionBoss LMS - Lesson Model
// MongoDB Lesson Schema with Mongoose
// লেসন কালেকশনের Mongoose স্কিমা
// ===================================================================

import { Schema, model } from 'mongoose';
import { ILesson, LessonModel, IModuleGroup } from './lesson.interface';

/**
 * Resource Sub-Schema
 */
const resourceSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        titleBn: String,
        fileUrl: {
            type: String,
            required: true,
        },
        fileType: {
            type: String,
            enum: ['pdf', 'doc', 'zip', 'image', 'other'],
            default: 'other',
        },
        fileSize: String,
    },
    { _id: false }
);

/**
 * Lesson Schema Definition
 */
const lessonSchema = new Schema<ILesson, LessonModel>(
    {
        // ==================== Course Reference ====================
        course: {
            type: Schema.Types.ObjectId,
            ref: 'Course',
            required: [true, 'Course reference is required'],
            index: true,
        },

        // ==================== Module/Section Info ====================
        module: {
            type: Schema.Types.ObjectId,
            ref: 'Module',
            required: [true, 'Module reference is required'],
            index: true,
        },

        // ==================== Lesson Basic Info ====================
        title: {
            type: String,
            required: [true, 'Lesson title is required'],
            trim: true,
            maxlength: [200, 'Title cannot exceed 200 characters'],
        },
        titleBn: {
            type: String,
            trim: true,
            maxlength: [200, 'Bengali title cannot exceed 200 characters'],
        },
        description: {
            type: String,
            maxlength: 2000,
        },
        descriptionBn: {
            type: String,
            maxlength: 2000,
        },

        // ==================== Video Content ====================
        videoUrl: {
            type: String,
            required: [true, 'Video URL is required'],
        },
        videoDuration: {
            type: Number,
            required: [true, 'Video duration is required'],
            min: [0, 'Duration cannot be negative'],
        },
        videoProvider: {
            type: String,
            enum: {
                values: ['cloudinary', 'vimeo', 'youtube', 'bunny', 'custom'],
                message: '{VALUE} is not a valid video provider',
            },
            default: 'youtube',
        },
        videoThumbnail: {
            type: String,
        },

        // ==================== Resources ====================
        resources: {
            type: [resourceSchema],
            default: [],
        },

        // ==================== Order & Access ====================
        order: {
            type: Number,
            required: true,
            default: 1,
        },
        isFree: {
            type: Boolean,
            default: false,
        },
        isPublished: {
            type: Boolean,
            default: false,
        },

        // ==================== Quiz/Assignment ====================
        hasQuiz: {
            type: Boolean,
            default: false,
        },
        quizId: {
            type: Schema.Types.ObjectId,
            ref: 'Exam',
        },
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
            transform: function (doc, ret) {
                delete ret.__v;
                return ret;
            },
        },
    }
);

// ==================== Indexes ====================
lessonSchema.index({ module: 1, order: 1 });
lessonSchema.index({ course: 1, isPublished: 1 });
lessonSchema.index({ title: 'text', titleBn: 'text' });

// ==================== Static Methods ====================

/**
 * Get all lessons for a course
 */
lessonSchema.statics.getLessonsByCourse = async function (
    courseId: string
): Promise<ILesson[]> {
    return await this.find({ course: courseId, isPublished: true })
        .populate('module')
        .sort({ 'module.order': 1, order: 1 })
        .lean();
};

// getGroupedLessons is moved to service layer or handled via population

// ==================== Export Model ====================
export const Lesson = model<ILesson, LessonModel>('Lesson', lessonSchema);
