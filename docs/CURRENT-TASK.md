# CURRENT-TASK.md

## Goal
Fix Ahrefs site-audit SEO issues from crawl 2026-11-01 (project 10038104); deploy to live.

## Status
deploying

## Changed files
- `src/components/JsonLd.tsx` — schema `inLanguage` uses `es` not `es-419`; FAQ URLs emit FAQPage as page type; articles use `BlogPosting` + `Article`
- `src/lib/seo.ts` — Open Graph `alternateLocale` for mirrored pages
- `src/i18n/SpanishSite.tsx` — Spanish meta descriptions lengthened to ≥120 chars
- `src/app/lp/get-a-website/page.tsx` — FAQPage schema on landing FAQ block
- `next.config.ts` — `/video-reviews` → `/reviews` (en/es/es-es)
- `scripts/search-on-deploy.mjs` — treat privacy/terms/lp as non-indexable in deploy checks
- `docs/CURRENT-TASK.md` — this file

## Completed
- Confirmed Nov 1 crawl predates `9cb86999` (htmlLang no longer emits invalid `es-419`)
- Live spot-check: lang/robots/OG/Twitter/descriptions OK on main + Spanish URLs
- Schema/FAQ/Article/redirect/meta length fixes above
- `npm run typecheck` and `npm run lint` pass

## Unfinished
- Finish Cloudflare deploy + post-deploy IndexNow
- Re-run Ahrefs site audit after deploy

## Errors/blockers
- Ahrefs MCP / API not available in this session (no per-URL issue export)

## Next action
Complete `npm run deploy`, then re-crawl in Ahrefs.

## Notes
- Intentional noindex remains on `/pay`, `/update`, `/privacy`, `/terms`, `/lp/*`, portfolio demos
- Sitemap URL count drop vs prior crawl is expected (demos removed from sitemap)
