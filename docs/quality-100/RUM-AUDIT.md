# Real-user monitoring audit

## Implementation

`public/assets/js/rum.js` is loaded through `Boot.tsx` with `lazyOnload`, sets a once-per-page guard, samples approximately 20% using `Math.random()`, and sends same-origin `/api/rum` beacons. Payload includes a truncated pathname (no query/hash), sampling fraction, metric name/value/short ID; it carries no user ID, cookie, user agent, device class, or viewport class. Visibility/pagehide flushes; batching timer can also flush while visible. The handler validates payload/path, rate-limits, and writes structured `rum_metric` logs. Code does not establish actual Cloudflare retention or collection.

## Metric correctness

- LCP is queued for each observer entry; the event stream is not finalized/deduplicated to one page-level value.
- INP is currently each event timing entry's `duration`; it does not implement interaction grouping, the INP percentile candidate, or page lifecycle finalization. It is not a valid INP measurement.
- CLS queues individual layout-shift values rather than session-window aggregation; it is not page CLS.
- TTFB and FCP are navigation/paint observer values but may be emitted more than once across flushes.
- `pathOnly()` is evaluated at flush time, so a queued metric around soft navigation may be labeled with a later route. No explicit navigation type, device/viewport classification, or route-change lifecycle handling is present in the client script.

Thus reported values must not be represented as standard field Core Web Vitals. This custom implementation is first-party real-user telemetry in intent, not verified production field results. Lab Lighthouse scores remain separate.

## Privacy, endpoint, performance

Existing engineering policy treats RUM as consent-independent first-party performance telemetry. The script adds no third-party SDK, defers loading, samples, and sends only bounded path/metric fields; endpoint has payload, cross-site, and rate-limit guards. Endpoint response/log behavior and actual retention/worker observability access were not tested against production. No request or production data was sent.

## Implementation-ready follow-up

Choose an approved Web Vitals implementation/algorithm or implement lifecycle-correct aggregation; pin route at observation/flush boundary, include bounded navigation context, and test supported/unsupported APIs, multiple shifts/interactions, soft navigation, hidden/pagehide, sample exclusion, and failed beacon. Add consent decision if policy requires it. Verify endpoint sink and retention with an isolated environment. Do not publish production CWV until representative field collection has been confirmed.
