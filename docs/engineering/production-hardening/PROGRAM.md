# KINEXIS Production Hardening Programme

## Objective

Harden the existing KINEXIS Digital production application in gated phases while preserving its customer experience, approved commercial policy, architecture and production behavior. This is maintenance of an existing system, not a redesign or framework migration.

## Architecture constraints

Retain Next.js App Router, React, strict TypeScript, Tailwind CSS, OpenNext and Cloudflare Workers. Preserve existing KV/Durable Object/email/PayPal/SEO integrations unless a phase documents evidence for a change. Do not introduce dependencies or change major versions without justification and review.

## Non-negotiable rules

- Preserve existing design, functionality, responsive behavior and accessibility; use existing patterns and shared components.
- Do not invent or change commercial terms, guarantees, testimonials, EUR pricing, or the relationship between the $97/month text-back add-on and optional $1/month second-number/carrier charges. Escalate discrepancies for owner decision.
- Do not expose secrets, weaken security/type checks/test thresholds, swallow errors, or report skipped tests as passing.
- Validate untrusted input; use integer minor units for money; explain business/security constants and preserve existing configured limits unless approved.
- Test real routes/services where practical, mocking only external boundaries. Add regression tests for fixes and test failure/boundary cases.
- No production merge, push, deployment, DNS/secret/customer-data change, production migration, live charge, or real customer notification without explicit owner approval.
- Do not discard or overwrite user work. Work only on the assigned phase and stop at its handoff.

## Phase sequence

0. Establish baseline, preserve Git state, document risks and create handoff system; no application fixes.
1. Payment/invoice integrity, signing and any approved persistent ledger/webhook design.
2. Real route integration tests and test architecture.
3. CI enforcement, approved deployment gates and preview-email isolation.
4. Spanish localization and commercial consistency; unresolved business policy is an owner blocker.
5. Security/resilience: CSP, rate limits, uploads, concurrency, secrets/logging and monitoring.
6. Measured performance, accessibility and SEO without UX regression.
7. Repository quality and documentation; no history rewrite or unverified asset deletion.
8. Isolated staging and independent QA; no production changes.
9. Release readiness documentation only; stop for explicit approval.

Each phase independently verifies its scope, records exact test commands/results and risks, updates status and phase report, and hands off. Do not proceed automatically. A skipped/unavailable verification is NOT RUN, not PASS. Production is never deployed without explicit approval.

## Required records

Maintain `STATUS.md`, `BASELINE.md`, `FINDINGS.md`, `DECISIONS.md`, `TEST-MATRIX.md`, `HANDOFF.md`, and `phases/phase-00-baseline.md` through `phases/phase-09-release-readiness.md`. Produce `FINAL-REPORT.md` only after the full programme is evidenced. Never record secret values.
