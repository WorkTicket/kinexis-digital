# Phase 10 Report — Performance & Core Web Vitals

**Status:** DEPLOYED — CWV pending PSI confirmation; TTFB/bundle targets met  
**Prepared:** 2026-07-02  
**Deployed:** 2026-07-03 — version `8bf140cc-6da8-4782-80bb-59807079cefb` (LCP hero fix)  
**Prior deploy:** `605f4249-499f-423c-88e7-e4ad5808d11b` (Phase 10 bundle split)  
**Branch:** `seo/phase-02-url-architecture` (continue here or `seo/phase-10-performance`)

---

## Objective

Core Web Vitals pass on priority templates (Lighthouse/PSI), fixing at the **template level** — not URL-by-URL.

---

## Human decisions (defaults applied)

| Decision | Choice | Rationale |
|---|---|---|
| Success metric | **(A) Lighthouse CWV pass** on priority templates | Playbook default; Ahrefs slow-page tracked separately |
| Service page architecture | **(A) Server/client split** — data built on server, client renders only | Biggest bundle win: 437 kB → 295 kB First Load JS |
| Third-party scripts | **(B) Defer analytics** — GTM/GA4 moved to `lazyOnload` | Reduces main-thread work; Clarity already consent-gated |
| Ahrefs HTTP rows (14) | **(A) Verify-and-document** on re-crawl | Phases 2+9 middleware already 301 → HTTPS www |
| Infra vs code | **(A) Code first** | TTFB may still need Worker/HTML cache if >1 s post-deploy |

---

## Ahrefs baseline (Jul 1 export)

| Metric | Value |
|---|---:|
| Slow page rows | 34 |
| HTTPS www (real work) | 20 |
| HTTP www dupes (verify on re-crawl) | 14 |
| TTFB range | 1000–1874 ms |

**Template breakdown:** industry_detail (7), location_service (6), service (5), blog_post (5), others (11).

14 HTTP `http://www.*` rows expected to clear without further code — middleware 301s live since Phase 9.

---

## Code changes

### 1. Service page server/client split (largest win)

| File | Change |
|---|---|
| `src/lib/service-page-props.ts` | **New** — builds page data, breadcrumbs, related links on server |
| `src/lib/create-architected-service-page.tsx` | Passes server props to `ServicePage`; no duplicate client data build |
| `src/components/services/ServicePage.tsx` | Accepts server props; removed client imports of `buildServicePageData`, link registries, `useServicePageSeo` |

**Result:** Service pages First Load JS **437 kB → 295 kB** (−142 kB, −32%), matching homepage/location templates.

### 2. Hero visualization code splitting

| File | Change |
|---|---|
| `src/components/services/hero-viz/lazy/*.tsx` | **12 new** lazy wrappers — one chunk per viz type, content co-located |
| `src/components/services/service-hero-visualizations.tsx` | `dynamic()` imports per viz; removed 13 static viz + 10 content imports from main graph |

Only the viz for the current service slug loads on first paint.

### 3. Below-fold dynamic imports (ServicePage)

Dynamically imported: `AnswerBlock`, `ComparisonTable`, `ProofSection`, `ResultsSection`, `ServiceCTA`, `ServiceFAQSection`, `RelatedLinks`, `WebDesignDeviceMockupsSection`.

Above-fold kept synchronous: `ServiceHero`, `ServiceOverview`, `WhyKinexusSection`, `ProcessSection`, `DeliverablesSection`, `ServicePricingTeaser`, `ServiceSection`.

### 4. Analytics deferral

| File | Change |
|---|---|
| `src/components/analytics/AnalyticsScripts.tsx` | GTM consent + config scripts: `afterInteractive` → `lazyOnload` |

### 5. Audit tooling

| File | Change |
|---|---|
| `scripts/phase10-performance-audit.mjs` | **New** — PSI API wrapper, Ahrefs cross-ref, CSV + validation JSON |
| `package.json` | Added `audit:phase10` script |

Flags: `--quick` (priority templates, mobile only), `--save-json` (raw Lighthouse JSON).

### 6. Cleanup

Removed unused dead wrappers: `SeoPageClient`, `GoogleAdsPageClient`, `MetaAdsPageClient`, `WebDesignPageClient` (not referenced by any route).

---

## Bundle size (local `next build`)

| Template | Before | After |
|---|---:|---:|
| Service pages | ~437 kB | **295 kB** |
| Homepage | ~295 kB | 295 kB (unchanged) |
| Location pages | ~296 kB | 296 kB (unchanged) |
| Shared baseline | ~225 kB | 226 kB |

---

### 7. LCP hero fix (second deploy)

| File | Change |
|---|---|
| `src/components/sections/Hero.tsx` | `initial={false}` on hero stagger — headline/subtitle visible without fade-in delay |
| `src/components/ui/HeroArchetype.tsx` | Same for all page hero archetypes |

**Lighthouse lab mobile (post second deploy):**

| URL | LCP | CLS | Pass |
|---|---:|---:|---|
| `/en/services/seo` | 3.7 s | 0.000 | LCP fail |
| `/en` | 4.7 s | 0.018 | LCP fail |

LCP element remains `p.hero__subtitle` — client hydration still gates paint (~150 ms TTFB + ~3.5 s JS). Further pass likely needs server-rendered hero HTML (Phase 10 follow-up if PSI confirms).

---

## Post-deploy validation (2026-07-03)

| Check | Result |
|---|---|
| Deploy version | `8bf140cc-6da8-4782-80bb-59807079cefb` |
| `npm run audit:phase9` | **phase9Pass: true** (378/378) |
| Service First Load JS | **295 kB** (was 437 kB) |
| TTFB (fetch, 10 templates) | **128–336 ms** (Ahrefs threshold ~1000 ms) |
| HTTP www dupes (sample 4/14) | **301 → HTTPS www** |
| PSI API | **429 quota exceeded** |
| Lighthouse lab mobile LCP | **Still >2.5 s** on homepage + service |
| `phase10Pass` | **false** — CWV not confirmed; TTFB/bundle pass |

---

## Regression check

| Audit | Result |
|---|---|
| `npm run audit:phase9` | **phase9Pass: true** (post-build, 378/378 sitemap) |

Phases 3–9 artifacts untouched: canonicals, hreflang, robots, meta, schema, sitemap.

---

## PSI baseline (production — pre-deploy)

> Production still serves pre-Phase-10 bundle (`abcb9c70`). Baseline documents current live state before deploy.

Run: `node scripts/phase10-performance-audit.mjs --quick --save-json`

Output: `phase-10-audit.csv`, `phase-10-validation.json`, `phase-10-lighthouse/`

**2026-07-02 run:** PSI API returned **HTTP 429** (daily quota exceeded on unauthenticated endpoint). Audit script recorded failures with `psi_quota_exceeded: true`. Re-run after quota reset, or pass `GOOGLE_PSI_API_KEY` env var for authenticated requests.

Manual fallback:

```bash
npx lighthouse https://www.kinexisdigital.com/en/services/seo --preset=perf --output=json
npx lighthouse https://www.kinexisdigital.com/en/services/seo --preset=desktop --output=json
```

**Post-deploy:** Re-run full audit (mobile + desktop, all template samples):

```bash
node scripts/phase10-performance-audit.mjs --save-json
```

---

## Remaining / intentional

| Item | Status | Reason |
|---|---|---|
| Ahrefs slow page — HTTP dupes (14) | Document | Expect 0 on re-crawl after Phase 9 middleware |
| Ahrefs TTFB ~1–1.5 s on HTTPS | Monitor post-deploy | May need Cloudflare HTML cache if PSI TTFB still >1 s after JS fix |
| Third-party script tradeoff | Documented | GTM/Clarity remain; consent-gated; deferred load |
| Phase 11 | **Not started** | Stop condition: CWV pass first |

---

## Deploy checklist

1. `npm run build` — confirm service pages ~295 kB
2. `npm run audit:phase9` — phase9Pass: true
3. Deploy to Cloudflare Workers
4. `node scripts/phase10-performance-audit.mjs --save-json` against production
5. Confirm `phase10Pass: true` in `phase-10-validation.json`
6. Ahrefs re-crawl — confirm slow-page count drop (HTTP dupes + HTTPS TTFB)

---

## Definition of done (remaining)

- [x] Deploy Phase 10 code to production
- [ ] `phase10Pass: true` — CWV green mobile + desktop on 8 priority templates (blocked: PSI quota; lab LCP still high)
- [x] Before/after bundle table (437 → 295 kB service pages)
- [x] TTFB post-deploy table (128–336 ms)
- [ ] Ahrefs slow-page re-export documented

**To close Phase 10:** Set `GOOGLE_PSI_API_KEY` and run `node scripts/phase10-performance-audit.mjs --save-json`, or manual PSI on priority URLs. If mobile LCP still fails, server-render hero shell without client hydration gate.
