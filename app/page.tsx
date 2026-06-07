// src/app/page.tsx
"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import BootLoader from "@/components/BootLoader";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import DashboardMetrics from "@/components/DashboardMetrics";
import BugGallery from "@/components/BugGallery";
import TestRunner from "@/components/TestRunner";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import CertificationSection from "@/components/CertificationSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ChatAssistant from "@/components/ChatAssistant";

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <AnimatePresence>
        {loading && <BootLoader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <main className="min-h-screen bg-background">
        <Navbar />
        <HeroSection />
        <DashboardMetrics />
        <BugGallery />
        <TestRunner />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <CertificationSection />
        <ContactSection />
        <Footer />
        <ChatAssistant />
      </main>
    </>
  );
}