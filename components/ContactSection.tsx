// components/ContactSection.tsx
"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue, useInView } from "framer-motion";
import { Mail, Github, Linkedin, Send, Terminal, Cpu, Wifi, Shield } from "lucide-react";
import { useState, useRef, useEffect, useMemo } from "react";

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

  // ✅ ONLY single-input useTransform (100% TS-safe in FM v12)
  const bgY1 = useTransform(scrollYProgress, (v: number) => v * -100);
  const bgY2 = useTransform(scrollYProgress, (v: number) => v * -150);
  const bgY3 = useTransform(scrollYProgress, (v: number) => v * -200);
  const headerScale = useTransform(scrollYProgress, (v: number) => 0.95 + v * 0.05);
  const headerOpacity = useTransform(scrollYProgress, (v: number): number => v < 0.2 ? v / 0.2 : 1);
  const formY = useTransform(scrollYProgress, (v: number) => v < 0.2 ? 50 - v * 250 : 0);
  const formOpacity = useTransform(scrollYProgress, (v: number): number => v < 0.2 ? v * 5 : 1);
  const contactInfoY = useTransform(scrollYProgress, (v: number) => v < 0.3 ? 50 - v * 166 : 0);
  const contactInfoOpacity = useTransform(scrollYProgress, (v: number): number => v < 0.3 ? v * 3.33 : 1);
  const particleScrollY = useTransform(scrollYProgress, (v: number) => v * -20);
  const particleScrollX = useTransform(scrollYProgress, (v: number) => v * 30);

  // Mouse parallax - single MotionValue inputs only
  const mouseX = useMotionValue<number>(0);
  const mouseY = useMotionValue<number>(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  // Generate particles
  const particles = useMemo(() => 
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
    })), []
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x * 20);
      mouseY.set(y * 20);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

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
      borderColor: "rgba(168, 200, 255, 0.6)",
      boxShadow: "0 0 20px rgba(168, 200, 255, 0.3)",
      transition: { duration: 0.2 }
    },
    blur: { 
      scale: 1, 
      borderColor: "rgba(48, 111, 195, 0.2)",
      boxShadow: "0 0 0px rgba(168, 200, 255, 0)",
      transition: { duration: 0.2 }
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-20 px-4 md:px-8 lg:px-20 relative overflow-hidden bg-gradient-to-b from-[#111318] via-[#1a1d24] to-[#0d0f14]"
    >
      {/* Animated grid background - nested divs for mouse + scroll parallax */}
      <motion.div style={{ y: bgY1 }} className="absolute inset-0 opacity-20">
        <motion.div style={{ x: springX }} className="w-full h-full">
          <div 
            className="w-[200%] h-[200%] -translate-x-1/4 -translate-y-1/4"
            style={{
              backgroundImage: `linear-gradient(rgba(168, 200, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(168, 200, 255, 0.03) 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
            }}
          />
        </motion.div>
      </motion.div>

      {/* Floating particles - scroll parallax via style, mouse via nested wrapper */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          style={{ x: particleScrollX, y: particleScrollY, left: p.x, top: p.y }}
          className="absolute"
        >
          <motion.div style={{ x: springX, y: springY }} className="relative">
            <motion.div
              animate={{ opacity: [0.1, 0.4, 0.1], scale: [1, 1.5, 1] }}
              transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
              className="w-1 h-1 bg-[#a8c8ff] rounded-full blur-[1px]"
            />
          </motion.div>
        </motion.div>
      ))}

      {/* Glowing orbs - scroll Y on outer, mouse X on inner */}
      <motion.div style={{ y: bgY2 }} className="absolute top-20 left-20 w-96 h-96 bg-[#a8c8ff]/20 rounded-full blur-[120px] pointer-events-none">
        <motion.div style={{ x: springX }} animate={{ scale: [1, 1.3, 1], opacity: [0.05, 0.15, 0.05] }} transition={{ duration: 12, repeat: Infinity }} className="w-full h-full" />
      </motion.div>
      <motion.div style={{ y: bgY3 }} className="absolute bottom-20 right-20 w-[28rem] h-[28rem] bg-[#ffb95d]/10 rounded-full blur-[140px] pointer-events-none">
        <motion.div style={{ x: springX }} animate={{ scale: [1.3, 1, 1.3], opacity: [0.03, 0.1, 0.03] }} transition={{ duration: 15, repeat: Infinity, delay: 3 }} className="w-full h-full" />
      </motion.div>

      {/* Connection lines SVG */}
      <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.line
            key={i}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.2 }}
            transition={{ duration: 3, delay: i * 0.4, repeat: Infinity, repeatType: "reverse" }}
            x1={`${i * 12}%`} y1="0%" x2={`${(i + 1) * 10}%`} y2="100%"
            stroke="#a8c8ff" strokeWidth="1"
          />
        ))}
      </svg>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Terminal Header */}
        <motion.div
          style={{ scale: headerScale, opacity: headerOpacity }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex items-center gap-4 mb-16"
        >
          <div className="p-3 rounded-lg bg-[#a8c8ff]/10 border border-[#a8c8ff]/30">
            <Terminal className="w-6 h-6 text-[#a8c8ff]" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#e2e2e8] font-mono">
            <span className="text-[#a8c8ff] mr-2">&gt;</span>
            ssh admin@contact
          </h2>
          <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.2, repeat: Infinity }} className="w-3 h-7 bg-[#a8c8ff] rounded-sm" />
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
                className="flex items-center gap-4 p-4 rounded-xl bg-[#1d2024]/60 border border-[#424751]/50 hover:border-[#a8c8ff]/40 transition-all duration-300 group"
              >
                <div className="p-3 rounded-lg bg-[#a8c8ff]/10 group-hover:bg-[#a8c8ff]/20 transition-colors">
                  <Mail className="w-6 h-6 text-[#a8c8ff]" />
                </div>
                <div>
                  <p className="text-sm text-[#c2c6d2] font-mono mb-1">Email</p>
                  <span className="text-[#e2e2e8] group-hover:text-[#a8c8ff] transition-colors">kjefry525@gmail.com</span>
                </div>
              </motion.a>

              <motion.a
                href="https://github.com/jefryKurniawan"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 10, scale: 1.02 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-[#1d2024]/60 border border-[#424751]/50 hover:border-[#a8c8ff]/40 transition-all duration-300 group"
              >
                <div className="p-3 rounded-lg bg-[#a8c8ff]/10 group-hover:bg-[#a8c8ff]/20 transition-colors">
                  <Github className="w-6 h-6 text-[#a8c8ff]" />
                </div>
                <div>
                  <p className="text-sm text-[#c2c6d2] font-mono mb-1">GitHub</p>
                  <span className="text-[#e2e2e8] group-hover:text-[#a8c8ff] transition-colors">github.com/jefryKurniawan</span>
                </div>
              </motion.a>

              <motion.a
                href="https://www.linkedin.com/in/jefry-kurniawan-7443272aa/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 10, scale: 1.02 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-[#1d2024]/60 border border-[#424751]/50 hover:border-[#a8c8ff]/40 transition-all duration-300 group"
              >
                <div className="p-3 rounded-lg bg-[#a8c8ff]/10 group-hover:bg-[#a8c8ff]/20 transition-colors">
                  <Linkedin className="w-6 h-6 text-[#a8c8ff]" />
                </div>
                <div>
                  <p className="text-sm text-[#c2c6d2] font-mono mb-1">LinkedIn</p>
                  <span className="text-[#e2e2e8] group-hover:text-[#a8c8ff] transition-colors">linkedin.com/in/jefry-kurniawan-7443272aa</span>
                </div>
              </motion.a>
            </div>

            {/* Status indicators */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }} className="pt-8 border-t border-[#424751]/50 space-y-4">
              <div className="flex items-center gap-3 text-[#c2c6d2]">
                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} className="w-2 h-2 bg-[#4ade80] rounded-full" />
                <span className="font-mono text-sm">Available for opportunities</span>
              </div>
              <div className="flex items-center gap-3 text-[#c2c6d2]">
                <Wifi className="w-4 h-4 text-[#a8c8ff]" />
                <span className="font-mono text-sm">Response time: &lt; 24 hours</span>
              </div>
              <div className="flex items-center gap-3 text-[#c2c6d2]">
                <Shield className="w-4 h-4 text-[#a8c8ff]" />
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
            <motion.div animate={{ boxShadow: ["0 0 20px rgba(168, 200, 255, 0.1)", "0 0 40px rgba(168, 200, 255, 0.2)", "0 0 20px rgba(168, 200, 255, 0.1)"] }} transition={{ duration: 4, repeat: Infinity }} className="absolute -inset-1 bg-gradient-to-r from-[#a8c8ff]/20 via-[#419cde]/20 to-[#a8c8ff]/20 rounded-2xl blur-xl -z-10" />

            <form onSubmit={handleSubmit} className="space-y-6 p-8 rounded-2xl bg-[#1d2024]/80 border border-[#424751]/60 backdrop-blur-xl">
              {/* Name Field */}
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
                <label className="flex items-center gap-2 text-[#a8c8ff] font-mono text-sm mb-2"><span className="text-[#a8c8ff]">&gt;</span> name</label>
                <motion.input type="text" placeholder="Enter your alias" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} variants={inputVariants} initial="blur" whileFocus="focus" className="w-full px-4 py-3 rounded-lg bg-[#111318] border border-[#424751]/60 text-[#e2e2e8] placeholder-[#4a4f5a] focus:outline-none font-mono transition-all" required />
              </motion.div>

              {/* Email Field */}
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }}>
                <label className="flex items-center gap-2 text-[#a8c8ff] font-mono text-sm mb-2"><span className="text-[#a8c8ff]">&gt;</span> email</label>
                <motion.input type="email" placeholder="user@domain.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} variants={inputVariants} initial="blur" whileFocus="focus" className="w-full px-4 py-3 rounded-lg bg-[#111318] border border-[#424751]/60 text-[#e2e2e8] placeholder-[#4a4f5a] focus:outline-none font-mono transition-all" required />
              </motion.div>

              {/* Message Field */}
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.6 }}>
                <label className="flex items-center gap-2 text-[#a8c8ff] font-mono text-sm mb-2"><span className="text-[#a8c8ff]">&gt;</span> message</label>
                <motion.textarea placeholder="Initialize communication protocol..." rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} variants={inputVariants} initial="blur" whileFocus="focus" className="w-full px-4 py-3 rounded-lg bg-[#111318] border border-[#424751]/60 text-[#e2e2e8] placeholder-[#4a4f5a] focus:outline-none font-mono transition-all resize-none" required />
              </motion.div>

              {/* Submit Button */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.7 }}>
                <motion.button type="submit" disabled={isSubmitting} whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }} className={`w-full py-4 rounded-lg font-mono font-semibold flex items-center justify-center gap-3 transition-all duration-300 ${submitStatus === "success" ? "bg-[#4ade80] text-[#111318]" : "bg-gradient-to-r from-[#a8c8ff] to-[#419cde] text-[#111318] hover:shadow-[0_0_30px_rgba(168,200,255,0.5)]"}`}>
                  {isSubmitting ? (
                    <><motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-5 h-5 border-2 border-[#111318] border-t-transparent rounded-full" /><span>TRANSMITTING...</span></>
                  ) : submitStatus === "success" ? (
                    <><Cpu className="w-5 h-5" /><span>TRANSMISSION COMPLETE</span></>
                  ) : (
                    <><Send className="w-5 h-5" /><span>EXECUTE TRANSMISSION</span><motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span></>
                  )}
                </motion.button>
              </motion.div>

              {submitStatus === "success" && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="p-4 rounded-lg bg-[#4ade80]/10 border border-[#4ade80]/30 text-[#4ade80] text-center font-mono text-sm">
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