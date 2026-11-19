# Real-user monitoring audit

## Implementation

`src/components/Rum.tsx` dynamically imports the maintained `web-vitals` library after hydration, samples approximately 20%, and sends same-origin `/api/rum` beacons. Payload includes a sanitized pathname (no query/hash), sample fraction, metric name/value/unique ID/navigation type; it carries no user ID, cookie, user agent, device class, or viewport class. Library page-lifecycle reporting supplies final LCP, INP and CLS values and soft-navigation context. The component deduplicates by metric name/ID and batches up to eight values. The handler validates path and metric fields, rate-limits, and writes structured `rum_metric` logs. Actual Cloudflare retention/collection is not established.

## Metric correctness

- `onLCP`, `onINP`, and `onCLS` from `web-vitals` provide standards-based metric aggregation and page/soft-navigation lifecycle handling. INP/LCP use milliseconds; CLS is unitless.
- FCP and TTFB remain supplementary diagnostics, not Core Web Vitals.
- Metric route uses the library's bounded navigation URL and retains only its pathname; query/hash are never transmitted. Navigation type and metric ID are included for grouping/deduplication.

The browser implementation reports library-calculated metric values in local regression fixtures. This is not evidence of production collection or representative field CWV. Lab Lighthouse scores remain separate.

## Privacy, endpoint, performance

Existing engineering policy treats RUM as consent-independent first-party performance telemetry. The script adds no third-party SDK, defers loading, samples, and sends only bounded path/metric fields; endpoint has payload, cross-site, and rate-limit guards. Endpoint response/log behavior and actual retention/worker observability access were not tested against production. No request or production data was sent.

## Implementation-ready follow-up

Verify endpoint sink/retention and representative sampling in a controlled production-like environment. The existing policy sends first-party RUM without analytics/ads consent; obtain owner/privacy confirmation before release. Do not publish production CWV until representative field collection has been confirmed.
