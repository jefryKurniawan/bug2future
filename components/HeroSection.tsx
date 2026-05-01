// components/HeroSection.tsx
"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue, useReducedMotion } from "framer-motion";
import { useRef, useEffect, useState, useMemo, useCallback } from "react";
import { Download, Terminal, CheckCircle, Bug, Box, Server, Zap, FileCheck, Layers, ShieldCheck, RefreshCcw, TestTube, Cloud, Quote } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  
  const prefersReducedMotion = useReducedMotion();
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { stiffness: prefersReducedMotion ? 0 : 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: prefersReducedMotion ? 0 : 100, damping: 30 });
  
  const { scrollYProgress } = useScroll({ 
    target: containerRef, 
    offset: ["start start", "end start"]
  });

  // Essential transforms only
  const bgGridY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  const photoRotateX = useTransform(mouseY, [-0.5, 0.5], prefersReducedMotion ? [0, 0] : [8, -8]);
  const photoRotateY = useTransform(mouseX, [-0.5, 0.5], prefersReducedMotion ? [0, 0] : [-8, 8]);
  const photoScale = useMotionValue(1);
  
  const quoteRotateX = useTransform(mouseY, [-0.5, 0.5], prefersReducedMotion ? [0, 0] : [6, -6]);
  const quoteRotateY = useTransform(mouseX, [-0.5, 0.5], prefersReducedMotion ? [0, 0] : [-6, 6]);
  
  const cursorX = useSpring(mouseX, { stiffness: prefersReducedMotion ? 0 : 400, damping: 25 });
  const cursorY = useSpring(mouseY, { stiffness: prefersReducedMotion ? 0 : 400, damping: 25 });
  
  const [displayedName, setDisplayedName] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const fullName = "Jefry Kurniawan";
  const quote = "The future cannot be predicted, but futures can be invented.";
  const quoteAuthor = "- Dennis Gabor (1963)";

  // Pre-compute particles
  const particles = useMemo(() => 
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: `${8 + i * 7}%`,
      top: `${12 + (i % 5) * 15}%`,
      parallaxFactor: 0.25 + i * 0.03,
      floatAmount: -12 - i * 1.5,
      floatDuration: 5 + i * 0.4,
      floatDelay: i * 0.25,
      scaleAmount: 1.2 + i * 0.03,
    })), []);

  // Pre-compute tech badges
  const techBadges = useMemo(() => [
    { text: "Playwright", icon: Server, x: "calc(100% - 50px)", y: "25%", delay: 0, duration: 4 },
    { text: "Cypress", icon: Zap, x: "calc(100% + 15px)", y: "35%", delay: 0.6, duration: 4.5 },
    { text: "k6", icon: RefreshCcw, x: "calc(100% + 25px)", y: "70%", delay: 1.5, duration: 4.2 },
    { text: "JIRA", icon: FileCheck, x: "-40px", y: "20%", delay: 0.3, duration: 4.3 },
    { text: "SQL", icon: Layers, x: "-35px", y: "50%", delay: 1, duration: 5 },
    { text: "UAT", icon: ShieldCheck, x: "-45px", y: "75%", delay: 0.8, duration: 3.8 },
  ], []);

  // Typing animation
  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayedName(fullName);
      return;
    }
    
    let currentIndex = 0;
    let isDeleting = false;
    let animationFrameId: number;
    let lastTime = 0;
    const typingSpeed = 80;
    const deleteSpeed = 40;

    const type = (timestamp: number) => {
      if (timestamp - lastTime < (isDeleting ? deleteSpeed : typingSpeed)) {
        animationFrameId = requestAnimationFrame(type);
        return;
      }
      lastTime = timestamp;
      
      if (!isDeleting) {
        if (currentIndex <= fullName.length) {
          setDisplayedName(fullName.slice(0, currentIndex));
          currentIndex++;
          animationFrameId = requestAnimationFrame(type);
        } else {
          setTimeout(() => {
            isDeleting = true;
            animationFrameId = requestAnimationFrame(type);
          }, 2000);
        }
      } else {
        if (currentIndex >= 0) {
          setDisplayedName(fullName.slice(0, currentIndex));
          currentIndex--;
          animationFrameId = requestAnimationFrame(type);
        } else {
          isDeleting = false;
          setTimeout(() => {
            animationFrameId = requestAnimationFrame(type);
          }, 300);
        }
      }
    };
    
    animationFrameId = requestAnimationFrame(type);
    return () => cancelAnimationFrame(animationFrameId);
  }, [prefersReducedMotion]);

  // Cursor blink
  useEffect(() => {
    if (prefersReducedMotion) {
      setShowCursor(true);
      return;
    }
    const interval = setInterval(() => setShowCursor(v => !v), 600);
    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    
    let ticking = false;
    const handleMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const { clientX, clientY } = e;  
          const { innerWidth, innerHeight } = window; 
          mouseX.set((clientX / innerWidth - 0.5) * 2);
          mouseY.set((clientY / innerHeight - 0.5) * 2);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, prefersReducedMotion]);

  // Memoized handlers
  const handlePhotoHover = useCallback(() => photoScale.set(1.02), []);
  const handlePhotoLeave = useCallback(() => photoScale.set(1), []);
  
  const handleContactClick = useCallback(() => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section
      id="home"
      ref={containerRef}
      className="min-h-screen flex items-center relative overflow-hidden px-4 md:px-8 lg:px-20 py-20"
      suppressHydrationWarning
    >
      {/* Background Layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-fedora-darker via-fedora-dark to-background" />
      
      <motion.div style={{ y: bgGridY }} className="absolute inset-0 opacity-25"
        animate={{ opacity: prefersReducedMotion ? 0.25 : [0.2, 0.3, 0.25] }}
        transition={{ duration: 8, repeat: Infinity }}>
        <div className="w-full h-full bg-[linear-gradient(to_right,rgba(48,111,195,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(48,111,195,0.08)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </motion.div>
      
      {!prefersReducedMotion && particles.map((p) => (
        <motion.div key={p.id} style={{ x: springX, y: springY, left: p.left, top: p.top }}
          animate={{ y: [0, p.floatAmount, 0], opacity: [0.15, 0.4, 0.15] }}
          transition={{ duration: p.floatDuration, repeat: Infinity, ease: "easeInOut", delay: p.floatDelay, repeatType: "reverse" }}
          className="absolute w-1.5 h-1.5 md:w-2 md:h-2 bg-fedora-primary/60 rounded-full" />
      ))}
      
      <motion.div style={{ y: prefersReducedMotion ? 0 : springY }} 
        animate={{ scale: prefersReducedMotion ? 1 : [1, 1.2, 1], opacity: prefersReducedMotion ? 0.15 : [0.1, 0.2, 0.15] }} 
        transition={{ duration: 10, repeat: Infinity }} 
        className="absolute top-10 left-10 w-72 h-72 md:w-80 md:h-80 bg-fedora-primary/15 rounded-full blur-[100px]" />
      
      <motion.div style={{ y: prefersReducedMotion ? 0 : springY }} 
        animate={{ scale: prefersReducedMotion ? 1 : [1.2, 1, 1.2], opacity: prefersReducedMotion ? 0.1 : [0.08, 0.15, 0.1] }} 
        transition={{ duration: 12, repeat: Infinity, delay: 1 }} 
        className="absolute bottom-10 right-10 w-80 h-80 md:w-96 md:h-96 bg-fedora-accent/10 rounded-full blur-[120px]" />
      
      <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <line key={i} x1={`${i * 28}%`} y1="0%" x2={`${(i + 1) * 20}%`} y2="100%" stroke="rgba(65,156,222,0.3)" strokeWidth="1" />
        ))}
      </svg>
      
      {!prefersReducedMotion && (
        <motion.div style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%" }} 
          className="fixed w-40 h-40 md:w-56 md:h-56 bg-fedora-primary/8 rounded-full blur-[50px] pointer-events-none z-0 hidden md:block" />
      )}

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full relative z-10 max-w-7xl mx-auto">
        
        <motion.div style={{ y: contentY, opacity: contentOpacity }} className="flex flex-col items-start gap-4 md:gap-6">
          
          <div className="space-y-3 md:space-y-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-gradient leading-tight">
              {displayedName}
              {!prefersReducedMotion && (
                <span className={`inline-block w-1 md:w-2 h-8 md:h-12 ml-1 bg-fedora-primary align-middle ${showCursor ? 'opacity-100' : 'opacity-0'}`} />
              )}
            </h1>

            <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }} 
              className="text-base md:text-xl lg:text-2xl text-secondary flex flex-wrap items-center gap-2 md:gap-3 font-mono">
              <span className="text-primary font-semibold">QA Engineer</span>
              <span className="text-primary/40">•</span>
              <span>Automation Tester</span>
            </motion.h2>
          </div>

          <motion.div ref={photoRef} style={{ rotateX: quoteRotateX, rotateY: quoteRotateY, y: contentY }}
            initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, duration: 0.6 }}
            whileHover={{ scale: prefersReducedMotion ? 1 : 1.02 }}
            className="relative p-4 md:p-5 rounded-xl glass border border-fedora-primary/25 backdrop-blur-sm max-w-xl">
            <Quote className="w-5 h-5 text-fedora-primary/40 mb-2" />
            <p className="text-sm md:text-base text-fedora-accent/90 italic leading-relaxed font-medium">{quote}</p>
            <p className="text-xs md:text-sm text-fedora-primary/70 mt-2 font-mono text-right">{quoteAuthor}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="flex flex-wrap gap-3 md:gap-4">
            <motion.button onClick={handleContactClick} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} 
              className="bg-fedora-primary text-fedora-darker px-6 md:px-8 py-3 md:py-3.5 rounded-lg font-mono text-sm font-semibold hover:bg-fedora-lightBlue transition-colors flex items-center gap-2">
              <Terminal className="w-4 h-4" /> ./contact.sh
            </motion.button>
            <motion.a href="/CV-Jk.pdf" download whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} 
              className="glass text-fedora-primary px-6 md:px-8 py-3 md:py-3.5 rounded-lg font-mono text-sm font-semibold hover:bg-fedora-primary/10 transition-colors flex items-center gap-2 border border-fedora-primary/25">
              <Download className="w-4 h-4" /> CV.pdf
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Right Content - Photo */}
        <motion.div ref={photoRef} style={{ scale: prefersReducedMotion ? 1 : undefined, rotateX: photoRotateX, rotateY: photoRotateY }}
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 0.7 }}
          className="relative hidden lg:block" onHoverStart={handlePhotoHover} onHoverEnd={handlePhotoLeave}>
          
          {!prefersReducedMotion && (
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 80, repeat: Infinity, ease: "linear" }} 
              className="absolute inset-0 w-[360px] h-[360px] mx-auto rounded-full border border-fedora-primary/20" />
          )}
          
          <motion.div style={{ scale: photoScale }} className="relative w-[300px] h-[300px] mx-auto rounded-full overflow-hidden glass p-1 z-10">
            <Image src="/photo_.webp" alt="Jefry Kurniawan - QA Engineer" fill 
              className="object-cover rounded-full filter grayscale hover:grayscale-0 transition-all duration-500" 
              priority sizes="300px" style={{ objectPosition: 'center 15%', objectFit: 'cover' }}
              placeholder="blur" blurDataURL="data:image/webp;base64,UklGRhYAAABXRUJQVlA4IEoAAADQAQCdASoBAAEAAUAmJYgCdAEO/hOMAAD++G+O" />
          </motion.div>

          <motion.div animate={{ y: prefersReducedMotion ? [0, -6, 0] : [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }} 
            className="absolute top-5 right-8 glass px-3 py-2 rounded-lg border border-fedora-primary/25">
            <div className="flex items-center gap-1.5"><Bug className="w-3.5 h-3.5 text-red-400" /><span className="font-mono text-[10px] text-fedora-lightBlue">0 Bugs</span></div>
          </motion.div>
          
          <motion.div animate={{ y: prefersReducedMotion ? [0, 6, 0] : [0, 10, 0] }} transition={{ duration: 3, repeat: Infinity, delay: 0.8 }} 
            className="absolute bottom-5 left-8 glass px-3 py-2 rounded-lg border border-fedora-primary/25">
            <div className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-green-400" /><span className="font-mono text-[10px] text-fedora-lightBlue">All Pass</span></div>
          </motion.div>
          
          <motion.div animate={{ y: prefersReducedMotion ? [0, -5, 0] : [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, delay: 0.4 }} 
            className="absolute top-1/2 -right-6 glass p-2 rounded-lg border border-fedora-primary/25">
            <Box className="w-4 h-4 text-fedora-primary" />
          </motion.div>
          
          {!prefersReducedMotion && techBadges.map((badge) => {
            const IconComponent = badge.icon;
            return (
              <motion.div key={badge.text} style={{ position: 'absolute', right: badge.x, top: badge.y, x: springX, y: springY }}
                animate={{ y: [0, -8, 0], scale: [1, 1.03, 1] }}
                transition={{ duration: badge.duration, repeat: Infinity, delay: badge.delay, repeatType: "reverse" }}
                className="glass px-2.5 py-1.5 rounded-lg border border-fedora-primary/20 flex items-center gap-1.5">
                <IconComponent className="w-2.5 h-2.5 text-fedora-primary" />
                <span className="text-[10px] font-mono font-semibold text-fedora-primary whitespace-nowrap">{badge.text}</span>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Mobile Photo */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="relative lg:hidden flex justify-center mt-4">
          <div className="relative w-60 h-60 rounded-full overflow-hidden glass p-1">
            <Image src="/photo_.webp" alt="Jefry Kurniawan" fill 
              className="object-cover rounded-full filter grayscale hover:grayscale-0 transition-all duration-500" 
              priority sizes="240px" style={{ objectPosition: 'center 15%', objectFit: 'cover' }} />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <motion.div animate={{ y: prefersReducedMotion ? [0, 6, 0] : [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }} 
          className="w-5 h-8 rounded-full border border-fedora-primary/40 flex items-start justify-center p-1">
          <motion.div animate={{ y: [0, 8, 0], opacity: [1, 0, 1] }} transition={{ duration: 2, repeat: Infinity }} className="w-1 h-1.5 rounded-full bg-fedora-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
}