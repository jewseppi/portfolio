# Portfolio — Claude Instructions

## Project links

Project cards are defined in `src/data/projects.ts`. Each project has a `links` array.

**Rule:** Any link with `url: "#"` is a placeholder — the `ProjectCard` component skips rendering it entirely (no dead link shown). When the user provides a real URL for a project link:

1. Update the `url` field in `src/data/projects.ts` (replace `"#"` with the full URL, e.g. `"https://xlsvc.jsilverman.ca"`)
2. The link will automatically appear on the card with `target="_blank" rel="noopener noreferrer"` (already wired in `ProjectCard`)
3. Update the test in `src/test/page.test.tsx` if a new link becomes checkable by name

**Current placeholder links (waiting on real URLs):**
- `spotify-sync` — In Progress, no public URL yet
- `browser-test-suite` — In Progress, no public URL yet
- `cicd-infrastructure` — Documented (enterprise/private), no public URL
- `test-framework-migration` — Documented (enterprise/private), no public URL

**"Documented" status** means the project is private enterprise work from a previous role with no public repo or demo. The teal "Case Study" badge on the card already communicates this. Do not add a GitHub repo link or placeholder for these unless the user explicitly provides one.
