import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { build } from "esbuild";
import { mkdtemp, rm } from "node:fs/promises";
import path from "node:path";

// Exercise the real route with a mocked SMTP transport. No messages leave this process.
const temporary = await mkdtemp(path.resolve(".tmp-contact-check-"));
const require = createRequire(import.meta.url);
const mailer = require("nodemailer");
const originalTransport = mailer.createTransport;
const keys = ["MAILGUN_API_KEY", "MAILGUN_DOMAIN", "FORM_ENDPOINT", "GMAIL_USER", "GMAIL_APP_PASSWORD", "CONTACT_TO", "CONTACT_TO_EMAIL"];
const previous = Object.fromEntries(keys.map(key => [key, process.env[key]]));
try {
  await build({ entryPoints: ["src/app/api/contact/route.ts"], outfile: path.join(temporary, "route.cjs"), bundle: true, platform: "node", format: "cjs", conditions: ["react-server"], external: ["nodemailer"] });
  for (const key of keys) delete process.env[key];
  process.env.GMAIL_USER = "sender@example.com";
  process.env.GMAIL_APP_PASSWORD = "test-only";
  process.env.CONTACT_TO = "inbox@example.com, owner@example.com; inbox@example.com";
  let delivery;
  mailer.createTransport = options => {
    assert.equal(options.host, "smtp.gmail.com");
    assert.equal(options.port, 465);
    assert.equal(options.secure, true);
    return { sendMail: async message => { delivery = message; return { accepted: ["inbox@example.com"] }; } };
  };
  const { POST } = require(path.join(temporary, "route.cjs"));
  const submit = (extra = {}, headers = {}) => {
    const form = new FormData();
    form.set("name", "Client");
    form.set("email", "client@example.com");
    for (const [key, value] of Object.entries(extra)) {
      if (Array.isArray(value)) value.forEach(item => form.append(key, item));
      else form.set(key, value);
    }
    return POST(new Request("http://localhost/api/contact", { method: "POST", headers, body: form }));
  };
  {
    const res = await submit({ topic: "strategy-call", file: new File(["drawing"], "brief.txt", { type: "text/plain" }) });
    assert.equal(res.status, 200);
    assert.deepEqual(await res.json(), { ok: true, accepted: true });
  }
  assert.deepEqual(delivery.to, ["inbox@example.com", "owner@example.com"]);
  assert.equal(delivery.replyTo.address, "client@example.com");
  assert.match(delivery.subject, /Strategy call/);
  assert.equal(delivery.attachments[0].content.toString(), "drawing");
  assert.equal(delivery.disableFileAccess, true);
  assert.equal(delivery.disableUrlAccess, true);
  delivery = undefined;
  assert.equal((await submit({ topic: "audit", url: "https://example.com", notes: "Check mobile form." })).status, 200);
  assert.match(delivery.subject, /Website audit request/);
  assert.match(delivery.text, /https:\/\/example\.com/);
  delivery = undefined;
  assert.equal((await submit({
    kx_conversion: "preview",
    kx_attr_utm_source: "newsletter",
    kx_attr_utm_campaign: "spring_launch",
    kx_attr_utm_content: "hero",
    kx_attr_utm_term: "local+web",
    kx_attr_gclid: "GCLID123",
    kx_attr_fbclid: "FBCLID123",
    kx_attr_referrer: "https://search.example/find?private=1",
    kx_attr_untrusted: "drop-me",
  }, { Cookie: "kinexis_consent=v1%7Ca%3D1%7Cd%3D1" })).status, 200);
  assert.match(delivery.text, /Attribution utm_source: newsletter/);
  assert.match(delivery.text, /Attribution utm_content: hero/);
  assert.match(delivery.text, /Attribution utm_term: local\+web/);
  assert.match(delivery.text, /Attribution gclid: GCLID123/);
  assert.match(delivery.text, /Attribution fbclid: FBCLID123/);
  assert.match(delivery.text, /Attribution referrer: https:\/\/search\.example\/find/);
  assert.doesNotMatch(delivery.text, /private=1|drop-me/);
  delivery = undefined;
  assert.equal((await submit({
    kx_conversion: "preview",
    kx_attr_utm_source: ["first", "conflicting"],
  }, { Cookie: "kinexis_consent=v1%7Ca%3D1%7Cd%3D0" })).status, 200);
  assert.doesNotMatch(delivery.text, /Attribution utm_source:/);
  delivery = undefined;
  assert.equal((await submit({
    kx_conversion: "audit",
    kx_attr_utm_source: "newsletter",
    kx_attr_gclid: "GCLID123",
    kx_attr_fbclid: "FBCLID123",
  }, { Cookie: "kinexis_consent=v1%7Ca%3D1%7Cd%3D0" })).status, 200);
  assert.match(delivery.text, /Attribution utm_source: newsletter/);
  assert.doesNotMatch(delivery.text, /GCLID123|FBCLID123/);
  delivery = undefined;
  assert.equal((await submit({
    kx_conversion: "preview",
    kx_attr_utm_source: "spoofed",
    kx_attr_fbclid: "FBCLID123",
  })).status, 200);
  assert.doesNotMatch(delivery.text, /Attribution/);
  delivery = undefined;
  assert.equal((await submit({
    kx_conversion: "preview",
    kx_attr_utm_source: "bad\r\nBcc: attacker@example.test",
    kx_attr_gclid: "bad value",
    kx_attr_referrer: "javascript:alert(1)",
  }, { Cookie: "kinexis_consent=v1%7Ca%3D1%7Cd%3D1" })).status, 200);
  assert.doesNotMatch(delivery.text, /Attribution/);
  delivery = undefined;
  const phoneOnly = new FormData();
  phoneOnly.set("name", "Client");
  phoneOnly.set("phone", "3075551234");
  assert.equal((await POST(new Request("http://localhost/api/contact", { method: "POST", body: phoneOnly }))).status, 200);
  assert.equal(delivery.replyTo, undefined);
  assert.match(delivery.text, /3075551234|phone/i);
  delete process.env.CONTACT_TO;
  process.env.CONTACT_TO_EMAIL = "legacy-inbox@example.com";
  assert.equal((await submit({ request: "Update the homepage" })).status, 200);
  assert.deepEqual(delivery.to, ["legacy-inbox@example.com"]);
  assert.match(delivery.subject, /Site update/);
  assert.equal((await submit({ email: "invalid" })).status, 400);
  assert.equal((await submit({ file: new File([new Uint8Array(5 * 1024 * 1024 + 1)], "large.bin") })).status, 400);
  const crossSite = new FormData();
  crossSite.set("name", "Client");
  crossSite.set("email", "client@example.com");
  assert.equal((await POST(new Request("http://localhost/api/contact", { method: "POST", headers: { Origin: "https://attacker.example" }, body: crossSite }))).status, 403);
  assert.equal((await POST(new Request("http://localhost/api/contact", { method: "POST", headers: { "Content-Type": "text/plain" }, body: "name=Client" }))).status, 415);
  assert.equal((await POST(new Request("http://localhost/api/contact", { method: "POST", headers: { "Content-Type": "multipart/form-data", "Content-Length": String(23 * 1024 * 1024) }, body: "x" }))).status, 413);
  delivery = undefined;
  {
    const honeypot = await submit({ _gotcha: "bot" });
    assert.equal(honeypot.status, 200);
    assert.deepEqual(await honeypot.json(), { ok: true });
  }
  assert.equal(delivery, undefined);
  mailer.createTransport = () => ({ sendMail: async () => { throw new Error("SMTP unavailable"); } });
  assert.equal((await submit()).status, 502);
  delete process.env.GMAIL_APP_PASSWORD;
  assert.equal((await submit()).status, 503);

  // Preview isolation: never fall back to CONTACT_TO / SITE.email.
  process.env.GMAIL_USER = "sender@example.com";
  process.env.GMAIL_APP_PASSWORD = "test-only";
  process.env.CONTACT_TO = "production@example.com";
  process.env.NEXT_PUBLIC_IS_PREVIEW = "1";
  delete process.env.CONTACT_PREVIEW_TO;
  delivery = undefined;
  mailer.createTransport = () => ({
    sendMail: async (message) => {
      delivery = message;
      return { accepted: message.to };
    },
  });
  assert.equal((await submit({ topic: "strategy-call" })).status, 503);
  assert.equal(delivery, undefined);
  process.env.CONTACT_PREVIEW_TO = "preview-sink@example.com";
  assert.equal((await submit({ topic: "strategy-call" })).status, 200);
  assert.deepEqual(delivery.to, ["preview-sink@example.com"]);
  assert.ok(!delivery.to.includes("production@example.com"));
  delete process.env.NEXT_PUBLIC_IS_PREVIEW;
  delete process.env.CONTACT_PREVIEW_TO;

  console.log("Contact delivery checks passed: SMTP routing, audit routing, attachment, validation, honeypot, failure, missing configuration, and preview email isolation.");
} finally {
  mailer.createTransport = originalTransport;
  for (const key of keys) {
    if (previous[key] === undefined) delete process.env[key];
    else process.env[key] = previous[key];
  }
  assert.ok(temporary.startsWith(path.resolve(".tmp-contact-check-")));
  await rm(temporary, { recursive: true, force: true });
}
