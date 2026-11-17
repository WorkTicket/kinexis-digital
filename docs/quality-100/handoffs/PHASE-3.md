# Phase 3 handoff

**Branch:** `phase-1/conversion-handoff`  
**Base HEAD:** `72219235d0040d4e23389ef1e703ff043cfed1a8`  
**Status:** Phase 3 changes are implemented and locally verified; not yet committed.

## Completed

- Route-equivalence crawl/report generator and `LANGUAGE-EQUIVALENCE.csv`.
- Language switch for two Spanish-only legacy articles now targets current related English pages directly.
- Existing Spanish checkout utilities `/es/pay` and `/es/pay/thanks` switch to corresponding English utilities without changing noindex/sitemap/hreflang policy.
- Regression tests cover legacy article switches, checkout utility switches, and representative Spanish desktop/mobile rendering/overflow.
- International SEO and translation/commercial review documented.
- Phase 2 crawl-count discrepancy documented and committed as `72219235d0040d4e23389ef1e703ff043cfed1a8`.

## Changed files

- `src/lib/locale-core.ts`
- `src/lib/locale-path.ts`
- `src/lib/i18n.ts`
- `src/app/es/pay/page.tsx`
- `src/components/Boot.tsx`
- `src/components/LanguageSwitch.tsx`
- `public/assets/js/boot.js`
- `public/assets/js/boot.min.js`
- `e2e/smoke.spec.ts`
- `scripts/language-equivalence-harness.ts`
- `scripts/generate-language-equivalence.mjs`
- `docs/quality-100/LANGUAGE-EQUIVALENCE.csv`
- `docs/quality-100/INTERNATIONAL-SEO.md`
- `docs/quality-100/TRANSLATION-ISSUES.md`
- `docs/quality-100/PHASE-3.md`
- `docs/quality-100/handoffs/PHASE-3.md`

`docs/quality-100/PHASE-2.md` was updated and committed separately in the reconciliation commit above.

## Validation

- `npm run check`: passed; 28 lint warnings, no errors.
- `npm run build`: passed.
- Local structured data: 9/9. Local sitemap route smoke: 152/152 URLs passed; 150 unique sitemap URLs.
- Full Playwright: 52 passed, 6 expected skips. Focused switch tests passed 2/2 on both Chromium and mobile. Focused overflow test passed 1/1 on both.
- Public inventory requests were read-only. No external provider, payment completion, state-changing production action, deployment, push, or merge.

## Remaining action

Verify the final generated CSV/reports and `git diff --check`, then commit the Phase 3 changes. Record the resulting commit SHA and ensure a clean worktree. Do not push, merge, deploy, or begin Phase 4 pending review.
