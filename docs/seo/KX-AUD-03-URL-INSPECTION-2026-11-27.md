# KX-AUD-03 — Priority URL inspection (2026-11-27)

Live GETs against `www.kinexisdigital.com` (no GSC API in this pass). Index verdicts remain Search Console outcome gates.

| URL | HTTP | Declared canonical | Notes |
|-----|------|--------------------|-------|
| `/` | 200 | self | Priority hub |
| `/web-design` | 200 | self | Design intent owner |
| `/pricing` | 200 | self | Cost intent owner; anchors `#website` `#lead-system` `#plus` `#own-it` |
| `/seo-services` | 200 | self | |
| `/industries/plumbing` | 200 | self | Indexed priority trade |
| `/industries/landscaping` | 200 | self | Indexed priority trade |
| `/blog/plumber-website-cost` | 200 | self | |
| `/blog/landscaping-website-cost` | 200 | self | |
| `/blog/roofing-website-cost` | 200 | self | Experiment URL |
| `/case-studies/preferred-plumbing` | 200 | self | |
| `/case-studies/a1-property-services` | 200 | self | |
| `/es/industries/plumbing` | 200 | self | |
| `/es/blog/pagina-web-para-plomeros` | 200 | self | Spanish buyer guide |

## October robots examples

| URL | HTTP | robots.txt |
|-----|------|------------|
| `/es/blog/make-your-website-mobile-ready` | 200 | `Allow: /` (no code change) |
| `/es/industries/remodeling` | 200 | same |
| `/es/strategy-call` | 200 | same |

No current live evidence of a robots/routing fault on these three paths.

## Repo hygiene in this ticket

- Explicit `/es/blog/…` targets for Spanish-only guide and review posts (avoid EN redirect hops).
- Per-page `updatedAt` on home, web-design, pricing, seo-services; industry + case-study lastmod fields wired in `sitemap.ts`.
- Apex/www and legacy locale redirects left intact. Connect repo not touched.

## Follow-up (owner / GSC)

Pull the domain-wide 5xx example, seven canonical disagreements, and any strategic 404/redirect with backlinks from Search Console when available. Add a single 301 only when obsolete→equivalent; otherwise keep 404.
