# Phase 10 Completion Report — Performance & Core Web Vitals

**Status:** PSI CONFIRMED — mobile LCP residual documented  
**Date:** 2026-07-03  
**Deploy version:** `6f342678-6461-4944-b2e0-dceac1778f03` (font preload + deferred weight 500)  
**Prior deploy:** `fef00006-0efd-4ec6-9d01-5f8a8e4daeb2` (SSR hero shell)  
**Playbook:** Enterprise SEO Remediation Playbook v3 — Phase 10  
**Prior phase:** [phase-09-report.md](./phase-09-report.md)

---

## Outcome

| Check | Baseline (Ahrefs Jul 1) | Post-deploy |
|---|---|---|
| Slow page rows | 34 | **Ahrefs re-crawl — human** (expect HTTP dupes cleared) |
| Service First Load JS | ~437 kB | **292 kB** |
| Homepage First Load JS | — | **295 kB** |
| TTFB (warm fetch samples) | 1000–1874 ms | **108–319 ms** |
| HTTP www dupes (sampled 4/14) | 200 on http://www | **301 → HTTPS www** |
| SSR hero in HTML | Client hydration | **`hero--ssr` + `hero__subtitle` in initial HTML** |
| Phase 9 regression | — | **phase9Pass: true** (378/378) |
| Lab LCP mobile (local Lighthouse) | 3.7 s / 4.7 s | Service **2.0 s** local build post-SSR |
| PSI desktop (8 priority templates) | Not run | **8/8 pass** (LCP 0.7–1.3 s) |
| PSI mobile (8 priority templates) | Not run | **0/8 pass** — LCP 2.9–5.1 s |
| **`phase10Pass`** | — | **false** (mobile LCP; homepage CLS 0.15) |
| **`phase10CodeComplete`** | — | **true** |

**Close rationale:** Ahrefs-addressable fixes deployed (TTFB, bundle, SSR hero, HTTP redirects). PSI confirms desktop CWV pass and mobile LCP gap is render/JS-bound, not server latency. Document residual mobile CWV in Phase 11; do not block on further perf refactors per playbook stop condition unless Ahrefs re-crawl regresses.

### PSI mobile LCP (priority templates)

| Template | LCP | CWV issues |
|---|---:|---|
| solution | 2.9 s | lcp |
| industry_detail | 3.4 s | lcp |
| blog_post | 3.7 s | lcp |
| service_heavy | 3.8 s | lcp |
| homepage | 3.9 s | lcp, cls 0.15 |
| service | 3.9 s | lcp |
| location_service | 4.0 s | lcp |
| location_city | 4.3 s | lcp |
| contact | 5.1 s | lcp |

---

## Issues addressed (Ahrefs)

| Ahrefs issue | Baseline | Fix |
|---|---:|---|
| Slow page — service template JS | 5 HTTPS rows | Server/client split + lazy hero viz → **295 kB First Load JS** |
| Slow page — HTTPS TTFB ~1–1.5 s | 20 rows | Code deploy; post-deploy fetch **128–336 ms** |
| Slow page — HTTP www dupes | 14 rows | **Verify on re-crawl** — 301 live; human to re-export |

---

## Files modified / added

| Path | Change |
|---|---|
| `src/components/sections/HeroShell.tsx` | Server-rendered homepage hero (LCP) |
| `src/components/shared/services/ServiceHeroShell.tsx` | Server-rendered service hero (LCP) |
| `src/components/ui/HeroBreadcrumbsStatic.tsx` | Server breadcrumbs |
| `src/components/ui/HeroCtaLinks.tsx` | Server CTA links |
| `src/components/ui/HeroShellDecorations.tsx` | Shared hero backgrounds |
| `src/lib/service-page-props.ts` | Server-side page data builder |
| `src/lib/create-architected-service-page.tsx` | Renders ServiceHeroShell on server |
| `src/components/services/ServicePage.tsx` | Hero removed from client bundle |
| `src/components/services/hero-viz/lazy/*.tsx` | 12 lazy viz wrappers |
| `src/components/services/service-hero-visualizations.tsx` | Per-slug dynamic imports |
| `src/components/analytics/AnalyticsScripts.tsx` | GTM → `lazyOnload` |
| `src/components/ui/HeroBackdrop.tsx` | Removed `"use client"` (presentational) |
| `scripts/phase10-performance-audit.mjs` | PSI + Ahrefs cross-ref audit |
| `package.json` | `audit:phase10` script |

Removed unused: `SeoPageClient`, `GoogleAdsPageClient`, `MetaAdsPageClient`, `WebDesignPageClient`.

---

## Intentional / deferred (not blocking Phase 10 close)

| Item | Owner | Notes |
|---|---|---|
| PSI CWV mobile | Residual | 0/8 priority pass — JS render bound; not TTFB |
| Ahrefs slow-page re-export | **Human** | Re-crawl after deploy; expect 14 HTTP rows gone |
| Third-party scripts | Documented | GTM/Clarity consent-gated + deferred load |
| Cloudflare HTML cache | Phase 11 / infra | Only if Ahrefs TTFB still >1 s after re-crawl |

---

## Validation commands run

```bash
npm run build
npm run deploy                                    # fef00006 (SSR hero shell)
npm run audit:phase9                              # phase9Pass: true
node scripts/phase10-performance-audit.mjs --save-json   # 20 PSI runs — desktop 8/8 pass, mobile 0/8
```

---

## Next phase

→ [phase-11-handoff.md](./phase-11-handoff.md) — final validation & Ahrefs health reconciliation

**Do not regress:** Phases 3–9 (canonicals, hreflang, robots, links, meta, schema, sitemap).
