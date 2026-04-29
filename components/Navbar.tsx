"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal, GitBranch, Link, Send } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const navLinks = [{ name: "About", href: "#about" }, { name: "Experience", href: "#experience" }, { name: "Projects", href: "#projects" }, { name: "Contact", href: "#contact" }];

  return (
    <motion.nav initial={{ y: -100 }} animate={{ y: 0 }} className={`fixed top-0 w-full z-40 transition-all duration-300 ${scrolled ? "bg-fedora-dark/80 backdrop-blur-md border-b border-fedora-secondary" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2 text-fedora-primary font-mono font-bold text-xl">
            <Terminal size={24} /><span>jefry@linux:~</span>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} className="text-fedora-text hover:text-fedora-accent px-3 py-2 rounded-md text-sm font-medium transition-colors font-mono">./ {link.name}</a>
              ))}
            </div>
          </div>
          <div className="flex gap-4">
            <a href="https://github.com/jefryKurniawan" target="_blank" className="text-fedora-muted hover:text-fedora-primary transition-colors"><GitBranch size={20} /></a>
            <a href="https://linkedin.com/in/jefry-kurniawan-7443272aa" target="_blank" className="text-fedora-muted hover:text-fedora-primary transition-colors"><Link size={20} /></a>
            <a href="mailto:kjefry525@gmail.com" className="text-fedora-muted hover:text-fedora-primary transition-colors"><Send size={20} /></a>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}