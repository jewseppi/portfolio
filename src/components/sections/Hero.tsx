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

        <StatBar />
      </div>
    </section>
  );
}
