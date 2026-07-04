# Ahrefs Jul 2 Crawl — Live Production Reconciliation

**Ahrefs crawl:** 2 Jul 2026, 8:06 PM (Overview PDF)  
**Live verification:** 2 Jul 2026, ~8:14 PM (all phase audit scripts + spot checks)  
**Production:** `https://www.kinexisdigital.com`

---

## Executive summary

The Jul 2 Ahrefs report shows **Health Score 41** and **1,710 errors**. Live production audits show **0 code-fixable failures** across Phases 2–9. The error count in Ahrefs maps exactly to the hreflang cluster (380 × 4 issue types + 190 HTML lang = **1,710**) that was fixed in Phases 3–4 but **not yet reflected** in the Jul 2 Site Audit issue totals (0 change between 5:27 PM and 8:06 PM crawls).

**Expected after Ahrefs re-crawl:** errors drop from ~1,710 → ~0; Health Score should rise sharply (likely 90+).

---

## PDF issue inventory vs live production

| Ahrefs issue (Jul 2 PDF) | Count | Severity | Live status | Action |
|---|---:|---|---|---|
| Hreflang annotation invalid | 380 | Error | **Fixed** — 3 tags/page (en, es-419, x-default) | Re-crawl |
| Hreflang to redirect or broken page | 380 | Error | **Fixed** — no unprefixed alternates | Re-crawl |
| More than one page for same language in hreflang | 380 | Error | **Fixed** — no duplicate langs | Re-crawl |
| Page referenced for more than one language in hreflang | 380 | Error | **Fixed** | Re-crawl |
| HTML lang attribute invalid | 190 | Error | **Fixed** — `es-419` on Spanish pages | Re-crawl |
| 3XX redirect | 195 | Warning | **Expected** — unprefixed legacy paths → `/en/...` | Document |
| Nofollow page | 2 | Warning | **Intentional** — lead-magnet (paid traffic) | Document |
| Noindex page | 2 | Warning | **Intentional** — lead-magnet | Document |
| Noindex and nofollow page | 2 | Warning | **Intentional** — lead-magnet | Document |
| Page has nofollow and dofollow incoming links | 200 | Notice | **Fixed** — phase 6 pass | Re-crawl |
| HTTP to HTTPS redirect | 3 | Notice | **Expected** — scheme upgrade | Document |
| Redirect chain | 1 | Warning | **Fixed** — apex → www/en single 301 hop | Re-crawl |
| Slow page | 8 | Notice | **Improved** — TTFB ~120–650 ms (was 1000–1874 ms) | Re-crawl |
| Pages to submit to IndexNow | 326 | Notice | **Pending** — run `npm run submit:indexnow` | Submit |
| Meta/title tag changed | 214 | Notice | **Informational** — post-deploy content updates | None |

---

## Production audit scorecard (live, Jul 2)

| Phase | Result |
|---|---|
| 2 — URL architecture | **PASS** |
| 3 — Canonicals | **PASS** (378/378 sitemap, 21/21 HTTP probes) |
| 4 — Hreflang | **PASS** (380 URLs, 3 hreflang each, 0 duplicates) |
| 5 — Indexability | **PASS** |
| 6 — Internal links | **PASS** (0 redirect outlinks, 0 mixed inlinks) |
| 7 — Metadata / HTML lang | **PASS** |
| 8 — Structured data | **PASS** |
| 9 — Sitemap / IndexNow config | **PASS** |

---

## Spot-check evidence

**Spanish page** (`/es/locations/cedar-rapids`):
- `html lang="es-419"`
- 3 alternates: `en`, `es-419`, `x-default` (no duplicates, no unprefixed 307 target)

**HTTP duplicate URLs** (Jul 1 slow-page export):
- `http://www.kinexisdigital.com/...` → **301** to HTTPS (no 200 body)

**Apex redirect chain**:
- `https://kinexisdigital.com/` → **301** → `https://www.kinexisdigital.com/en` (1 hop, not 2)

---

## Path to 100% Health Score

1. **Re-crawl in Ahrefs Site Audit** — this is the critical step; issue counts are stale
2. **Run IndexNow submission:** `npm run submit:indexnow`
3. **Accept documented residuals:**
   - 195 unprefixed 3XX redirects (legacy URL support; no internal links point to them)
   - 2 lead-magnet noindex/nofollow pages (intentional paid-traffic landing pages)
   - Slow-page notices may drop further as TTFB improvements propagate

---

## Commands to re-verify anytime

```bash
node scripts/phase3-canonical-audit.mjs https://www.kinexisdigital.com
node scripts/phase4-hreflang-audit.mjs https://www.kinexisdigital.com
node scripts/phase5-indexability-audit.mjs https://www.kinexisdigital.com
node scripts/phase6-internal-links-audit.mjs https://www.kinexisdigital.com
node scripts/phase7-metadata-audit.mjs https://www.kinexisdigital.com
node scripts/phase8-structured-data-audit.mjs https://www.kinexisdigital.com
npm run audit:phase9
npm run submit:indexnow
```
