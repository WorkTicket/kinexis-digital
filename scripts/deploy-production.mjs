#!/usr/bin/env node
/**
 * Production Worker deploy. Never inherits preview SITE_URL / IS_PREVIEW from
 * a prior shell (deploy-preview sets those on process.env).
 * Usage: node scripts/deploy-production.mjs
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

if (leakedPreview) {
  console.warn(
    "[deploy-production] Cleared leaked preview SITE_URL / IS_PREVIEW from the shell before building.",
  );
}

console.log(`Production deploy: NEXT_PUBLIC_SITE_URL=${process.env.NEXT_PUBLIC_SITE_URL}`);

const steps = [
  ["npm", ["run", "check"]],
  ["npm", ["run", "build:worker"]],
  ["npm", ["run", "deploy:worker"]],
  ["npm", ["run", "search:notify"]],
];

for (const [cmd, args] of steps) {
  const result = spawnSync(cmd, args, { stdio: "inherit", env: process.env, shell: true });
  if (result.status !== 0) process.exit(result.status ?? 1);
}
