# Phase 9 Handoff — XML Sitemaps & Search Engine Notification

**Status:** COMPLETE (deployed 2026-07-02, version `abcb9c70-c6b8-48f2-8933-182574bde05f`)  
**Report:** [phase-09-report.md](./phase-09-report.md)

---

## Phase 9 objective

Sitemaps contain exactly the set of canonical, 200, indexable URLs — nothing else — and the finalized URL list is actively pushed to search engines (IndexNow + GSC confirmation).

**Audit first.** Live production already has a clean single-file sitemap (378 unique `<loc>` entries). The Ahrefs “378 pages in multiple sitemaps” issue is likely **host-variant discovery**, not duplicate entries inside `sitemap.ts`. Confirm with a live crawl before changing application code.

---

## Phases 1–8 carry-forward

| Phase | Status | Relevance to Phase 9 |
|---|---|---|
| Phase 2 | Deployed | Canonical host is `https://www.kinexisdigital.com`; non-www / HTTP variants still serve some assets at 200 |
| Phase 3 | Complete | Sitemap `<loc>` must match page canonical exactly |
| Phase 4 | Complete | Hreflang clean — do not touch |
| Phase 5 | Complete | Lead-magnet excluded from sitemap (`noindex`); 378/378 sitemap URLs indexable |
| Phase 6 | Deployed | Internal link graph stable — orphans not a sitemap concern |
| Phase 7 | Deployed | Meta aligned — no sitemap content changes needed |
| Phase 8 | Deployed | Schema fixed — IndexNow can fire after post-deploy validation passes |

**Human decisions locked (implemented 2026-07-02):**
- Lead-magnet: keep `noindex, nofollow` and **out of sitemap** (Phase 5)
- **Non-canonical sitemap hosts:** 301 redirect via `src/middleware.ts` (apex + HTTP → `https://www.kinexisdigital.com/sitemap.xml`)
- **IndexNow:** UUID `8ab5897f-65da-4126-b6f5-0c1ef3914d39` — `public/{KEY}.txt` + `indexnow.public.json`; Worker secret via `wrangler secret put INDEXNOW_KEY`
- **IndexNow timing:** Manual `npm run submit:indexnow` after `audit:phase9` passes post-deploy
- **GSC sitemap:** Manual dashboard step — documented in phase-09-validation.json

---

## Ahrefs baseline (Phase 9 scope only)

| Ahrefs issue | Rows (Jul 1 export) | Indexable | Expected Phase 9 outcome |
|---|---:|---|---|
| Page in multiple sitemaps | **378** | 378 HTTPS indexable | **Investigate → likely verify-and-document or infra redirect** — see pre-flight §1 |
| Pages to submit to IndexNow | **378** | 378 | **Real work** — implement IndexNow + one-time bulk submit after sitemap pass |

### Ahrefs exports (Phase 9)

| File | Issue |
|---|---|
| `ahrefs-export/kinexisdigital_01-jul-2026_page-in-multiple-s_2026-07-02_16-47-04.csv` | Page in multiple sitemaps (378 rows) |
| `ahrefs-export/kinexisdigital_01-jul-2026_pages-to-submit-to_2026-07-02_16-47-12.csv` | Pages to submit to IndexNow (export header-only in repo — treat as “all 378 indexable sitemap URLs”) |

**Row parsing:** Use `^\d+,(https?:\/\/[^,\r\n]+)` for URL column; ignore embedded multiline `Referenced in sitemaps` host lists when counting unique page URLs.

---

## Pre-flight signals (investigate before coding)

### 1. “Multiple sitemaps” is probably host variants — not duplicate `<loc>` rows

Ahrefs `Referenced in sitemaps` column on sampled rows lists **three sitemap URLs** for every page:

```
http://kinexisdigital.com/sitemap.xml
https://kinexisdigital.com/sitemap.xml
https://www.kinexisdigital.com/sitemap.xml
```

**Live production check (2026-07-02 post-deploy):**

| URL | Status | Notes |
|---|---|---|
| `https://www.kinexisdigital.com/sitemap.xml` | 200 | Canonical — 378 unique `<loc>` |
| `https://kinexisdigital.com/sitemap.xml` | 200 | Same content, non-canonical host |
| `http://kinexisdigital.com/sitemap.xml` | 200 | Same content, insecure + non-canonical |
| `http://www.kinexisdigital.com/sitemap.xml` | 200 | Same content, insecure host |
| `robots.txt` (www + apex) | 200 | Both declare `Sitemap: https://www.kinexisdigital.com/sitemap.xml` |

**Inside the canonical sitemap:** 378 total, **378 unique** — no duplicate `<loc>` entries.

**Likely Phase 9 outcome split:**

| Sub-issue | Fix type |
|---|---|
| Duplicate `<loc>` in `sitemap.ts` | Not present live — no code change expected |
| Same sitemap served on 3+ hosts | **Infra redirect** (Cloudflare: apex/http → www/https for `/sitemap.xml`) or **verify-and-document** if Ahrefs clears after re-crawl |
| Ahrefs HTTP duplicate rows | **Verify-and-document** — stale `http://www` crawl artifacts |

### 2. Current sitemap implementation — single generator, registry-driven

```34:86:src/app/sitemap.ts
export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  // static routes (lead-magnet filtered out)
  // services, industries, solutions, locations, blog, case studies, pricing, comparisons, team
  return entries;
}
```

**Included:** all indexable templates × `en`/`es` locales via `localeUrls()`.  
**Excluded by design:**
- `/lead-magnet` (filtered in `sitemapStaticRoutes`)
- `/services/cro` (redirects to funnels; excluded via `sitemapExcludedServiceSlugs`)
- `/api/*`, 404, unprefixed redirect entry URLs

**robots.txt** references canonical sitemap:

```4:13:src/app/robots.ts
export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl();
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/"] },
    sitemap: `${base}/sitemap.xml`,
  };
}
```

**Dependency:** `NEXT_PUBLIC_SITE_URL` / `getSiteUrl()` must stay `https://www.kinexisdigital.com` so `<loc>` and robots sitemap directive match.

### 3. IndexNow — implemented

| Item | Path |
|---|---|
| Key file | `public/8ab5897f-65da-4126-b6f5-0c1ef3914d39.txt` |
| Config | `indexnow.public.json` |
| Setup | `npm run setup:indexnow` |
| Submit | `npm run submit:indexnow` (after `audit:phase9` passes) |

Bulk submit completed 2026-07-02: **378 URLs, HTTP 200**. See [phase-09-indexnow-log.json](./phase-09-indexnow-log.json).

### 4. Sitemap ↔ indexability bidirectional diff (required audit)

Prior phase audits validated sitemap URLs individually but Phase 9 needs explicit **set equality**:

| Check | Expected |
|---|---|
| Every sitemap `<loc>` | 200, indexable, canonical self-referencing |
| Every indexable 200 canonical URL (from route registry) | Present in sitemap |
| No redirect / 4xx / noindex URLs in sitemap | Pass |
| Sitemap URL count | 378 (current baseline) |

Reuse route registries from `src/content/registry/site-routes.ts`, `locations`, `industries`, `solutions`, `blog.ts` to compute expected URL set — same pattern as `sitemap.ts`.

---

## Key code paths (start here)

| File | Role |
|---|---|
| `src/app/sitemap.ts` | **Primary sitemap generator** — only edit if audit finds missing/extra URLs |
| `src/app/robots.ts` | Sitemap directive in robots.txt |
| `src/lib/metadata.ts` | `getSiteUrl()`, `buildLocalePath()`, `buildAbsoluteUrl()` |
| `src/content/registry/site-routes.ts` | Static routes, service/pricing/blog slugs, exclusions |
| `src/content/registry/locations.ts` | Location + location×service URLs |
| `src/content/registry/industries.ts` | Industry category + detail URLs |
| `src/content/registry/solutions.ts` | Solution slugs |
| `.env.example` | `INDEXNOW_KEY` placeholder |
| `wrangler.jsonc` | Custom domains — infra redirects may live in Cloudflare dashboard, not repo |

**Reuse patterns from prior audits:**
- `scripts/phase5-indexability-audit.mjs` — indexability + sitemap alignment checks
- `scripts/phase7-metadata-audit.mjs` — sitemap crawl, CSV output, URL rewrite to audit base
- `scripts/phase8-structured-data-audit.mjs` — sitemap fetch + validation JSON summary

---

## Phase 9 tasks (playbook)

1. **Live sitemap audit** — fetch `https://www.kinexisdigital.com/sitemap.xml`; validate 378 unique HTTPS www URLs; no duplicates; all return 200 + indexable
2. **Bidirectional diff** — computed expected URL set (registry) vs sitemap `<loc>` set; flag missing/extra either direction
3. **Multiple-sitemap root cause** — confirm Ahrefs issue is host-variant sitemaps (§1); fix via Cloudflare redirect rules for non-canonical `/sitemap.xml` hosts **or** document as resolved post-infra
4. **robots.txt + GSC** — confirm `Sitemap:` directive on live www; verify sitemap submitted in Google Search Console (manual human step)
5. **IndexNow implementation** — key file, env secret, submission script; bulk POST 378 URLs once sitemap pass is green
6. **Post-deploy validation** — re-run Phase 8 structured-data audit on production (Phases 6–8 now live)
7. **Re-run Phase 9 audit** — confirm `phase9Pass` criteria below

---

## Human decisions required

| Decision | Options |
|---|---|
| **Non-canonical sitemap hosts** | (A) Cloudflare redirect `http://*` and `https://kinexisdigital.com/sitemap.xml` → `https://www.kinexisdigital.com/sitemap.xml`, (B) Verify-and-document only if Ahrefs re-crawl clears without infra change |
| **IndexNow key** | Generate UUID key; host at `https://www.kinexisdigital.com/{KEY}.txt`; store key in Worker secrets |
| **IndexNow trigger** | (A) One-time manual script after deploy, (B) Post-deploy hook in CI (future GitHub deploy) |
| **GSC sitemap** | Manual confirmation in Search Console — out of code scope but required for playbook completion report |

---

## Definition of done

Produce `docs/seo-remediation/phase-09-report.md` with:

- Files modified
- Issues fixed by Ahrefs issue name
- Intentional/documented items (HTTP host-variant rows, GSC manual steps)
- Remaining issues + reasons
- Validation tool output (not claims)
- IndexNow submission log (URL count, response status)

**Suggested deliverables:**

| File | Purpose |
|---|---|
| `scripts/phase9-sitemap-audit.mjs` | Sitemap parse + registry diff + indexability spot-check + Ahrefs diff |
| `scripts/submit-indexnow.mjs` | Bulk IndexNow submission from sitemap or validation JSON |
| `public/{INDEXNOW_KEY}.txt` | IndexNow key verification file |
| `docs/seo-remediation/phase-09-audit.csv` | One row per sitemap URL with inclusion/exclusion reason |
| `docs/seo-remediation/phase-09-validation.json` | Tool output with `phase9Pass` boolean |
| `docs/seo-remediation/phase-09-indexnow-log.json` | Submission response per batch |

**Validation commands:**

```bash
npm run build
npx next start -p 3000   # or npm run deploy for production check

# Local / production sitemap audit
node scripts/phase9-sitemap-audit.mjs https://www.kinexisdigital.com

# After IndexNow key is configured
node scripts/submit-indexnow.mjs https://www.kinexisdigital.com

# Post-deploy structured data confirmation (Phase 8 on live)
node scripts/phase8-structured-data-audit.mjs https://www.kinexisdigital.com
```

**Suggested `phase9Pass` criteria:**

- 0 duplicate `<loc>` entries in canonical sitemap
- 0 sitemap URLs that are non-200, non-indexable, or non-canonical
- 0 indexable registry URLs missing from sitemap
- 0 extra sitemap URLs not in expected registry set
- `robots.txt` references exactly `https://www.kinexisdigital.com/sitemap.xml`
- IndexNow bulk submit returns success for all 378 URLs (or documented batch limit + retry)
- Ahrefs “page in multiple sitemaps”: 0 rows on re-crawl **or** documented as host-variant-only with infra fix applied

---

## Stop conditions

- Do **not** start Phase 10 (performance) in the same pass
- Do **not** change canonicals, hreflang, robots index rules, internal links, meta, or schema unless sitemap audit proves a direct mismatch
- Do **not** submit IndexNow until sitemap bidirectional diff passes
- Do **not** add noindex URLs to sitemap to “fix” counts

---

## Do NOT touch (out of scope)

| Issue | Phase |
|---|---|
| Slow page / CWV (34) | Phase 10 |
| Structured data (123) | Phase 8 ✓ (re-validate only) |
| Meta descriptions | Phase 7 ✓ |
| Canonical / hreflang / indexability / internal links | Phases 3–6 ✓ |
| Final Ahrefs health score reconciliation | Phase 11 |

---

## Likely outcome split

| Issue | Expected Phase 9 outcome |
|---|---|
| Page in multiple sitemaps (378) | **Verify-and-document or infra redirect** — sitemap content is already deduplicated; Ahrefs counts 3 host-variant sitemap discoveries per URL |
| Pages to submit to IndexNow (378) | **Real implementation** — key file + bulk submit script |
| Missing/extra sitemap URLs | **Unlikely** — registry and live sitemap both at 378; audit confirms |
| GSC sitemap submission | **Manual human step** — document in report |

---

## Priority fix order

1. **Build `phase9-sitemap-audit.mjs`** — parse live sitemap, registry diff, indexability check
2. **Confirm multiple-sitemap cause** — host variants vs code bug (expect host variants)
3. **Cloudflare redirect** for non-canonical `/sitemap.xml` if Ahrefs issue persists after re-crawl
4. **Implement IndexNow** — key file, env secret, `submit-indexnow.mjs`
5. **Bulk submit** 378 URLs after `phase9Pass` locally
6. **Production validation** + Ahrefs re-crawl trigger
7. **Re-run Phase 8 audit** on production to close structured-data loop

---

## Post-deploy note (Phases 6–8)

Phases 6, 7, and 8 were deployed to production on **2026-07-02** (`npm run deploy`, version `32446a57-4b31-412c-8f2a-caaa5614cce0`). Before IndexNow:

```bash
node scripts/phase8-structured-data-audit.mjs https://www.kinexisdigital.com
node scripts/phase7-metadata-audit.mjs https://www.kinexisdigital.com
```

Confirm production passes match post-fix local validation JSON before notifying search engines of URL changes.

---

## References

| Doc | Purpose |
|---|---|
| [phase-08-report.md](./phase-08-report.md) | Phase 8 completion + deploy note |
| [phase-05-report.md](./phase-05-report.md) | Lead-magnet sitemap exclusion |
| [phase-01-ahrefs-crossref.md](./phase-01-ahrefs-crossref.md) | 378 multiple-sitemap + IndexNow row counts |
| [playbook-extracted.txt](./playbook-extracted.txt) | Phase 9 section |
| [IndexNow documentation](https://www.indexnow.org/documentation) | API + key file requirements |
| [Google Sitemap guidelines](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap) | Inclusion rules |

**Bottom line:** The application sitemap is structurally sound (378 unique canonical URLs, lead-magnet excluded). Phase 9 is primarily **audit confirmation**, **host-variant cleanup** for the Ahrefs “multiple sitemaps” flag, and **IndexNow implementation** — not rewriting `sitemap.ts` unless the bidirectional diff finds gaps.
