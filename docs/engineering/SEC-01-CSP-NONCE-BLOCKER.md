# SEC-01 CSP nonce — blocker (do not ship yet)

**Status:** Blocked. Keep production CSP as today (`script-src 'self' 'unsafe-inline'` + allowlisted hosts in `next.config.ts`).  
**Owner gate:** `G-CSP` in [`NEXT-PHASES-PLAN.md`](./NEXT-PHASES-PLAN.md) — do not remove `unsafe-inline` until the verification matrix below is green on a Workers preview.

## Repo truth (verified)

| Fact | Evidence |
|---|---|
| CSP is a **static** header from `next.config.ts` `headers()` | Same string for every response; **no per-request nonce** |
| First-party **inline** scripts in HTML | `DocumentShell.tsx`: `locale-choice`, `kinexis-fill-props`, `route-chrome` via `dangerouslySetInnerHTML` |
| Consent-gated loaders inject third-party scripts | `public/assets/js/boot.js`: creates `<script src="…googletagmanager.com/gtag/js">` and Meta `fbevents.js` after consent |
| PayPal checkout loads SDK dynamically | `PayCheckout.tsx` appends `#kinexis-paypal-subscriptions` to `document.head` |
| Conferbot widget loads from CDN | `cdn.conferbot.com` + open shadow UI (already allowlisted) |
| OpenNext on Cloudflare Workers | Per-request CSP rewrite needs middleware/Worker header mutation that stays in sync with HTML nonces |

## Why a naïve nonce break would fail

1. **Static CSP cannot carry a request nonce.** Moving CSP to middleware/Worker is required first.
2. **Every first-party inline script** must receive `nonce="…"`. Missing one → hard CSP violation and broken chrome (locale boot, route classes, button fill props).
3. **GTM / gtag and Meta Pixel** often evaluate further inline snippets or use patterns that still expect `'unsafe-inline'` unless the loader is covered by `'strict-dynamic'` *and* the bootstrap script is nonced. That has to be proven in Chromium with consent accepted, not assumed.
4. **PayPal Buttons** and **Conferbot** inject their own script/iframe graph. They are allowlisted by host today; under `'strict-dynamic'` they rely on being loaded from a nonced/trusted script. Failures show up as blank checkout or a missing launcher — easy to miss without targeted checks.
5. **Workers + OpenNext** caching can serve HTML and CSP from different generations if nonce wiring is wrong → intermittent blocks.

## Required verification matrix (before removing `unsafe-inline`)

Run against a **preview** Worker deploy (owner PC), not production:

| Check | Pass criteria |
|---|---|
| First paint chrome | No CSP errors for `locale-choice` / `route-chrome` / fill props; nav/locale behave |
| Consent reject | No GTM/Meta network (existing e2e) |
| Consent accept | `gtag/js` + GA collect when GA id present; `fbevents.js` + Meta hit when pixel present |
| `/pay` Lead System | PayPal SDK reaches ready or documented fail-closed without CSP console errors |
| Conferbot (flag on) | Widget script loads; launcher usable; no CSP block on `cdn.conferbot.com` / `wdt.conferbot.com` |
| Lighthouse / console | Zero unexpected CSP violations on `/`, `/pricing`, `/pay`, `/es` |

If **any** row fails and cannot be fixed without restoring `'unsafe-inline'`, keep the current CSP and update this file.

## Recommended future approach (not implemented)

1. Generate nonce in middleware / Worker; set `Content-Security-Policy` response header (stop emitting CSP from static `next.config` headers for HTML routes).
2. Pass nonce into `DocumentShell` / root layout; stamp all first-party inline `<script>` tags.
3. Use `script-src 'nonce-…' 'strict-dynamic' https: …` (exact host list still needed for older browsers) and drop `'unsafe-inline'` only after matrix pass.
4. Keep a short `Content-Security-Policy-Report-Only` window on preview before enforcing.

## Decision

**Do not merge a nonce CSP change in this programme step.** Shipping without the matrix would violate the owner rule: *SEC-01 only if GTM, Meta Pixel, PayPal and Conferbot verifiably still work.*

Next action when unblocked: owner approves a preview experiment branch; agent implements middleware nonce + matrix; only then flip enforce.
