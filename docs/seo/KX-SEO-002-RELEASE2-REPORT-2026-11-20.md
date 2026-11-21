# KX-SEO-002 — Release 2 engineering report

**Status:** Local release candidate; not production-deployed.  
**Branch:** `release/2-performance-html`  
**Scope:** Performance measurement and HTML/CSS transfer weight only. No Cloudflare
production settings, Worker routes, cache rules, secrets, or integrations changed.

## Findings and change

- **FACT — Historical Ahrefs baseline (Nov 18):** 70 slow-response URLs; the
  69 `www` URLs had median TTFB 2,488 ms, range 1,830–10,256 ms, p95 5,187 ms.
  Connect reported 3,138 ms. The source export is
  `KX-SEO-002-AHREFS-SLOW-SERVER-2026-11-18.csv`.
- **FACT — Live reproduction:** Three sequential HTTPS GETs on ten URLs returned
  200 in each of two runs. Run 1 median TTFB was 163.85 ms (p95 485.7 ms); run 2
  median was 228 ms (p95 958.3 ms, maximum 1,055.4 ms). Fresh-connection
  medians were 389.95 ms and 442.7 ms; reused-connection medians were 151.2 ms
  and 210.75 ms. The raw records are in the two `KX-SEO-002-NODE-GET-TTFB-
  RELEASE2-*.csv` files.
- **FACT:** `Age` and `CF-Cache-Status` were absent in the sampled responses.
  `s-maxage` was present. The samples do not establish whether HTML was an edge
  hit or miss, and do not identify Worker execution time.
- **FACT — Ahrefs UA spot check:** 12 requests with an AhrefsBot user-agent all
  returned 200; this was not traffic from Ahrefs infrastructure.
- **FACT — HTML profile:** The live templates measured 668–854 KiB decoded HTML.
  The shared inline CSS measured 251,998 bytes; the CSS was also duplicated in
  the RSC stream. The 252,488-byte content-hashed stylesheet is already served
  with `Cache-Control: public, max-age=31536000, immutable` locally.
- **Implemented:** `next.config.ts` now keeps that large shared CSS in its
  independently cacheable hashed stylesheet rather than inlining it into every
  HTML response. CSS remains render-blocking; the earlier async-CSS experiment
  caused FOUC/hydration failures and was not restored.
- **Regression guard:** `scripts/check-css-inlined.mjs` now requires static pages
  to link the shared stylesheet and verifies four priority HTML documents stay
  below 600 KiB. Final production build output: 285/289 generated HTML pages link the CSS;
  four framework error documents are intentionally exempt. The four core routes
  pass the byte budget.
- **FACT — Local build output:** For the homepage, pricing, plumbing,
  landscaping, A1 case study, blog, and Spanish plumbing article, decoded HTML
  measured 165–351 KiB; inline style was 980 bytes (the small first-paint
  document rules). These are local Next production-build observations, not
  production after-deployment measurements.
- **FACT — Representative before/after decoded HTML bytes** (production before,
  local candidate after; same source commit except CSS delivery configuration):

  | Template | Before | Candidate | Difference |
  | --- | ---: | ---: | ---: |
  | Homepage | 852,218 | 348,280 | −503,938 (−59.1%) |
  | Pricing | 805,831 | 302,808 | −503,023 (−62.4%) |
  | Plumbing | 740,242 | 237,037 | −503,205 (−68.0%) |
  | A1 case study | 668,318 | 165,209 | −503,109 (−75.3%) |

  This is decoded document size, not Lighthouse wire transfer. The stylesheet
  itself is now a separate request; whether that trade-off improves mobile
  rendering is evaluated separately below.

### TTFB assessment

**INFERENCE:** The severe Nov 18 crawler readings were not reproduced consistently
from this client/network vantage point. Fresh connection setup, geography,
transient edge/origin load, crawler path, and cache state remain possible
factors; current evidence cannot choose among them. No Worker/cache serving
change is justified without cache-status or Worker timing evidence. The latest
sample does include fresh-connection values above 800 ms, so this does not prove
the target is met for all regions or crawlers.

### Mobile Lighthouse

Three baseline mobile Lighthouse runs were captured for `/`, `/pricing`,
`/industries/plumbing`, and `/case-studies/a1-property-services` against the
production hostname. Results are in
`KX-SEO-002-LIGHTHOUSE-BASELINE-2026-11-20.csv`. Three runs per route were also
captured against the local production build with the candidate CSS delivery;
run-level TTFB, LCP, CLS, TBT, document bytes, JS bytes, CSS bytes, and total
transfers are in `KX-SEO-002-LIGHTHOUSE-CANDIDATE-2026-11-20.csv`.

| Route | Prod baseline LCP / decoded HTML | Local candidate LCP / CLS / TBT | Local candidate decoded HTML / document transfer / CSS transfer |
| --- | ---: | ---: | ---: |
| Home | 1,805 ms / 852,218 B | 2,030 ms / 0 / 360 ms | 348,280 B / 62,011 B / 51,747 B |
| Pricing | 3,902 ms / 805,831 B | 2,974 ms / 0 / 513 ms | 302,808 B / 56,374 B / 51,747 B |
| Plumbing | 1,758 ms / 740,242 B | 2,257 ms / 0 / 441 ms | 237,037 B / 51,151 B / 51,747 B |
| A1 case study | 3,673 ms / 668,318 B | 3,569 ms / 0 / 354 ms | 165,209 B / 38,099 B / 51,747 B |

Candidate median JavaScript transfer was 183,412 B on localhost; production
baseline medians were 164,587 / 164,534 / 164,530 / 164,426 B. Candidate total
transfer medians were 348,854 / 536,157 / 520,192 / 564,228 B, compared with
314,404 / 500,715 / 488,409 / 534,148 B on the production baseline. These
cross-host results are not an apples-to-apples comparison; notably, the
standalone CSS request adds 51,747 transferred bytes to each cold candidate
run. No LCP or total-transfer improvement is claimed. A matched post-approval
production measurement (including warm repeat visits) is still required.

## Validation

- `npm run check` — PASS.
- `npm run build:worker` — PASS on the final external-CSS candidate, including
  the production-only CSS cache-header rule and updated build guard. Next emits
  a warning that custom Cache-Control headers can affect development behavior;
  the rule is gated off when `NODE_ENV` is development.
- `node scripts/check-css-inlined.mjs` — PASS on the final production output; 285/289
  generated pages link the content-hashed CSS asset, the asset exists, the
  one-year immutable cache policy is configured, no CSS copies are inlined,
  and four core HTML routes are under 614,400 bytes.
- **Runtime header check** — PASS: local `next start` returned HTTP 200 for the
  252,488-byte CSS asset with
  `Cache-Control: public, max-age=31536000, immutable`.
- `node scripts/check-structured-data.mjs http://127.0.0.1:3200` — PASS, 9/9.
- `node scripts/smoke-routes.mjs http://127.0.0.1:3200` — PASS, 155/155 URLs.
- `npm run check:route-integration` — PASS.
- First full `npm run test:e2e` — 173 passed, 10 skipped, 3 failed under
  ten-worker load (one transient `/es` 500 and two 60-second route-crawl
  timeouts).
- `npm run test:e2e -- --workers=4` — PASS: 176 passed, 10 skipped, 0 failed
  across 186 tests in 5 minutes. The local Cloudflare preview printed a
  Durable Object binding warning and the browser reported a hydration mismatch
  on `main#content`'s `tabindex`; neither caused a test failure, but retain
  these as follow-up observations.

## Release controls and outstanding work

- Production status: **NOT DEPLOYED**. No production approval or deployment was
  requested/performed. Before release, obtain Colton's approval for this exact
  candidate and attach follow-up independent QA verdicts. `docs/release/
  ROLLBACK-PLAN.md` remains PARTIAL: previous Worker version IDs are documented,
  but rollback/restore is untested and the invoice backup is not a verified
  recovery artifact for this static/CSS change. Confirm the current Worker
  version, intended rollback target, and exact recovery procedure with Cloudflare
  Operations before any release approval.
- Ahrefs recrawl, post-deploy timing, and account-wide score comparison remain
  **NOT VERIFIED** and require an approved production deployment plus access to
  the original Ahrefs project.
- Connect ownership remains `WorkTicket/kinexis-connect`; no Connect code was
  changed.
- Independent QA follow-up reviewed the updated code and metrics before the
  final E2E run; it reported CSS delivery/guard PASS; measurement claims PASS;
  TTFB characterization PASS; release readiness PASS only as a gated
  candidate, NOT ready to deploy. QA's subsequent addendum confirms validation
  coverage PASS for the completed E2E gate (176 passed, 10 skipped, 0 failed).
  The Durable Object binding warning and hydration mismatch remain observations,
  not blockers, per QA.
- The requested Coding Playbook, Repo Map, Failure Log, Lessons Log, Estimate
  Log, and Agent Board were not found in this repository. No replacement
  records were invented.
- Risk: External CSS introduces a blocking stylesheet request for first-time
  visitors. Content-hash caching benefits repeat page loads; matched mobile
  Lighthouse candidate results are required before asserting the trade-off is
  favorable.

**Next action:** Verify the rollback target and recovery procedure with
Cloudflare Operations, then prepare the exact candidate for owner approval. No
deploy before approval.
