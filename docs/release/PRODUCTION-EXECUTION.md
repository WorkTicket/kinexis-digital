# Production release execution

**Status:** BLOCKED — production is not authorized.  
**Continuation start:** `4f8bf523b53342d63157bd5d5faa9c907ce710d3`, branch `phase-1/conversion-handoff`, initially clean. Original approved baseline: `766c0be76b2539297f8748c0210be658955cb2ca`.
**Policies:** Owner-approved performance exception accepts the current mobile scores for launch preparation; 95 remains a future goal and no more Lighthouse optimization is authorized. PayPal and Conferbot remain launch requirements and require isolated acceptance. No live charges, customer contact, production mutations, push, merge, or deployment are authorized.

## Execution register (2026-11-17)

| Gate | Status | Risk / owner | Verification and evidence | Next action |
|---|---|---|---|---|
| Starting state | PASS | Low / Engineering | Initial `git status --short` empty; expected branch and SHA verified. | Record final local SHA after work. |
| Local build and code checks | PASS | Medium / Engineering | Fresh `npm run build` (297 routes, CSS/polyfill guards), `npm run build:worker`, `npm run check`, `npm run check:invoice-security`, `npm run check:structured-data`, and sandbox guard pass; lint has 28 pre-existing warnings, no errors. | Repeat on approved release candidate with production build variables. |
| Playwright regression | PASS | Medium / Engineering | Two fresh-server full runs at `--workers=4`: 68 passed, 6 expected skips each. Default 10-worker runs each intermittently failed one Spanish-to-English route with dev-server JSON parse/500; focused rerun and both 4-worker runs passed. Local DOQueueHandler warning remains. See [`PREPRODUCTION-REGRESSION.md`](PREPRODUCTION-REGRESSION.md). | Preserve fresh-server tests; investigate high-concurrency dev instability and verify deployed DO separately. |
| Mobile performance | APPROVED EXCEPTION | Medium / Owner | Owner decision 2026-11-17 accepts fresh scores `/` 94/94, `/pricing` 94/94, `/portfolio` 93/93, `/contact` 95/95; desktop all four 100/100. Method and target unchanged. Raw ignored artifacts: `.audit/release/verified-run-{1,2}-{mobile,desktop}/`. This is not field-CWV evidence. | No more Lighthouse optimization. Monitor field LCP/INP/CLS after launch; retain 95 as a future goal. |
| Desktop performance | PASS | Low / Engineering | Two explicit desktop runs: all four routes 100/100. `.audit/release/verified-run-{1,2}-desktop/`. | Repeat for release candidate. |
| Production security/dependencies | BLOCKED | High / Engineering + Dependency owner | Fresh `npm audit`: 21 (12 moderate, 9 high, 0 critical); `npm audit --omit=dev`: 0. CI pull request job is read-only and has no secrets; tooling advisory remains. Wrangler E2E warns the internal DO class is not exported locally; deployed behavior unverified. | Track compatible tooling fix; Cloudflare Ops must verify bindings/DO in preview. |
| Environment and deployment preflight | BLOCKED | Critical / Owner + Cloudflare Operations | Local env inventory in [`ENVIRONMENT-VERIFICATION.md`](ENVIRONMENT-VERIFICATION.md); strict preflight exits 1 because production build-time GA4/Meta IDs are absent. No production accounts inspected. | Owner configures correct build IDs and verifies remote binding/secret presence without sharing values. |
| Analytics/deploy preflight | BLOCKED | High / Owner + Analytics | Local fail-closed regression passes; provider/account receipt and production build IDs unverified. | Owner supplies approved build environment and read-only account review. |
| Lead delivery | BLOCKED | Critical / Owner + Operations | Mocked routing checks pass; historical single labeled preview submission lacks independently inspected sink receipt. | Inspect that existing test-only provider record; do not resubmit. |
| PayPal sandbox | BLOCKED | Critical / Owner + Finance | Mocked payment/security checks pass; sandbox acceptance not run. Test script now refuses non-sandbox API and non-preview callbacks. | Provide authorized sandbox merchant/buyer and isolated preview callback setup through secure channels. |
| Conferbot/D1 | BLOCKED | Critical / Owner + Operations | Local signature, idempotency, retry, persistence fixture checks pass; isolated D1/bot not provisioned. | Provision nonproduction bot, secret, D1/migration, test notification sink. |
| Accessibility | BLOCKED | High / Accessibility reviewer | Historical automated/sample evidence only; manual WCAG 2.2 AA sign-off outstanding. | Complete keyboard, screen reader, zoom/reflow, contrast and journey review. |
| Privacy/commercial/content | BLOCKED | High / Owner + Legal/Finance/Marketing | Owner decisions, permissions, native Spanish review, and account settings remain open per matrix. | Complete linked approval sheet. |
| Deployment/rollback | BLOCKED | Critical / Owner + Cloudflare Operations | No production environment inspection, backup verification, migration rehearsal, or release authorization. | Verify on isolated environment; obtain separate explicit deployment authorization. |

## Current stopping point

First unfinished step: obtain missing provider/account access and owner approvals, then complete authorized isolated acceptance and the final regression/deployment-readiness stages. Performance exception is recorded; it applies only to lab Lighthouse scores. External acceptance is blocked on the owner actions listed in the acceptance records. No production action has been taken.

The other records in this directory are gate-specific checklists, not evidence of acceptance. `BLOCKED` means the required external verification has not happened.
