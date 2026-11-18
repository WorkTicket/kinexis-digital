import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { build } from "esbuild";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const bundle = await build({
  entryPoints: ["src/lib/meta-capi.ts"],
  bundle: true,
  format: "esm",
  platform: "node",
  write: false,
});
const source = bundle.outputFiles[0]?.contents;
assert.ok(source);
const meta = await import(`data:text/javascript;base64,${Buffer.from(source).toString("base64")}`);

const eventId = "d85c1d12-6e9a-4af3-9d56-8abff1c6b008";
const input = {
  eventId,
  eventSourceUrl: "https://www.kinexisdigital.com/es/contact",
  formPath: "/es/contact",
  metaForm: "contact",
  language: "es",
  email: "  Test+Lead@Example.COM ",
  phone: "(307) 555-3371",
  clientIp: "203.0.113.10",
  clientUserAgent: "test-agent",
  fbp: "fb.1.1700000000000.123456789",
  fbc: "fb.1.1700000000000.AbCdEf",
  consent: true,
  eventTime: 1_800_000_000,
};

assert.equal(meta.normalizeMetaEmail(input.email), "test+lead@example.com");
assert.equal(meta.normalizeMetaPhone(input.phone), "13075553371");
const expectedHash = (value) => createHash("sha256").update(value).digest("hex");

const payload = await meta.buildMetaLeadPayload(input);
assert.ok(payload);
assert.equal(payload.event_name, "Lead");
assert.equal(payload.event_id, eventId);
assert.equal(payload.event_time, input.eventTime);
assert.equal(payload.action_source, "website");
assert.equal(payload.event_source_url, input.eventSourceUrl);
assert.deepEqual(payload.custom_data, {
  content_name: "contact_form",
  form_path: input.formPath,
  lang: "es",
});
const mappedFormPaths = {
  home: "/",
  contact: "/es/contact",
  audit: "/audit",
  "lp-get-a-website": "/lp/get-a-website",
  "lp-phoenix-preview": "/lp/phoenix-preview",
  "strategy-call": "/strategy-call",
  intake: "/intake",
  footer: "/pricing",
  "review-qr-tool": "/tools/google-review-link-qr",
};
for (const [metaForm, formPath] of Object.entries(mappedFormPaths)) {
  const formPayload = await meta.buildMetaLeadPayload({
    ...input,
    metaForm,
    formPath,
    eventSourceUrl: `https://www.kinexisdigital.com${formPath}`,
  });
  const browserContentName = meta.META_CONTENT_NAME_BY_FORM[metaForm];
  assert.ok(browserContentName, `${metaForm} must have a stable content name`);
  assert.equal(formPayload?.custom_data.content_name, browserContentName, `${metaForm} Pixel and CAPI names must match`);
  assert.equal(formPayload?.custom_data.form_path, formPath);
}
assert.equal(
  await meta.buildMetaLeadPayload({ ...input, metaForm: "update" }),
  null,
  "unmapped client-update forms cannot produce a CAPI event",
);
assert.deepEqual(payload.user_data.em, [expectedHash("test+lead@example.com")]);
assert.deepEqual(payload.user_data.ph, [expectedHash("13075553371")]);
assert.equal(payload.user_data.client_ip_address, input.clientIp);
assert.equal(payload.user_data.client_user_agent, input.clientUserAgent);
assert.equal(payload.user_data.fbp, input.fbp);
assert.equal(payload.user_data.fbc, input.fbc);
assert.equal(await meta.buildMetaLeadPayload({ ...input, consent: false }), null);

let calls = 0;
let sentUrl = "";
let sentBody;
const fetcher = async (url, init) => {
  calls += 1;
  sentUrl = String(url);
  sentBody = JSON.parse(init.body);
  return Response.json({ events_received: 1 });
};

const denied = await meta.sendMetaLeadCapi({ ...input, consent: false }, "1577328887491986", "unit-test-token", fetcher);
assert.deepEqual(denied, { accepted: false });
assert.equal(calls, 0, "no CAPI request is made without advertising consent");

const accepted = await meta.sendMetaLeadCapi(input, "1577328887491986", "unit-test-token", fetcher);
assert.deepEqual(accepted, { accepted: true, status: 200 });
assert.equal(calls, 1);
assert.equal(sentUrl, "https://graph.facebook.com/v21.0/1577328887491986/events");
assert.equal(sentBody.access_token, "unit-test-token");
assert.equal(sentBody.data[0].event_id, eventId, "CAPI retains the browser event ID for deduplication");
assert.equal(sentBody.data[0].event_name, "Lead");

const failed = await meta.sendMetaLeadCapi(input, "1577328887491986", "unit-test-token", async () => new Response("no", { status: 503 }));
assert.deepEqual(failed, { accepted: false, status: 503 });

const boot = await (await import("node:fs/promises")).readFile(path.join(root, "public/assets/js/boot.js"), "utf8");
const bootComponent = await (await import("node:fs/promises")).readFile(path.join(root, "src/components/Boot.tsx"), "utf8");
assert.match(boot, /if \(!consentAllowsAds\(\)\) return false/);
assert.match(boot, /data\.set\("kx_event_id", metaEventId\)/);
assert.match(boot, /cfg\.metaContentNameByForm/);
assert.match(boot, /window\.__KINEXIS_TRACK_META_LEAD__\s*=/);
assert.match(boot, /content_name: cfg\.metaContentNameByForm\[form\],[\s\S]*?form_path: formPath/);
assert.match(bootComponent, /metaContentNameByForm:\s*META_CONTENT_NAME_BY_FORM/);
assert.match(boot, /if \(name === "PageView" && justBooted\) return/);
assert.match(boot, /window\.fbq\("consent",\s*adsAllowed \? "grant" : "revoke"\)/);

const route = await (await import("node:fs/promises")).readFile(path.join(root, "src/app/api/contact/route.ts"), "utf8");
assert.ok(/consent\.ads[\s\S]*?META_EVENT_ID_PATTERN\.test\(metaEventId\)[\s\S]*?queueMetaLeadCapi/.test(route), "the handler gates CAPI on advertising consent and the matching event ID");
assert.match(route, /metaForm,\s*language/);
assert.ok(route.includes("waitUntil(task)"), "the CAPI request is scheduled without blocking lead acceptance");
assert.ok(route.includes("META_CAPI_TOKEN"), "the CAPI token comes from the Worker secret");

console.log("Meta CAPI checks passed: consent gate, dedup ID, SHA-256 normalization, payload fields, soft navigation, and non-blocking scheduling. Fetch was mocked; no Meta request was sent.");
