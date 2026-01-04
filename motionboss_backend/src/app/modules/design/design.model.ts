// ===================================================================
// MotionBoss LMS - Design Model
// Mongoose schema for website design/content
// ===================================================================

import { Schema, model } from 'mongoose';
import { IDesign, DesignModel } from './design.interface';

const heroContentSchema = new Schema({
    badge: {
        text: { type: String, default: 'Premium Learning Platform' },
        textBn: { type: String, default: 'প্রিমিয়াম লার্নিং প্ল্যাটফর্ম' },
        showNew: { type: Boolean, default: true }
    },
    heading: {
        line1: { type: String, default: 'Discover Premium' },
        line1Bn: { type: String, default: 'আবিষ্কার করুন প্রিমিয়াম' },
        line2: { type: String, default: 'Learn' },
        line2Bn: { type: String, default: 'শিখুন' }
    },
    dynamicTexts: {
        type: [String],
        default: ['Professional Courses', 'Software Tools', 'Web Development']
    },
    dynamicTextsBn: {
        type: [String],
        default: ['প্রফেশনাল কোর্স', 'সফটওয়্যার টুলস', 'ওয়েব ডেভেলপমেন্ট']
    },
    description: {
        text: {
            type: String,
            default: 'Access thousands of premium courses, software, and digital products. Built by experts, ready for you to launch in minutes.'
        },
        textBn: {
            type: String,
            default: 'হাজার হাজার প্রিমিয়াম কোর্স, সফটওয়্যার এবং ডিজিটাল প্রোডাক্ট অ্যাক্সেস করুন। বিশেষজ্ঞদের দ্বারা তৈরি।'
        },
        brandName: { type: String, default: 'eJobsIT' }
    },
    features: [{
        text: { type: String },
        textBn: { type: String }
    }],
    searchPlaceholder: {
        text: { type: String, default: 'Search courses, software, themes...' },
        textBn: { type: String, default: 'কোর্স, সফটওয়্যার, থিম খুঁজুন...' }
    },
    stats: {
        activeUsers: { type: Number, default: 5000 },
        downloads: { type: Number, default: 12000 },
        avgRating: { type: Number, default: 4.8 },
        totalProducts: { type: Number, default: 500 }
    }
}, { _id: false });

const contactContentSchema = new Schema({
    hero: {
        badge: { type: String, default: 'Get In Touch' },
        badgeBn: { type: String, default: 'যোগাযোগ করুন' },
        title1: { type: String, default: "Let's " },
        title1Bn: { type: String, default: 'আমাদের সাথে ' },
        title2: { type: String, default: 'Connect' },
        title2Bn: { type: String, default: 'যোগাযোগ করুন' },
        subtitle: { type: String, default: 'Have questions? We would love to hear from you. Send us a message and we will respond as soon as possible.' },
        subtitleBn: { type: String, default: 'কোনো প্রশ্ন আছে? আমাদের মেসেজ পাঠান, আমরা যত তাড়াতাড়ি সম্ভব উত্তর দেব।' }
    },
    contactInfo: {
        email: { type: String, default: 'info@ejobsit.com' },
        phone: { type: String, default: '+88 01730481212' },
        address: { type: String, default: 'Daisy Garden, House 14 (Level-5), Block A, Banasree, Dhaka' },
        addressBn: { type: String, default: 'ডেইজি গার্ডেন, বাড়ি ১৪ (লেভেল-৫), ব্লক এ, বনশ্রী, ঢাকা' },
        officeHours: { type: String, default: 'Sat - Thu: 10:00 AM - 6:00 PM' },
        officeHoursBn: { type: String, default: 'শনি - বৃহস্পতি: সকাল ১০টা - সন্ধ্যা ৬টা' }
    },
    socialLinks: {
        facebook: { type: String, default: 'https://www.facebook.com/ejobsit' },
        youtube: { type: String, default: 'https://www.youtube.com/@ejobsit' },
        linkedin: { type: String, default: 'https://www.linkedin.com/company/ejobsit' },
        whatsapp: { type: String, default: 'https://wa.me/8801730481212' },
        instagram: { type: String, default: 'https://www.instagram.com/ejobsit/' }
    },
    whatsappSection: {
        title: { type: String, default: 'Need Quick Help?' },
        titleBn: { type: String, default: 'দ্রুত সাহায্য দরকার?' },
        description: { type: String, default: 'Chat with us on WhatsApp for instant support and answers to your questions.' },
        descriptionBn: { type: String, default: 'তাৎক্ষণিক সাপোর্টের জন্য হোয়াটসঅ্যাপে আমাদের সাথে চ্যাট করুন।' },
        buttonText: { type: String, default: 'Chat on WhatsApp' },
        buttonTextBn: { type: String, default: 'হোয়াটসঅ্যাপে চ্যাট করুন' }
    },
    mapEmbedUrl: {
        type: String,
        default: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.8986834879085!2d90.41723!3d23.7656976!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c754583dd209%3A0xdd0c5fcc7d2d3836!2sDaisy%20Garden!5e0!3m2!1sen!2sbd!4v1704532086149!5m2!1sen!2sbd'
    }
}, { _id: false });

const designSchema = new Schema<IDesign, DesignModel>(
    {
        section: {
            type: String,
            required: true,
            enum: ['hero', 'about', 'footer', 'topHeader', 'navbar', 'contact'],
            unique: true
        },
        heroContent: heroContentSchema,
        contactContent: contactContentSchema,
        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

// Static method to find by section
designSchema.statics.findBySection = async function (section: string) {
    return this.findOne({ section });
};

export const Design = model<IDesign, DesignModel>('Design', designSchema);
