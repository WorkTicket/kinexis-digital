# KX-AUD-02 — GA4 lead definition annotation

**Effective after production deploy of the SHA that includes this change.**

| Field | Value |
|-------|-------|
| Prior definition | `generate_lead` on mapped form `res.ok` and every `tel:` tap |
| New definition | `generate_lead` only when `/api/contact` returns `{ ok: true, accepted: true }` for a counted marketing form or accepted strategy-call booking |
| Tel taps | GA4 `phone_tap` diagnostic only; Meta `Lead` with `content_name: phone_tap` unchanged |
| Strategy-call CTA click | GA4 `strategy_call_click` diagnostic only |
| Honeypot | `{ ok: true }` without `accepted` — no GA4 primary, no Meta Lead from browser |
| Historical reporting | Leave Nov 17/21 Direct windows intact; filter www-only for post-release analysis |
| First full post-release window | Record start date after deploy; reconcile inbox/CRM independently |

Production GA4 property remains on canonical www. Preview/local builds continue with empty tracker IDs (no production emissions).
