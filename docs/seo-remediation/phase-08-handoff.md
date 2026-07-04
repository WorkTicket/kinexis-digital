# Phase 8 Handoff — Structured Data

**Prepared:** 2026-07-02  
**Prior phase:** [phase-07-report.md](./phase-07-report.md) (COMPLETE locally — **deploy Phase 6+7 before production Phase 8 validation**)  
**Playbook:** Enterprise SEO Remediation Playbook v3 — Phase 8  
**Branch:** Continue on `seo/phase-02-url-architecture` or create `seo/phase-08-structured-data`

---

## Phase 8 objective

All structured data validates for Google Rich Results and reflects visible on-page content — no fabricated fields, no template-level errors repeated across dozens of URLs.

**Audit first.** Ahrefs reports 123 pages with errors but does **not** include the specific Google error string. Pull error types from live JSON-LD + Rich Results Test (or Search Console) **per template** before editing `schema.ts`.

---

## Phases 1–7 carry-forward

| Phase | Status | Relevance to Phase 8 |
|---|---|---|
| Phase 2 | Deployed | Stable locale-prefixed URLs; schema `@id` / `url` fields must use `buildAbsoluteUrl()` |
| Phase 3 | Complete | Canonical URLs stable — schema `url` / `mainEntityOfPage` must match canonical |
| Phase 4 | Complete | Hreflang clean — do not touch |
| Phase 5 | Complete | Lead-magnet `noindex` — lower priority for rich results; still validate if JSON-LD present |
| Phase 6 | Complete (local) | Internal links fixed — breadcrumb targets should match crawlable URLs |
| Phase 7 | Complete (local) | Meta descriptions updated — `Service` / `Article` `description` should align with meta + visible copy |

**Human decisions locked (no reversals):**
- Lead-magnet: keep `noindex, nofollow` (Phase 5 Option A)
- Hreflang / canonical / indexability / internal links / meta: do not touch
- No fabricated business data in schema (playbook requirement)

---

## Ahrefs baseline (Phase 8 scope only)

| Ahrefs issue | Rows (Jul 1 export) | Indexable | Expected Phase 8 outcome |
|---|---:|---|---|
| Structured data has Google rich results validation error | **123** | ~82 HTTPS + ~41 HTTP dupes | **Real fixes** — template-level schema in `src/lib/schema.ts` + location page wiring |

### Ahrefs export (Phase 8)

| File | Issue |
|---|---|
| `ahrefs-export/kinexisdigital_01-jul-2026_structured-data-ha_2026-07-02_16-47-20.csv` | Google rich results validation error (123 rows) |

**Row parsing:** Use row-start URL (`^0,(https?:…`)`; ignore embedded URLs in multiline `Schema items` column.

**Critical limitation:** The export lists schema **types present** (`BreadcrumbList`, `FAQPage`, `LocalBusiness`, etc.) but **not** the Google error message. Phase 8 must capture error text live.

---

## Pre-flight signals (investigate before coding)

### 1. Errors are template-concentrated — not 123 unrelated pages

Ahrefs `Schema items` column shows only **two combos** across all 123 rows:

| Schema combo | Approx. volume | Page pattern |
|---|---:|---|
| `BreadcrumbList` + `FAQPage` + `LocalBusiness` + `Organization` | ~41 HTTPS indexable + HTTP dupes | `/locations/{city}` city hubs, `/digital-marketing-agency` (Ahrefs; verify live) |
| Above + `Service` | ~64 URLs | `/locations/{city}/{service}` (seo, web-design, google-ads, ppc-management) |

**No `/services/`, `/blog/`, or `/pricing/` URLs appear in the Ahrefs export.** Fix location templates first; then spot-check other templates not represented in Ahrefs.

### 2. Likely root causes in `src/lib/schema.ts`

```38:56:src/lib/schema.ts
export function localBusinessSchema(city?: string, region?: string, pagePath?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    ...
    url: getSiteUrl(),                    // ← site root, not location page URL
    image: `${getSiteUrl()}/logo.png`,    // ← may 404; OG image is /assets/images/kinexis_OG_image.png
    telephone: "+1-888-888-8888",       // ← placeholder; not on-page contact info
    ...(city && { areaServed: { ... } }), // ← no PostalAddress / address field
  };
}
```

```5:24:src/lib/schema.ts
export function organizationSchema() {
  return {
    ...
    logo: `${getSiteUrl()}/logo.png`,   // ← same logo path concern
    contactPoint: {
      telephone: "+1-888-888-8888",     // ← placeholder
    },
  };
}
```

**Hypotheses to confirm via Rich Results Test (priority order):**

| Hypothesis | Why Google likely flags it |
|---|---|
| **Missing `address`** on `LocalBusiness` | Required for Local Business rich results; location pages only set `areaServed` |
| **Invalid / missing `image` or `logo` URL** | `/logo.png` not in `public/`; site uses `/assets/images/kinexis_OG_image.png` for OG |
| **Placeholder `telephone`** | Playbook: no fabricated fields; `+1-888-888-8888` not visible on pages |
| **Wrong `@type` for a remote agency** | KINEXIS is not a storefront in each city — `LocalBusiness` may be incorrect vs `ProfessionalService` / `Service`-only |
| **`LocalBusiness.url` points to homepage** | Should likely be the location page canonical URL |
| **FAQPage mismatch** | FAQ JSON-LD must match visible FAQ accordion (`FAQSection` on location pages) |

### 3. Location pages — where schema is assembled

| Route | JsonLd blocks | Source |
|---|---|---|
| `/locations/{city}` | Organization, LocalBusiness, FAQPage, BreadcrumbList | `src/app/[locale]/locations/[city]/page.tsx` |
| `/locations/{city}/{service}` | Above + Service | `src/app/[locale]/locations/[city]/[service]/page.tsx` |
| `/digital-marketing-agency` | Organization, FAQPage, BreadcrumbList (**no LocalBusiness in current code**) | `src/app/[locale]/digital-marketing-agency/page.tsx` |

**Note:** Ahrefs still lists `LocalBusiness` on `/digital-marketing-agency` — verify live HTML; may be stale or production drift.

FAQs on location pages render via `LocationPageClient` → `FAQSection` using the same `localFaqs` array passed to `faqSchema()` — alignment should be good if arrays match.

### 4. Other templates (not in Ahrefs 123 — spot-check after location fix)

| Template | Schema types | Primary file |
|---|---|---|
| Service pages | Organization, Service, FAQPage, BreadcrumbList | `src/lib/create-service-page.tsx`, `src/lib/paid-service-page.tsx` |
| Pricing | Organization, Service, FAQPage, BreadcrumbList | `src/lib/create-pricing-page.tsx` |
| Solutions | Organization, Service, FAQPage, BreadcrumbList | `src/app/[locale]/solutions/[slug]/page.tsx` |
| Blog posts | Organization, Article, BreadcrumbList | `src/app/[locale]/blog/[slug]/page.tsx` |
| Case studies | Organization, Article (caseStudySchema), BreadcrumbList | `src/app/[locale]/case-studies/[slug]/page.tsx` |
| Homepage | Organization, WebSite | `src/app/[locale]/page.tsx` |
| Team | Organization, Person, BreadcrumbList | `src/app/[locale]/team/[slug]/page.tsx` |
| Comparisons | Organization, Article, FAQPage, BreadcrumbList | `src/lib/create-comparison-page.tsx` |

**Article schema notes:** Hard-coded dates on comparison pages (`datePublished: "2026-01-15"`). Blog posts use dynamic excerpts — verify `headline` length and `image` URL.

### 5. JsonLd rendering

```5:17:src/components/seo/JsonLd.tsx
export default function JsonLd({ data }: JsonLdProps) {
  const payload = Array.isArray(data) ? data : [data];
  return (
    <>
      {payload.map((item, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }} />
      ))}
    </>
  );
}
```

Separate `<script>` tags per schema object is valid. Optional improvement: single `@graph` array (not required for Phase 8 pass).

---

## Key code paths (start here)

| File | Role |
|---|---|
| `src/lib/schema.ts` | **Primary fix surface** — all schema builders |
| `src/lib/metadata.ts` | `getSiteUrl()`, `getDefaultOgImageUrl()` — use for logo/image URLs |
| `src/components/seo/JsonLd.tsx` | JSON-LD output component |
| `src/app/[locale]/locations/[city]/page.tsx` | City hub schema stack |
| `src/app/[locale]/locations/[city]/[service]/page.tsx` | City×service schema stack |
| `src/components/pages/LocationPageClient.tsx` | Visible FAQs (must match `faqSchema`) |
| `src/lib/create-service-page.tsx` | Service page schema pattern |
| `src/lib/create-pricing-page.tsx` | Pricing schema pattern |
| `src/app/[locale]/blog/[slug]/page.tsx` | Article schema |

**Reuse patterns from prior audits:**
- `scripts/phase7-metadata-audit.mjs` — sitemap crawl, CSV output, Ahrefs diff, URL rewrite to audit base
- `scripts/phase6-internal-links-audit.mjs` — concurrency pool, validation JSON summary

---

## Phase 8 tasks (playbook)

1. **Live structured-data audit** — crawl sitemap; extract all `application/ld+json` blocks; group by template; validate image/logo URLs return 200
2. **Capture Google error types** — Rich Results Test (or Search Console enhancement report) on **one URL per template**, not all 123 individually
3. **Fix `schema.ts` template bugs** — address/logo/phone/type/url fields; remove or replace fabricated values
4. **Location template (123 Ahrefs rows)** — highest priority; likely single fix clears majority
5. **FAQPage alignment** — confirm every `Question` in JSON-LD appears in rendered FAQ UI (and vice versa for indexed FAQs)
6. **Spot-check non-location templates** — service, pricing, blog, article even though absent from Ahrefs export
7. **Re-run audit** — confirm 0 rich-results errors on indexable sitemap URLs

---

## Human decisions required (before coding LocalBusiness)

| Decision | Options |
|---|---|
| **Business address in schema** | (A) Add real HQ address to Organization/LocalBusiness, (B) Drop `LocalBusiness` on city pages and use `Service` + `Organization` only, (C) Use `ProfessionalService` with `areaServed` and no fake address |
| **Phone in schema** | (A) Real business phone from contact content, (B) Remove `telephone` from schema if not displayed on page |
| **Logo/image URL** | Point to verified 200 URL (`getDefaultOgImageUrl()` or existing logo asset path) |

**Playbook constraint:** Do not invent address/phone to silence validators.

---

## Definition of done

Produce `docs/seo-remediation/phase-08-report.md` with:

- Files modified
- Issues fixed by Ahrefs issue name + Google error type
- Intentional/documented items (HTTP duplicate rows, schema types removed vs fixed)
- Remaining issues + reasons
- Validation tool output (not claims)
- Blockers for human review

**Suggested deliverables:**

| File | Purpose |
|---|---|
| `scripts/phase8-structured-data-audit.mjs` | Extract JSON-LD per URL; validate URLs; template grouping; Ahrefs diff |
| `docs/seo-remediation/phase-08-audit.csv` | One row per sitemap URL with schema types + issues |
| `docs/seo-remediation/phase-08-validation.json` | Tool output with `phase8Pass` boolean |

**Validation commands:**

```bash
npm run build
npx next start -p 3000

# Local audit (rewrite sitemap URLs to localhost like Phase 7)
node scripts/phase8-structured-data-audit.mjs http://localhost:3000

# After deploy
node scripts/phase8-structured-data-audit.mjs https://www.kinexisdigital.com

# Manual spot-check (one URL per template)
# https://search.google.com/test/rich-results
```

**Suggested `phase8Pass` criteria:**

- 0 indexable sitemap URLs with JSON-LD parse errors
- 0 indexable URLs with invalid logo/image URLs in schema
- 0 fabricated `telephone` / `address` fields (or documented removal)
- Ahrefs structured-data export: 0 rows still applying on live crawl (after re-crawl)
- Template spot-checks pass Rich Results Test for: location city, location service, service, pricing, blog post

---

## Stop conditions

- Do **not** start Phase 9 (sitemap / IndexNow) in the same pass
- Do **not** change canonicals, hreflang, robots, internal links, or meta descriptions
- Do **not** pad schema with fake addresses, phones, or reviews to pass validators
- Do **not** add aggregateRating / review schema unless backed by on-page content

---

## Do NOT touch (out of scope)

| Issue | Phase |
|---|---|
| Sitemap / IndexNow (378) | Phase 9 |
| Slow page / CWV (34) | Phase 10 |
| Meta descriptions | Phase 7 ✓ |
| Canonical / hreflang / indexability / internal links | Phases 3–6 ✓ |

---

## Likely outcome split

| Issue | Expected Phase 8 outcome |
|---|---|
| Structured data errors (123 Ahrefs) | **Real fixes** — `schema.ts` + location template; likely 1–3 template fixes clear 80+ URLs |
| HTTP duplicate rows (~41) | **Verify-and-document** — stale `http://www` rows; live HTTPS crawl is source of truth |
| Service/blog/pricing templates | **Spot-check** — not in Ahrefs export; may already pass or share logo/phone bugs via `organizationSchema()` |

---

## Priority fix order

1. **Run live audit + Rich Results Test** on `/en/locations/austin/seo` and `/en/locations/austin` — capture exact error strings
2. **Fix shared `organizationSchema()` / `localBusinessSchema()`** — logo URL, phone, address/type decisions
3. **Location city + city×service pages** — align `url`, drop or correct `LocalBusiness`, verify FAQ parity
4. **Spot-check** service, pricing, blog, homepage Organization/WebSite
5. **Production validation** after Phase 6+7 deploy

---

## Deploy dependency

Phase 6 and Phase 7 are **not yet on production** (production metadata audit still shows 90 short descriptions). Recommended sequence:

1. Deploy Phase 6 + 7
2. Confirm Phase 7 production pass
3. Implement Phase 8 on same branch
4. Deploy Phase 8
5. Re-run `phase8-structured-data-audit.mjs` on production
6. Trigger Ahrefs re-crawl

---

## References

| Doc | Purpose |
|---|---|
| [phase-07-report.md](./phase-07-report.md) | Phase 7 completion + deploy note |
| [phase-01-ahrefs-crossref.md](./phase-01-ahrefs-crossref.md) | 123 structured-data row count |
| [playbook-extracted.txt](./playbook-extracted.txt) | Phase 8 section |
| [Google Local Business structured data](https://developers.google.com/search/docs/appearance/structured-data/local-business) | LocalBusiness required fields |
| [Google FAQ structured data](https://developers.google.com/search/docs/appearance/structured-data/faqpage) | FAQ visibility rules |

**Bottom line:** All 123 Ahrefs structured-data errors cluster on **location page templates** sharing `LocalBusiness` + `FAQPage` + `Organization`. The likely fixes live in `src/lib/schema.ts` (placeholder phone, missing address, bad logo URL, wrong business type) — but **confirm error strings live before editing**. Phase 8 is template surgery, not 123 hand-authored page fixes.
