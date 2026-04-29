"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function SectionHeading({ children, id }: { children: ReactNode; id: string }) {
  return (
    <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-12" id={id}>
      <h2 className="text-3xl md:text-4xl font-bold text-fedora-text font-mono"><span className="text-fedora-primary">#</span> {children}</h2>
      <div className="h-1 w-20 bg-fedora-primary mt-2 rounded-full" />
    </motion.div>
  );
}