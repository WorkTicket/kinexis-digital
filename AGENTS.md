<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Website design upgrade ground rules

- Inspect the repo before changing anything. Keep the existing stack and build tooling. Do not introduce a new framework.
- Never invent content. No made-up testimonials, client logos, statistics, awards, team members, or partner badges. Where real content is missing, insert a visible placeholder in the form `TODO(owner): ...` and list it in the phase summary.
- Preserve: URLs and slugs, `<title>` and meta descriptions, canonical tags, Open Graph and Twitter tags, structured data, the English / Español (LatAm) / Español (España) language switch, cookie consent behavior, analytics and ad tags, and the `?v=` cache-busting on assets.
- Support both light and dark logos and any existing theme behavior.
- Performance targets on mobile: LCP under 2.5 s, CLS under 0.1, INP under 200 ms. Images in WebP or AVIF with explicit width and height. No autoplay video heavier than 1.5 MB. No WebGL or heavy animation libraries.
- Accessibility: WCAG 2.2 AA contrast, visible focus states, full keyboard navigation, `prefers-reduced-motion` respected, real headings in order, alt text on meaningful images.
- Every phase ends with: build passes, lint passes, Lighthouse run (mobile and desktop) with scores noted, screenshots at 390, 768, 1280 and 1536 px wide, and a short change summary plus the list of `TODO(owner)` items.
- Strings must go through the existing translation mechanism. Do not hardcode English into templates that are localized.

Read `PLAN.md` for phase scope. Its current owner brief overrides historical suggestions: contractor offer, 3-month minimum, no unverified proof or partner claims, no numeric section ornaments, no owner placeholders in production, draft PR only, no deployment and no live form/payment interactions.
