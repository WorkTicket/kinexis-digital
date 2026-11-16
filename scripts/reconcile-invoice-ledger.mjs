#!/usr/bin/env node
/**
 * Owner-run invoice ledger reconciliation.
 *
 * Default: dry fixture mode (no network, no secrets) — same as check script.
 * Remote read-only: RECONCILE_CONFIRM=YES node scripts/reconcile-invoice-ledger.mjs --remote
 *   runs SELECT-only wrangler d1 execute against production INVOICE_DB.
 *
 * Never mutates D1. Never deploys. Never prints company/description fields.
 *
 * Optional alert mail (owner machine only):
 *   RECONCILE_ALERT_TO=you@example.com plus existing SMTP_* / CONTACT_* env
 *   sends only when severity=alert findings exist. Preview isolation still applies
 *   if NEXT_PUBLIC_IS_PREVIEW=1.
 */
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { build } from "esbuild";
import nodemailer from "nodemailer";
import { openInvoiceLedger } from "./invoice-sql-adapter.mjs";

const remote = process.argv.includes("--remote");
const wantMail = process.env.RECONCILE_ALERT_MAIL === "1";

const bundle = await build({
  entryPoints: ["src/lib/payment-reconciliation.ts"],
  bundle: true,
  format: "esm",
  platform: "node",
  write: false,
});
const source = bundle.outputFiles[0]?.contents;
assert.ok(source);
const recon = await import(
  `data:text/javascript;base64,${Buffer.from(source).toString("base64")}`
);

function runWranglerJson(sql) {
  const result = spawnSync(
    "npx",
    [
      "wrangler",
      "d1",
      "execute",
      "kinexis-invoice-ledger",
      "--remote",
      "--json",
      "--command",
      sql,
    ],
    { encoding: "utf8", env: process.env },
  );
  if (result.status !== 0) {
    console.error(result.stderr || result.stdout);
    process.exit(result.status ?? 1);
  }
  const parsed = JSON.parse(result.stdout);
  // wrangler --json shape: array of { results: rows[] } or { result: [...] }
  const blocks = Array.isArray(parsed) ? parsed : parsed.result ?? [parsed];
  const rows = [];
  for (const block of blocks) {
    const chunk = block.results ?? block.rows ?? [];
    if (Array.isArray(chunk)) rows.push(...chunk);
  }
  return rows;
}

async function loadRemote() {
  if (process.env.RECONCILE_CONFIRM !== "YES") {
    console.error(
      "Refusing --remote without RECONCILE_CONFIRM=YES (read-only SELECTs still need explicit owner approval).",
    );
    process.exit(2);
  }
  const invoices = runWranglerJson(
    "SELECT id, status, amount_minor, currency, expires_at, paypal_order_id, paypal_capture_id, paid_at FROM invoices",
  );
  const events = runWranglerJson(
    "SELECT event_id, event_type, invoice_id, paypal_order_id, paypal_capture_id, amount_minor, currency, outcome, received_at FROM payment_events",
  );
  return { invoices, events };
}

async function loadLocalDemo() {
  const db = openInvoiceLedger();
  const now = new Date().toISOString();
  // Empty ledger demo — proves the path; CI uses check-payment-reconciliation.mjs
  const invoices = (
    await db.batch([
      {
        sql: "SELECT id, status, amount_minor, currency, expires_at, paypal_order_id, paypal_capture_id, paid_at FROM invoices",
        params: [],
      },
    ])
  )[0].rows;
  const events = (
    await db.batch([
      {
        sql: "SELECT event_id, event_type, invoice_id, paypal_order_id, paypal_capture_id, amount_minor, currency, outcome, received_at FROM payment_events",
        params: [],
      },
    ])
  )[0].rows;
  return { invoices, events, now };
}

async function maybeAlert(report, text) {
  if (!wantMail || !recon.reconHasAlerts(report)) return;
  const to = (process.env.RECONCILE_ALERT_TO || process.env.CONTACT_TO || "")
    .split(/[;,]/)
    .map((s) => s.trim())
    .filter(Boolean);
  if (to.length === 0) {
    console.warn("[reconcile] alerts present but RECONCILE_ALERT_TO/CONTACT_TO empty — skipped mail");
    return;
  }
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) {
    console.warn("[reconcile] alerts present but SMTP_* incomplete — skipped mail (log only)");
    return;
  }
  const transport = nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "1",
    auth: { user, pass },
  });
  await transport.sendMail({
    from: process.env.SMTP_FROM || user,
    to: to.join(", "),
    subject: `[Kinexis] Payment ledger alerts (${report.findings.filter((f) => f.severity === "alert").length})`,
    text,
  });
  console.log("[reconcile] alert mail sent");
}

const loaded = remote ? await loadRemote() : await loadLocalDemo();
const now = loaded.now || new Date().toISOString();
const report = recon.reconcilePaymentLedger(loaded.invoices, loaded.events, now);
const text = recon.formatReconReport(report);
console.log(text);
await maybeAlert(report, text);

if (recon.reconHasAlerts(report)) {
  process.exit(1);
}
console.log(remote ? "[reconcile] remote ledger clean" : "[reconcile] local empty ledger clean");
