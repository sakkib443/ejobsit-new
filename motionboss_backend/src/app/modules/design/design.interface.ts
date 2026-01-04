// ===================================================================
// MotionBoss LMS - Design Interface
// Website Design/Content management module
// ওয়েবসাইট ডিজাইন এবং কন্টেন্ট ম্যানেজমেন্ট
// ===================================================================

import { Model, Types } from 'mongoose';

/**
 * IHeroContent - Hero Section Content
 * হিরো সেকশনের কন্টেন্ট
 */
export interface IHeroContent {
    badge: {
        text: string;
        textBn: string;
        showNew: boolean;
    };
    heading: {
        line1: string;
        line1Bn: string;
    };
    dynamicTexts: string[];       // Typing animation texts
    dynamicTextsBn: string[];     // Bengali typing texts
    description: {
        text: string;
        textBn: string;
        brandName: string;        // e.g., "eJobsIT"
    };
    features: {
        text: string;
        textBn: string;
    }[];
    searchPlaceholder: {
        text: string;
        textBn: string;
    };
    stats: {
        activeUsers: number;
        downloads: number;
        avgRating: number;
        totalProducts: number;
    };
}

/**
 * IContactContent - Contact Page Content
 * কন্টাক্ট পেজের কন্টেন্ট
 */
export interface IContactContent {
    hero: {
        badge: string;
        badgeBn: string;
        title1: string;
        title1Bn: string;
        title2: string;
        title2Bn: string;
        subtitle: string;
        subtitleBn: string;
    };
    contactInfo: {
        email: string;
        phone: string;
        address: string;
        addressBn: string;
        officeHours: string;
        officeHoursBn: string;
    };
    socialLinks: {
        facebook: string;
        youtube: string;
        linkedin: string;
        whatsapp: string;
        instagram: string;
    };
    whatsappSection: {
        title: string;
        titleBn: string;
        description: string;
        descriptionBn: string;
        buttonText: string;
        buttonTextBn: string;
    };
    mapEmbedUrl: string;
}

/**
 * IDesign - Main Design Interface
 * Website design settings and content
 */
export interface IDesign {
    _id?: Types.ObjectId;

    // Section identifier
    section: 'hero' | 'about' | 'footer' | 'topHeader' | 'navbar' | 'contact';

    // Hero section content
    heroContent?: IHeroContent;

    // Contact section content
    contactContent?: IContactContent;

    // General settings
    isActive: boolean;

    // Timestamps
    createdAt?: Date;
    updatedAt?: Date;
}

/**
 * DesignModel - Mongoose Model Type
 */
export interface DesignModel extends Model<IDesign> {
    findBySection(section: string): Promise<IDesign | null>;
}
