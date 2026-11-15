# KINEXIS audit implementation report

**Date:** 2026-11-14 (verification phase)  
**Scope:** Approved Scope B + final verification before preview  
**Production deploy:** Not done — awaiting your explicit approval  
**Prices / commercial terms / domain / copywriting:** Unchanged (no invention)

## Verdict

Verification phase complete in source. Ready for **preview** deployment approval only. Do not publish to production without your OK.

---

## Verification evidence

### 1. Invoice security (`npm run check:invoice-security` + Playwright)

| Threat | Result |
|---|---|
| Client posts free-form `amount` to `/api/checkout` | **Blocked** (400; Playwright asserts) |
| Wrong / missing HMAC token | **Rejected** (unit: `tokensMatch`) |
| Invoice ID tamper with reused token | **Rejected** (unit) |
| Expired invoice | **Rejected** (`expired`) |
| Already-paid invoice / token reuse after pay | HMAC still verifies; gate returns **`paid`** |
| Admin create without secret / wrong secret | **503** (unset) / **401** (wrong); Playwright |
| Missing KV / storage | Gate returns **`storage`** |
| Invalid currency | Treated as non-payable (`void`) |

Live PayPal capture is not exercised in CI (no real money). Capture path marks unpaid → paid in KV when PayPal returns a valid order.

### 2. Cookie consent (browser network)

Playwright chromium + mobile (`e2e/smoke.spec.ts`):

| State | GA4 / gtag | Meta Pixel |
|---|---|---|
| Undecided | Not loaded | Not loaded |
| Reject (`v1\|a=0\|d=0`) | Not loaded | Not loaded |
| Analytics only (`a=1\|d=0`) | Loads when GA ID present | Not loaded |
| Accept ads (`a=1\|d=1`) | Loads when IDs present | Loads when pixel ID present |
| After refresh | Saved cookie respected (FAB / no banner) |

UI Reject persists cookie; preferences FAB appears. Dev note: Next.js 16 requires `allowedDevOrigins` for `127.0.0.1` so React hydrates under Playwright.

### 3. Funnel events vs Scope B

See `docs/CONNECT-EVENTS.md` and `src/lib/funnel-events.ts`.

**Live (consent-gated):**  
`preview_form_view`, `preview_form_start`, `preview_form_submit`, `generate_lead`, `plan_selected`, `checkout_started`, `subscription_created`, `purchase`

**Connect / ops placeholders (not emitted on the marketing site):**  
`preview_delivered`, `preview_approved`, `missed_call_replied`, `appointment_booked`

### 4. Playwright browser journeys

`npm run test:e2e` — **chromium 10 passed (1 mobile-only skipped); mobile 11 passed**

Covers: homepage plan compare, pricing ownership + text-back add-on, preview fields, mobile nav, consent matrix, checkout page (no payment), invoice amount/admin gates, case study screenshot.

### 5. OG artwork

Interim page-specific heroes wired. Dedicated **1200×630** assets still outstanding — inventory in `docs/OG-IMAGES.md`. Not a deploy blocker for preview.

### 6. Full checks

| Command | Result |
|---|---|
| `npm run check:invoice-security` | Pass |
| `npm run check` (lint, typecheck, contact, Spanish mirror) | Pass (3 pre-existing script warnings) |
| `npm run smoke` | Pass (9 routes 200) |
| `npm run test:e2e` | Pass (chromium + mobile) |
| `npm run build:worker` | Pass (OpenNext Worker bundle) |

---

## Environment variables (preview / production)

| Variable | Required for | Notes |
|---|---|---|
| `INVOICE_ADMIN_SECRET` | Staff invoice create | Header `x-invoice-admin`; ≥16 chars |
| `INVOICE_LINK_SECRET` | HMAC pay links | Or fall back to `PAYPAL_CLIENT_SECRET` |
| PayPal client id/secret + mode | Checkout | Existing |
| KV `REVIEWS` binding | Invoice + reviews storage | Already in Worker config |
| `NEXT_PUBLIC_GA_ID` / `NEXT_PUBLIC_META_PIXEL_ID` | Measurement | Consent-gated in boot |

Do not commit secrets. Confirm Wrangler/env for preview before first invoice create.

---

## Preview deployment (for your approval)

```bash
npm run check
npm run build:worker
npm run preview          # local Worker preview
# or, after your OK:
# npm run upload         # Cloudflare upload without flipping production DNS
# npm run deploy         # FULL production — only with explicit permission
```

**This report does not authorize production deploy.**

---

## Rollback

1. Redeploy prior Worker version via Wrangler / Cloudflare dashboard, or  
2. Revert the Scope B commits and rebuild, or  
3. Partial: restore previous `boot.min.js`, remove `CookieConsent` from `SiteChrome`; invoice pay then requires staff-issued `?inv=&t=` links only (by design).

---

## Still needs your commercial input (not invented)

1. **Domain** — Year-1 domain included on which monthly plans (or separate)?  
2. **Copywriting** — Keep quoted separately (recommended) vs defined page counts per plan?

Until answered, catalog/checkout keep prior published wording; no new domain/copy promises.

---

## Operator: create invoice

```http
POST /api/invoices
Content-Type: application/json
x-invoice-admin: <INVOICE_ADMIN_SECRET>

{"amount":"2500","description":"Site deposit","expiresInDays":14}
```

Response includes signed `url`. Do not log secrets or customer PII with amounts in shared docs.
