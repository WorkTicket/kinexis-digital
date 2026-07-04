#!/usr/bin/env node
/**
 * One-time IndexNow key setup (Phase 9).
 * Creates public/{KEY}.txt and indexnow.public.json (committed).
 * Appends INDEXNOW_KEY to .dev.vars if missing.
 *
 * Usage: node scripts/setup-indexnow.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { randomUUID } from "node:crypto";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const configPath = path.join(root, "indexnow.public.json");
const devVarsPath = path.join(root, ".dev.vars");
const CANONICAL_HOST = "www.kinexisdigital.com";

function loadExistingConfig() {
  if (!fs.existsSync(configPath)) return null;
  try {
    return JSON.parse(fs.readFileSync(configPath, "utf8"));
  } catch {
    return null;
  }
}

function appendDevVars(key) {
  const line = `INDEXNOW_KEY=${key}`;
  if (fs.existsSync(devVarsPath)) {
    const text = fs.readFileSync(devVarsPath, "utf8");
    if (/^INDEXNOW_KEY=/m.test(text)) {
      console.log(".dev.vars already has INDEXNOW_KEY — skipped.");
      return;
    }
    fs.writeFileSync(devVarsPath, text.trimEnd() + `\n${line}\n`, "utf8");
  } else {
    fs.writeFileSync(devVarsPath, `${line}\n`, "utf8");
  }
  console.log("Appended INDEXNOW_KEY to .dev.vars");
}

function main() {
  const existing = loadExistingConfig();
  if (existing?.key && fs.existsSync(path.join(root, "public", `${existing.key}.txt`))) {
    console.log(`IndexNow already configured: ${existing.key}`);
    console.log(`Key URL: https://${CANONICAL_HOST}/${existing.key}.txt`);
    console.log("\nProduction secret (if not set):");
    console.log(`  npx wrangler secret put INDEXNOW_KEY`);
    console.log(`  (paste: ${existing.key})`);
    return;
  }

  const key = randomUUID();
  const keyFile = path.join(root, "public", `${key}.txt`);
  fs.writeFileSync(keyFile, `${key}\n`, "utf8");

  const config = {
    host: CANONICAL_HOST,
    key,
    keyLocation: `https://${CANONICAL_HOST}/${key}.txt`,
    created: new Date().toISOString(),
  };
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2) + "\n", "utf8");
  appendDevVars(key);

  console.log("IndexNow key created.\n");
  console.log(`  Key file: public/${key}.txt`);
  console.log(`  Config:   indexnow.public.json`);
  console.log(`  Verify:   https://${CANONICAL_HOST}/${key}.txt (after deploy)\n`);
  console.log("Production Worker secret:");
  console.log("  npx wrangler secret put INDEXNOW_KEY");
  console.log(`  (paste: ${key})\n`);
  console.log("Or bulk upload from .dev.vars:");
  console.log("  npx wrangler secret bulk .dev.vars");
}

main();
