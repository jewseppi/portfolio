import { Project } from "@/types/project";

export const projects: Project[] = [
  {
    id: "cicd-infrastructure",
    icon: "🔄",
    title: "CI/CD Testing Infrastructure",
    description:
      "Architected and implemented comprehensive CI/CD testing pipelines using GitLab CI/CD, Docker, and automated quality gates. Reduced deployment failures and accelerated release cycles across enterprise teams.",
    highlights: [
      "GitLab CI/CD pipeline design",
      "Docker-based test environments",
      "Automated quality gates",
    ],
    techStack: ["GitLab CI/CD", "Docker", "Bash", "YAML"],
    links: [
      { label: "Documented", icon: "📄", url: "#" },
    ],
    status: "documented",
  },
  {
    id: "test-framework-migration",
    icon: "🧪",
    title: "Enterprise Test Framework Migration",
    description:
      "Led migration from legacy testing frameworks to modern Playwright and Cucumber BDD test suites across multiple enterprise applications. Established testing standards and training programs for engineering teams.",
    highlights: [
      "Playwright + Cucumber BDD",
      "Cross-team testing standards",
      "Legacy framework migration",
    ],
    techStack: ["Playwright", "Cucumber", "TypeScript", "BDD"],
    links: [
      { label: "Documented", icon: "📄", url: "#" },
    ],
    status: "documented",
  },
  {
    id: "xlsvc",
    icon: "📊",
    title: "xlsvc — Excel Processing Tool",
    description:
      "High-performance Excel file processing service built for enterprise data workflows. Handles complex spreadsheet operations, data transformations, and batch processing at scale.",
    highlights: [
      "High-performance processing",
      "Enterprise data workflows",
      "Batch operations at scale",
    ],
    techStack: ["TypeScript", "Node.js", "Excel.js", "REST API"],
    links: [
      { label: "Live Tool", icon: "🚀", url: "#" },
    ],
    status: "live",
  },
  {
    id: "spotify-sync",
    icon: "🎵",
    title: "Spotify Family Playlist Sync Tool",
    description:
      "Automated playlist synchronization tool for Spotify family accounts. Keeps shared playlists in sync across family members with configurable merge strategies and conflict resolution.",
    highlights: [
      "Spotify API integration",
      "Automated sync scheduling",
      "Conflict resolution logic",
    ],
    techStack: ["TypeScript", "Spotify API", "Node.js", "OAuth"],
    links: [
      { label: "In Progress", icon: "🔄", url: "#" },
    ],
    status: "in-progress",
  },
  {
    id: "browser-test-suite",
    icon: "🌐",
    title: "Browser Test Automation Suite",
    description:
      "Comprehensive cross-browser test automation framework supporting Chromium, Firefox, and WebKit. Includes visual regression testing, accessibility auditing, and performance benchmarking.",
    highlights: [
      "Cross-browser testing",
      "Visual regression detection",
      "Accessibility auditing",
    ],
    techStack: ["Playwright", "TypeScript", "Docker", "GitHub Actions"],
    links: [
      { label: "In Progress", icon: "🔄", url: "#" },
    ],
    status: "in-progress",
  },
];
