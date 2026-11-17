# Phase 4 handoff

**Branch:** `phase-1/conversion-handoff`
**Base HEAD:** `9b78e94868691c20812d5952a356178d1560044c`
**Status:** Phase 4 committed at `b56648e2fdafcb99aac10615d5af62c4fc8383e6`; review found and corrected a test-fixture host-scope bug. Desktop performance remains an open release-quality issue.

## Completed

- Verified the isolated Phase 3 worktree and preserved all Phase 1–3 commits.
- Reconciled the CSV route count: 123 nonempty English URL fields include two retired Spanish blog slugs that redirect; actual English `200` inventory is 121 = 79 paired + 42 intentionally unmirrored.
- Recorded repeated Lighthouse budget and expanded diagnostic results without changing thresholds. Desktop budget failures remain explicit.
- Audited source image dimensions, responsive variants, and portfolio screenshot limitations.
- Fixed all 32 template detail-image dimensions to match their actual 1600px source masters; generated 800w/960w genuine-source derivatives and wired responsive candidates.
- Added a Playwright regression for portfolio detail image dimensions and responsive candidate selection.
- Marked the A1 Property Services screenshot stale after comparing the accessible live hero; genuine recapture remains outstanding. No generated replacement was used.

## Validation so far

- `npm run check`: passed; 28 lint warnings, no errors.
- `npm run check:invoice-security`: passed; PayPal sandbox not run.
- `npm run build`: passed; 297 static pages generated.
- Initial dedicated-port E2E: 53 passed, 6 skipped, and one Conferbot consent timeout. Cause: fixture cookie was scoped to `localhost` while the run used `127.0.0.1`; the browser correctly omitted it, so the consent banner remained open. This was a test-fixture/environment host mismatch, not an application defect.
- Correction: seed the consent cookie using the actual page origin. Focused Conferbot launcher-resize suite passes 2/2; full Playwright suite passes 54 tests with 6 expected skips and 0 failures.
- Post-change mobile Lighthouse: 0.93–0.95. Desktop Lighthouse: `/` 0.76, `/pricing` 0.76, `/portfolio` 0.75, `/contact` 0.80; all fail the unchanged 0.85 budget. A local desktop homepage trace shows LCP 3.1 s, FCP 1.6 s, TBT 40 ms, CLS 0; LCP resource loading is fast and element render delay dominates the recorded LCP phases. Lighthouse flags about 59.7 KB/300 ms of unused JavaScript as a possible opportunity. This needs code/trace attribution before changes.
- Image selection: desktop DPR 1 uses 800w (325 KB); mobile DPR 2.625 uses 960w (394 KB); DPR 3 uses 1600w original. Decode geometry is stable.

## Remaining blockers and readiness

1. Desktop Lighthouse remains a release-quality blocker; do not lower the threshold. Investigate render delay and unused-JS attribution with representative desktop traces.
2. Arrange genuine A1 screenshot recapture. Current CWV field data is unavailable.
3. **Phase 5 readiness: recommended to proceed** now that the Conferbot regression is resolved as a test-fixture host-scope issue and the full E2E suite passes. Keep desktop Lighthouse explicitly open as a separate release-quality gate. Do not push, merge, deploy, or alter the old main checkout.

**Phase 4 implementation commit:** `b56648e2fdafcb99aac10615d5af62c4fc8383e6`.
**Conferbot fixture correction:** `744c11aa37aa7ec96840e2e0661fb84ff33aeef4` (`test: scope consent fixture to active origin`); local only, not pushed, merged, or deployed.
