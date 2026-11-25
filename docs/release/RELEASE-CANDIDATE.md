# Release candidate

**Status: SOURCE CANDIDATE — not deployed.** The Release 1 base candidate is `76475c3a28dc0e043033fe1bf6883a378202c40d`; follow-up UX/copy corrections are being prepared on `release/1-deploy-fixes`. No production deployment is authorized by this record.

## Candidate identity

- Base candidate: `76475c3a28dc0e043033fe1bf6883a378202c40d` (`release/1`)
- Follow-up branch: `release/1-deploy-fixes`, based on the exact base candidate above.
- Follow-up source commit: `f1becd2c5e838131cd58fa6e5156c9afa3d774f5`.
- The base contains the KX-SEO-002 remediation and approved cosmetic merge, including the H1/H2 highlight behavior correction and mobile portfolio tap/hover fix.
- Follow-up scope: align Spanish homepage CTA hierarchy with English, restore 48px mobile footer contact targets, and replace the stale “Pedidos de reseña” wording.
- This is a locally verified source candidate, not deployed.

## Included scope

- Preserve the SEO and conversion remediation already in the base commit, including the requested internal links, Spanish paths/content/redirect behavior, metadata/schema, and lead-tracking work.
- Preserve the approved cosmetic changes already in the base, including the heading-highlight correction.
- On touch/coarse-pointer devices, portfolio screenshot taps must not leave hover-only CTA overlays or card-lift styling stuck. Keep hover presentation for mouse/trackpad users.
- Include the related SEO, conversion-form, visual, and responsive regression tests.
- Follow-up regression coverage checks Spanish homepage CTA hierarchy and 48px mobile footer targets.
- Exclude separate PayPal credential/configuration work, preview inbox/configuration changes, Release 2 performance experiments, Release 3 multi-host cleanup, and unrelated test-runner changes.

## Verification before candidate freeze

**2026-11-20 follow-up verification:** `npm run check` and `npm run build` passed after source commit `f1becd2c5e838131cd58fa6e5156c9afa3d774f5`. The full Playwright suite passed against the same tracked source tree immediately before commit using `npx playwright test --workers=4`: 149 passed, 9 skipped (158 scheduled). The Spanish-home CTA and 48px footer regressions passed in Chromium and mobile. An earlier full run overlapped check/build and had 4 timeouts; those did not recur in the isolated run. The earlier Release 1 verification below remains historical.

## Gates remaining before deployment

The release-gate matrix tracks open and blocked items. In particular, independent QA, human content/legal/privacy/accessibility approvals, provider acceptance, and recoverable off-device backup/rollback remain required before production deployment. These gates do not prevent committing the scoped candidate; they do prevent deployment.

Production deployment requires a separate explicit approval naming the exact final SHA and target, after the recovery path and deployment checklist are confirmed. No production source deployment, push, or merge is authorized by this document.
