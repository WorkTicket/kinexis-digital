# Phase 6.1 — Regression review

**Branch:** `phase-1/conversion-handoff`  
**Base:** `6f13a00e20fa160ccc2e76a4b89622b3772c8f43`  
**Status:** Investigation complete; test environment corrected; no Phase 5 application change needed. Local commit only; no push, merge, deploy, or production configuration change.

## Decision

The eight repeat failures were **environment/configuration mismatches**, not regressions in the Phase 5 fixes. Playwright reused an existing `next start` process on port 3000. Process inspection showed it had started at 06:28, whereas `.next/BUILD_ID` had been regenerated at 09:30. With a rebuild performed in between, the process served stale rendered markup/styles/assets while the test source and current workspace were newer.

The complete suite failed twice against that server. Against fresh Next dev servers, all tests passed in four full-suite runs (two using explicit `PLAYWRIGHT_BASE_URL=http://localhost:3001`, then two with the corrected default Playwright server on port 3100). The Phase 5 responsive and consent code remains unchanged.

## Change

`playwright.config.ts` now uses `localhost:3100` and starts Next dev on port 3100 by default. This prevents the suite from silently borrowing the known long-lived production server on port 3000. `PLAYWRIGHT_BASE_URL` remains available for intentionally supplied external servers.

## Eight failure dispositions

The two original full-suite attempts reproduced the eight persistent failures (each relevant test failed in both Chromium and mobile projects):

| Test | Reported assertion / observed value | Disposition |
|---|---|---|
| `responsive-regressions.spec.ts` — portfolio live-site cards | At CSS viewport width 320, expected body width ≤320; stale page reported 434px. | Stale server served pre-fix markup/styles. Passed on fresh server. |
| `responsive-regressions.spec.ts` — Phoenix header CTA | At 320px, expected body width ≤320; stale page reported 336px. | Stale server served pre-fix styles. Passed on fresh server. |
| `responsive-regressions.spec.ts` — consent focus | Expected `__kxConsentKeyboardReady === true`; stale document returned false. | Stale server lacked current consent inline keyboard setup. Actual focus/Tab/Escape assertions pass on fresh server. |
| `smoke.spec.ts` — portfolio image dimensions | Expected 1600×8754 and 800/960/1600 srcset; stale page returned 1100×5371 and 640/1100 srcset. | Stale page had prior screenshot metadata/assets; assertion matches current route data. Passed on fresh server. |

Each row above represents two browser-project failures, totaling eight. Browser viewport was set to 320 CSS px for the responsive cases; the screenshot-dimension test checks DOM image metadata and decoded resource, not a viewport screenshot. Device scale factor does not explain the stale 1100-vs-1600 metadata. Initial error-context snapshots and logs are preserved locally, ignored by git, in `.audit/phase6.1/reported-test-results/`.

The first 10-worker run additionally had two PayPal SDK `pending` timeouts and two analytics boot timeouts. These did not recur in the 4-worker stale-server rerun or the fresh-server runs; they are classified as stale-server/startup interaction, not independently proven timing defects.

## Root-cause classification

- Portfolio overflow: **environment/configuration mismatch** (served stale build); not an application regression.
- Phoenix clipping: **environment/configuration mismatch** (served stale build); not an application regression.
- Consent readiness: **environment/configuration mismatch** (served stale document without current inline marker); not a readiness race on current source.
- Screenshot dimensions: **environment/configuration mismatch** (served stale asset metadata); assertion is correct for the current page.
- PayPal / analytics-only failures from the 10-worker attempt: **not reproduced**, likely server/build interference; retain as non-reproducing evidence, not declared a confirmed app defect.

No arbitrary waits, weakened assertions, or test disables were introduced.

## Verification

- Fresh dev at explicit port 3001: **60 passed, 6 skipped, 0 failed**, twice.
- Corrected default Playwright server at port 3100: **60 passed, 6 skipped, 0 failed**, twice (`--workers=4`).
- `npm run check`: passed; 28 existing lint warnings, zero errors.
- `npm run check:invoice-security`: passed; PayPal HTTP mocked, sandbox not run.
- `npm run build`: passed; 297 pages generated.
- Phase 5 implementation `02d50f9a` is an ancestor of this branch. Current responsive and consent regressions pass without modifying Phase 5 code.

## Phase 7 readiness

**Regression gate:** passed in this local environment, with the stale-server root cause understood and default port isolated.  
**Overall Phase 7 readiness:** **not authorized yet**. Phase 6 owner decisions remain open (billing start, guarantee qualifications, review/portfolio evidence). Release blockers remain: desktop performance 0.76–0.80 vs 0.85; sampled mobile performance below 0.95; genuine A1 portfolio screenshot recapture; manual WCAG 2.2 AA verification; unknown production-field Core Web Vitals; and live payment, lead delivery, analytics, and Conferbot verification.
