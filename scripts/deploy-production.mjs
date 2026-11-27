#!/usr/bin/env node
/**
 * Production Worker deploy. Never inherits preview SITE_URL / IS_PREVIEW from
 * a prior shell (deploy-preview sets those on process.env).
 *
 * Gate order:
 *   1. npm run check
 *   2. npm run test:e2e -- --workers=4 (local Playwright; fails closed)
 *   3. npm run build:worker
 *   4. assert Conferbot bot id in .open-next (fails closed)
 *   5. npm run deploy:worker
 *   6. npm run search:notify
 *   7. npm run verify:prod       (non-destructive live smoke / structured data / Lighthouse budget)
 *
 * Conferbot env isolation:
 *   - check + test:e2e force NEXT_PUBLIC_CONFERBOT_ENABLED=0 (same contract as CI).
 *   - build:worker runs with that var removed so committed .env.production (1)
 *     applies. Never leave a gate-time 0 on process.env for the Worker build.
 *
 * Usage: node scripts/deploy-production.mjs
 * Requires: wrangler logged in; Playwright browsers installed (`npx playwright install`).
 */
import { execFileSync, spawnSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const gitStatus = execFileSync("git", ["status", "--porcelain"], { encoding: "utf8" }).trim();
if (gitStatus) {
  console.error("[deploy-production] Working tree must be clean before deployment.");
  process.exit(1);
}
const approvedSha = process.env.APPROVED_SHA;
if (!approvedSha) {
  console.error("[deploy-production] APPROVED_SHA is required; refusing to deploy.");
  process.exit(1);
}
const fullHeadSha = execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim();
if (approvedSha !== fullHeadSha) {
  console.error("[deploy-production] HEAD does not match APPROVED_SHA; refusing to deploy.");
  process.exit(1);
}
const expectedConfirmation = `DEPLOY_PRODUCTION ${fullHeadSha}`;
if (process.env.DEPLOY_CONFIRM !== expectedConfirmation) {
  console.error(
    `[deploy-production] DEPLOY_CONFIRM must exactly match "${expectedConfirmation}"; refusing to deploy.`,
  );
  process.exit(1);
}

const PRODUCTION_SITE_URL = "https://www.kinexisdigital.com";
/** Public bot id from .env.production — must appear in the Worker build output. */
const CONFERBOT_BOT_ID = "6afa0edabbad567d637ee189";
const OPEN_NEXT_DIR = ".open-next";

const leakedPreview =
  process.env.NEXT_PUBLIC_IS_PREVIEW === "1" ||
  /preview\.kinexisdigital\.com|kinexis-digital-preview/i.test(
    process.env.NEXT_PUBLIC_SITE_URL ?? "",
  );

// Always force production public URL — a prior `deploy:preview` can leave
// NEXT_PUBLIC_SITE_URL in the parent shell and Next will not override it.
delete process.env.NEXT_PUBLIC_IS_PREVIEW;
process.env.NEXT_PUBLIC_SITE_URL = PRODUCTION_SITE_URL;
// Default: ping search after a production ship. Set SEARCH_NOTIFY=0 in the
// shell to skip IndexNow/search notify for this run (requested for cosmetic ships).
if (process.env.SEARCH_NOTIFY !== "0") {
  process.env.SEARCH_NOTIFY = "1";
}
// Never pin Conferbot off on the parent env — that used to leak into build:worker
// and override .env.production. Gate steps set 0 only on their child env.
delete process.env.NEXT_PUBLIC_CONFERBOT_ENABLED;

if (leakedPreview) {
  console.warn(
    "[deploy-production] Cleared leaked preview SITE_URL / IS_PREVIEW from the shell before building.",
  );
}

console.log(`Production deploy: NEXT_PUBLIC_SITE_URL=${process.env.NEXT_PUBLIC_SITE_URL}`);

/** @param {"gate" | "build" | "deploy" | "post"} kind */
function envFor(kind) {
  const env = { ...process.env };
  if (kind === "gate") {
    env.NEXT_PUBLIC_CONFERBOT_ENABLED = "0";
  } else if (kind === "build") {
    // Drop any shell leftover so Next loads NEXT_PUBLIC_CONFERBOT_ENABLED=1
    // from committed .env.production.
    delete env.NEXT_PUBLIC_CONFERBOT_ENABLED;
  }
  // Keep Cloudflare credentials out of dependency install, checks, browser tests,
  // build, and post-deploy probes. Only Wrangler's deploy child receives them.
  if (kind !== "deploy") {
    delete env.CLOUDFLARE_API_TOKEN;
    delete env.CLOUDFLARE_ACCOUNT_ID;
  }
  return env;
}

function walkFiles(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    let st;
    try {
      st = statSync(full);
    } catch {
      continue;
    }
    if (st.isDirectory()) walkFiles(full, out);
    else if (st.isFile()) out.push(full);
  }
  return out;
}

/**
 * Fail closed if the OpenNext Worker artifact does not embed the public
 * Conferbot bot id (catches ENABLED=0 / missing .env.production bake-ins).
 */
function assertConferbotBotIdInBuild() {
  if (!existsSync(OPEN_NEXT_DIR)) {
    console.error(
      `[deploy-production] Missing ${OPEN_NEXT_DIR}/ after build:worker — cannot verify Conferbot bot id.`,
    );
    process.exit(1);
  }

  const files = walkFiles(OPEN_NEXT_DIR);
  for (const file of files) {
    // Skip obvious non-text blobs; bot id is ASCII and lives in JS/JSON/HTML/cache.
    if (/\.(png|jpe?g|gif|webp|avif|ico|woff2?|ttf|eot|mp4|webm|gz|br|map)$/i.test(file)) {
      continue;
    }
    let text;
    try {
      text = readFileSync(file, "utf8");
    } catch {
      continue;
    }
    if (text.includes(CONFERBOT_BOT_ID)) {
      console.log(
        `[deploy-production] Conferbot bot id present in Worker output (${file}).`,
      );
      return;
    }
  }

  console.error(
    `[deploy-production] Conferbot bot id ${CONFERBOT_BOT_ID} not found under ${OPEN_NEXT_DIR}/. ` +
      "Refusing to deploy — production chat would ship without the widget bake-in. " +
      "Ensure build:worker runs without NEXT_PUBLIC_CONFERBOT_ENABLED=0 so .env.production applies.",
  );
  process.exit(1);
}

const steps = [
  // Build-time analytics IDs are optional for CI builds but required for a
  // production deploy. Validate them before running tests/build/deploy steps.
  {
    cmd: "node",
    args: ["--env-file=.env.production", "scripts/search-on-deploy.mjs", "--preflight", "--require-analytics"],
    kind: "gate",
  },
  { cmd: "npm", args: ["run", "check"], kind: "gate" },
  // Four workers completed the full desktop+mobile suite reliably on fresh
  // Windows dev servers; the default worker count intermittently corrupts a
  // Next dev route-data response under concurrent pre-render requests.
  { cmd: "npm", args: ["run", "test:e2e", "--", "--workers=4"], kind: "gate" },
  { cmd: "npm", args: ["run", "build:worker:production"], kind: "build" },
  { cmd: "npm", args: ["run", "deploy:worker"], kind: "deploy", includeGitVersion: true },
  { cmd: "npm", args: ["run", "search:notify"], kind: "post" },
  { cmd: "npm", args: ["run", "verify:prod"], kind: "post" },
];

for (const step of steps) {
  const { cmd, kind } = step;
  let args = step.args;
  if (step.includeGitVersion) {
    // Resolve the revision at the moment of deployment, after all gates/builds,
    // so the Worker version metadata identifies the exact source being shipped.
    const fullSha = execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim();
    const shortSha = execFileSync("git", ["rev-parse", "--short", "HEAD"], { encoding: "utf8" }).trim();
    if (!/^[0-9a-f]{40}$/.test(fullSha)) {
      console.error(`[deploy-production] Invalid full Git SHA: ${fullSha}`);
      process.exit(1);
    }
    args = [
      ...args,
      "--",
      "--message",
      `release-1@${fullSha}`,
      "--tag",
      shortSha,
    ];
  }
  console.log(`\n[deploy-production] → ${cmd} ${args.join(" ")}`);
  if (kind === "gate") {
    console.log("[deploy-production]   (NEXT_PUBLIC_CONFERBOT_ENABLED=0 for this gate)");
  } else if (kind === "build") {
    console.log(
      "[deploy-production]   (NEXT_PUBLIC_CONFERBOT_ENABLED unset → .env.production)",
    );
  } else if (kind === "deploy") {
    console.log("[deploy-production]   (Cloudflare credentials passed only to Wrangler deploy)");
  }
  const result = spawnSync(cmd, args, {
    stdio: "inherit",
    env: envFor(kind),
    shell: true,
  });
  if (result.status !== 0) {
    console.error(
      `[deploy-production] Failed: ${cmd} ${args.join(" ")} (exit ${result.status ?? 1})`,
    );
    process.exit(result.status ?? 1);
  }
  if (kind === "build") {
    assertConferbotBotIdInBuild();
  }
}

console.log(
  "\n[deploy-production] All gates passed (check, e2e, build+conferbot guard, deploy, search notify, verify:prod).",
);
