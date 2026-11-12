# CURRENT-TASK.md

## Goal
Ship `seo/high-intent-depth`: deepen money pages, fix cannibalization, rebuild cost posts, retarget `/web-design`, Spanish terminology, redirects, schema, internal links.

## Status
Implemented on branch `seo/high-intent-depth`. `npm run typecheck` + `npm run lint` + `node scripts/check-meta-length.mjs` pass. No deploy until Colton reviews.

## Defaults used
- Homepage title → Contractor & Home Service Websites From $97/mo
- No third-party “typical market ranges” on cost posts (24-month Kinexis table only)
- BlogPosting author stays Organization
- Spanish: Perfil de Negocio de Google; $0 de entrada / Sin entrada (Spain chrome)

## Cannibalization lock (query → owner URL)
| Query family | Owner |
|---|---|
| plumber/HVAC/roofing/electrician/landscaping/garage door/pressure washing website design | `/industries/{slug}` |
| {trade} website cost | `/blog/{trade}-website-cost` |
| what pages does a {trade} website need | `/blog/{trade}-website-pages` |
| contractor website design | `/web-design` |
| contractor website checklist (support) | `/blog/web-design-for-contractors` |
| contractor website monthly / small business website cost | `/pricing` |
| página web para plomeros / {trade} | `/es/industries/{slug}` |
| diseño web para contratistas | `/es/web-design` |
| EN `/blog/pagina-web-para-plomeros` | 301 → `/industries/plumbing` (ES post stays) |
| EN `/blog/como-pedir-resenas-en-google` | 301 → `/blog/how-to-ask-for-google-reviews-contractor` |

## Completed in this branch
- Redirects (locations web-design, cost/builder/GBP tips, case-study proof pages, EN Spanish-slug posts)
- Sitemap/hreflang exclusion for EN-redirected Spanish-slug posts
- Titles/H1/meta EN+ES money pages; brand-suffix cleanup
- Industry depth sections (examples, pages list, cost table, process) + FAQs + schema offers/audience/ItemList
- Cost posts rebuilt via `src/data/cost-post-bodies.ts` (24-month table; DIY H2 renamed)
- `/web-design` + `/es/web-design` retargeted to contractor website design
- Internal links: home (7 trades), pricing, blog hub, industries, services CTAs, Spanish pricing
- Spanish terminology sweep

## Still open / after Colton OK
- PR review + merge + deploy
- Front-load changed URLs in `index-queue.txt` and resubmit sitemap
- Optional: Keyword Planner sanity-check priority order
- Optional: Person author on BlogPosting; third-party market ranges
- Off-site §4 (client footers, Clutch/UpCity, etc.) — not in this PR

## Next action
Colton reviews PR on `seo/high-intent-depth`; then deploy and queue indexing.
