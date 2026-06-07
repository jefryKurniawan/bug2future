export interface Certification {
  name: string;
  issuer: string;
  date: string;
}

export const certifications: Certification[] = [
  { name: "Claude Code in Action", issuer: "Anthropic", date: "Mei 2026" },
  { name: "Web and Mobile Testing with Selenium", issuer: "University of Minnesota", date: "Mei 2026" },
  { name: "Generative AI for Everyone", issuer: "DeepLearning.AI", date: "Feb 2026" },
  { name: "Blockchain Masterclass", issuer: "CFTE", date: "Jun 2025" },
  { name: "Fintech Masterclass", issuer: "CFTE", date: "Jun 2025" },
  { name: "Belajar Dasar Pemrograman JavaScript", issuer: "Dicoding Indonesia", date: "Oct 2025" },
  { name: "Product Management", issuer: "Rakamin Academy", date: "Mei 2024" },
  { name: "Microsoft Azure Data Fundamentals", issuer: "Microsoft", date: "Apr 2024" },
  { name: "Python Fundamental for Data Science", issuer: "DQLab", date: "May 2024" },
  { name: "SQL (Basic)", issuer: "HackerRank", date: "Jan 2023" },
  { name: "Kursus React", issuer: "Progate", date: "Sept 2022" },
  { name: "Selenium WebDriver Java", issuer: "Udemy", date: "Jul 2025" },
  { name: "Professional Diploma in Agile and Scrum", issuer: "Udemy", date: "Jun 2025" },
  { name: "Basic Visual Testing", issuer: "Applitools", date: "Apr 2025" },
  { name: "Memulai Pemrograman dengan Python", issuer: "Dicoding Indonesia", date: "Dec 2023" },
];
