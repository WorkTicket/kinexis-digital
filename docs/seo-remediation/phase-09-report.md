# Phase 9 Completion Report — Sitemap & IndexNow

**Status:** COMPLETE  
**Date:** 2026-07-02  
**Deploy version:** `abcb9c70-c6b8-48f2-8933-182574bde05f`  
**Playbook:** Enterprise SEO Remediation Playbook v3 — Phase 9  
**Prior phase:** [phase-08-report.md](./phase-08-report.md)

---

## Outcome

| Check | Pre-deploy (production) | Post-deploy (production) |
|---|---|---|
| Sitemap URLs (unique) | 378 | 378 |
| Duplicate `<loc>` | 0 | 0 |
| Registry ↔ sitemap diff | — | 0 missing / 0 extra |
| All sitemap URLs indexable | 378/378 | 378/378 |
| Non-canonical redirects (6) | 6 fail | **6 pass** |
| IndexNow key reachable | false | **true** |
| IndexNow bulk submit (378) | — | **HTTP 200** |
| **`phase9Pass`** | **false** | **true** |

---

## Issues fixed (Ahrefs)

| Ahrefs issue | Baseline | Fix |
|---|---:|---|
| Page in multiple sitemaps | 378 | Non-canonical `/sitemap.xml` + `/robots.txt` hosts now **301 → www HTTPS** via middleware |
| Pages to submit to IndexNow | 378 | Bulk submit via `npm run submit:indexnow` — **378 URLs, HTTP 200** |

**Root cause (multiple sitemaps):** Same sitemap content was served at 200 on `http://kinexisdigital.com`, `https://kinexisdigital.com`, and `https://www.kinexisdigital.com`. No duplicate `<loc>` rows inside the canonical sitemap.

---

## Files modified / added

| Path | Change |
|---|---|
| `src/middleware.ts` | 301 non-canonical crawler paths; `NextResponse.next()` for canonical `/sitemap.xml` + `/robots.txt` (avoids intl middleware 404) |
| `scripts/phase9-sitemap-audit.mjs` | Sitemap validation, redirect checks, indexability crawl, registry bidirectional diff |
| `scripts/setup-indexnow.mjs` | UUID key + public file + `.dev.vars` |
| `scripts/submit-indexnow.mjs` | Bulk IndexNow POST with 403 retry |
| `scripts/cloudflare-sitemap-redirects.mjs` | Optional CDN-edge redirect documentation |
| `public/8ab5897f-65da-4126-b6f5-0c1ef3914d39.txt` | IndexNow verification file |
| `indexnow.public.json` | Committed IndexNow host/key/keyLocation |
| `package.json` | `setup:indexnow`, `audit:phase9`, `submit:indexnow` |
| `.env.example` | IndexNow setup instructions |
| `docs/seo-remediation/phase-09-audit.csv` | 378-row sitemap URL inventory |
| `docs/seo-remediation/phase-09-validation.json` | Post-deploy audit output (`phase9Pass: true`) |
| `docs/seo-remediation/phase-09-indexnow-log.json` | IndexNow submission log |

---

## Middleware fix (deploy note)

Adding `/sitemap.xml` and `/robots.txt` to the middleware matcher caused canonical www requests to fall through to `intlMiddleware`, returning **404**. Fix: return `NextResponse.next()` for crawler paths on the canonical host after redirect logic.

---

## Validation commands (post-deploy)

```bash
npm run audit:phase9
# phase9Pass: true

npm run submit:indexnow
# all_success: true, total_urls: 378

node scripts/phase8-structured-data-audit.mjs https://www.kinexisdigital.com
# phase8Pass: true, ahrefs_resolved: 123/123
```

---

## IndexNow submission log

| Field | Value |
|---|---|
| Timestamp | 2026-07-02T23:39:03Z |
| Endpoint | `https://api.indexnow.org/indexnow` |
| URLs submitted | 378 |
| Batches | 1 |
| HTTP status | 200 OK |
| Key location | `https://www.kinexisdigital.com/8ab5897f-65da-4126-b6f5-0c1ef3914d39.txt` |

Full log: [phase-09-indexnow-log.json](./phase-09-indexnow-log.json)

---

## Remaining manual step

**Google Search Console** (human):

1. Search Console → Sitemaps
2. Submit: `https://www.kinexisdigital.com/sitemap.xml`
3. Confirm Status: Success, ~378 URLs discovered

Documented in `phase-09-validation.json` → `gsc_manual_checklist`.

---

## Intentional / out of scope

- `sitemap.ts` URL list unchanged (378 registry-driven URLs; lead-magnet excluded)
- Ahrefs re-crawl for “page in multiple sitemaps” clears after crawl refresh (301s now live)
- GSC sitemap confirmation is manual
- Phase 10 (CWV) not started

---

## Phase 10 handoff

Proceed to Phase 10 (Core Web Vitals / slow pages) after Ahrefs re-crawl confirms multiple-sitemap rows at 0.
