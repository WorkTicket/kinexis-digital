# Phase 9.1 — Local diagnostics and release-gate follow-up

**Approved baseline:** `e72cd64841e66dbdb198d3f3de3f0705ad335596`
**Branch:** `phase-1/conversion-handoff`
**Status:** Local build, SEO crawl, screenshot recapture, and targeted accessibility follow-up complete. Release remains blocked. No push, merge, deployment, production configuration changes, live provider tests, genuine lead, or payment was performed.

## Scope and results

- Rebuilt the current app: **297 routes generated**; CSS-inlining and legacy-polyfill guards passed.
- Ran the complete `npm run check`: passed. ESLint reported the same **28 existing warnings**, 0 errors.
- Ran `npm run test:e2e -- --workers=4` twice on separate fresh Playwright-owned servers: **68 passed, 6 expected skips, 0 failed** each time. Skips are project/environment conditional; external analytics acceptance remains untested.
- Re-ran the unchanged Lighthouse budget script twice on the rebuilt site. Accessibility, Best Practices, and SEO scored 1.00 throughout. Desktop performance misses the 0.85 target on all routes; mobile misses 0.95 on home, pricing, and portfolio. See `PERFORMANCE-REGRESSION.md`; budgets were not changed and no unsupported optimization was made.
- Completed two independent full local SEO crawls after the final build. Each covered **205 URLs** (150 sitemap entries and 55 linked discoveries), with 0 failed URLs, 0 broken image references, and no remaining queue. The normalized, reproducible crawl is `SEO-CRAWL.csv`. All 158 indexable rows have same-origin production canonicals; the 47 missing canonicals are noindex utility/template routes. HTML and sitemap hreflang matched for all 150 sitemap routes; every crawled internal link target resolved. Eight contact query variants canonicalize to clean routes and account for the two duplicate title and two duplicate description groups.
- `scripts/check-structured-data.mjs` passed 9/9 representative page types. The separate 152-URL `smoke-routes.mjs` process did terminate once with Windows status `3221226505`; the exhaustive crawler and structured-data checker completed. This is recorded rather than hidden or retried in a loop.
- Captured the real current A1 homepage from `https://a1pslandscape.com/` as a full-page **1041×10018** WebP (832,606 bytes). Replaced the stale screenshot and regenerated its dependent WebP/AVIF and card variants; bumped the portfolio asset version and corrected source dimensions. No fabricated imagery was used. Owner confirmation of client screenshot/publication permission remains open in `OWNER-DECISIONS.md`.
- Ran axe-core **4.14.0** on home, pricing, portfolio, and contact: final scans reported 0 violations. Corrected the announcement landmark and keyboard focusability/names of scrollable comparison tables. Reduced-motion, skip-link, and 320/640px reflow proxies passed. Manual contrast review, actual 200%/400% zoom, screen-reader testing, and full WCAG 2.2 AA review remain open; see `ACCESSIBILITY-AUDIT.md`.
- Re-ran dependency audits: production graph has 0 advisories; full graph still has **13 moderate, 0 high, 0 critical**. No force-fix or dependency downgrade was applied; see `DEPENDENCY-AUDIT.md`.

## External verification and release posture

No Google Analytics, Google Ads, Meta, Conferbot, PayPal, production D1/KV, RUM, or production CWV provider checks were performed. No new live analytics event or form submission was sent. Owner-controlled, read-only/isolated verification steps and the existing event-routing concern are listed in `PHASE-9.1-OWNER-VERIFICATION.md`.

`RELEASE-GATE-MATRIX.csv` is updated. Remaining blockers include performance thresholds, manual accessibility/conformance, production field CWV, owner/provider checks, commercial/legal decisions, portfolio evidence permissions, and build-tool advisories. A1 recapture and local SEO crawl requirements are complete, but this does not clear client permission or post-release crawl obligations.

## Evidence and next action

Ignored raw local diagnostics, the source A1 capture, and run logs are under `.audit/phase91/`. No production content was crawled or changed; the committed SEO CSV represents the local final build and normalizes canonical URLs to the public origin. No Phase 10 work is authorized.

**Next action:** owner reviews `PHASE-9.1-OWNER-VERIFICATION.md` and resolves the documented gates. Re-run performance and manual accessibility acceptance on the approved release candidate; obtain separate authorization before any external provider event, transaction, deployment, or Phase 10 work.
