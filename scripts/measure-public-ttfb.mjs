/**
 * Read-only public GET benchmark for KX-SEO-002 Release 2.
 * Run: node scripts/measure-public-ttfb.mjs [output.csv]
 * Optional: --urls=url1,url2 and --user-agent="..." for controlled comparisons.
 *
 * Per URL: one fresh TCP/TLS connection, followed by two keep-alive-eligible GETs.
 * A fresh connection is not a guaranteed cold Cloudflare cache request.
 */
import { writeFile } from "node:fs/promises";
import https from "node:https";
import { brotliDecompressSync, gunzipSync, inflateSync } from "node:zlib";
import { performance } from "node:perf_hooks";

const URLS = [
  "https://www.kinexisdigital.com/",
  "https://www.kinexisdigital.com/es",
  "https://www.kinexisdigital.com/pricing",
  "https://www.kinexisdigital.com/es/pricing",
  "https://www.kinexisdigital.com/industries/plumbing",
  "https://www.kinexisdigital.com/industries/landscaping",
  "https://www.kinexisdigital.com/case-studies/a1-property-services",
  "https://www.kinexisdigital.com/blog",
  "https://www.kinexisdigital.com/es/blog/pagina-web-para-plomeros",
  "https://connect.kinexisdigital.com/",
];
const args = process.argv.slice(2);
const urlsArg = args.find((arg) => arg.startsWith("--urls="))?.slice(7);
const userAgentArg = args.find((arg) => arg.startsWith("--user-agent="))?.slice(13);
const REQUEST_URLS = urlsArg
  ? urlsArg.split(",").map((url) => url.trim()).filter(Boolean)
  : URLS;
const ACCEPTED_ENCODINGS = "br, gzip, deflate";
const AGENT_NAME = "KINEXIS-Release2-Benchmark/1.0 (read-only)";
const REQUEST_USER_AGENT = userAgentArg ?? AGENT_NAME;
const HEADER_FIELDS = [
  "cache-control", "age", "cf-cache-status", "cf-ray", "server",
  "location", "content-type", "content-encoding", "content-length", "vary",
];
const HEADERS = [
  "url", "user_agent", "attempt", "connection_mode", "connection_reused", "http_version",
  "status", "dns_ms", "tcp_connect_ms", "tls_ms", "ttfb_ms", "total_ms",
  "response_header_bytes", "response_body_bytes", "decoded_html_bytes",
  ...HEADER_FIELDS,
  "remote_ip", "error",
];

function csv(value) {
  const text = value == null ? "" : String(value);
  return `"${text.replaceAll('"', '""')}"`;
}

function decodeBody(buffer, encoding = "") {
  try {
    if (encoding.includes("br")) return brotliDecompressSync(buffer);
    if (encoding.includes("gzip")) return gunzipSync(buffer);
    if (encoding.includes("deflate")) return inflateSync(buffer);
  } catch {
    return Buffer.alloc(0);
  }
  return buffer;
}

function requestOnce(url, agent, attempt) {
  return new Promise((resolve) => {
    const socketStarted = performance.now();
    let lookupAt;
    let connectedAt;
    let requestSentAt;
    let reused = false;
    const timing = { dns_ms: "", tcp_connect_ms: "", tls_ms: "" };
    const request = https.request(url, {
      method: "GET",
      agent,
      headers: {
        "User-Agent": REQUEST_USER_AGENT,
        Accept: "text/html,application/xhtml+xml",
        "Accept-Encoding": ACCEPTED_ENCODINGS,
      },
    });

    request.on("socket", (socket) => {
      reused = !socket.connecting;
      if (reused) return;
      socket.once("lookup", () => {
        lookupAt = performance.now();
        timing.dns_ms = (lookupAt - socketStarted).toFixed(1);
      });
      socket.once("connect", () => {
        connectedAt = performance.now();
        timing.tcp_connect_ms = (
          connectedAt - (lookupAt ?? socketStarted)
        ).toFixed(1);
      });
      socket.once("secureConnect", () => {
        timing.tls_ms = (performance.now() - (connectedAt ?? socketStarted)).toFixed(1);
      });
    });
    request.on("finish", () => {
      requestSentAt = performance.now();
    });
    request.setTimeout(30_000, () => request.destroy(new Error("request timeout")));
    request.once("response", (response) => {
      const responseAt = performance.now();
      const remoteIp = response.socket?.remoteAddress ?? "";
      const chunks = [];
      response.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
      response.once("end", () => {
        const endedAt = performance.now();
        const body = Buffer.concat(chunks);
        const encoding = String(response.headers["content-encoding"] ?? "").toLowerCase();
        const decoded = decodeBody(body, encoding);
        const rawHeaders = response.rawHeaders.join("\r\n");
        const row = {
          url,
          user_agent: REQUEST_USER_AGENT,
          attempt,
          connection_mode: reused ? "reused-connection" : "fresh-connection",
          connection_reused: reused,
          http_version: response.httpVersion,
          status: response.statusCode ?? "",
          ...timing,
          ttfb_ms: requestSentAt == null ? "" : (responseAt - requestSentAt).toFixed(1),
          total_ms: requestSentAt == null ? "" : (endedAt - requestSentAt).toFixed(1),
          response_header_bytes: Buffer.byteLength(rawHeaders, "latin1"),
          response_body_bytes: body.byteLength,
          decoded_html_bytes: decoded.byteLength,
          remote_ip: remoteIp,
          error: "",
        };
        for (const field of HEADER_FIELDS) {
          row[field] = response.headers[field] ?? "";
        }
        resolve(row);
      });
    });
    request.once("error", (error) => {
      resolve({
        url,
        user_agent: REQUEST_USER_AGENT,
        attempt,
        connection_mode: "fresh-connection",
        connection_reused: reused,
        http_version: "",
        status: "",
        ...timing,
        ttfb_ms: "",
        total_ms: "",
        response_header_bytes: "",
        response_body_bytes: "",
        decoded_html_bytes: "",
        ...Object.fromEntries(HEADER_FIELDS.map((field) => [field, ""])),
        remote_ip: "",
        error: error.message,
      });
    });
    request.end();
  });
}

const output = args.find((arg) => !arg.startsWith("--"))
  ?? `docs/seo/KX-SEO-002-NODE-GET-TTFB-RELEASE2-${new Date().toISOString().slice(0, 10)}.csv`;
const rows = [];
for (const url of REQUEST_URLS) {
  const agent = new https.Agent({ keepAlive: true, maxSockets: 1 });
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    const row = await requestOnce(url, agent, attempt);
    rows.push(row);
    console.log(`${row.status || "ERR"} ${row.ttfb_ms || "—"}ms ${row.connection_mode} ${url}`);
  }
  agent.destroy();
}
await writeFile(output, [
  HEADERS.join(","),
  ...rows.map((row) => HEADERS.map((header) => csv(row[header])).join(",")),
  "",
].join("\n"));
console.log(`Recorded ${rows.length} read-only GETs in ${output}`);
