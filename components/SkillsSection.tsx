// components/SkillsSection.tsx
"use client";

import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
  type Variants,
} from "framer-motion";
import { useRef, useState, useMemo } from "react";
import { Wrench, Code, Shield, Terminal, Database, ChevronRight, Sparkles } from "lucide-react";
import { skillCategories, levelConfig, type SkillLevel } from "@/data/skills";

const iconMap: Record<string, React.ElementType> = {
  Shield, Code, Terminal, Database,
};

const levelColorValues: Record<SkillLevel, { hex: string; rgba: string; label: string; pulse: string }> = {
  core: { hex: levelConfig.core.hex, rgba: "rgba(219, 112, 112, 0.5)", label: levelConfig.core.label, pulse: "0 0 20px rgba(219, 112, 112, 0.3)" },
  advanced: { hex: levelConfig.advanced.hex, rgba: "rgba(200, 100, 100, 0.5)", label: levelConfig.advanced.label, pulse: "0 0 20px rgba(200, 100, 100, 0.3)" },
  familiar: { hex: levelConfig.familiar.hex, rgba: "rgba(232, 168, 76, 0.5)", label: levelConfig.familiar.label, pulse: "0 0 20px rgba(232, 168, 76, 0.3)" },
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 400, damping: 30, mass: 0.8 },
  },
};

export default function SkillsSection() {
  const [activeTab, setActiveTab] = useState<string>("qa-core");
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  
  const bgGridY = useTransform(scrollYProgress, (v: number) => v * 80);
  const bgGradientY = useTransform(scrollYProgress, (v: number) => v * -120);
  const headerScale = useTransform(scrollYProgress, (v: number) => 0.95 + v * 0.05);
  const headerRotate = useTransform(scrollYProgress, (v: number) => v * 2);
  const gridOpacity = useTransform(scrollYProgress, (v: number) => v < 0.5 ? v * 0.8 : 0.4 - (v - 0.5) * 0.8);
  const skillCardY = useTransform(scrollYProgress, (v: number) => 20 - v * 20);
  const skillCardScale = useTransform(scrollYProgress, (v: number) => 0.98 + v * 0.02);
  const hintParallaxY = useTransform(scrollYProgress, (v: number) => v > 0.8 ? (v - 0.8) * 100 : 0);

  const headerOpacity = useTransform(scrollYProgress, (v: number): number => {
    if (v < 0.2) return v / 0.2;
    if (v > 0.8) return 1 - (v - 0.8) / 0.2;
    return 1;
  });

  const bgOpacity = useTransform(scrollYProgress, (v: number): number => {
    if (v < 0.3) return v * 1.17;
    if (v > 0.7) return 0.35 - (v - 0.7) * 1.17;
    return 0.35;
  });

  const activeGradient = useMemo(() => {
    const cat = skillCategories.find(c => c.id === activeTab);
    return cat?.gradient || skillCategories[0].gradient;
  }, [activeTab]);

  const activeCategory = useMemo(
    () => skillCategories.find((cat) => cat.id === activeTab) || skillCategories[0],
    [activeTab]
  );

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    if (containerRef.current) {
      containerRef.current.animate(
        [{ transform: 'scale(1)' }, { transform: 'scale(1.005)' }, { transform: 'scale(1)' }],
        { duration: 150, easing: 'ease-out' }
      );
    }
  };

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="py-24 md:py-32 px-4 md:px-8 lg:px-16 bg-background relative overflow-hidden"
    >
      {/* Background gradient */}
      <motion.div 
        style={{ y: bgGradientY, opacity: bgOpacity }}
        className="absolute inset-0 bg-gradient-to-b from-background via-[#1a1d24] to-background"
      />

      {/* Grid */}
      <motion.div style={{ y: bgGridY, opacity: gridOpacity }} className="absolute inset-0 pointer-events-none">
        <div 
          className="w-[400%] h-[400%] -translate-x-3/8 -translate-y-3/8"
          style={{
            backgroundImage: `linear-gradient(rgba(219, 112, 112, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(219, 112, 112, 0.06) 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
      </motion.div>

      {/* Active category gradient overlay */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className={`absolute inset-0 bg-gradient-to-br ${activeGradient} pointer-events-none transition-all duration-500`}
      />

      <div ref={containerRef} className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          style={{ opacity: headerOpacity, scale: headerScale, rotate: headerRotate }}
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-5 mb-12 md:mb-16"
        >
          <motion.div 
            animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.1, 1] }} 
            transition={{ duration: 6, repeat: Infinity }}
            className="p-3 rounded-xl bg-primary/15 border border-primary/30 shadow-lg shadow-primary/10"
          >
            <Wrench className="w-7 h-7 text-primary" />
          </motion.div>
          <h2 className="text-2xl md:text-4xl font-bold text-on-surface font-h2 tracking-tight">
            <motion.span 
              className="text-primary mr-3 font-mono inline-block"
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ❯
            </motion.span>
            {activeCategory.terminalCmd}
          </h2>
          <motion.span
            animate={{ opacity: [1, 0.2, 1], scaleY: [1, 0.8, 1] }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
            className="w-3 h-7 bg-primary rounded-sm inline-block origin-bottom"
            aria-hidden="true"
          />
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="ml-2"
          >
            <Sparkles className="w-5 h-5 text-[#ffb95d]" />
          </motion.div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="flex flex-wrap gap-1.5 mb-8 border-b border-outline-variant/60"
        >
          {skillCategories.map((category) => {
            const Icon = iconMap[category.icon];
            const isActive = activeTab === category.id;
            
            return (
              <motion.button
                key={category.id}
                onClick={() => handleTabClick(category.id)}
                whileHover={{ scale: 1.06, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className={`relative px-4 md:px-5 py-3 font-mono text-sm tracking-tight transition-all duration-300 flex items-center gap-2 group whitespace-nowrap ${isActive ? "text-primary bg-surface border border-outline-variant/60 border-b-0 rounded-t-lg shadow-sm z-10 mb-[-1px]" : "text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/30 rounded-t-lg"}`}
              >
                <motion.div animate={isActive ? { rotate: [0, -10, 10, 0], scale: [1, 1.2, 1] } : {}} transition={{ duration: 0.4 }}>
                  <Icon className={`w-4.5 h-4.5 ${isActive ? "text-primary" : "text-on-surface-variant group-hover:text-on-surface transition-colors"}`} />
                </motion.div>
                <span>{category.label}</span>
                {isActive && <motion.div layoutId="activeTabGlow" className="absolute inset-0 rounded-t-lg bg-gradient-to-r from-primary/10 via-primary/5 to-transparent -z-10" transition={{ type: "spring", bounce: 0.3, duration: 0.5 }} />}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          style={{ y: skillCardY, scale: skillCardScale }}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="bg-surface/80 backdrop-blur-sm border border-outline-variant/60 rounded-2xl p-4 md:p-6 relative"
        >
          <motion.div
            key={`glow-${activeTab}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            className={`absolute inset-0 bg-gradient-to-br ${activeGradient} rounded-2xl blur-2xl pointer-events-none`}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory.id}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -30, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 md:gap-4 relative z-10"
            >
              {activeCategory.skills.map((skill) => {
                const colorVal = levelColorValues[skill.level];
                
                return (
                  <motion.div
                    key={skill.name}
                    variants={itemVariants}
                    whileHover={{ y: -6, scale: 1.05, transition: { type: "spring", stiffness: 500, damping: 25 } }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative"
                  >
                    <motion.div
                      style={{ boxShadow: `0 0 0 0 ${colorVal.rgba}` }}
                      whileHover={{ boxShadow: colorVal.pulse, transition: { duration: 0.2 } }}
                      className={`bg-surface/90 border border-outline-variant/60 rounded-xl p-2.5 md:p-5 cursor-default flex items-center gap-2 md:gap-3.5 transition-all duration-400 hover:border-primary/70 hover:bg-surface-container/80 backdrop-blur-sm`}
                    >
                      <motion.div
                        className="w-3 h-3 rounded-full relative flex-shrink-0"
                        style={{ backgroundColor: colorVal.hex }}
                        animate={{ boxShadow: [`0 0 0 0 ${colorVal.rgba}`, `0 0 0 10px ${colorVal.rgba.replace("0.5", "0")}`, `0 0 0 0 ${colorVal.rgba}`] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <motion.div className="absolute inset-0 rounded-full bg-white/40" animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }} transition={{ duration: 1.5, repeat: Infinity }} />
                      </motion.div>
                      
                      <div className="flex-1 min-w-0">
                        <motion.span className="font-mono text-sm text-on-surface block font-medium" whileHover={{ color: "#DB7070" }} transition={{ duration: 0.2 }}>{skill.name}</motion.span>
                        {skill.description && (
                          <motion.span className="font-code-sm text-xs text-on-surface-variant/70 hidden group-hover:flex absolute -bottom-8 left-1/2 -translate-x-1/2 bg-surface-container px-3 py-1.5 rounded-lg border border-outline-variant/80 whitespace-nowrap z-30 shadow-xl shadow-black/30 backdrop-blur-md" initial={{ opacity: 0, y: 10, scale: 0.95 }} whileHover={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.15 }}>{skill.description}</motion.span>
                        )}
                      </div>

                      <div>
                        <ChevronRight className="w-4.5 h-4.5 text-on-surface-variant opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                      </div>
                    </motion.div>

                    <motion.div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {/* Legend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7 }}
            className="mt-10 pt-7 border-t border-outline-variant/40 flex flex-wrap gap-5 text-xs font-mono"
          >
            {Object.entries(levelConfig).map(([key, config]) => (
              <motion.div key={key} className="flex items-center gap-2.5 text-on-surface-variant/80" whileHover={{ scale: 1.05, color: "#B83A3A" }} transition={{ duration: 0.2 }}>
                <motion.div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: config.hex }} animate={{ boxShadow: [`0 0 0 0 ${levelColorValues[key as SkillLevel].rgba}`, `0 0 0 6px ${levelColorValues[key as SkillLevel].rgba.replace("0.5", "0")}`] }} transition={{ duration: 2, repeat: Infinity }} />
                <span>{config.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Hint */}
        <motion.p
          style={{ y: hintParallaxY }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.7 } : {}}
          transition={{ delay: 0.9 }}
          className="mt-8 text-center text-sm text-on-surface-variant/70 font-mono"
        >
          <motion.span className="text-primary inline-block mr-1" animate={{ x: [0, 4, 0] }} transition={{ duration: 2.5, repeat: Infinity }}>❯</motion.span>
          <span className="hidden sm:inline">Hover skills for details • </span>
          <motion.span animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}>Scroll for more</motion.span>
        </motion.p>
      </div>
    </section>
  );
}