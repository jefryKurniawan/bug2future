// components/ProjectsSection.tsx
"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useMemo } from "react";
import { 
  Github, ExternalLink, FolderGit2, 
  ShoppingCart, Database, Users, TrendingUp,
  Terminal, Server, Globe, Code2, Cpu
} from "lucide-react";

// Client Projects dari CV - BIIS CORP & SAMWI
const clientProjects = [
  { 
    name: "MD Mall Blora", 
    company: "BIIS CORP", 
    type: "ERP Testing",
    icon: ShoppingCart,
    desc: "Comprehensive ERP testing ensuring seamless inventory, sales, and reporting workflows for a regional retail hub.",
    tags: ["ERP Testing", "Manual"]
  },
  { 
    name: "Envio Store", 
    company: "BIIS CORP", 
    type: "E2E Testing",
    icon: Globe,
    desc: "End-to-End (E2E) testing framework implementation for an e-commerce platform, verifying user journeys from login to checkout.",
    tags: ["E2E", "Cypress"]
  },
  { 
    name: "Simpan Pinjam PLN", 
    company: "BIIS CORP", 
    type: "UAT",
    icon: Database,
    desc: "Led User Acceptance Testing (UAT) phases for a cooperative financial system, validating complex loan calculation logic.",
    tags: ["UAT", "Finance"]
  },
  { 
    name: "HRIS BSH", 
    company: "BIIS CORP", 
    type: "ERP Testing",
    icon: Users,
    desc: "Rigorous testing of Human Resource Information System modules including payroll, attendance, and performance evaluation.",
    tags: ["ERP Testing", "HRIS"]
  },
  { 
    name: "Sejati Manunggal", 
    company: "BIIS CORP", 
    type: "ERP",
    icon: TrendingUp,
    desc: "Enterprise ERP testing for manufacturing workflows and supply chain management.",
    tags: ["ERP", "Manufacturing"]
  },
  { 
    name: "Online LMS", 
    company: "SAMWI", 
    type: "Automation",
    icon: Server,
    desc: "Cypress automation for online learning platform with E2E and regression testing.",
    tags: ["Automation", "EdTech"]
  },
];

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mouse tracking for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax transforms
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const headerScale = useTransform(scrollYProgress, [0, 0.2], [0.95, 1]);
  
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX / innerWidth - 0.5) * 3);
      mouseY.set((clientY / innerHeight - 0.5) * 3);
    };
    
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={containerRef}
      id="projects"
      className="py-24 px-4 md:px-8 lg:px-20 relative overflow-hidden min-h-screen"
      suppressHydrationWarning
    >
      {/* ===== CRAZY PARALLAX BACKGROUND ===== */}
      
      {/* Layer 1: Base gradient */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 bg-gradient-to-b from-fedora-darker via-fedora-dark to-background" />
      
      {/* Layer 2: Terminal grid */}
      <motion.div 
        style={{ x: isTouchDevice ? 0 : springX, y: isTouchDevice ? 0 : springY }}
        className="absolute inset-0 opacity-20"
      >
        <div className="w-[300%] h-[300%] -translate-x-1/3 -translate-y-1/3 bg-[linear-gradient(to_right,rgba(48,111,195,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(48,111,195,0.08)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </motion.div>
      
      {/* Layer 3: Floating particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            x: isTouchDevice ? 0 : springX,
            y: isTouchDevice ? 0 : springY,
            left: `${5 + i * 6}%`,
            top: `${10 + (i % 5) * 18}%`,
          }}
          animate={{
            y: [0, -20 - i, 0],
            opacity: [0.1, 0.4, 0.1],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 6 + i * 0.3, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
          className="absolute w-1.5 h-1.5 bg-fedora-primary rounded-full"
        />
      ))}
      
      {/* Layer 4: Glowing orbs */}
      <motion.div 
        style={{ x: isTouchDevice ? 0 : springX, y: isTouchDevice ? 0 : springY }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.08, 0.2, 0.08] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-10 left-10 w-72 h-72 md:w-96 md:h-96 bg-fedora-primary/15 rounded-full blur-[120px]"
      />
      <motion.div 
        style={{ x: isTouchDevice ? 0 : springX, y: isTouchDevice ? 0 : springY }}
        animate={{ scale: [1.3, 1, 1.3], opacity: [0.06, 0.15, 0.06] }}
        transition={{ duration: 10, repeat: Infinity, delay: 1.5 }}
        className="absolute bottom-10 right-10 w-80 h-80 md:w-[28rem] md:h-[28rem] bg-fedora-accent/10 rounded-full blur-[140px]"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Terminal Header */}
        <motion.div 
          style={{ opacity: headerOpacity, scale: headerScale }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass border border-fedora-primary/30 mb-4">
            <Terminal className="w-5 h-5 text-fedora-primary" />
            <span className="font-mono text-sm text-fedora-primary">jefry@linux:~/bug2future</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-gradient mb-4 pb-1">Bug to Future</h2>
          <p className="text-secondary text-lg max-w-2xl mx-auto">
            Ensuring stability in a chaotic digital universe through rigorous QA engineering and automated testing.
          </p>
        </motion.div>

        {/* Projects Section - Terminal Style */}
        <div className="mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-8 font-mono"
          >
            <FolderGit2 className="w-5 h-5 text-fedora-primary" />
            <span className="text-fedora-primary">&gt;</span>
            <span className="text-white font-bold">cat projects.log</span>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {clientProjects.map((project, index) => (
              <ProjectCard 
                key={index}
                title={project.name}
                desc={project.desc}
                tags={project.tags}
                index={index}
                icon={project.icon}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ProjectCard Component
function ProjectCard({ 
  title, 
  desc, 
  tags, 
  index,
  icon: Icon 
}: { 
  title: string; 
  desc: string; 
  tags: string[]; 
  index: number;
  icon: any;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="glass p-6 rounded-xl border border-fedora-secondary/30 hover:border-fedora-primary/50 transition-all group"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-fedora-primary/10 border border-fedora-primary/20">
            <Icon className="w-5 h-5 text-fedora-primary" />
          </div>
          <h3 className="text-lg font-bold text-white font-mono group-hover:text-fedora-primary transition-colors">
            {title}
          </h3>
        </div>
        <div className="flex gap-2">
          <button aria-label={`View ${title} repository on GitHub`} className="p-2 rounded-lg text-secondary hover:text-fedora-primary hover:bg-fedora-primary/10 transition-all">
            <Github className="w-4 h-4" />
          </button>
          <button aria-label={`Open ${title} website`} className="p-2 rounded-lg text-secondary hover:text-fedora-primary hover:bg-fedora-primary/10 transition-all">
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <p className="text-secondary text-sm mb-4 line-clamp-2 leading-relaxed">{desc}</p>
      
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, i) => (
          <span
            key={tag}
            className="text-[10px] font-mono bg-fedora-secondary/20 text-fedora-primary px-2.5 py-1 rounded border border-fedora-primary/20"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}