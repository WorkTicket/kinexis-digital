# KX-AUD-08 — Measurement scorecard (through 2026-02-26)

Use exported GSC/GA4 and CRM/billing first. No new dashboard dependency.

## Weekly fields

| Field | Source | Notes |
|-------|--------|-------|
| Finalized 28-day Google Web clicks | GSC | Complete days only |
| Prior-period trend | GSC | Same length window |
| www-only US nonbrand visibility | GSC / GA4 | Exclude local/dev contamination |
| Priority URL coverage | GSC | Plumbing, landscaping, cost guides, case studies, home, pricing |
| Lead source + landing URL | Inbox/CRM | After KX-AUD-02 accepted events |
| Qualified leads | CRM stage | Not raw phone taps |
| Held calls | Call log/CRM | Answered + relevant |
| Wins | CRM | |
| Contracted MRR | Billing | |
| Collected project revenue | Billing | |

Annotate every KX-AUD release SHA, Worker version, and first GSC recrawl date.

## Target support metric

560 Google Web clicks per 28 complete days (20/day). Contribution to the separate $50K/month goal remains Sales/founder.

## Performance gate (conditional)

Run three repeatable mobile Lighthouse passes on `/` and `/pricing` via `npm run lighthouse:budget:mobile` against the intended host after enough field data or when pricing again scores poorly.

| Decision | Action |
|----------|--------|
| Relevance/visibility flat for two complete windows | Review intent, proof, distribution before new URLs |
| Position 8–20 with impressions, no clicks | Isolated snippet/title test |
| Hero MP4 is the main avoidable transfer | Review `HeroFilm.tsx` + boot attachment; keep poster preload, explicit play/dialog, reduced-motion, save-data |
| Material reproducible regression | Stop promotion; follow `docs/release/ROLLBACK-PLAN.md` |

**2026-11-27 status:** Scorecard template ready. HeroFilm/performance code left unchanged pending post-recrawl evidence (audit pricing 77→93 already showed lab noise).
