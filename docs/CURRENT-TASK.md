# CURRENT-TASK.md

## Goal
Ship approved commercial update (domain year 1 on all monthly plans) + fine-print polish to production; tear down preview; verify PayPal.

## Status
**In progress.** Domain + fine-print code updated; commit → push main → `npm run deploy` → delete preview → PayPal smoke test.

## Domain (owner-approved)
Year 1 included on Website / Lead System / Plus / Own It, in the customer’s name; later renewals at cost. Catalog, comparison matrix, checkout line, EN/ES terms updated.

## Fine print
Chooser blurb + ownership footnote copy unchanged (approved). Presentation: no raw `**`; labeled text-back bullets in `plan-notes`.

## Still open after this ship
1. Copywriting inclusion decision (still quoted separately)
2. Full live PayPal capture only if owner runs a real $1/sandbox path — smoke-test buttons on production first

## Next action
Commit + push main, production deploy, wrangler delete preview env, then PayPal UI check on live `/pay`.
