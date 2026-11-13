# CURRENT-TASK.md

## Goal
PSI 100 Performance + Best Practices (mobile/desktop), no design changes.

## Status
Shipped to live (`e6c8b59`); re-run PSI on `/`.

## Done
- Meta Pixel deferred to first input / 45s (was afterInteractive; caused TBT + CSP console errors)
- CSP `connect-src` allows Meta openbridge hosts (`*.a.run.app`, `*.on.aws`)
- Hero AVIF budgets tightened; logo-360 recompressed; MediaSplit sizes + lazy fallback 640
- reply-dot / CTA nudge animations compositor-safe (look unchanged)
- Local LH: desktop 100/100; mobile BP 100, perf ~95 (local TTFB); live should improve vs prior 95/92

## Next action
Deploy, then re-run PageSpeed on `/` (mobile + desktop). If mobile perf still shy of 100, check Cloudflare Web Analytics beacon (critical-path on live).
