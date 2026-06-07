"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  text: string;
}

const responses: Array<{ keywords: string[]; reply: string }> = [
  {
    keywords: ["test", "testing", "qa", "automation"],
    reply: "I specialize in QA automation! I use Playwright, Cypress, and K6 for testing. Check out my QA Dashboard and Test Runner sections above for demos.",
  },
  {
    keywords: ["project", "portfolio", "work"],
    reply: "I've worked on ERP testing at BIIS CORP, E2E automation for an e-learning platform, and built several fullstack projects. Browse the Projects section!",
  },
  {
    keywords: ["skill", "tech", "technology", "stack"],
    reply: "My core stack: Playwright, Cypress, TypeScript, Node.js, Laravel, React. I'm also proficient in SQL, Linux, and CI/CD with GitHub Actions.",
  },
  {
    keywords: ["experience", "career", "job", "background"],
    reply: "I'm a QA Engineer at BIIS CORP since Feb 2025, with prior internship experience at SAMWI (London) and fullstack development at PT. Cipta Karya.",
  },
  {
    keywords: ["contact", "email", "hire", "reach"],
    reply: "You can reach me through the Contact form below, or connect on LinkedIn at linkedin.com/in/jefrykurniawan",
  },
  {
    keywords: ["certification", "certificate", "course"],
    reply: "I hold 15+ certifications including Claude Code in Action (Anthropic), Selenium (U of Minnesota), Generative AI (DeepLearning.AI), and Azure Data Fundamentals.",
  },
  {
    keywords: ["help", "menu", "what", "can you"],
    reply: "I can tell you about my experience, skills, projects, certifications, or contact info. Try asking about 'testing', 'projects', 'skills', 'experience', or 'contact'!",
  },
];

function getReply(input: string): string {
  const lower = input.toLowerCase();
  for (const r of responses) {
    if (r.keywords.some((k) => lower.includes(k))) return r.reply;
  }
  return "I'm not sure I understand. Try asking about my skills, projects, experience, testing, or certifications!";
}

export default function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", text: "Hi! Ask me anything about my portfolio, skills, or experience. 👇" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const handleSend = useCallback(() => {
    const text = input.trim();
    if (!text || typing) return;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text }]);
    setTyping(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "assistant", text: getReply(text) }]);
      setTyping(false);
    }, 600 + Math.random() * 400);
  }, [input, typing]);

  return (
    <>
      <motion.button
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-brand-primary text-white shadow-lg shadow-brand-primary/30 flex items-center justify-center"
        aria-label="Open chat assistant"
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] glass rounded-2xl border border-brand-secondary/30 shadow-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-brand-secondary/20 bg-brand-dark/50">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-brand-primary" />
                <span className="font-mono text-sm text-[var(--text-heading)] font-bold">QA Assistant</span>
              </div>
              <motion.button
                onClick={() => setOpen(false)}
                whileHover={{ scale: 1.1 }}
                className="p-1 rounded-lg text-secondary hover:text-[var(--text-primary)] transition-colors"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            <div className="p-4 h-[320px] overflow-y-auto space-y-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : ""}`}>
                  {msg.role === "assistant" && <Bot className="w-5 h-5 text-brand-primary flex-shrink-0 mt-1" />}
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-xl text-sm font-mono ${
                      msg.role === "user"
                        ? "bg-brand-primary text-white rounded-tr-sm"
                        : "bg-brand-secondary/20 text-[var(--text-primary)]/90 rounded-tl-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                  {msg.role === "user" && <User className="w-5 h-5 text-brand-primary flex-shrink-0 mt-1" />}
                </div>
              ))}
              {typing && (
                <div className="flex gap-2">
                  <Bot className="w-5 h-5 text-brand-primary flex-shrink-0 mt-1" />
                  <div className="bg-brand-secondary/20 px-3 py-2 rounded-xl rounded-tl-sm">
                    <span className="inline-flex gap-1">
                      {[0, 0.15, 0.3].map((delay) => (
                        <motion.span
                          key={delay}
                          className="w-1.5 h-1.5 bg-secondary rounded-full"
                          animate={{ y: [0, -6, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay, ease: "easeInOut" }}
                        />
                      ))}
                    </span>
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            <div className="flex items-center gap-2 p-3 border-t border-brand-secondary/20">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") handleSend(); }}
                placeholder="Ask me anything..."
                className="flex-1 bg-brand-secondary/20 text-[var(--text-primary)] placeholder:text-secondary/50 text-sm font-mono px-3 py-2 rounded-xl border border-brand-secondary/30 focus:outline-none focus:border-brand-primary/50 transition-colors"
              />
              <motion.button
                onClick={handleSend}
                disabled={!input.trim() || typing}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-xl bg-brand-primary text-white disabled:opacity-40 transition-opacity"
              >
                <Send className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
