# Final master audit — independent verification and release readiness

**Approved audit starting HEAD:** `5142de9f25eb4fd625e16f61cb91bc42d185a404`
**Branch:** `phase-1/conversion-handoff`
**Phase 9.2 ancestor:** `351ed618e60fb0c99f48e0e324abe97c7860d0f1`
**Audit date:** 2026-11-17
**Disposition:** Not release-ready. Do not begin Phase 10. The release-risk assessment at `RELEASE-RISK-DECISION.md` is preserved and incorporated into the existing definitive matrix, `RELEASE-GATE-MATRIX.csv`.

## Scope and independent verification

The starting revision was the approved HEAD, the worktree was clean, the branch matched, and Phase 9.2 is an ancestor. This review examined the Phase 1–9.2 records and handoffs, regression inventory, release status and matrix, security/dependency/accessibility/performance evidence, owner decisions, and test-infrastructure notes. Historical failures and skips were not silently relabeled as passes: Phase 4's consent fixture issue and Phase 6's transient regressions are recorded as subsequently corrected/retested; prior and current environment/provider skips remain explicit.

Checks run locally on the approved starting tree:

| Check | Result |
|---|---|
| `npm run check` | PASS: lint 0 errors (28 existing warnings), TypeScript and all listed contact, analytics, attachment, rate-limit, reviews, Spanish, industry, commercial, SEO, metadata, Conferbot, and RUM guards passed. Logged SMTP-unavailable/missing-preview-recipient messages came from intentional negative fixtures; the script passed. |
| `npm run check:invoice-security` | PASS: invoice/payment security, mocked PayPal boundary, routes, import, and reconciliation fixtures passed. PayPal sandbox explicitly not run. |
| `npm run check:structured-data` | PASS: 9/9 representative page types. |
| `npm run check:search-preflight` | PASS: CI build without analytics IDs is allowed with warnings; production preflight fails for either missing ID and passes for valid build-time IDs. |
| `npm run test:e2e -- --workers=1` | PASS: 68 passed, 6 skipped, 0 failed (74 total). The six are environment/project-gated coverage, including measurement delivery requiring provider IDs and browser-project-specific tests; they are not evidence of live analytics/provider acceptance. |
| `npm run build` | PASS: Next.js 16.4.6 production build, 297 generated pages/routes; CSS-inlining and no-legacy-polyfill guards passed. Generated minified assets were unchanged. |
| `npm run build:worker` | OpenNext Worker bundle completed locally. Its preflight exposed absent GA4/Meta build-time IDs; this would produce a Worker without those tags. A confirmed deploy-guard defect was fixed: production deploy now requires valid build-time IDs before its test/build/deploy sequence, while CI builds may omit them. |
| `npm audit` | FAIL as a full-tree policy gate: 21 advisories (12 moderate, 9 high, 0 critical). |
| `npm audit --omit=dev` | PASS: zero reported production dependency advisories. |
| `git diff --check` | PASS after the local guard and documentation changes. |

Playwright's local Wrangler/Next dev startup printed the known internal `NEXT_CACHE_DO_QUEUE` / `DOQueueHandler` warning. The local tests passed, but they do not establish production Worker Durable Object behavior. No deployment, production mutation, provider test, or live account access was performed.

One locally actionable deploy-safety defect was confirmed and fixed: the build preflight reported absent analytics IDs as failures but returned success, and the production deploy sequence had no strict ID gate. The deploy sequence now runs a fail-closed, local-only preflight requiring valid build-time GA4 and Meta IDs; an automated regression check verifies missing/valid cases and preserves ID-less CI builds. No app runtime or dependency code was changed. The existing 28 lint warnings and local Durable Object warning are recorded, not suppressed. The smoke-route runner's historical Windows exit `3221226505` remains distinct from Phase 9.2's successful exhaustive crawl and this successful production build.

## Dependency finding — independently checked

The current full audit again reports nine high-severity package rows. `npm explain picomatch`, `npm ls picomatch --all`, the current lockfile, and the GitHub advisory confirm that all nine rows are roll-ups of one issue: **GHSA-fc5q-39xc-vjpf / CVE-2026-112366**, high severity (CVSS 7.5), affecting picomatch through `4.0.7`, with no first patched version published by the advisory at audit time.

Installed affected copies and paths:

- `picomatch@2.3.2`: root `picomatch` → `micromatch@4.0.8` → `fast-glob@3.3.1` → `@next/eslint-plugin-next@16.4.6` → `eslint-config-next@16.4.6`.
- `picomatch@4.0.7`: nested below `tinyglobby@0.2.17`; consumed through `eslint-import-resolver-typescript@3.10.1` and `typescript-eslint@8.72.0` / `@typescript-eslint` parser and type-estree paths. `fdir@6.5.0` also resolves this copy.

These parents are development dependencies. They run in local lint/type-analysis and CI validation/build contexts; `.github/workflows/ci.yml` runs `npm ci`, `npm run check`, invoice checks, Worker build, and Chromium E2E for pull requests, with `contents: read`. Vulnerable behavior requires a crafted repeated-extglob pattern to reach the matcher. The installed packages provide pattern-matching functions, so malformed or attacker-controlled patterns in a tool/config path could cause CPU denial of service in a developer or CI process; this audit did not demonstrate a remotely reachable production path or reproduce exploitation in the configured workflows. The exact `fast-glob` Next-root-directory call is conditional on a configured root-dir glob; the repository's ESLint config does not set `settings.next.rootDir`. Treat this as residual build/CI supply-chain/availability risk, not as harmless and not as a proven production vulnerability.

No compatible published fix was identified. npm's suggested `eslint-config-next@14.2.35` is a breaking major downgrade; it was not applied. Do not force an override or downgrade. Monitor upstream/advisory status, keep PR/CI permissions minimal, and update the dependency graph in a separate change when a compatible patch exists, followed by audit, build, and regression checks. The 12 moderate full-tree advisories remain separately open.

## Consolidated release decision

The single matrix records all gate evidence, including the prior 205-URL SEO crawl, genuine screenshot capture and permissions, repeated regression evidence, owner/provider requirements, and explicit test limitations. Key current dispositions:

- **Performance:** Desktop 100/100 on all four routes. Mobile `/` 94, `/pricing` 93, `/portfolio` 92, `/contact` 95; the unchanged release target is 95. Simulated mobile LCP is approximately 2.94–3.32 seconds. Production field CWV is unavailable, and no component-level defect has been confirmed. Preserve the target; do not perform speculative optimization.
- **Conditional mobile exception recommendation:** The user's stated preference is Option B only if final review establishes no significant real-user performance defect and critical security, accessibility, lead-delivery, and production-integration checks are satisfied. The exception is **not approved by this audit**: manual accessibility sign-off, isolated lead-delivery receipt, field CWV, and several live integrations remain unverified. Until the owner explicitly approves a scoped, time-limited exception with monitoring and a deadline, the matrix remains `FAIL` for the three below-target routes.
- **SEO/regression:** Prior 205-URL crawl, 0 broken images/failed URLs; current `check` and build pass. Current E2E is 68 passed, 6 skipped, 0 failed. These results do not establish production delivery, provider receipt, accessibility conformance, or release readiness.
- **Security:** Production-only dependency audit is clean, but the full dependency graph remains nonzero and high-severity dev-tooling exposure is open. Local invoice/security fixtures pass; external integration and operational checks remain open.
- **External/owner gates:** GA4 and Meta account receipt/configuration, controlled lead notification receipt, PayPal sandbox, Conferbot/D1 persistence, Cloudflare KV edge behavior, production field CWV, privacy/retention, manual accessibility review, client permissions, Spanish native review, and commercial terms are not cleared by local tests. The guard confirms IDs are available to a production build, not that provider accounts receive or attribute events.

### Provider verification status

The exact non-executed verification procedures are retained in `RELEASE-RISK-DECISION.md`. They cover GA4 `generate_lead` and key-event status; Meta Pixel/campaign dataset and conversion rules; inspection of the already authorized isolated lead test before any resubmission; isolated PayPal sandbox order/approval/capture/webhook and ledger transitions; signed Conferbot webhook lifecycle with test D1; approved read-only production field CWV collection; and nonproduction Cloudflare KV boundary/concurrency/error behavior. No procedure was executed here.

### Recommendation

**No-go for production release and do not begin Phase 10.** Complete applicable owner, accessibility, evidence-permission, privacy, and isolated provider/operations gates; address the full-tree advisories when a compatible upstream fix is available; and obtain an explicit mobile decision. The user's conditional Option B is a reasonable proposed path, not an authorization or a waiver of the outstanding conditions.

No push, merge, deployment, production configuration change, or live-provider test was performed.
