// components/ProjectsSection.tsx
"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useRef, useState, useEffect, useMemo } from "react";
import { 
  Github, ExternalLink, FolderGit2, 
  ShoppingCart, Globe, Code2,
  Terminal, Server,
  TestTube, Smartphone, BookOpen,
  School, Building2, TreePine, Church, Shirt
} from "lucide-react";

interface ProjectData {
  name: string;
  repo: string;
  desc: string;
  tags: string[];
  icon: React.ElementType;
  demo?: string;
  image?: string;
}

// Client Projects - BIIS CORP & SAMWI
const clientProjects: ProjectData[] = [
  { 
    name: "MD Mall Blora", 
    icon: ShoppingCart,
    desc: "Comprehensive ERP testing ensuring seamless inventory, sales, and reporting workflows for a regional retail hub.",
    tags: ["ERP Testing", "Manual"],
    repo: "#",
  },
  { 
    name: "Envio Store", 
    icon: Globe,
    desc: "End-to-End (E2E) testing framework implementation for an e-commerce platform, verifying user journeys from login to checkout.",
    tags: ["E2E", "Cypress"],
    repo: "#",
  },
  { 
    name: "Simpan Pinjam PLN", 
    icon: Terminal,
    desc: "Led User Acceptance Testing (UAT) phases for a cooperative financial system, validating complex loan calculation logic.",
    tags: ["UAT", "Finance"],
    repo: "#",
  },
  { 
    name: "HRIS BSH", 
    icon: FolderGit2,
    desc: "Rigorous testing of Human Resource Information System modules including payroll, attendance, and performance evaluation.",
    tags: ["ERP Testing", "HRIS"],
    repo: "#",
  },
  { 
    name: "Sejati Manunggal", 
    icon: Terminal,
    desc: "Enterprise ERP testing for manufacturing workflows and supply chain management.",
    tags: ["ERP", "Manufacturing"],
    repo: "#",
  },
  { 
    name: "Online LMS", 
    icon: Server,
    desc: "Cypress automation for online learning platform with E2E and regression testing.",
    tags: ["Automation", "EdTech"],
    repo: "#",
  },
];

const qaProjects: ProjectData[] = [
  { 
    name: "SDET Web", 
    icon: TestTube,
    desc: "UI testing (Playwright), performance test (K6), security (SQL injection), and CI/CD GitHub Actions with HTML report.",
    tags: ["Playwright", "K6", "CI/CD", "E2E"],
    repo: "https://github.com/jefryKurniawan/sauceDemo-Portofolio",
    demo: "https://www.linkedin.com/posts/jefry-kurniawan-7443272aa_sdet-qaautomation-playwright-activity-7449859752882307073-_7GC",
  },
  { 
    name: "API Automation", 
    icon: Code2,
    desc: "Smoke, functional, regression, integration, and negative API tests using Axios + Jest + TypeScript with GitHub Actions pipeline.",
    tags: ["Axios", "Jest", "TypeScript", "CI/CD"],
    repo: "https://github.com/jefryKurniawan/apiAutomation-portofolio",
    demo: "https://www.linkedin.com/posts/jefry-kurniawan-7443272aa_apiautomation-sdet-typescript-activity-7450478565210636289-uTa8",
  },
  { 
    name: "API Testing (Postman)", 
    icon: Server,
    desc: "CRUD operations, positive & negative testing, response validation with Postman automated assertions.",
    tags: ["Postman", "Newman", "API Testing"],
    repo: "https://github.com/jefryKurniawan/apiTestingPortofolio-JefryK",
    demo: "https://www.linkedin.com/posts/jefry-kurniawan-7443272aa_github-jefrykurniawanapitestingportofolio-jefryk-activity-7449340523204567040-HdMp",
  },
  { 
    name: "Mobile Testing", 
    icon: Smartphone,
    desc: "Appium + WebdriverIO + TypeScript E2E testing on Android Emulator. APK-only black-box approach with 4 passing tests.",
    tags: ["Appium", "WebdriverIO", "Android", "E2E"],
    repo: "https://github.com/jefryKurniawan/mobileSDET-Portofolio",
    demo: "https://www.linkedin.com/posts/jefry-kurniawan-7443272aa_mobiletesting-appium-webdriverio-activity-7450108457875058688-6zpi",
  },
  { 
    name: "Web & Mobile Testing", 
    icon: BookOpen,
    desc: "Selenium automation from University of Minnesota Coursera course. Web and mobile test automation covering multiple platforms.",
    tags: ["Selenium", "Java", "Coursera"],
    repo: "https://github.com/jefrykurniawan/Web-MobileTestingSelenium",
    demo: "https://www.linkedin.com/posts/jefry-kurniawan-7443272aa_softwaretesting-testautomation-selenium-activity-7458770597532061696--gdx",
  },
];

const fullstackProjects: ProjectData[] = [
  { 
    name: "SIM Sekolah MTS Hasanuddin", 
    icon: School,
    desc: "School management information system built with Laravel for academic data management, scheduling, and reporting.",
    tags: ["Laravel", "MySQL", "Management"],
    repo: "https://github.com/jefryKurniawan/sim-mts-hasanuddin",
  },
  { 
    name: "Axia Orto", 
    icon: Globe,
    desc: "React TypeScript + Laravel fullstack application with debloated architecture for modern web performance.",
    tags: ["React", "TypeScript", "Laravel"],
    repo: "https://github.com/jefryKurniawan/axia-orto",
  },
  { 
    name: "KSP ERP", 
    icon: Building2,
    desc: "Enterprise ERP system built with Laravel + MySQL for cooperative management, financial tracking, and member services.",
    tags: ["Laravel", "ERP", "MySQL"],
    repo: "https://github.com/jefryKurniawan/ksp-erp",
  },
  { 
    name: "TandurAI", 
    icon: TreePine,
    desc: "AI-powered agricultural app built with React Native (Expo) + FastAPI backend for smart farming assistance.",
    tags: ["React Native", "Expo", "FastAPI", "AI"],
    repo: "https://github.com/jefryKurniawan/TandurAI",
  },
  { 
    name: "Masjid Al-Ikhlas", 
    icon: Church,
    desc: "Mosque management application for donation tracking, event scheduling, and community engagement built with Laravel.",
    tags: ["Laravel", "MySQL", "Management"],
    repo: "https://github.com/jefryKurniawan/al-ikhlas-mosque",
  },
  { 
    name: "Aplikasi Laundry", 
    icon: Shirt,
    desc: "Laundry management system with order tracking, payment processing, transaction notes, and owner dashboard. Built with Laravel.",
    tags: ["Laravel", "MySQL", "Management"],
    repo: "https://github.com/jefryKurniawan/laundry",
    image: "/images/projects/laundry/home-2.png",
  },
];

const projectSections = [
  { title: "Client Projects", cmd: "ls client_projects/", items: clientProjects },
  { title: "QA Automation", cmd: "ls sdet_portfolio/", items: qaProjects },
  { title: "Fullstack", cmd: "ls fullstack_projects/", items: fullstackProjects },
];

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

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
      <motion.div style={{ y: bgY }} className="absolute inset-0 bg-gradient-to-b from-fedora-darker via-fedora-dark to-background" />
      
      <motion.div 
        style={{ x: isTouchDevice ? 0 : springX, y: isTouchDevice ? 0 : springY }}
        className="absolute inset-0 opacity-20"
      >
        <div className="w-[300%] h-[300%] -translate-x-1/3 -translate-y-1/3 bg-[linear-gradient(to_right,rgba(48,111,195,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(48,111,195,0.08)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </motion.div>
      
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

        {projectSections.map((section, sIdx) => (
          <div key={section.title} className="mb-16 md:mb-20 last:mb-0">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-8 font-mono"
            >
              <FolderGit2 className="w-5 h-5 text-fedora-primary" />
              <span className="text-fedora-primary">&gt;</span>
              <span className="text-white font-bold">{section.cmd}</span>
              <span className="text-secondary text-xs hidden sm:inline">({section.items.length} items)</span>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {section.items.map((project, index) => (
                <ProjectCard 
                  key={project.name}
                  project={project}
                  index={index}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: ProjectData; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="glass p-4 md:p-6 rounded-xl border border-fedora-secondary/30 hover:border-fedora-primary/50 transition-all group"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="p-2 rounded-lg bg-fedora-primary/10 border border-fedora-primary/20 flex-shrink-0">
            <project.icon className="w-5 h-5 text-fedora-primary" />
          </div>
          <h3 className="text-base md:text-lg font-bold text-white font-mono group-hover:text-fedora-primary transition-colors truncate">
            {project.name}
          </h3>
        </div>
        <div className="flex gap-2 flex-shrink-0 ml-2">
          <a 
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${project.name} repository on GitHub`}
            className="p-2 rounded-lg text-secondary hover:text-fedora-primary hover:bg-fedora-primary/10 transition-all"
          >
            <Github className="w-4 h-4" />
          </a>
          {project.demo && (
            <a 
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${project.name} demo`}
              className="p-2 rounded-lg text-secondary hover:text-fedora-primary hover:bg-fedora-primary/10 transition-all"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
      
      {project.image && (
        <div className="mb-4 -mx-1">
          <img 
            src={project.image}
            alt={`${project.name} screenshot`}
            className="w-full h-36 md:h-48 object-cover rounded-lg border border-fedora-secondary/20"
            loading="lazy"
          />
        </div>
      )}
      
      <p className="text-secondary text-sm mb-4 line-clamp-2 leading-relaxed">{project.desc}</p>
      
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
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
