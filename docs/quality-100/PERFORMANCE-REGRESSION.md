# Phase 9 — Performance regression investigation

## Controlled current runs

Current source was built with `npm run build` and served by a fresh `next start` process on `127.0.0.1:3113`. The repository `scripts/lighthouse-budget.mjs` was run twice sequentially against that same unchanged optimized build and server. Settings remained unchanged: Lighthouse **13.6.0**, mobile 412×915 at DPR 2.625 with Lighthouse mobile simulation; desktop 1350×940 at DPR 1 with desktop simulation; budgets retained at performance 0.85 and accessibility/best-practices/SEO 0.90. Chromium reported by Playwright was **159.0.8154.6**.

| Route | Mobile run 1 | Mobile run 2 | Target 0.95 | Desktop run 1 | Desktop run 2 | Target 0.85 |
|---|---:|---:|---|---:|---:|---|
| `/` | 0.94 | 0.94 | FAIL | 0.77 | 0.77 | FAIL |
| `/pricing` | 0.93 | 0.93 | FAIL | 0.76 | 0.77 | FAIL |
| `/portfolio` | 0.92 | 0.92 | FAIL | 0.76 | 0.76 | FAIL |
| `/contact` | 0.97 | 0.95 | PASS | 0.80 | 0.80 | FAIL |

Accessibility, Best Practices and SEO scored 1.00 on all eight routes per run. The budget script exits 1 in both runs because all desktop scores remain below 0.85; this is an expected gate failure, not a test harness failure. Current raw command output is retained locally under ignored `.audit/phase9/lighthouse-run-{1,2}.txt`.

## Comparison and interpretation

- Compared with Phase 4’s same-script post-change desktop results (`/` 0.76, `/pricing` 0.76, `/portfolio` 0.75, `/contact` 0.80), current scores are within 0.00–0.01; this does not demonstrate a regression or a material improvement.
- Compared with early Phase 1 production runs (desktop 0.80–0.84), these current local optimized-build runs are 0.03–0.08 lower. This is not a controlled environment-to-environment comparison: those were historical production requests with different server/network conditions. The project’s later repeated local runs (0.75–0.80) reproduce the present band, so the change in score cannot be attributed to the Phase 8.1 `web-vitals` bundle or a specific commit from these numbers alone.
- The previous Phase 4 trace found the LCP element promptly discovered/high-priority with very short resource delay and transfer; element-render delay was the largest LCP subphase (approximately 105–292ms across four budget routes), TBT was 20–80ms in that run, CLS was 0, and Lighthouse estimated ~59.7KB unused JavaScript / 300–450ms opportunity. These are trace leads, not proof of a removable script or safe optimization.
- Phase 4’s expanded Lighthouse trace found local homepage LCP phases of about 14ms TTFB, 12ms resource delay, 21ms transfer and 110ms element-render delay; this used a different runner/configuration and is not merged into the budget table.
- Consent-gated analytics/ads were not initialized in the local budget runs; chat remains deferred. No new blocking script or CSS change was made in Phase 9.

## Disposition

No low-risk optimization with measured, attributable gain was established. We made no code or budget change. Desktop remains a release blocker on all four target routes; mobile remains below 0.95 on homepage, pricing and portfolio in both runs. The next useful investigation is a controlled trace identifying the specific render/hydration work behind the LCP element-render and unused-JS opportunities, followed by one scoped A/B change under the same runner. Do not defer required functionality, reduce image quality, remove features or lower the budgets to pass.

Lab Lighthouse scores are not production field CWV. No production RUM, Search Console field data or Cloudflare retention was accessed.

## Phase 9.1 rebuilt-site confirmation — 2026-11-17

After the genuine A1 screenshot and the small accessibility semantics update, the production build was rebuilt and the unchanged budget script was run twice against a fresh local `next start` server. Lighthouse remained 13.6.0; existing viewports, throttling and budgets were preserved. Chromium was 159.0.8154.6.

| Route | Mobile run 1 | Mobile run 2 | Target | Desktop run 1 | Desktop run 2 | Target |
|---|---:|---:|---|---:|---:|---|
| `/` | 0.93 | 0.94 | 0.95 | 0.77 | 0.76 | 0.85 |
| `/pricing` | 0.93 | 0.93 | 0.95 | 0.76 | 0.77 | 0.85 |
| `/portfolio` | 0.92 | 0.92 | 0.95 | 0.76 | 0.76 | 0.85 |
| `/contact` | 0.95 | 0.95 | 0.95 | 0.80 | 0.80 | 0.85 |

Accessibility, Best Practices and SEO each remained 1.00 on all routes in both runs. Desktop still fails all four targets; mobile still fails the home, pricing and portfolio targets. No performance budget or functionality was relaxed.

A separate single diagnostic pass on this build measured FCP 1.23–1.56s, LCP 2.94–3.40s, TBT 12–78ms, CLS 0, and TTFB 6–12ms; Lighthouse found no render-blocking resources and estimated about 59.7KB unused JavaScript in two shared chunks. Style & Layout was the largest main-thread category on most sampled routes. These are diagnostic leads, not attribution or proof of a safe optimization. No performance code change was justified; desktop/mobile performance remain release blockers. Raw output is retained under ignored `.audit/phase91/`.
