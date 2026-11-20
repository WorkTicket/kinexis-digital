# Real user monitoring (RUM) — free path

**Status:** First-party beacon + Workers Observability. No paid APM (Datadog/Sentry/etc.).

## What ships

1. **Cloudflare Workers Observability** — already `observability.enabled: true` in `wrangler.jsonc` (dashboard traces/logs on the free Workers plan).
2. **`POST /api/rum`** — accepts a tiny JSON body: `{ path, metrics[{name,value,id}], sample? }`. Validates, rate-limits (`rum` bucket), logs `kind: "rum"` via `console.info`. No cookies, no user id, no query string.
3. **`src/components/Rum.tsx`** — dynamically imports `web-vitals` after hydration, samples ~20%, and reports LCP / INP / CLS / TTFB / FCP to `/api/rum`. The maintained library owns page-lifecycle aggregation for LCP, INP, CLS and soft-navigation context. First-party performance collection remains independent of analytics/ads consent under the existing policy.

The browser-reported LCP/INP/CLS use library-defined units (milliseconds for LCP/INP; unitless CLS). The endpoint does not claim production field CWV: collection, representativeness, and retention require separate production verification.

## Owner viewing

- Cloudflare dashboard → Workers → `kinexis-digital` → Observability / Logs. Filter for `rum_metric` or `kind":"rum"`.
- Optional: enable Cloudflare **Web Analytics** (free product, separate site token) in the dashboard if you want a chart UI — not required for this beacon.

## Local check

```bash
npm run check:rum
```

## Out of scope

- Paid RUM/APM vendors.
- Storing vitals in D1/KV (would need retention policy + new bindings).
- Cross-origin beacons.
