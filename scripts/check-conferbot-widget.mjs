/**
 * Widget flag and mount contract checks (no browser). Ensures CI / `next dev`
 * keep the public widget off by default while DocumentShell still mounts the
 * component. Production ships via committed `.env.production` (and CI overrides
 * that flag to 0 so this assert and e2e stay meaningful).
 *
 * Load contract: functional chat (not analytics-gated); idle/input after page
 * load; no double-init; no PII in customData.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const enabled = process.env.NEXT_PUBLIC_CONFERBOT_ENABLED;
assert.notEqual(
  enabled,
  "1",
  "CI/local/test must not force NEXT_PUBLIC_CONFERBOT_ENABLED=1 (production uses .env.production; CI workflow sets 0)",
);

const shell = readFileSync(resolve("src/components/DocumentShell.tsx"), "utf8");
assert.match(shell, /ConferbotWidget/);
assert.match(shell, /NEXT_PUBLIC_CONFERBOT_ENABLED/);

const widget = readFileSync(resolve("src/components/ConferbotWidget.tsx"), "utf8");
assert.match(widget, /cdn\.conferbot\.com\/dist\/v1\/widget\.min\.js/);
assert.match(widget, /IDLE_FALLBACK_MS/);
assert.match(widget, /requestIdleCallback/);
assert.match(widget, /widgetBooted/);
assert.match(widget, /kinexis-digital-site/);
assert.match(widget, /\/admin/);
assert.match(widget, /startLauncherPositioner/);
assert.match(widget, /kx-chat-lift/);
assert.match(widget, /data-cb-own-m-bottom/);
assert.match(widget, /shadowRoot/);
assert.match(widget, /\.float-cta/);
assert.doesNotMatch(widget, /analyticsAllowed/);
assert.doesNotMatch(widget, /parseConsentCookie/);
assert.doesNotMatch(widget, /kinexis:consent/);
assert.doesNotMatch(widget, /user:\s*\{/);

const csp = readFileSync(resolve("next.config.ts"), "utf8");
assert.match(csp, /cdn\.conferbot\.com/);
assert.match(csp, /wdt\.conferbot\.com/);
assert.match(csp, /wss:\/\/wdt\.conferbot\.com/);

console.log(
  "Conferbot widget contract checks passed: flag off by default, consent-independent idle/input load, shadow launcher lift, no double-init, CSP hosts, DocumentShell mount.",
);

