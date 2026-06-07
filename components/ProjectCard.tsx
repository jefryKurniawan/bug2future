// src/components/ProjectCard.tsx
"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, GitBranch, Folder, Star, GitFork } from "lucide-react";

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
      className="bg-brand-dark border border-brand-secondary/30 rounded-xl overflow-hidden group hover:border-brand-primary/50 transition-all"
    >
      <div className="relative h-48 bg-gradient-to-br from-brand-secondary/20 to-brand-dark flex items-center justify-center">
        <div className="absolute inset-0 bg-brand-primary/10 group-hover:bg-transparent transition-colors z-10" />
        <Folder size={48} className="text-brand-primary opacity-50" />
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
                aria-label={`View ${title} repository on GitHub`}
                className="text-gray-400 hover:text-brand-primary transition-colors"
              >
                <GitBranch size={20} />
              </a>
            )}
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${title} website`}
                className="text-gray-400 hover:text-brand-primary transition-colors"
              >
                <ArrowUpRight size={20} />
              </a>
            )}
          </div>
        </div>
        
        <p className="text-gray-400 text-sm mb-4 line-clamp-3">{desc}</p>
        
        <div className="flex items-center gap-3 mb-4 text-xs font-mono text-gray-400">
          <span className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5" />
            <span>42</span>
          </span>
          <span className="flex items-center gap-1">
            <GitFork className="w-3.5 h-3.5" />
            <span>7</span>
          </span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-mono bg-brand-secondary/20 text-brand-primary px-3 py-1 rounded-full border border-brand-primary/20"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}