#!/usr/bin/env node
/**
 * Preview-only Worker deploy. Never touches production routes / IndexNow.
 * Usage: npm run deploy:preview
 */
import { spawnSync } from "node:child_process";

process.env.NEXT_PUBLIC_SITE_URL = "https://preview.kinexisdigital.com";
process.env.NEXT_PUBLIC_IS_PREVIEW = "1";
process.env.SEARCH_NOTIFY = "0";

const npmCli = process.env.npm_execpath;
if (!npmCli) {
  console.error("Preview deploy must be launched through npm.");
  process.exit(1);
}

function run(args) {
  const result = spawnSync(process.execPath, args, {
    stdio: "inherit",
    env: process.env,
  });
  if (result.status !== 0) process.exit(result.status ?? 1);
}

run(["scripts/search-on-deploy.mjs", "--preflight"]);
run([npmCli, "run", "build:worker"]);
run([npmCli, "run", "deploy:worker", "--", "--env", "preview"]);
