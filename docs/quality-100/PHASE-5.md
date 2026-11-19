# Phase 5 — UX, responsive design, and accessibility

**Branch:** `phase-1/conversion-handoff`
**Base:** `7cfad411c3cc6ca2f38abca0936dea0d467a0d71`
**Status:** Implementation and audit complete; verification results are recorded below. No push, merge, deployment, or production configuration changes.

## Scope and evidence

The actual local Next.js-rendered pages were captured at 320, 375, 390, 768, 1024, 1440, and 1920 CSS pixels across 13 route representatives: `/`, `/pricing`, `/contact`, `/audit`, `/lp/phoenix-preview`, `/industries/plumbing`, `/portfolio`, `/case-studies/preferred-plumbing`, `/blog`, `/blog/website-mistakes-that-cost-you-calls`, `/es`, `/es/pricing`, and `/pay`. Consent-open homepage states were additionally captured at 390 and 1440px. This produced 93 actual-page screenshots; the working evidence is in ignored `.audit/phase5/screens/` and is not part of the commit.

All 91 route/viewport responses were HTTP 200; no broken images or uncaught page errors were detected. The initial scan found horizontal overflow on `/portfolio` at 320, 375, and 390px and `/lp/phoenix-preview` at 320px. Those fixes were verified in the post-change 93-capture run: zero document/body horizontal overflow across the selected route-width matrix. See [responsive matrix](RESPONSIVE-MATRIX.md), [visual regressions](VISUAL-REGRESSIONS.md), and [UX audit](UX-AUDIT.csv).

## Implemented

- Constrained the portfolio live-card grid items so the card and its screenshot use the available narrow viewport width.
- Tightened the Phoenix landing-page header at widths up to 360px so both the telephone link and preview CTA remain on-screen.
- Added keyboard focus entry, Tab/Shift+Tab containment, and Escape-to-reject behavior to the consent dialog; focus returns to its preferences launcher. Escape records the privacy-safe rejected state.
- Added Playwright regression coverage for the two responsive defects and consent keyboard handling.
- Corrected the audit-only accessible-name heuristic to include linked-image `alt` text. The blog image links were not product defects.

## Accessibility results

Lighthouse accessibility was **1.00** on `/`, `/pricing`, `/contact`, `/portfolio`, `/lp/phoenix-preview`, and `/es` at a 390px mobile emulation. Automated score is not a WCAG conformance determination. Targeted manual browser checks confirmed skip links, page `lang`, one main landmark, labeled representative EN/ES forms, locale-switch destinations, and consent dialog focus/Escape behavior. The actual check detail and remaining manual coverage are in [accessibility audit](ACCESSIBILITY-AUDIT.md).

## Verification

- Targeted regression suite: 6 passed (desktop Chromium and mobile projects).
- Full Playwright suite: **60 passed, 6 skipped, 0 failed** (`npm run test:e2e`; 66 total).
- `npm run check`: passed; lint emitted 28 warnings and 0 errors, then typecheck and all configured checks passed.
- `npm run check:invoice-security`: passed, including invoice, PayPal mocked-boundary, KV import, and reconciliation fixtures. PayPal sandbox was not run.
- `npm run build`: passed; 297 static pages generated, no blocking stylesheet links in the CSS-inlining check.
- Full-suite note: a 10-worker dev-server run intermittently returned HTTP 500 while reading industry route data; rerunning the complete suite with 4 workers passed. No source change was made for this environmental/concurrency failure.
- Production Lighthouse budget run (`node scripts/lighthouse-budget.mjs http://localhost:3493 --form-factor=both`) used the existing budgets and settings. Mobile performance: `/` 0.94, `/pricing` 0.93, `/portfolio` 0.92, `/contact` 0.95. Desktop performance: 0.78, 0.77, 0.76, 0.80 respectively; all four still fail the 0.85 budget, and the command exits 1 for those expected failures. Compared with the latest Phase 4 run (0.76, 0.76, 0.75, 0.80), the desktop scores are within normal run-to-run range; no material regression or resolution is claimed. A11y, Best Practices, and SEO scored 1.00 on all eight runs.
- Mobile scores on `/`, `/pricing`, and `/portfolio` remain below the 0.95 target; retain these alongside the desktop performance release issue.
- A1 screenshot recapture remains outstanding. Neither carried-forward issue is marked complete.

## Limitations and gate

No assistive-technology/user testing was performed. Color contrast, screen-reader announcements, 200%/400% zoom, orientation changes, all form success/server-error combinations, full payment-provider interaction, and all route families remain incompletely manually verified. Some third-party payment/chat UI may require provider credentials or external services; external-provider tests were not run. This phase does **not** certify WCAG 2.2 AA. Phase 6 should wait for review of these findings and the open release gates.

**Phase 5 implementation commit:** `02d50f9a`.
