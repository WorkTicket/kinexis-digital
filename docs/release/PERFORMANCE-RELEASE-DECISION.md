# Performance release decision

**Status: FAIL — strict mobile gate is not met; no exception approved.**

Policy remains Lighthouse mobile ≥95/100 on `/`, `/pricing`, `/portfolio`, `/contact`, using the existing method and unchanged budgets. Two fresh runs on the rebuilt application:

| Route | Run 1 | Run 2 | Result |
|---|---:|---:|---|
| `/` | 94 | 94 | FAIL |
| `/pricing` | 94 | 94 | FAIL |
| `/portfolio` | 93 | 93 | FAIL |
| `/contact` | 95 | 95 | PASS |

Desktop: 100 on all four routes in both explicit-profile runs. LHRs are retained locally, ignored, under `.audit/release/verified-run-{1,2}-{mobile,desktop}/`. The route-aware preload adjustment avoids the homepage poster request on interior pages; it did not clear the strict gate. Continue only with evidence-backed changes that preserve image quality and functionality. No lower budget, altered method, exception, or field-CWV substitute is approved.
