/**
 * Conferbot webhook integration checks: signature, redaction, idempotency,
 * wrong bot, feature flag off. Uses in-memory SQLite via LEAD_TEST_MEMORY.
 */
import assert from "node:assert/strict";
import { bundleServer } from "./bundle-server.mjs";
import { openConferbotLedger } from "./conferbot-sql-adapter.mjs";

const secret = "a".repeat(64);
const botId = "6afa0edabbad567d637ee189";
const origin = "http://localhost:3000";

process.env.LEAD_TEST_MEMORY = "1";
process.env.CONFERBOT_INTEGRATION_ENABLED = "1";
process.env.CONFERBOT_WEBHOOK_SECRET = secret;
process.env.CONFERBOT_EXPECTED_BOT_ID = botId;
process.env.CONFERBOT_NOTIFY_ENABLED = "0";
delete process.env.CONTACT_PREVIEW_TO;
delete process.env.NEXT_PUBLIC_IS_PREVIEW;

const routes = await bundleServer("scripts/conferbot-webhook-harness.ts", ".tmp-conferbot-routes.mjs");
const ledger = openConferbotLedger();
routes.setConferbotTestDatabase(ledger);

function fixture(overrides = {}) {
  return {
    event: "message.created",
    botId,
    chatSessionId: "session-test-001",
    visitorId: "visitor-001",
    message: {
      id: "msg-001",
      sequence: 1,
      sender: "visitor",
      type: "text",
      text: "I need a new website",
      sentAt: "2026-11-15T12:00:00.000Z",
    },
    visitor: {
      id: "visitor-001",
      name: "Test Lead",
      email: "lead@example.test",
      phone: "+1 (555) 010-2000",
      ip: "203.0.113.50",
      isp: "Example ISP",
      location: { city: "Austin", region: "TX", country: "US", latitude: 30.2, longitude: -97.7 },
      device: { userAgent: "Mozilla/5.0 test-agent", type: "desktop" },
      language: "en-US",
    },
    page: {
      url: "https://www.kinexisdigital.com/contact",
      landingPage: "https://www.kinexisdigital.com/",
      referrer: "https://www.google.com/",
      utmSource: "test",
    },
    variables: {
      email: "lead@example.test",
      phone: "+1 (555) 010-2000",
      name: "Test Lead",
      decision_maker: "yes",
      services: "website",
      timeline: "within 30 days",
    },
    customData: { source: "kinexis-digital-site", locale: "en" },
    timestamp: "2026-11-15T12:00:00.000Z",
    ...overrides,
  };
}

async function signedRequest(bodyObj, headers = {}) {
  const body = JSON.stringify(bodyObj);
  const signature = await routes.signConferbotBody(body, secret);
  assert.ok(signature);
  return new Request(`${origin}/api/integrations/conferbot/webhook`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-webhook-signature": signature,
      "x-webhook-event": bodyObj.event || "message.created",
      ...headers,
    },
    body,
  });
}

// --- Signature unit checks ---
{
  const body = "{\"ok\":true}";
  const sig = await routes.signConferbotBody(body, secret);
  assert.equal(sig?.length, 64);
  assert.equal(await routes.verifyConferbotSignature(body, sig, secret), true);
  assert.equal(await routes.verifyConferbotSignature(body, "0".repeat(64), secret), false);
  assert.equal(await routes.verifyConferbotSignature(body, "not-hex", secret), false);
  assert.equal(await routes.verifyConferbotSignature(body, null, secret), false);
  assert.equal(routes.isConferbotSignatureHex("ab".repeat(32)), true);
  assert.equal(routes.isConferbotSignatureHex("zz".repeat(32)), false);
  assert.equal(routes.constantTimeHexEqual("abcd", "abcd"), true);
  assert.equal(routes.constantTimeHexEqual("abcd", "abce"), false);
  console.log("signature checks passed");
}

// --- Redaction ---
{
  const redacted = routes.redactConferbotPayload(fixture());
  assert.equal(redacted.visitor.ip, undefined);
  assert.equal(redacted.visitor.location, undefined);
  assert.equal(redacted.visitor.isp, undefined);
  assert.equal(redacted.visitor.device.userAgent, undefined);
  assert.equal(redacted.visitor.email, "lead@example.test");
  assert.equal(redacted.visitor.language, "en-US");
  assert.ok(!JSON.stringify(redacted).includes("203.0.113.50"));
  assert.ok(!JSON.stringify(redacted).includes("Mozilla/5.0"));
  console.log("redaction checks passed");
}

// --- Event keys ---
{
  const body = JSON.stringify(fixture());
  assert.equal(await routes.conferbotProviderEventKey("message.created", fixture(), body), "message:msg-001");
  assert.equal(
    await routes.conferbotProviderEventKey("conversation.started", { chatSessionId: "s1" }, "{}"),
    "started:s1",
  );
  assert.equal(
    await routes.conferbotProviderEventKey("conversation.completed", { chatSessionId: "s1" }, "{}"),
    "completed:s1",
  );
  assert.equal(
    await routes.conferbotProviderEventKey("response.created", { responseId: "r1" }, "{}"),
    "rcreated:r1",
  );
  const updated = await routes.conferbotProviderEventKey("response.updated", { responseId: "r1" }, body);
  assert.ok(updated.startsWith("rupdated:r1:"));
  assert.equal(updated.length, "rupdated:r1:".length + 64);
  console.log("event-key checks passed");
}

// --- Scoring ---
{
  const fields = routes.extractLeadFields(fixture());
  assert.equal(fields.email, "lead@example.test");
  const scored = routes.scoreLead(fields);
  assert.ok(scored.score >= 0 && scored.score <= 100);
  assert.ok(["HOT", "QUALIFIED", "DEVELOPING", "EARLY_STAGE"].includes(scored.temperature));
  console.log("scoring checks passed");
}

// --- Flag off → 503, no processing ---
{
  process.env.CONFERBOT_INTEGRATION_ENABLED = "0";
  assert.equal(routes.isConferbotIntegrationEnabled(), false);
  const response = await routes.webhookPost(await signedRequest(fixture()));
  assert.equal(response.status, 503);
  const count = await routes.countWebhookEvents(ledger, "message:msg-001");
  assert.equal(count, 0);
  process.env.CONFERBOT_INTEGRATION_ENABLED = "1";
  console.log("flag-off checks passed");
}

// --- Bad signature → 401 ---
{
  const body = JSON.stringify(fixture());
  const request = new Request(`${origin}/api/integrations/conferbot/webhook`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-webhook-signature": "0".repeat(64),
      "x-webhook-event": "message.created",
    },
    body,
  });
  const response = await routes.webhookPost(request);
  assert.equal(response.status, 401);
  console.log("bad-signature checks passed");
}

// --- Bad JSON → 400 ---
{
  const body = "{not-json";
  const signature = await routes.signConferbotBody(body, secret);
  const request = new Request(`${origin}/api/integrations/conferbot/webhook`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-webhook-signature": signature,
      "x-webhook-event": "message.created",
    },
    body,
  });
  const response = await routes.webhookPost(request);
  assert.equal(response.status, 400);
  console.log("bad-json checks passed");
}

// --- Wrong bot → 200 ignored, no persist ---
{
  const response = await routes.webhookPost(await signedRequest(fixture({ botId: "000000000000000000000000" })));
  assert.equal(response.status, 200);
  const payload = await response.json();
  assert.equal(payload.status, "ignored");
  const count = await routes.countWebhookEvents(ledger, "message:msg-001");
  assert.equal(count, 0);
  console.log("wrong-bot checks passed");
}

// --- Happy path + idempotency x3 ---
{
  const body = fixture();
  const first = await routes.webhookPost(await signedRequest(body));
  assert.equal(first.status, 200);
  const second = await routes.webhookPost(await signedRequest(body));
  assert.equal(second.status, 200);
  const third = await routes.webhookPost(await signedRequest(body));
  assert.equal(third.status, 200);

  const eventCount = await routes.countWebhookEvents(ledger, "message:msg-001");
  assert.equal(eventCount, 1, "idempotent webhook_events row");

  const conversations = await ledger.batch([{
    sql: "SELECT id FROM conversations WHERE provider_session_id = ?1",
    params: ["session-test-001"],
  }]);
  const conversationId = conversations[0].rows[0]?.id;
  assert.ok(conversationId);
  const messageCount = await routes.countMessages(ledger, conversationId);
  assert.equal(messageCount, 1, "idempotent messages row");

  const storedPayload = await ledger.batch([{
    sql: "SELECT payload_json FROM webhook_events WHERE provider_event_key = ?1",
    params: ["message:msg-001"],
  }]);
  const json = storedPayload[0].rows[0]?.payload_json;
  assert.ok(typeof json === "string");
  assert.ok(!json.includes("203.0.113.50"));
  assert.ok(!json.includes("Mozilla/5.0"));
  assert.ok(!json.includes("Example ISP"));

  const leads = await ledger.batch([{
    sql: "SELECT email, lead_score, lead_temperature FROM leads WHERE email = ?1",
    params: ["lead@example.test"],
  }]);
  assert.equal(leads[0].rows.length, 1);
  assert.ok(Number(leads[0].rows[0].lead_score) >= 0);

  console.log("idempotency + persist checks passed");
}

// --- Durable event receipt remains retryable after a partial write failure ---
{
  const retryFixture = fixture({
    chatSessionId: "session-retry-001",
    message: { ...fixture().message, id: "msg-retry-001" },
  });
  let failConversationWrite = true;
  routes.setConferbotTestDatabase({
    async batch(statements) {
      if (failConversationWrite && statements.some(({ sql }) => sql.includes("INSERT INTO conversations"))) {
        failConversationWrite = false;
        throw new Error("injected conversation storage failure");
      }
      return ledger.batch(statements);
    },
  });

  const failed = await routes.webhookPost(await signedRequest(retryFixture));
  assert.equal(failed.status, 503, "partial persistence failure asks provider to retry");
  const statusAfterFailure = await ledger.batch([{
    sql: "SELECT processing_status FROM webhook_events WHERE provider_event_key = ?1",
    params: ["message:msg-retry-001"],
  }]);
  assert.equal(statusAfterFailure[0].rows[0]?.processing_status, "received");

  const retried = await routes.webhookPost(await signedRequest(retryFixture));
  assert.equal(retried.status, 200, "retry completes previously partial event");
  const statusAfterRetry = await ledger.batch([{
    sql: "SELECT processing_status FROM webhook_events WHERE provider_event_key = ?1",
    params: ["message:msg-retry-001"],
  }]);
  assert.equal(statusAfterRetry[0].rows[0]?.processing_status, "processed");
  routes.setConferbotTestDatabase(ledger);
  console.log("partial-write retry recovery checks passed");
}

// --- Oversize → 413 ---
{
  const response = await routes.webhookPost(new Request(`${origin}/api/integrations/conferbot/webhook`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "content-length": String(routes.MAX_BODY_BYTES + 1),
      "x-webhook-signature": "0".repeat(64),
      "x-webhook-event": "message.created",
    },
    body: "{}",
  }));
  assert.equal(response.status, 413);
  console.log("oversize checks passed");
}

console.log("Conferbot webhook checks passed.");
