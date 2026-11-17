# Release candidate

**Status: BLOCKED — no production release candidate frozen.**

Starting revision was `766c0be76b2539297f8748c0210be658955cb2ca`; current working base was `4f8bf523b53342d63157bd5d5faa9c907ce710d3` on `phase-1/conversion-handoff`. The current code/documentation changes are still being validated and must be committed before a candidate exists. Production deployment is not authorized.

Known gate decision: performance has a narrow owner-approved exception recorded in [`PERFORMANCE-RELEASE-DECISION.md`](PERFORMANCE-RELEASE-DECISION.md); it does not waive other gates. Build-time GA4/Meta IDs are currently absent locally, preview lead destination is not configured, `LEAD_DB` is omitted, and external provider/account acceptance remains blocked. The production analytics preflight therefore fails closed.

Before freezing: resolve mandatory provider/security/privacy/accessibility/lead gates; set approved production build variables via Cloudflare; rerun required regression against the final candidate; record lockfile hash, build environment and artifact identity; verify migration compatibility; obtain confirmed backup/restore and currently valid Worker rollback version. Current repository has invoice migration `migrations/0001_invoice_payment_ledger.sql` (Wrangler comments say applied); lead migration `migrations-lead/0001_conferbot_lead_intel.sql` is not bound/applied. No production migration or deployment was performed.
