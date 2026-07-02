# Phase 10 Report — Performance & Core Web Vitals

**Status:** IN PROGRESS — code complete, deploy + production PSI validation pending  
**Prepared:** 2026-07-02  
**Prior phase:** [phase-09-report.md](./phase-09-report.md) (COMPLETE)  
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

- [ ] Deploy Phase 10 code to production
- [ ] `phase10Pass: true` — CWV green mobile + desktop on 8 priority templates
- [ ] Before/after CWV table in this report (from `phase-10-audit.csv`)
- [ ] Ahrefs slow-page re-export documented

**Stop condition met when CWV pass — no further perf scope creep.**
