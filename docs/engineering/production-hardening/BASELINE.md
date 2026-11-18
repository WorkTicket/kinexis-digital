# Baseline — Phase 0

**Date:** 2026-11-15  
**Branch:** `main` (required hardening branch was not created; existing dirty worktree preserved)  
**HEAD:** `c43041d7773c023e778d6f828bd7833620212b2d` — `Fix half-empty portfolio previews and polish home CTAs.`  
**Runtime:** Node `v24.15.0`, npm `11.12.1`; package requires Node >=22 <25 and npm >=11.  
**Stack:** package/docs identify Next 16 App Router, React 19, strict TypeScript, Tailwind 4, OpenNext/Cloudflare Workers.

## Initial Git state

Existing work at start (not created by this phase):

- Modified `docs/CURRENT-TASK.md`
- Modified `e2e/smoke.spec.ts`
- Untracked `intelligence/`

No files were modified or discarded by Phase 0 except the new production-hardening documentation. `npm ci` failed before completion; Git status was checked afterward and the above pre-existing changes remained. Branch creation/switching was intentionally deferred to avoid disturbing this dirty worktree. There is no separate `main` baseline commit to compare: `main` points at HEAD.

## Project/deployment baseline

- `package.json` provides `check`, `verify`, `verify:prod`, invoice-security, PayPal sandbox, Playwright E2E, Worker build, preview and deployment scripts.
- `.github/workflows/ci.yml` runs `npm ci`, `npm run check`, and `npm run build:worker` on PRs and pushes to main; actions are pinned to reviewed SHAs and token permission is read-only.
- `wrangler.jsonc` defines production and preview Workers/KV bindings/email bindings. The checked-in preview `CONTACT_TO` and preview allowed email destinations include production addresses; verify runtime routing/secrets before using preview.
- `docs/WORKFLOWS.md` documents that CI does not deploy and describes deployment commands.

## Baseline checks

| Command | Result | Evidence / notes |
|---|---|---|
| `node --version` | PASS | `v24.15.0` |
| `npm --version` | PASS | `11.12.1` |
| `npm ci` | FAIL | Windows `EPERM` unlinking `node_modules/@ast-grep/napi-win32-x64-msvc/ast-grep-napi.win32-x64-msvc.node`; likely locked/in-use. Install did not complete. npm log path: `%LOCALAPPDATA%\npm-cache\_logs\2026-11-15T19_45_19_798Z-debug-0.log`. |
| `npm run check` | FAIL / BLOCKED | Lint could not start: `eslint` not recognized. Remaining chained checks not run. |
| `npm run verify` | FAIL / BLOCKED | Same lint startup failure; invoice/security, sandbox and E2E stages in this chain not reached. |
| `npm run verify:prod` | PARTIAL FAIL | Live read-only site smoke: 133 URLs checked, 0 failures. Structured data: 9/9 page types OK. Lighthouse stage failed because `chrome-launcher` package was unavailable. |
| `npm run check:invoice-security` | PASS | `Invoice + consent security checks passed.` |
| `npm run check:paypal-sandbox` | PASS | Sandbox negative and positive paths passed, including non-approved capture refusal and completed sandbox capture. Sandbox only; not production payment evidence. |

`npm ci` failure means the pre-existing install cannot be assumed complete. The baseline commands were attempted as requested; no dependencies or lockfiles were intentionally changed.
