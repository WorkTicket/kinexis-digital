# Phase 9.2 — Performance root-cause findings

**Build/source:** Phase 9.1 HEAD `fdd01516c852b9471ffaca79905b998be7e00365`, rebuilt for this investigation
**Measurement:** Lighthouse 13.6.0, Chromium 159.0.8154.6, local `next start`. Raw LHRs and full traces for all four routes/factors are retained locally under ignored `.audit/phase92/traces/`.

## Decision

The persistent **desktop** deficit was caused by a benchmark configuration error, not a demonstrated desktop rendering bottleneck. The desktop-form-factor budget run inherited Lighthouse's mobile simulation throttle. An explicit desktop throttle on the same built application scores 1.00 on all routes in two runs. This changes no budget and no site behavior. The **mobile** release gate still misses on home, pricing and portfolio; no component-level mobile optimization is yet justified.

## Confirmed evidence

- Before correction, the budget runner's desktop settings omitted an explicit `throttling` object while setting `throttlingMethod: "simulate"`. LHR `configSettings` confirm it therefore used **150ms RTT, ~1.6Mbps throughput, 4× CPU slowdown, and a mobile Android user agent** despite `formFactor: "desktop"`. This explains the misleading 0.75–0.80 desktop score band.
- On the same build/server, the explicit desktop profile (40ms RTT, 10Mbps, 1× CPU; unchanged 1350×940 viewport and 0.85 budget) produced **1.00 performance on all four routes twice**. `scripts/lighthouse-budget.mjs` now sets that profile explicitly. The historical 0.75–0.80 scores are retained as evidence of the misconfigured protocol, not treated as valid desktop-condition scores.
- The unchanged mobile simulation scores on the final build are `/` **0.94/0.94**, `/pricing` **0.93/0.93**, `/portfolio` **0.92/0.92**, and `/contact` **0.95/0.95**. The release gate is .95 for mobile, so the first three remain below it. The budget script's built-in pass floor remains .85; the stricter .95 mobile release gate remains in the matrix. Neither threshold was changed.
- Lighthouse's mobile LCP audit reports around **2.94–3.32s** on the final measurement pair. The homepage candidate is the high-priority hero-film poster; interior candidates are the high-priority page-hero artwork (`.hero-art`).
- Full Chrome trace artifacts for every benchmark route/factor show observed FCP/LCP at roughly **100–204ms** in this local environment. The LCP insight subparts similarly total around 100–220ms. The multi-second LCP is Lighthouse's **simulated** metric, not the observed trace timestamp; the apparent mismatch is explained by the simulation/modeling split. These locally observed times are not production field CWV and must not be compared directly with simulated scores.
- Local responses are fast (Lighthouse TTFB audit around 10–28ms); layout shift is 0. There are no render-blocking stylesheet links in the production build; Next CSS is inlined on 279/283 generated pages. A local Poppins 800 font is requested; observed transfer duration is about 7–11ms. No evidence points to a blocking font or CSS transfer.
- In the old mobile-throttled desktop LHR, main-thread totals are about 0.70–0.93s. Style & Layout is the largest named group on three samples (about 204–389ms); script evaluation is about 160–173ms. These categories do not explain the desktop score once desktop throttling is corrected.
- Lighthouse reports about **58KiB estimated unused JavaScript** in shared chunks `3794-3ec17d04f75eb881.js` (~66.8KB raw, ~31.7KB estimated unused) and `4bd1b696-e199e788e58acf79.js` (~64.1KB raw, ~28.1KB estimated unused). Individual page chunks are about 2.6KB. This is an opportunity estimate, not proof that the code is safely removable or that it accounts for the LCP.
- Long-task samples include route startup tasks around 88–176ms and shared-chunk work around 75–79ms. Total Blocking Time remains low (mostly 12–84ms in the baseline runs; variable up to 109ms in one run), so long-task duration alone does not explain the score band.
- The local budget environment did not initialize analytics/ad tags without configured production IDs and consent, and the chat widget stayed deferred/disabled. No third-party cost was isolated as a cause.

## Unresolved / not demonstrated

- **Mobile simulated LCP:** remains a score blocker against the mobile .95 release target. The trace shows the candidate is discovered and painted promptly under the local unthrottled observation; Lighthouse's mobile simulation predicts materially slower completion. The current evidence does not attribute that modeled delay to a safe, isolated component change.
- **Cold versus warm:** no controlled cache-state experiment was run. Budget runs navigate routes sequentially in a single Lighthouse browser process, but that is not a documented cold/warm comparison. Do not infer cache effects from these runs.
- **Hydration/rendering attribution:** shared Next chunks and page startup tasks are present, but bundle execution was not mapped to specific React components or hydration work. No source-level component has been demonstrated as the cause.
- **Historical comparison:** Phase 4 and Phase 9.1 desktop scores used the same incomplete runner configuration and therefore reproduce the same mobile-throttled desktop condition; they do not establish poor desktop-condition performance. Earlier production/unthrottled audit reports are also not equivalent and are excluded from causal claims.

## Recommended next investigation

For the remaining mobile failures, preserve the corrected desktop runner and capture a cache-disabled/cold plus repeat-navigation/warm comparison under the unchanged mobile configuration. Map the simulated LCP model and trace tasks to downloaded resources/source maps before testing one reversible change. Do not change budgets, feature availability, image quality, or production settings.
