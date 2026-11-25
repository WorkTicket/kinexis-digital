# Production deployment

**Status: DEPLOYED — owner explicitly authorized production deployment on 2026-11-17.**

Deployed revision: `2b3bf93c6158ff7bbc8570739f6ac332c3221f3d` from `phase-1/conversion-handoff`. Cloudflare Worker version: `40abc15c-3663-4656-b2e0-52cb15613de3`. Routes: `kinexisdigital.com`, `www.kinexisdigital.com`. No push, merge, or D1 migration was performed. The deployment was explicitly authorized despite previously documented unresolved full-audit, provider, privacy/accessibility, commercial and rollback gates; deployment does not mean those gates passed.

The established `npm run deploy` sequence completed: strict analytics preflight, `npm run check`, 4-worker E2E (70 passed, 4 expected skips), OpenNext Worker build and Conferbot public-ID guard, Worker deploy, `npm run search:notify`, and `npm run verify:prod`. IndexNow accepted 150 URLs. Post-deploy smoke checked 152 URLs with zero failures; structured data passed 9/9; mobile/desktop performance budgets passed. The deployment output warned that the two public analytics IDs conflict with remote secrets and replaced those remote secrets with plain Worker variables (the IDs are public by design). Cloudflare listed D1/KV/email/DO/asset bindings, but no application exercise of D1/DO persistence was part of the smoke test.

Post-deploy, continue monitoring and close the open gates: production-only audit is clean, but the full tree still has 19 high unpatched picomatch advisories; PayPal sandbox, lead receipt, analytics account mapping/receipt, live widget/privacy, manual accessibility, legal/commercial permissions, and backup/rollback verification remain open. Do not claim those tests passed based on deployment smoke checks. Do not push or merge without separate authorization.
