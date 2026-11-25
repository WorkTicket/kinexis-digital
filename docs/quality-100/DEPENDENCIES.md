# Phase 0 — Dependencies and verification access

## Runtime and build dependencies

| Dependency / service | Repository evidence | Phase 0 status |
| --- | --- | --- |
| Node.js / npm | `package.json` requires Node >=22 <25 and npm >=11; check environment used Node 24.15.0 / npm 11.12.1. | Verified compatible. |
| Next.js / React / TypeScript / Tailwind | Next 16.4.6, React 19.3.1, TypeScript 6, Tailwind 4 in package lock. | Worker build and typecheck pass. |
| OpenNext / Cloudflare Workers | `@opennextjs/cloudflare`; `wrangler.jsonc`; manual deploy scripts. | Build completes on Windows with compatibility warning. No deploy. |
| Playwright browsers | `@playwright/test`; 44 test cases across desktop/mobile projects. | Browser runtime available; 38 pass, 6 skip. |
| GA4 / Meta Pixel IDs | Preflight reads `NEXT_PUBLIC_GA_ID` and `NEXT_PUBLIC_META_PIXEL_ID`. | Missing from this clean worktree’s build environment; actual Cloudflare build vars not inspected. Owner/CI setting verification required. |
| PayPal | PayPal order/capture services and sandbox test script. | Mocked boundary checks pass. No sandbox request/payment was made; credentials/approval not available in isolated worktree. |
| Email delivery | Contact API supports configured transports; check script uses mocks. | Mocked routing/validation passes. Real provider delivery and inbox receipt not tested. |
| Cloudflare KV/D1 | KV-backed rate limiting/reviews/cache; separate invoice D1; proposed lead D1. | Source/config reviewed; remote bindings/data/backup/restore not accessed. |
| Conferbot | Lazy widget, HMAC webhook, flags, lead persistence code and tests; `LEAD_DB` omitted until provisioned. | Contract/unit behavior passes; live widget, dashboard, webhook, D1 persistence, handoff, and alerts unverified. |
| Search Console / IndexNow | Preflight validates IndexNow key file; post-deploy notification path exists. | Key-file preflight passes; Search Console ownership/data and actual IndexNow submission were not tested. |
| First-party RUM | Browser beacon -> `/api/rum` -> Workers Observability. | Payload tests pass; production logs and field distributions unavailable. |

## Dependency security scan

`npm ci` completed and npm reported **13 moderate, 0 high, 0 critical** vulnerabilities. `npm audit` exited nonzero. Findings are transitive chains involving `glob`, `minimatch`, `@node-minify/core`, OpenNext AWS/Cloudflare, Sentry bundler plugins, and TypeScript ESLint packages. npm proposes an OpenNext Cloudflare major-version change as one available fix; no dependency changes were made. Triage exploitability and compatible upgrades in a separate scoped task; do not run `npm audit fix --force`.

## Access needed for later evidence

- Cloudflare account: actual production Worker build vars/secrets, KV/D1 bindings, runtime logs, account-level security headers, deployment history, backups and rollback.
- PayPal sandbox credentials and an owner-approved sandbox-only method for positive capture evidence; no live customer transaction.
- Authorized test lead/notification destination and provider agreement for email delivery tests.
- Conferbot dashboard access; owner-provisioned, separate lead D1 binding and secrets before integration activation.
- Google Search Console and analytics read access for crawl/index coverage, conversion events, and field performance.
- Sufficient first-party RUM volume (or an authorized CrUX/Search Console source) for p75 field CWV.
- Designated approver for pricing/guarantees, business claims, redirect/indexability changes, production bindings, and deployment.
