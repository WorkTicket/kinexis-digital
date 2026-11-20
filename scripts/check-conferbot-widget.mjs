/**
 * Widget flag and mount contract checks (no browser). Ensures CI / `next dev`
 * keep the public widget off by default while Boot still ships conferbot.js.
 * Production ships via committed `.env.production` (and CI overrides that flag
 * to 0 so this assert and e2e stay meaningful).
 *
 * Load contract: require affirmative consent; idle/input after page load; no
 * double-init; no PII in customData.
 * Vanilla `public/assets/js/conferbot.js` owns the runtime (no React island).
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

const boot = readFileSync(resolve("src/components/Boot.tsx"), "utf8");
assert.match(boot, /NEXT_PUBLIC_CONFERBOT_ENABLED/);
assert.match(boot, /conferbot\.min\.js/);
assert.match(boot, /conferbotBotId/);

const shell = readFileSync(resolve("src/components/DocumentShell.tsx"), "utf8");
assert.match(shell, /<Boot/);
assert.doesNotMatch(shell, /ConferbotLazy/);

const widget = readFileSync(resolve("public/assets/js/conferbot.js"), "utf8");
assert.match(widget, /cdn\.conferbot\.com\/dist\/v1\/widget\.min\.js/);
assert.match(widget, /IDLE_FALLBACK_MS/);
assert.match(widget, /CONSENT_CHROME_WAIT_MS/);
assert.match(widget, /requestIdleCallback/);
assert.match(widget, /widgetBooted/);
assert.match(widget, /kinexis-digital-site/);
assert.match(widget, /\/admin/);
assert.match(widget, /startLauncherPositioner/);
assert.match(widget, /kx-chat-lift/);
assert.match(widget, /data-cb-own-m-bottom/);
assert.match(widget, /shadowRoot/);
assert.match(widget, /\.float-cta/);
assert.match(widget, /liftArmed/);
assert.match(widget, /#open-chatbot/);
assert.match(widget, /setInterval\(schedule,\s*1000\)/);
assert.match(widget, /consentDockOpen/);
assert.match(widget, /consentAllowsConferbot/);
assert.match(widget, /kinexis_consent/);
assert.match(widget, /a=1/);
assert.match(widget, /d=1/);
assert.match(widget, /consent-open/);
assert.match(widget, /consent-fab/);
assert.match(widget, /waitForConsentThenArm/);
assert.match(widget, /__kxStartLauncherPositioner/);
assert.doesNotMatch(widget, /analyticsAllowed/);
assert.doesNotMatch(widget, /user:\s*\{/);

const csp = readFileSync(resolve("next.config.ts"), "utf8");
assert.match(csp, /cdn\.conferbot\.com/);
assert.match(csp, /wdt\.conferbot\.com/);
assert.match(csp, /wss:\/\/wdt\.conferbot\.com/);

const css = readFileSync(resolve("src/app/globals.css"), "utf8");
assert.match(
  css,
  /html\.consent-open\s+conferbot-widget\s*\{[^}]*display\s*:\s*none\s*!important/s,
  "cookie banner open must hide the Conferbot host (launcher + CTA)",
);

console.log(
  "Conferbot widget contract checks passed: flag off by default, vanilla conferbot.js (requires affirmative analytics + ads consent before idle/input loading), shadow launcher lift, consent-open host hide, no double-init, CSP hosts, Boot mount.",
);
