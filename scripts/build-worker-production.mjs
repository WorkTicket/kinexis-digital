import { spawnSync } from "node:child_process";

function run(command, args) {
  const result = spawnSync(command, args, {
    stdio: "inherit",
    env: process.env,
    shell: true,
  });
  if (result.status !== 0) process.exit(result.status ?? 1);
}

run(process.execPath, [
  "scripts/search-on-deploy.mjs",
  "--preflight",
  "--require-analytics",
]);
run("npm", ["run", "build:worker"]);
