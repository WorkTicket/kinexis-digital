#!/usr/bin/env node
/**
 * D1 invoice ledger backup helper.
 *
 *   node scripts/d1-backup-invoice-ledger.mjs --dry-run
 *   D1_BACKUP_CONFIRM=YES node scripts/d1-backup-invoice-ledger.mjs --remote
 *   D1_BACKUP_CONFIRM=YES node scripts/d1-backup-invoice-ledger.mjs --remote --preview
 *   node scripts/d1-backup-invoice-ledger.mjs --verify path/to/dump.sql
 *
 * Never deploys. Never runs migrations. Remote export requires D1_BACKUP_CONFIRM=YES.
 */
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdirSync, readFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const remote = args.includes("--remote");
const preview = args.includes("--preview");
const verifyIdx = args.indexOf("--verify");
const verifyPath = verifyIdx >= 0 ? args[verifyIdx + 1] : null;

const PROD_NAME = "kinexis-invoice-ledger";
const PREVIEW_NAME = "kinexis-invoice-ledger-preview";

function stamp() {
  return new Date().toISOString().replace(/[:.]/g, "-");
}

function exportCommand(dbName, outPath) {
  return ["npx", "wrangler", "d1", "export", dbName, "--remote", "--output", outPath];
}

if (verifyPath) {
  const abs = resolve(process.cwd(), verifyPath);
  assert.ok(existsSync(abs), `missing dump: ${abs}`);
  const text = readFileSync(abs, "utf8");
  assert.match(text, /invoices/i, "dump must mention invoices");
  assert.match(text, /payment_events/i, "dump must mention payment_events");
  console.log(`Verified dump structure: ${abs} (${text.length} bytes)`);
  process.exit(0);
}

const dbName = preview ? PREVIEW_NAME : PROD_NAME;
const outDir = resolve(root, "artifacts/d1-backups");
const outPath = resolve(outDir, `${dbName}-${stamp()}.sql`);
const cmd = exportCommand(dbName, outPath);

if (!remote) {
  // Default / --dry-run: no network (CI-safe).
  console.log("[d1-backup] dry-run (no network)");
  console.log(`Would run: ${cmd.join(" ")}`);
  console.log("Remote requires: D1_BACKUP_CONFIRM=YES and --remote");
  process.exit(0);
}

if (process.env.D1_BACKUP_CONFIRM !== "YES") {
  console.error("Refusing --remote without D1_BACKUP_CONFIRM=YES");
  process.exit(2);
}

mkdirSync(outDir, { recursive: true });
console.log(`[d1-backup] exporting ${dbName} → ${outPath}`);
const result = spawnSync(cmd[0], cmd.slice(1), { stdio: "inherit", env: process.env, shell: true });
if (result.status !== 0) process.exit(result.status ?? 1);

const text = readFileSync(outPath, "utf8");
assert.match(text, /invoices/i);
assert.match(text, /payment_events/i);
console.log(`[d1-backup] ok (${text.length} bytes). Store off-repo; do not commit.`);
