# Commercial consistency — Phase 6

## Sources of truth inspected

- `src/lib/plans-catalog.ts`: plan prices, billing type, features, checkout bullets, and text-back matrix.
- `src/lib/content.ts`: FAQs, offer steps, upgrades, shared plain-language terms.
- `src/i18n/prices.ts`, `src/i18n/spanish-plan-compare.ts`, and `src/i18n/spanish-plans.ts`: localized prices and commercial summaries.
- `src/app/(en)/terms/page.tsx`: detailed public offer terms.
- `scripts/check-commercial-consistency.mjs`: existing assertions for plan amounts, text-back, and localized values.

## Published values verified against catalog

| Item | Published value / qualification |
|---|---|
| Website | $97/month |
| Lead System | $197/month |
| Plus | $297/month |
| Own It | $1,497 one-time |
| Website / Own It missed-call text-back | Optional $97/month add-on; dedicated business line and carrier approval/rates apply |
| Lead System / Plus missed-call text-back | Optional; $1/month second tracking number if used, plus carrier rates |
| Extra Website page | $99 each |
| Own It Site Care after included period | Optional $39/month |
| Monthly billing | $0 down; month-to-month; terms say begins on launch; price locked 24 months |
| Domain | First year included; later renewals at cost |
| 30-day refund | Most recent payment, written request within 30 days of launch; already-paid third-party costs excluded |
| 60-day lead guarantee | Lead System and Plus; zero tracked leads during first 60 days live waives third and fourth monthly charges; one per business, account in good standing; specific exclusions in detailed terms |
| Cancellation / files | Cancel anytime without cancellation fee; site stays through paid period; hosting then stops unless written $1,497 buyout or move to Own It before period end |
| Taxes | USD; applicable taxes excluded |

## Findings / owner decisions

- **Billing start conflict:** detailed English terms say monthly plans begin on launch day. `PayCheckout.tsx` displays “First charge when you subscribe” (also localized). This can alter when a customer expects payment. Do not choose one interpretation without the owner confirming the actual payment schedule, then align checkout and terms.
- **Guarantee summary scope:** checkout's compact plan bullets state the guarantee but do not reproduce all full-term boundaries (lead definition, account good standing, tracking interference, pause/cancel before day 60, and exclusions). Confirm the checkout summary/link placement is sufficient; do not change the legal offer in this audit.
- **Spanish locale:** Spain-facing pages display euro numerals using the same published number set, not an exchange-rate conversion; this behavior is explicitly documented in `prices.ts`. LatAm pages use USD. Preserve this approved localization unless the owner changes market/pricing policy.
- No demonstrated disagreement in the four headline plan prices or the main text-back price matrix was found. The existing check covers recurring assertions; it does not prove every long-form article string is synchronized.

## Automation

Existing check: `npm run check:commercial` (included in `npm run check`). No new checker was added because current test does not parse all editorial copy and a broader heuristic could assert incorrect context.
