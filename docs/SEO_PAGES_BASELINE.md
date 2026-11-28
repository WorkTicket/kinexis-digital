# SEO pages baseline (Prompt 3)

**FACT — branched from live production**

| Item | Value |
|------|-------|
| Live SHA (www Worker / git `main`) | `315e362b188a115faee816bf474c5a683d320235` |
| Live boot asset | `boot.min.js?v=65` (verified GET www 2026-11-28) |
| Tracking commit `e81907d` | **Not in this repository** (ASSUMPTION: different machine/history). **Not included** on this branch. |
| Branch | `seo-pages-lead-quality-2026-12` |

Screenshots: place mobile 390px + desktop 1280px captures under `docs/seo-before/` after local preview (not committed secrets).

| URL | Source | Current H1 / title (from source @ 315e362b) | CTA target | Form fields (live pattern) |
|-----|--------|-----------------------------------------------|------------|----------------------------|
| `/industries/plumbing` | `src/data/industries.ts` + `src/app/(en)/industries/[slug]/page.tsx` | H1: Website Design for Plumbers Built for Emergency Calls · metaTitle: Plumber Website Design Pricing \| $97/mo | Contact / PlanOffer / pricing links | Shared site forms |
| `/industries/landscaping` | same | H1: Website Design for Landscapers: Routes and Projects | same | same |
| `/industries/roofing` | same | Roofing hire/lead-gen hub | same | same |
| `/industries/tree-care` | same | Tree care hub | same | same |
| `/blog/plumber-website-cost` | `content.ts` + `cost-post-bodies.ts` | How Much Does a Plumber Website Cost in 2026? | `/pricing`, `/contact` | n/a |
| `/blog/landscaping-website-cost` | same | Landscaping cost guide | `/pricing` | n/a |
| `/blog/roofing-website-cost` | same | Roofing cost guide | `/pricing` | n/a |
| `/seo-services` | `src/app/(en)/seo-services/page.tsx` | SEO That Helps The Right People Find You | **was** `/contact` free preview | PreviewBar may mount via layout |
| `/pricing` | `plans-catalog.ts` + pricing page | Contractor Website Cost & Plans | plan anchors + contact | n/a |
| `/contact` | `Form.tsx` LEAD_FIELDS | Contact | `/api/contact` | name, email, phone, business, trade&city, website optional, `_gotcha` |
| `/strategy-call` | BookingCalendar + written form | Strategy call | `/api/contact` | booking fields |
| `/audit` | audit form | Free audit | `/api/contact` | audit fields |
| `/case-studies/preferred-plumbing` | `caseStudies.ts` | Preferred Plumbing | industry backlink | n/a |
| `/case-studies/a1-property-services` | same | A1 Property Services | industry backlink | n/a |

**FACT:** `/api/contact` emails submissions (no marketing CRM table bound in `wrangler.jsonc`; `LEAD_DB` omitted). Preview bar / homepage use slim Form fields.
