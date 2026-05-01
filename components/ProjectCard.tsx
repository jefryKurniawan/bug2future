// src/components/ProjectCard.tsx
"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, GitBranch, Folder } from "lucide-react";

interface ProjectCardProps {
  title: string;
  desc: string;
  tags: string[];
  index: number;
  link?: string;
  repo?: string;
}

export default function ProjectCard({ 
  title, 
  desc, 
  tags, 
  index, 
  link, 
  repo 
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -10 }}
      className="bg-fedora-dark border border-fedora-secondary/30 rounded-xl overflow-hidden group hover:border-fedora-primary/50 transition-all"
    >
      <div className="relative h-48 bg-gradient-to-br from-fedora-secondary/20 to-fedora-dark flex items-center justify-center">
        <div className="absolute inset-0 bg-fedora-primary/10 group-hover:bg-transparent transition-colors z-10" />
        <Folder size={48} className="text-fedora-primary opacity-50" />
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white font-mono">{title}</h3>
          <div className="flex gap-4">
            {repo && (
              <a
                href={repo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-fedora-primary transition-colors"
              >
                <GitBranch size={20} />
              </a>
            )}
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-fedora-primary transition-colors"
              >
                <ArrowUpRight size={20} />
              </a>
            )}
          </div>
        </div>
        
        <p className="text-gray-400 text-sm mb-4 line-clamp-3">{desc}</p>
        
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-mono bg-fedora-secondary/20 text-fedora-primary px-3 py-1 rounded-full border border-fedora-primary/20"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}