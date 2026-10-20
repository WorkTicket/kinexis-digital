# Plan checkout review

Branch: `pay-plan-checkout`. Draft PR only; do not merge or deploy.

The `/pay` page now presents Website ($97), Lead System ($197), Plus ($297), and Own It ($1,497), with USD pricing in all locales. Lead System appears first on phones. One unchecked Terms agreement gates the subscription buttons and hosted Own It link. Monthly subscriptions share one locale-aware PayPal SDK loader. Subscription approvals navigate to a localized, noindex thank-you page with sanitized IDs, agreement version 2.0, and an ISO timestamp. GA purchase/subscribe and Meta Subscribe are consent-gated and deduplicated with session storage.

The invoice/deposit form, its query defaults, content, checkout helpers, API routes, success/cancelled pages, and existing tests are unchanged. It appears below the plans and FAQ. Shared navigation, footer, and Ubuntu font assets are reused.

## Billing and Terms notes

- PayPal plans start billing when the customer approves. Aligning that billing with the promised launch date is a **manual PayPal operation** for now; this change does not schedule, defer, or refund a charge. Operations must confirm and align billing before sending customers to subscribe.
- Compared with the live English `/terms` on 2026-10-19. Terms §14.2 wins over the brief's unconditional domain-renewal wording: the page says renewals are included **when Kinexis registered the domain**.
- The Own It refund summary includes **30 days from preview approval**, and file ownership includes **full payment**, to match the Terms.
- `offer/offer.md` was not present in this checkout. No offer document was invented or changed.
- Existing invoice Spanish copy is preserved verbatim under the brief's strict behavior/content-preservation rule. All new plan content uses usted.
- The installed Next.js package does not contain `node_modules/next/dist/docs/`; installed API declarations and the official page reference were checked instead.

## Validation

- `npm run lint`: passed, with 13 existing image warnings and no errors.
- `npx tsc --noEmit`: passed.
- `npm test`: 65 files, 620 tests passed, including unchanged invoice/API tests.
- `npm run build`: passed. The final consent adjustment was also compiled by the subsequent OpenNext production build.
- `npx opennextjs-cloudflare build`: passed after the final code change; no deployment.
- `node scripts/qa-pay-plans.mjs`: six browser runs across en, es-419, es-ES at 1440px and 390px. Checks plan order, USD pricing, agreement gating, FAQ, footer language switching, thank-you IDs/noindex, invalid IDs, and horizontal overflow.
- Screenshots use **mock PayPal buttons**. All external requests and `/api/*` requests are blocked in browser QA; consent is rejected. The mock throws on attempted Meta tracking and the final runs have no browser errors.
- No real PayPal button was clicked. No payments, subscriptions, checkout/webhook calls, invoice submissions, or Meta/GA test events were made.

Screenshots are in [screenshots](./screenshots); machine-readable browser results are in [qa-results.json](./qa-results.json).
