// components/BootLoader.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { Terminal } from "lucide-react";

interface BootLoaderProps {
  onComplete: () => void;
}

const bootMessages = [
  "[ OK ] Kernel loaded",
  "[ OK ] Modules init",
  "[ OK ] QA engine ready",
  "[ ✓ ] Bug to Future",
];

export default function BootLoader({ onComplete }: BootLoaderProps) {
  const [currentLine, setCurrentLine] = useState(0);
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mouse tracking for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Spring physics for smooth parallax
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  useEffect(() => {
    // Mouse move parallax
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX / innerWidth - 0.5) * 40);
      mouseY.set((clientY / innerHeight - 0.5) * 40);
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    
    // Boot sequence
    if (currentLine < bootMessages.length) {
      const timer = setTimeout(() => {
        setCurrentLine((prev) => prev + 1);
        setProgress(((currentLine + 1) / bootMessages.length) * 100);
      }, 500);
      return () => {
        clearTimeout(timer);
        window.removeEventListener("mousemove", handleMouseMove);
      };
    } else {
      const timer = setTimeout(onComplete, 800);
      return () => {
        clearTimeout(timer);
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, [currentLine, onComplete, mouseX, mouseY]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-50 bg-fedora-darker overflow-hidden flex items-center justify-center"
    >
      {/* ===== DYNAMIC PARALLAX BACKGROUND ===== */}
      
      {/* Layer 1: Grid with mouse parallax */}
      <motion.div
        style={{ x: springX, y: springY }}
        className="absolute inset-0 opacity-30"
      >
        <div className="w-[200%] h-[200%] bg-[linear-gradient(to_right,rgba(48,111,195,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(48,111,195,0.15)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </motion.div>

      {/* Layer 2: Floating particles with independent parallax */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            x: useTransform(springX, (v) => v * (0.3 + i * 0.05)),
            y: useTransform(springY, (v) => v * (0.3 + i * 0.05)),
            left: `${8 + i * 6}%`,
            top: `${12 + (i % 6) * 13}%`,
          }}
          animate={{
            y: [0, -25, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: 5 + i * 0.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute w-1.5 h-1.5 bg-fedora-primary rounded-full"
        />
      ))}

      {/* Layer 3: Glowing orbs with depth parallax */}
      <motion.div
        style={{
          x: useTransform(springX, (v) => v * 0.8),
          y: useTransform(springY, (v) => v * 0.8),
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.15, 0.35, 0.15],
        }}
        transition={{ duration: 7, repeat: Infinity }}
        className="absolute top-1/4 left-1/4 w-80 h-80 bg-fedora-primary/15 rounded-full blur-[100px]"
      />
      
      <motion.div
        style={{
          x: useTransform(springX, (v) => -v * 0.6),
          y: useTransform(springY, (v) => -v * 0.6),
        }}
        animate={{
          scale: [1.3, 1, 1.3],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{ duration: 9, repeat: Infinity, delay: 1.5 }}
        className="absolute bottom-1/4 right-1/4 w-[28rem] h-[28rem] bg-fedora-accent/10 rounded-full blur-[120px]"
      />

      {/* Layer 4: Animated connection lines */}
      <svg className="absolute inset-0 w-full h-full opacity-15">
        {[...Array(5)].map((_, i) => (
          <motion.line
            key={i}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.3 }}
            transition={{ duration: 2.5, delay: i * 0.5, repeat: Infinity, repeatType: "reverse" }}
            x1={`${i * 25}%`}
            y1="0%"
            x2={`${(i + 1) * 18}%`}
            y2="100%"
            stroke="rgba(65,156,222,0.5)"
            strokeWidth="1"
          />
        ))}
      </svg>

      {/* ===== LINUX LOGIN SCREEN - NO ICON ===== */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-lg px-6">
        
        {/* Terminal Icon + Username */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <motion.div
              animate={{ 
                boxShadow: ["0 0 15px rgba(48,111,195,0.3)", "0 0 30px rgba(48,111,195,0.6)", "0 0 15px rgba(48,111,195,0.3)"]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="p-3 rounded-xl bg-fedora-primary/10 border border-fedora-primary/30"
            >
              <Terminal size={28} className="text-fedora-primary" strokeWidth={1.5} />
            </motion.div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold font-mono text-fedora-primary tracking-tight">
            jefry@linux
          </h1>
          <p className="text-fedora-accent/70 text-sm font-mono mt-2">
            ~/bug2future • QA Engineer
          </p>
          <p className="text-fedora-primary/40 text-xs font-mono mt-1">
            Magetan, ID
          </p>
        </motion.div>

        {/* Terminal Boot Messages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="w-full glass rounded-xl p-5 mb-6"
        >
          <div className="flex items-center gap-2 mb-4 text-fedora-accent/60 text-xs font-mono">
            <Terminal size={14} />
            <span>system boot sequence</span>
          </div>
          
          <div className="space-y-2 min-h-[100px]">
            <AnimatePresence>
              {bootMessages.slice(0, currentLine + 1).map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -12, filter: "blur(3px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  className={`font-mono text-sm flex items-center gap-2.5 ${
                    message.includes("WARN")
                      ? "text-tertiary"
                      : message.includes("✓")
                      ? "text-fedora-lightBlue font-semibold"
                      : "text-fedora-accent/85"
                  }`}
                >
                  <span className="text-fedora-primary/60 text-[10px]">
                    {message.includes("WARN") ? "[!]" : "[✓]"}
                  </span>
                  {message.replace(/\[.*?\]\s*/, "")}
                </motion.div>
              ))}
            </AnimatePresence>
            
            {/* Typing cursor */}
            {currentLine < bootMessages.length && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.6, repeat: Infinity }}
                className="inline-block w-2.5 h-4 bg-fedora-lightBlue ml-1 rounded-sm"
              />
            )}
          </div>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="w-full space-y-2.5"
        >
          <div className="flex justify-between text-xs font-mono">
            <span className="text-fedora-accent/60">boot progress</span>
            <motion.span
              key={Math.round(progress)}
              initial={{ scale: 1.3 }}
              animate={{ scale: 1 }}
              className="text-fedora-primary font-bold"
            >
              {Math.round(progress)}%
            </motion.span>
          </div>
          
          <div className="h-2 bg-fedora-dark rounded-full overflow-hidden border border-fedora-primary/20">
            <motion.div
              className="h-full bg-gradient-to-r from-fedora-blue via-fedora-primary to-fedora-lightBlue rounded-full relative"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
            >
              {/* Animated shine effect */}
              <motion.div
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Welcome message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: progress >= 100 ? 0.7 : 0 }}
          transition={{ delay: 0.8 }}
          className="text-center text-xs font-mono text-fedora-accent mt-6"
        >
          initializing QA environment...
        </motion.p>
      </div>

      {/* Footer */}
      <motion.div
        style={{ y: useTransform(springY, (v) => v * 0.1) }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-6 text-center text-xs font-mono text-fedora-accent/30"
      >
        © 2025 bug2future • secure connection established
      </motion.div>
    </motion.div>
  );
}