// components/ExperienceSection.tsx
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Calendar, Briefcase, MapPin, Sparkles, ArrowRight } from "lucide-react";

const experiences = [
  {
    title: "Quality Assurance",
    company: "BIIS CORP",
    location: "Surakarta, Indonesia",
    period: "Feb 2025 – Mar 2026",
    description: "Manual & automation testing for ERP modules (Sales Order, Purchase Order, Inventory, Financial Accounting). UAT with retail clients.",
    skills: ["Playwright", "Cypress", "JIRA", "SQL", "Postman", "Test Case", "UAT", "EUT", "ERP", "Agile", "Linux", "Git"],
    current: true,
    highlight: "ERP Testing Expert",
  },
  {
    title: "Quality Assurance Intern",
    company: "SAMWI (Remote)",
    location: "London, UK",
    period: "Jul 2025 – Aug 2025",
    description: "Cypress automation for online learning platform. E2E & regression testing in Agile workflow.",
    skills: ["Cypress", "Git", "Test Case", "Agile", "E2E Testing"],
    current: false,
    highlight: "Remote International",
  },
  {
    title: "Intern Full Stack Programmer",
    company: "PT. Cipta Karya",
    location: "Malang, Indonesia",
    period: "May 2024 – Aug 2024",
    description: "Web development with Node.js, React, TypeScript, Firebase, Midtrans payment gateway.",
    skills: ["Node.js", "React", "TypeScript", "Firebase", "Midtrans", "Git"],
    current: false,
    highlight: "Full Stack Foundation",
  },
];

export default function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });

  const bgPatternY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const headerScale = useTransform(scrollYProgress, [0, 0.3], [0.92, 1]);
  const timelineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={containerRef} id="experience" className="py-24 px-4 md:px-8 lg:px-20 relative overflow-hidden">
      
      {/* Background Layers */}
      <motion.div style={{ y: bgPatternY }} className="absolute inset-0 bg-gradient-to-b from-background via-fedora-dark/95 to-fedora-darker" />
      
      {/* Grid */}
      <motion.div className="absolute inset-0 opacity-35 pointer-events-none">
        <motion.div style={{ y: bgPatternY }} className="w-[300%] h-[300%] -translate-x-1/3 -translate-y-1/3 bg-[linear-gradient(to_right,rgba(48,111,195,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(48,111,195,0.1)_1px,transparent_1px)] bg-[size:45px_45px]" />
      </motion.div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div style={{ opacity: headerOpacity, scale: headerScale }} initial={{ opacity: 0, y: 40 }} 
          whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} 
          className="mb-20 flex items-center gap-5">
          <motion.div animate={{ rotate: [0, 12, -12, 0] }} transition={{ duration: 5, repeat: Infinity }} 
            className="p-4 rounded-2xl bg-fedora-primary/15 border border-fedora-primary/30">
            <Briefcase className="w-9 h-9 text-fedora-primary" />
          </motion.div>
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-white">Experience</h2>
            <p className="text-secondary text-sm md:text-base mt-2 font-mono">Professional journey & growth</p>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-fedora-primary/60 to-transparent" />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          <motion.div style={{ scaleY: timelineScaleY, originY: 0 }} 
            className="absolute left-4 md:left-9 top-0 bottom-0 w-0.5 bg-gradient-to-b from-fedora-primary via-fedora-accent to-transparent" />

          <div className="space-y-10 md:space-y-14">
            {experiences.map((exp, index) => (
              <ExperienceCard key={index} experience={exp} index={index} scrollYProgress={scrollYProgress} />
            ))}
          </div>
        </div>
        
        {/* Scroll hint */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.2 }} 
          className="flex justify-center mt-16">
          <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 2.5, repeat: Infinity }} 
            className="flex flex-col items-center gap-3 text-secondary/70">
            <div className="w-7 h-12 rounded-full border-2 border-fedora-primary/60 flex items-start justify-center p-1.5">
              <motion.div animate={{ y: [0, 14, 0], opacity: [1, 0, 1] }} transition={{ duration: 2.5, repeat: Infinity }} 
                className="w-2 h-2 rounded-full bg-fedora-primary" />
            </div>
            <span className="text-xs font-mono flex items-center gap-1">explore more <ArrowRight className="w-3 h-3" /></span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ✅ ExperienceCard component - SIMPLIFIED
function ExperienceCard({ experience, index, scrollYProgress }: {
  experience: typeof experiences[0];
  index: number;
  scrollYProgress: any;
}) {
  // ✅ ALL HOOKS AT TOP (no conditionals)
  const ref = useRef<HTMLDivElement>(null);
  const cardY = useTransform(scrollYProgress, [0, 1], [50, 0]);
  const cardOpacity = useTransform(scrollYProgress, [0, 0.35], [0, 1]);
  const cardScale = useTransform(scrollYProgress, [0, 0.35], [0.94, 1]);

  return (
    <motion.div ref={ref} style={{ 
      opacity: cardOpacity, 
      y: cardY, 
      scale: cardScale,
    }} initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} 
      viewport={{ once: true, margin: "-120px" }} transition={{ duration: 0.8, delay: index * 0.25, type: "spring", stiffness: 120 }} 
      className="relative pl-14 md:pl-36 group">
      
      {/* Timeline dot */}
      <motion.div whileHover={{ scale: 1.8 }}
        className={`absolute left-[8px] md:left-[28px] top-11 w-4.5 h-4.5 rounded-full border-2.5 z-10 ${
          experience.current ? "bg-fedora-primary border-fedora-primary" : "bg-background border-fedora-accent"
        }`} />
      
      {/* Card */}
      <motion.div whileHover={{ y: -8, scale: 1.02 }} 
        className={`p-7 md:p-10 rounded-2.5xl border backdrop-blur-md ${
          experience.current ? "bg-fedora-primary/12 border-fedora-primary/50" : "bg-fedora-dark/70 border-fedora-primary/25"
        }`}>
        
        {/* Highlight badge */}
        {experience.highlight && (
          <motion.div initial={{ opacity: 0, y: -10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} 
            transition={{ delay: 0.15, duration: 0.4 }} className="mb-5">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-fedora-primary/20 border border-fedora-primary/40 text-fedora-primary text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5" /> {experience.highlight}
            </span>
          </motion.div>
        )}
        
        <div className="flex flex-col md:flex-row md:justify-between gap-5 mb-7">
          <div className="space-y-3">
            <h3 className={`text-xl md:text-2.5xl font-bold ${experience.current ? "text-fedora-primary" : "text-white"}`}>{experience.title}</h3>
            <p className="text-fedora-accent font-semibold">{experience.company}</p>
            <div className="flex items-center gap-2.5 text-sm text-secondary">
              <MapPin className="w-4.5 h-4.5" /> {experience.location}
            </div>
          </div>
          <div className="flex items-center gap-2.5 px-5 py-3 rounded-full bg-fedora-dark/85 border border-fedora-primary/25 font-mono text-xs text-fedora-lightBlue">
            <Calendar className="w-4.5 h-4.5" /> {experience.period}
          </div>
        </div>

        <p className="text-secondary leading-relaxed mb-7">{experience.description}</p>

        {/* Skills */}
        <div className="flex flex-wrap gap-2.5">
          {experience.skills.map((skill, i) => (
            <motion.span key={skill} initial={{ opacity: 0, scale: 0.75, y: 15 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} 
              viewport={{ once: true }} transition={{ delay: i * 0.05, type: "spring", stiffness: 400 }} 
              whileHover={{ scale: 1.15, y: -4 }} 
              className="px-4 py-2 rounded-full bg-fedora-primary/8 border border-fedora-primary/25 text-fedora-primary text-xs font-mono">
              {skill}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}