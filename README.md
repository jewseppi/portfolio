# jsilverman.ca

Portfolio site for Joseph Silverman — Frontend Architect & Enterprise Infrastructure.

## Tech Stack

- **Framework:** Next.js 14 (static export)
- **Language:** TypeScript
- **Styling:** CSS custom properties (no framework)
- **Testing:** Vitest + React Testing Library, Playwright (cross-browser E2E)
- **CI:** GitHub Actions (lint, type-check, test, build, e2e)
- **Preview:** Cloudflare Pages (PR preview deployments)
- **Hosting:** GoDaddy (deployed via SSH + rsync)

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command              | Description                              |
| -------------------- | ---------------------------------------- |
| `npm run dev`        | Start dev server                         |
| `npm run build`      | Production build (static export to /out) |
| `npm run lint`       | Run ESLint                               |
| `npm run type-check` | TypeScript type checking                 |
| `npm test`           | Run unit tests (Vitest)                  |
| `npm run test:watch` | Run unit tests in watch mode             |
| `npm run test:coverage` | Run tests with coverage report        |
| `npm run test:e2e`   | Run E2E tests (Playwright)              |
| `npm run test:e2e:ui`| Run E2E tests with Playwright UI        |

## Project Structure

```
src/
  app/              # Next.js app router (layout, page, globals)
  components/
    icons/          # SVG icon components
    layout/         # Layout components (SocialDock)
    sections/       # Page sections (Hero, About, Projects, Contact)
    ui/             # Reusable UI (ProjectCard, TechTag, Terminal, StatBar)
  data/             # Project data
  types/            # TypeScript types
  test/             # Test setup and unit tests
e2e/                # Playwright E2E tests
.github/
  workflows/        # CI + deploy workflows
```

## Workflow

1. Create a feature branch
2. Open a PR against `main`
3. CI runs automatically (lint, type-check, test, build, e2e)
4. Cloudflare Pages deploys a preview
5. Merge to `main` triggers production deploy to GoDaddy
