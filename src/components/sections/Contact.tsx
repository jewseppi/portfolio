"use client";

import SectionHeader from "@/components/ui/SectionHeader";
import EmailIcon from "@/components/icons/EmailIcon";
import GitHubIcon from "@/components/icons/GitHubIcon";
import LinkedInIcon from "@/components/icons/LinkedInIcon";

export default function Contact() {
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
    <section id="contact" className="page-section contact fade-in">
      <div className="container">
        <SectionHeader
          badge="💬 Get In Touch"
          title="Let&apos;s Build Something Amazing"
          subtitle="Ready to bring your vision to life? Let&apos;s discuss how we can create something extraordinary together."
        />

        <div className="contact-grid">
          <div className="contact-info">
            <div className="contact-item">
              <div className="contact-icon">
                <EmailIcon />
              </div>
              <div className="contact-details">
                <h4>Email</h4>
                <p>joseph@jsilverman.ca</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">
                <GitHubIcon />
              </div>
              <div className="contact-details">
                <h4>GitHub</h4>
                <p>github.com/jewseppi</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">
                <LinkedInIcon />
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
  );
}
