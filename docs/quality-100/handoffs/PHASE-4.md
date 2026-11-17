# Phase 4 handoff

**Branch:** `phase-1/conversion-handoff`
**Base HEAD:** `9b78e94868691c20812d5952a356178d1560044c`
**Status:** Phase 4 committed locally as `ed2f4d43`; desktop performance budget and documented follow-ups remain open.

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
- Dedicated-port E2E: responsive test passed on Chromium and mobile. Full suite had 53 passed, 6 skipped, and one Conferbot resize/consent failure; a focused Chromium rerun reproduced it.
- Post-change mobile Lighthouse: 0.93–0.95. Desktop Lighthouse: `/` 0.76, `/pricing` 0.76, `/portfolio` 0.75, `/contact` 0.80; all fail the unchanged 0.85 budget.
- Image selection: desktop DPR 1 uses 800w (325 KB); mobile DPR 2.625 uses 960w (394 KB); DPR 3 uses 1600w original. Decode geometry is stable.

## Final actions

1. Review/resolve the open desktop Lighthouse budget gap; do not lower thresholds.
2. Arrange a genuine A1 screenshot recapture and triage the unrelated Conferbot resize test failure.
3. Leave Phase 5 pending review. Do not push, merge, deploy, or alter the old main checkout.

**Commit:** `ed2f4d43` (`perf: correct portfolio screenshot delivery audit`).
