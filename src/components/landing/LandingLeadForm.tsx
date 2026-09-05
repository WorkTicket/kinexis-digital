"use client";

import { Button } from "@/components/ui/Button";
import { useFormHoneypot } from "@/hooks/useFormHoneypot";
import { getAttributionPayload } from "@/lib/analytics/click-ids";
import { trackAuditLead, trackLead } from "@/lib/analytics/events";
import {
  createMetaEventId,
  stashPendingConversion,
} from "@/lib/analytics/pending-conversion";
import { navigateAfterSubmit } from "@/lib/in-app-browser";
import { isWebsiteValue } from "@/lib/website-url";
import { useRouter } from "@/i18n/navigation";
import { useRef, useState } from "react";

const THANK_YOU_DELAY_MS = 1200;

type Props = {
  serviceLabel: string;
  formTitle: string;
  formSubtitle: string;
  submitLabel: string;
  formFootnote: string;
  /** Short line next to submit. Defaults to formFootnote. */
  formCtaHint?: string;
  formCtaDetail?: string;
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
  /** Qualification fields for the Dallas audit lander. */
  qualification?: boolean;
  /** Name, email, optional URL — cold Meta traffic. */
  essentialsOnly?: boolean;
  phoneRequired?: boolean;
  businessNameRequired?: boolean;
  consentLabel?: string;
  needOptions?: { value: string; label: string }[];
  budgetOptions?: { value: string; label: string }[];
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
  formCtaHint,
  formCtaDetail,
  formDetailsPlaceholder = "Market, spend, or what you want fixed first",
  websiteRequired = false,
  conversionKind = "audit",
  landingSlug,
  id = "lp-form",
  dense = false,
  staged = false,
  qualification = false,
  essentialsOnly = false,
  phoneRequired = false,
  businessNameRequired = false,
  consentLabel,
  needOptions,
  budgetOptions,
}: Props) {
  const router = useRouter();
  const { honeypotProps, honeypotPayload } = useFormHoneypot();
  const submitLock = useRef(false);
  const [step, setStep] = useState<1 | 2>(staged ? 1 : 2);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [website, setWebsite] = useState("");
  const [consent, setConsent] = useState(false);
  const [need, setNeed] = useState("");
  const [budget, setBudget] = useState("");
  const [details, setDetails] = useState("");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const showUrlStep = staged && step === 1;
  const gap = dense ? "space-y-3" : "space-y-5";
  const gridGap = dense
    ? essentialsOnly
      ? "grid grid-cols-2 gap-x-2.5 gap-y-3"
      : "grid grid-cols-1 min-[420px]:grid-cols-2 gap-x-2.5 gap-y-3"
    : "grid gap-5 md:grid-cols-2";

  const submitLead = async () => {
    if (submitLock.current) return;
    setStatus("submitting");
    setErrorMsg("");

    if (websiteRequired && !isWebsiteValue(website)) {
      setStatus("error");
      setErrorMsg("Add the site URL you want reviewed.");
      return;
    }

    if (website.trim() && !isWebsiteValue(website)) {
      setStatus("error");
      setErrorMsg("Add a valid URL, or leave it blank if you need a site built.");
      return;
    }

    if (phoneRequired && !phone.trim()) {
      setStatus("error");
      setErrorMsg("Add a phone number so we can follow up.");
      return;
    }

    if (businessNameRequired && !businessName.trim()) {
      setStatus("error");
      setErrorMsg("Add your business name.");
      return;
    }

    if (consentLabel && !consent) {
      setStatus("error");
      setErrorMsg("Please agree to be contacted so we can schedule the consultation.");
      return;
    }

    submitLock.current = true;
    const metaEventId = createMetaEventId("Lead");

    try {
      const attribution = getAttributionPayload();
      const res = await fetch("/api/lead", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone: phone.trim() || undefined,
          businessName: businessName.trim() || undefined,
          website: website.trim() || undefined,
          websiteRequired,
          goal: details.trim() || undefined,
          need: need || undefined,
          budget: budget || undefined,
          service: serviceLabel,
          source: "landing-page",
          landingSlug,
          auditType: conversionKind === "audit" ? serviceLabel : undefined,
          metaEventId,
          ...honeypotPayload,
          ...attribution,
        }),
      });

      if (!res.ok) {
        submitLock.current = false;
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
        metaEventId,
      };
      stashPendingConversion({
        type: conversionKind,
        email,
        phone: phone.trim() || undefined,
        serviceInterest: serviceLabel,
        formType: conversionKind === "audit" ? "lead-magnet" : "landing-page",
        landingSlug,
        conversionAlreadyFired: true,
        metaEvent: "Lead",
        metaEventId,
      });
      if (conversionKind === "audit") {
        trackAuditLead({ ...conversionOpts, formType: "lead-magnet" });
      } else {
        trackLead({ ...conversionOpts, formType: "landing-page" });
      }
      setStatus("success");
      window.setTimeout(() => {
        navigateAfterSubmit(thankYouPath, router);
      }, THANK_YOU_DELAY_MS);
    } catch (err) {
      submitLock.current = false;
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
            : essentialsOnly
              ? "yoursite.com or leave blank"
              : "https://yoursite.com (blank if you need one built)"
        }
        inputMode="url"
      />
    </div>
  );

  return (
    <div>
      <div className={dense ? "mb-3" : "mb-5"}>
        <h2 className="font-[family-name:var(--font-display)] text-[1.125rem] font-semibold tracking-tight text-foreground sm:text-xl">
          {showUrlStep
            ? formTitle
            : staged
              ? "Where should we send the notes?"
              : formTitle}
        </h2>
        <p className="mt-1 max-w-xl text-sm leading-relaxed text-muted">
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
        ) : essentialsOnly ? (
          <>
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
                  Email
                </FieldLabel>
                <input
                  type="email"
                  id={`${id}-email`}
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  autoComplete="email"
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck={false}
                  placeholder="you@company.com"
                />
              </div>
            </div>
            {phoneRequired || businessNameRequired ? (
              <div className={gridGap}>
                {phoneRequired ? (
                  <div>
                    <FieldLabel htmlFor={`${id}-phone`} required>
                      Phone
                    </FieldLabel>
                    <input
                      type="tel"
                      id={`${id}-phone`}
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="form-input"
                      autoComplete="tel"
                      placeholder="(214) 555-0123"
                    />
                  </div>
                ) : null}
                {businessNameRequired ? (
                  <div>
                    <FieldLabel htmlFor={`${id}-business`} required>
                      Business name
                    </FieldLabel>
                    <input
                      type="text"
                      id={`${id}-business`}
                      required
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      className="form-input"
                      autoComplete="organization"
                      placeholder="Your business"
                    />
                  </div>
                ) : null}
              </div>
            ) : null}
            {websiteField}
            {consentLabel ? (
              <label className="lp-form-consent" htmlFor={`${id}-consent`}>
                <input
                  type="checkbox"
                  id={`${id}-consent`}
                  required
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                />
                <span>{consentLabel}</span>
              </label>
            ) : null}
          </>
        ) : qualification ? (
          <>
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
                  Email
                </FieldLabel>
                <input
                  type="email"
                  id={`${id}-email`}
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  autoComplete="email"
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck={false}
                  placeholder="you@company.com"
                />
              </div>
            </div>
            <div className={gridGap}>
              <div>
                <FieldLabel htmlFor={`${id}-phone`} required={phoneRequired}>
                  Phone
                </FieldLabel>
                <input
                  type="tel"
                  id={`${id}-phone`}
                  required={phoneRequired}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="form-input"
                  autoComplete="tel"
                  placeholder="(214) 555-0123"
                />
              </div>
              <div>
                <FieldLabel htmlFor={`${id}-website`} required={websiteRequired}>
                  Website URL
                </FieldLabel>
                <input
                  type="text"
                  id={`${id}-website`}
                  required={websiteRequired}
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="form-input"
                  autoComplete="url"
                  placeholder="Blank if you need one built"
                  inputMode="url"
                />
              </div>
            </div>
            {needOptions?.length || budgetOptions?.length ? (
              <div className={gridGap}>
                {needOptions?.length ? (
                  <div>
                    <FieldLabel htmlFor={`${id}-need`} required>
                      What do you need?
                    </FieldLabel>
                    <select
                      id={`${id}-need`}
                      required
                      value={need}
                      onChange={(e) => setNeed(e.target.value)}
                      className="form-select"
                    >
                      <option value="" disabled>
                        Select one
                      </option>
                      {needOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : null}
                {budgetOptions?.length ? (
                  <div>
                    <FieldLabel htmlFor={`${id}-budget`} required>
                      Website budget
                    </FieldLabel>
                    <select
                      id={`${id}-budget`}
                      required
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="form-select"
                    >
                      <option value="" disabled>
                        Select range
                      </option>
                      {budgetOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : null}
              </div>
            ) : null}
          </>
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
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck={false}
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

        <div className={
          qualification || essentialsOnly
            ? "flex flex-col gap-2 pt-1"
            : "flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between"
        }>
          {qualification || essentialsOnly ? (
            <>
              <Button
                type="submit"
                size="lg"
                disabled={status === "submitting"}
                className="w-full"
              >
                {status === "submitting" ? "Submitting…" : submitLabel}
              </Button>
              <p className="text-center text-xs font-medium text-muted">
                {formCtaHint ?? formFootnote}
              </p>
              {formCtaDetail ? (
                <p className="text-center text-xs leading-relaxed text-muted">
                  {formCtaDetail}
                </p>
              ) : null}
            </>
          ) : (
            <>
              <p className="text-xs text-muted sm:max-w-xs">
                {formCtaHint ?? formFootnote}
              </p>
              <Button
                type="submit"
                size="lg"
                disabled={status === "submitting"}
                className="sm:min-w-[12rem]"
              >
                {status === "submitting" ? "Submitting…" : showUrlStep ? "Continue" : submitLabel}
              </Button>
            </>
          )}
        </div>
      </form>
    </div>
  );
}
