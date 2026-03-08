"use client";

import SectionHeader from "@/components/ui/SectionHeader";
import Terminal from "@/components/ui/Terminal";
import type { TerminalState } from "@/types/terminal";

interface AboutProps {
  terminalState: TerminalState;
  onTerminalAction: (action: "close" | "minimize" | "expand") => void;
}

const techItems = [
  { icon: "🐍", name: "Python" },
  { icon: "🤖", name: "LangChain" },
  { icon: "⚛️", name: "React" },
  { icon: "🎯", name: "TypeScript" },
  { icon: "🔍", name: "Vector Search" },
  { icon: "🧠", name: "LLM APIs" },
  { icon: "🔺", name: "Next.js" },
  { icon: "☁️", name: "Cloud/DevOps" },
];

export default function About({ terminalState, onTerminalAction }: AboutProps) {
  return (
    <section id="about" className="page-section fade-in">
      <div className="container">
        <SectionHeader
          badge="💡 About"
          title="Systems Architecture & Enterprise Solutions"
          subtitle="Designing enterprise-grade systems and leading digital transformation initiatives."
        />

        <div
          className={`about-grid ${
            terminalState === "closed" ? "terminal-closed" : ""
          }`}
        >
          <div>
            <p className="about-text">
              Systems Architect with 15+ years building enterprise software.
              Currently expanding into AI and machine learning applications.
              I design scalable systems that solve real business problems.
            </p>

            <p className="about-text">
              Currently learning Python, LangChain, and vector search while
              applying my experience in system design, DevOps, and building
              applications that handle complex business requirements.
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
