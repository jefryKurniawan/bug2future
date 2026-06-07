// components/BootLoader.tsx
"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal } from "lucide-react";

interface BootLoaderProps {
  onComplete: () => void;
}

export default function BootLoader({ onComplete }: BootLoaderProps) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 bg-fedora-darker flex items-center justify-center"
    >
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-[linear-gradient(to_right,rgba(48,111,195,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(48,111,195,0.08)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-3 rounded-xl bg-fedora-primary/10 border border-fedora-primary/30 mb-4"
        >
          <Terminal size={28} className="text-fedora-primary" strokeWidth={1.5} />
        </motion.div>
        <h1 className="text-2xl font-bold font-mono text-fedora-primary">
          jefry@linux
        </h1>
        <p className="text-xs font-mono text-fedora-accent/50 mt-2">
          ~/bug2future
        </p>
      </div>
    </motion.div>
  );
}