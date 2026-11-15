"use client";

import { useEffect, useState, type FormEvent } from "react";
import { SITE, telHref } from "@/lib/site";

export type InvoicePayProps = {
  status: "cancelled" | "error" | null;
  invoiceId: string | null;
  token: string | null;
  amount: string | null;
  description: string | null;
  gateError: string | null;
};

export default function InvoicePay({
  status,
  invoiceId,
  token,
  amount,
  description,
  gateError,
}: InvoicePayProps) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!status && !gateError && !invoiceId) return;
    document.getElementById("invoice")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [status, gateError, invoiceId]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!invoiceId || !token || !amount) return;
    const form = event.currentTarget;
    setError("");
    let firstBad: HTMLInputElement | undefined;
    for (const field of form.querySelectorAll<HTMLInputElement>("[required]")) {
      const ok = !!field.value.trim() && field.checkValidity();
      field.classList.toggle("invalid", !ok);
      field.setAttribute("aria-invalid", String(!ok));
      if (!ok && !firstBad) firstBad = field;
    }
    if (firstBad) {
      setError("Please fill in the highlighted fields.");
      firstBad.focus();
      return;
    }
    const data = new FormData(form);
    if (String(data.get("_hp") ?? "").trim()) return;
    setBusy(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          invoiceId,
          token,
          name: String(data.get("name") ?? ""),
          email: String(data.get("email") ?? ""),
          company: String(data.get("organization") ?? ""),
          _hp: String(data.get("_hp") ?? ""),
          idempotencyKey: crypto.randomUUID(),
        }),
      });
      const body = await res.json().catch(() => ({})) as { url?: string; error?: string; ok?: boolean };
      if (res.ok && typeof body.url === "string") {
        window.location.assign(body.url);
        return;
      }
      if (res.ok && body.ok) return;
      setError(body.error || `We couldn’t start PayPal. Call ${SITE.phone} or email ${SITE.email}.`);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  if (gateError) {
    return (
      <div className="pay-sheet" data-island="">
        <h2>Payment link needed</h2>
        <p className="pay-banner is-alert" role="alert">{gateError}</p>
        <p className="muted">
          Open the secure link from your invoice email, or contact us at{" "}
          <a href={telHref(SITE.phone)}>{SITE.phone}</a> /{" "}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
        </p>
      </div>
    );
  }

  if (!invoiceId || !token || !amount || !description) {
    return (
      <div className="pay-sheet" data-island="">
        <h2>Pay with your invoice link</h2>
        <p className="muted">
          Amounts are locked to an approved invoice. Use the payment link we sent you, or ask us for a new one.
          Manual amount entry is no longer available.
        </p>
        <p>
          <a className="btn btn--primary" href={`mailto:${SITE.email}?subject=Invoice%20payment%20link`}>
            Request a payment link
          </a>
        </p>
      </div>
    );
  }

  return (
    <div className="pay-sheet" data-island="">
      <h2>Payment details</h2>
      <p className="muted">The amount and description come from your approved invoice and cannot be changed here.</p>
      {status === "cancelled" && <p className="pay-banner" role="status">PayPal checkout was cancelled. Your card was not charged.</p>}
      {status === "error" && (
        <p className="pay-banner is-alert" role="alert">
          PayPal couldn’t finish that payment. Nothing was charged. Try again, or call {SITE.phone}.
        </p>
      )}
      <form className="form pay-form" noValidate onSubmit={submit} onInput={(event) => (event.target as HTMLElement).classList.remove("invalid")}>
        <input type="text" name="_hp" tabIndex={-1} autoComplete="off" aria-hidden="true" className="pay-hp" />
        <label>
          <span>Amount</span>
          <input id="pay-amount" value={`$${amount} USD`} readOnly disabled />
          <span className="hint">Set by your invoice. Not editable.</span>
        </label>
        <label>
          <span>What this payment is for</span>
          <input id="pay-description" value={description} readOnly disabled />
        </label>
        <div className="pay-form__row">
          <label>
            <span>Your name <span aria-hidden="true">*</span></span>
            <input id="pay-name" name="name" autoComplete="name" required maxLength={120} placeholder="Jordan Lee" />
          </label>
          <label>
            <span>Your email <span aria-hidden="true">*</span></span>
            <input id="pay-email" name="email" type="email" autoComplete="email" required maxLength={200} placeholder="you@company.com" />
          </label>
        </div>
        <label>
          <span>Company <span className="hint">(optional)</span></span>
          <input id="pay-company" name="organization" autoComplete="organization" maxLength={120} />
        </label>
        {error && <p className="form__msg is-error" role="alert">{error}</p>}
        <div className="pay-form__actions">
          <p>You pay on PayPal. We never see your card number or PayPal password.</p>
          <button className="btn btn--primary btn--lg" type="submit" disabled={busy}>
            {busy ? "Opening PayPal…" : "Continue to PayPal"}
          </button>
        </div>
      </form>
    </div>
  );
}
