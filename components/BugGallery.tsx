"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal, Bug, Filter, X, AlertTriangle, AlertCircle, Info,
  Shield, ShoppingCart, Search, User, Menu, FileText, Settings, CreditCard, BarChart3,
  Layers, ArrowLeft
} from "lucide-react";
import { bugs, type BugReport } from "@/data/bugs";

const severityIcon = {
  critical: AlertTriangle,
  major: AlertCircle,
  minor: Bug,
  trivial: Info,
} as const;

const severityColor = {
  critical: "text-red-400 border-red-500/30 bg-red-500/10",
  major: "text-orange-400 border-orange-500/30 bg-orange-500/10",
  minor: "text-yellow-400 border-yellow-500/30 bg-yellow-500/10",
  trivial: "text-blue-400 border-blue-500/30 bg-blue-500/10",
} as const;

const statusColor = {
  open: "text-red-300",
  "in-progress": "text-yellow-300",
  resolved: "text-green-300",
  closed: "text-secondary/50",
} as const;

interface MFEModule {
  id: string;
  name: string;
  icon: typeof Shield;
  description: string;
}

const mfeModules: MFEModule[] = [
  { id: "auth", name: "Authentication", icon: Shield, description: "Login, session, RBAC" },
  { id: "checkout", name: "Checkout", icon: ShoppingCart, description: "Cart, promo, payment flow" },
  { id: "search", name: "Search", icon: Search, description: "Product search, filters" },
  { id: "profile", name: "Profile", icon: User, description: "Avatar, settings, preferences" },
  { id: "navigation", name: "Navigation", icon: Menu, description: "Menus, modals, overlays" },
  { id: "reports", name: "Reports", icon: FileText, description: "PDF, analytics export" },
  { id: "settings", name: "Settings", icon: Settings, description: "Theme, preferences" },
  { id: "payment", name: "Payment", icon: CreditCard, description: "Billing, invoices" },
  { id: "analytics", name: "Analytics", icon: BarChart3, description: "Charts, date filters" },
];

const mfeGridIcons = [Shield, ShoppingCart, Search, User, Menu, FileText, Settings, CreditCard, BarChart3];

export default function BugGallery() {
  const [view, setView] = useState<"all" | "mfe">("all");
  const [severityFilter, setSeverityFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedBug, setSelectedBug] = useState<BugReport | null>(null);
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      bugs.filter((b) => {
        if (severityFilter !== "all" && b.severity !== severityFilter) return false;
        if (statusFilter !== "all" && b.status !== statusFilter) return false;
        if (selectedModule && b.module !== selectedModule) return false;
        return true;
      }),
    [severityFilter, statusFilter, selectedModule]
  );

  const moduleStats = useMemo(() => {
    return mfeModules.map((mod) => {
      const moduleBugs = bugs.filter((b) => b.module === mod.id);
      const critical = moduleBugs.filter((b) => b.severity === "critical").length;
      const major = moduleBugs.filter((b) => b.severity === "major").length;
      const minor = moduleBugs.filter((b) => b.severity === "minor").length;
      const trivial = moduleBugs.filter((b) => b.severity === "trivial").length;
      const open = moduleBugs.filter((b) => b.status === "open").length;
      let health: "healthy" | "warning" | "critical" = "healthy";
      if (critical > 0) health = "critical";
      else if (major > 0) health = "warning";
      return { ...mod, total: moduleBugs.length, critical, major, minor, trivial, open, health };
    });
  }, []);

  const severities = ["all", "critical", "major", "minor", "trivial"] as const;
  const statuses = ["all", "open", "in-progress", "resolved", "closed"] as const;

  const healthColor = {
    healthy: "text-green-400 border-green-500/30 bg-green-500/10",
    warning: "text-yellow-400 border-yellow-500/30 bg-yellow-500/10",
    critical: "text-red-400 border-red-500/30 bg-red-500/10",
  };

  return (
    <section id="bug-gallery" className="py-24 px-4 md:px-8 lg:px-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-background to-brand-darker" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass border border-brand-primary/30 mb-4">
            <Terminal className="w-5 h-5 text-brand-primary" />
            <span className="font-mono text-sm text-brand-primary">❯ jefry@linux:~/qa/bugs</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gradient mb-4 pb-1 md:pb-2">Bug Reports</h2>
          <p className="text-secondary text-lg max-w-xl mx-auto">Real bug reports from past projects</p>
        </motion.div>

        {/* View Toggle */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-lg border border-brand-secondary/30 overflow-hidden">
            <motion.button
              onClick={() => { setView("all"); setSelectedModule(null); }}
              whileTap={{ scale: 0.97 }}
              className={`px-5 py-2 font-mono text-xs transition-all ${
                view === "all"
                  ? "bg-brand-primary text-white"
                  : "glass text-secondary hover:bg-brand-primary/10"
              }`}
            >
              <Layers className="w-3.5 h-3.5 inline mr-1.5 -mt-0.5" />
              All Bugs
            </motion.button>
            <motion.button
              onClick={() => setView("mfe")}
              whileTap={{ scale: 0.97 }}
              className={`px-5 py-2 font-mono text-xs transition-all ${
                view === "mfe"
                  ? "bg-brand-primary text-white"
                  : "glass text-secondary hover:bg-brand-primary/10"
              }`}
            >
              <Layers className="w-3.5 h-3.5 inline mr-1.5 -mt-0.5" />
              MFE Dashboard
            </motion.button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {view === "mfe" && !selectedModule ? (
            /* MFE Dashboard */
            <motion.div
              key="mfe-dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {moduleStats.map((mod, i) => {
                  const ModIcon = mfeGridIcons[i];
                  return (
                    <motion.button
                      key={mod.id}
                      onClick={() => setSelectedModule(mod.id)}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="glass p-5 rounded-xl border border-brand-secondary/30 hover:border-brand-primary/50 text-left transition-all group"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="w-10 h-10 rounded-lg bg-brand-primary/15 flex items-center justify-center group-hover:bg-brand-primary/25 transition-colors">
                          <ModIcon className="w-5 h-5 text-brand-primary" />
                        </div>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${healthColor[mod.health]}`}>
                          {mod.health}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-[var(--text-heading)] font-mono mb-1">{mod.name}</h3>
                      <p className="text-[10px] text-secondary/60 font-mono mb-3">{mod.description}</p>
                      <div className="flex items-center gap-3 text-[10px] font-mono text-secondary/50">
                        <span>{mod.total} bugs</span>
                        {mod.critical > 0 && <span className="text-red-400">{mod.critical} critical</span>}
                        {mod.open > 0 && <span className="text-yellow-300">{mod.open} open</span>}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          ) : view === "mfe" && selectedModule ? (
            /* MFE Module Detail - filtered bug list */
            <motion.div
              key="mfe-detail"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <motion.button
                onClick={() => setSelectedModule(null)}
                whileHover={{ scale: 1.02 }}
                className="mb-6 glass px-4 py-2 rounded-lg font-mono text-xs text-secondary hover:text-[var(--text-primary)] border border-brand-secondary/30 hover:border-brand-primary/50 transition-all flex items-center gap-2"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to MFE Dashboard
              </motion.button>

              <div className="flex gap-4 mb-8 justify-center">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-secondary" />
                  <span className="text-xs font-mono text-secondary uppercase">Severity</span>
                  {severities.map((s) => (
                    <motion.button
                      key={s}
                      onClick={() => setSeverityFilter(s)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all ${
                        severityFilter === s
                          ? "bg-brand-primary text-white border-brand-primary"
                          : "glass text-secondary border-brand-secondary/30 hover:border-brand-primary/50"
                      }`}
                    >
                      {s === "all" ? "All" : s}
                    </motion.button>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-secondary uppercase">Status</span>
                  {statuses.map((s) => (
                    <motion.button
                      key={s}
                      onClick={() => setStatusFilter(s)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all ${
                        statusFilter === s
                          ? "bg-brand-primary text-white border-brand-primary"
                          : "glass text-secondary border-brand-secondary/30 hover:border-brand-primary/50"
                      }`}
                    >
                      {s === "all" ? "All" : s}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filtered.map((bug, i) => {
                  const SevIcon = severityIcon[bug.severity];
                  return (
                    <motion.div
                      key={bug.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => setSelectedBug(bug)}
                      className="glass p-5 rounded-xl border border-brand-secondary/30 hover:border-brand-primary/50 cursor-pointer transition-all group"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <SevIcon className={`w-5 h-5 ${severityColor[bug.severity].split(" ")[0]}`} />
                          <div>
                            <span className="text-xs font-mono text-brand-primary">{bug.id}</span>
                            <h3 className="text-sm font-bold text-[var(--text-heading)] font-mono group-hover:text-brand-primary transition-colors">
                              {bug.title}
                            </h3>
                          </div>
                        </div>
                        <span className={`text-xs font-mono ${statusColor[bug.status]}`}>{bug.status}</span>
                      </div>
                      <p className="text-xs text-secondary/70 leading-relaxed line-clamp-2">{bug.description}</p>
                      <div className="flex items-center gap-2 mt-3">
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${severityColor[bug.severity]}`}>
                          {bug.severity}
                        </span>
                        <span className="text-[10px] text-secondary/50 font-mono">{bug.environment}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {filtered.length === 0 && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="text-center text-secondary/50 font-mono py-12">
                  No bugs match the selected filters
                </motion.p>
              )}
            </motion.div>
          ) : (
            /* All Bugs View */
            <motion.div
              key="all-bugs"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="flex flex-wrap gap-4 mb-8 justify-center">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-secondary" />
                  <span className="text-xs font-mono text-secondary uppercase">Severity</span>
                  {severities.map((s) => (
                    <motion.button
                      key={s}
                      onClick={() => setSeverityFilter(s)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all ${
                        severityFilter === s
                          ? "bg-brand-primary text-white border-brand-primary"
                          : "glass text-secondary border-brand-secondary/30 hover:border-brand-primary/50"
                      }`}
                    >
                      {s === "all" ? "All" : s}
                    </motion.button>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-secondary uppercase">Status</span>
                  {statuses.map((s) => (
                    <motion.button
                      key={s}
                      onClick={() => setStatusFilter(s)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all ${
                        statusFilter === s
                          ? "bg-brand-primary text-white border-brand-primary"
                          : "glass text-secondary border-brand-secondary/30 hover:border-brand-primary/50"
                      }`}
                    >
                      {s === "all" ? "All" : s}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AnimatePresence>
                  {filtered.map((bug, i) => {
                    const SevIcon = severityIcon[bug.severity];
                    return (
                      <motion.div
                        key={bug.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ delay: i * 0.05 }}
                        onClick={() => setSelectedBug(bug)}
                        className="glass p-5 rounded-xl border border-brand-secondary/30 hover:border-brand-primary/50 cursor-pointer transition-all group"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <SevIcon className={`w-5 h-5 ${severityColor[bug.severity].split(" ")[0]}`} />
                            <div>
                              <span className="text-xs font-mono text-brand-primary">{bug.id}</span>
                              <h3 className="text-sm font-bold text-[var(--text-heading)] font-mono group-hover:text-brand-primary transition-colors">
                                {bug.title}
                              </h3>
                            </div>
                          </div>
                          <span className={`text-xs font-mono ${statusColor[bug.status]}`}>{bug.status}</span>
                        </div>
                        <p className="text-xs text-secondary/70 leading-relaxed line-clamp-2">{bug.description}</p>
                        <div className="flex items-center gap-2 mt-3">
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${severityColor[bug.severity]}`}>
                            {bug.severity}
                          </span>
                          <span className="text-[10px] text-secondary/50 font-mono">{bug.environment}</span>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

              {filtered.length === 0 && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="text-center text-secondary/50 font-mono py-12">
                  No bugs match the selected filters
                </motion.p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selectedBug && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedBug(null)}
            className="fixed inset-0 bg-[var(--bg-primary)]/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass rounded-2xl border border-brand-secondary/30 max-w-lg w-full max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between p-5 border-b border-brand-secondary/20">
                <div className="flex items-center gap-3">
                  <Terminal className="w-5 h-5 text-brand-primary" />
                  <span className="font-mono text-brand-primary text-sm">{selectedBug.id}</span>
                </div>
                <motion.button
                  onClick={() => setSelectedBug(null)}
                  whileHover={{ scale: 1.1 }}
                  className="p-1 rounded-lg text-secondary hover:text-[var(--text-primary)] hover:bg-brand-primary/10 transition-all"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>
              <div className="p-5 space-y-4">
                <h3 className="text-lg font-bold text-[var(--text-heading)] font-mono">{selectedBug.title}</h3>
                <p className="text-sm text-secondary leading-relaxed">{selectedBug.description}</p>

                <div>
                  <span className="text-xs font-mono text-secondary/70 uppercase block mb-2">Steps to Reproduce</span>
                  <ol className="list-decimal list-inside space-y-1">
                    {selectedBug.steps.map((step, i) => (
                      <li key={i} className="text-sm text-[var(--text-primary)] opacity-80 font-mono">
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-secondary/70 font-mono">Severity:</span>
                    <span className={`text-xs font-mono px-2.5 py-1 rounded border ${severityColor[selectedBug.severity]}`}>
                      {selectedBug.severity}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-secondary/70 font-mono">Status:</span>
                    <span className={`text-xs font-mono ${statusColor[selectedBug.status]}`}>
                      {selectedBug.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-secondary/70 font-mono">Module:</span>
                    <span className="text-xs text-brand-primary font-mono">{selectedBug.module}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-secondary/70 font-mono">Environment:</span>
                    <span className="text-xs text-[var(--text-primary)] font-mono">{selectedBug.environment}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-secondary/70 font-mono">Reported:</span>
                    <span className="text-xs text-[var(--text-primary)] font-mono">{selectedBug.date}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
