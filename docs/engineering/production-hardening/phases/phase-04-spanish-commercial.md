# Phase 4 — Spanish localization and commercial consistency

**Date:** 2026-11-15  
**Branch:** `cursor/phase4-spanish-commercial-67c1` (stacked on Phase 3)

## Scope

Align Spanish pricing display with EN text-back matrix and EUR numerals on `/es-es`; add automated commercial consistency checks; document Conferbot bot setup (locale/customData). No pricing/terms/guarantee/EUR numeral inventing.

## Changes

- Spanish pricing table: Website text-back cell now matches EN (`Extra $97` / `97 €`), not em dash.
- `/upgrades` Spanish page uses `p()` with locale currency (USD vs EUR).
- `check:commercial` + harness; included in `npm run check`.
- `docs/CONFERBOT-BOT-SETUP.md` — bot facts, locale customData, owner blockers.

## Verification

| Command | Result |
|---|---|
| `npm run check:commercial` | PASS |
| `npm run check:spanish-mirror` | PASS (73 paths) |
| `npm run check` | PASS |
| `npm run test:e2e` | NOT RUN |
| `npm run build:worker` | NOT RUN |

## Owner blockers / notes

- `UPGRADES` / `PLAN_TEXTBACK_FOOTNOTE` in `content.ts` still mention `$1/mo` in Website/Own It add-on prose while CONTENT + matrix reserve `$1` for LS/Plus and `$97` for Website/Own It. Not changed (policy escalate; do not invent a rewrite).
- Conferbot remains disabled; Starter upgrade still owner-only.
