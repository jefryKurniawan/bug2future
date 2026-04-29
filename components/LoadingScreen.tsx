"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen({ onFinish }: { onFinish: () => void }) {
  const [dots, setDots] = useState(".");
  useEffect(() => {
    const timer = setInterval(() => setDots(prev => prev.length >= 3 ? "." : prev + "."), 500);
    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    const timeout = setTimeout(() => onFinish(), 2500);
    return () => clearTimeout(timeout);
  }, [onFinish]);

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0, y: -50 }} transition={{ duration: 0.5 }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-fedora-dark text-fedora-accent font-mono">
        <div className="text-2xl mb-4">[ OK ] Starting Kernel...</div>
        <div className="text-xl">Loading Portfolio Modules{dots}</div>
        <div className="mt-8 w-64 h-1 bg-fedora-secondary rounded overflow-hidden">
          <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 2.2 }} className="h-full bg-fedora-primary" />
        </div>
        <div className="mt-2 text-xs text-fedora-muted">Initializing UX Components...</div>
      </motion.div>
    </AnimatePresence>
  );
}