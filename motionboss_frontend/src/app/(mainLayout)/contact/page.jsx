"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { LuMail, LuPhone, LuMapPin, LuSend, LuClock, LuArrowRight, LuMessageCircle, LuCheck } from "react-icons/lu";
import { FaFacebookF, FaYoutube, FaLinkedinIn, FaWhatsapp, FaInstagram } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://motionboss-backend.vercel.app/api';

const ContactPage = () => {
  const { t, language } = useLanguage();
  const bengaliClass = language === "bn" ? "hind-siliguri" : "";
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const [messageSent, setMessageSent] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // Dynamic content from API
  const [content, setContent] = useState({
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
  });

  // Fetch dynamic content
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await fetch(`${API_URL}/design/contact`);
        const data = await res.json();
        if (data.success && data.data?.contactContent) {
          setContent(data.data.contactContent);
        }
      } catch (error) {
        console.error('Error fetching contact content:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessageSent(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Dynamic contact info cards
  const contactInfoCards = [
    {
      icon: LuMail,
      title: language === "bn" ? "ইমেইল করুন" : "Email Us",
      value: content.contactInfo.email,
      link: `mailto:${content.contactInfo.email}`,
      color: "#41bfb8",
      gradient: "from-teal-500 to-cyan-500",
    },
    {
      icon: LuPhone,
      title: language === "bn" ? "কল করুন" : "Call Us",
      value: content.contactInfo.phone,
      link: `tel:${content.contactInfo.phone.replace(/\s/g, '')}`,
      color: "#F79952",
      gradient: "from-orange-500 to-amber-500",
    },
    {
      icon: LuMapPin,
      title: language === "bn" ? "আমাদের ঠিকানা" : "Visit Us",
      value: language === "bn" ? content.contactInfo.addressBn : content.contactInfo.address,
      link: "#map",
      color: "#8B5CF6",
      gradient: "from-purple-500 to-violet-500",
    },
    {
      icon: LuClock,
      title: language === "bn" ? "অফিস আওয়ার" : "Office Hours",
      value: language === "bn" ? content.contactInfo.officeHoursBn : content.contactInfo.officeHours,
      link: null,
      color: "#EC4899",
      gradient: "from-pink-500 to-rose-500",
    },
  ];

  const socialLinks = [
    { icon: FaFacebookF, href: content.socialLinks.facebook, label: "Facebook", color: "#1877F2", bg: "bg-blue-500/10 hover:bg-blue-500" },
    { icon: FaYoutube, href: content.socialLinks.youtube, label: "YouTube", color: "#FF0000", bg: "bg-red-500/10 hover:bg-red-500" },
    { icon: FaLinkedinIn, href: content.socialLinks.linkedin, label: "LinkedIn", color: "#0A66C2", bg: "bg-sky-500/10 hover:bg-sky-500" },
    { icon: FaWhatsapp, href: content.socialLinks.whatsapp, label: "WhatsApp", color: "#25D366", bg: "bg-green-500/10 hover:bg-green-500" },
    { icon: FaInstagram, href: content.socialLinks.instagram, label: "Instagram", color: "#E4405F", bg: "bg-pink-500/10 hover:bg-pink-500" },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#020202]">
      {/* Success Modal */}
      {messageSent && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-40"
            onClick={() => setMessageSent(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-11/12 max-w-md bg-white dark:bg-[#0a0a0a] rounded-3xl shadow-2xl p-8 text-center border border-gray-100 dark:border-white/10"
          >
            <div className="w-20 h-20 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-teal-500/30">
              <LuCheck className="text-white text-3xl" />
            </div>
            <h3 className={`text-2xl font-black text-gray-900 dark:text-white mb-3 ${bengaliClass}`}>{t("contactPage.messageSent")}</h3>
            <p className={`text-gray-500 dark:text-gray-400 mb-8 ${bengaliClass}`}>{t("contactPage.messageResponse")}</p>
            <button
              onClick={() => setMessageSent(false)}
              className={`px-8 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-teal-500/30 hover:shadow-xl ${bengaliClass}`}
            >
              {t("contactPage.close")}
            </button>
          </motion.div>
        </>
      )}

      {/* Premium Hero Section */}
      <section className="relative py-16 lg:py-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-[10%] w-[600px] h-[600px] bg-gradient-to-br from-teal-500/20 to-cyan-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-[10%] w-[500px] h-[500px] bg-gradient-to-br from-[#F79952]/15 to-amber-500/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-full blur-3xl"></div>
          <div className="absolute top-20 right-[15%] w-20 h-20 border-2 border-teal-500/20 rounded-2xl rotate-12 animate-float"></div>
          <div className="absolute bottom-32 left-[10%] w-16 h-16 border-2 border-[#F79952]/20 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/3 right-[8%] w-12 h-12 bg-teal-500/10 rounded-xl rotate-45 animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(20,184,166,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,0.02)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
        </div>

        <div className="container mx-auto px-4 lg:px-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-3 mb-6 px-6 py-3 rounded-full bg-gradient-to-r from-gray-900/5 via-teal-500/10 to-gray-900/5 dark:from-white/5 dark:via-teal-500/20 dark:to-white/5 border border-teal-500/20 backdrop-blur-sm">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-teal-500/20 to-cyan-500/20 flex items-center justify-center">
                <LuMessageCircle className="text-teal-500" size={16} />
              </div>
              <span className={`text-sm font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider ${bengaliClass}`}>
                {language === "bn" ? content.hero.badgeBn : content.hero.badge}
              </span>
            </div>

            {/* Premium Title */}
            <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white mb-6 tracking-tight leading-tight ${bengaliClass}`}>
              {language === "bn" ? content.hero.title1Bn : content.hero.title1}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-cyan-500">
                {language === "bn" ? content.hero.title2Bn : content.hero.title2}
              </span>
            </h1>

            <p className={`text-lg lg:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed ${bengaliClass}`}>
              {language === "bn" ? content.hero.subtitleBn : content.hero.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="container mx-auto px-4 lg:px-16 -mt-10 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {contactInfoCards.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group relative bg-white dark:bg-white/5 backdrop-blur-xl border border-gray-100 dark:border-white/10 rounded-2xl p-6 hover:shadow-2xl dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500 hover:-translate-y-2 overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              <div className={`absolute top-0 left-0 w-0 h-1 bg-gradient-to-r ${item.gradient} group-hover:w-full transition-all duration-500`}></div>

              <div className="relative z-10">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all duration-500 group-hover:scale-110"
                  style={{ backgroundColor: `${item.color}15` }}
                >
                  <item.icon className="text-2xl" style={{ color: item.color }} />
                </div>
                <h3 className={`text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 ${bengaliClass}`}>
                  {item.title}
                </h3>
                {item.link ? (
                  <a
                    href={item.link}
                    className={`text-gray-900 dark:text-white font-normal text-base hover:text-teal-500 dark:hover:text-teal-400 transition-colors ${bengaliClass}`}
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className={`text-gray-900 dark:text-white font-normal text-base ${bengaliClass}`}>
                    {item.value}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 lg:px-16 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative bg-white dark:bg-white/5 backdrop-blur-xl border border-gray-100 dark:border-white/10 rounded-3xl p-8 lg:p-10 shadow-xl"
          >
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-teal-500/10 to-cyan-500/5 rounded-full blur-2xl"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-teal-500/20 to-cyan-500/20 flex items-center justify-center">
                  <LuSend className="text-teal-500" size={18} />
                </div>
                <h2 className={`text-2xl lg:text-3xl font-black text-gray-900 dark:text-white ${bengaliClass}`}>
                  {t("contactPage.sendMessage")}
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className={`block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 ${bengaliClass}`}>
                      {t("contactPage.yourName")}
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 dark:focus:border-teal-500 outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className={`block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 ${bengaliClass}`}>
                      {t("contactPage.emailAddress")}
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 dark:focus:border-teal-500 outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className={`block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 ${bengaliClass}`}>
                    {t("contactPage.subject")}
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-5 py-4 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 dark:focus:border-teal-500 outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400 ${bengaliClass}`}
                    placeholder={t("contactPage.howCanWeHelp")}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className={`block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 ${bengaliClass}`}>
                    {t("contactPage.message")}
                  </label>
                  <textarea
                    id="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full px-5 py-4 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 dark:focus:border-teal-500 outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400 resize-none ${bengaliClass}`}
                    placeholder={t("contactPage.yourMessageHere")}
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className={`group relative w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-teal-500/30 hover:shadow-xl overflow-hidden ${bengaliClass}`}
                >
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                  <LuSend className="text-lg group-hover:translate-x-1 transition-transform relative z-10" />
                  <span className="relative z-10">{t("contactPage.send")}</span>
                </button>
              </form>
            </div>
          </motion.div>

          {/* Map & Social */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Map */}
            <div id="map" className="relative bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl overflow-hidden shadow-xl">
              <div className="absolute top-4 left-4 z-10 px-4 py-2 bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-xl border border-gray-200 dark:border-white/10">
                <p className={`text-sm font-bold text-gray-900 dark:text-white ${bengaliClass}`}>
                  {language === 'bn' ? 'আমাদের অফিস' : 'Our Office'}
                </p>
              </div>
              <iframe
                src={content.mapEmbedUrl}
                width="100%"
                height="300"
                className="border-0 grayscale hover:grayscale-0 transition-all duration-500"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Office Location"
              />
            </div>

            {/* Social Links */}
            <div className="bg-white dark:bg-white/5 backdrop-blur-xl border border-gray-100 dark:border-white/10 rounded-3xl p-6 shadow-xl">
              <h3 className={`text-xl font-black text-gray-900 dark:text-white mb-5 ${bengaliClass}`}>
                {t("contactPage.followUs")}
              </h3>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.href}
                    target="_blank"
                    className={`group w-14 h-14 ${item.bg} rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg`}
                    aria-label={item.label}
                  >
                    <item.icon className="text-xl text-gray-600 dark:text-gray-300 group-hover:text-white transition-colors" />
                  </Link>
                ))}
              </div>
              <p className={`mt-5 text-sm text-gray-500 dark:text-gray-400 leading-relaxed ${bengaliClass}`}>
                {t("contactPage.socialDescription")}
              </p>
            </div>

            {/* WhatsApp Quick Contact */}
            <div className="relative overflow-hidden bg-gradient-to-br from-teal-500 via-teal-600 to-cyan-600 rounded-3xl p-8 text-white shadow-xl">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full translate-y-1/2 -translate-x-1/2"></div>
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                    <FaWhatsapp className="text-2xl" />
                  </div>
                  <div>
                    <h3 className={`text-xl font-black ${bengaliClass}`}>
                      {language === 'bn' ? content.whatsappSection.titleBn : content.whatsappSection.title}
                    </h3>
                    <p className={`text-white/70 text-sm ${bengaliClass}`}>
                      {language === 'bn' ? 'এখনই যোগাযোগ করুন' : 'Get instant response'}
                    </p>
                  </div>
                </div>
                <p className={`text-white/80 text-sm mb-6 ${bengaliClass}`}>
                  {language === 'bn' ? content.whatsappSection.descriptionBn : content.whatsappSection.description}
                </p>
                <a
                  href={content.socialLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group inline-flex items-center gap-3 px-6 py-3 bg-white text-teal-600 font-bold rounded-xl hover:shadow-xl transition-all hover:scale-105 ${bengaliClass}`}
                >
                  <span>{language === 'bn' ? content.whatsappSection.buttonTextBn : content.whatsappSection.buttonText}</span>
                  <LuArrowRight className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default ContactPage;
