/**
 * Rendered language-pair audit. Read-only GET requests.
 * Usage: node scripts/generate-language-equivalence.mjs [base-url] [output-csv]
 */
import { writeFile } from "node:fs/promises";
import { bundleServer } from "./bundle-server.mjs";

const base = new URL(process.argv[2] || "https://www.kinexisdigital.com");
const publicOrigin = process.env.PUBLIC_ORIGIN || (base.hostname === "localhost" ? "https://www.kinexisdigital.com" : base.origin);
const output = process.argv[3] || "docs/quality-100/LANGUAGE-EQUIVALENCE.csv";
const mod = await bundleServer("scripts/language-equivalence-harness.ts", ".tmp-language-equivalence.mjs");
const data = mod.LANGUAGE_AUDIT;
const sitemapResponse = await fetch(new URL("/sitemap.xml", base), { signal: AbortSignal.timeout(30_000) });
if (!sitemapResponse.ok) throw new Error(`Sitemap returned ${sitemapResponse.status}`);
const sitemapXml = await sitemapResponse.text();
const sitemapPaths = new Set([...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname));
const details = new Map();
const decode = (value = "") => value.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'");
const attr = (tag, name) => decode(tag.match(new RegExp(`\\b${name}=["']([^"']*)["']`, "i"))?.[1] || "");
const text = (html) => decode(html.replace(/<(script|style|noscript)\b[\s\S]*?<\/\1>/gi, " ").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim());

async function inspect(path) {
  if (details.has(path)) return details.get(path);
  let url = new URL(path, base);
  let chain = [];
  let response;
  try {
    for (let i = 0; i < 6; i++) {
      response = await fetch(url, { redirect: "manual", signal: AbortSignal.timeout(25_000), headers: { "user-agent": "KINEXIS-Language-Audit/1.0 (read-only)" } });
      chain.push(`${response.status}:${url.pathname}`);
      const location = response.headers.get("location");
      if (!location || response.status < 300 || response.status >= 400) break;
      url = new URL(location, url);
    }
    const html = await response.text();
    const canonTag = [...html.matchAll(/<link\b[^>]*>/gi)].map((m) => m[0]).find((tag) => /\brel=["']canonical["']/i.test(tag));
    const robotsTag = [...html.matchAll(/<meta\b[^>]*>/gi)].map((m) => m[0]).find((tag) => /\bname=["']robots["']/i.test(tag));
    const languages = [...html.matchAll(/<link\b[^>]*>/gi)].map((m) => m[0])
      .filter((tag) => /\brel=["']alternate["']/i.test(tag) && /\bhreflang=/i.test(tag))
      .map((tag) => `${attr(tag, "hreflang")}=${attr(tag, "href")}`).join("|");
    const found = {
      status: response.status, chain: chain.join(" -> "),
      canonical: attr(canonTag || "", "href"),
      robots: attr(robotsTag || "", "content") || response.headers.get("x-robots-tag") || "",
      hreflang: languages, htmlLang: attr(html.match(/<html\b[^>]*>/i)?.[0] || "", "lang"),
      text: text(html), finalPath: url.pathname,
    };
    details.set(path, found);
    return found;
  } catch (error) {
    const failed = { status: "", chain: chain.join(" -> "), error: String(error), canonical: "", robots: "", hreflang: "", htmlLang: "", text: "", finalPath: "" };
    details.set(path, failed);
    return failed;
  }
}

const routes = new Map();
for (const group of [data.pages, data.industries, data.posts, data.projects, data.caseStudies, data.additional]) {
  for (const route of group) routes.set(route.path, route);
}
const rows = [];
const paths = [...routes.values()];
let cursor = 0;
await Promise.all(Array.from({ length: 8 }, async () => {
  while (cursor < paths.length) {
    const route = paths[cursor++];
    const en = await inspect(route.path);
    const isCheckoutTranslation = route.path === "/pay" || route.path === "/pay/thanks";
    const hasSpanish = route.mirrored || isCheckoutTranslation;
    const localizedPath = route.path === "/" ? "/es" : `/es${route.path}`;
    const esPath = hasSpanish ? localizedPath : "";
    const spanishCandidate = esPath || localizedPath;
    const es = await inspect(spanishCandidate);
    const fallback = route.spanishOnlySlug
      ? (route.path === "/blog/pagina-web-para-plomeros" ? "/industries/plumbing" : "/blog/how-to-ask-for-google-reviews-contractor")
      : "";
    const relation = route.spanishOnlySlug
      ? "Spanish-only content; English slug redirects to related English page"
      : isCheckoutTranslation
        ? "Translated utility pair; intentionally noindex/no hreflang"
        : route.mirrored
          ? "English–Spanish route pair"
          : "English-only; Spanish translation intentionally not routed";
    const esExists = String(es.status) === "200";
    const esIndexable = esExists && !/noindex/i.test(es.robots);
    const enIndexable = !/noindex/i.test(en.robots) && route.indexable !== false;
    const enSwitch = fallback || (hasSpanish ? esPath : "/");
    const esSwitch = route.spanishOnlySlug ? fallback : route.path;
    let currency = "Not applicable";
    if (es) {
      const plain = es.text;
      const hasEuro = plain.includes("€");
      const expected = route.path === "/pricing" || route.path === "/terms"
        ? ["$97", "$197", "$297", "$1,497"]
        : route.path === "/upgrades"
          ? ["$97", "$39", "$99", "$1"]
          : route.path === "/" || route.path.startsWith("/industries/")
            ? ["$97"]
            : [];
      const missingPrices = expected.filter((price) => !plain.includes(price));
      const commercial = expected.length > 0 || /pricing|price|cost|precio|pago|plan/i.test(route.path);
      currency = !commercial
        ? "Not applicable"
        : hasEuro || missingPrices.length
          ? `REVIEW: ${hasEuro ? "unexpected EUR symbol; " : ""}${missingPrices.length ? `missing ${missingPrices.join(" ")}` : ""}`
          : "USD displayed where prices appear; no EUR symbol";
    }
    rows.push({
      english_url: `${publicOrigin}${route.path}`,
      spanish_url: esPath ? `${publicOrigin}${esPath}` : "",
      route_kind: route.kind,
      relationship: relation,
      english_status_chain: en.chain,
      spanish_status_chain: es.chain || "",
      english_canonical: en.canonical,
      spanish_canonical: esExists ? es.canonical : "",
      english_hreflang: en.hreflang,
      spanish_hreflang: esExists ? es.hreflang : "",
      english_sitemap: sitemapPaths.has(route.path) ? "yes" : "no",
      spanish_sitemap: esPath && sitemapPaths.has(esPath) ? "yes" : "no",
      english_switch_destination: enSwitch,
      spanish_switch_destination: esExists ? esSwitch : "",
      translation_completeness: route.mirrored
        ? route.kind === "blog" ? "Spanish post source present; content-quality review documented separately" : "Spanish page source present"
        : isCheckoutTranslation ? "Translated Spanish utility source present"
          : route.spanishOnlySlug ? "Spanish post source present; no equivalent English article"
            : "Intentionally untranslated/unmirrored",
      currency_consistency: currency,
      english_indexability: enIndexable ? "indexable" : "noindex",
      spanish_indexability: esExists ? (esIndexable ? "indexable" : "noindex") : "no Spanish route",
      html_language: `${en.htmlLang}|${esExists ? es.htmlLang : ""}`,
      fallback_english_target: fallback,
      error: [en.error, es.error].filter(Boolean).join(" | "),
    });
  }
}));

// The legacy Spain locale is a redirect alias, not a separate indexable translation.
const spain = await inspect("/es-es");
rows.push({
  english_url: "", spanish_url: `${publicOrigin}/es-es`, route_kind: "locale-policy",
  relationship: "Spain locale alias; permanently redirects to /es",
  english_status_chain: "", spanish_status_chain: spain.chain,
  english_canonical: "", spanish_canonical: spain.canonical,
  english_hreflang: "", spanish_hreflang: spain.hreflang,
  english_sitemap: "no", spanish_sitemap: "no",
  english_switch_destination: "", spanish_switch_destination: `${base.origin}/es`,
  translation_completeness: "Uses public LatAm Spanish route; no separate Spain translation URL",
  currency_consistency: "Public /es uses USD; Spain URL redirects before rendering",
  english_indexability: "n/a", spanish_indexability: "redirect/no separate indexing",
  html_language: spain.htmlLang, fallback_english_target: "", error: spain.error || "",
});

const columns = Object.keys(rows[0]);
const quote = (v) => `"${String(v ?? "").replaceAll('"', '""')}"`;
await writeFile(output, [columns.map(quote).join(","), ...rows.map((row) => columns.map((key) => quote(row[key])).join(","))].join("\n") + "\n", "utf8");
const mirrorCount = paths.filter((route) => route.mirrored).length;
const spanishOnly = paths.filter((route) => route.spanishOnlySlug).length;
const errors = rows.filter((row) => row.error
  || (row.english_url && !String(row.english_status_chain).includes("200:") && row.route_kind !== "locale-policy")
  || (row.spanish_url && !String(row.spanish_status_chain).includes("200:") && row.route_kind !== "locale-policy"));
console.log(JSON.stringify({
  output, english_route_definitions: paths.length, spanish_route_definitions: mirrorCount + 2,
  valid_exact_pairs: mirrorCount - spanishOnly + 2, spanish_only_blog_routes: spanishOnly,
  intentionally_untranslated_english_routes: paths.filter((r) => !r.mirrored && r.path !== "/pay" && r.path !== "/pay/thanks").length,
  routes_with_errors_or_no_200: errors.length,
  currency_review_rows: rows.filter((r) => String(r.currency_consistency).startsWith("REVIEW")).length,
}, null, 2));
