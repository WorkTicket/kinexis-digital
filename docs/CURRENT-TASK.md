# CURRENT-TASK.md

## Goal
P0 SEO hotfix: undo preview env bleed on production (noindex / empty sitemap / preview OG).

## Status
**Mostly fixed on live.** Redeploy with production SITE_URL completed (Worker `0287b399…`). Follow-up deploy needed for raw `**` text-back label cleanup + IndexNow notify.

## Root cause
Shell still had `NEXT_PUBLIC_SITE_URL=https://preview.kinexisdigital.com` from `deploy:preview`. Next does not override existing env, so production build baked preview noindex + empty sitemap + preview OG URLs.

## Fixes
- `scripts/deploy-production.mjs` — forces `NEXT_PUBLIC_SITE_URL=https://www.kinexisdigital.com`, clears `IS_PREVIEW`, always `SEARCH_NOTIFY=1`
- `npm run deploy` → production wrapper (not raw opennext)
- Preflight refuses mixed preview/production flags
- Removed EN catch-all `/case-studies/:path*` → `/portfolio` redirect

## Verified live (post-hotfix)
- robots.txt: `Allow: /`, Disallow `/api/` only, sitemap points at www
- sitemap: 131 URLs, production hosts
- homepage: `index, follow`, canonical + og:url on www, no preview host
- case studies preferred-plumbing / a1-property-services / manos-creativas → **200**

## Next action
Redeploy once more for `**` removal in plan labels; commit + push; confirm IndexNow runs.
