"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number; delay: number; duration: number }>
  >([]);
  const [terminalState, setTerminalState] = useState<
    "normal" | "expanded" | "minimized" | "closed"
  >("normal");

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
    // Create particles to match HTML version
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 6,
      duration: Math.random() * 3 + 3,
    }));
    setParticles(newParticles);

    // Intersection Observer for scroll animations
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

    // Interactive terminal functionality
    const setupEditableTerminal = () => {
      const codeContent = document.querySelector(
        ".code-content"
      ) as HTMLElement;

      if (!codeContent) return;

      const originalContent = codeContent.getAttribute("data-original") || "";

      // Handle input with visual feedback
      const handleInput = () => {
        const terminal = document.querySelector(
          ".code-terminal"
        ) as HTMLElement;
        if (!terminal) return;

        // Show visual feedback
        terminal.style.borderColor = "var(--primary)";
        terminal.style.boxShadow = "0 0 30px rgba(255, 107, 53, 0.3)";

        // Celebration for significant changes
        const currentLength = codeContent.textContent?.length || 0;
        const originalLength = originalContent.length;

        if (Math.abs(currentLength - originalLength) > 20) {
          terminal.classList.add("terminal-celebration");
          setTimeout(() => {
            terminal.classList.remove("terminal-celebration");
          }, 1000);
        }

        // Reset visual feedback after delay
        setTimeout(() => {
          terminal.style.borderColor = "rgba(255, 107, 53, 0.3)";
          terminal.style.boxShadow = "none";
        }, 2000);
      };

      // Restore original content
      const restoreOriginal = () => {
        const terminal = document.querySelector(
          ".code-terminal"
        ) as HTMLElement;
        if (!terminal) return;

        codeContent.innerHTML = `const architect = {<br/>  background: "Enterprise Software",<br/>  specializing: "AI/ML Applications",<br/>  focus: "Intelligent automation" 🧠<br/>};<br/><br/><span class="comment">// Click anywhere to edit the code</span><br/><span class="comment">// ESC to restore</span>`;
        terminal.style.borderColor = "rgba(255, 107, 53, 0.3)";
        terminal.style.boxShadow = "none";
      };

      // Event listeners
      codeContent.addEventListener("input", handleInput);
      codeContent.addEventListener("paste", () => {
        setTimeout(handleInput, 0);
      });

      // Keyboard shortcuts
      codeContent.addEventListener("keydown", (e) => {
        // ESC to restore
        if (e.key === "Escape") {
          e.preventDefault();
          restoreOriginal();
          codeContent.blur();
        }

        // Tab for indentation
        if (e.key === "Tab") {
          e.preventDefault();
          document.execCommand("insertText", false, "  ");
        }

        // Ctrl+A to select all
        if (e.key === "a" && e.ctrlKey) {
          e.preventDefault();
          const selection = window.getSelection();
          const range = document.createRange();
          range.selectNodeContents(codeContent);
          selection?.removeAllRanges();
          selection?.addRange(range);
        }
      });

      // Focus effects
      codeContent.addEventListener("focus", () => {
        const terminal = document.querySelector(
          ".code-terminal"
        ) as HTMLElement;
        if (terminal) {
          terminal.classList.add("terminal-focused");
        }
      });

      codeContent.addEventListener("blur", () => {
        const terminal = document.querySelector(
          ".code-terminal"
        ) as HTMLElement;
        if (terminal) {
          terminal.classList.remove("terminal-focused");
        }
      });

      // Handle Enter key for line breaks
      codeContent.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          document.execCommand("insertHTML", false, "<br>");
        }
      });
    };

    // Set up after a short delay to ensure DOM is ready
    setTimeout(setupEditableTerminal, 3000);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const terminal = document.getElementById("code-terminal");
    const container = document.getElementById("terminal-container");

    if (terminal) {
      terminal.setAttribute("data-state", terminalState);
    }

    if (container) {
      container.setAttribute(
        "data-terminal-expanded",
        terminalState === "expanded" ? "true" : "false"
      );
    }
  }, [terminalState]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const submitBtn = form.querySelector(".submit-btn") as HTMLButtonElement;
    const originalText = submitBtn.textContent;

    submitBtn.textContent = "✅ Message Sent!";
    submitBtn.style.background = "linear-gradient(45deg, #27ca3f, #00f5ff)";

    setTimeout(() => {
      submitBtn.textContent = originalText || "Send Message ✨";
      submitBtn.style.background =
        "linear-gradient(45deg, var(--primary), var(--accent))";
      form.reset();
    }, 3000);
  };

  return (
    <>
      {/* Animated Background */}
      <div className="bg-animation" />

      {/* Particles */}
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

      {/* Social Dock */}
      <div className="social-dock">
        <a
          href="https://github.com/jewseppi"
          target="_blank"
          rel="noopener noreferrer"
          className="social-link"
        >
          <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
        </a>
        <a
          href="https://linkedin.com/in/joseph-silverman"
          target="_blank"
          rel="noopener noreferrer"
          className="social-link"
        >
          <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </a>
        <a href="mailto:joseph@jsilverman.ca" className="social-link">
          <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h.619l9.745 7.309 9.745-7.309h.619c.904 0 1.636.732 1.636 1.636Z" />
          </svg>
        </a>
      </div>

      <main>
        {/* Hero Section */}
        <section id="home" className="hero">
          <div className="floating-shapes">
            <div className="shape triangle"></div>
            <div className="shape circle"></div>
            <div className="shape square"></div>
            <div className="shape triangle"></div>
          </div>

          <div className="hero-content">
            <div className="hero-badge">
              <span>🔒</span>
              Free SSL deployment
            </div>

            <h1 className="hero-title">Joseph Silverman</h1>

            <p className="hero-subtitle">
              Senior Software Architect • AI Applications Developer
            </p>

            <p className="hero-description">
              Bridging enterprise software with emerging AI technologies. Expert
              in full-stack development, DevOps automation, Web3, LLM
              integration, and vector search.
            </p>

            <div className="cta-container">
              <a href="#projects" className="cta-button cta-primary">
                <span>🔍</span>
                View All Projects
              </a>
              <a href="/chat" className="cta-button cta-secondary">
                <span>💬</span>
                Ask Me Anything
              </a>
            </div>

            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">15+</span>
                <span className="stat-label">Years Enterprise Dev</span>
              </div>
              <div className="stat">
                <span className="stat-number">AI/ML</span>
                <span className="stat-label">Development</span>
              </div>
              <div className="stat">
                <span className="stat-number">LLM</span>
                <span className="stat-label">Integration Expert</span>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="page-section fade-in">
          <div className="container">
            <div className="section-header">
              <div className="section-badge">💡 About</div>
              <h2 className="section-title">
                Frontend Architecture & Enterprise Solutions
              </h2>
              <p className="section-subtitle">
                Building scalable React applications and leading technical teams
                across diverse industries.
              </p>
            </div>

            <div
              className={`about-grid ${
                terminalState === "closed" ? "terminal-closed" : ""
              }`}
            >
              <div>
                <p className="about-text">
                  Senior Software Architect with over a decade of enterprise
                  development experience, now pivoting into AI application
                  development. I bring deep expertise in React, TypeScript, and
                  scalable architecture to the rapidly evolving world of LLM
                  integration and intelligent automation.
                </p>

                <p className="about-text">
                  Currently expanding into Python, LangChain, vector search, and
                  AI-driven solutions while leveraging my proven track record in
                  complex state management, real-time data systems, and
                  enterprise-grade applications that handle millions in
                  transactions.
                </p>

                <div className="tech-showcase">
                  <div className="tech-item">
                    <span className="tech-icon">🐍</span>
                    <div className="tech-name">Python</div>
                  </div>
                  <div className="tech-item">
                    <span className="tech-icon">🤖</span>
                    <div className="tech-name">LangChain</div>
                  </div>
                  <div className="tech-item">
                    <span className="tech-icon">⚛️</span>
                    <div className="tech-name">React</div>
                  </div>
                  <div className="tech-item">
                    <span className="tech-icon">🎯</span>
                    <div className="tech-name">TypeScript</div>
                  </div>
                  <div className="tech-item">
                    <span className="tech-icon">🔍</span>
                    <div className="tech-name">Vector Search</div>
                  </div>
                  <div className="tech-item">
                    <span className="tech-icon">🧠</span>
                    <div className="tech-name">LLM APIs</div>
                  </div>
                  <div className="tech-item">
                    <span className="tech-icon">🔺</span>
                    <div className="tech-name">Next.js</div>
                  </div>
                  <div className="tech-item">
                    <span className="tech-icon">☁️</span>
                    <div className="tech-name">Cloud/DevOps</div>
                  </div>
                </div>
              </div>

              <div className="about-visual" id="terminal-container">
                <div className="code-terminal" id="code-terminal">
                  <div className="terminal-header">
                    <div
                      className="terminal-dot dot-red"
                      onClick={() => handleTerminalAction("close")}
                    ></div>
                    <div
                      className="terminal-dot dot-yellow"
                      onClick={() => handleTerminalAction("minimize")}
                    ></div>
                    <div
                      className="terminal-dot dot-green"
                      onClick={() => handleTerminalAction("expand")}
                    ></div>
                  </div>
                  <div
                    className="code-content"
                    contentEditable
                    suppressContentEditableWarning
                    data-original={`const architect = {
  background: "Enterprise Software",
  specializing: "AI/ML Applications",
  focus: "Intelligent automation" 🧠
};

// Click anywhere to edit the code
// ESC to restore`}
                    dangerouslySetInnerHTML={{
                      __html: `const architect = {<br/>  background: "Enterprise Software",<br/>  specializing: "AI/ML Applications",<br/>  focus: "Intelligent automation" 🧠<br/>};<br/><br/><span class="comment">// Click anywhere to edit the code</span><br/><span class="comment">// ESC to restore</span>`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="page-section fade-in">
          <div className="container">
            <div className="section-header">
              <div className="section-badge">🚀 Current Work</div>
              <h2 className="section-title">
                AI-Driven Projects & Innovations
              </h2>
              <p className="section-subtitle">
                Bridging enterprise software expertise with cutting-edge AI
                applications and intelligent automation.
              </p>
            </div>

            <div className="projects-grid">
              <div className="project-card">
                <div className="project-icon">💬</div>
                <h3 className="project-title">
                  Multilingual Chatbot Framework
                </h3>
                <p className="project-description">
                  Building a dynamic chatbot framework with API integrations,
                  designed for future LLM support and vector search
                  capabilities. Focuses on scalable conversation management and
                  intelligent routing.
                </p>
                <div className="project-tech">
                  <span className="tech-tag">Python</span>
                  <span className="tech-tag">LangChain</span>
                  <span className="tech-tag">Vector Search</span>
                  <span className="tech-tag">API Integration</span>
                </div>
                <div className="project-links">
                  <a href="#" className="project-link">
                    <span>🔄</span>
                    In Progress
                  </a>
                  <a href="#" className="project-link">
                    <span>📁</span>
                    Coming Soon
                  </a>
                </div>
              </div>

              <div className="project-card">
                <div className="project-icon">📊</div>
                <h3 className="project-title">AI Performance Dashboard</h3>
                <p className="project-description">
                  Next.js + GraphQL dashboard with real-time data visualization
                  using D3.js for model performance tracking. Designed for
                  monitoring AI application metrics and optimization insights.
                </p>
                <div className="project-tech">
                  <span className="tech-tag">Next.js</span>
                  <span className="tech-tag">GraphQL</span>
                  <span className="tech-tag">D3.js</span>
                  <span className="tech-tag">Real-time Data</span>
                </div>
                <div className="project-links">
                  <a href="#" className="project-link">
                    <span>🔄</span>
                    Prototyping
                  </a>
                  <a href="#" className="project-link">
                    <span>📈</span>
                    Preview
                  </a>
                </div>
              </div>

              <div className="project-card">
                <div className="project-icon">🚚</div>
                <h3 className="project-title">Smart Delivery Platform</h3>
                <p className="project-description">
                  Full-stack food delivery platform with intelligent driver
                  routing and order allocation. Architecture designed for future
                  AI-powered optimization algorithms and predictive analytics.
                </p>
                <div className="project-tech">
                  <span className="tech-tag">React</span>
                  <span className="tech-tag">Node.js</span>
                  <span className="tech-tag">Optimization</span>
                  <span className="tech-tag">Algorithms</span>
                </div>
                <div className="project-links">
                  <a href="#" className="project-link">
                    <span>⚡</span>
                    Active Dev
                  </a>
                  <a href="#" className="project-link">
                    <span>🗺️</span>
                    Architecture
                  </a>
                </div>
              </div>

              <div className="project-card">
                <div className="project-icon">🔒</div>
                <h3 className="project-title">
                  WebAssembly SSL Certificate Tool
                </h3>
                <p className="project-description">
                  Browser-based SSL certificate generation using WebAssembly and
                  Rust. Demonstrates advanced cryptography and performance
                  optimization techniques.
                </p>
                <div className="project-tech">
                  <span className="tech-tag">WebAssembly</span>
                  <span className="tech-tag">Rust</span>
                  <span className="tech-tag">Cryptography</span>
                  <span className="tech-tag">Performance</span>
                </div>
                <div className="project-links">
                  <a href="#" className="project-link">
                    <span>🚀</span>
                    Live Tool
                  </a>
                  <a href="#" className="project-link">
                    <span>⚡</span>
                    Technical Deep-Dive
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="page-section contact fade-in">
          <div className="container">
            <div className="section-header">
              <div className="section-badge">💬 Get In Touch</div>
              <h2 className="section-title">
                Let&apos;s Build Something Amazing
              </h2>
              <p className="section-subtitle">
                Ready to bring your vision to life? Let&apos;s discuss how we
                can create something extraordinary together.
              </p>
            </div>

            <div className="contact-grid">
              <div className="contact-info">
                <div className="contact-item">
                  <div className="contact-icon">
                    <svg
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h.619l9.745 7.309 9.745-7.309h.619c.904 0 1.636.732 1.636 1.636Z" />
                    </svg>
                  </div>
                  <div className="contact-details">
                    <h4>Email</h4>
                    <p>joseph@jsilverman.ca</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">
                    <svg
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                  </div>
                  <div className="contact-details">
                    <h4>GitHub</h4>
                    <p>github.com/mmllc-jsilverman</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">
                    <svg
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </div>
                  <div className="contact-details">
                    <h4>LinkedIn</h4>
                    <p>Connect professionally</p>
                  </div>
                </div>
              </div>

              <div className="contact-form">
                <form onSubmit={handleFormSubmit}>
                  <div className="form-group">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Your full name"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-input"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Subject</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="What's this about?"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Message</label>
                    <textarea
                      className="form-textarea"
                      placeholder="Tell me about your project or idea..."
                      required
                    />
                  </div>

                  <button type="submit" className="submit-btn">
                    Send Message ✨
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
