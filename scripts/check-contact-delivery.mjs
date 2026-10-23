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
  await build({ entryPoints: ["src/app/api/contact/route.ts"], outfile: path.join(temporary, "route.cjs"), bundle: true, platform: "node", format: "cjs", external: ["nodemailer"] });
  for (const key of keys) delete process.env[key];
  process.env.GMAIL_USER = "sender@example.com";
  process.env.GMAIL_APP_PASSWORD = "test-only";
  process.env.CONTACT_TO = "inbox@example.com";
  let delivery;
  mailer.createTransport = options => {
    assert.equal(options.host, "smtp.gmail.com");
    assert.equal(options.port, 465);
    assert.equal(options.secure, true);
    return { sendMail: async message => { delivery = message; return { accepted: ["inbox@example.com"] }; } };
  };
  const { POST } = require(path.join(temporary, "route.cjs"));
  const submit = (extra = {}) => {
    const form = new FormData();
    form.set("name", "Client");
    form.set("email", "client@example.com");
    for (const [key, value] of Object.entries(extra)) form.set(key, value);
    return POST(new Request("http://localhost/api/contact", { method: "POST", body: form }));
  };
  assert.equal((await submit({ topic: "strategy-call", file: new File(["drawing"], "brief.txt") })).status, 200);
  assert.equal(delivery.to, "inbox@example.com");
  assert.equal(delivery.replyTo.address, "client@example.com");
  assert.match(delivery.subject, /Strategy call/);
  assert.equal(delivery.attachments[0].content.toString(), "drawing");
  assert.equal(delivery.disableFileAccess, true);
  assert.equal(delivery.disableUrlAccess, true);
  delete process.env.CONTACT_TO;
  process.env.CONTACT_TO_EMAIL = "legacy-inbox@example.com";
  assert.equal((await submit({ request: "Update the homepage" })).status, 200);
  assert.equal(delivery.to, "legacy-inbox@example.com");
  assert.match(delivery.subject, /Site update/);
  assert.equal((await submit({ email: "invalid" })).status, 400);
  assert.equal((await submit({ file: new File([new Uint8Array(5 * 1024 * 1024 + 1)], "large.bin") })).status, 400);
  delivery = undefined;
  assert.equal((await submit({ _gotcha: "bot" })).status, 200);
  assert.equal(delivery, undefined);
  mailer.createTransport = () => ({ sendMail: async () => { throw new Error("SMTP unavailable"); } });
  assert.equal((await submit()).status, 502);
  delete process.env.GMAIL_APP_PASSWORD;
  assert.equal((await submit()).status, 503);
  console.log("Contact delivery checks passed: SMTP routing, attachment, validation, honeypot, failure and missing configuration.");
} finally {
  mailer.createTransport = originalTransport;
  for (const key of keys) {
    if (previous[key] === undefined) delete process.env[key];
    else process.env[key] = previous[key];
  }
  assert.ok(temporary.startsWith(path.resolve(".tmp-contact-check-")));
  await rm(temporary, { recursive: true, force: true });
}
