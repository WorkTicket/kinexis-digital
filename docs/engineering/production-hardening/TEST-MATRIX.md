# Test matrix

| Check | Purpose | Command / environment | Phase 0 result |
|---|---|---|---|
| Runtime versions | Validate configured toolchain | `node --version`; `npm --version`, Windows local | PASS — Node 24.15.0, npm 11.12.1 |
| Clean dependency install | Reproducibility | `npm ci`, Windows local | FAIL — EPERM unlink of locked ast-grep native module; install incomplete |
| Lint/typecheck/contact/localization aggregate | Existing project gate | `npm run check`, Windows local | FAIL — eslint executable unavailable; later stages not run |
| Full verification | Aggregate/security/sandbox/browser gate | `npm run verify`, Windows local | FAIL at same lint startup; downstream checks not run by script |
| Invoice + consent security checks | Existing targeted scripted checks | `npm run check:invoice-security`, Windows local | PASS |
| PayPal sandbox | Non-approved rejection + positive sandbox capture | `npm run check:paypal-sandbox`, configured sandbox | PASS; sandbox only, not live charges |
| Production public route smoke | Read-only availability scan | `npm run verify:prod`, public `https://www.kinexisdigital.com` | PASS subcheck: 133 URLs, 0 failures |
| Structured data | Public structured data smoke | Included in `npm run verify:prod` | PASS subcheck: 9/9 page types |
| Lighthouse budgets | Public performance audit | Included in `npm run verify:prod` | NOT RUN/FAIL: dependency `chrome-launcher` unavailable; aggregate exited 1 |
| Git state preservation | Ensure no pre-existing changes lost | `git status --short` before/after | PASS: pre-existing modified/untracked files remain; new docs are expected |

No browser E2E, production mutation, deployment, or real-customer payment/email test was run.
