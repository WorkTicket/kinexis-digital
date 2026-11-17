# Phase 6 — Content, pricing, trust, and conversion

**Branch:** `phase-1/conversion-handoff`  
**Base:** `3559e3646ba27f924dbc28dd68e745c168582b05`  
**Status:** Audit complete; no public copy or commercial terms changed. No push, merge, deployment, or production configuration changes.

## Scope and findings

Reviewed canonical catalog and commercial assertions; English homepage, pricing, contact, terms, checkout, Phoenix landing page, FAQs, portfolio/case studies, industry content, shared FAQs and offers; Spanish site, price, comparison, term, payment, and industry content. Searched repository claims for prices, add-ons, billing, cancellation, ownership, guarantees, reviews, testimonials, ratings, results, and experience/certification claims.

- Catalog prices are Website **$97/mo**, Lead System **$197/mo**, Plus **$297/mo**, Own It **$1,497 one-time**. Website/Own It text-back is a **$97/mo add-on**; Lead System/Plus text-back is optional, with a **$1/mo second number if used plus carrier rates**. These match the existing commercial assertions and principal displayed tables.
- The shared terms explain month-to-month cancellation, 24-month price lock, domain renewal at cost, site ownership/buyout, tax exclusion, text-back constraints, 30-day refund, and 60-day lead guarantee. See `COMMERCIAL-CONSISTENCY.md` for qualifications and owner questions.
- English contact copy states the free preview, no-card requirement, and a phone/email/call path. The primary form button is “Show Me My Free Homepage.” English and Spanish retain preview-first, plan-comparison, and contact paths.
- Portfolio case studies are qualitative and explicitly avoid unapproved performance metrics. Review inventory and evidence status are in `TRUST-CLAIMS.csv`.
- No unambiguous low-risk content correction was established from repository evidence; therefore no commercial/public copy changes were made.

## Owner approval required

1. Reconcile checkout's “First charge when you subscribe” language with the terms/catalog language that monthly plans begin on launch day.
2. Confirm the checkout summary or linked terms adequately disclose lead-guarantee exclusions and good-standing/tracking conditions.
3. Retain evidence of customer authorization for curated website review quotations and confirm source labels/ratings remain accurate. No review has been removed or rewritten.
4. Confirm external review provider data, portfolio client permission, and current public-site claims with their owners; repository inspection is not external verification.

## Verification and status

- `npm run check`: passed; 28 existing lint warnings, no lint errors. Typecheck and all configured checks (including commercial, Spanish mirror, and SEO ownership) passed.
- `npm run check:invoice-security`: passed; PayPal HTTP mocked; sandbox not run.
- `npm run test:e2e`: attempted twice, both runs failed on existing UX/asset/consent regressions (first run: 48 passed, 12 failed, 6 skipped; 4-worker rerun: 52 passed, 8 failed, 6 skipped). Failures include 320px portfolio overflow, Phoenix header clipping, consent keyboard-ready marker, and portfolio screenshot dimensions. The 10-worker run also had PayPal SDK pending and audit analytics boot timeouts; both passed in the 4-worker rerun. These were not changed in this content-only audit and require investigation before treating the suite as passing.
- `npm run build`: passed; 297 pages generated.
- Conversion checks in Playwright: free-preview conversion, audit conversion, checkout smoke, and consent analytics tests passed on the 4-worker rerun; see caveat above for other E2E failures.
- Relevant SEO/Spanish checks passed within `npm run check`.
- No test, layout, analytics, SEO, or localization code changed.
- Files added: `PHASE-6.md`, `COMMERCIAL-CONSISTENCY.md`, `TRUST-CLAIMS.csv`, `CONTENT-ISSUES.md`, `handoffs/PHASE-6.md`.
- Documentation commit: `c712dea9c0fd74b9bb193136157c8c147f095009` (handoff SHA-record update follows).
- Release blockers carried forward: performance budgets (desktop and sampled mobile), manual WCAG 2.2 AA verification, A1 portfolio screenshot recapture, live provider testing, and Phase 6 owner decisions above.
- **Phase 7 readiness:** content audit deliverables complete; do not begin Phase 7 until Phase 6 owner review. Existing performance/accessibility/provider blockers remain separate and do not imply release authorization.
