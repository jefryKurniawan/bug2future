// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jefry Kurniawan | QA Engineer - Bug to Future",
  description: "QA Engineer & Automation Tester specializing in Playwright, Cypress, k6, and CI/CD pipelines. Based in Magetan, Indonesia.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}