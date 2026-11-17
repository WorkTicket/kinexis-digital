# Post-launch monitoring

**Status: NOT APPLICABLE YET — production is not deployed.**

The owner-approved Lighthouse exception retains the existing 95 target as a future goal; it is not evidence that field Core Web Vitals pass. After separately authorized deployment, assign named on-call owners and approved read-only access for the first 24 hours and first 7 days. Monitor availability, Worker errors, D1 and notification failures, payment/webhook errors, chatbot, consent/analytics, security events, and real-user p75 LCP, INP, and CLS. Review representative field data after sufficient eligible traffic/collection (target a 28-day window where available); record sample size and limitations. Separate labeled test traffic from genuine prospects; do not expose personal data in reports.

Use Core Web Vitals thresholds as the field interpretation (LCP ≤2.5s, INP ≤200ms, CLS ≤0.1 at p75); set an owner and review cadence before launch. Record escalation contacts and rollback decision authority. Do not claim post-launch health or business impact without observed evidence.
