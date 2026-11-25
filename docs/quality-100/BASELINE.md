# Phase 0 — Repository and production baseline

**Captured:** 2026-11-17  
**Repository:** `WorkTicket/kinexis-digital`  
**Source commit:** `3b606689ae9b27b78d3acb8a8a360b28aaa22a84` (`main` at capture)  
**Working tree:** clean detached worktree at that commit before baseline artifacts; no application changes made.

## Executive summary

The current GitHub `main` snapshot has substantial existing quality controls and passes its comprehensive local check suite, invoice-security suite, and mocked browser regression suite. A Worker build completes. Live production checks found zero failing URLs among the sitemap sample and required utility/representative routes, and all nine structured-data sample checks pass.

There are material gaps against the master program’s targets:

- Production mobile Lighthouse performance is 95–98 on the four budget routes. Desktop is 81–84 and fails the existing 85 budget on all four routes; the program target is 95+.
- The build preflight reports `NEXT_PUBLIC_GA_ID` and `NEXT_PUBLIC_META_PIXEL_ID` missing in this local environment. Build exits successfully, so this is an environment/configuration warning requiring verification in the actual Cloudflare build environment.
- `npm audit` reports 13 moderate dependency findings, no high or critical findings.
- E2E results include six skipped tests; live GA/Meta delivery, live PayPal capture, lead notification, Conferbot lead persistence/handoff, Search Console/RUM field metrics, and production D1 operations are not established by these checks.
- No field Core Web Vitals, Search Console crawl/export, conversion analytics, or owner/provider evidence was available. Lab measurements must not be represented as field results.

This is a baseline, not a 100/100 score or a release authorization.

## Repository and runtime

- `main` at capture: `3b606689ae9b27b78d3acb8a8a360b28aaa22a84`; exact GitHub `refs/heads/main` SHA independently confirmed with `git ls-remote`.
- A stale pre-existing local checkout was 155 commits behind. Discovery was therefore continued in an isolated detached worktree at the exact upstream SHA; the original checkout and its uncommitted work were left untouched.
- Next.js `16.4.6`; React `19.3.1`; TypeScript `6.0.3`; Tailwind CSS `4.3.3`; OpenNext Cloudflare adapter `1.20.13` (package ranges/lockfile at capture).
- Runtime used for checks: Node `v24.15.0`, npm `11.12.1`; both satisfy `package.json`.
- App Router locale shells are English, `/es`, and `/es-es`; source documents describe `/es-es` redirecting to `/es`. `src/lib/pages.ts`, `src/lib/locale-path.ts`, `src/app/sitemap.ts`, `src/proxy.ts`, `next.config.ts`, and `wrangler.jsonc` are central route/configuration sources.
- APIs include contact, checkout/capture, invoice, PayPal webhook, review/moderation, RUM, and Conferbot webhook handlers.
- Worker uses OpenNext, KV for reviews/cache/rate limiting, a D1 invoice ledger, and email bindings. `LEAD_DB` remains intentionally unbound pending owner provisioning.
- `npm run deploy` is a manual deployment path. CI validates/builds/tests and does not deploy. No deployment was run.

## Existing controls found

- Central page metadata, sitemap, robots, canonical/locale handling, redirects, SEO ownership checks, metadata-length checks, and structured-data generation/verification.
- English and Spanish route coverage guard (79 mirrored paths); commercial consistency checks cover plan amounts, text-back matrix, and USD/EUR numerals.
- Contact delivery mock tests, attachment validation, rate limits, review route tests, payment/invoice security and reconciliation fixtures, Conferbot webhook/widget checks, and RUM payload tests.
- Playwright desktop/mobile projects, local Worker build, live production sitemap smoke, structured-data checks, and mobile/desktop Lighthouse budgets.
- CSP/security headers and deployment safeguards are implemented in source. The production effectiveness of account-level settings and provider integrations still needs separate evidence.

## Verification evidence

| Command | Result | Evidence / limitation |
| --- | --- | --- |
| `npm ci` | Pass | Installed 741 packages; npm reported 13 moderate vulnerabilities. |
| `npm run check` | Pass with warnings | Lint (0 errors, 28 warnings), TypeScript, mocked contact/attachment/rate-limit/reviews, Spanish coverage, industry icons, commercial consistency, SEO ownership, meta lengths, Conferbot contracts, and RUM payload checks passed. |
| `npm run check:invoice-security` | Pass | Invoice/payment integrity, mocked provider boundary, ledger/routes/import, and reconciliation fixtures passed. Provider HTTP is mocked; this is not sandbox or live payment evidence. |
| `npm run verify` | Pass with skips | Included the above, mocked PayPal contract, and Playwright. 38 passed, 6 skipped. PayPal sandbox evidence explicitly reported **NOT RUN**. |
| `npm run build:worker` | Exit 0 | OpenNext production build completed; 297 static pages generated, 279/283 pages inline Next CSS, zero blocking stylesheet links. Search preflight reported GA4 and Meta Pixel build IDs missing in this local environment but did not fail the build. Windows OpenNext compatibility warning is present. |
| `npm run verify:prod` | **Fail** | Live sitemap smoke: 152 checked (150 sitemap URLs plus robots/sitemap), 0 failures. Structured data: 9/9 pass. Mobile Lighthouse passes. Desktop Lighthouse performance fails on all four tested routes (details below); other categories pass. |
| `npm audit --json` | **Fail** | 13 moderate, 0 high, 0 critical. Findings are transitive, including `glob`/`minimatch` and OpenNext/Sentry/typescript-eslint dependency chains. npm offers a major-version OpenNext fix; do not apply automatically. |
| `node scripts/check-structured-data.mjs` | Not applicable locally | Failed to fetch all nine routes because no local server was running. The production run within `npm run verify:prod` passed 9/9. |

### Production Lighthouse (lab)

Collected by the repository’s configured Lighthouse budget script against `https://www.kinexisdigital.com` on 2026-11-17. Budget: performance 0.85; accessibility, best practices, SEO 0.90. Scores are normalized Lighthouse scores; this is not field CWV.

| Route | Mobile Perf. | Desktop Perf. | Accessibility | Best Practices | SEO |
| --- | ---: | ---: | ---: | ---: | ---: |
| `/` | 0.96 | 0.81 **fail** | 1.00 | 1.00 | 1.00 |
| `/pricing` | 0.96 | 0.83 **fail** | 1.00 | 1.00 | 1.00 |
| `/portfolio` | 0.95 | 0.81 **fail** | 1.00 | 1.00 | 1.00 |
| `/contact` | 0.98 | 0.84 **fail** | 1.00 | 1.00 | 1.00 |

The script’s current mobile/desktop runs cover only these four routes, not every page type. No screenshots, LCP attribution, 320–1920px responsive matrix, or field metric dataset was captured in Phase 0.

## Production route smoke and inventory

- Production sitemap contained 150 unique URLs at capture.
- `npm run verify:prod` tested all sitemap URLs plus `/robots.txt` and `/sitemap.xml`: 152 requests, zero failures.
- The generated `ROUTE-INVENTORY.csv` records 157 production requests: sitemap routes plus selected checkout, audit, campaign, tool, case-study, and industry routes. Every request returned 200 after following redirects; `/es-es` was followed to its destination, so inspect `final_path` rather than interpreting the final status as evidence it did not redirect.
- Inventory fields are an automated HTML snapshot, not a human content audit. Structured data is independently validated only for the nine routes listed by the existing checker. CTA correctness, internal-link graph, all route-level schema, translation quality, and visual defects remain unverified.
- Routes specifically covered in the supplementary sample include homepage, pricing, portfolio, audit, Phoenix campaign, contact, checkout/thanks, English and Spanish pages, blog, case studies, and plumbing/roofing/tree-care/junk-removal examples where present in the sitemap or additional sample.

## Current assessment

- **Verified passing:** repository static checks, mocked security/integration suites, 38 E2E tests, production URL smoke, 9 structured-data samples, mobile budget scores, accessibility/best-practice/SEO lab scores for four routes, Worker build completion.
- **Verified failing:** desktop Lighthouse performance budget on four routes; npm audit’s moderate findings.
- **Implemented but not verified:** real notification delivery, production payment behavior, Conferbot live conversation and lead lifecycle, field RUM/CWV, Cloudflare account-level headers/vars, backup/restore operations, and actual production conversion attribution.
- **Not implemented / not evidenced:** a defensible weighted 100-point score, field CWV evidence, full route-by-route accessibility/visual audit, and a pre-traffic production-equivalent release verification report.
- **Requires owner/provider access or approval:** Cloudflare Workers build vars/secrets and D1 bindings, real PayPal sandbox approval, provider notification test, Conferbot dashboard/webhook/database activation, Search Console/RUM access, account-level security configuration, and any commercial/SEO indexability change.

## Scope and safety

Only GET requests to production and non-production checks/builds in an isolated temporary worktree were used. No forms were submitted to production, no payments or sandbox orders were created, no database was queried or changed, and no deployment occurred.
