"use client";
import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";

interface ExperienceProps {
  role: string; company: string; period: string; location: string; details: string[]; index: number;
}

export default function ExperienceCard({ role, company, period, location, details, index }: ExperienceProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.02, backgroundColor: "rgba(41, 65, 114, 0.3)" }}
      className="bg-fedora-dark/50 border border-fedora-secondary p-6 rounded-lg backdrop-blur-sm mb-6 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-20 h-20 bg-fedora-primary/10 rounded-bl-full -mr-10 -mt-10 transition-all group-hover:bg-fedora-primary/20" />
      <div className="flex flex-col md:flex-row justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-fedora-accent font-mono">{role}</h3>
          <div className="text-fedora-text font-semibold">{company}</div>
        </div>
        <div className="text-fedora-muted text-sm mt-2 md:mt-0 flex flex-col items-end">
          <div className="flex items-center gap-2"><Calendar size={14} /> {period}</div>
          <div className="flex items-center gap-2"><MapPin size={14} /> {location}</div>
        </div>
      </div>
      <ul className="space-y-2">
        {details.map((detail, i) => (
          <li key={i} className="flex items-start gap-2 text-fedora-muted text-sm"><span className="text-fedora-primary mt-1">➜</span><span>{detail}</span></li>
        ))}
      </ul>
    </motion.div>
  );
}