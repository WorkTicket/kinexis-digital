# Payment page design update

The payment page now uses the site's shared PageHero, Card primitive, Ubuntu fonts, paper/ink theme tokens, and blue accents. Light and dark themes follow the rest of the site.

Customers select one of four plans, then review a single checkout summary with the price, first-charge timing, minimum term, agreement, and payment action. The selected plan's features appear alongside it. The payment summary stays in view on desktop; compact choices stack on phones with Lead System first. Native radio controls support keyboard navigation. Monthly prices remain in USD in all locales.

PayPal configuration, subscription callbacks, SDK loading, consent handling, invoice form behavior, and checkout API routes are unchanged. Changing a selection remounts the existing subscription component for that plan; only the selected plan has an active PayPal button. Own It retains the hosted payment link and shared agreement gate. Billing alignment with launch day still requires the previously documented manual PayPal operation.

Validation:

- All 621 tests pass, including selected-plan/price/feature consistency, mocked PayPal plan mapping, and agreement gating across monthly and Own It selections.
- TypeScript, ESLint (13 existing image warnings), and design-system lint pass.
- Production Next.js/OpenNext Cloudflare build passes.
- Browser checks cover three locales, two themes, desktop/mobile, keyboard plan selection, agreement gating, FAQ, footer language switching, and no horizontal overflow. See [qa-results.json](./qa-results.json).
- [Screenshots](./screenshots) use mock PayPal buttons and rejected analytics consent. Full-page captures force the invoice section to render because Chromium otherwise omits offscreen `content-visibility` sections.
- No real payment buttons were clicked, and no forms, checkout/webhook requests, payments, subscriptions, or analytics test events were submitted.

The existing invoice form and its query defaults remain available below the checkout and via direct invoice links in the hero and FAQ area.
