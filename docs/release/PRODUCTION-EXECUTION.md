# Production release execution

**Status:** BLOCKED — production is not authorized.  
**Continuation start:** `4f8bf523b53342d63157bd5d5faa9c907ce710d3`, branch `phase-1/conversion-handoff`, initially clean. Original approved baseline: `766c0be76b2539297f8748c0210be658955cb2ca`.
**Policies:** Owner-approved performance exception accepts the current mobile scores for launch preparation; 95 remains a future goal and no more Lighthouse optimization is authorized. PayPal remains a launch requirement. Owner chose the existing free Conferbot widget only; webhook/site-D1/notification backend is deferred. No live charges, customer contact, production mutations, push, merge, or deployment are authorized.

## Execution register (2026-11-17)

| Gate | Status | Risk / owner | Verification and evidence | Next action |
|---|---|---|---|---|
| Starting state | PASS | Low / Engineering | Initial `git status --short` empty; expected branch and SHA verified. | Record final local SHA after work. |
| Local build and code checks | PASS | Medium / Engineering | After non-forced lockfile refresh and glob override, fresh `npm run check` and `npm run build:worker` passed (297 routes, CSS/polyfill guards); invoice-security and structured-data fixtures pass; lint has 28 pre-existing warnings, no errors. | Repeat on frozen candidate with approved build variables. |
| Playwright regression | PASS WITH ENVIRONMENT NOTE | Medium / Engineering | Two consecutive fresh-server full runs after dependency refresh at `--workers=4`: 70 passed, 4 expected skips each. A previous run had one transient mobile analytics consent timeout; isolated rerun and both subsequent full runs passed. See [`PREPRODUCTION-REGRESSION.md`](PREPRODUCTION-REGRESSION.md). | Preserve fresh-server tests; verify deployed DO separately. |
| Mobile performance | APPROVED EXCEPTION | Medium / Owner | Owner decision 2026-11-17 accepts fresh scores `/` 94/94, `/pricing` 94/94, `/portfolio` 93/93, `/contact` 95/95; desktop all four 100/100. Method and target unchanged. Raw ignored artifacts: `.audit/release/verified-run-{1,2}-{mobile,desktop}/`. This is not field-CWV evidence. | No more Lighthouse optimization. Monitor field LCP/INP/CLS after launch; retain 95 as a future goal. |
| Desktop performance | PASS | Low / Engineering | Two explicit desktop runs: all four routes 100/100. `.audit/release/verified-run-{1,2}-desktop/`. | Repeat for release candidate. |
| Production security/dependencies | BLOCKED | High / Engineering + Dependency owner | Following non-forced lockfile refresh and glob override: `npm audit`: 19 high, no moderate/critical; `npm audit --omit=dev`: 0. All full-audit findings derive from unpatched picomatch ReDoS in dev/build tooling. CI pull request job is read-only and has no secrets. Playwright's Next dev shim warns about the internal DO, while generated OpenNext Worker re-exports it; remote binding behavior is unverified. | Track official picomatch patch; Cloudflare Ops must verify bindings/DO in preview. |
| Environment and deployment preflight | BLOCKED | Critical / Owner + Cloudflare Operations | Public GA4/Meta IDs are configured locally and strict preflight passes; no live Worker settings or remote secrets inspected. | Ensure Workers Builds uses the same IDs and verify remote binding/secret presence without sharing values. |
| Analytics/deploy preflight | BLOCKED | High / Owner + Analytics | Build IDs supplied and locally validated; correct-account mapping, provider receipt, attribution, and key-event settings remain unverified. | Owner provides read-only account access and approves labeled provider test procedure. |
| Lead delivery | BLOCKED | Critical / Owner + Operations | Mocked routing checks pass; historical single labeled preview submission lacks independently inspected sink receipt. | Inspect that existing test-only provider record; do not resubmit. |
| PayPal sandbox | BLOCKED | Critical / Owner + Finance | Mocked payment/security checks pass; sandbox acceptance not run. Test script now refuses non-sandbox API and non-preview callbacks. | Provide authorized sandbox merchant/buyer and isolated preview callback setup through secure channels. |
| Accessibility | BLOCKED | High / Accessibility reviewer | Historical automated/sample evidence only; manual WCAG 2.2 AA sign-off outstanding. | Complete keyboard, screen reader, zoom/reflow, contrast and journey review. |
| Privacy/commercial/content | BLOCKED | High / Owner + Legal/Finance/Marketing | Owner decisions, permissions, native Spanish review, and account settings remain open per matrix. | Complete linked approval sheet. |
| Deployment/rollback | BLOCKED | Critical / Owner + Cloudflare Operations | No production environment inspection, backup verification, migration rehearsal, or release authorization. | Verify on isolated environment; obtain separate explicit deployment authorization. |

## Current stopping point

Preparation checkpoint: local work committed through `3ca73d7f8504c1a1be5212d6f76ab1000dd7866d`; worktree was clean. This SHA is not a frozen release candidate. First unfinished step: obtain missing provider/account access and owner approvals, then complete authorized isolated acceptance and the final regression/deployment-readiness stages. Performance exception is recorded; it applies only to lab Lighthouse scores. External acceptance is blocked on the owner actions listed in the acceptance records. No production action has been taken.

The other records in this directory are gate-specific checklists, not evidence of acceptance. `BLOCKED` means the required external verification has not happened.
