# CURRENT-TASK.md

## Goal
P0 SEO hotfix after preview env bled into production.

## Status
**Fixed on live.** Indexing restored; case studies 200; IndexNow accepted 131 URLs.

## Root cause
`deploy:preview` left `NEXT_PUBLIC_SITE_URL=https://preview.kinexisdigital.com` in the shell. Next does not override existing env, so production baked noindex + empty sitemap + preview OG.

## Guardrails now
- `npm run deploy` → `scripts/deploy-production.mjs` (forces www SITE_URL, clears IS_PREVIEW, SEARCH_NOTIFY=1)
- Preflight fails on mixed preview/production flags
- EN catch-all `/case-studies/:path*` redirect removed

## Live verification
- robots.txt: Allow `/`, Disallow `/api/` only
- sitemap: 131 production URLs
- meta robots: `index, follow` on home/pricing/portfolio/es/case studies
- og:url / canonical: www.kinexisdigital.com (no preview host)
- case studies: all three → 200 with unique titles
- pricing: no raw `text-back**`
- IndexNow: 131 URLs accepted (200)

## Next action
Optional: sandbox PayPal capture test. Request Search Console re-inspection if Google still shows the brief noindex window.
