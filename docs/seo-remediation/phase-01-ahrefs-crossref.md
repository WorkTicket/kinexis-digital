# Phase 1 — Ahrefs Export Cross-Reference

Generated: 2026-07-02T21:48:00.408Z

**Blocker status:** Row-level Ahrefs exports are now in `docs/seo-remediation/ahrefs-export/` (26 CSV files).

## Issue counts vs playbook baseline

| Issue | Ahrefs rows | Playbook baseline | Match |
|---|---:|---:|---|
| 3XX redirect | 200 | 200 | Yes |
| Canonical from HTTP to HTTPS | 190 | 190 | Yes |
| Hreflang annotation invalid | 380 | 380 | Yes |
| Hreflang to redirect or broken page | 380 | 380 | Yes |
| HTML lang attribute invalid | 190 | 190 | Yes |
| HTTP to HTTPS redirect | 1 | 1 | Yes |
| Meta description too short (not indexable) | 90 | 42 | No |
| Meta description too short | 42 | — | — |
| Meta description too short (indexable) | 42 | 90 | No |
| More than one page for same language in hreflang | 380 | 380 | Yes |
| Nofollow page | 3 | 3 | Yes |
| Noindex and nofollow page | 3 | 3 | Yes |
| Noindex page | 3 | 3 | Yes |
| kinexisdigital_01-jul-2026_page-has-links-to_2026-07-02_16-41-17.csv | 38 | — | — |
| kinexisdigital_01-jul-2026_page-has-links-to_2026-07-02_16-42-07.csv | 19 | — | — |
| kinexisdigital_01-jul-2026_page-has-nofollow_2026-07-02_16-41-24.csv | 200 | — | — |
| Page has nofollow and dofollow incoming internal links (not indexable) | 100 | 100 | Yes |
| kinexisdigital_01-jul-2026_page-has-nofollow_2026-07-02_16-42-14.csv | 3 | — | — |
| kinexisdigital_01-jul-2026_page-has-only-one_2026-07-02_16-41-30.csv | 102 | — | — |
| kinexisdigital_01-jul-2026_page-has-only-one_2026-07-02_16-41-49.csv | 53 | — | — |
| Page in multiple sitemaps | 378 | 378 | Yes |
| Page referenced for more than one language in hreflang | 380 | 380 | Yes |
| Pages to submit to IndexNow | 0 | 378 | No |
| Redirect chain | 2 | 2 | Yes |
| Slow page | 34 | 34 | Yes |
| Structured data has Google rich results validation error | 123 | 123 | Yes |

## Root-cause confirmation (from Ahrefs row data)

1. **Canonical from HTTP to HTTPS (190 rows):** All sampled URLs are `http://www.kinexisdigital.com/...` returning 200 with HTTPS canonical — matches Phase 1 HTTP probe.
2. **Hreflang cluster (380 rows × 4 issue types):** Hreflang link sets contain **duplicate entries** for the same language URL (en listed twice, es listed twice). This drives "annotation invalid", "more than one page for same language", and "page referenced for more than one language".
3. **3XX redirect (200 rows):** Unprefixed paths like `/services/seo` → `/en/services/seo` (307). Not in sitemap but discovered via internal links.

## Phase 1 audit coverage gaps

URLs in Ahrefs exports but not in `phase-01-audit.csv` are primarily:
- `http://www.kinexisdigital.com/*` (190 rows — audit crawled HTTPS sitemap URLs only)
- Unprefixed redirect entry URLs (partially probed)

## Recommended phase routing

| Finding | Phase |
|---|---|
| HTTP www 200 + HTTPS canonical | Phase 2 (Cloudflare Always Use HTTPS + middleware) |
| Unprefixed URL 307 redirects + internal links to redirects | Phase 2 |
| Duplicate hreflang in metadata | Phase 4 |
| Meta description too short | Later content phase |
| Structured data errors | Later schema phase |
