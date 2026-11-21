/**
 * Read-only byte profile for public HTML responses.
 * Run: node scripts/profile-public-html.mjs [url ...]
 */
const DEFAULT_URLS = [
  "https://www.kinexisdigital.com/",
  "https://www.kinexisdigital.com/pricing",
  "https://www.kinexisdigital.com/industries/plumbing",
  "https://www.kinexisdigital.com/industries/landscaping",
  "https://www.kinexisdigital.com/case-studies/a1-property-services",
  "https://www.kinexisdigital.com/blog",
  "https://www.kinexisdigital.com/es/blog/pagina-web-para-plomeros",
];

const urls = process.argv.slice(2).length
  ? process.argv.slice(2)
  : DEFAULT_URLS;

for (const url of urls) {
  const response = await fetch(url, {
    headers: {
      accept: "text/html",
      "user-agent": "KINEXIS-HTML-Weight-Audit/1.0 (read-only)",
    },
  });
  const html = await response.text();
  const scripts = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)]
    .map((match, index) => ({
      index,
      attrs: match[1],
      text: match[2],
      bytes: Buffer.byteLength(match[2]),
    }));
  const styles = [...html.matchAll(/<style\b([^>]*)>([\s\S]*?)<\/style>/gi)]
    .map((match) => ({
      attrs: match[1],
      bytes: Buffer.byteLength(match[2]),
    }));
  const flightBytes = scripts
    .filter(({ text }) => /__next_f\.push/.test(text))
    .reduce((sum, script) => sum + script.bytes, 0);
  const jsonLdBytes = scripts
    .filter(({ attrs }) => /application\/ld\+json/i.test(attrs))
    .reduce((sum, script) => sum + script.bytes, 0);
  const inlineScriptBytes = scripts.reduce((sum, script) => sum + script.bytes, 0);
  const topScripts = [...scripts]
    .sort((a, b) => b.bytes - a.bytes)
    .slice(0, 5)
    .map(({ index, attrs, text, bytes }) => ({
      index,
      bytes,
      attrs: attrs.slice(0, 140),
      prefix: text.slice(0, 100).replace(/\s+/g, " "),
    }));

  console.log(JSON.stringify({
    url,
    status: response.status,
    decodedHtmlBytes: Buffer.byteLength(html),
    inlineStyleBytes: styles.reduce((sum, style) => sum + style.bytes, 0),
    inlineStyleCount: styles.length,
    scriptCount: scripts.length,
    inlineScriptBytes,
    flightScriptBytes: flightBytes,
    jsonLdScriptBytes: jsonLdBytes,
    largestInlineScripts: topScripts,
  }));
}
