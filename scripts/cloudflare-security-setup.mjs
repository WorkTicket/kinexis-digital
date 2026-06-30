#!/usr/bin/env node
/**
 * Applies Cloudflare security fixes for kinexisdigital.com:
 * - Adds a DMARC TXT record when one is missing
 * - Enables Bot Fight Mode
 *
 * Usage:
 *   set CLOUDFLARE_API_TOKEN=...   (Zone DNS Edit + Zone Settings Edit)
 *   node scripts/cloudflare-security-setup.mjs
 */

const ZONE_NAME = "kinexisdigital.com";
const DMARC_NAME = `_dmarc.${ZONE_NAME}`;
const DMARC_CONTENT =
  "v=DMARC1; p=none; rua=mailto:hello@kinexisdigital.com; pct=100; adkim=r; aspf=r";

async function cfFetch(path, { method = "GET", body } = {}) {
  const token = process.env.CLOUDFLARE_API_TOKEN;
  if (!token) {
    throw new Error(
      "Missing CLOUDFLARE_API_TOKEN. Create a token with Zone.DNS (Edit) and Zone.Settings (Edit)."
    );
  }

  const res = await fetch(`https://api.cloudflare.com/client/v4${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json();
  if (!data.success) {
    const detail = data.errors?.map((e) => e.message).join("; ") || res.statusText;
    throw new Error(`${method} ${path} failed: ${detail}`);
  }

  return data;
}

async function getZoneId() {
  const data = await cfFetch(`/zones?name=${ZONE_NAME}`);
  const zone = data.result?.[0];
  if (!zone) {
    throw new Error(`Zone not found: ${ZONE_NAME}`);
  }
  return zone.id;
}

async function ensureDmarcRecord(zoneId) {
  const existing = await cfFetch(
    `/zones/${zoneId}/dns_records?type=TXT&name=${encodeURIComponent(DMARC_NAME)}`
  );

  if (existing.result.length > 0) {
    console.log(`DMARC record already exists (${existing.result.length} found). Skipping.`);
    return;
  }

  await cfFetch(`/zones/${zoneId}/dns_records`, {
    method: "POST",
    body: {
      type: "TXT",
      name: "_dmarc",
      content: DMARC_CONTENT,
      ttl: 1,
    },
  });

  console.log("Added DMARC TXT record at _dmarc.kinexisdigital.com");
}

async function enableBotFightMode(zoneId) {
  const current = await cfFetch(`/zones/${zoneId}/settings/bot_fight_mode`);
  if (current.result?.value === "on") {
    console.log("Bot Fight Mode is already enabled. Skipping.");
    return;
  }

  await cfFetch(`/zones/${zoneId}/settings/bot_fight_mode`, {
    method: "PATCH",
    body: { value: "on" },
  });

  console.log("Enabled Bot Fight Mode");
}

async function main() {
  console.log(`Configuring Cloudflare security for ${ZONE_NAME}...`);
  const zoneId = await getZoneId();
  await ensureDmarcRecord(zoneId);
  await enableBotFightMode(zoneId);
  console.log("\nDone. Re-run Security Insights in the Cloudflare dashboard after DNS propagates.");
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
