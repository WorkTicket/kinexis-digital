# Release candidate

**Status: SOURCE CANDIDATE — not deployed.** This branch is for preparing the combined SEO/conversion Release 1 with the already-approved cosmetic work. No production deployment is authorized by this record.

## Candidate identity

- Branch: `release/1`
- Base: `499174f1fe90af46faeaccf60e8d057f57de4e0b`
- The base contains the KX-SEO-002 remediation and prior approved cosmetic merge.
- This candidate adds the H1/H2 highlight behavior correction and mobile portfolio tap/hover fix, with focused regression coverage.
- Record the full commit SHA after the scoped changes are committed. It is not yet a frozen candidate.

## Included scope

- Preserve the SEO and conversion remediation already in the base commit, including the requested internal links, Spanish paths/content/redirect behavior, metadata/schema, and lead-tracking work.
- Preserve the approved cosmetic changes already in the base and include the heading-highlight correction.
- On touch/coarse-pointer devices, portfolio screenshot taps must not leave hover-only CTA overlays or card-lift styling stuck. Keep hover presentation for mouse/trackpad users.
- Include the related SEO, conversion-form, visual, and responsive regression tests.
- Exclude separate PayPal credential/configuration work, preview inbox/configuration changes, Release 2 performance experiments, Release 3 multi-host cleanup, and unrelated test-runner changes.

## Verification before candidate freeze

The last dirty-tree run reported `npm run check`, `npm run check:invoice-security`, `npm audit`, `npm audit --omit=dev`, and `git diff --check` passed. The full Playwright run reported passed with 124 tests scheduled; this was not run on the frozen candidate SHA. The mobile portfolio touch regression was included. Treat all of these as preliminary working-tree evidence and rerun the requested checks after the final scoped diff is assembled.

## Gates remaining before deployment

The release-gate matrix tracks open and blocked items. In particular, the exact-SHA full test/build and independent QA, human content/legal/privacy/accessibility approvals, provider acceptance, and recoverable off-device backup/rollback remain required before production deployment. These gates do not prevent committing the scoped candidate; they do prevent deployment.

Production deployment requires a separate explicit approval naming the exact final SHA and target, after the recovery path and deployment checklist are confirmed. No production source deployment, push, or merge is authorized by this document.
