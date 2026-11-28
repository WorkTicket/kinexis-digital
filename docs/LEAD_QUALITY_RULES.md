# Lead quality rules (plan 11.2 checklist)

Transparent, rules-based **pre-qualification hints**. Sales confirms on the call; form flags are labeled hints, not CALL-qualified status.

Implemented in `src/lib/lead-quality.ts` (`deriveLeadQuality`).

## Five checklist flags

| Flag | True when |
| --- | --- |
| `served_trade` | Trade is Plumbing, Landscaping, Roofing, Tree service (or clear synonym) |
| `decision_maker` | Answer is yes / helps decide (owner or helper) |
| `has_or_wants_site` | Has a site or wants one |
| `budget_fit` | Self-reported plan interest (Website / Lead System / Plus / Own It / approved pilot). Otherwise **`unknown`** until asked on the call — never invent a fit |
| `start_within_90_days` | Within 30 days or 1–3 months (not “just exploring”) |

## Derived fields

- `hint_score` = count of the five flags that are **true** (0–5). `budget_fit: unknown` does not add a point.
- `qualified_hint` = all five true **and** `spam_suspect` is false. Still a **hint** — CRM `qualified` stays `unknown` until sales sets Y/N.
- `spam_suspect` = set by server spam gates / manual review (not ML).

## Weekly export

Filter CRM / scorecard by `hint_score` and `qualified_hint`. Outreach counts stay blank when the touch log has no rows — never estimate.
