"use client";

import { Button } from "@/components/ui/Button";
import { useFormHoneypot } from "@/hooks/useFormHoneypot";
import { getAttributionPayload } from "@/lib/analytics/click-ids";
import { stashPendingConversion } from "@/lib/analytics/pending-conversion";
import { useRouter } from "@/i18n/navigation";
import { useState } from "react";

type Props = {
  serviceLabel: string;
  formTitle: string;
  formSubtitle: string;
  submitLabel: string;
  formFootnote: string;
  /** Audit-style offers fire the audit conversion label on /thank-you/audit. */
  conversionKind?: "lead" | "audit";
  id?: string;
};

export function LandingLeadForm({
  serviceLabel,
  formTitle,
  formSubtitle,
  submitLabel,
  formFootnote,
  conversionKind = "audit",
  id = "lp-form",
}: Props) {
  const router = useRouter();
  const { honeypotProps, honeypotPayload } = useFormHoneypot();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [details, setDetails] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    try {
      const attribution = getAttributionPayload();
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone: phone.trim() || undefined,
          website: website.trim() || undefined,
          goal: details.trim() || undefined,
          service: serviceLabel,
          source: "landing-page",
          auditType: conversionKind === "audit" ? serviceLabel : undefined,
          ...honeypotPayload,
          ...attribution,
        }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      const thankYouPath =
        conversionKind === "audit" ? "/thank-you/audit" : "/thank-you";

      stashPendingConversion({
        type: conversionKind,
        email,
        phone: phone.trim() || undefined,
        serviceInterest: serviceLabel,
        formType: conversionKind === "audit" ? "lead-magnet" : "landing-page",
      });
      router.push(thankYouPath);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  return (
    <div
      id={id}
      className="rounded-2xl bg-[color-mix(in_oklab,var(--foreground)_4%,transparent)] p-5 sm:p-6 md:p-7"
    >
      <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight text-foreground">
        {formTitle}
      </h2>
      <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-muted">{formSubtitle}</p>

      <form onSubmit={handleSubmit} className="relative mt-6 space-y-5">
        <input type="text" {...honeypotProps} />
        <div>
          <label htmlFor={`${id}-name`} className="form-label">
            Name <span className="text-foreground">*</span>
          </label>
          <input
            type="text"
            id={`${id}-name`}
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-input"
            autoComplete="name"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor={`${id}-email`} className="form-label">
            Work email <span className="text-foreground">*</span>
          </label>
          <input
            type="email"
            id={`${id}-email`}
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
            autoComplete="email"
            placeholder="you@company.com"
          />
        </div>
        <div>
          <label htmlFor={`${id}-phone`} className="form-label">
            Phone
          </label>
          <input
            type="tel"
            id={`${id}-phone`}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="form-input"
            autoComplete="tel"
            placeholder="+1…"
          />
        </div>
        <div>
          <label htmlFor={`${id}-website`} className="form-label">
            Website
          </label>
          <input
            type="text"
            id={`${id}-website`}
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="form-input"
            autoComplete="url"
            placeholder="https://yoursite.com"
            inputMode="url"
          />
        </div>
        <div>
          <label htmlFor={`${id}-details`} className="form-label">
            Details
          </label>
          <textarea
            id={`${id}-details`}
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="form-textarea !min-h-[4.5rem]"
            placeholder="Market, spend, or what you want fixed first"
            rows={2}
            maxLength={1000}
          />
        </div>

        {status === "error" ? (
          <p
            role="alert"
            aria-live="assertive"
            className="rounded-[var(--radius-sm)] border border-red-500/30 bg-red-500/10 px-3 py-2.5 text-sm text-red-600 dark:text-red-400"
          >
            {errorMsg}
          </p>
        ) : null}

        <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted sm:max-w-xs">{formFootnote}</p>
          <Button
            type="submit"
            size="lg"
            disabled={status === "submitting"}
            className="sm:min-w-[12rem]"
          >
            {status === "submitting" ? "Submitting…" : submitLabel}
          </Button>
        </div>
      </form>
    </div>
  );
}
