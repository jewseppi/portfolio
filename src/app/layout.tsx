import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "Joseph Silverman — Frontend Architect | Enterprise Infrastructure & Automation",
  description:
    "Frontend Architect specializing in CI/CD pipelines, testing infrastructure, and enterprise migrations. 15+ years building scalable systems with React, TypeScript, GitLab CI/CD, Docker, Playwright, and Cucumber.",
  keywords: [
    "Joseph Silverman",
    "Frontend Architect",
    "CI/CD",
    "GitLab",
    "Docker",
    "Playwright",
    "Cucumber",
    "Enterprise Migrations",
    "Testing Infrastructure",
    "React",
    "TypeScript",
    "DevOps",
    "Enterprise Software",
  ],
  authors: [{ name: "Joseph Silverman" }],
  creator: "Joseph Silverman",
  publisher: "Joseph Silverman",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://jsilverman.ca",
    title:
      "Joseph Silverman — Frontend Architect | Enterprise Infrastructure & Automation",
    description:
      "Frontend Architect specializing in CI/CD pipelines, testing infrastructure, and enterprise migrations. 15+ years building scalable systems.",
    siteName: "Joseph Silverman Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Joseph Silverman — Frontend Architect | Enterprise Infrastructure & Automation",
    description:
      "Frontend Architect specializing in CI/CD pipelines, testing infrastructure, and enterprise migrations.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`scroll-smooth ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
