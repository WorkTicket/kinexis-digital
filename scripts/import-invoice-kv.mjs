/**
 * Copy invoice:v1:* records from KV into the D1 ledger.
 *
 * Default is a dry run: counts, a redacted sample, and validation errors. No writes.
 * KV is only read. Pass --apply to insert. A second apply does not overwrite existing rows.
 *
 * Local fixture:
 *   node scripts/import-invoice-kv.mjs --fixture invoices.json --sqlite ledger.sqlite --apply
 * Production (owner's machine only; this agent must not pass --remote):
 *   node scripts/import-invoice-kv.mjs --remote
 *   PHASE1_IMPORT_CONFIRM=YES node scripts/import-invoice-kv.mjs --remote --apply
 */
import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { openInvoiceLedger } from "./invoice-sql-adapter.mjs";
import { bundleServer } from "./bundle-server.mjs";

const args = new Set(process.argv.slice(2));
const fixtureFlag = process.argv.indexOf("--fixture");
const remote = args.has("--remote");
const apply = args.has("--apply");
const verifyOnly = args.has("--verify");
const skipInvalid = args.has("--skip-invalid");
const fixturePath = fixtureFlag >= 0 ? process.argv[fixtureFlag + 1] : "";

if (remote && fixturePath) {
  console.error("Refusing to mix --remote with --fixture.");
  process.exit(2);
}
if (!remote && !fixturePath) {
  console.error("Dry-run needs --fixture <file> locally, or --remote on the owner machine.");
  process.exit(2);
}
if (process.argv.some((arg) => /\bdeploy\b/i.test(arg))) {
  console.error("This tool never deploys.");
  process.exit(2);
}

const importer = await bundleServer("src/lib/invoice-import.ts", ".tmp-invoice-import.mjs");

function wrangler(wranglerArgs) {
  const joined = wranglerArgs.join(" ");
  if (/\bdeploy\b/i.test(joined)) throw new Error("refusing deploy");
  const result = spawnSync("npx", ["wrangler", ...wranglerArgs], {
    cwd: process.cwd(),
    encoding: "utf8",
    shell: process.platform === "win32",
  });
  if (result.status !== 0) {
    throw new Error(`wrangler exited ${result.status ?? 1}`);
  }
  return result.stdout;
}

async function readFixture(path) {
  const entries = JSON.parse(readFileSync(path, "utf8"));
  if (!Array.isArray(entries)) throw new Error("fixture must be an array");
  return entries.map((entry) => ({ key: String(entry.key), value: String(entry.value) }));
}

async function readRemote() {
  const listed = JSON.parse(wrangler([
    "kv", "key", "list",
    "--binding", "REVIEWS",
    "--remote",
    "--prefix", importer.INVOICE_KV_PREFIX,
  ]));
  const keys = listed.map((item) => (typeof item === "string" ? item : item.name)).filter(Boolean);
  const entries = [];
  for (const key of keys) {
    const value = wrangler([
      "kv", "key", "get", key,
      "--binding", "REVIEWS",
      "--remote",
    ]);
    entries.push({ key, value });
  }
  return entries;
}

function report(mapped, failures) {
  const counts = {
    read: mapped.length + failures.length,
    valid: mapped.length,
    invalid: failures.length,
    unpaid: mapped.filter((row) => row.status === "unpaid").length,
    paid: mapped.filter((row) => row.status === "paid").length,
    void: mapped.filter((row) => row.status === "void").length,
  };
  console.log(JSON.stringify({
    mode: apply ? "apply" : "dry-run",
    counts,
    sample: mapped.slice(0, 5).map((row) => importer.publicSample(row)),
    errors: failures.map((failure) => ({ keyPrefix: failure.key.slice(0, 20), reason: failure.reason })),
  }, null, 2));
}

function rowsFromEntries(entries) {
  const mapped = [];
  const failures = [];
  for (const entry of entries) {
    const result = importer.mapInvoiceKvEntry(entry.key, entry.value);
    if (result.ok) mapped.push(result.row);
    else failures.push(result);
  }
  return { mapped, failures };
}

async function readActualFromSqlite(db) {
  const [result] = await db.batch([{
    sql: `SELECT id, amount_minor, currency, status, paypal_order_id, paypal_capture_id FROM invoices`,
    params: [],
  }]);
  return (result?.rows ?? []).map((row) => ({
    id: String(row.id),
    amountMinor: Number(row.amount_minor),
    currency: String(row.currency),
    status: String(row.status),
    paypalOrderId: row.paypal_order_id == null ? null : String(row.paypal_order_id),
    paypalCaptureId: row.paypal_capture_id == null ? null : String(row.paypal_capture_id),
  }));
}

async function verify(mapped, actual) {
  const result = importer.verifyMappedInvoices(mapped, actual);
  const validIds = new Set(mapped.map((row) => row.id));
  const present = actual.filter((row) => validIds.has(row.id)).length;
  console.log(JSON.stringify({
    verify: {
      validKvRows: mapped.length,
      matchingLedgerRows: result.matched,
      ledgerRowsForThoseIds: present,
      countsMatch: result.matched === mapped.length && result.mismatches.length === 0,
      spotCheck: mapped.slice(0, 5).map((row) => importer.publicSample(row)),
      mismatches: result.mismatches,
    },
  }, null, 2));
  return result.matched === mapped.length && result.mismatches.length === 0;
}

const entries = remote ? await readRemote() : await readFixture(fixturePath);
const { mapped, failures } = rowsFromEntries(entries);
report(mapped, failures);

if (apply && !remote) {
  console.error("Refusing local --apply. Production writes require --remote on the owner machine. The local rehearsal is npm run check:invoice-security.");
  process.exit(2);
}

if (apply && failures.length > 0 && !skipInvalid) {
  console.error("Refusing to write while validation errors remain. Re-run the dry run, or pass --skip-invalid to import only the valid rows. KV was not modified.");
  process.exit(1);
}

if (!apply && !verifyOnly) {
  console.log("Dry run only. No D1 writes. KV was not modified.");
  process.exit(failures.length > 0 ? 1 : 0);
}

if (remote && apply && process.env.PHASE1_IMPORT_CONFIRM !== "YES") {
  console.error("Refusing remote writes without PHASE1_IMPORT_CONFIRM=YES.");
  process.exit(2);
}

if (remote) {
  const dir = mkdtempSync(join(tmpdir(), "invoice-import-"));
  const file = join(dir, "import.sql");
  try {
    if (apply) {
      writeFileSync(file, mapped.map((row) => importer.insertIgnoreSql(row)).join("\n"), "utf8");
      wrangler([
        "d1", "execute", "kinexis-invoice-ledger",
        "--remote",
        "--file", file,
        "--yes",
      ]);
    }
    const selected = wrangler([
      "d1", "execute", "kinexis-invoice-ledger",
      "--remote",
      "--json",
      "--command", "SELECT id, amount_minor, currency, status, paypal_order_id, paypal_capture_id FROM invoices",
    ]);
    const jsonStart = selected.indexOf("[");
    const jsonEnd = selected.lastIndexOf("]");
    if (jsonStart < 0 || jsonEnd < jsonStart) throw new Error("D1 verify did not return JSON");
    const parsed = JSON.parse(selected.slice(jsonStart, jsonEnd + 1));
    const rows = Array.isArray(parsed) ? parsed[0]?.results ?? [] : parsed.results ?? [];
    const actual = rows.map((row) => ({
      id: String(row.id),
      amountMinor: Number(row.amount_minor),
      currency: String(row.currency),
      status: String(row.status),
      paypalOrderId: row.paypal_order_id == null ? null : String(row.paypal_order_id),
      paypalCaptureId: row.paypal_capture_id == null ? null : String(row.paypal_capture_id),
    }));
    const ok = await verify(mapped, actual);
    process.exit(ok && failures.length === 0 ? 0 : 1);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

const db = openInvoiceLedger();
if (apply && !verifyOnly) {
  const written = await importer.applyMappedInvoices(db, mapped);
  console.log(JSON.stringify({ write: written }, null, 2));
}
const actual = await readActualFromSqlite(db);
const ok = await verify(mapped, actual);
process.exit(ok && failures.length === 0 ? 0 : 1);
