"use client";
import { motion } from "framer-motion";

export default function SkillTag({ name, level }: { name: string; level: string }) {
  return (
    <motion.div whileHover={{ scale: 1.1, rotate: 2 }} className="bg-fedora-secondary/30 border border-fedora-primary/30 px-4 py-2 rounded-full text-fedora-text font-mono text-sm flex items-center gap-2 cursor-crosshair">
      <span className="w-2 h-2 rounded-full bg-fedora-primary animate-pulse" />
      {name}<span className="text-xs text-fedora-muted opacity-70">({level})</span>
    </motion.div>
  );
}