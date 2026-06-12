import StatBar from "@/components/ui/StatBar";

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-glow" aria-hidden="true" />
      <div className="hero-grid" aria-hidden="true" />

      <div className="hero-content">
        <div className="hero-badge hero-entrance">
          <span className="badge-dot" aria-hidden="true" />
          Available for contract work
        </div>

        <h1 className="hero-title hero-entrance hero-entrance-delay-1">
          Joseph Silverman
        </h1>

        <p className="hero-subtitle hero-entrance hero-entrance-delay-2">
          Frontend Architect • Enterprise Infrastructure &amp; Automation
        </p>

        <p className="hero-description hero-entrance hero-entrance-delay-3">
          Architecting testing infrastructure with CI/CD automation and
          MR-triggered pipelines. Track record of leading complex migrations,
          building test frameworks, and delivering enterprise-grade frontend
          systems.
        </p>

        <div className="cta-container hero-entrance hero-entrance-delay-4">
          <a href="#projects" className="cta-button cta-primary">
            View Projects
            <span className="cta-arrow" aria-hidden="true">
              →
            </span>
          </a>
          <a href="#contact" className="cta-button cta-secondary">
            Get In Touch
          </a>
        </div>

        <div className="hero-entrance hero-entrance-delay-5">
          <StatBar />
        </div>
      </div>

      <a href="#about" className="scroll-indicator" aria-label="Scroll to about section">
        <span className="scroll-indicator-mouse" aria-hidden="true">
          <span className="scroll-indicator-wheel" />
        </span>
      </a>
    </section>
  );
}
