// components/Footer.tsx
"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Terminal, Mail, Github, Linkedin, FileText, ChevronRight } from "lucide-react";
import { useRef } from "react";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: true, margin: "-50px" });
  const currentYear = new Date().getFullYear();
  
  const { scrollYProgress } = useScroll({ 
    target: footerRef, 
    offset: ["start end", "end end"] 
  });

  const bgY = useTransform(scrollYProgress, (v: number) => v * -30);

  const socialLinks = [
    { 
      name: "GITHUB", 
      href: "https://github.com/jefryKurniawan", 
      icon: Github,
      description: "Open source contributions"
    },
    { 
      name: "LINKEDIN", 
      href: "https://www.linkedin.com/in/jefry-kurniawan-7443272aa/", 
      icon: Linkedin,
      description: "Professional network"
    },
    { 
      name: "LOGS", 
      href: "#", 
      icon: FileText,
      description: "System logs & documentation"
    },
  ];

  const quickLinks = ["Experience", "Projects", "Skills", "Contact"];

  return (
    <footer 
      ref={footerRef}
      className="relative overflow-hidden bg-gradient-to-b from-[var(--section-start)] to-[var(--section-end)] border-t border-[var(--border-muted)]/40"
    >
      {/* Animated grid background */}
      <motion.div 
        style={{ y: bgY }}
        className="absolute inset-0 opacity-10 pointer-events-none"
      >
        <div className="w-[200%] h-[200%] -translate-x-1/4 -translate-y-1/4 bg-grid-sm" />
      </motion.div>

      {/*COMPACT: Reduced padding and gaps */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 relative z-10">
        {/* Main Footer Content - Single Row Layout */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-6 lg:gap-8">
          
          {/* Brand - Compact */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex-shrink-0"
          >
            <div className="flex items-center gap-2 mb-2">
              <Terminal className="w-4 h-4 text-fedora-primary" />
              <span className="font-mono font-bold text-[var(--text-heading)] text-sm">bug2future</span>
            </div>
            <p className="text-[var(--text-muted)] text-xs max-w-xs">
              QA Engineer • Automation & CI/CD
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex-1"
          >
            <div className="flex flex-wrap items-center gap-4 lg:flex-col lg:items-start">
              <span className="font-mono text-xs text-fedora-primary hidden lg:block mb-1">&gt; NAVIGATION</span>
              {quickLinks.map((item) => (
                <button
                  key={item}
                  onClick={() => document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: "smooth" })}
                  className="text-[var(--text-muted)] hover:text-fedora-primary transition-colors text-xs font-mono flex items-center gap-1 group"
                >
                  <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {item}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Contact Info - Compact Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-1"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
              <a href="mailto:kjefry525@gmail.com" className="flex items-center gap-2 text-[var(--text-muted)] hover:text-fedora-primary transition-colors text-xs group">
                <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="truncate">kjefry525@gmail.com</span>
              </a>
              <a href="https://github.com/jefryKurniawan" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[var(--text-muted)] hover:text-fedora-primary transition-colors text-xs group">
                <Github className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="truncate">github.com/jefryKurniawan</span>
              </a>
              <a href="https://www.linkedin.com/in/jefry-kurniawan-7443272aa/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[var(--text-muted)] hover:text-fedora-primary transition-colors text-xs group sm:col-span-2 lg:col-span-1">
                <Linkedin className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="truncate">linkedin.com/in/jefry-kurniawan</span>
              </a>
            </div>
          </motion.div>

          {/* Social Links - Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex-shrink-0"
          >
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target={social.name !== "LOGS" ? "_blank" : undefined}
                  rel={social.name !== "LOGS" ? "noopener noreferrer" : undefined}
                  whileHover={{ y: -2, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-[var(--surface-elevated)]/60 border border-[var(--border-muted)]/40 hover:border-fedora-primary/40 transition-all"
                  title={social.description}
                >
                  <social.icon className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-fedora-primary" />
                  <span className="text-[var(--text-muted)] text-[10px] font-mono hidden sm:inline">{social.name}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar - Ultra Compact */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-4 pt-3 border-t border-[var(--border-muted)]/30 flex flex-col sm:flex-row justify-between items-center gap-2"
        >
          <p className="text-[var(--text-dim)] text-[10px] font-mono text-center sm:text-left">
            © {currentYear} <span className="text-fedora-primary">JEFRY KURNIAWAN</span>
          </p>
          
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface-elevated)]/40 border border-[var(--border-muted)]/30">
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-[var(--success)] rounded-full"
            />
            <span className="text-[var(--text-dim)] text-[10px] font-mono">
              System Online • Bug to Future
            </span>
          </div>
        </motion.div>

        {/* Terminal Line - Minimal */}
        <motion.div 
          className="mt-2 flex items-center gap-1.5 text-[var(--border-muted)] text-[10px] font-mono"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          <span className="text-fedora-primary">$</span>
          <span className="opacity-60">echo "Thank you for visiting"</span>
          <motion.span
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="w-1.5 h-3 bg-fedora-primary/40"
          />
        </motion.div>
      </div>
    </footer>
  );
}