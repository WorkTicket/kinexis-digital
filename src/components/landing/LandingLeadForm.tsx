"use client";

import { Button } from "@/components/ui/Button";
import { useFormHoneypot } from "@/hooks/useFormHoneypot";
import { getAttributionPayload } from "@/lib/analytics/click-ids";
import { trackAuditLead, trackLead } from "@/lib/analytics/events";
import { stashPendingConversion } from "@/lib/analytics/pending-conversion";
import { isWebsiteValue } from "@/lib/website-url";
import { useRouter } from "@/i18n/navigation";
import { useState } from "react";

const THANK_YOU_DELAY_MS = 1200;

type Props = {
  serviceLabel: string;
  formTitle: string;
  formSubtitle: string;
  submitLabel: string;
  formFootnote: string;
  formDetailsPlaceholder?: string;
  websiteRequired?: boolean;
  /** Audit-style offers fire the audit conversion label on /thank-you/audit. */
  conversionKind?: "lead" | "audit";
  /** Paid lander slug for per-page Ads / Meta / GA4 conversion params. */
  landingSlug?: string;
  id?: string;
  /** Tighter spacing for a form sitting in the hero. */
  dense?: boolean;
  /** Website URL first; name and email become step 2. */
  staged?: boolean;
};

function FieldLabel({
  htmlFor,
  children,
  required = false,
}: {
  htmlFor: string;
  children: string;
  required?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className="form-label">
      {children}
      {required ? (
        <span className="text-foreground"> *</span>
      ) : (
        <span className="form-label__optional"> (optional)</span>
      )}
    </label>
  );
}

export function LandingLeadForm({
  serviceLabel,
  formTitle,
  formSubtitle,
  submitLabel,
  formFootnote,
  formDetailsPlaceholder = "Market, spend, or what you want fixed first",
  websiteRequired = false,
  conversionKind = "audit",
  landingSlug,
  id = "lp-form",
  dense = false,
  staged = false,
}: Props) {
  const router = useRouter();
  const { honeypotProps, honeypotPayload } = useFormHoneypot();
  const [step, setStep] = useState<1 | 2>(staged ? 1 : 2);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [details, setDetails] = useState("");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const showUrlStep = staged && step === 1;
  const gap = dense ? "space-y-3.5" : "space-y-5";
  const gridGap = dense ? "grid gap-3.5 md:grid-cols-2" : "grid gap-5 md:grid-cols-2";

  const submitLead = async () => {
    setStatus("submitting");
    setErrorMsg("");

    if (websiteRequired && !isWebsiteValue(website)) {
      setStatus("error");
      setErrorMsg("Add the site URL you want reviewed.");
      return;
    }

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
          websiteRequired,
          goal: details.trim() || undefined,
          service: serviceLabel,
          source: "landing-page",
          landingSlug,
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

      const conversionOpts = {
        email,
        phone: phone.trim() || undefined,
        serviceInterest: serviceLabel,
        landingSlug,
      };
      if (conversionKind === "audit") {
        trackAuditLead({ ...conversionOpts, formType: "lead-magnet" });
      } else {
        trackLead({ ...conversionOpts, formType: "landing-page" });
      }

      stashPendingConversion({
        type: conversionKind,
        email,
        phone: phone.trim() || undefined,
        serviceInterest: serviceLabel,
        formType: conversionKind === "audit" ? "lead-magnet" : "landing-page",
        landingSlug,
        conversionAlreadyFired: true,
      });
      setStatus("success");
      window.setTimeout(() => {
        router.push(thankYouPath);
      }, THANK_YOU_DELAY_MS);
    } catch (err) {
      setErrorMsg(
        err instanceof Error ? err.message : "Something went wrong. Please try again.",
      );
      setStatus("error");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (showUrlStep) {
      setErrorMsg("");
      if (website.trim() && !isWebsiteValue(website)) {
        setStatus("error");
        setErrorMsg("Add a valid URL, or leave it blank if you need a site built.");
        return;
      }
      setStatus("idle");
      setStep(2);
      return;
    }

    await submitLead();
  };

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex flex-col items-center justify-center gap-3 py-16 text-center"
      >
        <p className="text-xl font-semibold text-foreground">
          Got it. We will follow up within one business day.
        </p>
      </div>
    );
  }

  const websiteField = (
    <div>
      <FieldLabel htmlFor={`${id}-website`} required={websiteRequired}>
        Website
      </FieldLabel>
      <input
        type="text"
        id={`${id}-website`}
        required={websiteRequired}
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        className="form-input"
        autoComplete="url"
        placeholder={
          websiteRequired
            ? "https://yoursite.com"
            : "https://yoursite.com (blank if you need one built)"
        }
        inputMode="url"
      />
    </div>
  );

  return (
    <div>
      <div className={dense ? "mb-4" : "mb-5"}>
        <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight text-foreground">
          {showUrlStep ? formTitle : staged ? "Where should we send the notes?" : formTitle}
        </h2>
        <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-muted">
          {showUrlStep
            ? formSubtitle
            : staged
              ? "Name and work email. Phone is optional."
              : formSubtitle}
        </p>
      </div>

      <form onSubmit={handleSubmit} className={`relative ${gap}`}>
        <input type="text" {...honeypotProps} />

        {showUrlStep ? (
          websiteField
        ) : (
          <>
            {staged ? (
              <p className="text-sm text-muted">
                {website.trim() ? (
                  <>
                    Reviewing{" "}
                    <span className="text-foreground">{website.trim()}</span>
                  </>
                ) : (
                  <span className="text-foreground">New website. No URL yet.</span>
                )}
                {" · "}
                <button
                  type="button"
                  className="underline underline-offset-2 hover:text-foreground"
                  onClick={() => {
                    setStatus("idle");
                    setErrorMsg("");
                    setStep(1);
                  }}
                >
                  {website.trim() ? "Change URL" : "Add a URL"}
                </button>
              </p>
            ) : null}

            <div className={gridGap}>
              <div>
                <FieldLabel htmlFor={`${id}-name`} required>
                  Name
                </FieldLabel>
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
                <FieldLabel htmlFor={`${id}-email`} required>
                  Work email
                </FieldLabel>
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
            </div>

            {staged ? (
              <div>
                <FieldLabel htmlFor={`${id}-phone`}>Phone</FieldLabel>
                <input
                  type="tel"
                  id={`${id}-phone`}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="form-input"
                  autoComplete="tel"
                  placeholder="(555) 123-4567"
                />
              </div>
            ) : (
              <div className={gridGap}>
                {websiteField}
                <div>
                  <FieldLabel htmlFor={`${id}-phone`}>Phone</FieldLabel>
                  <input
                    type="tel"
                    id={`${id}-phone`}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-input"
                    autoComplete="tel"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>
            )}

            <div>
              <FieldLabel htmlFor={`${id}-details`}>Details</FieldLabel>
              <textarea
                id={`${id}-details`}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className="form-textarea"
                placeholder={formDetailsPlaceholder}
                rows={dense ? 2 : 3}
                maxLength={1000}
              />
            </div>
          </>
        )}

        <div className={dense ? "min-h-0" : "min-h-[2.75rem]"}>
          {status === "error" && errorMsg ? (
            <p
              role="alert"
              aria-live="assertive"
              className="rounded-[var(--radius-sm)] border border-red-500/30 bg-red-500/10 px-3 py-2.5 text-sm text-red-600 dark:text-red-400"
            >
              {errorMsg}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted sm:max-w-xs">{formFootnote}</p>
          <Button
            type="submit"
            size="lg"
            disabled={status === "submitting"}
            className="sm:min-w-[12rem]"
          >
            {status === "submitting" ? "Submitting…" : showUrlStep ? "Continue" : submitLabel}
          </Button>
        </div>
      </form>
    </div>
  );
}
