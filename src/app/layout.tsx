import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Joseph Silverman - Senior Software Architect & AI Developer",
  description:
    "Senior Software Architect bridging enterprise software with emerging AI technologies. Expert in full-stack development, DevOps automation, Web3, LLM integration, and vector search.",
  keywords: [
    "Joseph Silverman",
    "Software Architect",
    "React Developer",
    "AI Developer",
    "Full Stack Developer",
    "TypeScript",
    "Next.js",
    "LLM Integration",
    "Vector Search",
    "DevOps",
    "Web3",
    "Enterprise Software",
  ],
  authors: [{ name: "Joseph Silverman" }],
  creator: "Joseph Silverman",
  publisher: "Joseph Silverman",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://jsilverman.ca",
    title: "Joseph Silverman - Senior Software Architect & AI Developer",
    description:
      "Senior Software Architect bridging enterprise software with emerging AI technologies. Expert in full-stack development, DevOps automation, Web3, LLM integration, and vector search.",
    siteName: "Joseph Silverman Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Joseph Silverman - Senior Software Architect & AI Developer",
    description:
      "Senior Software Architect bridging enterprise software with emerging AI technologies.",
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
    <html lang="en" className="scroll-smooth">
      <body>{children}</body>
    </html>
  );
}
