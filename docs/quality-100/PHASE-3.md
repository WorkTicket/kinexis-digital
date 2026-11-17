# Phase 3 — Spanish localization and international SEO

**Branch:** `phase-1/conversion-handoff`  
**Base commit:** `72219235d0040d4e23389ef1e703ff043cfed1a8`  
**Status:** implementation and local verification complete; ready for review. No push, merge, deployment, or external provider testing was performed.

## Results

- 123 English route definitions; 81 Spanish route definitions (79 exact pairs plus two Spanish-only blog routes); 42 intentionally unmirrored English routes.
- The 79 active equivalents are 77 content pairs plus `/pay` and `/pay/thanks` utility pairs. The checkout pairs remain noindex, unsitemapped, and without hreflang.
- 39 unmirrored Spanish candidate paths return 404 by design. Three legacy Spanish case-study candidate URLs redirect to `/es/portfolio`; two Spanish-only legacy articles remain without English article equivalents.
- Audited page-level canonical, hreflang, sitemap membership, switch target, document language, status/redirect chain, indexability, and translation/currency notes in `LANGUAGE-EQUIVALENCE.csv`.
- No broken destinations were found for active pairs. English and Spanish rendered locale tags and self-canonicals were consistent. `/es-es` continues to redirect to `/es`.
- Commercial review found no verified inconsistency in published prices, currency, text-back optionality, guarantees, or cancellation/ownership terms. See `TRANSLATION-ISSUES.md`.
- Added direct English fallbacks for Spanish-only legacy blog posts and kept existing Spanish checkout utilities switchable without changing their indexability policy.
- Added regression tests for legacy post and checkout switches and representative Spanish page language/overflow at desktop and mobile sizes.
- Corrected `/es/pay` metadata to explicitly remain noindex, matching `/pay` and `/es/pay/thanks`.

## Crawl reconciliation carried forward

The Phase 2 difference of 208 production rows versus 205 local rows is reconciled in `PHASE-2.md`: two retired discoverable English blog links were removed; the other row was the duplicate homepage request with and without a slash, both canonicalizing to one page.

## Verification

- `npm run check` — passed (lint reported 28 existing warnings, no errors; typecheck and all configured checks passed).
- `npm run build` — passed; 297 static pages generated and build guards passed.
- Local structured-data check — 9/9 representative page types passed. Local route smoke — 152/152 sitemap URLs passed; sitemap still contains 150 unique URLs, unchanged route strategy.
- `npm run test:e2e` — 52 passed, 6 expected skips after all changes.
- Focused legacy-post and checkout language-switch tests — Chromium 2/2, mobile 2/2.
- Focused representative Spanish rendering/overflow test — Chromium 1/1 and mobile 1/1.
- Local Spanish mirror, commercial consistency, SEO ownership, and metadata-length checks passed as part of `npm run check`.
- Playwright emitted the existing local Cloudflare Durable Object warning.
- The route inventory used read-only GET requests against public pages; no provider, payment, live lead-delivery, state-changing production action, or deployment was performed.

## Changed files

See the Phase 3 handoff for the exact source/test/report list. Route changes are limited to language-switch destinations for two Spanish-only legacy articles and correcting the translated checkout utility's noindex metadata; no page inventory, pricing, canonical strategy, sitemap, production configuration, or `/es` URL strategy was changed.

## Remaining risks and readiness

- The two old Spanish blog URLs are intentionally not exact language equivalents; one English fallback points to a related industry page rather than a translated article.
- Three Spanish case-study candidates fall back to the portfolio hub; those URLs are not equivalent case-study translations.
- Spanish wording has consistency review but has not received independent native-editor certification.
- Phase 1 provider verification, Phase 2 production verification, real lead delivery, and desktop Lighthouse optimization remain open.

**Phase 4 readiness:** Phase 3 is ready for review. Do not begin Phase 4 until the owner reviews this handoff. No deployment is authorized.
