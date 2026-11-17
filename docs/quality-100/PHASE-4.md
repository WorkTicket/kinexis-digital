# Phase 4 — Performance and image-quality audit

**Branch:** `phase-1/conversion-handoff`
**Base commit:** `9b78e94868691c20812d5952a356178d1560044c`
**Status:** Phase 4 implementation committed as `b56648e2`; review follow-up identified and fixed the Conferbot test fixture host-scope bug. Desktop performance budget remains unresolved. No push, merge, deployment, or production configuration changes.

## Route-count reconciliation

The Phase 3 CSV has 123 nonempty English-URL rows, but this is not 123 English `200` routes. Two rows are retired Spanish-language blog slugs that redirect to related English destinations. The audited inventory is 121 English `200` routes: 79 paired routes (77 content pairs plus two noindex checkout utilities) and 42 intentionally unmirrored English routes. The CSV and Phase 3 record remain the source of truth.

## Performance findings

- The existing Lighthouse performance budget remains 0.85; it was not lowered.
- Sequential local production-build runs on the four budget routes scored mobile 0.92–0.97 and desktop 0.75–0.82. All four desktop routes fail the existing budget. Details and methodology are in `PERFORMANCE-BASELINE.md`.
- An expanded eight-route diagnostic produced desktop 100s because that runner uses unthrottled desktop settings. Those results are explicitly not comparable to the budget checks.
- Trace evidence did not justify broad CSS/JavaScript changes or modifications to the LCP hero. Production field CWV remain unknown because Workers Observability/Search Console data were not accessed.

## Image findings and scoped fix

- `IMAGE-AUDIT.csv` inventories 111 image records, with source dimensions/bytes and available responsive derivatives.
- `PORTFOLIO-SCREENSHOT-AUDIT.csv` inventories 32 portfolio templates and three live-site screenshots. It records freshness, text legibility, capture-source availability, and limitations rather than implying unperformed verification.
- A1 Property Services' stored screenshot hero differs from its accessible live site. It is recorded as stale; a genuine recapture remains outstanding. No replacement image was fabricated or generated.
- Template portfolio detail images were incorrectly labeled 1100px wide despite having 1600px source masters. The stale dimensions reserved an incorrect image ratio. Project metadata now uses the masters' actual dimensions; true-source 800w/960w responsive WebPs were generated and wired into the detail-page `srcset`, retaining the original for high-DPR displays.
- A regression test checks the tileline screenshot's dimensions, candidate list, and selected source on desktop and mobile.

## Verification

- `npm run check` — passed; 28 lint warnings, no errors; typecheck and configured checks passed.
- `npm run check:invoice-security` — passed; PayPal HTTP calls were mocked and sandbox testing was not run.
- `npm run build` — passed; 297 static pages generated, with existing inline-CSS build guards passed.
- Initial dedicated-port `npm run test:e2e` — 53 passed, 6 skipped, one Conferbot resize/consent test failed. Investigation found the fixture hard-coded cookie domain `localhost` while the test server was `127.0.0.1`; the consent cookie was therefore not sent and the banner correctly stayed open. The fixture now scopes the cookie to the actual page origin. Focused resize tests pass 2/2 after the correction.
- Full E2E rerun after the fixture correction — passed: 54 passed, 6 skipped, 0 failed.
- Desktop DPR 1 selected the new 800w source at 325 KB; DPR 2.625 selected 960w at 394 KB; DPR 3 selected the original 1600w source. Image height remained stable after decode.
- Post-change mobile Lighthouse budget run passed at 0.93–0.95. Complete desktop rerun scored `/` 0.76, `/pricing` 0.76, `/portfolio` 0.75, and `/contact` 0.80; all remain below the existing 0.85 budget. Other categories were 1.00.

## Remaining issues

- Desktop Lighthouse budget remains unresolved across all four budget routes; do not claim Phase 4 performance completion until reviewed.
- Current field CWV data unavailable.
- A1 Property Services live screenshot recapture awaits a genuine capture.
- No production Conferbot integration was enabled; the test continues to use a mock widget and a local consent cookie.
- Desktop performance remains an open release-quality gate. Phase 5 accessibility audit can proceed; no deployment/release acceptance is implied.

**Phase 4 implementation commit:** `b56648e2fdafcb99aac10615d5af62c4fc8383e6` (`perf: correct portfolio screenshot delivery audit`).
The review follow-up (`test: scope consent fixture to active origin`) is local only; no push, merge, or deployment.
