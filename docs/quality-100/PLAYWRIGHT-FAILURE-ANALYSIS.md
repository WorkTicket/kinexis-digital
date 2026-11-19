# Playwright failure analysis — Phase 6.1

## Environment evidence

- Playwright config originally used `http://localhost:3000` and `reuseExistingServer: true`.
- Existing listener PID 12388 was `next start`, launched at 06:28 from this worktree.
- `.next/BUILD_ID` was last written at 09:30 after the Phase 6 build. The old server remained alive across that build and the failure runs.
- Phase 6's E2E runs therefore did not use the configured `npm run dev` command; Playwright saw the already-responding server and reused it.
- Stale server error contexts showed old output: portfolio live-card body width 434px at 320px, Phoenix document width 336px, missing consent keyboard-ready marker, and portfolio screenshot metadata 1100×5371 with 640/1100 srcset.
- Current-source tests on a clean Next dev server passed all four categories, including the expected 1600×8754 screenshot metadata.
- No uncommitted application changes existed at investigation start. Phase 5 implementation commit `02d50f9a` is an ancestor of `6f13a00e`.

## Failure ledger

| Occurrence | Browser | Viewport / environment | Result |
|---|---|---|---|
| First Phase 6 run, 10 workers | Chromium + Pixel 7 mobile | Shared stale `next start` on :3000; regression checks explicitly set 320 CSS px | 48 passed, 12 failed, 6 skipped. Eight persistent responsive/consent/image failures plus two PayPal pending timeouts and two analytics boot timeouts. |
| Phase 6 rerun, 4 workers | Chromium + Pixel 7 mobile | Same stale server; portfolio 320/375/390, Phoenix 320 | 52 passed, 8 failed, 6 skipped. Exactly the persistent eight. |
| Fresh dev, explicit :3001, run 1 | Chromium + Pixel 7 mobile | `PLAYWRIGHT_BASE_URL=http://localhost:3001` | 60 passed, 6 skipped, 0 failed. |
| Fresh dev, explicit :3001, run 2 | Chromium + Pixel 7 mobile | Same, four workers | 60 passed, 6 skipped, 0 failed. |
| Corrected default :3100, run 1 | Chromium + Pixel 7 mobile | `npm run test:e2e -- --workers=4` | 60 passed, 6 skipped, 0 failed. |
| Corrected default :3100, run 2 | Chromium + Pixel 7 mobile | Same | 60 passed, 6 skipped, 0 failed. |

Before code changes, original Playwright `error-context.md` snapshots were copied to ignored `.audit/phase6.1/reported-test-results/`; no trace was available because retries are off locally and traces are configured `on-first-retry`. Assertion output and DOM snapshots remain in those contexts. Phase 5 reported 60 passed, 6 skipped, 0 failed after its successful four-worker rerun.

## Category conclusions

1. **Portfolio overflow:** stale render caused it; current 320/375/390 widths pass.
2. **Phoenix clipping:** stale render caused it; current 320px CTA/header regression passes.
3. **Consent keyboard readiness:** current inline script sets the marker before focus operations; marker and keyboard flow pass. No arbitrary sleep added.
4. **Screenshot dimensions:** stale page returned former metadata; current project metadata and real selected variant satisfy existing assertion. Device DPR is explicitly accounted for by the test's currentSrc check; it does not determine intrinsic HTML width/height attributes.
5. **PayPal / analytics startup outliers:** four additional 10-worker-only failures did not recur; likely shared stale server/build interaction, not conclusively isolated beyond the environment mismatch.

The only correction was moving the default Playwright server to port 3100 to avoid the stale process on 3000. Assertions and Phase 5 implementation were preserved.
