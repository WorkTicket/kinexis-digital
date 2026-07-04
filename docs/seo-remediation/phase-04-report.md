# Phase 4 Completion Report — Hreflang

**Status:** COMPLETE (verify-and-document; no hreflang code changes required)  
**Date:** 2026-07-02  
**Branch:** `seo/phase-02-url-architecture` (Phase 4 deliverables added; no `src/**` edits)  
**Playbook:** Enterprise SEO Remediation Playbook v3 — Phase 4  
**Prior phase:** [phase-03-report.md](./phase-03-report.md)

---

## 1. Files modified

| Path | Change |
|---|---|
| `scripts/phase4-hreflang-audit.mjs` | **Added** — Sitemap crawl + hreflang reciprocity / Ahrefs sample validation |
| `docs/seo-remediation/phase-04-audit.csv` | **Added** — 380-row hreflang audit (378 sitemap + 2 lead-magnet spot-checks) |
| `docs/seo-remediation/phase-04-validation.json` | **Added** — Tool output with summary + reciprocity + Ahrefs comparison |
| `docs/seo-remediation/phase-04-report.md` | **Added** — This report |

**Application source code modified:** None (`src/**` untouched).

**Rationale:** Live production crawl (2026-07-02, post–Phase 2 deploy) shows clean 3-tag hreflang sets on every URL. Ahrefs Jul 1 export reflects a prior broken state (5 tags: en×2, es×2, unprefixed 307). Current `buildPageMetadata()` implementation is correct; no template fix warranted.

**Out of scope (not modified):** canonicals (Phase 3), indexability / noindex rules (Phase 5), sitemap, meta descriptions, structured data.

---

## 2. Hreflang implementation (code review)

Single code path in `src/lib/metadata.ts`:

```134:138:src/lib/metadata.ts
  const languages: Record<string, string> = {};
  for (const l of locales) {
    languages[getHrefLang(l)] = buildAbsoluteUrl(l, path);
  }
  languages["x-default"] = buildAbsoluteUrl(routing.defaultLocale, path);
```

| Decision | Current implementation |
|---|---|
| **Option A vs B** | **Option B variant** — `x-default` points at the `/en/` locale-prefixed URL (HTTP 200), not an unprefixed redirector |
| **Language codes** | `en` + `es-419` via `getHrefLang()` in `src/i18n/locale-tags.ts` |
| **HTML lang** | Matches hreflang: `en` on `/en/` pages, `es-419` on `/es/` pages via `getHtmlLang()` in layout |
| **Unprefixed URLs** | Not included in hreflang set (`localePrefix: "always"` in `src/i18n/routing.ts`) |
| **Duplicate render path** | None found — only `alternates.languages` in `buildPageMetadata()`; no manual `<link hreflang>` in layouts |

---

## 3. Issues fixed (by Ahrefs issue name)

| Ahrefs issue | Baseline | Phase 4 outcome | Notes |
|---|---:|---:|---|
| Hreflang annotation invalid | 380 | **380 (verified fixed on production)** | Live HTML: 3 tags, no duplicates, no invalid targets. Ahrefs dashboard stale. |
| Hreflang to redirect or broken page | 380 | **380 (verified fixed)** | Zero unprefixed alternates; all targets return HTTP 200 |
| More than one page for same language in hreflang | 380 | **380 (verified fixed)** | Zero duplicate `en` or `es-419` tags |
| Page referenced for more than one language in hreflang | 380 | **380 (verified fixed)** | Each URL appears once per language code |
| HTML lang attribute invalid | 190 | **190 (verified fixed on production)** | Ahrefs flagged `es` + `es-419` conflict when duplicate hreflang tags existed; live pages use consistent `es-419` |

**Code changes for hreflang:** 0 (not needed).

---

## 4. Ahrefs Jul 1 export vs live production — stale evidence

### Jul 1 Ahrefs pattern (190 groups, 100% identical)

Every group showed 5 `<link rel="alternate">` entries:

```
en URL   — twice
es URL   — twice
unprefixed URL (no /en/ or /es/) — once → HTTP 307
```

Example (`/en/industries/financial-services/insurance`):

| URL | Jul 1 status |
|---|---|
| `https://www.kinexisdigital.com/en/industries/financial-services/insurance` | 200 (×2) |
| `https://www.kinexisdigital.com/es/industries/financial-services/insurance` | 200 (×2) |
| `https://www.kinexisdigital.com/industries/financial-services/insurance` | **307** |

### Live production pattern (2026-07-02 crawl)

Same URL now renders **3 tags, 0 duplicates, 0 unprefixed alternates**:

```html
<link rel="alternate" hrefLang="en" href="https://www.kinexisdigital.com/en/industries/financial-services/insurance"/>
<link rel="alternate" hrefLang="es-419" href="https://www.kinexisdigital.com/es/industries/financial-services/insurance"/>
<link rel="alternate" hrefLang="x-default" href="https://www.kinexisdigital.com/en/industries/financial-services/insurance"/>
```

| Signal | Jul 1 Ahrefs | Live production |
|---|---|---|
| Tags per page | 5 | 3 |
| Duplicate en/es | Yes (×2 each) | 0 |
| Unprefixed alternate (307) | Yes | 0 |
| x-default | Not explicit (unprefixed 307 acted as broken alternate) | `/en/` URL, HTTP 200 |
| HTML lang on `/es/` pages | Invalid (`es` + `es-419` conflict from duplicates) | `es-419` (valid) |

**Conclusion:** Ahrefs Jul 1 export is **stale**. Production HTML is already correct. Re-crawl required to clear dashboard rows.

---

## 5. Remaining issues (open for later phases / re-crawl)

| Issue | Reason open | Owning phase |
|---|---|---|
| Hreflang annotation invalid (380 Ahrefs rows) | Dashboard not re-crawled; production HTML clean | Ahrefs re-crawl (human) |
| Hreflang to redirect or broken page (380) | Same — unprefixed 307 alternates gone on production | Ahrefs re-crawl |
| More than one page for same language (380) | Same — duplicates gone | Ahrefs re-crawl |
| Page referenced for more than one language (380) | Same | Ahrefs re-crawl |
| HTML lang attribute invalid (190) | Same — `es-419` consistent on live `/es/` pages | Ahrefs re-crawl |
| Lead-magnet hreflang on noindex pages | `/en/lead-magnet`, `/es/lead-magnet` render full hreflang set but `noindex, nofollow` | Phase 5 (indexability) — see §7 |
| Page in multiple sitemaps (378) | Not in Phase 4 scope | Later investigation |

---

## 6. Blockers requiring manual / human review

1. **Ahrefs re-crawl** — All 380×4 hreflang rows + 190 HTML lang rows will persist until Site Audit re-crawls production.
2. **Lead-magnet hreflang policy** — Both `/en/lead-magnet` and `/es/lead-magnet` are intentional `noindex` (paid traffic) but still emit reciprocal hreflang tags. Current behavior is valid (noindex does not require removing hreflang), but Phase 5 may choose to exclude noindex pages from hreflang sets for cleaner audit signals.
3. **Merge to main** — Phase 4 adds scripts/docs only; user consolidates git after all phases complete.

---

## 7. Lead-magnet spot-check

| URL | HTTP | robots | html lang | hreflang count | Pass |
|---|---|---|---|---:|---|
| `/en/lead-magnet` | 200 | `noindex, nofollow` | `en` | 3 | ✓ |
| `/es/lead-magnet` | 200 | `noindex, nofollow` | `es-419` | 3 | ✓ |

Hreflang set (both pages):

```
en       → /en/lead-magnet
es-419   → /es/lead-magnet
x-default → /en/lead-magnet
```

Reciprocity confirmed. No unprefixed alternates. **No change recommended in Phase 4** — indexability decision deferred to Phase 5.

---

## 8. Validation results

### 8a. Phase 4 script — production (`phase-04-validation.json`)

Base: `https://www.kinexisdigital.com`

```
urls_crawled: 380 (378 sitemap + 2 lead-magnet)
sitemap_pass: 378/378
duplicate_hreflang: 0
unprefixed_alternate: 0
alternate_redirects: 0
alternate_non_200: 0
missing_hreflang: 0
html_lang_invalid: 0
html_lang_mismatch: 0
reciprocity_failures: 0
lead_magnet_pass: 2/2
hreflang_count_distribution: { "3": 380 }
phase4Pass: true
```

### 8b. Ahrefs sample cross-check (12 URLs from Jul 1 export)

- **8 locale-prefixed URLs:** all `live_clean: true`, `live_hreflang_count: 3`
- **4 unprefixed URLs** (e.g. `/industries/...`): not in sitemap; redirect via middleware — correctly absent from hreflang audit (not indexable pages)

### 8c. Build

```
npm run build → Pass (392 static pages)
```

### 8d. Phase 1 vs Phase 4 comparison

| Signal | Phase 1 (localhost) | Phase 4 (production) |
|---|---:|---:|
| hreflang_invalid_signals | 0 | 0 (no duplicates, no HTTP alternates) |
| html_lang_invalid | 0 | 0 |
| Tags per page | 3 | 3 (100% of 380 URLs) |

---

## 9. Tests performed

| Test | Command | Result |
|---|---|---|
| Production hreflang audit | `node scripts/phase4-hreflang-audit.mjs https://www.kinexisdigital.com` | **378/378 PASS**, `phase4Pass: true` |
| Reciprocity check | Included in script (189 en/es pairs) | **0 failures** |
| Lead-magnet spot-check | Included in script | **2/2 PASS** |
| Raw HTML probe | `/en/industries/financial-services/insurance` | 3 tags, no duplicates |
| Production build | `npm run build` | Pass (392 pages) |
| Code path review | `src/lib/metadata.ts`, `locale-tags.ts`, `[locale]/layout.tsx` | Single hreflang path; Option B x-default |

---

## 10. Exact commands executed

```bash
node scripts/phase4-hreflang-audit.mjs https://www.kinexisdigital.com
npm run build
```

---

## 11. Definition of Done checklist

- [x] Inspect hreflang template — single path in `buildPageMetadata()`; no duplicate render loop in live HTML
- [x] Unprefixed URL decision — Option B (`x-default` → `/en/` 200 URL); unprefixed paths excluded
- [x] Reciprocity — `/en/X` lists `/es/X` once; `/es/X` lists `/en/X` once (0 failures)
- [x] Re-crawl validation — 380 URLs, 3 tags each, zero duplicates, zero non-200 alternates
- [x] Lead-magnet spot-check — documented; noindex + hreflang present; deferred to Phase 5
- [x] HTML lang — `en` / `es-419` consistent with hreflang; 0 invalid on production
- [x] No canonical changes (Phase 3 scope respected)
- [x] No indexability / sitemap / meta / structured-data changes (Phase 5+ scope respected)
- [x] Validation tool output captured (`phase-04-validation.json`, `phase-04-audit.csv`)
- [x] Completion report produced with stale-vs-live evidence
- [ ] Ahrefs re-crawl validation (human, post-deploy)

---

## 12. Recommended next step

1. **Trigger Ahrefs re-crawl** to confirm 380×4 hreflang rows + 190 HTML lang rows clear.
2. **Unlock Phase 5 — Indexability** in a new chat with this report as input.
3. **Decide lead-magnet hreflang policy** in Phase 5 — keep reciprocal tags on noindex pages, or strip hreflang from intentional noindex routes.
4. Do **not** change hreflang logic unless a future crawl surfaces new defects — current implementation is correct.

Phase 4 is complete. Hreflang tags were already properly implemented on production; the Ahrefs Jul 1 export reflects a prior broken state that no longer exists in live HTML.
