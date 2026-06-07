export interface Experience {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
  skills: string[];
  current: boolean;
  highlight: string;
}

export const experiences: Experience[] = [
  {
    title: "Quality Assurance",
    company: "BIIS CORP",
    location: "Surakarta, Indonesia",
    period: "Feb 2025 – Mar 2026",
    description: "Manual & automation testing for ERP modules (Sales Order, Purchase Order, Inventory, Financial Accounting). UAT with retail clients.",
    skills: ["Playwright", "Cypress", "JIRA", "SQL", "Postman", "Test Case", "UAT", "EUT", "ERP", "Agile", "Linux", "Git"],
    current: true,
    highlight: "ERP Testing Expert",
  },
  {
    title: "Quality Assurance Intern",
    company: "SAMWI (Remote)",
    location: "London, UK",
    period: "Jul 2025 – Aug 2025",
    description: "Cypress automation for online learning platform. E2E & regression testing in Agile workflow.",
    skills: ["Cypress", "Git", "Test Case", "Agile", "E2E Testing"],
    current: false,
    highlight: "Remote International",
  },
  {
    title: "Intern Full Stack Programmer",
    company: "PT. Cipta Karya",
    location: "Malang, Indonesia",
    period: "May 2024 – Aug 2024",
    description: "Web development with Node.js, React, TypeScript, Firebase, Midtrans payment gateway.",
    skills: ["Node.js", "React", "TypeScript", "Firebase", "Midtrans", "Git"],
    current: false,
    highlight: "Full Stack Foundation",
  },
  {
    title: "Data Entry",
    company: "PAYONESIA",
    location: "Yogyakarta, Indonesia",
    period: "May 2021 – Apr 2022",
    description: "Data entry and administrative support for fintech operations, ensuring accurate data processing and record management.",
    skills: ["Data Entry", "Excel", "Administration"],
    current: false,
    highlight: "Fintech Operations",
  },
];
