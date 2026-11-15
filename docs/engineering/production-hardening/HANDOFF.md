# Programme handoff

## Current

- **Phase:** 3 — CI enforcement, deploy gates, preview-email isolation
- **Date:** 2026-11-15
- **Branch:** `cursor/phase3-ci-preview-email-67c1` (from Phase 2)
- **Status:** Complete. No production deploy.

## What Phase 3 does

- CI runs `check:invoice-security` after `check`.
- Preview uses only `CONTACT_PREVIEW_TO`; empty fail-closes team mail.
- Preview wrangler vars clear production `CONTACT_TO` and set `NEXT_PUBLIC_IS_PREVIEW=1`.
- `.env.example` documents preview sink + future Conferbot placeholders (off).

## Commands (this session)

| Command | Result |
|---|---|
| `npm run check:contact` | PASS |
| `npm run check` | PASS |
| `npm run check:invoice-security` | PASS (mocked; sandbox NOT RUN) |
| `npm run test:e2e` | NOT RUN |
| `npm run build:worker` | NOT RUN |

## Owner actions

1. Review Phase 2 PR #8 and Phase 3 PR; stacking OK when CI green; merging to `main` deploys.
2. Set preview `CONTACT_PREVIEW_TO` before expecting preview form email.
3. Continue: Phase 4 next from agent side.

Report: `phases/phase-03-ci-preview-email.md`.
