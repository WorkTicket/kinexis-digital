/**
 * Offline payment ledger reconciliation (no network, no secrets).
 * Finds internal inconsistencies between invoices and payment_events rows.
 * Owner-run remote export feeds these helpers; CI uses fixtures only.
 */

export type ReconInvoiceRow = {
  id: string;
  status: "unpaid" | "paid" | "void";
  amount_minor: number;
  currency: string;
  expires_at: string;
  paypal_order_id: string | null;
  paypal_capture_id: string | null;
  paid_at: string | null;
};

export type ReconEventRow = {
  event_id: string;
  event_type: string;
  invoice_id: string | null;
  paypal_order_id: string | null;
  paypal_capture_id: string | null;
  amount_minor: number | null;
  currency: string | null;
  outcome: "applied" | "ignored" | "rejected";
  received_at: string;
};

export type ReconFinding = {
  code:
    | "paid_missing_capture"
    | "paid_missing_order"
    | "paid_missing_paid_at"
    | "paid_without_applied_event"
    | "applied_event_invoice_mismatch"
    | "rejected_capture_event"
    | "unpaid_past_expiry_with_order"
    | "capture_on_unpaid";
  severity: "alert" | "warn";
  invoiceId?: string;
  eventId?: string;
  detail: string;
};

export type ReconReport = {
  checkedAt: string;
  invoiceCount: number;
  eventCount: number;
  findings: ReconFinding[];
};

function isPaid(row: ReconInvoiceRow): boolean {
  return row.status === "paid";
}

export function reconcilePaymentLedger(
  invoices: ReconInvoiceRow[],
  events: ReconEventRow[],
  nowIso: string,
): ReconReport {
  const findings: ReconFinding[] = [];
  const nowMs = Date.parse(nowIso);
  const appliedByInvoice = new Map<string, ReconEventRow[]>();

  for (const event of events) {
    if (event.outcome === "rejected" && event.paypal_capture_id) {
      findings.push({
        code: "rejected_capture_event",
        severity: "alert",
        eventId: event.event_id,
        invoiceId: event.invoice_id ?? undefined,
        detail: `Rejected PayPal capture event ${event.event_id} (${event.event_type}).`,
      });
    }
    if (event.outcome === "applied" && event.invoice_id) {
      const list = appliedByInvoice.get(event.invoice_id) ?? [];
      list.push(event);
      appliedByInvoice.set(event.invoice_id, list);
    }
  }

  for (const invoice of invoices) {
    if (isPaid(invoice)) {
      if (!invoice.paypal_capture_id) {
        findings.push({
          code: "paid_missing_capture",
          severity: "alert",
          invoiceId: invoice.id,
          detail: "Paid invoice has no paypal_capture_id.",
        });
      }
      if (!invoice.paypal_order_id) {
        findings.push({
          code: "paid_missing_order",
          severity: "alert",
          invoiceId: invoice.id,
          detail: "Paid invoice has no paypal_order_id.",
        });
      }
      if (!invoice.paid_at) {
        findings.push({
          code: "paid_missing_paid_at",
          severity: "warn",
          invoiceId: invoice.id,
          detail: "Paid invoice has no paid_at timestamp.",
        });
      }
      const applied = appliedByInvoice.get(invoice.id) ?? [];
      if (applied.length === 0) {
        findings.push({
          code: "paid_without_applied_event",
          severity: "alert",
          invoiceId: invoice.id,
          detail: "Paid invoice has no applied payment_events row.",
        });
      } else {
        for (const event of applied) {
          const orderOk = !event.paypal_order_id || event.paypal_order_id === invoice.paypal_order_id;
          const captureOk =
            !event.paypal_capture_id || event.paypal_capture_id === invoice.paypal_capture_id;
          const amountOk =
            event.amount_minor === null || event.amount_minor === invoice.amount_minor;
          const currencyOk = !event.currency || event.currency === invoice.currency;
          if (!orderOk || !captureOk || !amountOk || !currencyOk) {
            findings.push({
              code: "applied_event_invoice_mismatch",
              severity: "alert",
              invoiceId: invoice.id,
              eventId: event.event_id,
              detail: "Applied event does not match invoice order/capture/amount/currency.",
            });
          }
        }
      }
    } else if (invoice.status === "unpaid") {
      if (invoice.paypal_capture_id) {
        findings.push({
          code: "capture_on_unpaid",
          severity: "alert",
          invoiceId: invoice.id,
          detail: "Unpaid invoice has a paypal_capture_id.",
        });
      }
      const expiresMs = Date.parse(invoice.expires_at);
      if (
        Number.isFinite(nowMs) &&
        Number.isFinite(expiresMs) &&
        expiresMs < nowMs &&
        invoice.paypal_order_id
      ) {
        findings.push({
          code: "unpaid_past_expiry_with_order",
          severity: "warn",
          invoiceId: invoice.id,
          detail: "Unpaid invoice is past expires_at but still has a PayPal order id.",
        });
      }
    }
  }

  return {
    checkedAt: nowIso,
    invoiceCount: invoices.length,
    eventCount: events.length,
    findings,
  };
}

export function formatReconReport(report: ReconReport): string {
  const alerts = report.findings.filter((f) => f.severity === "alert");
  const warns = report.findings.filter((f) => f.severity === "warn");
  const lines = [
    `Payment reconciliation @ ${report.checkedAt}`,
    `invoices=${report.invoiceCount} events=${report.eventCount} alerts=${alerts.length} warns=${warns.length}`,
  ];
  for (const finding of report.findings) {
    lines.push(
      `[${finding.severity}] ${finding.code}` +
        (finding.invoiceId ? ` invoice=${finding.invoiceId}` : "") +
        (finding.eventId ? ` event=${finding.eventId}` : "") +
        ` — ${finding.detail}`,
    );
  }
  return lines.join("\n");
}

export function reconHasAlerts(report: ReconReport): boolean {
  return report.findings.some((f) => f.severity === "alert");
}
