# Phase 3 — Spanish translation and commercial review

## Summary

Reviewed the existing Spanish landing page, pricing, industry, contact, portfolio, blog, FAQ, utility, and checkout translation sources against the English offer and approved copy in `docs/CONTENT.md`. The audit did not identify a verified price, currency, guarantee, ownership, cancellation, or text-back amount mismatch that justified a copy change.

The public Spanish market is `/es` (LatAm/US Spanish) and uses USD. `/es-es` permanently redirects to `/es`; Euro price helpers remain in the codebase for legacy compatibility but are not exposed on the approved public URL.

## Commercial checks

- Published plan amounts match in English and Spanish: Website $97/mo, Lead System $197/mo, Plus $297/mo, Own It $1,497 one time.
- Spanish copy retains the 30-day refund guarantee and the 60-day tracked-lead guarantee only for Lead System/Plus; Own It is excluded from the lead guarantee.
- Monthly cancellation remains month-to-month. The site remains live through the paid period, with hosting ending after it unless the customer buys the files or moves to Own It. Ownership language distinguishes monthly hosting/management from Own It file ownership.
- Missed-call text-back is presented as optional. Spanish plan comparison and footnotes describe the $1/mo second tracking number when used and that carrier fees may apply; Website/Own It text-back remains a $97/mo add-on. Carrier approval timing remains qualified as typical, not guaranteed.
- No regional pricing, discounts, or new claims were introduced.

The automated commercial consistency check passed for plan values, text-back matrix, USD/EUR numerals, and Spanish plan helpers. Rendered pricing review also found no unexpected Euro symbol or missing expected plan price on the audited commercial routes.

## Translation completeness and UX observations

- Existing Spanish static-page and industry mirrors are present; only routes enumerated in `LANGUAGE-EQUIVALENCE.csv` are counted as route equivalents. The two legacy Spanish blog posts are intentionally Spanish-only; 42 English route definitions intentionally have no Spanish mirror.
- Spanish business forms and CTAs retain their existing destination paths. Existing field labels, validation and conversion behavior are exercised by the current E2E suite; no production lead submission or email provider was contacted.
- Added language-switch regression coverage for Spanish-only legacy posts and the translated checkout utility pages.
- Corrected `/es/pay` metadata to explicitly remain noindex, matching `/pay` and `/es/pay/thanks`; its language-switch regression now asserts the noindex directive.
- Added a representative rendering check for `/es`, `/es/pricing`, `/es/contact`, `/es/industries/plumbing`, and `/es/blog`. All were served with Spanish document language and passed horizontal-overflow checks at desktop Chromium and Pixel 7 mobile sizes.
- Mobile navigation, contact form fields, cookie-consent behavior, checkout presentation without payment, and existing success/conversion behavior are covered by the full browser suite.

No further wording changes were made because the audit did not establish a concrete, unambiguous translation defect. This report is a route/content consistency review, not a professional linguistic certification or a claim that every article has had line-by-line editorial proofreading.

## Follow-up risks

- Have a native Spanish editor review tone and regional vocabulary before materially expanding the Spanish offer.
- Verify actual lead delivery and third-party payment/telephony behavior separately under their existing authorization gates; those were not tested during this phase.
