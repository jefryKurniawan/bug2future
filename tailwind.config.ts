// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#0B0F19",
        foreground: "#ffffff",
        brand: {
          primary: "#B83A3A",
          secondary: "#8B2020",
          accent: "#D94A4A",
          warm: "#E07A5F",
          deep: "#C0392B",
          dark: "#1A0E0E",
          darker: "#0A0505",
        },
      },
      fontFamily: {
        sans: ["system-ui", "-apple-system", "sans-serif"],
        mono: ["ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;