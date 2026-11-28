#!/usr/bin/env node
/**
 * Friday scorecard export (Prompt 4 item 10).
 * Reads a JSON fixture of CRM + optional GSC inputs; never invents outreach counts.
 * Usage: node scripts/weekly-scorecard.mjs [path/to/week-input.json]
 */
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const inputPath = process.argv[2]
  ? path.resolve(process.argv[2])
  : path.join(root, "docs", "scorecard-fixtures", "week-demo.json");

function blank(label) {
  return { value: null, label, status: "not measured" };
}

function numOrBlank(value, label) {
  if (value === null || value === undefined || value === "") return blank(label);
  if (typeof value === "number" && Number.isFinite(value)) return { value, label, status: "measured" };
  return blank(label);
}

const raw = JSON.parse(await readFile(inputPath, "utf8"));
const week = raw.week_ending || "YYYY-MM-DD";
const crm = raw.crm || {};
const gsc = raw.gsc || {};
const defects = Array.isArray(raw.open_tracking_defects) ? raw.open_tracking_defects : [];
const clients = Array.isArray(raw.client_delivery) ? raw.client_delivery : [];

const rows = [
  numOrBlank(crm.contacts_sent, "contacts sent*"),
  numOrBlank(crm.replies, "replies*"),
  numOrBlank(crm.calls_booked, "calls booked"),
  numOrBlank(crm.held, "held"),
  numOrBlank(crm.qualified, "qualified"),
  numOrBlank(crm.pilots_or_projects_won, "pilots/projects won"),
  {
    value: Array.isArray(crm.no_sale_reasons) ? crm.no_sale_reasons.join("; ") : null,
    label: "no-sale reasons",
    status: Array.isArray(crm.no_sale_reasons) && crm.no_sale_reasons.length ? "measured" : "not measured",
  },
  numOrBlank(crm.contracted_mrr_usd, "contracted MRR (USD)"),
  numOrBlank(crm.cash_collected_usd, "cash collected (USD)"),
  numOrBlank(gsc.web_clicks, "web clicks (GSC)"),
  numOrBlank(gsc.us_nonbrand_impressions, "US nonbrand impressions (GSC)"),
  numOrBlank(crm.qualified_organic_leads, "qualified organic leads"),
];

const lines = [
  `# Weekly scorecard — week ending ${week}`,
  "",
  "| Metric | Value | Status |",
  "| --- | --- | --- |",
  ...rows.map((r) => `| ${r.label} | ${r.value === null || r.value === undefined ? "—" : r.value} | ${r.status} |`),
  "",
  "## Open tracking defects",
  defects.length ? defects.map((d) => `- ${d}`).join("\n") : "- not measured",
  "",
  "## Delivery hours and margin per client",
];

if (!clients.length) {
  lines.push("- not measured");
} else {
  for (const c of clients) {
    const hours = c.fulfilment_hours ?? "not measured";
    const margin = c.margin_usd ?? "not measured";
    lines.push(`- ${c.name || "client"}: hours=${hours}; margin_usd=${margin}`);
  }
}

lines.push(
  "",
  "_\\* outreach counts come from the CRM touch log; blank = not logged — never estimated._",
  "",
);

const outDir = path.join(root, "docs", "scorecard-out");
await mkdir(outDir, { recursive: true });
const outMd = path.join(outDir, `scorecard-${week}.md`);
const outCsv = path.join(outDir, `scorecard-${week}.csv`);
await writeFile(outMd, lines.join("\n"), "utf8");
await writeFile(
  outCsv,
  ["metric,value,status", ...rows.map((r) => `${JSON.stringify(r.label)},${JSON.stringify(r.value ?? "")},${r.status}`)].join("\n") + "\n",
  "utf8",
);
console.log(`Wrote ${path.relative(root, outMd)} and ${path.relative(root, outCsv)}`);
