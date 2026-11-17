# Security clearance

**Disposition: BLOCKED for final production clearance; no known production dependency advisory was found, but full-tree tooling risk and remote configuration remain open.**

Fresh `npm audit` on 2026-11-17: 21 vulnerabilities (12 moderate, 9 high, 0 critical), including picomatch ReDoS and glob/minimatch advisories. `npm audit --omit=dev` returned zero vulnerabilities earlier in this session. No lockfile change or forced/breaking dependency update was made. The available proposed `--force` fixes require breaking downgrades and were not run.

CI review: `.github/workflows/ci.yml` runs on `pull_request` with `contents: read`, no configured secrets or write permissions; it checks out the PR and runs validation/build. This limits token impact but does not eliminate malicious code execution risk on an agent/developer machine or privileged release build. Keep dependency patch tracking open and do not run privileged deploy/build from unreviewed source.

Fresh local checks: `npm run check`, `npm run check:invoice-security`, and `npm run build:worker` passed; payment/provider HTTP remains mocked. Worker build warned about missing build-time GA4/Meta IDs and Windows OpenNext runtime limitations. Worker output included the configured public Conferbot bot identifier. Wrangler declarations include `INVOICE_DB`, `REVIEWS`, and `NEXT_INC_CACHE_KV`; `LEAD_DB` is absent by design. These checks do not prove deployed bindings or provider boundaries.

**Required before clearance:** obtain owner/Cloudflare verification of required production binding/secret names and backup/rollback; provision/test isolated LEAD_DB; assess deployed rate-limit behavior; retain webhook signature/replay and redaction checks; resolve or document accountable acceptance of the dev-tooling advisory risk. The strict production analytics preflight was directly run and correctly exited 1 with both required build-time IDs missing. Owners: Engineering, dependency owner, Cloudflare Operations, Owner.
