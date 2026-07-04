# Phase 8 Completion Report — Structured Data

**Status:** COMPLETE (code fixes + audit tooling)  
**Date:** 2026-07-02  
**Branch:** `seo/phase-02-url-architecture`  
**Playbook:** Enterprise SEO Remediation Playbook v3 — Phase 8  
**Prior phase:** [phase-07-report.md](./phase-07-report.md)

---

## 1. Files modified

| Path | Change |
|---|---|
| `scripts/phase8-structured-data-audit.mjs` | **Added** — JSON-LD extraction, fabricated-field detection, image URL checks, template grouping, Ahrefs diff; supports `--static .next/server/app` for local build validation |
| `src/lib/schema.ts` | **Modified** — Removed `localBusinessSchema()`; fixed `organizationSchema()` logo + contact; `serviceSchema()` accepts city-level `areaServed` |
| `src/lib/location-faqs.ts` | **Added** — Shared FAQ source for location city + service pages (JSON-LD ↔ visible FAQ parity) |
| `src/app/[locale]/locations/[city]/page.tsx` | **Modified** — `Service` + `Organization` + `FAQPage`; dropped `LocalBusiness` |
| `src/app/[locale]/locations/[city]/[service]/page.tsx` | **Modified** — Dropped `LocalBusiness`; city-scoped `Service`; shared FAQs |
| `src/components/pages/LocationPageClient.tsx` | **Modified** — Accepts `localFaqs` prop from page (single source of truth) |
| `docs/seo-remediation/phase-08-audit.csv` | **Added** — 378-row structured data inventory (post-fix) |
| `docs/seo-remediation/phase-08-validation.json` | **Added** — Post-fix pass (`phase8Pass: true`) |
| `docs/seo-remediation/phase-08-validation-postfix.json` | **Added** — Same as validation.json (static build audit) |
| `docs/seo-remediation/phase-08-validation-production-predeploy.json` | **Added** — Production baseline before deploy |
| `docs/seo-remediation/phase-08-report.md` | **Added** — This report |

**Out of scope (not modified):** canonicals, hreflang, robots, internal links, meta descriptions, sitemap/IndexNow.

---

## 2. Human decisions applied

| Decision | Choice | Rationale |
|---|---|---|
| Business address in schema | **Drop `LocalBusiness` on city pages** | KINEXIS is a remote agency — no storefront per city; playbook forbids fabricated addresses |
| Phone in schema | **Remove placeholder telephone** | `+1-888-888-8888` not visible on any page; replaced Org contact with `hello@kinexisdigital.com` (shown on contact + footer) |
| Logo/image URL | **`getDefaultOgImageUrl()`** | `/logo.png` 404s; OG image path is verified 200 on production |

---

## 3. Ahrefs baseline vs live outcome

| Ahrefs issue | Jul 1 rows | Production (pre-deploy) | Phase 8 outcome |
|---|---:|---|---|
| Structured data Google rich results validation error | 123 | **123** still apply (378 pages with fabricated phone + logo on every template via `organizationSchema`) | **Fixed** — 0 schema issues on 378/378 post-fix static build; 123/123 Ahrefs rows resolved in local audit |

### Root causes confirmed (production crawl)

All 378 indexable sitemap URLs shared two template-level bugs in `organizationSchema()`:

1. **`logo: /logo.png`** — invalid path (404)
2. **`telephone: +1-888-888-8888`** — fabricated placeholder on every page using Organization schema

Location templates additionally emitted **`LocalBusiness`** without a required `address` field — 80 pages (16 city hubs + 64 city×service; Ahrefs export clusters here).

---

## 4. Issues fixed (by Google error type / Ahrefs issue)

| Issue | Fix |
|---|---|
| **LocalBusiness missing address** | Removed `LocalBusiness` entirely; location pages use `Service` with city-scoped `areaServed` |
| **Invalid logo URL** | `organizationSchema().logo` → `getDefaultOgImageUrl()` (`/assets/images/kinexis_OG_image.png`) |
| **Fabricated telephone** | Removed from Organization; contact uses visible email `hello@kinexisdigital.com` |
| **LocalBusiness.url → homepage** | N/A after removal; `Service.url` points to page canonical |
| **FAQPage mismatch (location service pages)** | `getLocationServiceFaqs()` + `localFaqs` prop ensures JSON-LD matches rendered `FAQSection` |
| **FAQPage mismatch (location city hubs)** | `getLocationCityFaqs()` unified fallback (was 1 FAQ in JSON-LD vs 2 in UI when no `detail.localFaqs`) |

### Schema stack after fix

| Template | JSON-LD types |
|---|---|
| `/locations/{city}` | Organization, Service, FAQPage, BreadcrumbList |
| `/locations/{city}/{service}` | Organization, Service, FAQPage, BreadcrumbList |
| `/digital-marketing-agency` | Organization, FAQPage, BreadcrumbList (unchanged — no LocalBusiness in current code) |
| All other templates | Organization (+ type-specific schemas) — inherit logo/email fix |

---

## 5. Validation results

### Post-fix (local static build)

```bash
npm run build
node scripts/phase8-structured-data-audit.mjs http://localhost:3000 --static .next/server/app
```

| Check | Result |
|---|---|
| Sitemap URLs audited | 378/378 |
| JSON-LD parse errors | **0** |
| LocalBusiness pages | **0** |
| Fabricated telephone | **0** |
| Invalid logo path (`/logo.png`) | **0** |
| Broken schema image URLs | **0** (skipped in static mode; production crawl confirms OG image 200) |
| Ahrefs rows still applying | **0 / 123** |
| `phase8Pass` | **true** |

Full output: [phase-08-validation.json](./phase-08-validation.json)

### Production baseline (pre-deploy)

```bash
node scripts/phase8-structured-data-audit.mjs https://www.kinexisdigital.com
```

| Check | Pre-deploy production |
|---|---|
| Schema issue pages | **378** |
| LocalBusiness pages | **80** |
| Fabricated telephone | **378** |
| Invalid logo path | **378** |
| `phase8Pass` | **false** |

Full output: [phase-08-validation-production-predeploy.json](./phase-08-validation-production-predeploy.json)

---

## 6. Intentional / documented items

| Item | Notes |
|---|---|
| HTTP duplicate Ahrefs rows (~41) | Same as Phase 7 — stale `http://www` URLs; HTTPS live crawl is source of truth |
| Ahrefs `LocalBusiness` on `/digital-marketing-agency` | Stale production data — current code never emitted LocalBusiness on that route |
| Image URL check in static mode | Skips network HEAD requests; run live crawl post-deploy to confirm logo/image 200 |
| Rich Results Test | Manual spot-check recommended on deploy: `/en/locations/austin`, `/en/locations/austin/seo`, `/en/services/seo`, `/en/pricing/seo`, one blog post |

---

## 7. Deploy dependency

Phase 6 + 7 are not yet on production. Recommended sequence:

1. Deploy Phase 6 + 7
2. Deploy Phase 8 (this pass)
3. Re-run live audit: `node scripts/phase8-structured-data-audit.mjs https://www.kinexisdigital.com`
4. Spot-check Rich Results Test (one URL per template)
5. Trigger Ahrefs re-crawl

---

## 8. Blockers for human review

None for merge. Optional post-deploy: confirm Rich Results Test passes on location + service templates after live deploy.

---

## 9. Phase 9 handoff

Next: **Phase 9 — Sitemap / IndexNow** (378 URLs). Do not start in this pass.

References: [phase-08-handoff.md](./phase-08-handoff.md) (superseded by this report for completion status)
