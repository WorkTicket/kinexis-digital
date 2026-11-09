# Kinexis Digital: SEO Coding Plan (12 trades)

**Audience:** Developer / coding agent on `WorkTicket/kinexis-digital`  
**Date:** Nov 9, 2026 (America/Bogota)  
**Scope:** The five content pieces for **all 12 industries**, with plumbing as the fully worked pilot. Not the old 10-WP mega plan.  
**Keyword maps first:** `keyword_map_<trade>.csv` + short `.md` for each trade; combined `keyword_map_all.csv` (472 rows). Volumes blank — fill in Keyword Planner / Bing WMT.  
**Copy:** `fact_file.md` + `docs/CONTENT.md`. Never invent stats. Never bash monthly plans. Never write “you own your site.” CTA: `/pricing` or free preview `/contact`.  
**Note (separate):** `/es-es` Spain price/title fix is out of scope here — track separately.

---

## Plain English first

We are building **one data-driven trade hub system** and a small set of **shared** pages, then filling trade-specific posts from each keyword map.

For every trade you eventually ship:

1. **Hub** targeting `website design for [trade]` (proof when we have a real client site).
2. **Cost post** with real prices: Website **$97/mo**, Lead System **$197/mo**, Plus **$297/mo**, Own It **$1,497**.
3. **Pages post** — what pages that trade’s site needs (annotated homepage when proof exists).
4. **One shared** “Monthly vs Own It + what if I cancel” post (linked from every hub — **do not** write 12 copies).
5. **One shared** missed-call templates page (H2 per trade) + **one shared** revenue calculator (trade dropdown).

Trades without real proof/content stay `status: hold` → `noindex` + out of sitemap until ready.

### Keyword counts (rows per map)

| Trade | CSV rows |
| --- | ---: |
| plumbing | 31 |
| hvac | 37 |
| electrical | 38 |
| roofing | 43 |
| garage-doors | 29 |
| painting | 45 |
| remodeling | 50 |
| landscaping | 44 |
| pool-care | 36 |
| pressure-washing | 31 |
| window-cleaning | 38 |
| yard-care | 44 |
| **all (incl. shared)** | **472** |

---

## Colton placeholders (do not invent)

- `$1,497` — monthly-plan site-file buyout $
- `On Lead System and Plus: $1/mo second tracking number (if used) plus carrier rates — no $97 text-back fee` — Own It table shows $97/mo; LS/Plus public $ unknown
- `[COLTON: preview-to-launch days]` — site only says launch date confirmed in writing
- `[COLTON: paid audit price]`
- `[COLTON: custom design upgrade price]`
- `[COLTON: client results + permission]` — numeric case studies
- `[COLTON: annotate Preferred Plumbing]` / `[COLTON: annotate A1 landscaping]`

---

## Architecture (real repo paths)

| Piece | Path |
| --- | --- |
| Industry data | `src/data/industries.ts` |
| EN hub page | `src/app/(en)/industries/[slug]/page.tsx` |
| Live client sites | `src/data/liveSites.ts` (`preferred-plumbing`, `a1-landscaping`) |
| Blog index | `src/lib/content.ts` (`POSTS`) |
| EN post bodies | `src/data/posts-en.ts` |
| Schema | `src/components/JsonLd.tsx` (`ContentSchema`, `ArticleSchema`) |
| Sitemap | `src/app/sitemap.ts` |
| SEO meta | `src/lib/seo.ts` |
| GA / forms | `public/assets/js/boot.js`, `src/components/Form.tsx` |
| Plans/prices | `src/lib/content.ts` (`PLANS`) |

**Do not add MDX** unless Colton asks — extend the existing TS post pattern.

---

## Shared pieces (build once)

### S1 — Monthly vs Own It + cancel (ONE post)

| | |
| --- | --- |
| **Primary keyword** | `monthly website for contractors` |
| **Secondary** | `who owns your website if you cancel` (H2 — do not create a second URL) |
| **Slug** | `/blog/monthly-website-vs-own-it` |
| **Title** | Monthly Website vs Own It for Trade Businesses \| Kinexis Digital |
| **H1** | Monthly Website Plan or Own It — Which Fits Your Trade Business? |
| **Files** | Add to `POSTS` + `EN_POST_CONTENT`; link from every hub |
| **Outline** | Open with both as valid choices → side-by-side table (Website/Lead System/Plus vs Own It from fact file) → cancel anytime, site stays through paid period, then offline → buyout = written one-time purchase `$1,497` or move to Own It → Own It: site files yours from launch day → FAQ → CTA `/pricing` |
| **Schema** | Article + BreadcrumbList + FAQPage |
| **GA** | `pricing_click` on plan links; `generate_lead` on preview form |

### S2 — Missed-call templates (ONE page, 12 H2s)

| | |
| --- | --- |
| **Page primary** | `missed call text back for plumbers` (page-level; other trades = section targets in maps) |
| **Slug** | `/blog/missed-call-text-back-templates` |
| **Title** | Missed-Call Text-Back Templates for 12 Trades \| Kinexis Digital |
| **Structure** | Intro (optional add-on; dedicated line; carrier **10–15 days**; not guaranteed; `On Lead System and Plus: $1/mo second tracking number (if used) plus carrier rates — no $97 text-back fee`) → H2 per trade with 4–6 SMS templates (daytime, after-hours, job-type triage) → compliance note (qualified review before publish) → CTA Lead System/Plus `/pricing` + calculator |
| **Files** | `POSTS` + `posts-en.ts`; optional `src/data/textback-templates.ts` keyed by industry slug |
| **Schema** | Article + FAQPage + BreadcrumbList |
| **Avoid** | Chasing head “missed call text back” software SERP |

### S3 — Missed-call revenue calculator (ONE tool)

| | |
| --- | --- |
| **Primary** | `missed call text back calculator` |
| **Slug** | `/tools/missed-call-calculator` |
| **Create** | `src/app/(en)/tools/missed-call-calculator/page.tsx`, `src/components/tools/MissedCallCalculator.tsx` |
| **Inputs** | Trade preselect (12 slugs) · calls/week · % missed · avg job value ($) · close rate % (all user-entered) |
| **Formula (show in UI)** | `missed/mo = calls/week × (miss%/100) × 4.345`; `at risk = missed/mo × job value`; `illustrative recover = at risk × (close%/100)` — label **planning math, not a guarantee** |
| **Forbidden** | Invented industry averages or defaults presented as facts |
| **Schema** | WebApplication (+ BreadcrumbList) |
| **GA** | `tool_calculate` `{ tool: "missed_call", trade }` · form → `generate_lead` |
| **Sitemap** | Add URL in `sitemap.ts` / `pages.ts` |

---

## Piece type A — Hub upgrade (template = plumbing)

### Pilot: Plumbing (full spec)

| | |
| --- | --- |
| **Map** | `keyword_map_plumbing.csv` |
| **Primary** | `website design for plumbers` |
| **Secondaries** | `plumber website design`, `website for plumbers`, `plumbing website design` |
| **URL** | `/industries/plumbing` |
| **Title** | Website Design for Plumbers \| From $97/mo \| Kinexis Digital |
| **Meta** | Plumbing website design from $97/mo. Pages for leaks, drains, and water heaters, plus missed-call text-back and Google review requests. Free homepage preview — no card. |
| **H1** | Website Design for Plumbers That Turns Searches Into Booked Jobs |
| **Change** | `src/data/industries.ts` (plumbing entry + new fields), `src/app/(en)/industries/[slug]/page.tsx`, new `IndustryProof.tsx` |
| **Proof** | `LIVE_SITES` slug `preferred-plumbing` · callpreferredplumbing.com · `[COLTON: annotate Preferred Plumbing]` · Hunter Norris quote (no invented metrics) |
| **Sections** | Hero + preview/pricing CTAs → Trade call types (leaks, drains, water heaters; seasonality qualitative only) → Why thin sites lose jobs → **Preferred Plumbing proof** → Includes → Text-back blurb → Plans snapshot ($97/$197/$297/$1,497) → FAQ → Related trades → CtaBand |
| **FAQs (FAQPage)** | 24/7 only if staffed · SEO not in four plans · review requests after jobs · plumber website cost with Kinexis · cancel monthly · Own It vs monthly |
| **Internal links** | `/pricing`, `/contact`, cost post, pages post, S1, S2#plumbing, S3, `/portfolio` |
| **Schema** | ContentSchema (WebPage/FAQPage + BreadcrumbList + Service type) |
| **GA** | existing preview/pricing/phone events + `trade=plumbing` |
| **Acceptance** | Proof block visible; ≥6 FAQs; primary only on this URL; Rich Results OK |

### Data fields to add on `Industry`

```ts
status: "live" | "hold";
primaryKeyword: string;
proof?: { liveSiteSlug: string; annotations: { title: string; text: string }[] };
// widen faqs: QA[]
```

`hold` → `contentMetadata({ index: false })` + omit from `sitemap.ts`.

### All 12 hubs (keywords + drafts)

| Trade | Hub | Primary | Title draft | Proof |
| --- | --- | --- | --- | --- |
| plumbing | `/industries/plumbing` | website design for plumbers | Website Design for Plumbers \| From $97/mo \| Kinexis | Preferred Plumbing `[COLTON: permission]` |
| hvac | `/industries/hvac` | website design for hvac | Website Design for HVAC \| From $97/mo \| Kinexis | `[COLTON: client site/permission]` |
| electrical | `/industries/electrical` | website design for electrician | Website Design for Electricians \| From $97/mo \| Kinexis | Demo `union-electric` OK as template; live client `[COLTON:]` |
| roofing | `/industries/roofing` | website design for roofers | Website Design for Roofers \| From $97/mo \| Kinexis | Demo `red-oak-roofing`; live `[COLTON:]` |
| garage-doors | `/industries/garage-doors` | website design for garage door companies | Website Design for Garage Door Companies \| From $97/mo \| Kinexis | Demo `liftline-garage-doors`; live `[COLTON:]` |
| painting | `/industries/painting` | website design for painters | Website Design for Painters \| From $97/mo \| Kinexis | `[COLTON:]` |
| remodeling | `/industries/remodeling` | website design for remodeling contractors | Website Design for Remodeling Contractors \| From $97/mo \| Kinexis | `[COLTON:]` |
| landscaping | `/industries/landscaping` | website design for landscapers | Website Design for Landscapers \| From $97/mo \| Kinexis | A1 Property Services (`a1-landscaping`) `[COLTON: annotate A1]` |
| pool-care | `/industries/pool-care` | website design for pool service | Website Design for Pool Service \| From $97/mo \| Kinexis | `[COLTON:]` |
| pressure-washing | `/industries/pressure-washing` | website design for pressure washing | Website Design for Pressure Washing \| From $97/mo \| Kinexis | Demo `rinseworks`; Jeremy Main quote OK; live annotate `[COLTON:]` |
| window-cleaning | `/industries/window-cleaning` | website design for window cleaning | Website Design for Window Cleaning \| From $97/mo \| Kinexis | Demo `clearpeak`; live `[COLTON:]` |
| yard-care | `/industries/yard-care` | website design for lawn care | Website Design for Lawn Care \| From $97/mo \| Kinexis | Demo `happy-yard`; live `[COLTON:]` |

**Trade-specific hub angles (no invented $):** use existing `services` / `problems` in `industries.ts` (e.g. HVAC repair vs replace vs shoulder-season maintenance; electrical license trust + EV; roofing storm vs replace; garage emergency spring vs new door; painting interior/exterior/cabinets; remodeling long quote; landscaping maintenance vs design-build; pool weekly vs repair; pressure washing house/concrete/roof; window home vs storefront; yard routes / pet waste).

**Suggested FAQs per hub:** hours honesty · SEO not bundled · review requests · cost with Kinexis · cancel · Own It vs monthly — plus 1–2 trade-specific (already in data).

---

## Piece type B — Cost posts (per trade)

Pattern from plumbing map → replicate using each `keyword_map_<trade>.csv` P1 cost keyword.

| Trade | Slug | Primary keyword |
| --- | --- | --- |
| plumbing | `/blog/plumber-website-cost` | plumber website cost |
| hvac | `/blog/hvac-website-cost` | hvac website cost |
| electrical | `/blog/electrician-website-cost` | electrician website cost |
| roofing | `/blog/roofing-website-cost` | roofer website cost |
| garage-doors | `/blog/garage-door-website-cost` | garage door company website cost |
| painting | `/blog/painting-website-cost` | painting contractor website cost |
| remodeling | `/blog/remodeling-website-cost` | remodeling contractor website cost |
| landscaping | `/blog/landscaping-website-cost` | landscaping website cost |
| pool-care | `/blog/pool-service-website-cost` | pool service website cost |
| pressure-washing | `/blog/pressure-washing-website-cost` | pressure washing website cost |
| window-cleaning | `/blog/window-cleaning-website-cost` | window cleaning website cost |
| yard-care | `/blog/lawn-care-website-cost` | lawn care website cost |

**Shared outline:** Answer in 2 sentences with Kinexis four prices → table Website/Lead System/Plus/Own It inclusions from fact file → DIY vs freelancer vs agency **qualitative** (cite dated public sources if showing ranges; else no numbers) → hidden costs (SEO separate, photos/copy quoted, text-back optional `On Lead System and Plus: $1/mo second tracking number (if used) plus carrier rates — no $97 text-back fee`) → trade-specific “what you’re paying for” (pages that trade needs) → link hub + S1 + `/pricing` → CTA preview.  
**Schema:** Article + FAQPage + BreadcrumbList.  
**Files each:** `POSTS` entry + `EN_POST_CONTENT[slug]`.

---

## Piece type C — Pages posts (per trade)

| Trade | Slug | Primary |
| --- | --- | --- |
| plumbing | `/blog/plumbing-website-pages` | what pages should a plumbing website have |
| hvac | `/blog/hvac-website-pages` | what pages should a hvac website have |
| electrical | `/blog/electrician-website-pages` | what pages should an electrician website have |
| roofing | `/blog/roofing-website-pages` | what pages should a roofing website have |
| garage-doors | `/blog/garage-door-website-pages` | what pages should a garage door website have |
| painting | `/blog/painting-website-pages` | what pages should a painting website have |
| remodeling | `/blog/remodeling-website-pages` | what pages should a remodeling website have |
| landscaping | `/blog/landscaping-website-pages` | what pages should a landscaping website have |
| pool-care | `/blog/pool-service-website-pages` | what pages should a pool service website have |
| pressure-washing | `/blog/pressure-washing-website-pages` | what pages should a pressure washing website have |
| window-cleaning | `/blog/window-cleaning-website-pages` | what pages should a window cleaning website have |
| yard-care | `/blog/lawn-care-website-pages` | what pages should a lawn care website have |

**Outline:** Core pages (home, services, service area honest, about, reviews, contact) → trade-specific service pages from hub `services` → annotated screenshot when proof exists (plumbing/landscaping first) → anti-doorway note → CTA hub + preview.  
**Schema:** Article + BreadcrumbList (+ FAQ optional).

---

## Cannibalization rules (locked)

| URL | One primary keyword |
| --- | --- |
| Each `/industries/{slug}` | that trade’s hub primary |
| Each cost post | that trade’s cost primary |
| Each pages post | that trade’s pages primary |
| `/blog/monthly-website-vs-own-it` | monthly website for contractors |
| `/blog/missed-call-text-back-templates` | missed call text back for plumbers (sections for others) |
| `/tools/missed-call-calculator` | missed call text back calculator |
| `/pricing` | contractor website cost |
| `/web-design` | website design for contractors |
| `/audit` | free website audit |

---

## PR order

| PR | Delivers | Size |
| --- | --- | --- |
| PR1 | Industry `status`/`proof` fields + **plumbing hub** upgrade | L |
| PR2 | S1 Monthly vs Own It/cancel shared post | M |
| PR3 | Plumbing cost post + plumbing pages post | M |
| PR4 | S2 templates page (plumbing H2 complete; stubs OK for others) + S3 calculator | L |
| PR5 | Landscaping hub (A1 proof) + landscaping cost + pages | L |
| PR6+ | Next trades in rollout order (hub only if live/proof; else hold) — one trade cluster per PR when possible | M–L |

---

## Rollout cadence (~2–3 pieces/week)

| Week | Ship |
| --- | --- |
| 1 | PR1 plumbing hub |
| 2 | PR2 shared S1 + start PR3 |
| 3 | Plumbing cost + pages |
| 4 | Templates (12 H2s: full plumbing + HVAC/electrical/roofing; stubs elsewhere) + calculator |
| 5 | Landscaping hub + cost + pages |
| 6 | HVAC hub (if material) or HVAC cost+pages with hub hold; fill more template H2s |
| 7–10 | electrical → roofing → pressure-washing (quotes exist) → garage-doors → … |
| 11–12 | Remaining trades; refresh plumbing cluster from GSC |

**Hold until proof/content:** painting, remodeling, pool-care, window-cleaning, yard-care, and any hub lacking real material — keep routes, `noindex`, fill templates H2 only when quality bar met.

---

## QA / deploy checklist

1. `npm run check` then local `build:worker` (`NEXT_PUBLIC_GA_ID` set).  
2. Grep: no `you own your site`; no invented `%`; hold hubs `noindex`.  
3. Rich Results Test: plumbing hub FAQ, cost Article, calculator WebApplication.  
4. Confirm one primary keyword per URL vs `keyword_map_all.csv`.  
5. After Colton `npm run deploy`: URL Inspection + sitemap resubmit for new URLs.  
6. GA4 Realtime: preview, pricing_click, tool_calculate.

---

## Dev acceptance (cluster)

- [ ] Plumbing hub live with Preferred Plumbing proof (pending Colton OK).  
- [ ] S1, S2, S3 each a single URL.  
- [ ] Cost/pages posts registered in `POSTS` + sitemap `lastmod`.  
- [ ] Calculator shows formula; no fake benchmarks.  
- [ ] Form/boot carry `trade` where relevant.  
- [ ] Cross-links: each hub ↔ its cost/pages ↔ S1/S2/S3 ↔ `/pricing`.
