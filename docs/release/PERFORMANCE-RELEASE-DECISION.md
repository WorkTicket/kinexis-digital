# Performance release decision

**Status: OWNER-APPROVED EXCEPTION — future Lighthouse optimization is out of scope.**

Owner decision (2026-11-17): accept these scores for release preparation; retain 95 as a future optimization goal. The approved benchmark method and budgets remain unchanged; no more Lighthouse optimization work is authorized. Two fresh runs on the rebuilt application:

| Route | Run 1 | Run 2 | Result |
|---|---:|---:|---|
| `/` | 94 | 94 | FAIL |
| `/pricing` | 94 | 94 | FAIL |
| `/portfolio` | 93 | 93 | FAIL |
| `/contact` | 95 | 95 | PASS |

Desktop: 100 on all four routes in both explicit-profile runs. LHRs are retained locally, ignored, under `.audit/release/verified-run-{1,2}-{mobile,desktop}/`. The residual lab-score risk is accepted only as a performance policy decision; this does not establish that real-user Core Web Vitals pass. Post-launch monitoring of field p75 LCP, INP, and CLS is required under [`POST-LAUNCH-MONITORING.md`](POST-LAUNCH-MONITORING.md). This exception waives no security, payment, privacy, accessibility, or lead-delivery gate.
