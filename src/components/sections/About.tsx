"use client";

import SectionHeader from "@/components/ui/SectionHeader";
import Terminal from "@/components/ui/Terminal";
import type { TerminalState } from "@/types/terminal";

interface AboutProps {
  terminalState: TerminalState;
  onTerminalAction: (action: "close" | "minimize" | "expand") => void;
}

const techItems = [
  { icon: "⚛️", name: "React" },
  { icon: "🎯", name: "TypeScript" },
  { icon: "🔄", name: "GitLab CI/CD" },
  { icon: "🐳", name: "Docker" },
  { icon: "🎭", name: "Playwright" },
  { icon: "🥒", name: "Cucumber" },
  { icon: "🔺", name: "Next.js" },
  { icon: "☁️", name: "Cloud/DevOps" },
];

export default function About({ terminalState, onTerminalAction }: AboutProps) {
  return (
    <section id="about" className="page-section fade-in">
      <div className="container">
        <SectionHeader
          badge="💡 About"
          title="Frontend Architecture & Enterprise Infrastructure"
          subtitle="Architecting CI/CD pipelines, testing frameworks, and large-scale migrations"
        />

        <div
          className={`about-grid ${
            terminalState === "closed" ? "terminal-closed" : ""
          }`}
        >
          <div>
            <p className="about-text">
              Frontend Architect with 15+ years building enterprise software.
              I specialize in CI/CD pipeline design, testing infrastructure,
              and leading complex migration initiatives across large
              engineering teams.
            </p>

            <p className="about-text">
              Currently driving CI/CD and testing strategy at Enmax, building
              Playwright and Cucumber test frameworks, optimizing GitLab
              pipelines, and delivering frontend infrastructure that scales
              across enterprise organizations.
            </p>

            <div className="tech-showcase">
              {techItems.map((item) => (
                <div key={item.name} className="tech-item">
                  <span className="tech-icon">{item.icon}</span>
                  <div className="tech-name">{item.name}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="about-visual" id="terminal-container">
            <Terminal
              terminalState={terminalState}
              onTerminalAction={onTerminalAction}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
