# Tracking audit — 2026-11-25 (reference copy)

**FACT:** `/workspace/kinexis_ops/TRACKING_AUDIT_2026-11-25.md` was not present on this machine when Prompt 4 ran. This file records the audit items this branch acted on so the repo stays self-contained.

## Production ID

- GA4: `G-Z8245BRX2L` (also enforced by search-preflight)

## Should-fix items addressed in Prompt 4

1. **Unify `generate_lead`** across mapped marketing forms after server `accepted` — implemented on `measurement-crm-lead-quality-2026-12` (revertible).
2. **Production-only hosts** — implemented (`isProductionAnalyticsHost`).
3. **Diagnostics** — `preview_form_submit`, `audit_request`, `phone_tap` keep `event_role: "diagnostic"`; not key events.
4. **Late-consent / pending queue / double page_view** (audit #3–#5) — **not changed**; propose separately; default OFF until Colton OKs.
5. **e81907d (boot v=66 pending tracks)** — **not in git history here**; not cherry-picked. Needed pieces reimplemented narrowly (accepted gate, host allowlist, transaction_id). Live www was boot `v=65` / SHA `315e362b` as of 2026-11-27.

If Colton has the full ops audit file, paste it over this stub without removing the Dec 11 docs.
