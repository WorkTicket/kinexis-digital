# Preproduction regression

**Status: PARTIAL — local checks pass; full release-candidate regression remains pending.**

Fresh on 2026-11-17: `npm run build` passed (297 routes; CSS-inline and no-module-polyfill guards passed); `npm run check`, `npm run check:invoice-security`, and `npm run check:structured-data` passed. Lint produced 28 warnings and no errors. The local mocked payment suite is not PayPal sandbox acceptance.

Not run in this session: full Playwright suite twice against fresh servers, `npm audit`, `npm audit --omit=dev`, `npm outdated`, `npm run build:worker`, exhaustive crawl, isolated failure injection, manual accessibility, provider tests, and staging/production checks. Run relevant checks against the frozen, approved candidate; inspect skips and report provider tests separately.
