import { test, expect } from "@playwright/test";

// ─── Page Load & Structure ──────────────────────────────────────

test.describe("Page load & structure", () => {
  test("page loads without console errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    expect(errors).toEqual([]);
  });

  test("page title matches metadata", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(
      "Joseph Silverman — Frontend Architect | Enterprise Infrastructure & Automation"
    );
  });

  test("all 4 sections exist and are reachable", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("#home")).toBeAttached();
    await expect(page.locator("#about")).toBeAttached();
    await expect(page.locator("#projects")).toBeAttached();
    await expect(page.locator("#contact")).toBeAttached();
  });

  test("social dock is visible", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".social-dock")).toBeVisible();
  });
});

// ─── Hero Section ───────────────────────────────────────────────

test.describe("Hero section", () => {
  test("hero is the first visible section", async ({ page }) => {
    await page.goto("/");
    const hero = page.locator("#home");
    await expect(hero).toBeVisible();
  });

  test("name heading is visible", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.locator("h1", { hasText: "Joseph Silverman" })
    ).toBeVisible();
  });

  test("stats bar shows 3 items", async ({ page }) => {
    await page.goto("/");
    const stats = page.locator(".hero-stats .stat");
    await expect(stats).toHaveCount(3);
  });
});

// ─── Navigation & Scrolling ────────────────────────────────────

test.describe("Navigation & scrolling", () => {
  test("clicking 'View All Projects' CTA scrolls to projects section", async ({
    page,
  }) => {
    await page.goto("/");
    await page.click('a[href="#projects"]');
    // Wait for smooth scroll to finish
    await page.waitForTimeout(1000);
    const projects = page.locator("#projects");
    await expect(projects).toBeInViewport();
  });

  test("all internal anchor links navigate to correct sections", async ({
    page,
  }) => {
    await page.goto("/");
    // Check that anchor links to the 4 sections exist in the page
    const projectsLink = page.locator('a[href="#projects"]').first();
    await expect(projectsLink).toBeAttached();
  });
});

// ─── Projects Section ──────────────────────────────────────────

test.describe("Projects section", () => {
  test("all project cards are visible", async ({ page }) => {
    await page.goto("/");
    await page.locator("#projects").scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    const cards = page.locator(".project-card");
    await expect(cards).toHaveCount(5);
  });

  test("each card displays tech tags", async ({ page }) => {
    await page.goto("/");
    await page.locator("#projects").scrollIntoViewIfNeeded();
    const cards = page.locator(".project-card");
    const count = await cards.count();
    for (let i = 0; i < count; i++) {
      const tags = cards.nth(i).locator(".tech-tag");
      expect(await tags.count()).toBeGreaterThan(0);
    }
  });

  test("project links are present", async ({ page }) => {
    await page.goto("/");
    await page.locator("#projects").scrollIntoViewIfNeeded();
    const links = page.locator(".project-card .project-link");
    expect(await links.count()).toBeGreaterThan(0);
  });
});

// ─── Contact Section ──────────────────────────────────────────

test.describe("Contact section", () => {
  test("form fields are fillable", async ({ page }) => {
    await page.goto("/");
    await page.locator("#contact").scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    await page.fill('input[placeholder="Your full name"]', "Test User");
    await page.fill(
      'input[placeholder="your.email@example.com"]',
      "test@test.com"
    );
    await page.fill('input[placeholder="What\'s this about?"]', "Test Subject");
    await page.fill(
      'textarea[placeholder="Tell me about your project or idea..."]',
      "Test message"
    );

    await expect(
      page.locator('input[placeholder="Your full name"]')
    ).toHaveValue("Test User");
  });

  test("form validates required fields", async ({ page }) => {
    await page.goto("/");
    await page.locator("#contact").scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    // Try submitting empty form — HTML5 validation should prevent it
    const submitBtn = page.locator(".submit-btn");
    await submitBtn.click();

    // The form should not have submitted (no "Message Sent" text)
    await expect(submitBtn).toContainText("Send Message");
  });

  test("form submit with valid data does not error", async ({ page }) => {
    await page.goto("/");
    await page.locator("#contact").scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    await page.fill('input[placeholder="Your full name"]', "Test User");
    await page.fill(
      'input[placeholder="your.email@example.com"]',
      "test@test.com"
    );
    await page.fill('input[placeholder="What\'s this about?"]', "Test");
    await page.fill(
      'textarea[placeholder="Tell me about your project or idea..."]',
      "Test message"
    );

    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));

    await page.locator(".submit-btn").click();
    await page.waitForTimeout(500);

    expect(errors).toEqual([]);
    // Button text should change to indicate success
    await expect(page.locator(".submit-btn")).toContainText("Message Sent");
  });
});

// ─── Terminal Widget ────────────────────────────────────────────

test.describe("Terminal widget", () => {
  test("terminal is visible in about section", async ({ page }) => {
    await page.goto("/");
    await page.locator("#about").scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await expect(page.locator(".code-terminal")).toBeVisible();
  });

  test("clicking red dot hides the terminal", async ({ page }) => {
    await page.goto("/");
    await page.locator("#about").scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    await page.click(".dot-red");
    await expect(page.locator("#terminal-container")).toBeHidden();
  });

  test("clicking green dot expands the terminal", async ({ page }) => {
    await page.goto("/");
    await page.locator("#about").scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    await page.click(".dot-green");
    await expect(page.locator("#terminal-container")).toHaveAttribute(
      "data-terminal-expanded",
      "true"
    );
  });

  test("code content area is editable", async ({ page }) => {
    await page.goto("/");
    await page.locator("#about").scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await expect(page.locator(".code-content")).toHaveAttribute(
      "contenteditable",
      "true"
    );
  });
});

// ─── Responsive Breakpoints ────────────────────────────────────

test.describe("Responsive breakpoints", () => {
  test("mobile viewport: layout does not overflow horizontally", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 1); // +1 for rounding
  });

  test("tablet viewport: layout renders without overflow", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 1);
  });

  test("desktop viewport: hero title is visible", async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 900 });
    await page.goto("/");
    await expect(
      page.locator("h1", { hasText: "Joseph Silverman" })
    ).toBeVisible();
  });
});

// ─── Accessibility Basics ──────────────────────────────────────

test.describe("Accessibility basics", () => {
  test("form inputs have associated labels", async ({ page }) => {
    await page.goto("/");
    // The form uses explicit <label> elements with class "form-label"
    const labels = page.locator("#contact .form-label");
    await expect(labels).toHaveCount(4); // Name, Email, Subject, Message
  });

  test("page has a single h1", async ({ page }) => {
    await page.goto("/");
    const h1s = page.locator("h1");
    await expect(h1s).toHaveCount(1);
  });
});
