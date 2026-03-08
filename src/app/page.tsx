"use client";

import { useState, useEffect } from "react";
import SocialDock from "@/components/layout/SocialDock";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import type { TerminalState } from "@/types/terminal";

export default function Home() {
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number; delay: number; duration: number }>
  >([]);
  const [terminalState, setTerminalState] = useState<TerminalState>("normal");

  const handleTerminalAction = (action: "close" | "minimize" | "expand") => {
    const container = document.getElementById("terminal-container");

    switch (action) {
      case "close":
        setTerminalState("closed");
        if (container) {
          container.style.display = "none";
        }
        break;
      case "minimize":
        setTerminalState((prev) =>
          prev === "minimized" ? "normal" : "minimized"
        );
        if (container) {
          container.setAttribute("data-terminal-expanded", "false");
        }
        break;
      case "expand":
        const newState = terminalState === "expanded" ? "normal" : "expanded";
        setTerminalState(newState);
        if (container) {
          container.setAttribute(
            "data-terminal-expanded",
            newState === "expanded" ? "true" : "false"
          );
        }
        break;
    }
  };

  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 6,
      duration: Math.random() * 3 + 3,
    }));
    setParticles(newParticles);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".fade-in").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="bg-animation" />

      <div className="particles">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="particle"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
            }}
          />
        ))}
      </div>

      <SocialDock />

      <main>
        <Hero />
        <About
          terminalState={terminalState}
          onTerminalAction={handleTerminalAction}
        />
        <Projects />
        <Contact />
      </main>
    </>
  );
}
