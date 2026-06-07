"use client";

import Link from "next/link";
import {
  ArrowLeft, Github, School, Globe, Building2,
  TreePine, Church, Shirt, FolderGit2, Terminal
} from "lucide-react";
import { getProjectBySlug } from "@/data/projects";

const iconMap: Record<string, React.ElementType> = {
  School, Globe, Building2, TreePine, Church, Shirt,
};

export default function ProjectDetailClient({ slug }: { slug: string }) {
  const project = getProjectBySlug(slug);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="text-center">
          <Terminal className="w-12 h-12 text-brand-primary mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-[var(--text-heading)] mb-2">Project not found</h1>
          <p className="text-secondary mb-6">The project &quot;{slug}&quot; does not exist.</p>
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 px-4 py-2 glass rounded-lg text-brand-primary hover:border-brand-primary/60 transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  const Icon = iconMap[project.iconName] || FolderGit2;

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-secondary hover:text-brand-primary transition-colors mb-8 text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Projects
        </Link>

        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 rounded-xl bg-brand-primary/10 border border-brand-primary/20">
            <Icon className="w-7 h-7 text-brand-primary" />
          </div>
          <div>
            <h1 className="text-2xl md:text-4xl font-bold text-[var(--text-heading)]">{project.name}</h1>
            <p className="text-secondary text-sm md:text-base mt-1">{project.desc}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-mono bg-brand-secondary/20 text-brand-primary px-3 py-1.5 rounded border border-brand-primary/20"
            >
              {tag}
            </span>
          ))}
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-mono bg-brand-secondary/20 text-brand-primary px-3 py-1.5 rounded border border-brand-primary/20 hover:bg-brand-primary/20 transition-all"
          >
            <Github className="w-3.5 h-3.5" /> View on GitHub
          </a>
        </div>

        {project.video && (
          <div className="mb-8">
            <div className="glass rounded-xl overflow-hidden border border-brand-secondary/30">
              <video
                controls
                className="w-full max-h-[500px]"
                poster="/masjid/beranda.png"
              >
                <source src={project.video} type="video/webm" />
              </video>
            </div>
          </div>
        )}

        {project.screenshots.length > 0 && (
          <div className={`mb-8 grid gap-4 ${
            project.screenshots.length === 1
              ? "grid-cols-1"
              : project.screenshots.length <= 3
                ? "grid-cols-1 md:grid-cols-2"
                : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
          }`}>
            {project.screenshots.map((src, i) => (
              <div key={i} className="glass rounded-xl overflow-hidden border border-brand-secondary/30 group">
                <a href={src} target="_blank" rel="noopener noreferrer">
                  <img
                    src={src}
                    alt={`${project.name} screenshot ${i + 1}`}
                    className="w-full h-48 md:h-56 object-cover object-top hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </a>
              </div>
            ))}
          </div>
        )}

        {project.longDesc && (
          <div
            className="prose prose-invert max-w-none glass p-6 md:p-8 rounded-xl border border-brand-secondary/30"
            dangerouslySetInnerHTML={{ __html: project.longDesc }}
          />
        )}
      </div>
    </main>
  );
}
