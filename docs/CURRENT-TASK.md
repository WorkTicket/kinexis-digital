# CURRENT-TASK.md

## Goal
Fix Ahrefs site-audit SEO issues from crawl 2026-11-01 (project 10038104); deploy to live.

## Status
complete

## Changed files
- `src/components/JsonLd.tsx` — schema `inLanguage` uses `es` not `es-419`; FAQ URLs emit FAQPage as page type; articles use `BlogPosting` + `Article`
- `src/lib/seo.ts` — Open Graph `alternateLocale` for mirrored pages
- `src/i18n/SpanishSite.tsx` — Spanish meta descriptions lengthened to ≥120 chars
- `src/app/lp/get-a-website/page.tsx` — FAQPage schema on landing FAQ block
- `next.config.ts` — `/video-reviews` → `/reviews` (en/es/es-es)
- `scripts/search-on-deploy.mjs` — treat privacy/terms/lp as non-indexable in deploy checks
- `docs/CURRENT-TASK.md` — this file

## Completed
- Schema/FAQ/Article/redirect/meta length fixes
- Committed `0a5ab775` and pushed to `main`
- Deployed to Cloudflare Workers (live: kinexisdigital.com / www.kinexisdigital.com)
- Post-deploy checks passed (SEO, sitemap 102 URLs, IndexNow 200)
- Live verified: `/es` schema uses `es`, `/video-reviews` → `/reviews`, FAQPage + Article present
- Version ID: e9c9f8d4-70f2-4e5c-bc7c-b51e19091931

## Unfinished
- Re-run Ahrefs site audit so the report clears stale Nov 1 findings

## Errors/blockers
none

## Next action
Trigger a new Ahrefs crawl and confirm Error-severity issues drop.

## Notes
- Intentional noindex remains on `/pay`, `/update`, `/privacy`, `/terms`, `/lp/*`, portfolio demos
