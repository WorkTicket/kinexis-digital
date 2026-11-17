# Phase 4 performance results

**Source before change:** `9b78e94868691c20812d5952a356178d1560044c`
**Targeted correction:** portfolio project detail screenshot metadata and responsive delivery
**Status:** rebuilt and measured locally; desktop performance budget remains unresolved.

## Evidence-backed correction

| Measurement | Before | After, measured |
| --- | --- | --- |
| Route/asset | `/portfolio/tileline-bath-tile`, full homepage screenshot | Same route and source master |
| Actual master | 1600×8754 WebP, 927,624 bytes | Unchanged genuine 1600×8754 master |
| Browser condition | 1350px desktop viewport, DPR 1, screenshot brought into view | Same |
| Selected source | 1600px master, incorrectly advertised as 1100w | New 800w derivative from the 1600px master |
| Image box before decode | 760×3703 px from stale `width=1100 height=5371` attributes | 760×4149 px from corrected `width=1600 height=8754` attributes |
| Image box after decode | 760×4149 px; +446 px height change | 760×4149 px; no measurable decode-time height change |
| Responsive behavior | 640w then mislabeled 1100w master; no in-between candidate | 640w / 800w / 960w / truthful 1600w master candidates |

An independent Sharp trial made the 800w WebP from the real source, without enlargement, using WebP quality 88. It was 325,206 bytes (about 65% smaller than the 927,624-byte master) and retained visually legible page sections in the rendered comparison. The 1600px master remains available when higher DPR selection requires it; at DPR 3 the browser selected it, while DPR 2.625 selected the 960w derivative. No AI/generated replacement was made.

The same intrinsic-dimension mismatch existed in all 32 template project records: their screenshot masters are 1600px wide while `Project.width` was recorded as 1100. Each record is now aligned to its actual local master metadata. The portfolio screenshot generator now creates genuine-source 800w and 960w WebP variants for these masters and the three live-site screenshot masters.

## After measurements

Measured after `npm run build` on the dedicated local server at `http://127.0.0.1:3492`:

- Desktop viewport 1350px, DPR 1: browser selected the 800w WebP (325,206 bytes). Intrinsic dimensions were reserved as 1600×8754; rendered height remained 4149px after decode.
- Mobile viewport 412px, DPR 2.625: browser selected the 960w WebP (393,972 bytes). The source is still a true derivative of the 1600px master.
- Mobile viewport 412px, DPR 3: browser selected the 1600px original (927,624 bytes), avoiding an undersized upscale.
- The HTML width/height attributes match the source master. The measured image box was stable during decode. CLS remains zero in the representative Lighthouse traces.
- A complete dedicated-port desktop rerun completed all four routes: `/` 0.76, `/pricing` 0.76, `/portfolio` 0.75, `/contact` 0.80. All remain below 0.85; Accessibility, Best Practices, and SEO were 1.00. A separate desktop Lighthouse run on `/pricing` scored 0.75 with no runtime error (LCP 3.3 s, FCP 1.5 s, TBT 110 ms, CLS 0).
- The prior two desktop runs scored 0.79/0.77, 0.77/0.76, 0.75/0.76, and 0.82/0.80 for `/`, `/pricing`, `/portfolio`, and `/contact`, respectively. The post-change values are within this existing run-to-run range; no material score improvement is claimed.
- This targeted detail-page correction is not expected to materially alter the homepage or global budget routes. No Lighthouse threshold was lowered.
- Post-change desktop route diagnostics recorded:

| Route | Score | LCP | FCP | TBT | CLS | LCP element-render phase | Unused-JS opportunity |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| `/` | 0.76 | 3.1 s | 1.6 s | 40 ms | 0 | 292 ms | ~59.7 KB / 300 ms |
| `/pricing` | 0.76 | 3.2 s | 1.5 s | 80 ms | 0 | 187 ms | ~59.7 KB / 450 ms |
| `/portfolio` | 0.75 | 3.3 s | 1.6 s | 40 ms | 0 | 162 ms | ~59.7 KB / 300 ms |
| `/contact` | 0.79 | 2.9 s | 1.3 s | 20 ms | 0 | 105 ms | ~59.7 KB / 300 ms |

  Across these traces, LCP resource TTFB/delay/duration were each about 8–14 ms, much smaller than overall LCP. This points away from image transfer and CLS as the dominant measured causes. Lighthouse flags unused JavaScript and LCP element-render delay; these are leads for attribution, not proof that removing code will safely improve the score. Next evidence-backed action: inspect the exact scripts and main-thread/render trace in a representative desktop run, identify work that is genuinely unnecessary on the route, and compare one scoped optimization against repeated budget runs. Do not defer required functionality or reduce visual quality.

The new Playwright regression passed on both Chromium desktop and the mobile project against the dedicated server.

## No unsupported global performance changes

The LCP hero remains high-priority and quickly discovered. The LCP trace, first-party font behavior, main-thread evidence, and prior production runs do not support reducing image quality, changing the hero presentation, altering the brand CSS, or adding hydration/script deferrals. No Lighthouse threshold was lowered.
