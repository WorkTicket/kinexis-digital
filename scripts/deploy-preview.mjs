#!/usr/bin/env node
/**
 * Preview-only Worker deploy. Never touches production routes / IndexNow.
 * Usage: node scripts/deploy-preview.mjs
 */
import { spawnSync } from "node:child_process";

process.env.NEXT_PUBLIC_SITE_URL = "https://preview.kinexisdigital.com";
process.env.NEXT_PUBLIC_IS_PREVIEW = "1";
process.env.SEARCH_NOTIFY = "0";

const steps = [
  ["node", ["scripts/search-on-deploy.mjs", "--preflight"]],
  ["npx", ["opennextjs-cloudflare", "build"]],
  ["node", ["scripts/defer-chunks.mjs", "--opennext-cache"]],
  ["npx", ["opennextjs-cloudflare", "deploy", "--env", "preview"]],
];

for (const [cmd, args] of steps) {
  const result = spawnSync(cmd, args, { stdio: "inherit", env: process.env, shell: true });
  if (result.status !== 0) process.exit(result.status ?? 1);
}
