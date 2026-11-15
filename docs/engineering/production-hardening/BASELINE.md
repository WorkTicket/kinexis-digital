# Baseline — Phase 0

**Date:** 2026-11-15  
**Branch:** `codex/production-hardening-v1` (isolated worktree from `main`)  
**HEAD:** `c43041d7773c023e778d6f828bd7833620212b2d` — `Fix half-empty portfolio previews and polish home CTAs.`  
**Runtime:** Node `v24.15.0`, npm `11.12.1`; package requires Node >=22 <25 and npm >=11.  
**Stack:** Next 16 App Router, React 19, strict TypeScript, Tailwind 4, OpenNext/Cloudflare Workers.

## Initial Git state and isolation

The original checkout was dirty on `main` with pre-existing work not created by this phase:

- Modified `docs/CURRENT-TASK.md`
- Modified `e2e/smoke.spec.ts`
- Untracked `intelligence/`

These files were left untouched. An isolated OpenCode worktree was created from `main` HEAD and `codex/production-hardening-v1` was created there. The Phase 0 production-hardening documents were copied into that worktree. There is no separate `main` baseline commit to compare: `main` pointed at the recorded HEAD.

## Project/deployment baseline

- `package.json` provides `check`, `verify`, `verify:prod`, invoice-security, PayPal sandbox, Playwright E2E, Worker build, preview and deployment scripts.
- `.github/workflows/ci.yml` runs `npm ci`, `npm run check`, and `npm run build:worker` on PRs and pushes to main; actions are pinned to reviewed SHAs and token permission is read-only.
- `wrangler.jsonc` defines production and preview Workers/KV bindings/email bindings. The checked-in preview `CONTACT_TO` and allowed email destinations include production addresses; verify runtime routing/secrets before using preview.
- `docs/WORKFLOWS.md` documents that CI does not deploy and describes deployment commands.

## Baseline checks

| Command | Result | Evidence / notes |
|---|---|---|
| `node --version` | PASS | `v24.15.0` |
| `npm --version` | PASS | `11.12.1` |
| `npm ci` (isolated worktree) | PASS | Installed 741 packages. npm reported 13 moderate audit findings; `npm audit` was not run. |
| `npm ci` (original dirty checkout) | FAIL | Windows `EPERM` unlinking `node_modules/@ast-grep/napi-win32-x64-msvc/ast-grep-napi.win32-x64-msvc.node`; likely locked/in-use. Isolated worktree avoided this. Log path: `%LOCALAPPDATA%\npm-cache\_logs\2026-11-15T19_45_19_798Z-debug-0.log`. |
| `npm run cf-typegen` | PASS | Generated ignored local `cloudflare-env.d.ts`; required for TS global `KVNamespace` types. |
| `npm run check` (before typegen) | FAIL | Lint passed (3 warnings); typecheck failed because `cloudflare-env.d.ts` was absent and `KVNamespace` unresolved in invoice/rate-limit/reviews. |
| `npm run check` (after typegen) | PASS | Lint (3 warnings, 0 errors), TypeScript, mocked contact checks and Spanish mirror coverage (73 paths) passed. Contact test logs injected `SMTP unavailable` failure case and then passes. |
| `npm run verify` | FAIL / PARTIAL | Check and invoice/consent security passed. PayPal local logic passed; live sandbox skipped due missing credentials. Playwright: 21 passed, 4 failed, 3 skipped. See specific failures below. |
| `npm run verify:prod` | PASS | Read-only live site check: 133 URLs, 0 failures; structured data 9/9; Lighthouse budgets passed on homepage, pricing, portfolio and contact. These are configured budget passes, not 100 scores across all routes. |
| `npm run check:invoice-security` | PASS | `Invoice + consent security checks passed.` Also passed within `verify`. |
| `npm run check:paypal-sandbox` | PARTIAL | Local capture/duplicate and ID-shape checks passed. Live sandbox skipped: `PAYPAL_CLIENT_ID` and `PAYPAL_CLIENT_SECRET` unavailable in isolated worktree. A prior run in the original dirty checkout did complete sandbox positive/negative paths; it was not repeated in this clean branch. |
| `npx playwright install chromium` | PASS | Installed Chromium required for E2E; browser cache only. |
| `npm run test:e2e` | FAIL / PARTIAL | 21 passed, 4 failed, 3 skipped (28 total). PayPal SDK test reports failed in desktop and mobile; mobile homepage cannot find the `Lead System` columnheader; mobile nav does not reach open state. No fixes attempted in Phase 0. |

## Existing E2E failures to carry forward

- `e2e/production-audit.spec.ts:111` (Chromium and mobile): expected PayPal SDK/buttons to reach loading/ready state, but the app displayed `.pay-alert` and returned `failed`. No payment was approved or captured.
- `e2e/smoke.spec.ts:4` (mobile): expected a `Lead System` columnheader, but none was found in the mobile layout.
- `e2e/smoke.spec.ts:25` (mobile): after menu interaction, neither expected open-state marker appeared before timeout.

No fixes were made; these are baseline failures, not regressions from this phase.

The original dirty checkout's `npm ci` attempt failed on a locked native module; the isolated clean worktree made installation repeatable. No tracked application files, dependency versions, or lockfiles were changed. Generated `cloudflare-env.d.ts` is ignored local type output.
