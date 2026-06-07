import { create } from "zustand";
import { defaultMetrics, generateMockMetrics, type MetricData } from "@/data/metrics";

interface StoreState {
  theme: "dark" | "light";
  metrics: MetricData;
  metricsLoading: boolean;
  toggleTheme: () => void;
  refreshMetrics: () => void;
}

export const useStore = create<StoreState>((set) => ({
  theme: "dark",
  metrics: defaultMetrics,
  metricsLoading: false,

  toggleTheme: () =>
    set((state) => {
      const next = state.theme === "dark" ? "light" : "dark";
      if (typeof document !== "undefined") {
        document.documentElement.classList.toggle("dark", next === "dark");
      }
      if (typeof localStorage !== "undefined") {
        localStorage.setItem("theme", next);
      }
      return { theme: next };
    }),

  refreshMetrics: () => {
    set({ metricsLoading: true });
    setTimeout(() => {
      set({ metrics: generateMockMetrics(), metricsLoading: false });
    }, 300);
  },
}));
