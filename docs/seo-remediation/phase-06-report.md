# Phase 6 Completion Report — Internal Linking

**Status:** COMPLETE (code fixes + verify-and-document)  
**Date:** 2026-07-02  
**Branch:** `seo/phase-02-url-architecture` (Phase 6 deliverables; recommend `seo/phase-06-internal-linking` on merge)  
**Playbook:** Enterprise SEO Remediation Playbook v3 — Phase 6  
**Prior phase:** [phase-05-report.md](./phase-05-report.md)

---

## 1. Files modified

| Path | Change |
|---|---|
| `scripts/phase6-internal-links-audit.mjs` | **Added** — Full sitemap link-graph audit (inlinks, 3xx outlinks, orphans, Ahrefs diff) |
| `scripts/phase6-spot-check.mjs` | **Added** — Spot-check helper for rendered deep links |
| `src/lib/location-related-links.ts` | **Added** — Cross-city, service→location, pricing helpers |
| `src/lib/pricing-related-links.ts` | **Added** — Sibling pricing page groups |
| `src/lib/blog-related-links.ts` | **Added** — Cluster post service + sibling blog links |
| `src/lib/solution-related-links.ts` | **Added** — Same-service/industry + trades peer solutions |
| `src/lib/service-related-links.ts` | **Modified** — Solution deep links (google-ads→roofers, seo→verticals); funnels blog links |
| `src/components/sections/RelatedLinks.tsx` | **Modified** — `locationLinks`, `pricingLinks` groups |
| `src/components/pages/LocationPageClient.tsx` | **Modified** — Hub, cross-city, pricing contextual links |
| `src/components/pages/PricingPageClient.tsx` | **Modified** — Sibling pricing cross-links |
| `src/components/pages/SolutionPageClient.tsx` | **Modified** — Related solution cross-links |
| `src/components/pages/BlogPostsPageClient.tsx` | **Modified** — Cluster archive links |
| `src/components/services/ServicePage.tsx` | **Modified** — RelatedLinks with location + solution links (architected pages) |
| `src/components/services/ServicePageFooter.tsx` | **Modified** — Location + solution links (legacy service clients) |
| `src/app/[locale]/locations/page.tsx` | **Modified** — Browse-by-service deep link grid (all city×service pages) |
| `src/app/[locale]/blog/[slug]/page.tsx` | **Modified** — Explore Further block on cluster posts |
| `docs/seo-remediation/phase-06-audit.csv` | **Added** — 380-row link inventory |
| `docs/seo-remediation/phase-06-validation.json` | **Added** — Post-fix local validation (378/378 pass) |
| `docs/seo-remediation/phase-06-validation-postfix.json` | **Added** — Copy of post-fix validation |
| `docs/seo-remediation/phase-06-validation-production-predeploy.json` | **Added** — Production baseline before deploy |
| `docs/seo-remediation/phase-06-report.md` | **Added** — This report |

**Out of scope (not modified):** canonicals (Phase 3 ✓), hreflang (Phase 4 ✓), indexability (Phase 5 ✓), meta descriptions (Phase 7), sitemap structure (Phase 9).

---

## 2. Ahrefs baseline vs live outcome

| Ahrefs issue | Jul 1 rows | Production (pre-deploy) | Phase 6 outcome |
|---|---:|---|---|
| Page has links to redirect | 57 (38+19 HTTP dupes) | **0 pages** with 3xx internal outlinks | **Verify-and-document** — Phase 2 `localizeInternalLinks()` held; Ahrefs stale |
| Page has only one dofollow inlink (indexable) | 102 | **138** thin pages (<3 dofollow) | **Fixed** — contextual cross-links; 378/378 pass post-fix (local build) |
| Page has nofollow + dofollow incoming (indexable) | 200 | 0 unexplained mixed in live crawl | **Document** — lead-magnet page-level nofollow (Phase 5 Option A); Ahrefs 188+1 pattern expected |
| Page has nofollow outgoing internal links | 3 | Lead-magnet only | **Document** — intentional; do not fix (Phase 5 locked) |
| Orphans (Phase 1 cross-ref) | — | 0 | **Pass** |

---

## 3. Issues fixed (by Ahrefs issue name)

| Issue | Fix |
|---|---|
| **Links to redirect (57)** | No code change — production live audit confirms **0** internal outlinks to 3xx. Phase 2 blog href rewriting verified (`phase2-url-architecture.mjs` 8/8 blog checks PASS on production). |
| **One dofollow inlink — indexable (102)** | Contextual links via `RelatedLinks`, locations browse grid, service→location/solution maps, pricing siblings, blog cluster siblings. **138→0** thin pages on post-fix crawl. |
| **Mixed nofollow/dofollow incoming (200 indexable)** | No code change — no `rel="nofollow"` on internal `<a>` in `src/**` (grep confirmed). Residual Ahrefs rows = lead-magnet meta `nofollow` cascading to ~120 nav/footer links. |
| **Outgoing nofollow (3)** | No code change — lead-magnet `/en/lead-magnet`, `/es/lead-magnet` only. Documented per Phase 5. |
| **Orphans** | None found on 378 sitemap URLs. |

---

## 4. Linking patterns implemented

### Location service pages (`/locations/{city}/{service}`)
- City hub link + locations index
- Cross-city same-service links (up to 6 peers — all generated static pages, not filtered by `location.services`)
- National service + pricing links on service subpages
- **Inbound:** locations browse grid (32 links/service type), service pages (8 cities), peer cross-links

### Pricing subpages
- Sibling pricing links grouped by service category (`pricing-related-links.ts`)
- Existing service page `ServicePricingTeaser` retained

### Blog cluster posts
- `Explore Further` with parent service + category siblings + `/blog/posts` archive link
- Service pages link to relevant cluster posts via `service-related-links.ts`

### Solution pages
- Same-service/industry peers + trades cluster (`seo-for-hvac` ↔ `google-ads-for-roofers`)
- Service pages link back to flagship solutions

### Architected service pages (`ServicePage.tsx`)
- Added missing `RelatedLinks` block (previously only on legacy `ServicePageFooter` clients)

---

## 5. Intentional / documented items

| Item | Decision | Rationale |
|---|---|---|
| Lead-magnet mixed inlinks (Ahrefs 200 rows) | **Option A — Document** | Page-level `noindex, nofollow` on lead-magnet; removing it rejected in Phase 5 |
| Lead-magnet outgoing nofollow (3 rows) | **Document — do not fix** | Meta robots cascade; no per-link `rel="nofollow"` in codebase |
| Ahrefs links-to-redirect (57 rows) | **Stale** | Live production + Phase 2 script show locale-prefixed blog CTAs; 0 redirect outlinks |
| HTTP duplicate rows in Ahrefs exports | **Stale** | Same pattern as Phases 2–5 |

---

## 6. Validation results (tool output)

### Post-fix (local production build — deploy this branch to verify on production)

```bash
npm run build
# → Pass (392 pages)

node scripts/phase6-internal-links-audit.mjs http://localhost:3000
```

```json
{
  "sitemap_pass": 378,
  "sitemap_fail": 0,
  "thin_dofollow_inlinks": 0,
  "outlinks_to_redirect_pages": 0,
  "orphan_count": 0,
  "src_has_rel_nofollow_on_internal": false,
  "phase6Pass": true
}
```

Full output: `docs/seo-remediation/phase-06-validation-postfix.json`

### Production pre-deploy baseline (2026-07-02, before Phase 6 deploy)

```bash
node scripts/phase6-internal-links-audit.mjs https://www.kinexisdigital.com
```

```json
{
  "sitemap_pass": 240,
  "sitemap_fail": 138,
  "thin_dofollow_inlinks": 138,
  "outlinks_to_redirect_pages": 0,
  "orphan_count": 0,
  "phase6Pass": false
}
```

Full output: `docs/seo-remediation/phase-06-validation-production-predeploy.json`

### Phase 2 blog redirect re-check (production)

```bash
node scripts/phase2-url-architecture.mjs https://www.kinexisdigital.com
# → phase2Pass: true (4/4 redirect probes, 8/8 blog link checks)
```

---

## 7. Remaining issues + reasons

| Item | Status | Reason |
|---|---|---|
| Ahrefs mixed-inlink rows (200 indexable) | Open in Ahrefs until re-crawl | Lead-magnet artifact; no code fix without reversing Phase 5 decision |
| Ahrefs links-to-redirect (57) | Open in Ahrefs until re-crawl | Already resolved on production HTML |
| Production thin-inlink count | **Deploy required** | Pre-deploy production still shows 138 thin pages; post-fix validation is on local build |
| `mixed_inlinks_count: 0` in live crawl vs Ahrefs 200 | Investigated | Site-wide nav does not link from lead-magnet to every sitemap URL in static HTML crawl; Ahrefs may count chrome differently or crawl lead-magnet more aggressively |

---

## 8. Blockers for human review

1. **Deploy Phase 6 branch** — Re-run `node scripts/phase6-internal-links-audit.mjs https://www.kinexisdigital.com` after deploy; expect `phase6Pass: true`.
2. **Trigger Ahrefs re-crawl** — Clears stale redirect rows + refreshes inlink counts.
3. **Lead-magnet mixed inlinks** — If business later opts into Option B (strip global nav from lead-magnet layout only), revisit; not recommended now.

---

## 9. Commands executed

```bash
npm run build
node scripts/phase6-internal-links-audit.mjs https://www.kinexisdigital.com
node scripts/phase6-internal-links-audit.mjs http://localhost:3000
node scripts/phase2-url-architecture.mjs https://www.kinexisdigital.com
node scripts/phase2-url-architecture.mjs http://localhost:3000
node scripts/phase6-spot-check.mjs http://localhost:3000
```

---

## 10. Confirmation — scope boundaries

- Phase 7 (meta descriptions, HTML lang) — **not started**
- Canonical / hreflang / indexability / robots — **not modified**
- Lead-magnet `noindex, nofollow` — **unchanged** (Phase 5 Option A)
- No generic footer link dumps — contextual `RelatedLinks` and hub grids only

**Phase 6 complete.** Deploy, re-crawl Ahrefs, then proceed to Phase 7 when ready.
