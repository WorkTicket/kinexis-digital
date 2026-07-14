#!/usr/bin/env node
/**
 * Backlink Outreach Manager — tracks prospects, templates, and outreach status.
 *
 * Usage:
 *   node scripts/backlink-outreach.mjs                   # show dashboard
 *   node scripts/backlink-outreach.mjs --add <url>       # add new prospect
 *   node scripts/backlink-outreach.mjs --status <id>     # update status
 *   node scripts/backlink-outreach.mjs --report          # generate outreach report
 *
 * Data: docs/seo-remediation/backlink-outreach.json
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const DATA_PATH = path.join(root, "docs", "seo-remediation", "backlink-outreach.json");

const TEMPLATES = {
  cold_email: `Subject: Quick question about [SITE_NAME]

Hi [NAME],

I was reading your piece on [TOPIC] at [SITE_URL] and noticed it really aligns with a guide we recently published: [OUR_CONTENT_TITLE] ([OUR_CONTENT_URL]).

Since you're already covering [RELATED_TOPIC], I thought your readers might find [OUR_CONTENT_TITLE] useful as an additional resource. It covers [BRIEF_VALUE_PROP].

No pressure at all — just thought I'd send it your way in case it's a fit.

Best,
[YOUR_NAME]
KINEXIS Digital`,

  broken_link: `Subject: Broken link on [SITE_NAME]

Hi [NAME],

I was browsing [SITE_URL] and noticed the link to [BROKEN_URL] appears to be broken (returning a 404).

I'm reaching out because I have a resource that would be a perfect replacement: [OUR_CONTENT_TITLE] ([OUR_CONTENT_URL]). It covers [TOPIC_DESCRIPTION].

Hope this helps you keep your content fresh!

Best,
[YOUR_NAME]
KINEXIS Digital`,

  resource_page: `Subject: Resource suggestion for [SITE_NAME]

Hi [NAME],

I came across your resources page at [SITE_URL] and love what you've put together for [TOPIC].

I noticed you don't currently have a resource covering [GAP_TOPIC], so I wanted to suggest our guide: [OUR_CONTENT_TITLE] ([OUR_CONTENT_URL]). It covers [BRIEF_VALUE_PROP].

If it fits, I'd be honored to have it included.

Best,
[YOUR_NAME]
KINEXIS Digital`,

  guest_post: `Subject: Guest post proposal for [SITE_NAME]

Hi [NAME],

I'm a [ROLE] at KINEXIS Digital and a regular reader of [SITE_NAME]. I love your coverage of [TOPIC].

I'd like to propose a guest post: "[POST_TITLE]". It would cover:

[3 BULLET POINTS OF VALUE]

No heavy self-promotion — just genuine value for your audience. Happy to adjust to your guidelines.

Let me know if this sounds interesting.

Best,
[YOUR_NAME]
KINEXIS Digital`,
};

const STATUS_ORDER = ["prospect", "contacted", "followed_up", "positive", "live", "rejected"];

function loadData() {
  try {
    return JSON.parse(fs.readFileSync(DATA_PATH, "utf8"));
  } catch {
    return { prospects: [], templates: TEMPLATES, lastUpdated: null };
  }
}

function saveData(data) {
  data.lastUpdated = new Date().toISOString();
  fs.mkdirSync(path.dirname(DATA_PATH), { recursive: true });
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2) + "\n", "utf8");
}

function showDashboard(data) {
  console.log("\n=== Backlink Outreach Dashboard ===");
  console.log(`Total prospects: ${data.prospects.length}`);
  console.log(`Last updated: ${data.lastUpdated || "never"}\n`);

  const counts = {};
  for (const p of data.prospects) {
    counts[p.status] = (counts[p.status] || 0) + 1;
  }
  for (const s of STATUS_ORDER) {
    if (counts[s]) console.log(`  ${s}: ${counts[s]}`);
  }

  const live = data.prospects.filter((p) => p.status === "live");
  if (live.length > 0) {
    console.log(`\nLive backlinks (${live.length}):`);
    for (const p of live) {
      console.log(`  ✅ ${p.targetUrl} → ${p.ourContent}`);
    }
  }

  const pending = data.prospects.filter((p) => p.status === "prospect");
  if (pending.length > 0) {
    console.log(`\nPending outreach (${pending.length}):`);
    for (const p of pending.slice(0, 10)) {
      console.log(`  ⏳ ${p.targetUrl}`);
    }
    if (pending.length > 10) console.log(`  ... and ${pending.length - 10} more`);
  }

  console.log("\nTemplates available:");
  for (const [key, val] of Object.entries(TEMPLATES)) {
    const firstLine = val.split("\n")[0];
    console.log(`  ${key}: ${firstLine}`);
  }
}

function addProspect(data, url) {
  const existing = data.prospects.find((p) => p.targetUrl === url);
  if (existing) {
    console.log(`Prospect already exists (status: ${existing.status})`);
    return;
  }

  data.prospects.push({
    id: `BL-${String(data.prospects.length + 1).padStart(3, "0")}`,
    targetUrl: url,
    domain: new URL(url).hostname,
    status: "prospect",
    ourContent: "",
    notes: "",
    outreachDate: null,
    followUpDate: null,
    responseDate: null,
    liveUrl: "",
    createdAt: new Date().toISOString(),
  });

  saveData(data);
  console.log(`Added prospect: ${url}`);
}

function updateStatus(data, idOrUrl, newStatus) {
  const prospect = data.prospects.find(
    (p) => p.id === idOrUrl || p.targetUrl === idOrUrl,
  );
  if (!prospect) {
    console.log(`Prospect not found: ${idOrUrl}`);
    return;
  }

  if (!STATUS_ORDER.includes(newStatus)) {
    console.log(`Invalid status: ${newStatus}. Use: ${STATUS_ORDER.join(", ")}`);
    return;
  }

  const currentIdx = STATUS_ORDER.indexOf(prospect.status);
  const newIdx = STATUS_ORDER.indexOf(newStatus);
  if (newIdx < currentIdx && newStatus !== "rejected") {
    console.log(`Warning: moving backward from ${prospect.status} to ${newStatus}?`);
  }

  prospect.status = newStatus;
  if (newStatus === "contacted" && !prospect.outreachDate) {
    prospect.outreachDate = new Date().toISOString();
  }
  if (newStatus === "live") {
    prospect.liveUrl = prospect.liveUrl || prospect.targetUrl;
    prospect.responseDate = new Date().toISOString();
  }

  saveData(data);
  console.log(`${prospect.id}: ${prospect.status} → ${newStatus}`);
}

function generateReport(data) {
  const live = data.prospects.filter((p) => p.status === "live");
  const total = data.prospects.length;
  const rate = total > 0 ? ((live.length / total) * 100).toFixed(1) : "0.0";

  console.log("\n=== Backlink Outreach Report ===");
  console.log(`Generated: ${new Date().toISOString()}`);
  console.log(`\nSummary:`);
  console.log(`  Total prospects: ${total}`);
  console.log(`  Live backlinks: ${live.length}`);
  console.log(`  Success rate: ${rate}%`);

  if (live.length > 0) {
    console.log(`\nLive backlinks:`);
    for (const p of live) {
      console.log(`  [${p.id}] ${p.targetUrl}`);
      console.log(`         Content: ${p.ourContent}`);
      console.log(`         Live at: ${p.liveUrl}`);
      console.log(`         Date: ${p.responseDate}`);
      console.log(`         DR: ${p.domainDr || "?"}`);
    }
  }

  console.log("\nBy status:");
  for (const s of STATUS_ORDER) {
    const count = data.projects?.filter((p) => p.status === s).length
      ?? data.prospects.filter((p) => p.status === s).length;
    if (count) console.log(`  ${s}: ${count}`);
  }
}

function main() {
  const args = process.argv.slice(2);
  const data = loadData();

  if (args.includes("--add")) {
    const idx = args.indexOf("--add");
    if (args[idx + 1]) addProspect(data, args[idx + 1]);
    else console.error("Usage: --add <url>");
  } else if (args.includes("--status")) {
    const idx = args.indexOf("--status");
    if (args[idx + 1] && args[idx + 2]) updateStatus(data, args[idx + 1], args[idx + 2]);
    else console.error("Usage: --status <id|url> <status>");
  } else if (args.includes("--report")) {
    generateReport(data);
  } else {
    showDashboard(data);
  }
}

main();
