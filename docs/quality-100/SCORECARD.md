# Phase 0 — Quality scorecard baseline

**Status: not scored.** A weighted quality score would be misleading before conversion, full-route, field CWV, provider, and manual accessibility evidence is available. Passing individual automated checks does not earn a full category score.

| Category | Weight | Phase 0 evidence | Status |
| --- | ---: | --- | --- |
| Conversion and lead capture | 20 | Forms, APIs, analytics/chat infrastructure and mocked checks exist. No authorized end-to-end live delivery, notification, attribution, or conversion validation. | Implemented but not verified |
| Technical and international SEO | 20 | 150 sitemap URLs; 152 route/robots/sitemap requests pass; structured-data samples 9/9; ownership/meta/localization guards pass. Full crawl/canonical/hreflang/manual content review remains open. | Partially verified |
| Performance and Core Web Vitals | 15 | Mobile lab 95–98; desktop 81–84 on four routes. Field p75 LCP/INP/CLS unavailable. | Verified failing (desktop budget); field unverified |
| UX, design, and accessibility | 15 | Lighthouse accessibility 100 on four templates; desktop/mobile E2E smoke passes. No full responsive screenshot matrix, manual WCAG 2.2 AA, or complete-route audit. | Partially verified |
| Content, pricing, and trust | 10 | Automated commercial consistency passes for plans, text-back, currency; no owner sign-off or full copy/testimonial review performed. | Implemented but not fully verified |
| Security and reliability | 10 | Local security/regression suite passes; npm audit has 13 moderate findings; production configuration/integrations/backup recovery not exercised. | Partially verified; risks open |
| Analytics and attribution | 5 | Consent and RUM contract tests pass; production measurement IDs absent in local build environment; no live event/field access. | Implemented but not verified |
| Regression testing and release readiness | 5 | `npm run verify` passes with 38 E2E pass / 6 skip; Worker build completes; desktop Lighthouse gate fails; release config evidence incomplete. | Not release-ready |

## Acceptance decision

- **100/100 internal audit:** not established.
- **Performance targets:** desktop Lighthouse target not met; field CWV not measured.
- **Production readiness:** not certified by Phase 0.
- **Production changes/deployment:** none.
- **Phase 0 gate:** baseline captured; prioritized backlog created. Review findings before starting Phase 1.
