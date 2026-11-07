# CURRENT-TASK.md

## Goal
Ship design/offer refresh + Search Console legacy redirect cleanup to production.

## Status
complete — committed, pushed, deployed

## Changed files (commit `82077439`)
- Home/pricing/web-design/industries + Spanish mirrors, TrustStrip, OpenDialog, globals CSS
- `src/lib/legacy-redirects.ts`, `next.config.ts`, `src/data/industries.ts` — legacy 301s
- `scripts/search-on-deploy.mjs` — legacy URL regression probes
- `src/i18n/chrome.ts` — money-page nav/footer links
- Docs: CONTENT.md, this file

## Completed
- Commit + push to `main` (`82077439`)
- Deployed Cloudflare Workers (Version ID: `af2f316d-9564-4296-a629-b9e5d83bbc63`)
- Post-deploy: lint/typecheck/contact OK; sitemap 102 URLs; **10/10 legacy probes 301**; IndexNow 200

## Unfinished (manual Search Console)
1. Confirm sitemap `https://www.kinexisdigital.com/sitemap.xml` on the www property
2. URL Inspection → Request indexing: `/`, `/web-design`, `/seo-services`, `/pricing`, `/contact`, `/industries`, top trades, 2–3 blog posts
3. Do not request indexing of redirected `/en/...` or `/locations/...` URLs
4. Re-check Coverage in 2–4 weeks (404 legacy should drop; impressions should move to live pages)

## Errors/blockers
none

## Next action
Run the Search Console indexing requests above.
