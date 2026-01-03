"use client";

import { useEffect, useState } from "react";
import { LuTarget, LuRocket, LuAward, LuArrowRight } from "react-icons/lu";
import { HiOutlineSparkles } from "react-icons/hi2";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

const WhatWeProvide = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { t, language } = useLanguage();
  const bengaliClass = language === "bn" ? "hind-siliguri" : "";

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: LuRocket,
      titleKey: "lifetimeSupport",
      descKey: "lifetimeSupportDesc",
      emoji: "🚀",
      color: "orange",
    },
    {
      icon: LuTarget,
      titleKey: "jobPlacement",
      descKey: "jobPlacementDesc",
      emoji: "🎯",
      color: "teal",
    },
    {
      icon: LuAward,
      titleKey: "getCertification",
      descKey: "getCertificationDesc",
      emoji: "🏅",
      color: "orange",
    }
  ];

  const getColorClasses = (color) => {
    if (color === 'teal') {
      return {
        gradient: 'from-[#41bfb8] to-[#2dd4bf]',
        light: 'bg-[#41bfb8]/10',
        text: 'text-[#41bfb8]',
        border: 'border-[#41bfb8]/20',
      };
    }
    return {
      gradient: 'from-[#F79952] to-[#fb923c]',
      light: 'bg-[#F79952]/10',
      text: 'text-[#F79952]',
      border: 'border-[#F79952]/20',
    };
  };

  return (
    <section className="relative py-24 overflow-hidden">

      {/* CSS for Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes float-reverse {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(20px) rotate(-5deg); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-reverse { animation: float-reverse 7s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
      `}</style>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Circles */}
        <div className="absolute top-20 left-[10%] w-72 h-72 bg-gradient-to-br from-[#41bfb8]/10 to-transparent rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-[10%] w-80 h-80 bg-gradient-to-br from-[#F79952]/10 to-transparent rounded-full blur-3xl animate-float-reverse"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-[#41bfb8]/5 to-[#F79952]/5 rounded-full blur-3xl animate-pulse-slow"></div>

        {/* Geometric Shapes */}
        <div className="absolute top-32 right-[15%] w-16 h-16 border-2 border-[#41bfb8]/20 rounded-xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/4 left-[8%] w-12 h-12 border-2 border-[#F79952]/20 rounded-full animate-float-reverse" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-1/4 right-[8%] w-20 h-20 border-2 border-[#41bfb8]/15 rounded-2xl animate-spin-slow"></div>
        <div className="absolute bottom-32 left-[20%] w-8 h-8 bg-[#F79952]/10 rounded-lg animate-float" style={{ animationDelay: '2s' }}></div>

        {/* Dots Pattern */}
        <div className="absolute top-40 left-[5%] flex flex-col gap-2 opacity-30">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex gap-2">
              {[...Array(3)].map((_, j) => (
                <div key={j} className="w-1.5 h-1.5 bg-[#41bfb8] rounded-full"></div>
              ))}
            </div>
          ))}
        </div>
        <div className="absolute bottom-40 right-[5%] flex flex-col gap-2 opacity-30">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex gap-2">
              {[...Array(3)].map((_, j) => (
                <div key={j} className="w-1.5 h-1.5 bg-[#F79952] rounded-full"></div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-16 relative z-10">
        {/* Premium Section Header - Same as HomeCategory */}
        <div className={`text-center mb-14 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          {/* Premium Badge */}
          <div className="inline-flex items-center gap-3 mb-5 px-5 py-2.5 rounded-full bg-white dark:bg-black/50 border border-teal-500/30 dark:border-teal-500/20 shadow-sm backdrop-blur-md transition-all">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-teal-500/20 to-cyan-500/20 flex items-center justify-center">
              <HiOutlineSparkles className="text-[#41bfb8]" size={14} />
            </div>
            <span className={`text-xs font-black text-gray-700 dark:text-gray-300 uppercase tracking-[0.2em] ${bengaliClass}`}>
              {t("whatWeProvide.badge")}
            </span>
          </div>

          {/* Premium Title */}
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-5 tracking-tight ${bengaliClass}`}>
            {t("whatWeProvide.title1")}<span className="text-primary">{t("whatWeProvide.title2")}</span>
          </h2>

          <p className={`text-gray-500 dark:text-gray-400 text-base lg:text-lg max-w-2xl mx-auto leading-relaxed ${bengaliClass}`}>
            {t("whatWeProvide.subtitle")}
          </p>
        </div>

        {/* Features Grid - Same card style as HomeCategory */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const colors = getColorClasses(feature.color);
            return (
              <div
                key={index}
                className={`group relative bg-white dark:bg-[#0d0d0d] rounded-[2rem] p-8 border border-gray-200 dark:border-white/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)] overflow-hidden ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Card Background Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className={`absolute top-4 right-4 w-24 h-24 rounded-full bg-gradient-to-br ${colors.gradient} opacity-10 blur-xl`}></div>
                </div>

                {/* Decorative Corner */}
                <div className={`absolute -top-10 -right-10 w-24 h-24 rounded-full bg-gradient-to-br ${colors.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>

                {/* Card Inner Design Lines */}
                <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon with Ring */}
                  <div className="relative mb-5">
                    <div className={`w-16 h-16 ${colors.light} rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110`}>
                      <feature.icon size={28} className={`${colors.text} transition-transform duration-500 group-hover:scale-110`} />
                    </div>
                    {/* Decorative ring on hover */}
                    <div className={`absolute inset-0 w-16 h-16 rounded-2xl border-2 ${colors.border} scale-100 opacity-0 group-hover:scale-125 group-hover:opacity-100 transition-all duration-500`}></div>
                  </div>

                  {/* Title with Emoji */}
                  <h3 className={`text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-gray-800 dark:group-hover:text-white transition-colors flex items-center gap-2 ${bengaliClass}`}>
                    {t(`whatWeProvide.features.${feature.titleKey}`)}
                    <span className="text-xl">{feature.emoji}</span>
                  </h3>

                  {/* Description */}
                  <p className={`text-sm text-gray-500 dark:text-gray-400 mb-6 leading-relaxed ${bengaliClass}`}>
                    {t(`whatWeProvide.features.${feature.descKey}`)}
                  </p>

                  {/* Learn More Link */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-white/10">
                    <span className={`text-sm font-semibold ${colors.text} uppercase tracking-widest text-xs ${bengaliClass}`}>
                      {t("whatWeProvide.learnMore")}
                    </span>
                    <div className={`w-8 h-8 rounded-lg ${colors.light} flex items-center justify-center transition-all duration-300 group-hover:bg-gradient-to-r group-hover:${colors.gradient}`}>
                      <LuArrowRight size={16} className={`${colors.text} transition-all duration-300 group-hover:text-white group-hover:translate-x-0.5`} />
                    </div>
                  </div>
                </div>

                {/* Bottom Accent Line */}
                <div className={`absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r ${colors.gradient} group-hover:w-full transition-all duration-500 rounded-b-2xl`}></div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA - Same design as HomeCategory  */}
        <div className={`flex flex-col sm:flex-row items-center justify-center gap-6 mt-14 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <Link
            href="/about"
            className={`group relative bg-white dark:bg-[#0d0d0d] rounded-2xl px-8 py-4 border border-gray-200 dark:border-white/10 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)] flex items-center gap-4 ${bengaliClass}`}
          >
            <span className="font-bold text-gray-900 dark:text-white">
              {t("whatWeProvide.learnMoreAboutUs")}
            </span>
            <div className="w-10 h-10 rounded-xl bg-[#41bfb8]/10 flex items-center justify-center transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-[#41bfb8] group-hover:to-[#2dd4bf]">
              <LuArrowRight size={18} className="text-[#41bfb8] transition-all duration-300 group-hover:text-white group-hover:translate-x-0.5" />
            </div>
            {/* Bottom Accent Line */}
            <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-[#41bfb8] to-[#2dd4bf] group-hover:w-full transition-all duration-500 rounded-b-2xl"></div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WhatWeProvide;
