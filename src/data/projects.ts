import { Project } from "@/types/project";

export const projects: Project[] = [
  {
    id: "chatbot",
    icon: "💬",
    title: "Multilingual Chatbot Framework",
    description:
      "Building a dynamic chatbot framework with API integrations, designed for future LLM support and vector search capabilities. Focuses on scalable conversation management and intelligent routing.",
    techStack: ["Python", "LangChain", "Vector Search", "API Integration"],
    links: [
      { label: "In Progress", icon: "🔄", url: "#" },
      { label: "Coming Soon", icon: "📁", url: "#" },
    ],
  },
  {
    id: "dashboard",
    icon: "📊",
    title: "AI Performance Dashboard",
    description:
      "Next.js + GraphQL dashboard with real-time data visualization using D3.js for model performance tracking. Designed for monitoring AI application metrics and optimization insights.",
    techStack: ["Next.js", "GraphQL", "D3.js", "Real-time Data"],
    links: [
      { label: "Prototyping", icon: "🔄", url: "#" },
      { label: "Preview", icon: "📈", url: "#" },
    ],
  },
  {
    id: "delivery",
    icon: "🚚",
    title: "Smart Delivery Platform",
    description:
      "Full-stack food delivery platform with intelligent driver routing and order allocation. Architecture designed for future AI-powered optimization algorithms and predictive analytics.",
    techStack: ["React", "Node.js", "Optimization", "Algorithms"],
    links: [
      { label: "Active Dev", icon: "⚡", url: "#" },
      { label: "Architecture", icon: "🗺️", url: "#" },
    ],
  },
  {
    id: "ssl-tool",
    icon: "🔒",
    title: "WebAssembly SSL Certificate Tool",
    description:
      "Browser-based SSL certificate generation using WebAssembly and Rust. Demonstrates advanced cryptography and performance optimization techniques.",
    techStack: ["WebAssembly", "Rust", "Cryptography", "Performance"],
    links: [
      { label: "Live Tool", icon: "🚀", url: "#" },
      { label: "Technical Deep-Dive", icon: "⚡", url: "#" },
    ],
  },
];
