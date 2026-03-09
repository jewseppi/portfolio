import StatBar from "@/components/ui/StatBar";

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="floating-shapes">
        <div className="shape triangle"></div>
        <div className="shape circle"></div>
        <div className="shape square"></div>
        <div className="shape triangle"></div>
      </div>

      <div className="hero-content">
        <div className="hero-badge">
          <span>🚀</span>
          Available for contract work
        </div>

        <h1 className="hero-title">Joseph Silverman</h1>

        <p className="hero-subtitle">
          Frontend Architect • Enterprise Infrastructure & Automation
        </p>

        <p className="hero-description">
          Architecting testing infrastructure with CI/CD automation and
          MR-triggered pipelines. Track record of leading complex migrations,
          building test frameworks, and delivering enterprise-grade frontend
          systems.
        </p>

        <div className="cta-container">
          <a href="#projects" className="cta-button cta-primary">
            <span>🔍</span>
            View Projects
          </a>
          <a href="#contact" className="cta-button cta-secondary">
            <span>💬</span>
            Get In Touch
          </a>
        </div>

        <StatBar />
      </div>
    </section>
  );
}
