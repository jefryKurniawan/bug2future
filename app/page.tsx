"use client";
import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import ThreeBackground from "@/components/ThreeBackground";
import SectionHeading from "@/components/SectionHeading";
import ExperienceCard from "@/components/ExperienceCard";
import ProjectCard from "@/components/ProjectCard";
import SkillTag from "@/components/SkillTag";
import { Download, ChevronDown } from "lucide-react";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const experiences = [
    { role: "Quality Assurance", company: "BIIS CORP", period: "Feb 2025 – Mar 2026", location: "Surakarta, Indonesia", details: ["Performed manual testing on web-based and mobile ERP applications", "Developed test case documentation for ERP modules: Sales, Inventory, Financial", "Executed E2E, regression, smoke, and sanity testing", "Collaborated in Agile Scrum; daily standups, sprint planning", "Conducted UAT and delivered end-user training to retail clients", "Reported bugs using browser console logs and SQL queries"] },
    { role: "Quality Assurance Intern", company: "SAMWI (Remote)", period: "Jul 2025 – Aug 2025", location: "London, UK", details: ["Executed manual testing and developed automation scripts using Cypress", "Designed test cases, reported bugs, performed E2E testing", "Collaborated with development team using Git within Agile workflow"] },
    { role: "Intern Full Stack Programmer", company: "PT. CIPTA KARYA INOVASI TEKNOLOGI", period: "May 2024 – Aug 2024", location: "Malang, Indonesia", details: ["Developed web applications using Node.js, React TypeScript, Firebase", "Integrated Midtrans payment gateway", "Troubleshot payment gateway integration and database connectivity"] }
  ];

  const projects = [
    { title: "ERP Testing Framework", desc: "Custom automation framework for ERP modules using Playwright and TypeScript. Improved testing efficiency by 40%.", tags: ["Playwright", "TypeScript", "CI/CD"], repo: "https://github.com/jefryKurniawan" },
    { title: "E-Learning Platform", desc: "Online learning platform with Cypress automation coverage for major features ensuring release stability.", tags: ["Cypress", "React", "Agile"], repo: "https://github.com/jefryKurniawan" },
    { title: "Payment Gateway Integration", desc: "Secure payment integration using Node.js and Midtrans API with comprehensive error handling.", tags: ["Node.js", "API", "Firebase"], repo: "https://github.com/jefryKurniawan" }
  ];

  const skills = [
    { name: "Manual Testing", level: "Expert" }, { name: "Playwright/Cypress", level: "Advanced" },
    { name: "Next.js/React", level: "Advanced" }, { name: "Node.js", level: "Intermediate" },
    { name: "Linux CLI", level: "Advanced" }, { name: "SQL/MySQL", level: "Intermediate" },
    { name: "CI/CD", level: "Intermediate" }, { name: "API Testing", level: "Advanced" },
  ];

  if (loading) return <LoadingScreen onFinish={() => setLoading(false)} />;

  return (
    <main className="min-h-screen bg-fedora-dark terminal-bg selection:bg-fedora-primary selection:text-white">
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-fedora-primary origin-left z-50" style={{ scaleX }} />
      <Navbar />
      <ThreeBackground />

      <section className="relative h-screen flex items-center justify-center px-4 overflow-hidden">
        <div className="text-center z-10 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h2 className="text-fedora-primary font-mono text-lg mb-4">Hello, World! I am</h2>
            <h1 className="text-5xl md:text-7xl font-bold text-fedora-text mb-6 tracking-tight">Jefry Kurniawan</h1>
            <p className="text-fedora-muted text-xl md:text-2xl mb-8 font-mono">QA Engineer <span className="text-fedora-primary">|</span> Full Stack Developer</p>
            <div className="flex justify-center gap-4">
              <a href="#contact" className="px-8 py-3 bg-fedora-primary hover:bg-fedora-accent text-white font-mono rounded transition-all hover:shadow-[0_0_20px_rgba(60,110,180,0.5)]">./contact.sh</a>
              <a href="/CV-Jk.pdf" target="_blank" className="px-8 py-3 border border-fedora-primary text-fedora-primary hover:bg-fedora-primary/10 font-mono rounded transition-all flex items-center gap-2"><Download size={18} /> CV.pdf</a>
            </div>
          </motion.div>
        </div>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute bottom-10 left-1/2 -translate-x-1/2 text-fedora-muted"><ChevronDown size={32} /></motion.div>
      </section>

      <section id="about" className="py-20 px-4 max-w-7xl mx-auto">
        <SectionHeading id="about">01. About Me</SectionHeading>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="text-fedora-muted space-y-4 leading-relaxed">
            <p>Based in Magetan, Jawa Timur, I specialize in ensuring software quality through rigorous testing and automation. With a background in Full Stack Development, I understand the code from the inside out.</p>
            <p>Currently focused on <span className="text-fedora-accent">AI-driven testing strategies</span> and building robust QA frameworks. When not testing, I'm experimenting with Linux home labs.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex flex-wrap gap-3 content-start">
            {skills.map((skill, i) => (<SkillTag key={i} name={skill.name} level={skill.level} />))}
          </motion.div>
        </div>
      </section>

      <section id="experience" className="py-20 px-4 max-w-5xl mx-auto">
        <SectionHeading id="experience">02. Experience</SectionHeading>
        <div className="space-y-4">
          {experiences.map((exp, i) => (<ExperienceCard key={i} {...exp} index={i} />))}
        </div>
      </section>

      <section id="projects" className="py-20 px-4 max-w-7xl mx-auto">
        <SectionHeading id="projects">03. Projects</SectionHeading>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj, i) => (<ProjectCard key={i} {...proj} index={i} />))}
        </div>
      </section>

      <section id="contact" className="py-20 px-4 max-w-3xl mx-auto text-center">
        <SectionHeading id="contact">04. Get In Touch</SectionHeading>
        <motion.div initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} className="bg-fedora-secondary/20 p-8 rounded-xl border border-fedora-primary/30 backdrop-blur-sm">
          <h3 className="text-2xl font-bold text-fedora-text mb-4">Ready to collaborate?</h3>
          <p className="text-fedora-muted mb-8">Whether you have a question about QA automation, Linux setups, or just want to say hi, my inbox is always open.</p>
          <a href="mailto:kjefry525@gmail.com" className="inline-block px-8 py-4 bg-fedora-primary hover:bg-fedora-accent text-white font-mono rounded-lg transition-all hover:shadow-[0_0_30px_rgba(60,110,180,0.6)]">echo "Hello" | mail -s "Portfolio"</a>
        </motion.div>
      </section>

      <footer className="py-8 text-center text-fedora-muted text-sm font-mono border-t border-fedora-secondary/50">
        <p>Built with Next.js, Tailwind & Three.js</p>
        <p className="mt-2">© {new Date().getFullYear()} Jefry Kurniawan. All rights reserved.</p>
      </footer>
    </main>
  );
}