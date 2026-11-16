# Security headers + CSP / Trusted Types proposal (KDS-69)

**Status:** HSTS + existing Best Practices headers shipped/aligned. CSP nonce (SEC-01), Trusted Types, and any “effective XSS” CSP tighten remain **owner-gated** — do not ship breaking policy in this pass.  
**Related:** [`SEC-01-CSP-NONCE-BLOCKER.md`](./SEC-01-CSP-NONCE-BLOCKER.md), `next.config.ts` `headers()`, Cloudflare zone `security_header`.

## What is live today (safe)

| Control | Where | Value / note |
|---|---|---|
| HSTS | Cloudflare zone `security_header` **and** `next.config.ts` | `max-age=31536000; includeSubDomains`. Zone setting is what browsers see on proxied apex/www (CF overwrites origin HSTS). `preload` **off** until owner elects hstspreload.org. |
| CSP | `next.config.ts` | Present and allowlists GTM, Meta, PayPal, Trustpilot, Conferbot, Cloudflare Insights. Still includes `'unsafe-inline'` for scripts/styles (required until SEC-01). |
| X-Content-Type-Options | next + CF nosniff | `nosniff` |
| Referrer-Policy | next | `strict-origin-when-cross-origin` |
| Permissions-Policy | next | `camera=(), microphone=(), geolocation=()` |
| X-Frame-Options / `frame-ancestors` | next | `DENY` / `'none'` |
| COOP / CORP | next | `same-origin-allow-popups` / `same-site` |
| X-DNS-Prefetch-Control / X-Permitted-Cross-Domain-Policies | next | `off` / `none` |
| `X-Powered-By` | next | Disabled (`poweredByHeader: false`) |

**Verified 2026-11-16:** live `www` / apex return `Strict-Transport-Security: max-age=31536000; includeSubDomains` after zone max-age bump from `15552000` (6 months). No Worker deploy required for that change.

## Out of scope (note only)

- **Cloudflare Web Analytics / Insights beacon** often shows a ~1-day cache in Lighthouse. That asset is Cloudflare-managed, not first-party. Do not chase it in this repo.

## Do not reintroduce

- **`X-XSS-Protection`:** obsolete; removed from Chromium. Can cause security issues in old IE. We correctly omit it. Lighthouse “XSS auditor” nostalgia is not a ship target.

## Gap vs Lighthouse Best Practices “CSP XSS” / Trusted Types

Lighthouse’s CSP audit treats a policy with `script-src … 'unsafe-inline'` as **present but not strongly XSS-mitigating**. Trusted Types (`require-trusted-types-for 'script'`) is a separate, stricter layer. Both need app changes; neither is safe as a drive-by header flip.

### A. SEC-01 — nonce / `'strict-dynamic'` (existing blocker)

See [`SEC-01-CSP-NONCE-BLOCKER.md`](./SEC-01-CSP-NONCE-BLOCKER.md). Summary:

1. Move CSP off static `next.config` headers for HTML; mint nonce in middleware/Worker.
2. Stamp every first-party inline script in `DocumentShell` / boot path.
3. Prove GTM + Meta (post-consent), PayPal `/pay`, Conferbot CDN/WDT on a **preview** Worker.
4. Optional `Content-Security-Policy-Report-Only` window before enforce.
5. Only then drop `'unsafe-inline'` from `script-src`.

**Do not merge** an enforcing nonce CSP without the SEC-01 matrix and owner gate `G-CSP`.

### B. Trusted Types (propose only)

| Step | Action | Risk if rushed |
|---|---|---|
| 1 | Add Report-Only: `Content-Security-Policy-Report-Only: require-trusted-types-for 'script'; report-uri …` (or Reporting API) on preview | Low if report-only |
| 2 | Inventory sinks: `dangerouslySetInnerHTML`, `innerHTML`, Conferbot/PayPal/GTM/Meta script injection in `boot.js` | Third parties often violate TT |
| 3 | Adopt `trustedTypes.createPolicy` for first-party HTML/script sinks; default policy only if unavoidable | Easy to paper over XSS |
| 4 | Enforce `require-trusted-types-for 'script'` only after report-only is clean on `/`, `/pricing`, `/pay`, `/es` with consent accept/reject | High — blank chrome / checkout / chat |

**Recommendation:** After SEC-01 nonces land and third-party loaders are understood, run Trusted Types **report-only** on preview for ≥1 release cycle. Enforce only with owner approval. Do not combine first enforcing nonce CSP and first enforcing Trusted Types in the same change.

### C. CSP tightenings that are still unsafe without work

- Removing `'unsafe-inline'` from `style-src` (Tailwind / runtime styles).
- Dropping `https:` from `img-src` / `media-src` without an allowlist audit.
- `Cross-Origin-Embedder-Policy: require-corp` (breaks third-party frames/scripts unless CORP/CORP-ok everywhere).

## Owner actions (no agent deploy)

1. **Done this pass:** zone HSTS `max_age` → `31536000` (preload still false).
2. **Optional later:** enable HSTS `preload` in CF + `next.config`, confirm every subdomain used in DNS is HTTPS, then submit [hstspreload.org](https://hstspreload.org). Hard to undo — owner only.
3. **SEC-01 / Trusted Types:** approve preview experiment when ready; keep production CSP as today until matrix green.
4. Deploy Worker from PC when next `main` ship is intentional — header doc/code comments do not require a deploy for the zone HSTS fix already live.

## Acceptance for KDS-69

- [x] Safe HSTS at 1 year on live apex/www (CF zone + matching `next.config`).
- [x] Existing safe headers retained; no visual/functional change.
- [x] Written CSP / Trusted Types / XSS-auditor proposal (this file); no breaking CSP shipped.
- [x] CF Insights beacon cache called out as out of scope.
