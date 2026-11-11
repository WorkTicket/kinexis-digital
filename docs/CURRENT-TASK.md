# CURRENT-TASK.md

## Goal
Finish the SEO/code batch locally (Spain+Latam off Google, cache, snippets, trailing slash, cost posts, hold industries, titles/contractor URL, Spanish cost rewrites, SMS stubs).

## Status
implemented locally (not committed / not deployed)

## Completed
- `/es` and `/es-es` noindex, out of sitemap and hreflang; pages still work; Latam keeps US prices; Spain omits USD on visitor-facing pages
- Year cache limited to images/static (`public/_headers` + `src/proxy.ts`); blog/portfolio HTML uses short cache
- Meta descriptions rewritten to full 120–155 char sentences (homepage, plumbing, cost posts, Spanish trade posts)
- Trailing slash 301 keeps query string
- Homepage features plumbing/HVAC/roofing cost guides; EN + ES industry pages link cost + pages posts
- Hold industries (painting, remodeling, pool-care, window-cleaning, yard-care): `status: "hold"`, noindex, out of grids/header/sitemap/related
- Title brand doubling fixed; contractor slug `/blog/web-design-for-contractors` + Spanish legacy 301
- Spanish HVAC→lawn cost/pages posts rewritten (full native bodies + excerpts)
- SMS templates complete for all 12 trades in EN + ES (Latam + Spain overrides), including garage / landscaping / pressure washing

## Still open
- Custom hero art for newer slugs (reuse stills for now)
- Speed work (later)
- Deploy + Rich Results / GA4 DebugView
- `/es-es` long legal/add-on copy may still mention USD in places

## Next action
Preview hold industries stay unlinked, Spanish cost posts, and SMS templates. Commit/deploy when ready.
