// components/ContactSection.tsx
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Mail, Github, Linkedin, Send, Terminal, Cpu, Wifi, Shield } from "lucide-react";
import { useState, useRef } from "react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({ 
    target: sectionRef, 
    offset: ["start end", "end start"] 
  });

  const bgY1 = useTransform(scrollYProgress, (v: number) => v * -100);
  const headerScale = useTransform(scrollYProgress, (v: number) => 0.95 + v * 0.05);
  const headerOpacity = useTransform(scrollYProgress, (v: number): number => v < 0.2 ? v / 0.2 : 1);
  const formY = useTransform(scrollYProgress, (v: number) => v < 0.2 ? 50 - v * 250 : 0);
  const formOpacity = useTransform(scrollYProgress, (v: number): number => v < 0.2 ? v * 5 : 1);
  const contactInfoY = useTransform(scrollYProgress, (v: number) => v < 0.3 ? 50 - v * 166 : 0);
  const contactInfoOpacity = useTransform(scrollYProgress, (v: number): number => v < 0.3 ? v * 3.33 : 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setSubmitStatus("success");
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setSubmitStatus("idle"), 3000);
  };

  const inputVariants = {
    focus: { 
      scale: 1.02, 
      borderColor: "rgba(219, 112, 112, 0.6)",
      boxShadow: "0 0 20px rgba(219, 112, 112, 0.3)",
      transition: { duration: 0.2 }
    },
    blur: { 
      scale: 1, 
      borderColor: "rgba(184, 58, 58, 0.2)",
      boxShadow: "0 0 0px rgba(219, 112, 112, 0)",
      transition: { duration: 0.2 }
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-20 px-4 md:px-8 lg:px-20 relative overflow-hidden bg-gradient-to-b from-[var(--section-start)] via-[var(--section-mid)] to-[var(--section-end)]"
    >
      {/* Grid */}
      <motion.div style={{ y: bgY1 }} className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="w-[200%] h-[200%] -translate-x-1/4 -translate-y-1/4 bg-grid" />
      </motion.div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Terminal Header */}
        <motion.div
          style={{ scale: headerScale, opacity: headerOpacity }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex items-center gap-4 mb-16"
        >
          <div className="p-3 rounded-lg bg-brand-primary/10 border border-brand-primary/30">
            <Terminal className="w-6 h-6 text-brand-primary" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-heading)] font-mono">
            <span className="text-brand-primary mr-2">&gt;</span>
            ssh admin@contact
          </h2>
          <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.2, repeat: Infinity }} className="w-3 h-7 bg-brand-primary rounded-sm" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Info - Left Side */}
          <motion.div
            style={{ y: contactInfoY, opacity: contactInfoOpacity }}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <motion.a
                href="mailto:kjefry525@gmail.com"
                whileHover={{ x: 10, scale: 1.02 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-[var(--surface-elevated)]/60 border border-[var(--border-muted)]/50 hover:border-brand-primary/40 transition-all duration-300 group"
              >
                <div className="p-3 rounded-lg bg-brand-primary/10 group-hover:bg-brand-primary/20 transition-colors">
                  <Mail className="w-6 h-6 text-brand-primary" />
                </div>
                <div>
                  <p className="text-sm text-[var(--text-label)] font-mono mb-1">Email</p>
                  <span className="text-[var(--text-heading)] group-hover:text-brand-primary transition-colors">kjefry525@gmail.com</span>
                </div>
              </motion.a>

              <motion.a
                href="https://github.com/jefryKurniawan"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 10, scale: 1.02 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-[var(--surface-elevated)]/60 border border-[var(--border-muted)]/50 hover:border-brand-primary/40 transition-all duration-300 group"
              >
                <div className="p-3 rounded-lg bg-brand-primary/10 group-hover:bg-brand-primary/20 transition-colors">
                  <Github className="w-6 h-6 text-brand-primary" />
                </div>
                <div>
                  <p className="text-sm text-[var(--text-label)] font-mono mb-1">GitHub</p>
                  <span className="text-[var(--text-heading)] group-hover:text-brand-primary transition-colors">github.com/jefryKurniawan</span>
                </div>
              </motion.a>

              <motion.a
                href="https://www.linkedin.com/in/jefry-kurniawan-7443272aa/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 10, scale: 1.02 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-[var(--surface-elevated)]/60 border border-[var(--border-muted)]/50 hover:border-brand-primary/40 transition-all duration-300 group"
              >
                <div className="p-3 rounded-lg bg-brand-primary/10 group-hover:bg-brand-primary/20 transition-colors">
                  <Linkedin className="w-6 h-6 text-brand-primary" />
                </div>
                <div>
                  <p className="text-sm text-[var(--text-label)] font-mono mb-1">LinkedIn</p>
                  <span className="text-[var(--text-heading)] group-hover:text-brand-primary transition-colors">linkedin.com/in/jefry-kurniawan-7443272aa</span>
                </div>
              </motion.a>
            </div>

            {/* Status indicators */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }} className="pt-8 border-t border-[var(--border-muted)]/50 space-y-4">
              <div className="flex items-center gap-3 text-[var(--text-label)]">
                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} className="w-2 h-2 bg-[var(--success)] rounded-full" />
                <span className="font-mono text-sm">Available for opportunities</span>
              </div>
              <div className="flex items-center gap-3 text-[var(--text-label)]">
                <Wifi className="w-4 h-4 text-brand-primary" />
                <span className="font-mono text-sm">Response time: &lt; 24 hours</span>
              </div>
              <div className="flex items-center gap-3 text-[var(--text-label)]">
                <Shield className="w-4 h-4 text-brand-primary" />
                <span className="font-mono text-sm">Open to remote & freelance</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form - Right Side */}
          <motion.div
            ref={formRef}
            style={{ y: formY, opacity: formOpacity }}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.3 }}
            className="relative"
          >
            {/* Form glow effect */}
            <motion.div animate={{ boxShadow: ["0 0 20px rgba(184, 58, 58, 0.1)", "0 0 40px rgba(184, 58, 58, 0.2)", "0 0 20px rgba(184, 58, 58, 0.1)"] }} transition={{ duration: 4, repeat: Infinity }} className="absolute -inset-1 bg-gradient-to-r from-brand-primary/20 via-brand-accent/20 to-brand-primary/20 rounded-2xl blur-xl -z-10" />

            <form onSubmit={handleSubmit} className="space-y-6 p-8 rounded-2xl bg-[var(--surface-elevated)]/80 border border-[var(--border-muted)]/60 backdrop-blur-xl">
              {/* Name Field */}
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
                <label className="flex items-center gap-2 text-brand-primary font-mono text-sm mb-2"><span className="text-brand-primary">&gt;</span> name</label>
                <motion.input type="text" placeholder="Enter your alias" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} variants={inputVariants} initial="blur" whileFocus="focus" className="w-full px-4 py-3 rounded-lg bg-[var(--section-start)] border border-[var(--border-muted)]/60 text-[var(--text-heading)] placeholder-[var(--placeholder)] focus:outline-none font-mono transition-all" required />
              </motion.div>

              {/* Email Field */}
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }}>
                <label className="flex items-center gap-2 text-brand-primary font-mono text-sm mb-2"><span className="text-brand-primary">&gt;</span> email</label>
                <motion.input type="email" placeholder="user@domain.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} variants={inputVariants} initial="blur" whileFocus="focus" className="w-full px-4 py-3 rounded-lg bg-[var(--section-start)] border border-[var(--border-muted)]/60 text-[var(--text-heading)] placeholder-[var(--placeholder)] focus:outline-none font-mono transition-all" required />
              </motion.div>

              {/* Message Field */}
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.6 }}>
                <label className="flex items-center gap-2 text-brand-primary font-mono text-sm mb-2"><span className="text-brand-primary">&gt;</span> message</label>
                <motion.textarea placeholder="Initialize communication protocol..." rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} variants={inputVariants} initial="blur" whileFocus="focus" className="w-full px-4 py-3 rounded-lg bg-[var(--section-start)] border border-[var(--border-muted)]/60 text-[var(--text-heading)] placeholder-[var(--placeholder)] focus:outline-none font-mono transition-all resize-none" required />
              </motion.div>

              {/* Submit Button */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.7 }}>
                <motion.button type="submit" disabled={isSubmitting} whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }} className={`w-full py-4 rounded-lg font-mono font-semibold flex items-center justify-center gap-3 transition-all duration-300 ${submitStatus === "success" ? "bg-[var(--success)] text-[var(--section-start)]" : "bg-gradient-to-r from-brand-primary to-brand-accent text-[var(--section-start)] hover:shadow-[0_0_30px_rgba(184,58,58,0.5)]"}`}>
                  {isSubmitting ? (
                    <><motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-5 h-5 border-2 border-[var(--section-start)] border-t-transparent rounded-full" /><span>TRANSMITTING...</span></>
                  ) : submitStatus === "success" ? (
                    <><Cpu className="w-5 h-5" /><span>TRANSMISSION COMPLETE</span></>
                  ) : (
                    <><Send className="w-5 h-5" /><span>EXECUTE TRANSMISSION</span><motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span></>
                  )}
                </motion.button>
              </motion.div>

              {submitStatus === "success" && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="p-4 rounded-lg bg-[var(--success)]/10 border border-[var(--success)]/30 text-[var(--success)] text-center font-mono text-sm">
                  ✓ Message transmitted successfully! We'll respond within 24 hours.
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}