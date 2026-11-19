# Phase 0 — Prioritized backlog

Ordered by business impact, severity, and implementation risk. This is discovery planning only; no Phase 1+ implementation is authorized by this baseline.

| Rank | Priority | Work | Reason / evidence | Dependencies / risk | Suggested next phase |
| ---: | --- | --- | --- | --- | --- |
| 1 | P0 | Resolve desktop performance gap with repeatable traces and LCP attribution. | Four of four production desktop routes score 81–84 and fail even the existing 85 threshold; objective is 95+. | Avoid broad redesign/preload changes; needs route-level evidence and regression snapshots. | Phase 4 |
| 2 | P0 | Verify GA4/Meta build configuration in the actual Cloudflare build environment. | Local Worker preflight reports both IDs missing, while build still exits 0; conversion measurement could be absent in a newly built artifact. | Owner access required; do not print or change secrets. Confirm CI/Cloudflare variables before code changes. | Phase 8 / 10 |
| 3 | P0 | Establish controlled live lead-delivery and payment verification plan. | Automated checks are mocked and do not demonstrate real notification, PayPal capture, or lead persistence. | Owner-approved preview destination, sandbox credentials, and provider access; no production form/payment test. | Phase 1 / 7 |
| 4 | P1 | Triage 13 moderate dependency vulnerabilities and identify safe compatible upgrades. | `npm audit` exits 1; no high/critical findings, but findings affect transitive build chain. | OpenNext fix suggestion is major; no automatic fix. Isolate and retest worker build. | Phase 7 / 9 |
| 5 | P1 | Account for six skipped E2E tests and close material coverage gaps. | `npm run verify`: 38 pass, 6 skip. Live measurement tests are not proven; skipped Conferbot/mobile coverage needs explicit reason classification. | Preserve intentionally disabled flags in CI; do not falsely convert provider tests into live evidence. | Phase 9 |
| 6 | P1 | Expand performance and accessibility coverage to representative route families. | Lighthouse currently checks home/pricing/portfolio/contact only; scores do not cover the full site or WCAG manual criteria. | Use route families/templates to keep CI tractable; retain existing gates while measuring. | Phase 4 / 5 / 9 |
| 7 | P1 | Review route inventory exceptions, canonicals, hreflang, internal links, and redirect outcomes. | 157 sampled requests return 200 after redirects, but the CSV is a metadata snapshot, not a full crawl/content audit. `/es-es` behavior and sitemap alternates need focused validation. | No mass redirect/indexability changes without owner evidence/approval. | Phase 2 / 3 |
| 8 | P2 | Obtain Search Console and first-party RUM evidence; report lab and field separately. | No owner analytics/Search Console access or p75 field metrics was available. | Requires read-only owner authorization and sufficient traffic volume. | Phase 0 follow-up / Phase 8 |
| 9 | P2 | Verify production Conferbot behavior and lead-intelligence lifecycle in isolated preview. | Widget and signed webhook contracts are implemented/tested; actual dashboard, human handoff, `LEAD_DB`, notifications, persistence, attribution are not proven. | Owner-provisioned separate D1 and secrets; do not bind/create production resources. | Phase 1 / 7 |
| 10 | P2 | Verify D1/KV backup and recovery and account-level security headers. | Documented operational controls exist but remote config and restore were not exercised. | Owner-gated Cloudflare access; prefer preview; no remote writes in discovery. | Phase 7 / 10 |
| 11 | P2 | Review content/pricing claims and trust proof with the owner. | Automated consistency passes; it does not prove every visible statement/testimonial is approved and current. | Use canonical catalog and approved claims; no invented proof. | Phase 6 |
| 12 | P3 | Decide whether lint warning cleanup is worthwhile. | 28 warnings, 0 errors; most are generated/minified or content scripts. | Avoid broad cleanup unrelated to quality risk. | Phase 9 |

## Explicitly not in this backlog

- Rebuild or replace the existing SEO, analytics, payments, localization, or integration infrastructure.
- Change prices, guarantees, public business claims, indexing strategy, canonical policy, or large redirect groups without approval.
- Deploy, modify Cloudflare secrets/bindings, create production databases, or submit customer-facing test leads/payments.
