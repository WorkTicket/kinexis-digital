# Phase 4 performance baseline

**Captured:** 2026-11-17
**Source:** clean `phase-1/conversion-handoff` worktree, HEAD `9b78e94868691c20812d5952a356178d1560044c`
**Runtime:** Node 24.15.0, Next.js 16.4.6, Lighthouse 13.6.0
**Production changes:** none; measurements below were against local `next start`.

## Repeatable Lighthouse budget runs

The repository budget script was run twice, sequentially, against `http://127.0.0.1:3491`. Its existing settings were preserved: mobile 412×915 at DPR 2.625 with Lighthouse mobile simulation; desktop 1350×940 at DPR 1 with desktop simulation. Performance budget remains 0.85; accessibility, best practices, and SEO budgets remain 0.90.

| Route | Mobile run 1 | Mobile run 2 | Desktop run 1 | Desktop run 2 | Result |
| --- | ---: | ---: | ---: | ---: | --- |
| `/` | 0.94 | 0.94 | 0.79 | 0.77 | Desktop below budget |
| `/pricing` | 0.94 | 0.93 | 0.77 | 0.76 | Desktop below budget |
| `/portfolio` | 0.92 | 0.92 | 0.75 | 0.76 | Desktop below budget |
| `/contact` | 0.97 | 0.95 | 0.82 | 0.80 | Desktop below budget |

All non-performance categories scored 1.00 on the four budget routes in both runs. Local lab runs are not field Core Web Vitals and are not directly comparable to production runs.

## Expanded route diagnostic

`scripts/audit-lighthouse.mjs` was run on `/`, `/pricing`, `/portfolio`, `/contact`, `/audit`, `/lp/phoenix-preview`, `/industries/plumbing`, and `/blog/website-mistakes-that-cost-you-calls`. The same script run included all routes in mobile and desktop modes. It produced per-route FCP, LCP, TBT, CLS, and raw Lighthouse JSON under the ignored `.audit/` directory.

| Route | Mobile score | FCP ms | LCP ms | TBT ms | CLS | Desktop score |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| `/` | 94 | 1413 | 2876 | 99 | 0 | 100 |
| `/pricing` | 93 | 1436 | 3090 | 21 | 0 | 100 |
| `/portfolio` | 92 | 1396 | 3247 | 69 | 0 | 100 |
| `/contact` | 95 | 1244 | 2868 | 15 | 0 | 100 |
| `/audit` | 95 | 1236 | 2944 | 46 | 0 | 100 |
| `/lp/phoenix-preview` | 95 | 1386 | 2866 | 70 | 0 | 100 |
| `/industries/plumbing` | 100 | 1409 | 1409 | 37 | 0 | 100 |
| `/blog/website-mistakes-that-cost-you-calls` | 100 | 1443 | 1443 | 22 | 0 | 100 |

**Do not compare these desktop scores to the budget scores:** this diagnostic runner deliberately uses unthrottled desktop throughput, unlike `lighthouse-budget.mjs` desktop simulation. It is used here for route coverage and trace inspection only.

## Root-cause trace observations

- The LCP element is the homepage hero poster on `/` and page-hero art on interior routes. Lighthouse reports its request as discoverable in the initial document, eagerly loaded, and high priority.
- On the expanded local trace, the mobile homepage LCP phases were approximately 14 ms TTFB, 12 ms resource-load delay, 21 ms transfer, and 110 ms element-render delay. The pricing image phases were about 33/12/15/95 ms. This local trace has fast loopback delivery and is diagnostic, not a production timing estimate.
- The local homepage trace showed 21 requests. The hero poster was a 15.8 KB AVIF, the locally hosted Poppins WOFF2 was 10.1 KB, and the two largest JavaScript chunks transferred about 69 KB and 66 KB. No third-party host appeared in the captured page-load requests. Analytics/advertising remain consent-gated; chat is deferred.
- Lighthouse's mobile main-thread breakdown on the local homepage was about 349 ms Style/Layout, 167 ms Script Evaluation, 44 ms Script Parse/Compile, and 44 ms HTML/CSS parsing; TBT was 99 ms. The unthrottled desktop trace showed roughly 85 ms Style/Layout and 42 ms Script Evaluation. These measurements do not support risky global CSS or hydration changes.
- Local CLS was zero on the expanded routes. Fonts are local, the display font is preloaded, and `font-display: swap` is used. CSS is inlined by the existing Next 16 build path; do not restore asynchronous CSS injection.

## Prior production comparison (Phase 1 evidence)

The committed Phase 1 `performance-runs.json` contains two desktop Lighthouse runs per budget route, captured against production on 2026-11-17. It reported scores of 0.80–0.84, LCP 2.17–2.39 s, FCP 1.27–1.37 s, TBT 70–167 ms, CLS 0, and variable TTFB of 70–364 ms. The homepage hero and interior page-hero resources had about 12–17 ms resource delay and 35–83 ms transfer duration. Phase 1 attributed most of the score gap to Lighthouse's stricter desktop LCP scoring curve; image compression was not supported as the root cause.

Those production readings are historical evidence, not a current live-site measurement or field CWV report. They are kept separate from this local baseline.

## Post-change desktop diagnosis

After the portfolio-source correction, a separate dedicated-port run used the same desktop budget emulation on all four budget routes. Scores were `/` 0.76, `/pricing` 0.76, `/portfolio` 0.75, and `/contact` 0.80; all still fail 0.85. Non-performance categories were 1.00. Per-route LCP/FCP/TBT/CLS and opportunity details are in `PERFORMANCE-RESULTS.md`.

The homepage LCP insight showed approximately 12 ms TTFB, 11 ms resource delay, 8 ms resource duration, and 292 ms element-render phase, while overall LCP was 3.1 s. The four routes had similarly short LCP resource phases (about 8–14 ms each) and zero CLS. Lighthouse flagged approximately 59.7 KB of unused JavaScript, estimating 300–450 ms savings depending on route. These opportunities are diagnostic estimates; identify the specific scripts and rendering work in a trace before changing behavior. The prior portfolio image fix did not materially improve global desktop budget scores.

## Field CWV status

The site includes sampled first-party RUM for LCP, INP, CLS, TTFB, and FCP (`public/assets/js/rum.js` → `/api/rum` → Cloudflare Workers Observability). No production Observability logs or Search Console field CWV report were available in this worktree/session. Field CWV status is therefore **unknown**, not passing.
