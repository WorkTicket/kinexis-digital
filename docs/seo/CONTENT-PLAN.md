# SEO Content Plan

**Status:** Plan landed (#29); GSC + Ahrefs folded in; Tech-0 executing in #37 (after docs refresh #41). Execution under [`docs/engineering/NEXT-PHASES-PLAN.md`](../engineering/NEXT-PHASES-PLAN.md). **Technical indexing ahead of content rewrites.** No delete / noindex / redirect of live indexable content without owner approval.  
**Sources:** Owner SEO validation; GSC Performance export (sc-domain:kinexisdigital.com, Web, ~16 months / Chart 23 Jun–13 Nov 2026); Ahrefs Free (DR only); repo content files; `docs/CONTENT.md`.  
**Pricing / terms:** Quote only published site numbers from `docs/CONTENT.md` / `/pricing` (Website **$97/mo**, Lead System **$197/mo**, Plus **$297/mo**, Own It **$1,497** one-time; monthly **$0 down**, month-to-month, cancel anytime; **30-day money-back** on every plan; **60-day lead guarantee** on Lead System/Plus; free homepage preview in **2 business days**, no card; extra Website page **$99**; Site Care **$39/mo** after Own It year one; text-back rules as on `/pricing`). **Never invent volumes, KD, or CPC.**

---

## 0. Real data snapshot (do not invent beyond this)

### Google Search Console (official totals)
**6 clicks · 6,705 impressions · 0.1% CTR · avg position 64.5.** Coverage UI: **114 indexed / 812 not indexed** (redirect 456, discovered-not-indexed 84, crawled-not-indexed 77, robots 71, 404 67, noindex 29, …). Sitemap: 131 live URLs, all 200. Most historical impressions sit on **already-301ing** `/en/...` and legacy `/es` agency paths; **current live 200 URLs ≈ 1 click / 302 impressions** in this export (`/es` is the strongest live page). Brand query `kinexis`: **63 imps, 0 clicks, pos 16.3**. `/pricing`: **12 imps, pos 3.25**. `local seo checklist`: **141 imps, pos 70.59** (historically on `/en/blog/local-seo-checklist` → live `/blog/local-seo-get-found-get-called`).

### Ahrefs (Free plan)
**Only DR 9.0** (`public-domain-rating-free` for apex and www). Site Explorer, Keywords Explorer, Site Audit, organic keywords, backlinks, competitors: **Insufficient plan**. Volume / KD / CPC remain unavailable — leave blank until a paid Ahrefs plan (owner gate).

---

## 1. Tracker

| ID | Item | Type | Phase | Primary URL(s) | Status |
|---|---|---|---|---|---|
| I1 | Cloudflare Always Use HTTPS (HTTP→HTTPS 301; stop Pingora 500s) | Infra | **Tech-0** | `http://` apex/www | **Owner dashboard** — see §2 |
| I2 | 301 dead case studies → `/portfolio` | Redirect (404 repair) | **Tech-0** | 3 retired slugs + `/en/` | In code this PR |
| I3 | Homepage title leads with **Kinexis Digital** | Meta | **Tech-0** | `/` | In code this PR |
| I4 | `/pricing` title/meta/H1 own **contractor website cost** | Meta | **Tech-0** | `/pricing` | In code this PR |
| I5 | Retitle local SEO article for **local SEO checklist** | Meta | **Tech-0** | `/blog/local-seo-get-found-get-called` | In code this PR |
| I6 | Connect portal: robots + noindex app routes | Subdomain | **Tech-0** | `connect.kinexisdigital.com` | **Separate repo** — see §13 |
| P1 | noindex `bimi.kinexisdigital.com` | Infra | **Tech-0** | bimi subdomain | **Separate host** — see §13 (approved) |
| P2 | 301 `/es-es/*` → `/es/*` | Redirect | **Tech-0** | `/es-es` | In code this PR (approved) |
| P3 | painting + remodeling off `hold` | Landing | **Tech-0** | `/industries/painting`, `/remodeling` | In code this PR (approved) |
| P4 | Connect homepage stays indexable (canonical) | Subdomain | **Tech-0** | connect `/` | Approved — implement in Connect repo |
| T1 | Keyword → URL ownership map | Guardrail | 0 | See §3 | Done — `src/data/keyword-ownership.ts` |
| T2 | Cannibalization guard: no generic contractor-cost article | Guardrail | 0 | `/pricing` | Done — `npm run check:seo-ownership` |
| T3 | Rewrite briefs: 12 trade **cost** articles | Rewrite | 2 | `/blog/*-website-cost` | After Tech-0 |
| T4 | Rewrite briefs: 12 trade **pages** articles | Rewrite | 2 | `/blog/*-website-pages` | After Tech-0 |
| T5 | New: redesign checklist | New article | 1 | `/blog/contractor-website-redesign-checklist` | Done (#36) |
| T6 | New: choose contractor web designer | New article | 1 | `/blog/how-to-choose-contractor-web-designer` | Planned |
| T7 | New: contractor quote form | New article | 1 | `/blog/contractor-website-quote-form` | Planned |
| T8 | Expand GBP checklist | Expand | 2 | `/blog/google-business-profile-checklist` | Planned |
| T9 | Expand local SEO (plumber troubleshooting) | Expand | 2 | `/blog/local-seo-get-found-get-called` | Planned |
| T10 | Industry: painting live | Landing | 3 | `/industries/painting` | In code this PR |
| T11 | Industry: remodeling live | Landing | 3 | `/industries/remodeling` | In code this PR |
| T12 | Portfolio / internal links painting + remodeling | Supporting | 3 | `/portfolio` | Nav/index via `status: live`; dedicated paint template still optional |
| T13 | Research backlog | Research | 4 | TBD | After Ahrefs upgrade / more GSC |
| T14 | Data needed | Ops | 0 | — | GSC received; Ahrefs unpaid |
| T15 | Writing standard + review checklist | Process | 0 | §11–12 | Locked |
| T16 | GSC metadata quick wins (titles/descriptions) | Metadata | Tech-0 | `/`, `/pricing`, local SEO post | In #37 (I3–I5) |

---

## 2. Phased execution (**technical indexing first**)

### Phase Tech-0 — Indexing & on-page (before trade rewrites)
1. **Owner (Cloudflare dashboard):** enable **Always Use HTTPS** (HTTP→HTTPS). Agents do not change this.  
2. **Code (this marketing PR):** dead case-study 301s; brand homepage title; pricing owns contractor website cost; local SEO checklist retitle; **`/es-es` → `/es`**; **painting + remodeling `live`**.  
3. **Out of this repo (approved, owner/other deploys):** BIMI noindex on Pages project `kinexis-card`; Connect robots/noindex in `WorkTicket/kinexis-connect` (homepage may stay indexable). See §13.

### Phase 0 — Guardrails
Ownership map (§3) + cannibalization (§4). No new generic contractor-cost article.

### Phase 1 — Three new articles
**T5** shipped (#36). Next **T6** → **T7**. Human writing standard. Soft-publish messaging is owner gate.

### Phase 2 — Improve existing (after Tech-0)
Trade cost/pages rewrites; GBP + local SEO plumber expansions; light de-overlap on companion pillars.

### Phase 3 — Painting & remodeling landings
**Done in Tech-0** after owner approval: `status: "live"`, sitemap, nav, Spanish mirrors.

### Phase 4 — Research
After paid Ahrefs (or Keyword Planner) + fresh GSC: landscaping leads research; speed benchmark. No new generic Maps article.

---

## 3. Keyword → URL ownership map

One primary URL per commercial intent. Secondaries support; they do not get a second money page.

| Keyword / intent | Owns it | Notes |
|---|---|---|
| contractor website design | `/web-design` | Service page |
| plumber website design / website design for plumbers | `/industries/plumbing` | Hub |
| landscaping website design | `/industries/landscaping` | Hub |
| HVAC / electrician / roofing / garage door / pressure washing / … design | `/industries/{trade}` | Matching live hub |
| painting website design / website design for painters | `/industries/painting` | **Live** (this PR) |
| remodeling contractor website design | `/industries/remodeling` | **Live** (this PR) |
| contractor website cost / how much does a contractor website cost | **`/pricing`** | **Do not create a blog cost article for this** |
| plumber website cost | `/blog/plumber-website-cost` | Trade cost series |
| landscaping / HVAC / … website cost | `/blog/{trade}-website-cost` | Same series |
| contractor website checklist / what to put on the site | `/blog/web-design-for-contractors` | Shared checklist |
| contractor website not generating leads / mistakes | `/blog/website-mistakes-that-cost-you-calls` | Keep purpose separate from conversion article |
| turn clicks into calls / conversion | `/blog/turn-clicks-into-calls` | Separate from mistakes |
| local SEO for contractors | `/blog/local-seo-get-found-get-called` | Expand; don’t fork |
| Google Business Profile checklist | `/blog/google-business-profile-checklist` | Expand |
| monthly vs one-time / Own It | `/blog/monthly-website-vs-own-it` | |
| Wix vs Squarespace vs managed | `/blog/wix-vs-squarespace-vs-managed-website-contractors` | |
| freelancer vs agency vs subscription | `/blog/freelancer-vs-agency-vs-subscription-website` | |
| SEO services (commercial) | `/seo-services` | |
| portfolio / examples | `/portfolio` (+ case studies) | Prefer improving own examples over “best plumber website examples” listicles |
| redesign / migration / protect rankings when changing sites | `/blog/contractor-website-redesign-checklist` | **New (Phase 1)** |
| how to choose a contractor web designer | `/blog/how-to-choose-contractor-web-designer` | **New (Phase 1)** |
| contractor quote / estimate form | `/blog/contractor-website-quote-form` | **New (Phase 1)** |

**Avoid as new money URLs:** broad listicles (“best website builder for contractors”, “plumber website examples”) — improve case studies and hubs instead. Full exploratory map remains in `docs/seo/keyword_map_all.csv` (volumes still “check in tool” — do not invent).

---

## 4. Cannibalization guard

- **`/pricing` owns** generic contractor website **cost / pricing / plan comparison** intent.  
- **Forbidden:** a new post such as `/blog/contractor-website-cost` or “how much does a contractor website cost” that repeats plan tables.  
- Trade cost posts may show the same four published prices **in a trade frame**, then differentiate on trade drivers (see §5). They must link to `/pricing` as the plan source of truth and to the matching `/industries/{trade}` + pages post.  
- New Phase 1 articles must **not** re-litigate full plan matrices; mention free homepage preview and link out.

---

## 5. Audit: 24 trade cost + pages articles

### 5.1 Similarity method (repo, reproducible)

Computed from generated English bodies via `buildCostPostBody` / `buildPagesPostBody` (lead + section H2/HTML + FAQs), HTML stripped, **5-word shingle Jaccard**, ×100 for percent.

| Series | N | Avg pair similarity | Min | Max | Highest pairs (sample) |
|---|---:|---:|---:|---:|---|
| Cost (`*-website-cost`) | 12 | **89.7%** | 85.8% | **92.2%** | painting↔remodeling 92.2; painting↔lawn-care 92.1; painting↔window-cleaning 92.0 |
| Pages (`*-website-pages`) | 12 | **85.8%** | 79.5% | **89.2%** | painting↔pressure-washing 89.2; painting↔pool / window 88.8 |

Owner sample cited ~87–95% (cost) and ~81–90% (pages). Repo math lands in the same band: **shared template sections dominate**; trade-only `drivesCostHtml` / `servicesHtml` / leadFocus are a thin unique layer. That is scaled-template risk under Google’s scaled-content guidance — fix by **substantial rewrite**, not by mass noindex in this plan.

### 5.2 Shared template debt (what to keep vs cut)

**Cost series shared blocks (keep facts, stop cloning prose):** plan table, 24-month math, DIY vs freelancer vs agency, compare-quotes checklist, preview process, which-plan-fits, hidden costs, “other trades” list.  
**Pages series shared blocks:** core pages skeleton, homepage wireframe, service anatomy, NAP, skip doorways, build order, photos, forms, IA, measure/iterate.

**Rewrite rule:** Each article keeps verified prices and links, but **≥1 unique H2 + FAQs + examples** that only make sense for that trade (jobs, seasonality, proof, form fields, buyer objections). Aim to drive pair similarity **well below** the current ~86–92% band after rewrite (re-run the same shingle method; no target KD).

### 5.3 Per-article rewrite briefs — cost series

For each: keep URL; deepen `drivesCostHtml` / `payingForHtml`; add 2–3 trade FAQs; add one “buyer decision” section; link hub + pages post + `/pricing`.

| URL | Trade-specific angle | Pricing considerations (beyond shared table) | FAQs / buyer decisions to add |
|---|---|---|---|
| `/blog/plumber-website-cost` | Urgency vs planned heaters; after-hours honesty | Separate emergency path vs estimate pages increases write time, not a “plumbing tax” | 24/7 claims vs staffed hours; tankless brands you install; when Lead System text-back matters on leak days |
| `/blog/hvac-website-cost` | Peak heat vs shoulder-season maintenance | Financing notes only if real; peak-season follow-up value | No-cool vs replacement vs tune-up; fake “as low as” lines |
| `/blog/electrician-website-cost` | License trust + panel / EV split | EV page only if offered | Where license shows; troubleshooting vs upgrade quotes |
| `/blog/roofing-website-cost` | Storm docs + repair vs replace | Insurance language without claim promises | Hail inspection forms; wet-finger mobile quote |
| `/blog/garage-door-website-cost` | Spring emergency vs new-door shoppers | Same-day repair vs measure appointments | Brands you are authorized to sell |
| `/blog/landscaping-website-cost` | Route maintenance vs design-build | Recurring vs project cash flow | Patio leads vs mow routes |
| `/blog/pressure-washing-website-cost` | Surface list + soft-wash honesty | Before/after proof cost (photos) | House vs concrete vs roof algae |
| `/blog/painting-website-cost` | Interior / exterior / cabinets | Prep expectations; season for exterior | Photo-based estimates; cabinet vs whole-house |
| `/blog/remodeling-website-cost` | Long sales cycle; kitchens/baths | Consult before numbers; no fake floor prices | Change orders; permits language |
| `/blog/pool-service-website-cost` | Route signup vs repair panic | Seasonal open/close offers | Green-pool phone path vs membership brochure |
| `/blog/window-cleaning-website-cost` | Residential recurring vs storefront | Pane count / frequency fields | Commercial open-hour constraints |
| `/blog/lawn-care-website-cost` | Honest route geography | Pet-waste only if real | ZIP + frequency for dispatch |

### 5.4 Per-article rewrite briefs — pages series

| URL | Trade-specific architecture | Customer journey | Form / CTA | Examples / proof |
|---|---|---|---|---|
| `/blog/plumbing-website-pages` | Leaks, drains, water heaters split | Panic → phone; planned → short form | Name, phone, job, city | Prefer Preferred Plumbing annotated hub |
| `/blog/hvac-website-pages` | Repair / replace / maintain | Season-aware IA | Phone-first in peak heat | Live HVAC portfolio when available |
| `/blog/electrician-website-pages` | Panels, EV, troubleshooting | Trust before price | Site-check for EV | License near phone |
| `/blog/roofing-website-pages` | Repair vs replace; storm | Inspection booking | Short + photo upload | Insurance process without promises |
| `/blog/garage-door-website-pages` | Springs / openers / new doors | Stuck-open vs remodel shopper | Measure form fields | Brand list only if authorized |
| `/blog/painting-website-pages` | Interior / exterior / cabinets | Walkthrough vs photo quote | Rooms/surfaces, optional photos | Real room photos > stock |
| `/blog/remodeling-website-pages` | Kitchens / baths / process | Multi-visit consult | Consult request, not “CALL NOW” | Finished rooms above fold |
| `/blog/landscaping-website-pages` | Maintenance vs design-build | Route vs project | ZIP + offer type | A1 Property Services hub proof |
| `/blog/pool-service-website-pages` | Routes vs equipment repair | Green pool urgency | ZIP, day, swimmable? | Equipment brands you service |
| `/blog/pressure-washing-website-pages` | Surfaces + soft wash | Quote from photos | Surface dropdown | Before/after pairs |
| `/blog/window-cleaning-website-pages` | Home vs storefront | Recurring default | Pane count, frequency | Commercial schedule notes |
| `/blog/lawn-care-website-pages` | Mow routes + cleanups | Neighborhood honesty | ZIP, frequency; pet-waste page iff real | Service-area truth |

---

## 6. New articles (Phase 1) — full briefs

### 6.1 T5 — Redesign checklist (+ migration)

**Shipped in source:** PR #36 → `7967dc3d` (`src/lib/content.ts` + pillar body). Soft-publish / production deploy = owner.

| Field | Spec |
|---|---|
| **URL** | `/blog/contractor-website-redesign-checklist` |
| **Title** | Contractor Website Redesign Checklist: How to Protect Your Google Rankings and Leads |
| **Meta title** | Contractor Website Redesign Checklist (Keep Rankings & Leads) |
| **Meta description** | A practical redesign checklist for contractors: URL mapping, 301 tests, Search Console checks, and a launch day list so you don’t lose calls when the new site goes live. |
| **Primary intent** | Redesign / replatform without nuking local visibility |
| **Internal links** | `/web-design`, `/pricing`, `/blog/google-business-profile-checklist`, `/blog/local-seo-get-found-get-called`, `/blog/website-mistakes-that-cost-you-calls`, matching industry hub, `/contact` (free homepage preview) |

**Outline**
1. When a redesign is worth it (slow phone, wrong services, mobile broken) — not “rebrand for fun.”  
2. Inventory: pages that earn calls vs dead weight (Search Console + call logs — *after owner provides GSC*).  
3. **URL mapping worksheet** (example table: old path → new path → 301 → owner).  
4. Content that must survive: NAP, service pages, phone placement, reviews embeds.  
5. **Migration section:** DNS cutover, 301 testing checklist, sitemap submit, parameter traps, “soft 404” after theme moves.  
6. Before/after Search Console checks (coverage, queries, landing pages) — describe process; no invented rankings.  
7. Launch-day checklist: tap-to-call on mobile, forms, GBP website field, tracking numbers.  
8. First 30 days: what to watch; when to roll back a bad redirect.  
9. CTA: free homepage preview in 2 business days, no card — then choose a plan on `/pricing`.

### 6.2 T6 — Choose a contractor web designer

| Field | Spec |
|---|---|
| **URL** | `/blog/how-to-choose-contractor-web-designer` |
| **Title** | How to Choose a Website Designer for Your Contracting Business: 15 Questions to Ask |
| **Meta title** | 15 Questions Before You Hire a Contractor Web Designer |
| **Meta description** | Ask about domain ownership, files, monthly inclusions, cancellation, service pages, SEO, lead delivery, and real mobile examples—before you pay a deposit. |
| **Primary intent** | Vendor selection / risk reduction |
| **Internal links** | `/web-design`, `/pricing`, `/blog/freelancer-vs-agency-vs-subscription-website`, `/blog/monthly-website-vs-own-it`, `/blog/wix-vs-squarespace-vs-managed-website-contractors`, `/portfolio`, `/contact` |

**Outline — 15 questions (group in article)**  
Ownership: Who owns the domain? Who owns the files if I leave?  
Money: What’s monthly vs one-time? What’s excluded? Cancellation / buyout terms?  
Scope: Which service pages are included? Who writes copy / shoots photos?  
SEO: What’s included at launch vs ongoing (quote separately)?  
Leads: How do forms/calls reach me? Review requests? Missed-call text rules?  
Proof: Can I see a real contractor mobile example? Can I see a homepage before a large deposit?  
**Natural mention:** Kinexis free homepage preview in 2 business days, no card; plans Website $97/mo, Lead System $197/mo, Plus $297/mo, Own It $1,497 — details on `/pricing`.

### 6.3 T7 — Quote / estimate form

| Field | Spec |
|---|---|
| **URL** | `/blog/contractor-website-quote-form` |
| **Title** | The Contractor Website Quote Form: What to Ask, What to Remove, and How to Get More Leads |
| **Meta title** | Contractor Website Quote Forms That Get More Leads |
| **Meta description** | Build a short trade-aware estimate form: what to ask, what to cut, and how notifications, follow-up, and call tracking support the form without turning the page into a sales pitch. |
| **Primary intent** | Conversion / form UX for trades |
| **Internal links** | `/blog/turn-clicks-into-calls`, trade pages posts, `/blog/missed-call-text-delayed-10dlc`, `/pricing` (Lead System/Plus tools), `/contact` |

**Outline**
1. Why long forms kill emergency and after-work traffic.  
2. Default field set: name, phone, job type, city/ZIP.  
3. **Trade example — plumbing:** name, phone, service (leak / drain / heater), city/ZIP, optional notes, optional photo.  
4. What to remove: novel-length property surveys, required email, “how did you hear about us” up front.  
5. Emergency vs planned: phone-first vs form-first.  
6. After submit: timeframe honesty; notifications to the phone that actually answers.  
7. Optional tools without pitch tone: review requests, call tracking, missed-call text (carrier approval 10–15 days, not guaranteed; pricing as published).  
8. Tie to pages architecture articles; CTA to preview.

---

## 7. GBP checklist + local SEO expansions (Phase 2)

### 7.1 `/blog/google-business-profile-checklist`
Add a section: **“Plumber not showing in the local pack — checklist”** covering categories, service area vs radius honesty, hours sync with site, website field, services in customer language, photos of real trucks/jobs, review velocity without fake reviews. Cross-link local SEO guide. No new Maps-only URL.

### 7.2 `/blog/local-seo-get-found-get-called`
Add **plumber troubleshooting** subsection: pack presence vs website conversion failure; NAP mismatches; doorway city pages; linking profile ↔ service pages. Keep generic contractor framing elsewhere; use plumbing as the worked example. Expand with more trade examples over time (HVAC peak heat, roofing storms) without splitting into thin clones.

---

## 8. Industry landings: painting & remodeling (Phase 3)

**Repo note (vs older SEO validation wording):** both hubs already exist in `src/data/industries.ts` with **`status: "hold"`** (noindex / out of sitemap until flipped) and full copy shells — not missing files. Owner SEO findings correctly called out the **commercial gap** (no live landers); GSC shows **no painting/remodeling queries** in the 16‑month export yet. Cost + pages posts for both trades are already indexable.  

Execution = promote to **`live`**, verify routes, wire nav/`/industries` index, portfolio proof when ready. Match the live pattern (e.g. plumbing): `primaryKeyword`, meta, H1/mark/sub, intro, problems, services, serviceArea, features, FAQs with **exact** plan prices, related trades, optional `proof` block.

### 8.1 `/industries/painting` (from hold → live)
- **Primary keyword:** website design for painters / painting contractor website design.  
- **Keep/refine existing hub copy:** interior / exterior / cabinets; short estimate form; photo-led proof.  
- **FAQs:** already quote Website $97/mo, Lead System $197/mo, Plus $297/mo, Own It $1,497; cancel / SEO-not-included language — keep aligned with `docs/CONTENT.md`.  
- **Links:** `/blog/painting-website-cost`, `/blog/painting-website-pages`, `/portfolio` examples, `/contact`.  
- **Portfolio:** prefer real paint jobs when available; until then use preview CTA, not stock interiors.

### 8.2 `/industries/remodeling` (from hold → live)
- **Primary keyword:** website design for remodeling contractors.  
- **Keep/refine:** kitchens / baths / consult path; no fake starting prices; `projectSlug` tileline-bath-tile already referenced.  
- **Links:** `/blog/remodeling-website-cost`, `/blog/remodeling-website-pages`, case/portfolio, `/contact`.  
- **Tone:** long-sale, not drain-cleaning urgency.

---

## 9. Research backlog (Phase 4)

| Idea | Action | Gate |
|---|---|---|
| Landscaping leads without paying per lead (US) | Outline only after demand check in KW tool + GSC | Phase 0 data |
| Plumber not on Google Maps | **Do not** new article — T8/T9 | — |
| Original contractor website speed benchmark | Design study method (lab devices, trades’ live URLs); publish only with measured data | Instrumentation + sample list |
| Broad listicles / “examples” roundups | Out of scope; improve `/portfolio` + hubs | — |

---

## 10. Data needed (owner)

| Source | Status | Notes |
|---|---|---|
| GSC Queries + Pages (~16 mo) | **Received** (2026-11-15) | Official: 6 clicks / 6,705 imps. Coverage example URL lists still missing for the 812 not-indexed bucket. |
| Ahrefs | **Partial** — Free plan | **DR 9.0** only. Upgrade needed for Site Explorer / Keywords Explorer / Site Audit (owner paid gate). |
| Keyword Planner / Semrush | Still useful | Optional if Ahrefs stays free. |

**Rule:** Leave volume/KD/CPC as unavailable until a real export. **Never invent** those numbers.

Still useful after Tech-0 ships: Coverage “404 / robots / alternate canonical” example URL exports; fresh 3-month Performance; Pages×Queries if GSC allows.

---

## 11. Writing standard

- Write for a tired owner on a phone: concrete jobs, towns, trucks, forms, hours — not “elevate your brand.”  
- Vary sentence length; prefer specific nouns (panel upgrade, soft wash, double torsion spring) over filler.  
- No stock AI tells: “In today’s digital landscape,” “comprehensive suite,” “leverage,” “unlock,” “it is important to note.”  
- No unverifiable claims (guaranteed rankings, “#1,” invented averages).  
- **Pricing and terms:** copy exactly from `/pricing` / `docs/CONTENT.md` when numbers appear.  
- One job per article; link siblings instead of absorbing their intent.  
- Must read as human-authored; if a paragraph could fit any trade by swapping one noun, rewrite it.

---

## 12. Review checklist (before publish)

- [ ] Primary intent matches ownership map; no clash with `/pricing` for generic cost.  
- [ ] Title / H1 / meta describe the same promise; no clickbait rankings claims.  
- [ ] Internal links to hub, `/pricing` or cost/pages sibling, and one conversion path (`/contact`).  
- [ ] Plan prices and guarantees match `docs/CONTENT.md` character-for-character where quoted.  
- [ ] Trade article includes unique FAQs / examples not reusable on another trade unchanged.  
- [ ] No new doorway city clones; service area stays honest.  
- [ ] Mobile: phone and form tested in the draft preview.  
- [ ] Similarity re-check for rewritten cost/pages pairs (same 5-shingle method) documented.  
- [ ] GSC/KW data referenced only when real exports exist.  
- [ ] Owner sign-off: no delete/noindex/redirect without separate ticket.

---

## 13. Out-of-repo hosts (approved — not this Worker)

### BIMI — `bimi.kinexisdigital.com`
**Not in this repo.** Cloudflare Pages project **`kinexis-card`** (`kinexis-card.pages.dev`), custom domain `bimi.kinexisdigital.com`. DNS CNAME → that Pages project. BIMI TXT: `default._bimi` → `l=https://bimi.kinexisdigital.com/bimi/logo.svg` (keep `/bimi/` crawlable).  
**Owner apply on next Pages deploy:** HTML `<meta name="robots" content="noindex, follow">` + `X-Robots-Tag: noindex, follow` on HTML; `robots.txt`:
```
User-agent: *
Allow: /bimi/
Disallow: /
```

### Connect — `connect.kinexisdigital.com`
**Not in this repo.** GitHub **`WorkTicket/kinexis-connect`**, Cloudflare Worker **`kinexis-connect`** (custom domain). Marketing homepage may stay indexable with canonical; noindex `/login`, `/signup`, `/app/*` (dashboard), plus `robots.txt` Disallow those paths. Owner deploys that app separately.

### Cloudflare Always Use HTTPS
Dashboard only (I1) — owner applies; not code.

## 14. Out of scope without a separate ticket

- Deleting live indexable content.  
- Inventing search volumes or difficulty.  
- Noindexing utilities (`/pay`, `/terms`, …) or `/es` itself.  
- Deploying Connect / BIMI / www from agents.  
- Spanish drafts for new EN posts (see `docs/seo/drafts-es-native-3.md`).
