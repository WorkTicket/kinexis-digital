/**
 * Invoice security unit checks (HMAC, gate, amount rejection, consent cookie).
 * Run: node scripts/check-invoice-security.mjs
 */
import assert from "node:assert/strict";

async function signInvoiceToken(id, secret) {
  if (!secret || secret.length < 16) return null;
  const keyBytes = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", keyBytes, new TextEncoder().encode(`invoice:${id}`));
  return [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function tokensMatch(id, token, secret) {
  if (!/^[0-9a-f]{32,128}$/i.test(token)) return false;
  const expected = await signInvoiceToken(id, secret);
  if (!expected || expected.length !== token.length) return false;
  let ok = 0;
  for (let i = 0; i < expected.length; i++) ok |= expected.charCodeAt(i) ^ token.charCodeAt(i);
  return ok === 0;
}

function evaluateStoredInvoice(invoice, nowMs = Date.now(), storageAvailable = true) {
  if (!invoice) return { error: storageAvailable ? "not_found" : "storage" };
  if (invoice.status === "paid") return { error: "paid" };
  if (invoice.status === "void") return { error: "void" };
  if (Date.parse(invoice.expiresAt) <= nowMs) return { error: "expired" };
  if (invoice.currency !== "USD") return { error: "void" };
  return { invoice };
}

function rejectClientAmount(amount) {
  return amount != null && String(amount).trim() !== "";
}

function parseConsentCookie(raw) {
  if (!raw) return { decided: false, analytics: false, ads: false };
  const v = decodeURIComponent(raw);
  if (!v.startsWith("v1|")) return { decided: false, analytics: false, ads: false };
  return {
    decided: true,
    analytics: /(?:^|\|)a=1(?:\||$)/.test(v),
    ads: /(?:^|\|)d=1(?:\||$)/.test(v),
  };
}

const secret = "test-invoice-link-secret-32chars!!";
const id = "11111111-2222-3333-4444-555555555555";
const token = await signInvoiceToken(id, secret);
assert.ok(token, "token signed");
assert.equal(await tokensMatch(id, token, secret), true, "valid token");
assert.equal(await tokensMatch(id, "0".repeat(token.length), secret), false, "wrong token");
assert.equal(await tokensMatch("99999999-9999-9999-9999-999999999999", token, secret), false, "wrong id");
assert.equal(await tokensMatch(id, "not-hex", secret), false, "bad token shape");
assert.equal(await signInvoiceToken(id, "short"), null, "short secret rejected");

const base = {
  id,
  amount: "2500.00",
  currency: "USD",
  description: "Site deposit",
  status: "unpaid",
  expiresAt: new Date(Date.now() + 86_400_000).toISOString(),
  createdAt: new Date().toISOString(),
};

assert.equal(evaluateStoredInvoice(base).invoice?.amount, "2500.00", "payable");
assert.equal(evaluateStoredInvoice({ ...base, status: "paid" }).error, "paid");
assert.equal(evaluateStoredInvoice({ ...base, status: "void" }).error, "void");
assert.equal(
  evaluateStoredInvoice({ ...base, expiresAt: new Date(Date.now() - 1000).toISOString() }).error,
  "expired",
);
assert.equal(evaluateStoredInvoice(null, Date.now(), true).error, "not_found");
assert.equal(evaluateStoredInvoice(null, Date.now(), false).error, "storage");
assert.equal(evaluateStoredInvoice({ ...base, currency: "EUR" }).error, "void");

assert.equal(rejectClientAmount("99"), true, "reject amount string");
assert.equal(rejectClientAmount(2500), true, "reject amount number");
assert.equal(rejectClientAmount(""), false, "empty amount ok for gate");
assert.equal(rejectClientAmount(undefined), false, "missing amount ok");

assert.deepEqual(parseConsentCookie(null), { decided: false, analytics: false, ads: false });
assert.deepEqual(parseConsentCookie("v1|a=0|d=0"), { decided: true, analytics: false, ads: false });
assert.deepEqual(parseConsentCookie("v1|a=1|d=0"), { decided: true, analytics: true, ads: false });
assert.deepEqual(parseConsentCookie("v1|a=1|d=1"), { decided: true, analytics: true, ads: true });
assert.deepEqual(parseConsentCookie("v1|a=0|d=1"), { decided: true, analytics: false, ads: true });

// Admin secret gate (logic mirror of /api/invoices)
function adminAuthorized(header, configured) {
  if (!configured || configured.length < 16) return { ok: false, status: 503 };
  if (header !== configured) return { ok: false, status: 401 };
  return { ok: true, status: 200 };
}
assert.equal(adminAuthorized(undefined, "").status, 503);
assert.equal(adminAuthorized("wrong", "configured-admin-secret!!").status, 401);
assert.equal(adminAuthorized("configured-admin-secret!!", "configured-admin-secret!!").status, 200);

// Token reuse after paid: same token string still verifies HMAC, but gate rejects paid status.
assert.equal(await tokensMatch(id, token, secret), true, "HMAC still verifies after pay");
assert.equal(evaluateStoredInvoice({ ...base, status: "paid" }).error, "paid", "paid blocks reuse");

console.log("Invoice + consent security checks passed.");
