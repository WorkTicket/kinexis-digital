# Phase 2 — Technical SEO and crawl audit

**Date:** 2026-11-17
**Production deployed or modified:** No
**Source:** Phase 1 commit `60a59ec9e83fa93ee47c1d6a44d16a694a0d46fc`

## Result

The read-only production crawl covered all **150 sitemap URLs** and **58 additional internal URLs** (208 unique requests total; query-bearing contact links are recorded separately). It found no failed final responses, broken internal page targets, broken image references, or sitemap URLs that redirect. A pair of retired Spanish-slug URLs were still linked from the English blog index and returned 301; the English index and its `ItemList` schema now omit those retired entries. Spanish pages remain available at `/es/...`, and the intentional legacy redirects are unchanged.

The rest of the apparent duplicate metadata is explained by URL variants, not duplicate indexable pages: `/` versus the origin without a trailing slash, contact URLs carrying `?plan=...` but canonicalized to the clean contact path, and legacy URLs that redirect to their intended canonical pages. No broad metadata rewrite or SEO policy change was justified.

## Crawl findings

| Severity | Count | Finding / disposition |
| --- | ---: | --- |
| Critical | 0 | — |
| High | 0 | — |
| Medium | 1 | English blog hub linked to two retired Spanish-slug paths (301s). Fixed; regression test added. |
| Low | 0 open | Metadata duplicate signal was inspected and classified as URL variants/redirect aliases; no duplicate indexable canonical pages found. |

The report contains 208 requested URLs. Each row records requested/final status and redirect chain, canonical, robots, HTML and sitemap hreflang, title, description, H1, JSON-LD type names, internal links, sitemap membership, intended/declared language, indexability, broken image references, and fetch errors.

## Reproduction

From repository root, with network access:

```sh
node scripts/crawl-seo.mjs https://www.kinexisdigital.com docs/quality-100/SEO-CRAWL.csv
```

The script obtains the sitemap first, crawls its URLs plus same-origin HTML links (up to 600 pages), records manual redirect hops, and checks discovered image references. Production is read-only. Counts can change as production content changes; the checked-in CSV is the 2026-11-17 capture.

## International SEO and crawl policy

- `/es-es` returned `301 /es`, consistent with the approved locale strategy.
- `/robots.txt` returned 200, permits crawling, disallows `/api/`, and points to the canonical sitemap.
- Sitemap returned 150 URLs. No sitemap URL redirected during the crawl; the two retired English slugs are not sitemap members.
- `/es/` pages use Spanish HTML language; English pages use English. Hreflang targets from both rendered HTML and sitemap entries resolved to crawled same-origin pages. English fallbacks for untranslated paths and Spain's `/es-es` redirect remain unchanged.
- Utility/legal pages marked `noindex` and demo/retired industry URLs were not changed. Their absent canonical metadata is intentional under the current `pageMetadata` policy.
- No orphaned sitemap URLs were found in the internal-link graph after normalizing host/path slash variants.

## Implemented

- Excluded the two explicitly redirected Spanish-slug post entries from the English blog cards and visible `ItemList` schema. This fixes actual internal links without deleting Spanish content, altering the redirect map, or changing sitemap membership.
- Added a Playwright regression assertion for the retired links.

## Not changed / approval gates

No indexability, canonical ownership, URL strategy, redirect policy, pricing, guarantees, page inventory, or large-scale content changes were made. No further changes require approval based on this crawl. Revisit only if Search Console or owner evidence supports changing existing policy.

## Verification

See [`SCHEMA-VALIDATION.md`](./SCHEMA-VALIDATION.md), [`SEO-ISSUES.md`](./SEO-ISSUES.md), and [`INTERNAL-LINKS.md`](./INTERNAL-LINKS.md). The production crawl is evidence about the current production deployment; the code fix is not a production improvement until separately deployed and crawled.

## Files and status

- `scripts/crawl-seo.mjs` — reproducible crawler.
- `docs/quality-100/SEO-CRAWL.csv` — production capture.
- `docs/quality-100/PHASE-2.md`, `SEO-ISSUES.md`, `INTERNAL-LINKS.md`, `SCHEMA-VALIDATION.md`, `handoffs/PHASE-2.md` — findings and handoff.
- `src/app/(en)/blog/page.tsx`, `e2e/smoke.spec.ts` — low-risk correction and regression.

## Verification results

- `npm run check` — passed; 28 existing lint warnings, zero errors.
- `npm run check:invoice-security` — passed; provider calls mocked, PayPal sandbox not run.
- `npm run check:seo-ownership` — passed (42 intents, 48 posts).
- `npm run check:spanish-mirror` — passed (79 paths).
- `npm run check:meta-length` — passed (28 industry descriptions).
- `npm run check:structured-data https://www.kinexisdigital.com` — passed 9/9.
- `npm run build` — passed; Next.js production build generated 297 pages and passed CSS/legacy-polyfill checks.
- `node scripts/check-structured-data.mjs http://localhost:3000` — passed 9/9 against the built local server.
- `npx playwright test` — 46 passed, 6 expected skips. Local Cloudflare Durable Object warning appeared; tests passed.
- Production crawl — 208 URLs total (150 sitemap, 58 discoverable), zero final failures and broken image refs. Two old blog redirects were the identified defect; the production capture intentionally remains a pre-deployment snapshot.
- Second crawl against built local output — 205 URLs total (150 sitemap, 55 discoverable), zero failed final responses, redirecting crawl URLs, or broken image references.

The local build crawl confirms the corrected blog page does not point to the two legacy redirects. The production crawl is not updated because this branch was not deployed.

## Changed files

- `scripts/crawl-seo.mjs`
- `src/app/(en)/blog/page.tsx`
- `e2e/smoke.spec.ts`
- `docs/quality-100/SEO-CRAWL.csv`
- `docs/quality-100/PHASE-2.md`
- `docs/quality-100/SEO-ISSUES.md`
- `docs/quality-100/INTERNAL-LINKS.md`
- `docs/quality-100/SCHEMA-VALIDATION.md`
- `docs/quality-100/handoffs/PHASE-2.md`

## Exit decision

Phase 2 code-level exit criteria are met: crawl is reproducible, the critical/high count is zero, the demonstrated internal redirect links are fixed and regression-tested, existing SEO checks and full E2E pass, and unresolved policy changes are not needed. **Phase 2 is ready for review; Phase 3 has not started.** Production SEO improvements remain unverified until an approved deployment and post-deployment crawl. Desktop Lighthouse remains a separate open performance item.

**Commit:** this report is included in the Phase 2 commit on `phase-1/conversion-handoff`; see repository history for its SHA.
