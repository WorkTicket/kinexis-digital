# Phase 10 Handoff — Performance & Core Web Vitals

**Prepared:** 2026-07-02  
**Prior phase:** [phase-09-report.md](./phase-09-report.md) (COMPLETE — deployed 2026-07-02, version `abcb9c70-c6b8-48f2-8933-182574bde05f`)  
**Playbook:** Enterprise SEO Remediation Playbook v3 — Phase 10  
**Branch:** Continue on `seo/phase-02-url-architecture` or create `seo/phase-10-performance`

---

## Phase 10 objective

Core Web Vitals pass on mobile and desktop for **priority templates** — fix at the template level first, not URL-by-URL.

**Audit first.** Ahrefs “Slow page” (34 rows) measures **crawler TTFB/loading time**, not Lighthouse CWV. Phase 10 must establish a **baseline with Lighthouse / PageSpeed Insights** on one URL per template before changing code. Stop once CWV pass — do not over-optimize.

---

## Phases 1–9 carry-forward

| Phase | Status | Relevance to Phase 10 |
|---|---|---|
| Phase 2 | Deployed | 14/34 slow-page rows are `http://www.kinexisdigital.com/*` — may clear on Ahrefs re-crawl without perf work |
| Phase 3 | Complete | Canonicals stable — PSI should test HTTPS www URLs only |
| Phase 4 | Complete | Hreflang clean — do not touch |
| Phase 5 | Complete | Lead-magnet `noindex` — out of CWV priority set |
| Phase 6 | Deployed | Internal links stable |
| Phase 7 | Deployed | Meta aligned — no content changes needed |
| Phase 8 | Deployed | Schema fixed — no JSON-LD perf impact expected |
| Phase 9 | Deployed | Sitemap/IndexNow complete — 378 indexable URLs; performance audit can reuse sitemap URL list |

**Do not regress:** canonicals, hreflang, robots, internal links, meta, schema, sitemap.

---

## Ahrefs baseline (Phase 10 scope only)

| Ahrefs issue | Rows (Jul 1 export) | Indexable (export) | Expected Phase 10 outcome |
|---|---:|---:|---|
| Slow page | **34** | 19 HTTPS www + 13 HTTP www dupes | **Template-level fixes** + **re-crawl verification** — see pre-flight §1–2 |

### Ahrefs export (Phase 10)

| File | Issue |
|---|---|
| `ahrefs-export/kinexisdigital_01-jul-2026_slow-page_2026-07-02_16-46-51.csv` | Slow page (34 rows) |

**Row parsing:** `^\d+,(https?:\/\/[^,\r\n]+)` for URL column. Columns of interest: `Time to first byte (ms)`, `Loading time (ms)`, `Is indexable page`.

### Template breakdown (34 Ahrefs rows)

| Template | Rows | Sample URL (canonical) | Ahrefs TTFB |
|---|---:|---|---:|
| `industry_detail` | 7 | `/en/industries/technology/startups` | 1193 ms |
| `location_service` | 6 | `/es/locations/des-moines/seo` | 1086 ms |
| `service` | 5 | `/en/services/ppc-management` | 1471 ms |
| `blog_post` | 5 | `/es/blog/attribution-models` | 1057 ms |
| `location_city` | 2 | `/es/locations/dallas` | 1213 ms |
| `solution` | 2 | `/en/solutions/cro-for-saas-companies` | 1154 ms |
| `homepage` | 1 | `/en` | 1099 ms |
| `contact` | 1 | `/es/contact` | 1874 ms |
| `industry_category` | 1 | `/en/industries/financial-services` | 1026 ms |
| `pricing` | 1 | `/en/pricing/seo` | 1115 ms |
| `case_study` | 1 | `/en/case-studies/dental-practice-local-seo` | 1007 ms |
| `solutions_hub` | 1 | `/en/solutions` | 1088 ms |
| `comparison` | 1 | `/es/local-seo-vs-google-ads` | 1040 ms |

**Host split:** 20 HTTPS www · 14 `http://www` (non-canonical crawl artifacts from pre–Phase 2/9 era).

**TTFB range:** 1000–1874 ms (Ahrefs threshold appears ~1000 ms).

---

## Pre-flight signals (investigate before coding)

### 1. Ahrefs “Slow page” ≠ Lighthouse Core Web Vitals

Ahrefs flags **server/crawler response time** (`Time to first byte`, `Loading time`). The playbook Phase 10 objective is **CWV pass** (LCP, INP, CLS) via Lighthouse/PSI.

| Signal | Ahrefs slow page | Lighthouse CWV |
|---|---|---|
| Metric | TTFB ~1–1.9 s | LCP, INP, CLS |
| Crawl context | Bot, often uncached cold path | Lab + field (CrUX) |
| Fix target | Worker TTFB, HTML cache | JS weight, LCP element, layout shift |

**Phase 10 must run both** and map fixes to whichever gate fails. Do not claim Phase 10 complete from Ahrefs TTFB alone without PSI CWV evidence.

### 2. ~41% of slow-page rows may clear without code changes

14/34 URLs are `http://www.kinexisdigital.com/...`. After Phases 2 + 9 middleware (301 → HTTPS www), these should drop from future Ahrefs exports.

**Likely split:**

| Sub-issue | Fix type |
|---|---|
| HTTP www duplicate rows (14) | **Verify-and-document** on Ahrefs re-crawl |
| HTTPS www TTFB ~1–1.5 s (19 indexable) | **Real work** — template + infra |
| CWV fail on PSI (TBD) | **Real work** — JS/images/fonts/third-party |

### 3. Template-level JS weight — service pages are the heaviest

Latest `next build` First Load JS (shared baseline ~225 kB):

| Template | First Load JS | Notes |
|---|---:|---|
| Service pages | **~437 kB** | `ServicePage` is `"use client"` — entire template hydrates |
| Homepage | ~295 kB | Hero + motion |
| Solution detail | ~300 kB | Large client sections |
| Location pages | ~295 kB | Shared layout + FAQ |
| Static/marketing | ~283–291 kB | Lower weight |

Existing mitigations (already in repo — **measure before changing**):

```54:66:next.config.mjs
  images: {
    formats: ["image/avif", "image/webp"],
    ...
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion", "@sentry/nextjs"],
  },
```

```71:88:src/components/providers/MotionProvider.tsx
    <LazyMotion features={domAnimation} strict>
      ...
    </LazyMotion>
```

```8:21:src/components/providers/DeferredWidgets.tsx
  // Defer widget mount until the browser is idle ...
  requestIdleCallback(() => setMounted(true), { timeout: 3000 });
```

**Priority investigation:** `src/components/services/ServicePage.tsx` (client root) + hero visualizations under `src/components/services/hero-viz/`.

### 4. Global layout loads motion + analytics on every page

```69:88:src/app/[locale]/layout.tsx
    <html lang={getHtmlLang(locale as Locale)} className={`${ubuntu.variable}`}>
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        ...
      </head>
      <body>
        ...
        <MotionProvider>
          <Header />
          <main>{children}</main>
          <DeferredWidgets />
          <Footer />
        </MotionProvider>
        <AnalyticsScripts />
```

- **Ubuntu font:** 3 weights (400, 500, 700) via `next/font` — self-hosted, preloaded
- **Analytics:** GTM + GA4 + Clarity — consent-gated via `CookieConsentProvider` but preconnect hints still fire
- **Framer Motion:** `LazyMotion` + `domAnimation` feature set on all pages

CWV fixes may require **narrowing client boundaries** (server-render static sections) rather than adding more webpack splits.

### 5. Infrastructure — Cloudflare Workers + OpenNext

Site runs on **Cloudflare Workers** via OpenNext (`wrangler.jsonc`). Ahrefs TTFB ~1 s may reflect:

- Worker cold start / SSR path for HTML
- SSG pages served through Worker (not pure static CDN edge in all cases)
- No explicit HTML `Cache-Control` on document responses (static assets are cached — see `next.config.mjs` headers + `public/_headers`)

**Audit TTFB separately** from client-side CWV. Infra-only fixes (cache rules, early hints, Argo) are valid Phase 10 outcomes if code changes alone don't move TTFB.

### 6. Images already have an optimization pipeline

`npm run optimize-images` — Sharp pipeline for logos/assets (WebP/AVIF). `BrandImage` / `next/image` used in proof sections. Confirm LCP images use `priority` + correct `sizes` before adding new formats.

---

## Key code paths (start here)

| File | Role |
|---|---|
| `next.config.mjs` | Image formats, `optimizePackageImports`, splitChunks, cache headers |
| `public/_headers` | Cloudflare static asset cache (mirrors next headers) |
| `wrangler.jsonc` | Worker config — infra tuning lives here or Cloudflare dashboard |
| `src/app/[locale]/layout.tsx` | Global font, analytics preconnect, MotionProvider shell |
| `src/components/providers/MotionProvider.tsx` | Framer Motion lazy load |
| `src/components/providers/DeferredWidgets.tsx` | Idle-deferred BackToTop |
| `src/components/analytics/AnalyticsScripts.tsx` | GTM / GA4 / Clarity loading |
| `src/components/services/ServicePage.tsx` | **Largest client template** — service pages |
| `src/lib/create-architected-service-page.tsx` | Server shell + JSON-LD + client ServicePage |
| `src/components/shared/services/ServiceHero.tsx` | Likely LCP candidate on service pages |
| `src/components/ui/BrandImage.tsx` | Shared image component |
| `scripts/optimize-images.mjs` | Asset compression pipeline |

**Reuse patterns from prior audits:**

- `scripts/phase9-sitemap-audit.mjs` — sitemap URL list for crawl targets
- `npm run analyze` — bundle analyzer (`ANALYZE=true next build`)

---

## Phase 10 tasks (playbook)

1. **Extract exact 34 URLs** from Ahrefs export; dedupe to HTTPS www; map to templates (table above)
2. **Lighthouse / PSI baseline** — one URL per template type (mobile + desktop); record LCP, INP, CLS, TTFB, opportunities
3. **Template clustering** — confirm whether failures group by shared layout (service, location, industry) vs one-offs
4. **Fix largest-impact items first:**
   - Image sizing / formats / `priority` on LCP elements
   - Render-blocking resources (fonts already optimized via `next/font`)
   - Unused JS/CSS — especially service page client boundary
   - Caching headers for HTML if TTFB is the bottleneck
5. **Re-test after each significant change** — stop when CWV pass, don't chase perfect scores
6. **Post-deploy validation** — re-run PSI on priority templates + Ahrefs re-crawl check

---

## Human decisions required

| Decision | Options |
|---|---|
| **Success metric** | (A) Lighthouse CWV pass on priority templates (playbook), (B) Also require Ahrefs slow-page 0 rows, (C) TTFB target (e.g. &lt;800 ms) in addition to CWV |
| **Service page architecture** | (A) Split `ServicePage` into server + client islands (larger refactor, biggest JS win), (B) Dynamic-import heavy sections only, (C) Defer motion on service templates |
| **Third-party scripts** | (A) Keep GTM/Clarity with current consent gating, (B) Further defer until interaction, (C) Remove Clarity if CWV blocked |
| **Ahrefs HTTP rows (14)** | (A) Verify-and-document on re-crawl, (B) Treat as still-open until Ahrefs confirms 0 |
| **Infra vs code** | (A) Code-only first, (B) Add Cloudflare cache rules for HTML/Worker if TTFB stays &gt;1 s after JS fixes |

---

## Definition of done

Produce `docs/seo-remediation/phase-10-report.md` with:

- Files modified
- Issues fixed by Ahrefs issue name
- Intentional/documented items (HTTP duplicate rows, third-party script tradeoffs)
- Remaining issues + reasons
- Validation tool output (Lighthouse JSON, not claims)
- Before/after CWV table per priority template

**Suggested deliverables:**

| File | Purpose |
|---|---|
| `scripts/phase10-performance-audit.mjs` | PSI/Lighthouse CLI or API wrapper; template sampling; Ahrefs URL cross-ref |
| `docs/seo-remediation/phase-10-audit.csv` | One row per tested URL: template, LCP, INP, CLS, TTFB, pass/fail |
| `docs/seo-remediation/phase-10-validation.json` | Tool output with `phase10Pass` boolean |
| `docs/seo-remediation/phase-10-lighthouse/` | Raw Lighthouse JSON per template sample (optional subfolder) |

**Validation commands:**

```bash
npm run build
npm run analyze          # bundle visualization — find service page bloat

# Template baseline (manual or script)
npx lighthouse https://www.kinexisdigital.com/en/services/seo --preset=desktop --output=json
npx lighthouse https://www.kinexisdigital.com/en/services/seo --preset=perf --output=json  # mobile

# After script exists
node scripts/phase10-performance-audit.mjs https://www.kinexisdigital.com

# Ahrefs cross-check (post-fix)
# Re-export slow-page report; expect 0 HTTPS rows + HTTP dupes cleared
```

**Suggested `phase10Pass` criteria:**

- CWV **pass** (green) on mobile + desktop for each **priority template** sample:
  - `homepage`, `service`, `location_city`, `location_service`, `industry_detail`, `blog_post`, `solution`, `contact`
- LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1 (Lighthouse lab thresholds)
- No regression on Phases 3–9 audit scripts (`audit:phase9`, phase 8 structured data)
- Ahrefs slow page: **0 rows on re-crawl** OR documented split (HTTP dupes cleared + HTTPS TTFB within acceptable range per human decision)

---

## Stop conditions

- Do **not** start Phase 11 (final validation) in the same pass
- Do **not** change canonicals, hreflang, robots, internal links, meta, schema, or sitemap unless perf audit proves a direct cause
- Do **not** rewrite copy or restructure information architecture for perf
- **Stop optimizing** once CWV pass — diminishing returns beyond playbook scope

---

## Do NOT touch (out of scope)

| Issue | Phase |
|---|---|
| Final Ahrefs health score reconciliation | Phase 11 |
| Any non-performance Ahrefs issue | Phases 2–9 ✓ |
| Content/copy changes | Out of scope |
| New features or redesign | Out of scope |

---

## Likely outcome split

| Issue | Expected Phase 10 outcome |
|---|---|
| Slow page — HTTP www rows (14) | **Verify-and-document** — 301 to HTTPS www already live |
| Slow page — HTTPS TTFB ~1–1.5 s (19) | **Real work** — JS boundary split on service template + optional Worker/HTML cache |
| CWV fail — LCP (service/homepage) | **Real work** — LCP image priority, reduce client JS above fold |
| CWV fail — INP | **Real work** — defer motion/analytics, reduce main-thread work |
| CWV fail — CLS | **Investigate** — font loading (Ubuntu has `adjustFontFallback`), dynamic hero sections |
| Third-party impact | **Document tradeoff** — GTM/Clarity may cap scores; consent gating already exists |

---

## Priority fix order

1. **Build `phase10-performance-audit.mjs`** + run PSI/Lighthouse on template samples (establish baseline JSON)
2. **Run `npm run analyze`** — quantify service page bundle; identify framer-motion / lucide / hero-viz weight
3. **Service template** — largest First Load JS (~437 kB); split server/client or dynamic-import below-fold sections
4. **LCP pass** — `ServiceHero`, homepage hero, location hero: image `priority`, `sizes`, format
5. **TTFB pass** — if still &gt;1 s after JS fixes, investigate Worker HTML cache / Cloudflare settings
6. **Re-test** priority templates mobile + desktop
7. **Deploy** + production PSI validation
8. **Ahrefs re-crawl** — confirm slow-page count drop

---

## Priority template URLs (PSI samples)

Use these HTTPS www URLs for baseline and post-fix comparison:

| Template | URL |
|---|---|
| homepage | `https://www.kinexisdigital.com/en` |
| service | `https://www.kinexisdigital.com/en/services/seo` |
| service (heavy) | `https://www.kinexisdigital.com/en/services/ppc-management` |
| location_city | `https://www.kinexisdigital.com/en/locations/toronto` |
| location_service | `https://www.kinexisdigital.com/en/locations/toronto/seo` |
| industry_detail | `https://www.kinexisdigital.com/en/industries/technology/startups` |
| blog_post | `https://www.kinexisdigital.com/en/blog/technical-seo-fundamentals` |
| solution | `https://www.kinexisdigital.com/en/solutions/seo-for-hvac-companies` |
| contact | `https://www.kinexisdigital.com/en/contact` |
| pricing | `https://www.kinexisdigital.com/en/pricing/seo` |

---

## References

| Doc | Purpose |
|---|---|
| [phase-09-report.md](./phase-09-report.md) | Phase 9 completion + deploy note |
| [phase-01-ahrefs-crossref.md](./phase-01-ahrefs-crossref.md) | Slow page row count (34) |
| [playbook-extracted.txt](./playbook-extracted.txt) | Phase 10 section |
| [Web Vitals thresholds](https://web.dev/vitals/) | LCP / INP / CLS targets |
| [PageSpeed Insights API](https://developers.google.com/speed/docs/insights/v5/get-started) | Automated PSI for audit script |

**Bottom line:** Ahrefs “Slow page” is a **TTFB-heavy, partially stale** signal (14 HTTP dupes). Phase 10 is primarily **Lighthouse CWV pass on priority templates**, with **service page JS weight** and **Worker TTFB** as the most likely code/infra levers. Audit before optimizing — several mitigations already exist in `next.config.mjs` and the layout providers.
