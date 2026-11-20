# Dependency and supply-chain audit

## Results

Audit executed Tue Nov 17, 2026 with the lockfile present:

Phase 9.1 re-ran both audit commands on the same lockfile: production dependencies still report zero vulnerabilities; the full graph still reports 13 moderate and zero high/critical. No dependency or lockfile changes were made.

| Command | Result |
|---|---|
| `npm audit --omit=dev --json` | 0 vulnerabilities across 55 production dependencies; 0 low/moderate/high/critical |
| `npm audit --json` | 13 moderate, 0 high, 0 critical across the full graph (881 total including optional/dev) |
| `npm ls @opennextjs/cloudflare @opennextjs/aws @node-minify/core glob minimatch typescript-eslint --all` | Identified affected installed paths below |

The advisories are in development/build tooling, not the production dependency subset:

- `glob` 10.5.0 (nested under `@node-minify/core`) and 13.0.6 (deduped through OpenNext/Sentry): GHSA-3g3m-2fjr-6pw4, abort-timeout cancellation bypass can permit post-timeout filesystem traversal; audit range includes glob 9.0.0–14.0.1.
- `minimatch` 9.0.9 and 10.2.6: GHSA-g3hv-75wg-m249, globparts amplification denial of service; audit range `<11.0.1`.
- These findings propagate through `@node-minify/core` → `@opennextjs/aws` → `@opennextjs/cloudflare`, and `typescript-eslint` via `@typescript-eslint/*`. npm reports an adapter remediation path involving `@opennextjs/cloudflare@0.3.0`, a major downgrade from the installed 1.20.13; that is not an appropriate automatic fix.
- Full `npm audit` also lists associated moderate transitive packages (`@sentry/bundler-plugins`, `@sentry/node`, `@typescript-eslint/*`, `typescript-eslint`). Their advisories trace to the above glob/minimatch issues; the reported semver-compatible fixes for Sentry/ESLint are transitive, but do not clear the OpenNext chain by themselves.

`package.json` already has an override for `glob` under `@node-minify/core` (`^10.5.0`); the installed 10.5.0 still resolves vulnerable `minimatch@9.0.9`. Forcing `minimatch@11` across consumers risks violating declared ranges and was not done without compatibility evidence.

## Risk assessment

- **Runtime reachability:** no production dependency is reported vulnerable by `--omit=dev`. OpenNext and optimizer packages execute in local/CI/build environments; glob/minimatch are used for filesystem pattern matching. Exploitability depends on attacker-controlled glob patterns reaching these build-time functions; no such public runtime path was found in inspected application code.
- **CI/build exposure:** moderate residual supply-chain/build DoS risk remains because affected tooling runs in developer/CI builds. CI has read-only GitHub contents permission and pinned action SHAs, reducing (not eliminating) impact.
- No high/critical vulnerability was reported. The full-tree audit exited nonzero because moderate findings remain.

## Action

No dependency updates were applied: the apparent OpenNext fix path is a major downgrade, while nested minimatch override compatibility is unverified. Track a targeted upstream-compatible update, then run `npm ci`, full audit, `npm run check`, `npm run check:invoice-security`, `npm run build:worker`, and Playwright before accepting. Do not use `npm audit fix --force`.
