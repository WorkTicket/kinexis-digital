# Phase 3 — CI enforcement, deploy gates, preview-email isolation

**Date:** 2026-11-15  
**Branch:** `cursor/phase3-ci-preview-email-67c1` (stacked on Phase 2)  
**Base for PR:** Phase 2 head / stack on PR #8; ultimate merge target `main` only with owner approval.

## Scope

- GitHub Actions `validate` also runs `npm run check:invoice-security` (mocked PayPal; not sandbox).
- Preview Worker never uses production `CONTACT_TO` / `SITE.email` for team mail.
- Document Conferbot flag placeholders in `.env.example` (still off; no runtime).

## What changed

- `src/lib/contact-mail.ts` — `isPreviewSite()` → only `CONTACT_PREVIEW_TO`; empty = blocked.
- Contact + reviews notify fail closed when preview has no sink.
- `wrangler.jsonc` preview vars: `NEXT_PUBLIC_IS_PREVIEW=1`, empty `CONTACT_TO` / `CONTACT_PREVIEW_TO`.
- `.github/workflows/ci.yml` — invoice-security step.
- `check-contact-delivery.mjs` — preview isolation assertions.

## Verification (this session)

| Command | Result |
|---|---|
| `npm run check:contact` | PASS (includes preview isolation) |
| `npm run check` | PASS |
| `npm run check:invoice-security` | PASS (PayPal mocked; sandbox NOT RUN) |
| `npm run test:e2e` | NOT RUN |
| `npm run build:worker` | NOT RUN |
| Preview Worker redeploy | NOT RUN (owner) |

## Owner actions

1. Before next preview deploy: set `CONTACT_PREVIEW_TO` to a sink address and add it to preview `send_email.allowed_destination_addresses` if not already listed.
2. Do not set production `CONTACT_TO` on the preview Worker.
3. Conferbot flags remain off until Phase 5+ and Starter upgrade (owner).
