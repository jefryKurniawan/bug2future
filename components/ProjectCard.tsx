"use client";
import { motion } from "framer-motion";
import { ArrowUpRight, GitBranch, Folder } from "lucide-react";

interface ProjectProps {
  title: string; desc: string; tags: string[]; index: number; link?: string; repo?: string;
}

export default function ProjectCard({ title, desc, tags, index, link, repo }: ProjectProps) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -10 }} className="bg-fedora-dark border border-fedora-secondary rounded-xl overflow-hidden group">
      <div className="relative h-48 bg-gradient-to-br from-fedora-secondary/50 to-fedora-dark flex items-center justify-center">
        <div className="absolute inset-0 bg-fedora-primary/20 group-hover:bg-transparent transition-colors z-10" />
        <Folder size={48} className="text-fedora-muted opacity-50" />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-fedora-text font-mono">{title}</h3>
          <div className="flex gap-4">
            {repo && <a href={repo} target="_blank" className="text-fedora-muted hover:text-fedora-primary transition-colors"><GitBranch size={20} /></a>}
            {link && <a href={link} target="_blank" className="text-fedora-muted hover:text-fedora-primary transition-colors"><ArrowUpRight size={20} /></a>}
          </div>
        </div>
        <p className="text-fedora-muted text-sm mb-4 line-clamp-3">{desc}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (<span key={tag} className="text-xs font-mono bg-fedora-secondary/50 text-fedora-accent px-2 py-1 rounded">{tag}</span>))}
        </div>
      </div>
    </motion.div>
  );
}