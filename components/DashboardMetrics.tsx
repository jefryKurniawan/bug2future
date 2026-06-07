"use client";

import { motion } from "framer-motion";
import { Terminal, RefreshCcw, Bug, ShieldCheck, TestTube, BarChart3 } from "lucide-react";
import { useStore } from "@/hooks/useStore";

const metricIcons = {
  totalTests: TestTube,
  passRate: ShieldCheck,
  bugsOpen: Bug,
  bugsClosed: Bug,
  coverage: BarChart3,
} as const;

const metricLabels: Record<string, string> = {
  totalTests: "Total Test Cases",
  passRate: "Pass Rate",
  bugsOpen: "Bugs Open",
  bugsClosed: "Bugs Closed",
  coverage: "Coverage",
};

export default function DashboardMetrics() {
  const metrics = useStore((s) => s.metrics);
  const loading = useStore((s) => s.metricsLoading);
  const refresh = useStore((s) => s.refreshMetrics);

  const items = Object.entries(metrics).map(([key, raw]) => {
    const val = typeof raw === "number" ? raw : 0;
    const suffix = key === "passRate" || key === "coverage" ? "%" : "";
    return { key, value: val, suffix, label: metricLabels[key] ?? key, Icon: metricIcons[key as keyof typeof metricIcons] ?? BarChart3 };
  });

  return (
    <section id="qa-dashboard" className="py-24 px-4 md:px-8 lg:px-20 relative overflow-hidden">
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
            <span className="font-mono text-sm text-brand-primary">❯ jefry@linux:~/qa/dashboard</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gradient mb-4">QA Dashboard</h2>
          <p className="text-secondary text-lg max-w-xl mx-auto">Real-time mock metrics — click refresh to simulate</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {items.map(({ key, value, suffix, label, Icon }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass p-4 md:p-5 rounded-xl border border-brand-secondary/30 text-center"
            >
              <Icon className="w-5 h-5 text-brand-primary mx-auto mb-2" />
              <motion.span
                key={value}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="block text-2xl md:text-3xl font-bold font-mono text-[var(--text-heading)]"
              >
                {loading ? (
                  <motion.span
                            className="inline-block w-12 h-6 bg-brand-secondary/30 rounded"
                            animate={{ opacity: [0.3, 0.7, 0.3] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                          />
                ) : (
                  <>{value}{suffix}</>
                )}
              </motion.span>
              <span className="text-xs text-secondary font-mono mt-1 block">{label}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.button
            onClick={refresh}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-primary text-white font-mono text-sm hover:bg-brand-accent transition-colors"
          >
            <motion.span
              animate={loading ? { rotate: 360 } : {}}
              transition={loading ? { duration: 1, repeat: Infinity, ease: "linear" } : {}}
              style={{ display: "inline-flex" }}
            >
              <RefreshCcw className="w-4 h-4" />
            </motion.span>
            Refresh Metrics
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
