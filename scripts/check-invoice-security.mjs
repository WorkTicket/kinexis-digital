/** Exercise the production invoice-core module without duplicating its rules. */
import assert from "node:assert/strict";
import { build } from "esbuild";

const bundle = await build({
  entryPoints: ["src/lib/invoice-core.ts"],
  bundle: true,
  format: "esm",
  platform: "node",
  write: false,
});
const source = bundle.outputFiles[0]?.contents;
assert.ok(source, "production invoice-core bundle is emitted");
const core = await import(`data:text/javascript;base64,${Buffer.from(source).toString("base64")}`);

const secret = "test-invoice-link-secret-32chars!!";
const previousSecret = "previous-invoice-link-secret-32chars!";
const id = "11111111-2222-3333-4444-555555555555";
const token = await core.signInvoiceToken(id, secret);
assert.ok(token?.startsWith("v2."), "new links carry a token format version");
assert.equal(await core.tokensMatch(id, token, secret), true, "valid v2 token verifies");
assert.equal(await core.tokensMatch(id, token, "another-invoice-link-secret-32chars!", secret), true, "previous key verifies v2 during rotation");
assert.equal(await core.tokensMatch(id, token, "wrong-invoice-link-secret-32chars!!"), false, "wrong key rejected");
assert.equal(await core.tokensMatch("99999999-9999-9999-9999-999999999999", token, secret), false, "wrong invoice rejected");
assert.equal(await core.tokensMatch(id, "0".repeat(64), secret), false, "legacy-shaped invalid token rejected");
assert.equal(await core.signInvoiceToken(id, "short-secret"), null, "weak key rejected for new links");

// Existing links used the unversioned HMAC format. Verify those during rollout
// with the configured current/previous key without emitting more legacy links.
const legacyKey = await crypto.subtle.importKey(
  "raw",
  new TextEncoder().encode(previousSecret),
  { name: "HMAC", hash: "SHA-256" },
  false,
  ["sign"],
);
const legacySignature = await crypto.subtle.sign("HMAC", legacyKey, new TextEncoder().encode(`invoice:${id}`));
const legacyToken = [...new Uint8Array(legacySignature)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
assert.equal(await core.tokensMatch(id, legacyToken, secret, previousSecret), true, "legacy token verifies with previous key");
const rotationClosesAt = Date.now() + 60_000;
assert.equal(
  await core.tokensMatch(id, token, "another-invoice-link-secret-32chars!", secret, { nowMs: rotationClosesAt - 1, previousValidUntilMs: rotationClosesAt }),
  true,
  "previous key verifies inside the rotation window",
);
assert.equal(
  await core.tokensMatch(id, token, "another-invoice-link-secret-32chars!", secret, { nowMs: rotationClosesAt, previousValidUntilMs: rotationClosesAt }),
  false,
  "previous key is refused when the rotation window has closed",
);
assert.equal(
  await core.tokensMatch(id, legacyToken, "another-invoice-link-secret-32chars!", previousSecret, { nowMs: rotationClosesAt, previousValidUntilMs: rotationClosesAt }),
  false,
  "legacy token is refused after the rotation window",
);
assert.equal(
  await core.tokensMatch(id, legacyToken, previousSecret, secret, { previousValidUntilMs: Number.NaN }),
  true,
  "current key still verifies when an unparseable window closes the previous key",
);

const base = {
  id,
  amount: "2500.00",
  currency: "USD",
  description: "Site deposit",
  status: "unpaid",
  expiresAt: new Date(Date.now() + 86_400_000).toISOString(),
  createdAt: new Date().toISOString(),
};
assert.equal(core.evaluateStoredInvoice(base).invoice?.amount, "2500.00", "payable invoice accepted");
assert.equal(core.evaluateStoredInvoice({ ...base, status: "paid" }).error, "paid");
assert.equal(core.evaluateStoredInvoice({ ...base, status: "void" }).error, "void");
assert.equal(core.evaluateStoredInvoice({ ...base, expiresAt: new Date(Date.now() - 1000).toISOString() }).error, "expired");
assert.equal(core.evaluateStoredInvoice(null, Date.now(), true).error, "not_found");
assert.equal(core.evaluateStoredInvoice(null, Date.now(), false).error, "storage");
assert.equal(core.evaluateStoredInvoice({ ...base, currency: "EUR" }).error, "void");

assert.equal(core.rejectClientAmount("99"), true, "client amount rejected");
assert.equal(core.rejectClientAmount(2500), true, "numeric client amount rejected");
assert.equal(core.rejectClientAmount(""), false, "empty amount allowed through invoice gate");
assert.equal(core.rejectClientAmount(undefined), false, "missing amount allowed through invoice gate");
assert.deepEqual(core.parseConsentCookie(null), { decided: false, analytics: false, ads: false });
assert.deepEqual(core.parseConsentCookie("v1|a=1|d=0"), { decided: true, analytics: true, ads: false });
assert.deepEqual(core.parseConsentCookie("v1|a=0|d=1"), { decided: true, analytics: false, ads: true });

console.log("Production invoice-core security checks passed.");
