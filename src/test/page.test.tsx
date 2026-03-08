import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "@/app/page";

// Mock IntersectionObserver
class MockIntersectionObserver {
  observe = vi.fn();
  disconnect = vi.fn();
  unobserve = vi.fn();
  constructor(public callback: IntersectionObserverCallback, public options?: IntersectionObserverInit) {}
  get root() { return null; }
  get rootMargin() { return ""; }
  get thresholds() { return []; }
  takeRecords() { return []; }
}
vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);

describe("Home Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ─── Hero Section ───────────────────────────────────────────────

  describe("Hero Section", () => {
    it("renders 'Joseph Silverman' heading", () => {
      render(<Home />);
      expect(
        screen.getByRole("heading", { name: /joseph silverman/i })
      ).toBeInTheDocument();
    });

    it("renders subtitle text", () => {
      render(<Home />);
      expect(
        screen.getByText(/Frontend Architect • Enterprise Infrastructure & Automation/i)
      ).toBeInTheDocument();
    });

    it("renders hero description", () => {
      render(<Home />);
      expect(
        screen.getByText(/Currently leading CI\/CD and testing initiatives at Enmax/i)
      ).toBeInTheDocument();
    });

    it("renders 'View Projects' CTA with correct href", () => {
      render(<Home />);
      const cta = screen.getByRole("link", { name: /view projects/i });
      expect(cta).toBeInTheDocument();
      expect(cta).toHaveAttribute("href", "#projects");
    });

    it("renders 'Get In Touch' CTA with correct href", () => {
      render(<Home />);
      const cta = screen.getByRole("link", { name: /get in touch/i });
      expect(cta).toBeInTheDocument();
      expect(cta).toHaveAttribute("href", "#contact");
    });

    it("renders all 3 stat items with correct labels", () => {
      render(<Home />);
      expect(screen.getByText("15+")).toBeInTheDocument();
      expect(screen.getByText("Years Enterprise Dev")).toBeInTheDocument();
      expect(screen.getByText("CI/CD")).toBeInTheDocument();
      expect(screen.getByText("& DevOps")).toBeInTheDocument();
      expect(screen.getByText("Testing")).toBeInTheDocument();
      expect(screen.getByText("Infrastructure")).toBeInTheDocument();
    });

    it("renders hero badge", () => {
      render(<Home />);
      expect(screen.getByText(/Available for contract work/i)).toBeInTheDocument();
    });
  });

  // ─── About Section ──────────────────────────────────────────────

  describe("About Section", () => {
    it("renders section title", () => {
      render(<Home />);
      expect(
        screen.getByRole("heading", {
          name: /Frontend Architecture & Enterprise Infrastructure/i,
        })
      ).toBeInTheDocument();
    });

    it("renders about text paragraphs", () => {
      render(<Home />);
      expect(
        screen.getByText(/Frontend Architect with 15\+ years building enterprise software/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Currently driving CI\/CD and testing strategy at Enmax/i)
      ).toBeInTheDocument();
    });

    it("renders all tech showcase items", () => {
      render(<Home />);
      const aboutSection = document.getElementById("about")!;
      const techNames = [
        "React",
        "TypeScript",
        "GitLab CI/CD",
        "Docker",
        "Playwright",
        "Cucumber",
        "Next.js",
        "Cloud/DevOps",
      ];
      for (const name of techNames) {
        expect(
          within(aboutSection).getByText(name)
        ).toBeInTheDocument();
      }
    });

    it("renders terminal with code content", () => {
      render(<Home />);
      const codeContent = document.querySelector(".code-content");
      expect(codeContent).toBeInTheDocument();
      expect(codeContent).toHaveAttribute("contenteditable", "true");
    });

    it("renders terminal dot buttons (red, yellow, green)", () => {
      render(<Home />);
      const dots = document.querySelectorAll(".terminal-dot");
      expect(dots).toHaveLength(3);
      expect(document.querySelector(".dot-red")).toBeInTheDocument();
      expect(document.querySelector(".dot-yellow")).toBeInTheDocument();
      expect(document.querySelector(".dot-green")).toBeInTheDocument();
    });
  });

  // ─── Projects Section ───────────────────────────────────────────

  describe("Projects Section", () => {
    it("renders section title", () => {
      render(<Home />);
      expect(
        screen.getByRole("heading", {
          name: /Enterprise Projects & Tools/i,
        })
      ).toBeInTheDocument();
    });

    it("renders correct number of project cards (5)", () => {
      render(<Home />);
      const cards = document.querySelectorAll(".project-card");
      expect(cards).toHaveLength(5);
    });

    it("renders specific project titles", () => {
      render(<Home />);
      expect(
        screen.getByRole("heading", { name: /CI\/CD Testing Infrastructure/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { name: /Enterprise Test Framework Migration/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { name: /xlsvc — Excel Processing Tool/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", {
          name: /Spotify Family Playlist Sync Tool/i,
        })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", {
          name: /Browser Test Automation Suite/i,
        })
      ).toBeInTheDocument();
    });

    it("each card has a description", () => {
      render(<Home />);
      const descriptions = document.querySelectorAll(".project-description");
      expect(descriptions).toHaveLength(5);
      for (const desc of descriptions) {
        expect(desc.textContent?.length).toBeGreaterThan(0);
      }
    });

    it("each card has tech tags", () => {
      render(<Home />);
      const cards = document.querySelectorAll(".project-card");
      for (const card of cards) {
        const tags = card.querySelectorAll(".tech-tag");
        expect(tags.length).toBeGreaterThan(0);
      }
    });

    it("each card has project links", () => {
      render(<Home />);
      const cards = document.querySelectorAll(".project-card");
      for (const card of cards) {
        const links = card.querySelectorAll(".project-link");
        expect(links.length).toBeGreaterThan(0);
      }
    });
  });

  // ─── Contact Section ────────────────────────────────────────────

  describe("Contact Section", () => {
    it("renders section title", () => {
      render(<Home />);
      expect(
        screen.getByRole("heading", {
          name: /Let's Work Together/i,
        })
      ).toBeInTheDocument();
    });

    it("form has name, email, subject, message fields", () => {
      render(<Home />);
      expect(screen.getByPlaceholderText("Your full name")).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText("your.email@example.com")
      ).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText("What's this about?")
      ).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText("Tell me about your project or idea...")
      ).toBeInTheDocument();
    });

    it("all form fields are required", () => {
      render(<Home />);
      expect(screen.getByPlaceholderText("Your full name")).toBeRequired();
      expect(
        screen.getByPlaceholderText("your.email@example.com")
      ).toBeRequired();
      expect(screen.getByPlaceholderText("What's this about?")).toBeRequired();
      expect(
        screen.getByPlaceholderText("Tell me about your project or idea...")
      ).toBeRequired();
    });

    it("submit button is present", () => {
      render(<Home />);
      expect(
        screen.getByRole("button", { name: /send message/i })
      ).toBeInTheDocument();
    });

    it("renders contact info items (Email, GitHub, LinkedIn)", () => {
      render(<Home />);
      expect(screen.getByText("joseph@jsilverman.ca")).toBeInTheDocument();
      expect(screen.getByText("github.com/jewseppi")).toBeInTheDocument();
      expect(screen.getByText("Connect professionally")).toBeInTheDocument();
    });
  });

  // ─── Social Dock ────────────────────────────────────────────────

  describe("Social Dock", () => {
    it("GitHub link renders with correct href", () => {
      render(<Home />);
      const ghLinks = screen.getAllByRole("link").filter(
        (link) => link.getAttribute("href") === "https://github.com/jewseppi"
      );
      expect(ghLinks.length).toBeGreaterThan(0);
    });

    it("LinkedIn link renders with correct href", () => {
      render(<Home />);
      const liLinks = screen.getAllByRole("link").filter(
        (link) =>
          link.getAttribute("href") ===
          "https://www.linkedin.com/in/joseph-silverman/"
      );
      expect(liLinks.length).toBeGreaterThan(0);
    });

    it("Email link renders with mailto: href", () => {
      render(<Home />);
      const emailLinks = screen.getAllByRole("link").filter(
        (link) =>
          link.getAttribute("href") === "mailto:joseph@jsilverman.ca"
      );
      expect(emailLinks.length).toBeGreaterThan(0);
    });
  });

  // ─── Interactions ───────────────────────────────────────────────

  describe("Interactions", () => {
    it("terminal close button hides terminal", async () => {
      render(<Home />);
      const closeBtn = document.querySelector(".dot-red") as HTMLElement;
      expect(closeBtn).toBeInTheDocument();

      await userEvent.click(closeBtn);

      const container = document.getElementById("terminal-container");
      expect(container?.style.display).toBe("none");
    });

    it("terminal minimize button toggles minimized state", async () => {
      render(<Home />);
      const minBtn = document.querySelector(".dot-yellow") as HTMLElement;
      expect(minBtn).toBeInTheDocument();

      await userEvent.click(minBtn);

      const container = document.getElementById("terminal-container");
      expect(container?.getAttribute("data-terminal-expanded")).toBe("false");
    });

    it("terminal expand button toggles expanded state", async () => {
      render(<Home />);
      const expandBtn = document.querySelector(".dot-green") as HTMLElement;
      expect(expandBtn).toBeInTheDocument();

      await userEvent.click(expandBtn);

      const container = document.getElementById("terminal-container");
      expect(container?.getAttribute("data-terminal-expanded")).toBe("true");
    });

    it("contact form submit handler fires", async () => {
      render(<Home />);
      const form = document.querySelector("form") as HTMLFormElement;
      expect(form).toBeInTheDocument();

      const nameInput = screen.getByPlaceholderText("Your full name");
      const emailInput = screen.getByPlaceholderText("your.email@example.com");
      const subjectInput = screen.getByPlaceholderText("What's this about?");
      const messageInput = screen.getByPlaceholderText(
        "Tell me about your project or idea..."
      );

      await userEvent.type(nameInput, "Test User");
      await userEvent.type(emailInput, "test@example.com");
      await userEvent.type(subjectInput, "Test Subject");
      await userEvent.type(messageInput, "Test message body");

      const submitBtn = screen.getByRole("button", { name: /send message/i });
      await userEvent.click(submitBtn);

      expect(submitBtn.textContent).toContain("Message Sent");
    });

    it("navigation anchor links are present", () => {
      render(<Home />);
      expect(document.getElementById("home")).toBeInTheDocument();
      expect(document.getElementById("about")).toBeInTheDocument();
      expect(document.getElementById("projects")).toBeInTheDocument();
      expect(document.getElementById("contact")).toBeInTheDocument();
    });
  });
});
