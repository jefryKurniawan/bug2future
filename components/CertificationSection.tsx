"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import { Award, ExternalLink, Sparkles } from "lucide-react";
import { certifications } from "@/data/certifications";

export default function CertificationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgGradientY = useTransform(scrollYProgress, (v: number) => v * -100);

  return (
    <section ref={sectionRef} id="certifications" className="py-24 md:py-32 px-4 md:px-8 lg:px-16 bg-background relative overflow-hidden">
      {/* Background gradient */}
      <motion.div style={{ y: bgGradientY }} className="absolute inset-0 bg-gradient-to-b from-background via-[var(--section-mid)] to-background" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-5 mb-12 md:mb-16"
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.08, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="p-3 rounded-xl bg-primary/15 border border-primary/30 shadow-lg shadow-primary/10"
          >
            <Award className="w-7 h-7 text-primary" />
          </motion.div>

          <div className="flex items-center gap-4">
            <h2 className="text-2xl md:text-4xl font-bold text-on-surface font-h2 tracking-tight">
              <span className="text-primary mr-3 font-mono inline-block">❯</span>
              Certifications
            </h2>
            <motion.span
              animate={{ opacity: [1, 0.2, 1], scaleY: [1, 0.8, 1] }}
              transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
              className="w-3 h-7 bg-primary rounded-sm inline-block origin-bottom"
            />
          </div>
        </motion.div>

        {/* Grid */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
        >
          {certifications.map((cert) => (
            <motion.div
              key={cert.name}
              variants={{
                hidden: { opacity: 0, y: 25, scale: 0.95 },
                visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 400, damping: 30 } },
              }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group bg-surface/70 backdrop-blur-sm border border-outline-variant/50 rounded-xl p-5 md:p-6 hover:border-primary/60 hover:bg-surface-container/60 transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <h3 className="font-mono text-sm md:text-base text-on-surface font-semibold leading-snug flex-1">{cert.name}</h3>
                <motion.div
                  initial={false}
                  animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Award className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                </motion.div>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-on-surface-variant/70">
                <ExternalLink className="w-3.5 h-3.5" />
                <span>{cert.issuer}</span>
                <span className="text-outline-variant">•</span>
                <span>{cert.date}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.7 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-10 text-center text-sm text-on-surface-variant/70 font-mono"
        >
          <span className="text-primary inline-block mr-1">❯</span>
          <motion.span animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2.5, repeat: Infinity }}>
            {certifications.length} certifications earned
          </motion.span>
        </motion.p>
      </div>
    </section>
  );
}
