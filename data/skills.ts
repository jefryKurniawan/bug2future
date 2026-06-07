export type SkillLevel = "core" | "advanced" | "familiar";

export interface SkillItem {
  name: string;
  level: SkillLevel;
  description?: string;
}

export interface SkillCategory {
  id: string;
  label: string;
  icon: string;
  skills: SkillItem[];
  terminalCmd: string;
  gradient: string;
}

export const skillCategories: SkillCategory[] = [
  {
    id: "qa-core",
    label: "QA_Core",
    icon: "Shield",
    terminalCmd: "sudo pacman -S qa-essentials",
    gradient: "from-[#DB7070]/20 via-[#D94A4A]/10 to-transparent",
    skills: [
      { name: "Playwright", level: "core", description: "E2E Automation" },
      { name: "Cypress", level: "core", description: "Frontend Testing" },
      { name: "k6", level: "advanced", description: "Load Testing" },
      { name: "Postman", level: "core", description: "API Testing + Newman" },
      { name: "Appium", level: "familiar", description: "Mobile Testing" },
      { name: "WebdriverIO", level: "familiar", description: "WDIO Framework" },
      { name: "Jest", level: "familiar", description: "Unit & Integration Testing" },
      { name: "Manual Testing", level: "core", description: "Test Case, UAT, Regression" },
      { name: "Bug Reporting", level: "core", description: "JIRA, Freshdesk, SQL Logs" },
    ],
  },
  {
    id: "dev-stack",
    label: "Dev_Stack",
    icon: "Code",
    terminalCmd: "sudo pacman -S --needed base-devel",
    gradient: "from-[#C86464]/20 via-[#D94A4A]/10 to-transparent",
    skills: [
      { name: "JavaScript", level: "core", description: "ES6+, Async/Await" },
      { name: "TypeScript", level: "familiar", description: "Type Safety, Generics" },
      { name: "Node.js", level: "familiar", description: "Express, REST API" },
      { name: "Next.js", level: "familiar", description: "App Router, SSR" },
      { name: "React", level: "familiar", description: "Hooks, Context, TSX" },
      { name: "Laravel", level: "familiar", description: "MVC, Blade, Eloquent" },
      { name: "Tailwind CSS", level: "core", description: "Utility-First, Responsive" },
      { name: "Firebase", level: "familiar", description: "Auth, Firestore, Hosting" },
      { name: "PHP", level: "familiar", description: "Laravel, Blade" },
      { name: "Python", level: "familiar", description: "Scripting, Automation" },
      { name: "SQL", level: "familiar", description: "Queries, Joins, Subqueries" },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    icon: "Terminal",
    terminalCmd: "git clone https://github.com/jefryKurniawan/dotfiles",
    gradient: "from-[#ffb95d]/20 via-[#ff9f43]/10 to-transparent",
    skills: [
      { name: "GitHub Actions", level: "core", description: "CI/CD Pipeline" },
      { name: "Git", level: "core", description: "Branching, Rebase, Hooks" },
      { name: "Linux CLI", level: "core", description: "Bash, Podman, Systemd" },
      { name: "OWASP ZAP", level: "familiar", description: "Security Scanning" },
      { name: "Browser DevTools", level: "core", description: "Debugging, Network, Console" },
      { name: "Podman", level: "familiar", description: "Container Management" },
      { name: "JIRA", level: "core", description: "Agile, Sprint Tracking" },
    ],
  },
  {
    id: "infra",
    label: "Infra",
    icon: "Database",
    terminalCmd: "podman run -d --name db postgres:latest",
    gradient: "from-[#E07A5F]/20 via-[#C0392B]/10 to-transparent",
    skills: [
      { name: "MySQL", level: "advanced", description: "Query Optimization, ERD" },
      { name: "PostgreSQL", level: "familiar", description: "Basic CRUD, Migration" },
      { name: "Azure", level: "familiar", description: "Fundamentals, Cloud Concepts" },
      { name: "Arch Linux", level: "core", description: "Daily Driver, CachyOS, Pacman" },
      { name: "Debian", level: "familiar", description: "Server Setup, APT" },
    ],
  },
];

export const levelConfig = {
  core: { hex: "#DB7070", label: "Expert" },
  advanced: { hex: "#C86464", label: "Proficient" },
  familiar: { hex: "#E8A84C", label: "Learning" },
} as const;
