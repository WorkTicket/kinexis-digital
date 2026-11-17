# Phase 9 — Test infrastructure reliability

## Playwright ownership and repeatability

The suite uses `playwright.config.ts` with base URL `http://localhost:3100`, `webServer.command = npm run dev -- --port 3100`, `reuseExistingServer: false`, and a 120-second readiness timeout. This preserves the Phase 7 stale-server protection.

Two complete suite invocations were run independently. Each started and shut down its own fresh server:

| Invocation | Result | Retries | Skips |
|---|---|---:|---:|
| 1 | 68 passed, 0 failed | 0 in local non-CI mode | 6 with explicit project/env reasons |
| 2 | 68 passed, 0 failed | 0 in local non-CI mode | 6 with explicit project/env reasons |

No hidden test retries masked failures. The six expected skips are project-specific mobile/Chromium cases plus the two local measurement-delivery cases requiring configured provider IDs. Tests were not disabled or softened for Phase 9.

## Collision protection

A controlled HTTP fixture was bound to the Playwright port 3100, then a targeted Playwright test was invoked. Playwright exited **1** with `http://localhost:3100 is already used` rather than reusing the listener or treating its readiness response as the app. The exact fixture listener was closed afterward. This confirms fail-closed port ownership behavior.

The two normal runs had clean startup and deterministic shutdown. Both printed the existing Wrangler warning that local `NEXT_CACHE_DO_QUEUE` Durable Object bindings are not exported in the local development Worker; the warning is not hidden and does not establish production Worker behavior.

## Remaining infrastructure limitations

- CI configuration allows one retry when `CI` is set; the Phase 9 local runs had `CI` unset and therefore used zero retries. CI retry results are not part of the two-run evidence.
- Parallel tests use four workers; no separate cross-process shared-state contamination test beyond the existing mocked/in-memory route harnesses was performed.
- The complete local SEO crawler crashed with Windows exit code `3221226505`; Playwright itself remained stable. This is recorded in `END-TO-END-VERIFICATION.md`.
- External providers, credentials, Workers runtime and production bindings were not part of local readiness.
