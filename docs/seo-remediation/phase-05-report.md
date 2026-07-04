# Phase 5 Completion Report — Indexability

**Status:** COMPLETE (verify-and-document; no indexability code changes required)  
**Date:** 2026-07-02  
**Branch:** `seo/phase-02-url-architecture` (Phase 5 deliverables added; no `src/**` edits)  
**Playbook:** Enterprise SEO Remediation Playbook v3 — Phase 5  
**Prior phase:** [phase-04-report.md](./phase-04-report.md)

---

## 1. Files modified

| Path | Change |
|---|---|
| `scripts/phase5-indexability-audit.mjs` | **Added** — Sitemap crawl + Ahrefs noindex sample validation |
| `docs/seo-remediation/phase-05-audit.csv` | **Added** — 380-row indexability audit (378 sitemap + 2 lead-magnet) |
| `docs/seo-remediation/phase-05-validation.json` | **Added** — Tool output with summary + Ahrefs comparison |
| `docs/seo-remediation/phase-05-report.md` | **Added** — This report |

**Application source code modified:** None (`src/**` untouched).

**Rationale:** Live production crawl confirms every sitemap URL is `index, follow` with zero accidental suppressions. The only intentional `noindex, nofollow` pages are `/en/lead-magnet` and `/es/lead-magnet` (paid-traffic landing pages). Ahrefs Jul 1 export rows all map to lead-magnet; no fixes warranted.

**Out of scope (not modified):** canonicals (Phase 3 ✓), hreflang (Phase 4 ✓), internal links (Phase 6), meta descriptions (Phase 7), sitemap structure (Phase 9), structured data.

---

## 2. Indexability implementation (code review)

Single robots directive path in `buildPageMetadata()`:

```143:145:src/lib/metadata.ts
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
```

| Route | `noIndex` | In sitemap | Rationale |
|---|---|---|---|
| All sitemap pages (378 URLs) | `false` (default) | Yes | Intended to rank |
| `/en/lead-magnet`, `/es/lead-magnet` | `true` via `getLeadMagnetMetadata()` | No | Paid-traffic landing page; organic suppression intentional |
| 404 (`not-found.tsx`) | `true` | No | Standard practice; not in sitemap or Ahrefs export |

Lead-magnet metadata entry point:

```120:120:src/lib/static-page-metadata.ts
  return buildPageMetadata({ locale, path: "/lead-magnet", ...meta, noIndex: true });
```

Sitemap exclusion:

```22:23:src/app/sitemap.ts
/** Routes indexed in sitemap — lead-magnet is paid-traffic only (noIndex). */
const sitemapStaticRoutes = staticPageRoutes.filter((path) => path !== "/lead-magnet");
```

`robots.txt` — only `/api/` blocked; all content paths allowed:

```7:11:src/app/robots.ts
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
```

---

## 3. Issues fixed (by Ahrefs issue name)

| Ahrefs issue | Baseline rows | Phase 5 outcome | Notes |
|---|---:|---:|---|
| Noindex page | 3 | **3 (verified intentional on production)** | 2 HTTPS lead-magnet URLs + 1 stale HTTP duplicate row |
| Noindex and nofollow page | 3 | **3 (verified intentional)** | Same 3 URLs; live HTTPS pages correctly `noindex, nofollow` |
| Nofollow page | 3 | **3 (verified intentional)** | Page-level `nofollow` in meta robots on lead-magnet only |
| Page has nofollow outgoing internal links | 3 | **3 (verified expected behavior)** | Meta-level `nofollow` cascades to all outbound links per crawler interpretation; no `rel=nofollow` on individual `<a>` tags |

**Code changes for indexability:** 0 (not needed).

**Accidental noindex on sitemap URLs:** 0 (verified on 378/378 URLs).

---

## 4. Intentional suppressions documented

### Lead-magnet (`/en/lead-magnet`, `/es/lead-magnet`)

| Property | Value |
|---|---|
| Meta robots | `noindex, nofollow` |
| In sitemap | No (filtered in `sitemap.ts`) |
| Hreflang | Full 3-tag set present (Phase 4 verified) |
| Business rationale | Paid-traffic landing page; should not compete in organic search or leak form URLs into the index |
| Human decision | **Option A — keep noindex** (recommended; no change made) |

### 404 pages (`not-found.tsx`)

| Property | Value |
|---|---|
| Meta robots | `noindex` (via `noIndex: true`) |
| In sitemap | No |
| Ahrefs export | Not present |
| Rationale | Standard SEO practice for error pages |

---

## 5. Human decisions — deferred / resolved

| Decision | Options | Phase 5 outcome |
|---|---|---|
| **Lead-magnet noindex** | A: Keep (paid traffic) / B: Remove for organic | **A — keep.** Documented as intentional; no code change. |
| **Hreflang on noindex pages** | Keep / Strip from `noIndex` pages | **Keep.** Valid per spec; reciprocal tags confirmed. No change unless business requests cleaner Ahrefs signals. |
| **Outgoing nofollow on lead-magnet** | Remove page-level nofollow / Keep | **Keep.** Caused by `{ index: false, follow: false }` in meta robots — expected for a suppressed landing page. Do not remove unless lead-magnet becomes indexable. |

---

## 6. Ahrefs Jul 1 export vs live production — stale evidence

All four Phase 5 Ahrefs exports contain the **same 3 unique URLs**:

| URL | Ahrefs Jul 1 | Live production (2026-07-02) |
|---|---|---|
| `https://www.kinexisdigital.com/en/lead-magnet` | noindex, nofollow | `noindex, nofollow` ✓ intentional |
| `https://www.kinexisdigital.com/es/lead-magnet` | noindex, nofollow | `noindex, nofollow` ✓ intentional |
| `http://www.kinexisdigital.com/en/lead-magnet` | noindex, nofollow (HTTP 200) | **301 → HTTPS** ✓ Phase 2 fix; Ahrefs row stale |

| Signal | Jul 1 Ahrefs | Live production |
|---|---|---|
| Accidental noindex on sitemap URLs | 0 (all 3 rows = lead-magnet) | 0 |
| Sitemap URLs with `index, follow` | 378 expected | 378/378 verified |
| HTTP lead-magnet serves 200 | Yes (stale crawl) | 301 → HTTPS |
| robots.txt blocks content | No | No (`/api/` only) |

**Conclusion:** Ahrefs indexability rows reflect **intentional lead-magnet suppression** plus one **stale HTTP duplicate**. Production behavior is correct. Re-crawl will reduce 3 rows per issue type to 2 (HTTPS lead-magnet only); those 2 rows remain expected until business removes noindex.

---

## 7. Outgoing nofollow on lead-magnet — mechanism

Ahrefs flags ~100+ outgoing internal links as nofollow on lead-magnet pages. Live HTML audit shows **0 links with `rel="nofollow"`** on individual anchors — the cascade comes from page-level meta robots:

```
<meta name="robots" content="noindex, nofollow"/>
```

Crawlers (including Ahrefs) treat page-level `nofollow` as applying to all outbound links from that page. This is expected behavior for an intentionally suppressed landing page, not a template bug.

---

## 8. Remaining issues (open for re-crawl / later phases)

| Issue | Reason open | Owning action |
|---|---|---|
| Noindex page (3 Ahrefs rows) | 2 intentional HTTPS lead-magnet + 1 stale HTTP row | Ahrefs re-crawl; 2 rows remain expected |
| Noindex and nofollow page (3) | Same | Ahrefs re-crawl |
| Nofollow page (3) | Same | Ahrefs re-crawl |
| Page has nofollow outgoing internal links (3) | Page-level nofollow on lead-magnet | Expected while lead-magnet stays noindex |
| Lead-magnet hreflang on noindex pages | Valid; documented policy decision | No action unless business opts to strip |
| Page in multiple sitemaps (378) | Not Phase 5 scope | Phase 9 |
| Internal link issues (57 + 300 + 155) | Not Phase 5 scope | Phase 6 |

---

## 9. Blockers requiring manual / human review

1. **Ahrefs re-crawl** — HTTP lead-magnet row will clear after re-crawl; 2 HTTPS lead-magnet rows per issue type will persist (intentional).
2. **Lead-magnet organic indexability** — If the business later wants organic traffic to `/lead-magnet`, removing `noIndex: true` requires explicit approval and would re-open nofollow-outgoing-link rows.
3. **Merge to main** — Phase 5 adds scripts/docs only; user consolidates git after all phases complete.

---

## 10. Validation results

### 10a. Phase 5 script — production (`phase-05-validation.json`)

Base: `https://www.kinexisdigital.com`

```
urls_crawled: 380 (378 sitemap + 2 lead-magnet)
sitemap_indexable_pass: 378/378
accidental_noindex_on_sitemap: 0
unexpected_noindex_count: 0
intentional_noindex_pass: 2/2 (lead-magnet)
indexability_breakdown: { indexable: 378, noindex: 2 }
robots.txt: PASS (disallow /api/ only)
http_lead_magnet_probe: PASS (301 → HTTPS, target noindex preserved)
ahrefs_unique_urls: 3 (all lead-magnet)
ahrefs_live_matches_intent: 2/2 HTTPS URLs
ahrefs_stale_http_rows: 1
phase5Pass: true
```

### 10b. Ahrefs export cross-check

| Export | Row URLs | Maps to lead-magnet only |
|---|---|---|
| Noindex page | 3 | ✓ |
| Noindex and nofollow page | 3 | ✓ |
| Nofollow page | 3 | ✓ |
| Page has nofollow outgoing internal links | 3 | ✓ |

### 10c. Build

```
npm run build → Pass (392 static pages)
```

### 10d. Phase 1 vs Phase 5 comparison

| Signal | Phase 1 (production) | Phase 5 (production) |
|---|---:|---:|
| indexable | 382 | 378 (sitemap-only audit) + 2 intentional noindex |
| noindex | 3 | 2 HTTPS lead-magnet (+ HTTP probe separate) |
| accidental noindex on sitemap | 0 | 0 |
| not_in_sitemap_200 | 3 | 2 (lead-magnet only; HTTP now 301) |

---

## 11. Tests performed

| Test | Command | Result |
|---|---|---|
| Production indexability audit | `node scripts/phase5-indexability-audit.mjs https://www.kinexisdigital.com` | **378/378 sitemap PASS**, `phase5Pass: true` |
| Lead-magnet spot-check | Included in script | **2/2** `noindex, nofollow` |
| HTTP lead-magnet redirect | Included in script | **301 → HTTPS** with noindex preserved |
| robots.txt audit | Included in script | **PASS** — `/api/` only |
| Ahrefs export URL mapping | Included in script | **3/3 URLs = lead-magnet** |
| Production build | `npm run build` | Pass (392 pages) |
| Code path review | `metadata.ts`, `static-page-metadata.ts`, `sitemap.ts`, `robots.ts`, `not-found.tsx` | Two intentional `noIndex` paths only |

---

## 12. Exact commands executed

```bash
node scripts/phase5-indexability-audit.mjs https://www.kinexisdigital.com
npm run build
```

---

## 13. Definition of Done checklist

- [x] Pull exact URLs from Ahrefs exports — all 3 rows per issue = lead-magnet (not accidental noindex elsewhere)
- [x] Diff live meta robots vs intended state — 378/378 sitemap URLs `index, follow`
- [x] Confirm robots.txt — no indexable URL blocked (`/api/` only)
- [x] Confirm sitemap alignment — 378 indexable URLs in sitemap; lead-magnet excluded
- [x] Document intentional suppressions — lead-magnet noindex + rationale explicitly recorded
- [x] HTTP lead-magnet row — verified 301→HTTPS (Phase 2); Ahrefs row stale
- [x] No canonical / hreflang / sitemap / meta / structured-data changes
- [x] Validation tool output captured (`phase-05-validation.json`, `phase-05-audit.csv`)
- [x] Completion report produced with stale-vs-live evidence
- [ ] Ahrefs re-crawl validation (human, post-deploy)

---

## 14. Recommended next step

1. **Trigger Ahrefs re-crawl** — HTTP lead-magnet row will clear; 2 HTTPS lead-magnet rows per issue type remain expected.
2. **Unlock Phase 6 — Internal Linking** in a new chat with this report as input.
3. Do **not** remove lead-magnet noindex unless business explicitly requests organic indexing.
4. Do **not** change indexability logic — current implementation matches intended SEO policy.

Phase 5 is complete. Every page intended to rank is `index, follow`; the only suppressions are documented and intentional.
