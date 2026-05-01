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
        fedora: {
          primary: "#a8c8ff",
          secondary: "#304879",
          accent: "#419cde",
          lightBlue: "#5a9fd4",
          blue: "#306fc3",
          dark: "#1b263b",
          darker: "#0d1b2a",
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