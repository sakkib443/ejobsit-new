// ===================================================================
// MotionBoss LMS - Design Service
// Business logic for Design module
// ===================================================================

import { IDesign } from './design.interface';
import { Design } from './design.model';

/**
 * Get design by section
 */
const getDesignBySection = async (section: string): Promise<IDesign | null> => {
    let design = await Design.findBySection(section);

    // If hero section doesn't exist, create default
    if (!design && section === 'hero') {
        design = await Design.create({
            section: 'hero',
            heroContent: {
                badge: {
                    text: 'Premium Learning Platform',
                    textBn: 'প্রিমিয়াম লার্নিং প্ল্যাটফর্ম',
                    showNew: true
                },
                heading: {
                    line1: 'Discover Premium',
                    line1Bn: 'আবিষ্কার করুন প্রিমিয়াম'
                },
                dynamicTexts: ['Professional Courses', 'Software Tools', 'Web Development'],
                dynamicTextsBn: ['প্রফেশনাল কোর্স', 'সফটওয়্যার টুলস', 'ওয়েব ডেভেলপমেন্ট'],
                description: {
                    text: 'Access thousands of premium courses, software, and digital products. Built by experts, ready for you to launch in minutes.',
                    textBn: 'হাজার হাজার প্রিমিয়াম কোর্স, সফটওয়্যার এবং ডিজিটাল প্রোডাক্ট অ্যাক্সেস করুন। বিশেষজ্ঞদের দ্বারা তৈরি।',
                    brandName: 'eJobsIT'
                },
                features: [
                    { text: 'Instant Access', textBn: 'তাৎক্ষণিক অ্যাক্সেস' },
                    { text: 'Lifetime Updates', textBn: 'আজীবন আপডেট' },
                    { text: 'Premium Support', textBn: 'প্রিমিয়াম সাপোর্ট' },
                    { text: 'Money Back Guarantee', textBn: 'মানি ব্যাক গ্যারান্টি' }
                ],
                searchPlaceholder: {
                    text: 'Search courses, software, themes...',
                    textBn: 'কোর্স, সফটওয়্যার, থিম খুঁজুন...'
                },
                stats: {
                    activeUsers: 5000,
                    downloads: 12000,
                    avgRating: 4.8,
                    totalCourses: 500
                }
            },
            isActive: true
        });
    }

    // If contact section doesn't exist, create default
    if (!design && section === 'contact') {
        design = await Design.create({
            section: 'contact',
            contactContent: {
                hero: {
                    badge: 'Get In Touch',
                    badgeBn: 'যোগাযোগ করুন',
                    title1: "Let's ",
                    title1Bn: 'আমাদের সাথে ',
                    title2: 'Connect',
                    title2Bn: 'যোগাযোগ করুন',
                    subtitle: 'Have questions? We would love to hear from you. Send us a message and we will respond as soon as possible.',
                    subtitleBn: 'কোনো প্রশ্ন আছে? আমাদের মেসেজ পাঠান, আমরা যত তাড়াতাড়ি সম্ভব উত্তর দেব।'
                },
                contactInfo: {
                    email: 'info@ejobsit.com',
                    phone: '+88 01730481212',
                    address: 'Daisy Garden, House 14 (Level-5), Block A, Banasree, Dhaka',
                    addressBn: 'ডেইজি গার্ডেন, বাড়ি ১৪ (লেভেল-৫), ব্লক এ, বনশ্রী, ঢাকা',
                    officeHours: 'Sat - Thu: 10:00 AM - 6:00 PM',
                    officeHoursBn: 'শনি - বৃহস্পতি: সকাল ১০টা - সন্ধ্যা ৬টা'
                },
                socialLinks: {
                    facebook: 'https://www.facebook.com/ejobsit',
                    youtube: 'https://www.youtube.com/@ejobsit',
                    linkedin: 'https://www.linkedin.com/company/ejobsit',
                    whatsapp: 'https://wa.me/8801730481212',
                    instagram: 'https://www.instagram.com/ejobsit/'
                },
                whatsappSection: {
                    title: 'Need Quick Help?',
                    titleBn: 'দ্রুত সাহায্য দরকার?',
                    description: 'Chat with us on WhatsApp for instant support and answers to your questions.',
                    descriptionBn: 'তাৎক্ষণিক সাপোর্টের জন্য হোয়াটসঅ্যাপে আমাদের সাথে চ্যাট করুন।',
                    buttonText: 'Chat on WhatsApp',
                    buttonTextBn: 'হোয়াটসঅ্যাপে চ্যাট করুন'
                },
                mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.8986834879085!2d90.41723!3d23.7656976!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c754583dd209%3A0xdd0c5fcc7d2d3836!2sDaisy%20Garden!5e0!3m2!1sen!2sbd!4v1704532086149!5m2!1sen!2sbd'
            },
            isActive: true
        });
    }

    return design;
};

/**
 * Get all designs
 */
const getAllDesigns = async (): Promise<IDesign[]> => {
    return Design.find({});
};

/**
 * Update design by section
 */
const updateDesignBySection = async (
    section: string,
    payload: Partial<IDesign>
): Promise<IDesign | null> => {
    // Use upsert to create if doesn't exist
    const result = await Design.findOneAndUpdate(
        { section },
        { $set: payload },
        { new: true, upsert: true }
    );
    return result;
};

/**
 * Create or update design
 */
const createDesign = async (payload: IDesign): Promise<IDesign> => {
    // Check if section already exists
    const existing = await Design.findOne({ section: payload.section });

    if (existing) {
        // Update existing
        const updated = await Design.findOneAndUpdate(
            { section: payload.section },
            { $set: payload },
            { new: true }
        );
        return updated!;
    }

    // Create new
    const result = await Design.create(payload);
    return result;
};

export const DesignService = {
    getDesignBySection,
    getAllDesigns,
    updateDesignBySection,
    createDesign
};
