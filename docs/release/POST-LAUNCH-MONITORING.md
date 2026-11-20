# Post-launch monitoring

**Status: ACTIVE — production deployed 2026-11-17; owner/on-call assignments and monitoring thresholds still need confirmation.**

Deployment: source SHA `2b3bf93c6158ff7bbc8570739f6ac332c3221f3d`; Worker version `40abc15c-3663-4656-b2e0-52cb15613de3`. Post-deploy `verify:prod` smoke checked 152 URLs with zero failures, structured data passed 9/9, and the Lighthouse budget check passed. These are initial smoke checks, not sustained health or field Core Web Vitals evidence.

The owner-approved Lighthouse exception retains the existing 95 target as a future goal; it is not evidence that field Core Web Vitals pass. Assign named on-call owners and approved read-only access for the first 24 hours and first 7 days. Monitor availability, Worker errors, D1 and notification failures, payment/webhook errors, chatbot, consent/analytics, security events, and real-user p75 LCP, INP, and CLS. Review representative field data after sufficient eligible traffic/collection (target a 28-day window where available); record sample size and limitations. Separate labeled test traffic from genuine prospects; do not expose personal data in reports.

Use Core Web Vitals thresholds as the field interpretation (LCP ≤2.5s, INP ≤200ms, CLS ≤0.1 at p75); set an owner and review cadence before launch. Record escalation contacts and rollback decision authority. Do not claim post-launch health or business impact without observed evidence.
