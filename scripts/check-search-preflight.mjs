import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const script = fileURLToPath(new URL("./search-on-deploy.mjs", import.meta.url));
const deployScript = readFileSync(new URL("./deploy-production.mjs", import.meta.url), "utf8");
const common = {
  ...process.env,
  NEXT_PUBLIC_SITE_URL: "https://www.kinexisdigital.com",
};

function run(args, overrides) {
  return spawnSync(
    process.execPath,
    [script, "--preflight", ...args],
    {
      cwd: process.cwd(),
      encoding: "utf8",
      env: { ...common, ...overrides },
    },
  );
}

const noIds = {
  NEXT_PUBLIC_GA_ID: "",
  NEXT_PUBLIC_META_PIXEL_ID: "",
};

const ciBuild = run([], noIds);
assert.equal(ciBuild.status, 0, ciBuild.stderr || ciBuild.stdout);
assert.match(ciBuild.stdout, /warn NEXT_PUBLIC_GA_ID is missing or invalid/);
assert.match(ciBuild.stdout, /warn NEXT_PUBLIC_META_PIXEL_ID is missing or invalid/);

const productionDeploy = run(["--require-analytics"], noIds);
assert.equal(productionDeploy.status, 1, productionDeploy.stderr || productionDeploy.stdout);
assert.match(productionDeploy.stdout, /fail NEXT_PUBLIC_GA_ID is missing or invalid/);
assert.match(productionDeploy.stdout, /fail NEXT_PUBLIC_META_PIXEL_ID is missing or invalid/);

const validIds = run(["--require-analytics"], {
  NEXT_PUBLIC_GA_ID: "G-TEST1234",
  NEXT_PUBLIC_META_PIXEL_ID: "1234567890123456",
});
assert.equal(validIds.status, 0, validIds.stderr || validIds.stdout);
assert.match(validIds.stdout, /NEXT_PUBLIC_GA_ID is set for build-time inlining/);
assert.match(validIds.stdout, /NEXT_PUBLIC_META_PIXEL_ID is set for build-time inlining/);

const strictGate = deployScript.indexOf(
  'args: ["scripts/search-on-deploy.mjs", "--preflight", "--require-analytics"]',
);
const testGate = deployScript.indexOf('{ cmd: "npm", args: ["run", "check"], kind: "gate" }');
assert.notEqual(strictGate, -1, "production deploy must wire the strict analytics preflight");
assert.ok(testGate > strictGate, "strict preflight must run before tests/build/deploy");

console.log(
  "Search preflight checks passed: CI may omit analytics IDs; production deploy fails closed without valid build-time IDs.",
);
