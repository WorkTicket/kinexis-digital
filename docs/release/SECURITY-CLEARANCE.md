# Security clearance

**Disposition: BLOCKED.** Local code checks are not production security clearance.

Historical review and exact open findings are in [`RELEASE-GATE-MATRIX.csv`](../quality-100/RELEASE-GATE-MATRIX.csv) and [`RELEASE-RISK-DECISION.md`](../quality-100/RELEASE-RISK-DECISION.md). The prior full dependency audit found 21 advisories (12 moderate, 9 high, 0 critical); high rows roll up to development-tooling picomatch ReDoS; production-only audit had zero. This session did not rerun npm audit.

Fresh local checks: `npm run check`, `npm run check:invoice-security` passed, including mocked payment integrity and webhook cases. These do not test real provider boundaries or deployed bindings.

**Required before clearance:** rerun full and production-only audits; assess updated advisory reachability and compatible fixes; test required/optional binding failure behavior in an isolated Worker; verify production secret names/bindings without revealing values; review rate limiting, webhook replay/signature controls, redaction, and deploy preflight in the release environment. Owners: Engineering, dependency owner, Cloudflare Operations.
