import { spawnSync } from "node:child_process";

const paypalValues = [
  "NEXT_PUBLIC_PAYPAL_CLIENT_ID",
  "NEXT_PUBLIC_PAYPAL_WEBSITE_PLAN_ID",
  "NEXT_PUBLIC_PAYPAL_LEAD_SYSTEM_PLAN_ID",
  "NEXT_PUBLIC_PAYPAL_PLUS_PLAN_ID",
];
const missingPaypalValues = paypalValues.filter((name) => !process.env[name]?.trim());
if (missingPaypalValues.length) {
  console.error(
    `[build-worker-production] Missing required live PayPal build values: ${missingPaypalValues.join(", ")}`,
  );
  process.exit(1);
}

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
run(["scripts/check-paypal-build.mjs", "--production"]);
