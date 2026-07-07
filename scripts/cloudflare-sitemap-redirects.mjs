#!/usr/bin/env node
/**
 * Cloudflare Bulk Redirects for canonical sitemap.xml + robots.txt (Phase 9).
 * Belt-and-suspenders alongside middleware — runs at CDN edge before Worker.
 *
 * Requires CLOUDFLARE_API_TOKEN with Account Rulesets Edit + Zone Read.
 *
 * Usage: node scripts/cloudflare-sitemap-redirects.mjs
 */
const ZONE_NAME = "kinexisdigital.com";
const CANONICAL = "https://www.kinexisdigital.com";

const REDIRECT_PATHS = ["/sitemap.xml", "/robots.txt"];

async function cfFetch(path, { method = "GET", body } = {}) {
  const token = process.env.CLOUDFLARE_API_TOKEN;
  if (!token) {
    throw new Error("Missing CLOUDFLARE_API_TOKEN");
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
  if (!zone) throw new Error(`Zone not found: ${ZONE_NAME}`);
  return zone.id;
}

function buildRedirectRules() {
  const rules = [];

  for (const pathname of REDIRECT_PATHS) {
    for (const host of ["kinexisdigital.com", "www.kinexisdigital.com"]) {
      for (const scheme of ["http", "https"]) {
        const sourceUrl = `${scheme}://${host}${pathname}`;
        if (sourceUrl === `${CANONICAL}${pathname}`) continue;

        rules.push({
          action: "redirect",
          action_parameters: {
            from_value: {
              status_code: 301,
              target_url: {
                expression: `concat("${CANONICAL}${pathname}")`,
              },
              preserve_query_string: false,
            },
          },
          expression: `(http.request.full_uri eq "${sourceUrl}")`,
          description: `Phase 9: ${sourceUrl} → ${CANONICAL}${pathname}`,
          enabled: true,
        });
      }
    }
  }

  return rules;
}

async function main() {
  const zoneId = await getZoneId();
  const rules = buildRedirectRules();

  console.log(`Zone: ${ZONE_NAME} (${zoneId})`);
  console.log(`Redirect rules to apply: ${rules.length}\n`);

  for (const rule of rules) {
    console.log(`  ${rule.description}`);
  }

  console.log(
    "\nNOTE: Cloudflare Bulk Redirects API varies by plan. If this script fails,\n" +
      "add equivalent 301 rules in Cloudflare Dashboard → Rules → Redirect Rules,\n" +
      "or rely on middleware (already deployed in src/middleware.ts).\n"
  );

  console.log("Middleware handles sitemap/robots canonicalization at the Worker layer.");
  console.log("Skip Cloudflare API if middleware redirects pass phase9-sitemap-audit.mjs.\n");
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
