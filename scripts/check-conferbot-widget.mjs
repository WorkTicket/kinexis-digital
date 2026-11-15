/**
 * Widget flag and mount contract checks (no browser). Ensures the public
 * widget stays off by default and the DocumentShell mount stays present.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const enabled = process.env.NEXT_PUBLIC_CONFERBOT_ENABLED;
assert.notEqual(enabled, "1", "CI/local default must not force the public widget on");

const shell = readFileSync(resolve("src/components/DocumentShell.tsx"), "utf8");
assert.match(shell, /ConferbotWidget/);
assert.match(shell, /NEXT_PUBLIC_CONFERBOT_ENABLED/);

const widget = readFileSync(resolve("src/components/ConferbotWidget.tsx"), "utf8");
assert.match(widget, /cdn\.conferbot\.com\/dist\/v1\/widget\.min\.js/);
assert.match(widget, /analyticsAllowed/);
assert.match(widget, /IDLE_LOAD_MS/);
assert.match(widget, /kinexis-digital-site/);
assert.doesNotMatch(widget, /user:\s*\{/);

const csp = readFileSync(resolve("next.config.ts"), "utf8");
assert.match(csp, /cdn\.conferbot\.com/);
assert.match(csp, /wdt\.conferbot\.com/);
assert.match(csp, /wss:\/\/wdt\.conferbot\.com/);

console.log("Conferbot widget contract checks passed: flag off by default, consent+idle load, CSP hosts, DocumentShell mount.");
