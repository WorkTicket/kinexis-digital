# Phase D Handoff — SEO Polish

**Prepared:** 2026-07-04  
**Scope:** LocalBusiness schema, Organization logo, per-page sitemap dates, web manifest, IndexNow  
**Prior phases:** Phase A/B complete; Phase C skipped

---

## Completed in code

| Item | Implementation |
|------|----------------|
| **LocalBusiness schema** | `localBusinessSchema()` in `src/lib/schema.ts` — `ProfessionalService` + `MarketingAgency` with service-area `addressCountry: CA`, visible email, no fabricated phone |
| **Organization logo** | `getOrganizationLogoUrl()` → `/assets/logos/KINEXIS_icon_logo.webp` as `ImageObject` (512×512) in `organizationSchema()` |
| **Per-page sitemap dates** | `src/lib/sitemap-last-modified.ts` — blog `publishedAt`, case study `datePublished`, template defaults for services/industries/etc. |
| **Web app manifest** | `src/app/manifest.ts` — `id`, `scope`, `lang`, `categories`, multi-size icons |
| **Phase 8 audit** | Allows valid `ProfessionalService` / `MarketingAgency` with address; fails only on schema issues |

### Pages with LocalBusiness JSON-LD

- `/` (homepage)
- `/contact`
- `/about`
- `/digital-marketing-agency`

All other templates keep `Organization` only (no per-city LocalBusiness — locations removed in Phase A).

---

## Post-deploy validation

```bash
npm run build
node scripts/phase8-structured-data-audit.mjs https://www.kinexisdigital.com
npm run audit:phase9
npm run submit:indexnow
```

**Rich Results Test spot-checks:**

- `https://www.kinexisdigital.com/en` — Organization + ProfessionalService logo
- `https://www.kinexisdigital.com/en/contact` — ProfessionalService with email
- `https://www.kinexisdigital.com/manifest.webmanifest` — 200 JSON

**Sitemap freshness check:** Confirm `/sitemap.xml` shows varied `<lastmod>` (not one build timestamp for all URLs).

---

## Human follow-up (cannot automate)

| Task | Action |
|------|--------|
| **Ahrefs re-crawl** | Run Site Audit in Ahrefs dashboard after deploy. Compare against Jul 2 baseline (Health Score 41, 1,710 errors). Expect hreflang/canonical fixes from Phases 3–4 to clear; structured data errors should drop with new logo + no fabricated phone. |
| **GSC Rich Results** | Monitor Enhancements → Organization / Local business after deploy |
| **IndexNow** | Re-run `npm run submit:indexnow` after deploy if production sitemap URL count changed |

---

## Intentional constraints

- **No street address** in schema — KINEXIS is remote-first; only `addressCountry` is published (matches visible site content).
- **No telephone** in schema — no public phone on site; email matches footer and contact form.
- **OG image unchanged** — still `/assets/images/kinexis_OG_image.png` for social cards; logo schema uses separate square icon asset.

---

## Files changed

- `src/lib/business.ts` (new)
- `src/lib/metadata.ts`
- `src/lib/schema.ts`
- `src/lib/sitemap-last-modified.ts` (new)
- `src/app/sitemap.ts`
- `src/app/manifest.ts`
- `src/app/[locale]/page.tsx`
- `src/app/[locale]/contact/page.tsx`
- `src/app/[locale]/about/page.tsx`
- `src/app/[locale]/digital-marketing-agency/page.tsx`
- `scripts/phase8-structured-data-audit.mjs`
