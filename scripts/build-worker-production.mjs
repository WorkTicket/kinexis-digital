import { spawnSync } from "node:child_process";

function run(args) {
  const result = spawnSync(process.execPath, args, {
    stdio: "inherit",
    env: process.env,
  });
  if (result.status !== 0) process.exit(result.status ?? 1);
}

run([
  "scripts/search-on-deploy.mjs",
  "--preflight",
  "--require-analytics",
]);

const npmCli = process.env.npm_execpath;
if (!npmCli) {
  console.error("Production Worker build must be launched through npm.");
  process.exit(1);
}
run([npmCli, "run", "build:worker"]);
