# Phase 6 — Performance, accessibility, SEO

**Date:** 2026-11-15  
**Branch:** `cursor/phase6-perf-a11y-seo-67c1`  
**Stacked on:** Phase 5 (`cursor/phase5-security-conferbot-67c1`)

## Scope

- Prove Conferbot does not load while the public flag is off (Playwright).
- Record lighthouse / structured-data commands honestly (NOT RUN without a live local server URL in this pass unless run).
- Document widget vs cookie-consent overlap for owner QA when the flag is later enabled.
- No UX redesign; no production deploy.

## Changes

- `e2e/smoke.spec.ts` — Conferbot script/id absent after interaction/idle when `NEXT_PUBLIC_CONFERBOT_ENABLED` is unset.
- This phase report + STATUS/HANDOFF/TEST-MATRIX updates.

## Widget / consent note (owner QA when enabling)

Consent dock uses `z-index: 80`. Conferbot’s floating launcher may sit in the same corner. With the widget on, check mobile overlap with the consent FAB / banner and skip-link focus order. Lazy load uses idle/input (not analytics consent).

## Verification

| Command | Result |
|---|---|
| `npx playwright test e2e/smoke.spec.ts -g "Conferbot" --workers=1` | PASS (2 tests: chromium + mobile) |
| `npm run check` | PASS |
| `npm run lighthouse:budget` | NOT RUN unless a local/preview URL is available this session |
| `npm run check:structured-data` | NOT RUN (needs running site) |
| `npm run build:worker` | NOT RUN this phase (no Worker code change beyond e2e) |
| Production verify | NOT RUN |

## Owner blockers

- Preview/prod lighthouse budgets when a non-production URL is available.
- Visual QA of Conferbot launcher vs consent UI before enabling the public flag.
