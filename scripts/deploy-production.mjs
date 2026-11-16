#!/usr/bin/env node
/**
 * Production Worker deploy. Never inherits preview SITE_URL / IS_PREVIEW from
 * a prior shell (deploy-preview sets those on process.env).
 *
 * Gate order:
 *   1. npm run check
 *   2. npm run test:e2e          (local Playwright; fails closed)
 *   3. npm run build:worker
 *   4. npm run deploy:worker
 *   5. npm run search:notify
 *   6. npm run verify:prod       (non-destructive live smoke / structured data / Lighthouse budget)
 *
 * Usage: node scripts/deploy-production.mjs
 * Requires: wrangler logged in; Playwright browsers installed (`npx playwright install`).
 */
import { spawnSync } from "node:child_process";

const PRODUCTION_SITE_URL = "https://www.kinexisdigital.com";

const leakedPreview =
  process.env.NEXT_PUBLIC_IS_PREVIEW === "1" ||
  /preview\.kinexisdigital\.com|kinexis-digital-preview/i.test(
    process.env.NEXT_PUBLIC_SITE_URL ?? "",
  );

// Always force production public URL — a prior `deploy:preview` can leave
// NEXT_PUBLIC_SITE_URL in the parent shell and Next will not override it.
delete process.env.NEXT_PUBLIC_IS_PREVIEW;
process.env.NEXT_PUBLIC_SITE_URL = PRODUCTION_SITE_URL;
// Always ping search after a production ship (override a leftover SEARCH_NOTIFY=0
// from preview deploys). Set SEARCH_NOTIFY=0 explicitly only by editing this file.
process.env.SEARCH_NOTIFY = "1";
// Keep Conferbot off during the pre-deploy e2e gate (same contract as CI).
// Production builds still pick up .env.production for the Worker artifact.
if (process.env.NEXT_PUBLIC_CONFERBOT_ENABLED === undefined) {
  process.env.NEXT_PUBLIC_CONFERBOT_ENABLED = "0";
}

if (leakedPreview) {
  console.warn(
    "[deploy-production] Cleared leaked preview SITE_URL / IS_PREVIEW from the shell before building.",
  );
}

console.log(`Production deploy: NEXT_PUBLIC_SITE_URL=${process.env.NEXT_PUBLIC_SITE_URL}`);

const steps = [
  ["npm", ["run", "check"]],
  ["npm", ["run", "test:e2e"]],
  ["npm", ["run", "build:worker"]],
  ["npm", ["run", "deploy:worker"]],
  ["npm", ["run", "search:notify"]],
  ["npm", ["run", "verify:prod"]],
];

for (const [cmd, args] of steps) {
  console.log(`\n[deploy-production] → ${cmd} ${args.join(" ")}`);
  const result = spawnSync(cmd, args, { stdio: "inherit", env: process.env, shell: true });
  if (result.status !== 0) {
    console.error(`[deploy-production] Failed: ${cmd} ${args.join(" ")} (exit ${result.status ?? 1})`);
    process.exit(result.status ?? 1);
  }
}

console.log("\n[deploy-production] All gates passed (check, e2e, build, deploy, search notify, verify:prod).");
