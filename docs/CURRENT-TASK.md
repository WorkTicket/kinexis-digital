# CURRENT-TASK.md

## Goal
Ship Search Console / Analytics follow-ups: GA4 events, Spanish lang + meta, sitemap lastmod, Trustpilot sameAs.

## Status
in progress — code done locally; deploy + GSC/GA account steps + exact 404/500 URL fixes still open

## Changed files
- `src/components/DocumentShell.tsx` + locale root layouts — SSR `lang="es"` / `lang="es-ES"`
- `public/assets/js/boot.js` (+ min) — `generate_lead`, `phone_tap`, `strategy_call_click`, `pricing_click`
- `src/app/sitemap.ts`, `src/lib/pages.ts` — lastmod on every sitemap URL
- `src/lib/site.ts` — Trustpilot in schema `sameAs`
- `src/i18n/SpanishSite.tsx` — distinct `/es-es` homepage title/description
- `src/lib/i18n.ts` — Content-Language `es-ES` for Spain routes
- `.env.example` — note that `NEXT_PUBLIC_GA_ID` must be in the Cloudflare *build* env

## Completed
- Legacy high-impression redirects already live (HVAC hub, locations → SEO, aerospace/SaaS → industries)
- GA event wiring (measurement ID still must be present at build time)
- Spanish document language + distinct Spain home meta
- Sitemap lastmod + Trustpilot sameAs

## Unfinished
1. Add `NEXT_PUBLIC_GA_ID=G-Z8245BRX2L` in Cloudflare dashboard → Worker → Settings → Build → Build variables (API blocked: OAuth lacks Workers CI scope). Local `.env.local` is set for wrangler deploys.
2. Deploy so `/mo` and `KINEXIS_icon_mark.avif` 301s go live, then Validate fix in GSC
3. BIMI `email-protection` 404 is on Pages project `kinexis-card` (not this repo) — optional: disable Email Obfuscation there
4. Resubmit sitemap; request indexing for `/pricing` + trade hubs; mark key events in GA

## Next action
Set the Workers Builds GA build variable, deploy this branch, then Validate the three Coverage URLs in GSC.
