# CURRENT-TASK.md

## Goal
Close the four remaining production polish items from the 92/100 audit.

## Status
**Done (local).** Deploy to ship.

## Completed
1. **Schema www consistency** — `SITE.url` forces www for apex; Organization `@id` is always `https://www.kinexisdigital.com/#org`; ProfessionalService shares `/#service`; structured-data checker asserts www org ids.
2. **Social artwork** — generated `public/og/*.webp` (1200×630); wired through `PAGES.*.ogImage` + Spanish metadata inherit; `npm run images:og`.
3. **PayPal positive capture** — sandbox card create+capture COMPLETED in `check:paypal-sandbox` (negative path still covered). Optional `PAYPAL_SANDBOX_APPROVED_ORDER_ID` for buyer-approved wallet capture.
4. **Portfolio performance** — top 4:3 `-card.webp` crops (~15–40 KB vs ~120–345 KB tall 640s); listing pages use cards; first live shot eager; `content-visibility` on cards. `npm run images:portfolio-cards`.

## Next
- Deploy production.
- Spot-check OG with Facebook/X share debugger.
- Re-run mobile Lighthouse on `/portfolio` after deploy.
