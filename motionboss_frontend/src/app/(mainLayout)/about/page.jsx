"use client";

import React, { useEffect, useState, useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import Lenis from 'lenis';
import AboutHero from "@/components/Aboutpage/AboutHero";
import AboutStats from "@/components/Aboutpage/AboutStats";
import AboutMission from "@/components/Aboutpage/AboutMission";
import AboutGlobal from "@/components/Aboutpage/AboutGlobal";
import AboutFounder from "@/components/Aboutpage/AboutFounder";
import AboutFeatures from "@/components/Aboutpage/AboutFeatures";
import AboutCTA from "@/components/Aboutpage/AboutCTA";

// Component to handle mouse light without re-rendering the whole page
const MouseLight = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const lightX = useSpring(mouseX, { stiffness: 50, damping: 30, mass: 0.5 });
  const lightY = useSpring(mouseY, { stiffness: 50, damping: 30, mass: 0.5 });

  return (
    <motion.div
      className="fixed top-0 left-0 w-[600px] h-[600px] rounded-full bg-teal-500/[0.04] dark:bg-teal-500/[0.06] blur-[150px] pointer-events-none z-[1] hidden lg:block"
      style={{
        x: useTransform(lightX, (v) => v - 300),
        y: useTransform(lightY, (v) => v - 300)
      }}
    />
  );
};

// Generic Transition Wrapper defined OUTSIDE to prevent remounting on every parent render
const ScrollSection = ({ children, className = "" }) => {
  const ref = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress: rawSectionProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center", "end start"]
  });

  // We use a very soft spring to prevent jittering/shaking
  const sectionProgress = useSpring(rawSectionProgress, {
    stiffness: 50,
    damping: 40,
    restDelta: 0.001
  });

  // Wider ranges to prevent content from "disappearing" or "turning white" too quickly
  const scale = useTransform(sectionProgress, [0, 0.45, 0.55, 1], [0.95, 1, 1, 0.95]);
  const opacity = useTransform(sectionProgress, [0, 0.35, 0.65, 1], [0.3, 1, 1, 0.3]);

  return (
    <motion.div
      ref={ref}
      style={isMobile ? {} : {
        scale,
        opacity,
        willChange: "transform, opacity"
      }}
      className={`w-full origin-center ${className}`}
    >
      {children}
    </motion.div>
  );
};

const AboutPage = () => {
  const { scrollYProgress } = useScroll();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Initialize Smooth Scroll (Lenis) - remains stable
  useEffect(() => {
    if (window.innerWidth < 1024) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  // Stabilized Hero progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // 1. Original Hero Scroll Transforms
  const heroScale = useTransform(smoothProgress, [0, 0.15], [1, 0.85]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);
  const heroY = useTransform(smoothProgress, [0, 0.15], [0, -100]);
  const heroBlur = useTransform(smoothProgress, [0, 0.15], ["0px", "20px"]);

  return (
    <div className="relative min-h-screen bg-white dark:bg-black selection:bg-teal-500 selection:text-black font-poppins antialiased">
      <MouseLight />

      {/* Scroll Progress Indicator */}
      <motion.div className="fixed top-0 left-0 w-full h-[3px] bg-teal-500/10 z-[10000]">
        <motion.div className="h-full bg-teal-500 origin-left" style={{ scaleX: scrollYProgress }} />
      </motion.div>

      <main className="relative">
        {/* Layer 0: Original Sticky Hero */}
        <section className={`${isMobile ? 'relative' : 'sticky top-0'} h-[50vh] lg:h-screen w-full overflow-hidden z-0 bg-white dark:bg-black`}>
          <motion.div
            style={isMobile ? {} : {
              scale: heroScale,
              opacity: heroOpacity,
              y: heroY,
              filter: `blur(${heroBlur})`
            }}
            className="h-full w-full"
          >
            <AboutHero />
          </motion.div>
        </section>

        {/* Following Sections with Stabilized Transitions */}
        <section className={`relative z-10 bg-white dark:bg-[#020202] ${isMobile ? '' : 'shadow-[0_-80px_100px_rgba(0,0,0,0.1)] dark:shadow-[0_-80px_100px_rgba(0,0,0,0.6)] rounded-t-[50px] lg:rounded-t-[100px]'}`}>
          {/* First Section - Extra top padding for rounded area */}
          <ScrollSection className="pt-16 lg:pt-24 pb-12 lg:pb-16">
            <AboutFounder />
          </ScrollSection>

          {/* Features - Larger section with sticky sidebar */}
          <ScrollSection className="py-12 lg:py-16">
            <AboutFeatures />
          </ScrollSection>

          {/* Middle Sections - Consistent spacing */}
          <ScrollSection className="py-12 lg:py-16">
            <AboutStats />
          </ScrollSection>

          <ScrollSection>
            <AboutGlobal />
          </ScrollSection>

          {/* Last Section - Extra bottom padding before footer */}
          <ScrollSection className="pt-12 lg:pt-16 pb-20 lg:pb-28">
            <AboutCTA />
          </ScrollSection>
        </section>
      </main>
    </div>
  );
};

export default AboutPage;
