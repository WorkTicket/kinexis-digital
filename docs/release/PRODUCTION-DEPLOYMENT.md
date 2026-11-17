# Production deployment

**Status: NOT AUTHORIZED — no production deployment occurred.**

No push, merge, production configuration mutation, migration, or deployment is authorized by approval to prepare. Deployment requires a separate explicit owner authorization after every mandatory gate passes.

Established command: `npm run deploy`, implemented by `scripts/deploy-production.mjs`. It runs strict production analytics preflight, `npm run check`, `npm run test:e2e`, `npm run build:worker`, the Conferbot bot-ID artifact guard, `npm run deploy:worker`, `npm run search:notify`, and `npm run verify:prod`. It mutates production at the deploy step; do not run it during preparation. The strict preflight currently fails because production build-time GA4 and Meta IDs are absent locally.

Before requesting authorization, present exact candidate SHA/artifact, tests and skips, security, lead delivery, PayPal, Conferbot, analytics, accessibility, privacy/commercial approvals, the owner-approved performance exception and residual field-CWV risk, backup/rollback readiness, exact command, and expected customer impact. Stop if any mandatory non-performance gate remains blocked.
