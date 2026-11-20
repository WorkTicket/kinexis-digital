# Phase 9.1 — Owner and external verification plan

This is a plan only. Phase 9.1 did not sign into provider accounts, change settings, send events, submit forms to external sinks, create a payment, or deploy. Use the owner’s own approved accounts and isolated test resources. Capture dates, account/property/dataset IDs, read-only evidence, and results without storing credentials or visitor data.

## Owner decisions and client evidence

- **A1 portfolio permission:** confirm current permission to display the client name, live-site link, genuine 2026-11-17 screenshot, and case-study text. The recapture is complete; publication permission is not implied.
- **Reviews and other client examples:** retain written authorization for every quotation, attribution, rating, portfolio asset, and description; verify provider facts are current. See `OWNER-DECISIONS.md` and `TRUST-CLAIMS.csv`.
- **Billing start and guarantee summary:** decide the actual first-charge timing and whether the short checkout guarantee summary adequately exposes the controlling terms. Approve wording before edits.
- **Operational claims and translations:** confirm preview/launch/text activation timing remains achievable; obtain native Spanish editorial review of localized commercial/legal terms.

## Analytics, advertising, and lead routing

- **Test lead sink:** inspect the isolated recipient/provider log for the single previously authorized, explicitly labeled test. Confirm its recipient/routing and whether any production/customer inbox was involved. Do not send another submission without separate authorization.
- **GA4:** using approved owner access to property **542906196**, inspect Realtime/DebugView for the previously documented labeled test and verify account-side receipt of `generate_lead` and `preview_form_submit`. Review key-event configuration: `generate_lead` is the primary candidate; keep `preview_form_submit` and `audit_request` non-key unless the owner explicitly selects a separate goal.
- **Google Ads:** review destination **`AW-18409243306`**. Earlier browser evidence showed it received `generate_lead` and `preview_form_submit`; confirm the destination is intended and whether either event is configured as a conversion. Do not trigger another event for verification.
- **Meta:** obtain appropriate access for the owner’s own profile through Meta Business Settings; do not use or alter Natalia’s session. Identify the dataset actually used by campaigns, then read Events Manager for ad account **235075765**, Pixel **2080705549212381**, the previously observed `Lead` transport, and custom-conversion rules. Transport evidence alone does not prove account attribution.
- **Conferbot/D1:** provision only a nonproduction bot, secret, isolated D1 binding/migration, and test sink. After separate approval, test signed create/update, duplicate, retry, and partial-write recovery; production lifecycle is not established.
- **PayPal:** after owner/finance approval, use sandbox credentials, test buyer, and isolated callback/webhook registration to verify approval/capture/ledger behavior. No sandbox or production payment was made in this phase.

## Privacy, RUM, and production validation

- Confirm consent legal basis, copy, vendor behavior, and tracker semantics with the privacy owner; no production tracker configuration was altered.
- Confirm first-party RUM consent policy, sampling, access, and retention; inspect approved Workers Observability records without exposing visitor data.
- Grant read-only access to approved field CWV/Search Console reporting and evaluate representative p75 data over an adequate period. Lab Lighthouse scores are not field CWV.
- Before release, rerun the unchanged Lighthouse budgets and manual WCAG 2.2 AA process on the approved release candidate. After an owner-approved release, perform a read-only production sitemap/canonical/hreflang crawl.

## Stop conditions

Do not send a provider event, submit another live lead, charge/capture payment, alter production configuration, publish, or deploy as part of this checklist without the corresponding separate authorization. Phase 10 remains unstarted and requires explicit approval.
