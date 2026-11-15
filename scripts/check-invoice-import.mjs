/** Local KV-to-D1 import rehearsal. Uses Miniflare KV and the same SQLite migration as D1. */
import assert from "node:assert/strict";
import { mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { Miniflare, convertV4MiniflareOptions } from "miniflare";
import { openInvoiceLedger } from "./invoice-sql-adapter.mjs";
import { bundleServer } from "./bundle-server.mjs";

const importer = await bundleServer("src/lib/invoice-import.ts", ".tmp-invoice-import.mjs");
const prefix = importer.INVOICE_KV_PREFIX;
const goodId = "11111111-2222-3333-4444-555555555555";
const paidId = "22222222-2222-3333-4444-555555555555";
const badId = "33333333-3333-3333-4444-555555555555";
const orderId = "5O190127TN364715T";
const captureId = "8MC585209K746392H";

const good = {
  id: goodId,
  amount: "25.00",
  currency: "USD",
  description: "O'Brien deposit",
  status: "unpaid",
  expiresAt: "2099-01-01T00:00:00.000Z",
  createdAt: "2026-01-01T00:00:00.000Z",
  company: "O'Brien Plumbing",
};
const paid = {
  id: paidId,
  amount: "10.00",
  currency: "USD",
  description: "Paid deposit",
  status: "paid",
  expiresAt: "2099-01-01T00:00:00.000Z",
  createdAt: "2026-01-02T00:00:00.000Z",
  paypalOrderId: orderId,
  paypalCaptureId: captureId,
  paidAt: "2026-01-03T00:00:00.000Z",
};
const bad = { ...good, id: badId, amount: "25" };

const mf = new Miniflare(convertV4MiniflareOptions({
  script: "addEventListener('fetch', (event) => event.respondWith(new Response('ok')))",
  kvNamespaces: ["REVIEWS"],
}));
const kv = await mf.getKVNamespace("REVIEWS");
const before = new Map([
  [`${prefix}${goodId}`, JSON.stringify(good)],
  [`${prefix}${paidId}`, JSON.stringify(paid)],
  [`${prefix}${badId}`, JSON.stringify(bad)],
  ["review:not-an-invoice", "leave-me"],
]);
for (const [key, value] of before) await kv.put(key, value);

const listed = await kv.list({ prefix });
const entries = [];
for (const key of listed.keys) {
  entries.push({ key: key.name, value: await kv.get(key.name) });
}
const mapped = [];
const failures = [];
for (const entry of entries) {
  const result = importer.mapInvoiceKvEntry(entry.key, entry.value);
  if (result.ok) mapped.push(result.row);
  else failures.push(result);
}
assert.equal(mapped.length, 2);
assert.equal(failures.length, 1);
assert.equal(failures[0].reason, "amount");
assert.equal(importer.insertIgnoreSql(mapped[0]).includes("O''Brien"), true);

const db = openInvoiceLedger();
const [empty] = await db.batch([{ sql: "SELECT COUNT(*) AS n FROM invoices", params: [] }]);
assert.equal(Number(empty.rows[0].n), 0);

const first = await importer.applyMappedInvoices(db, mapped);
assert.deepEqual(first, { inserted: 2, alreadyPresent: 0 });
const second = await importer.applyMappedInvoices(db, mapped);
assert.deepEqual(second, { inserted: 0, alreadyPresent: 2 });
const [count] = await db.batch([{ sql: "SELECT COUNT(*) AS n FROM invoices", params: [] }]);
assert.equal(Number(count.rows[0].n), 2);

const [stored] = await db.batch([{
  sql: "SELECT id, amount_minor, currency, status, paypal_order_id, paypal_capture_id, description FROM invoices ORDER BY id",
  params: [],
}]);
const actual = stored.rows.map((row) => ({
  id: String(row.id),
  amountMinor: Number(row.amount_minor),
  currency: String(row.currency),
  status: String(row.status),
  paypalOrderId: row.paypal_order_id == null ? null : String(row.paypal_order_id),
  paypalCaptureId: row.paypal_capture_id == null ? null : String(row.paypal_capture_id),
}));
const verified = importer.verifyMappedInvoices(mapped, actual);
assert.equal(verified.matched, 2);
assert.deepEqual(verified.mismatches, []);
assert.equal(stored.rows.find((row) => row.id === goodId).description, "O'Brien deposit");

await db.batch([{ sql: "UPDATE invoices SET amount_minor = 2600 WHERE id = ?1", params: [goodId] }]);
const tampered = importer.verifyMappedInvoices(mapped, (await db.batch([{
  sql: "SELECT id, amount_minor, currency, status, paypal_order_id, paypal_capture_id FROM invoices",
  params: [],
}]))[0].rows.map((row) => ({
  id: String(row.id),
  amountMinor: Number(row.amount_minor),
  currency: String(row.currency),
  status: String(row.status),
  paypalOrderId: row.paypal_order_id == null ? null : String(row.paypal_order_id),
  paypalCaptureId: row.paypal_capture_id == null ? null : String(row.paypal_capture_id),
})));
assert.equal(tampered.matched, 1);
assert.equal(tampered.mismatches.some((item) => item.field === "amount"), true);

for (const [key, value] of before) {
  assert.equal(await kv.get(key), value);
}
await mf.dispose();

const dir = mkdtempSync(join(tmpdir(), "invoice-import-fixture-"));
const fixture = join(dir, "invoices.json");
writeFileSync(fixture, JSON.stringify([
  { key: `${prefix}${goodId}`, value: JSON.stringify(good) },
  { key: `${prefix}${paidId}`, value: JSON.stringify(paid) },
]));
const dry = spawnSync(process.execPath, ["scripts/import-invoice-kv.mjs", "--fixture", fixture], {
  cwd: process.cwd(),
  encoding: "utf8",
});
assert.equal(dry.status, 0, dry.stderr);
assert.match(dry.stdout, /"mode": "dry-run"/);
assert.match(dry.stdout, /"valid": 2/);
assert.doesNotMatch(dry.stdout, /O'Brien/);
rmSync(dir, { recursive: true, force: true });

console.log("Invoice KV import dry-run, idempotent apply, and verification checks passed.");
