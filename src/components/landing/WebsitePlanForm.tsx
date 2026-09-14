"use client";

import { Button } from "@/components/ui/Button";
import { useFormHoneypot } from "@/hooks/useFormHoneypot";
import { Link } from "@/i18n/navigation";
import { getAttributionPayload } from "@/lib/analytics/click-ids";
import { trackAuditLead, trackLead } from "@/lib/analytics/events";
import { trackLandingFunnel } from "@/lib/analytics/landing-funnel";
import {
  createMetaEventId,
  stashPendingConversion,
} from "@/lib/analytics/pending-conversion";
import { navigateAfterSubmit } from "@/lib/in-app-browser";
import { isWebsiteValue } from "@/lib/website-url";
import { useRouter } from "@/i18n/navigation";
import { useEffect, useId, useRef, useState } from "react";
import type { LandingPageEntry } from "@/content/registry/landing-pages";

const THANK_YOU_DELAY_MS = 2200;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FieldName =
  | "name"
  | "businessName"
  | "website"
  | "email"
  | "phone"
  | "budget"
  | "timeline";

type FieldErrors = Partial<Record<FieldName, string>>;

type Props = {
  page: LandingPageEntry;
  id?: string;
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
      {required ? <span aria-hidden> *</span> : null}
    </label>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="lp-web-form__error" role="alert">
      {message}
    </p>
  );
}

function firstErrorField(
  errors: FieldErrors,
  order: FieldName[],
): FieldName | null {
  return order.find((field) => errors[field]) ?? null;
}

export function WebsitePlanForm({ page, id = "lp-plan" }: Props) {
  const router = useRouter();
  const liveId = useId();
  const { honeypotProps, honeypotPayload } = useFormHoneypot();
  const twoStep = page.twoStepQualify !== false;
  const submitLock = useRef(false);
  const started = useRef(false);
  const submitted = useRef(false);
  const [step, setStep] = useState<1 | 2>(twoStep ? 1 : 2);
  const [name, setName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [website, setWebsite] = useState("");
  const [noWebsite, setNoWebsite] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState("");

  const nameId = `${id}-name`;
  const businessId = `${id}-business`;
  const websiteId = `${id}-website`;
  const noWebsiteId = `${id}-no-website`;
  const emailId = `${id}-email`;
  const phoneId = `${id}-phone`;
  const budgetId = `${id}-budget`;
  const timelineId = `${id}-timeline`;

  const markStarted = () => {
    if (started.current) return;
    started.current = true;
    trackLandingFunnel("form_start", {
      landingSlug: page.slug,
      placement: "plan-form",
    });
  };

  useEffect(() => {
    const onLeave = () => {
      if (!started.current || submitted.current) return;
      trackLandingFunnel("form_abandon", {
        landingSlug: page.slug,
        step: String(step),
      });
    };
    window.addEventListener("pagehide", onLeave);
    return () => window.removeEventListener("pagehide", onLeave);
  }, [page.slug, step]);

  const focusField = (field: FieldName) => {
    const map: Record<FieldName, string> = {
      name: nameId,
      businessName: businessId,
      website: websiteId,
      email: emailId,
      phone: phoneId,
      budget: budgetId,
      timeline: timelineId,
    };
    const node = document.getElementById(map[field]);
    if (node instanceof HTMLElement) {
      node.focus();
      node.scrollIntoView({ block: "center", behavior: "smooth" });
    }
  };

  const validateStep1 = (): FieldErrors => {
    const next: FieldErrors = {};
    if (!name.trim()) next.name = "Enter your full name.";
    if (page.businessNameRequired && !businessName.trim()) {
      next.businessName = "Enter your business name.";
    }
    if (!noWebsite && website.trim() && !isWebsiteValue(website)) {
      next.website =
        "Enter a valid website, or check the box if you don't have one yet.";
    }
    return next;
  };

  const validateStep2 = (): FieldErrors => {
    const next: FieldErrors = {};
    if (!email.trim()) next.email = "Enter your email address.";
    else if (!EMAIL_RE.test(email.trim())) {
      next.email = "Enter a valid email address.";
    }
    if (page.phoneRequired && !phone.trim()) {
      next.phone = "Enter a phone number so we can follow up.";
    }
    if (page.budgetOptions?.length && !budget) {
      next.budget = "Select a website investment range.";
    }
    if (page.timelineOptions?.length && !timeline) {
      next.timeline = "Select a timeline.";
    }
    return next;
  };

  const reportErrors = (next: FieldErrors, order: FieldName[]) => {
    setErrors(next);
    setStatus("error");
    const fields = Object.keys(next).join(",");
    trackLandingFunnel("form_validation_error", {
      landingSlug: page.slug,
      step: String(step),
      fields,
    });
    const first = firstErrorField(next, order);
    if (first) {
      requestAnimationFrame(() => focusField(first));
    }
  };

  const submitLead = async () => {
    if (submitLock.current) return;
    const next = validateStep2();
    if (Object.keys(next).length) {
      reportErrors(next, ["email", "phone", "budget", "timeline"]);
      return;
    }

    submitLock.current = true;
    setStatus("submitting");
    setFormError("");
    setErrors({});

    const metaEventId = createMetaEventId("Lead");

    try {
      const attribution = getAttributionPayload();
      const res = await fetch("/api/lead", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim() || undefined,
          businessName: businessName.trim() || undefined,
          website: noWebsite ? undefined : website.trim() || undefined,
          websiteRequired: false,
          budget: budget || undefined,
          timeline: timeline || undefined,
          service: page.serviceLabel,
          source: "landing-page",
          landingSlug: page.slug,
          auditType: page.conversionKind === "audit" ? page.serviceLabel : undefined,
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
        page.successHref ??
        (page.conversionKind === "audit" ? "/thank-you/audit" : "/thank-you");

      const conversionOpts = {
        email: email.trim(),
        phone: phone.trim() || undefined,
        serviceInterest: page.serviceLabel,
        landingSlug: page.slug,
        metaEventId,
      };
      stashPendingConversion({
        type: page.conversionKind,
        email: email.trim(),
        phone: phone.trim() || undefined,
        serviceInterest: page.serviceLabel,
        formType: page.conversionKind === "audit" ? "lead-magnet" : "landing-page",
        landingSlug: page.slug,
        conversionAlreadyFired: true,
        metaEvent: "Lead",
        metaEventId,
      });
      if (page.conversionKind === "audit") {
        trackAuditLead({ ...conversionOpts, formType: "lead-magnet" });
      } else {
        trackLead({ ...conversionOpts, formType: "landing-page" });
      }
      submitted.current = true;
      setStatus("success");
      window.setTimeout(() => {
        navigateAfterSubmit(thankYouPath, router);
      }, THANK_YOU_DELAY_MS);
    } catch (err) {
      submitLock.current = false;
      setFormError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
      setStatus("error");
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    markStarted();

    if (twoStep && step === 1) {
      const next = validateStep1();
      if (Object.keys(next).length) {
        reportErrors(next, ["name", "businessName", "website"]);
        return;
      }
      setErrors({});
      setFormError("");
      setStatus("idle");
      setStep(2);
      trackLandingFunnel("form_step1_complete", { landingSlug: page.slug });
      trackLandingFunnel("form_step2_view", { landingSlug: page.slug });
      requestAnimationFrame(() => {
        document.getElementById(emailId)?.focus();
      });
      return;
    }

    await submitLead();
  };

  if (status === "success") {
    return (
      <div className="lp-web-form__success" role="status" aria-live="polite">
        <h3 className="lp-web-form__success-title">
          {page.successTitle ?? "We've got it."}
        </h3>
        <p className="lp-web-form__success-copy">
          {page.successCopy ??
            "Your request has been received. We'll review the information you sent and follow up using the contact details you provided."}
        </p>
      </div>
    );
  }

  const stepTitle =
    twoStep && step === 1
      ? (page.formStep1Title ?? "First, tell us about the business")
      : (page.formStep2Title ?? "Where should we send your plan?");

  return (
    <div className="lp-web-form">
      <div className="lp-web-form__intro">
        {twoStep ? (
          <p className="lp-web-form__progress">
            Step {step} of 2
          </p>
        ) : null}
        <h3 className="lp-web-form__title">{stepTitle}</h3>
      </div>

      <form onSubmit={handleSubmit} className="lp-web-form__fields" noValidate>
        <input type="text" {...honeypotProps} />

        {twoStep && step === 1 ? (
          <>
            <div className="lp-web-form__field">
              <FieldLabel htmlFor={nameId} required>
                Full name
              </FieldLabel>
              <input
                type="text"
                id={nameId}
                name="name"
                required
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                  markStarted();
                }}
                className="form-input"
                autoComplete="name"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? `${nameId}-error` : undefined}
              />
              <FieldError id={`${nameId}-error`} message={errors.name} />
            </div>
            <div className="lp-web-form__field">
              <FieldLabel htmlFor={businessId} required>
                Business name
              </FieldLabel>
              <input
                type="text"
                id={businessId}
                name="organization"
                required={page.businessNameRequired}
                value={businessName}
                onChange={(event) => setBusinessName(event.target.value)}
                className="form-input"
                autoComplete="organization"
                aria-invalid={Boolean(errors.businessName)}
                aria-describedby={
                  errors.businessName ? `${businessId}-error` : undefined
                }
              />
              <FieldError
                id={`${businessId}-error`}
                message={errors.businessName}
              />
            </div>
            {noWebsite ? (
              <p id={`${websiteId}-status`} className="sr-only">
                Website skipped. You indicated you do not have a website yet.
              </p>
            ) : (
              <div className="lp-web-form__field">
                <FieldLabel htmlFor={websiteId}>Current website</FieldLabel>
                <input
                  type="text"
                  id={websiteId}
                  name="url"
                  value={website}
                  onChange={(event) => setWebsite(event.target.value)}
                  className="form-input"
                  autoComplete="url"
                  inputMode="url"
                  aria-invalid={Boolean(errors.website)}
                  aria-describedby={
                    errors.website ? `${websiteId}-error` : undefined
                  }
                />
                <FieldError id={`${websiteId}-error`} message={errors.website} />
              </div>
            )}
            <label className="lp-web-form__check" htmlFor={noWebsiteId}>
              <input
                type="checkbox"
                id={noWebsiteId}
                checked={noWebsite}
                onChange={(event) => {
                  setNoWebsite(event.target.checked);
                  if (event.target.checked) {
                    setWebsite("");
                    setErrors((current) => {
                      if (!current.website) return current;
                      const next = { ...current };
                      delete next.website;
                      return next;
                    });
                  }
                }}
              />
              <span>{page.noWebsiteLabel ?? "I don't have a website yet"}</span>
            </label>
          </>
        ) : (
          <>
            {twoStep ? (
              <p className="lp-web-form__resume">
                {businessName.trim() ? (
                  <>
                    Plan for{" "}
                    <span className="lp-web-form__resume-name">
                      {businessName.trim()}
                    </span>
                  </>
                ) : (
                  "New website. No URL yet."
                )}
                {" · "}
                <button
                  type="button"
                  className="lp-web-form__back"
                  onClick={() => {
                    setStatus("idle");
                    setFormError("");
                    setErrors({});
                    setStep(1);
                    requestAnimationFrame(() => {
                      document.getElementById(nameId)?.focus();
                    });
                  }}
                >
                  Back
                </button>
              </p>
            ) : null}
            <div className="lp-web-form__field">
              <FieldLabel htmlFor={emailId} required>
                Email
              </FieldLabel>
              <input
                type="email"
                id={emailId}
                name="email"
                required
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  markStarted();
                }}
                className="form-input"
                autoComplete="email"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                inputMode="email"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? `${emailId}-error` : undefined}
              />
              <FieldError id={`${emailId}-error`} message={errors.email} />
            </div>
            <div className="lp-web-form__field">
              <FieldLabel htmlFor={phoneId} required={page.phoneRequired}>
                Phone
              </FieldLabel>
              <input
                type="tel"
                id={phoneId}
                name="phone"
                required={page.phoneRequired}
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                className="form-input"
                autoComplete="tel"
                inputMode="tel"
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? `${phoneId}-error` : undefined}
              />
              <FieldError id={`${phoneId}-error`} message={errors.phone} />
            </div>
            {page.budgetOptions?.length ? (
              <fieldset
                className="form-choice-set lp-web-form__fieldset"
                aria-invalid={Boolean(errors.budget)}
                aria-describedby={errors.budget ? `${budgetId}-error` : undefined}
              >
                <legend className="form-label">
                  {page.investmentLabel ?? "Website investment"}
                  <span aria-hidden> *</span>
                </legend>
                <div className="lp-web-form__choices" id={budgetId}>
                  {page.budgetOptions.map((option) => (
                    <label key={option.value} className="lp-web-form__choice">
                      <input
                        type="radio"
                        name={`${id}-budget`}
                        value={option.value}
                        checked={budget === option.value}
                        onChange={() => setBudget(option.value)}
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
                <FieldError id={`${budgetId}-error`} message={errors.budget} />
              </fieldset>
            ) : null}
            {page.timelineOptions?.length ? (
              <fieldset
                className="form-choice-set lp-web-form__fieldset"
                aria-invalid={Boolean(errors.timeline)}
                aria-describedby={
                  errors.timeline ? `${timelineId}-error` : undefined
                }
              >
                <legend className="form-label">
                  {page.timelineLabel ?? "Timeline"}
                  <span aria-hidden> *</span>
                </legend>
                <div className="lp-web-form__choices" id={timelineId}>
                  {page.timelineOptions.map((option) => (
                    <label key={option.value} className="lp-web-form__choice">
                      <input
                        type="radio"
                        name={`${id}-timeline`}
                        value={option.value}
                        checked={timeline === option.value}
                        onChange={() => setTimeline(option.value)}
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
                <FieldError
                  id={`${timelineId}-error`}
                  message={errors.timeline}
                />
              </fieldset>
            ) : null}
          </>
        )}

        <div className="lp-web-form__status" aria-live="assertive" id={liveId}>
          {formError ? (
            <p className="lp-web-form__error lp-web-form__error--form" role="alert">
              {formError}
            </p>
          ) : null}
        </div>

        <Button
          type="submit"
          size="lg"
          className="lp-web-form__submit"
          disabled={status === "submitting"}
          aria-busy={status === "submitting"}
          arrow={status !== "submitting"}
        >
          {status === "submitting"
            ? "Sending…"
            : twoStep && step === 1
              ? (page.continueLabel ?? "Continue")
              : page.submitLabel}
        </Button>

        {twoStep && step === 2 ? (
          <p className="lp-web-form__privacy">
            {page.privacyMicrocopy ?? page.formFootnote}{" "}
            <Link href="/privacy">Privacy Policy</Link>.
          </p>
        ) : (
          <p className="lp-web-form__hint">{page.formCtaHint}</p>
        )}
      </form>
    </div>
  );
}
