"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Terminal, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { scenarios, type TestStepLog } from "@/utils/testRunnerLogic";

export default function TestRunner() {
  const [selected, setSelected] = useState(scenarios[0].id);
  const [running, setRunning] = useState(false);
  const [logs, setLogs] = useState<TestStepLog[]>([]);
  const [result, setResult] = useState<"pass" | "fail" | null>(null);
  const [duration, setDuration] = useState(0);

  const handleRun = useCallback(async () => {
    setRunning(true);
    setLogs([]);
    setResult(null);

    const scenario = scenarios.find((s) => s.id === selected);
    if (!scenario) return;

    const startTime = Date.now();

    for (let i = 0; i < scenario.steps.length; i++) {
      await new Promise((r) => setTimeout(r, 400 + Math.random() * 300));
      const passed = i < scenario.steps.length - 1 ? true : Math.random() > 0.25;
      setLogs((prev) => [
        ...prev,
        { step: scenario.steps[i], status: passed ? "pass" : "fail", timestamp: Date.now() },
      ]);
    }

    const elapsed = parseFloat(((Date.now() - startTime) / 1000).toFixed(2));
    setDuration(elapsed);

    const finalPass = Math.random() > 0.25;
    setResult(finalPass ? "pass" : "fail");
    setRunning(false);
  }, [selected]);

  return (
    <section id="test-runner" className="py-24 px-4 md:px-8 lg:px-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-darker via-background to-brand-dark" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass border border-brand-primary/30 mb-4">
            <Terminal className="w-5 h-5 text-brand-primary" />
            <span className="font-mono text-sm text-brand-primary">❯ jefry@linux:~/qa/test-runner</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gradient mb-4">Test Runner</h2>
          <p className="text-secondary text-lg max-w-xl mx-auto">Interactive demo — select a scenario and run it</p>
        </motion.div>

        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          {scenarios.map((s) => (
            <motion.button
              key={s.id}
              onClick={() => { if (!running) { setSelected(s.id); setLogs([]); setResult(null); } }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-5 py-2.5 rounded-xl font-mono text-sm border transition-all ${
                selected === s.id
                  ? "bg-brand-primary text-white border-brand-primary"
                  : "glass text-secondary border-brand-secondary/30 hover:border-brand-primary/50"
              }`}
            >
              {s.name}
            </motion.button>
          ))}
        </div>

        <motion.div className="glass rounded-xl border border-brand-secondary/30 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-brand-secondary/20 bg-brand-dark/50">
            <div className="flex items-center gap-2 font-mono text-xs text-secondary">
              <Terminal className="w-4 h-4" />
              test-runner — {scenarios.find((s) => s.id === selected)?.name}
            </div>
            <motion.button
              onClick={handleRun}
              disabled={running}
              whileHover={running ? {} : { scale: 1.05 }}
              whileTap={running ? {} : { scale: 0.95 }}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-mono transition-all ${
                running
                  ? "bg-brand-secondary/30 text-secondary cursor-not-allowed"
                  : "bg-brand-primary text-white hover:bg-brand-accent"
              }`}
            >
              {running ? (
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  style={{ display: "inline-flex" }}
                >
                  <Loader2 className="w-3.5 h-3.5" />
                </motion.span>
              ) : (
                <Play className="w-3.5 h-3.5" />
              )}
              {running ? "Running..." : "Run Test"}
            </motion.button>
          </div>

          <div className="p-5 space-y-3 min-h-[200px] max-h-[320px] overflow-y-auto font-mono text-sm">
            {logs.length === 0 && !running && (
              <p className="text-secondary/50 text-center py-8">Select a scenario and press Run Test</p>
            )}
            <AnimatePresence>
              {logs.map((log, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-start gap-3"
                >
                  {log.status === "pass" ? (
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                  )}
                  <span className={log.status === "pass" ? "text-green-300" : "text-red-300"}>{log.step}</span>
                  <span className="text-secondary/50 text-xs ml-auto flex-shrink-0">
                    {((log.timestamp - logs[0]?.timestamp) / 1000).toFixed(1)}s
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {result && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              className={`px-5 py-3 border-t font-mono text-sm flex items-center justify-between ${
                result === "pass"
                  ? "border-green-500/30 bg-green-500/10 text-green-300"
                  : "border-red-500/30 bg-red-500/10 text-red-300"
              }`}
            >
              <span className="flex items-center gap-2">
                {result === "pass" ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                {result === "pass" ? "ALL TESTS PASSED" : "TEST FAILED"}
              </span>
              <span>{duration}s</span>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
