"use client";

import dynamic from "next/dynamic";
import { AlertCircle, Check, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { CallLink } from "@/components/analytics/CallLink";
import { useFormHoneypot } from "@/hooks/useFormHoneypot";
import { Link } from "@/i18n/navigation";
import { getAttributionPayload } from "@/lib/analytics/click-ids";
import { trackAuditLead, trackLead } from "@/lib/analytics/events";
import {
  LEAD_FIELD_CODES,
  trackLandingFunnel,
} from "@/lib/analytics/landing-funnel";
import {
  createMetaEventId,
  stashPendingConversion,
} from "@/lib/analytics/pending-conversion";
import { qualifiesForProjectCall } from "@/lib/project-call";
import {
  LEAD_LIMITS,
  LEAD_MESSAGES,
  formatPhoneForDisplay,
  normalizeEmail,
  normalizePhone,
  validateLeadStep1,
  validateLeadStep2,
  type LeadErrors,
  type LeadField,
} from "@/lib/lead-validation";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useId, useRef, useState } from "react";
import type { LandingPageOption } from "@/content/registry/landing-pages";
import type { WebsitePlanFormPage } from "@/lib/website-plan-form-page";
import type { Locale } from "@/i18n/routing";

const ProjectCallCalendar = dynamic(
  () =>
    import("@/components/landing/WebsiteProjectCall").then(
      (mod) => mod.WebsiteProjectCall,
    ),
  { ssr: false },
);

const STEP1: LeadField[] = ["role", "industry", "budget", "timeline"];
const STEP2: LeadField[] = ["name", "phone", "email", "businessName", "website"];
const REQUIRED_CONTACT: LeadField[] = ["name", "phone", "email"];
const EMPTY = {
  role: "",
  industry: "",
  budget: "",
  timeline: "",
  name: "",
  phone: "",
  email: "",
  businessName: "",
  website: "",
};

function optionLabel(options: LandingPageOption[] | undefined, value: string) {
  return options?.find((option) => option.value === value)?.label ?? value;
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="lp-web-form__error">
      <AlertCircle size={16} aria-hidden />
      {message}
    </p>
  );
}

type Props = {
  page: WebsitePlanFormPage;
  id?: string;
};

export function WebsitePlanForm({ page, id = "lp-plan" }: Props) {
  const locale = useLocale() as Locale;
  const t = useTranslations("a11y.websiteLeadForm");
  const liveId = useId();
  const summaryRef = useRef<HTMLDivElement>(null);
  const { honeypotProps, honeypotPayload } = useFormHoneypot();
  const submitLock = useRef(false);
  const started = useRef(false);
  const submitted = useRef(false);
  const abandoned = useRef(false);
  const viewed = useRef(false);
  const lastField = useRef<LeadField | null>(null);
  const [step, setStep] = useState<1 | 2>(1);
  const [values, setValues] = useState(EMPTY);
  const valuesRef = useRef(values);
  const stepRef = useRef(step);
  const touched = useRef(new Set<LeadField>());
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errors, setErrors] = useState<LeadErrors>({});
  const [showSummary, setShowSummary] = useState(false);
  const [formError, setFormError] = useState<"server" | "rate" | "">("");
  const { name, email, phone, businessName, website, role, industry, budget, timeline } =
    values;

  // Existing content values in both languages; POST retains its original notification labels.
  const websiteStatus = website.trim() ? "outdated" : "none";
  const fieldId = (field: LeadField) => `${id}-${field}`;
  const fieldLabel = (field: LeadField): string =>
    ({
      role: page.roleLabel ?? "Your role",
      industry: page.industryLabel ?? "Type of work",
      budget: page.investmentLabel ?? "Budget",
      timeline: page.timelineLabel ?? "Timeline",
      name: t("name"),
      phone: t("phone"),
      email: t("email"),
      businessName: t("businessName"),
      website: t("website"),
    })[field];
  const localizedErrors = (next: LeadErrors): LeadErrors =>
    Object.fromEntries(
      Object.entries(next).map(([field, message]) => [
        field,
        message === LEAD_MESSAGES[field as LeadField]
          ? t(`errors.${field}`)
          : message,
      ]),
    );
  const validate = (next = values) => ({
    ...validateLeadStep1(next),
    ...validateLeadStep2(next),
  });

  const focusField = (field: LeadField) => {
    const node = document.getElementById(fieldId(field));
    const input = node?.matches("input,select")
      ? node
      : node?.querySelector("input,select");
    if (input instanceof HTMLElement) input.focus({ preventScroll: true });
  };

  const update = (field: LeadField, value: string) => {
    lastField.current = field;
    const next = { ...values, [field]: value };
    valuesRef.current = next;
    setValues(next);
    if (errors[field] || touched.current.has(field)) {
      const message = localizedErrors(validate(next))[field];
      setErrors((prev) => ({ ...prev, [field]: message }));
    }
    if (STEP1.includes(field) && !started.current) {
      started.current = true;
      trackLandingFunnel("form_start", {
        landingSlug: page.slug,
        placement: "plan-form",
      });
    }
  };

  const blur = (field: LeadField) => {
    touched.current.add(field);
    let next = values;
    if (field === "phone") {
      const normalized = normalizePhone(phone);
      if (normalized) {
        next = {
          ...values,
          phone:
            formatPhoneForDisplay(normalized.e164) +
            (normalized.ext ? ` ext ${normalized.ext}` : ""),
        };
        setValues(next);
        valuesRef.current = next;
      }
    }
    setErrors((prev) => ({
      ...prev,
      [field]: localizedErrors(validate(next))[field],
    }));
  };

  useEffect(() => {
    const target = document.getElementById("lp-form");
    if (!target || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        document.documentElement.classList.toggle(
          "lp-lead-form-visible",
          entry.isIntersecting,
        );
        const viewportHeight = entry.rootBounds?.height ?? window.innerHeight;
        if (
          !viewed.current &&
          entry.isIntersecting &&
          (entry.intersectionRatio >= 0.5 ||
            entry.intersectionRect.height >= viewportHeight * 0.5)
        ) {
          viewed.current = true;
          trackLandingFunnel("form_view", { landingSlug: page.slug });
        }
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    observer.observe(target);
    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("lp-lead-form-visible");
    };
  }, [page.slug]);

  useEffect(() => {
    const onLeave = () => {
      if (!started.current || submitted.current || abandoned.current) return;
      abandoned.current = true;
      trackLandingFunnel("form_abandon", {
        landingSlug: page.slug,
        form_step: String(stepRef.current),
        step: String(stepRef.current),
        last_field: lastField.current
          ? LEAD_FIELD_CODES[lastField.current]
          : "none",
        filled_count: String(
          Object.values(valuesRef.current).filter((value) => value.trim())
            .length,
        ),
      });
    };
    const onVisibility = () => {
      if (document.visibilityState === "hidden") onLeave();
    };
    window.addEventListener("pagehide", onLeave);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.removeEventListener("pagehide", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [page.slug]);

  useEffect(() => {
    if (status !== "success") return;
    document
      .getElementById("lp-form")
      ?.scrollIntoView({ block: "start", behavior: "smooth" });
  }, [status]);

  const reportErrors = (next: LeadErrors, errorStep = step) => {
    const fields = [...STEP1, ...STEP2].filter((field) => next[field]);
    setErrors(localizedErrors(next));
    setShowSummary(true);
    setStatus("error");
    setStep(errorStep);
    stepRef.current = errorStep;
    const codes = fields.map((field) => LEAD_FIELD_CODES[field]).join("|");
    trackLandingFunnel("form_validation_error", {
      landingSlug: page.slug,
      form_step: String(errorStep),
      step: String(errorStep),
      error_fields: codes,
      fields: codes,
      error_count: String(fields.length),
    });
    requestAnimationFrame(() => {
      summaryRef.current?.scrollIntoView({ block: "start", behavior: "smooth" });
      if (fields[0]) focusField(fields[0]);
    });
  };

  const submitLead = async () => {
    if (submitLock.current) return;
    const firstErrors = validateLeadStep1(values);
    if (Object.keys(firstErrors).length) {
      reportErrors(firstErrors, 1);
      return;
    }
    const next = validateLeadStep2(values);
    if (Object.keys(next).length) {
      reportErrors(next, 2);
      return;
    }

    submitLock.current = true;
    setStatus("submitting");
    setFormError("");
    setErrors({});
    setShowSummary(false);

    const metaEventId = createMetaEventId("Lead");
    let responseStatus = "network";
    try {
      const attribution = getAttributionPayload();
      const normalizedPhone = normalizePhone(phone)!;
      const res = await fetch("/api/lead", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: normalizeEmail(email),
          phone:
            normalizedPhone.e164 +
            (normalizedPhone.ext ? ` ext ${normalizedPhone.ext}` : ""),
          businessName: businessName.trim(),
          website: website.trim(),
          websiteRequired: false,
          budget: optionLabel(page.budgetOptions, budget),
          timeline: optionLabel(page.timelineOptions, timeline),
          role: optionLabel(page.roleOptions, role),
          industry: optionLabel(page.industryOptions, industry),
          websiteStatus: optionLabel(page.websiteStatusOptions, websiteStatus),
          service: page.serviceLabel,
          source: "landing-page",
          landingSlug: page.slug,
          auditType:
            page.conversionKind === "audit" ? page.serviceLabel : undefined,
          metaEventId,
          ...honeypotPayload,
          ...attribution,
        }),
      });
      responseStatus = String(res.status);
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as {
          error?: string;
          field?: string;
        };
        trackLandingFunnel("form_submit_error", {
          landingSlug: page.slug,
          form_step: "2",
          status: responseStatus,
        });
        if (res.status === 400 && data.field && data.field in LEAD_FIELD_CODES) {
          const field = data.field as LeadField;
          reportErrors(
            { [field]: data.error ?? LEAD_MESSAGES[field] },
            STEP1.includes(field) ? 1 : 2,
          );
        } else {
          setFormError(res.status === 429 ? "rate" : "server");
          setStatus("error");
          requestAnimationFrame(() =>
            document
              .getElementById(liveId)
              ?.scrollIntoView({ block: "center", behavior: "smooth" }),
          );
        }
        submitLock.current = false;
        return;
      }

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
        formType:
          page.conversionKind === "audit" ? "lead-magnet" : "landing-page",
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
    } catch {
      submitLock.current = false;
      setFormError("server");
      setStatus("error");
      trackLandingFunnel("form_submit_error", {
        landingSlug: page.slug,
        form_step: "2",
        status: responseStatus,
      });
      requestAnimationFrame(() =>
        document
          .getElementById(liveId)
          ?.scrollIntoView({ block: "center", behavior: "smooth" }),
      );
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (submitLock.current) return;
    if (step === 1) {
      const next = validateLeadStep1(values);
      if (Object.keys(next).length) {
        reportErrors(next);
        return;
      }
      setErrors({});
      setShowSummary(false);
      setFormError("");
      setStatus("idle");
      setStep(2);
      stepRef.current = 2;
      trackLandingFunnel("form_step1_complete", { landingSlug: page.slug });
      trackLandingFunnel("form_step2_view", { landingSlug: page.slug });
      requestAnimationFrame(() => {
        document
          .getElementById("lp-form")
          ?.scrollIntoView({ block: "start", behavior: "smooth" });
        focusField("name");
      });
      return;
    }
    await submitLead();
  };

  const onInputKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    field: LeadField,
  ) => {
    if (event.key !== "Enter" || event.nativeEvent.isComposing) return;
    const requiredMissing = REQUIRED_CONTACT.some(
      (key) => !values[key].trim(),
    );
    if (requiredMissing || field !== "website") {
      event.preventDefault();
      const next =
        STEP2[STEP2.indexOf(field) + 1] ??
        STEP2.find(
          (key) => !values[key].trim() && REQUIRED_CONTACT.includes(key),
        );
      if (next) focusField(next);
    }
  };

  if (status === "success") {
    const showCalendar = qualifiesForProjectCall(role, timeline);
    if (!showCalendar) {
      return (
        <div className="lp-web-form__success" role="status" aria-live="polite">
          <h3 className="lp-web-form__success-title">
            {page.successTitle ?? "Thanks"}
          </h3>
          <p className="lp-web-form__success-copy">
            {page.successCopy ?? "We'll be in touch."}
          </p>
        </div>
      );
    }

    const notes = [
      businessName.trim() ? `Business: ${businessName.trim()}` : "",
      `Role: ${optionLabel(page.roleOptions, role)}`,
      `Type of work: ${optionLabel(page.industryOptions, industry)}`,
      `Current website: ${optionLabel(page.websiteStatusOptions, websiteStatus)}`,
      websiteStatus !== "none" && website.trim() ? `URL: ${website.trim()}` : "",
      `Budget: ${optionLabel(page.budgetOptions, budget)}`,
      `Start: ${optionLabel(page.timelineOptions, timeline)}`,
      phone.trim() ? `Phone: ${phone.trim()}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    return (
      <div className="lp-web-form__success" role="status" aria-live="polite">
        <ProjectCallCalendar
          locale={locale}
          landingSlug={page.slug}
          preset={{ name: name.trim(), email: email.trim(), notes }}
          title={page.calendarTitle ?? "Pick a 15-minute time"}
          subtitle={page.calendarSubtitle ?? "Central Time. Weekdays. 15 minutes."}
        />
      </div>
    );
  }

  const errorFields = (step === 1 ? STEP1 : STEP2).filter(
    (field) => errors[field],
  );
  const choices = (
    field: "role" | "industry" | "budget" | "timeline",
    options: LandingPageOption[] = [],
  ) => (
    <fieldset
      className="form-choice-set lp-web-form__fieldset"
      aria-invalid={Boolean(errors[field])}
      aria-describedby={errors[field] ? `${fieldId(field)}-error` : undefined}
    >
      <legend className="form-label">
        {fieldLabel(field)} <span aria-hidden>*</span>
      </legend>
      <div className="lp-web-form__choices" id={fieldId(field)}>
        {options.map((option) => (
          <label key={option.value} className="lp-web-form__choice">
            <input
              type="radio"
              name={`${id}-${field}`}
              value={option.value}
              checked={values[field] === option.value}
              required
              onFocus={() => {
                lastField.current = field;
              }}
              onBlur={() => blur(field)}
              onChange={() => update(field, option.value)}
            />
            <span>{option.label}</span>
            <Check className="lp-web-form__choice-check" size={18} aria-hidden />
          </label>
        ))}
      </div>
      <FieldError id={`${fieldId(field)}-error`} message={errors[field]} />
    </fieldset>
  );

  return (
    <div className="lp-web-form">
      <div className="lp-web-form__intro">
        <p className="lp-web-form__progress">{t("progress", { step })}</p>
        <h3 className="lp-web-form__title">
          {step === 1
            ? (page.formStep1Title ?? "Tell us about your project")
            : (page.formStep2Title ?? "Where should we call you?")}
        </h3>
      </div>

      <form
        onSubmit={handleSubmit}
        className="lp-web-form__fields"
        noValidate
        aria-busy={status === "submitting"}
      >
        <input type="text" {...honeypotProps} />

        {showSummary && errorFields.length > 0 ? (
          <div
            className="lp-web-form__summary"
            role="alert"
            tabIndex={-1}
            ref={summaryRef}
          >
            <p>{t("summary", { count: errorFields.length })}</p>
            <ul>
              {errorFields.map((field) => (
                <li key={field}>
                  <button
                    type="button"
                    onClick={() => {
                      focusField(field);
                      document
                        .getElementById(fieldId(field))
                        ?.scrollIntoView({
                          block: "center",
                          behavior: "smooth",
                        });
                    }}
                  >
                    {fieldLabel(field)}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {step === 1 ? (
          <>
            {choices("role", page.roleOptions)}
            {(page.industryOptions?.length ?? 0) <= 8 ? (
              choices("industry", page.industryOptions)
            ) : (
              <div className="lp-web-form__field">
                <label className="form-label" htmlFor={fieldId("industry")}>
                  {fieldLabel("industry")} *
                </label>
                <select
                  id={fieldId("industry")}
                  className="form-select"
                  required
                  value={industry}
                  onBlur={() => blur("industry")}
                  onChange={(event) => update("industry", event.target.value)}
                  aria-invalid={Boolean(errors.industry)}
                  aria-describedby={
                    errors.industry ? `${fieldId("industry")}-error` : undefined
                  }
                >
                  <option value="">{t("select")}</option>
                  {page.industryOptions?.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <FieldError
                  id={`${fieldId("industry")}-error`}
                  message={errors.industry}
                />
              </div>
            )}
            {choices("budget", page.budgetOptions)}
            {choices("timeline", page.timelineOptions)}
          </>
        ) : (
          <>
            <button
              type="button"
              className="lp-web-form__back"
              disabled={status === "submitting"}
              onClick={() => {
                setStep(1);
                stepRef.current = 1;
                setErrors({});
                setShowSummary(false);
                setFormError("");
                setStatus("idle");
                requestAnimationFrame(() => focusField("role"));
              }}
            >
              {t("back")}
            </button>
            {STEP2.map((field) => (
              <div key={field} className="lp-web-form__field">
                <label className="form-label" htmlFor={fieldId(field)}>
                  {fieldLabel(field)}
                  {REQUIRED_CONTACT.includes(field) ? (
                    <span aria-hidden> *</span>
                  ) : null}
                </label>
                <input
                  id={fieldId(field)}
                  name={field}
                  className="form-input"
                  type={
                    field === "phone"
                      ? "tel"
                      : field === "email"
                        ? "email"
                        : "text"
                  }
                  inputMode={
                    field === "phone"
                      ? "tel"
                      : field === "email"
                        ? "email"
                        : field === "website"
                          ? "url"
                          : "text"
                  }
                  autoComplete={
                    field === "businessName"
                      ? "organization"
                      : field === "website"
                        ? "url"
                        : field === "phone"
                          ? "tel"
                          : field
                  }
                  autoCapitalize={
                    field === "name" || field === "businessName"
                      ? "words"
                      : "none"
                  }
                  autoCorrect="off"
                  spellCheck={false}
                  enterKeyHint={field === "website" ? "send" : "next"}
                  required={REQUIRED_CONTACT.includes(field)}
                  maxLength={LEAD_LIMITS[field]}
                  placeholder={
                    field === "phone"
                      ? "(919) 555-1234"
                      : field === "website"
                        ? t("websitePlaceholder")
                        : undefined
                  }
                  value={values[field]}
                  onFocus={() => {
                    lastField.current = field;
                  }}
                  onChange={(event) => update(field, event.target.value)}
                  onBlur={() => blur(field)}
                  onKeyDown={(event) => onInputKeyDown(event, field)}
                  aria-invalid={Boolean(errors[field])}
                  aria-describedby={
                    errors[field] ? `${fieldId(field)}-error` : undefined
                  }
                />
                <FieldError
                  id={`${fieldId(field)}-error`}
                  message={errors[field]}
                />
              </div>
            ))}
          </>
        )}

        <div className="lp-web-form__status" aria-live="assertive" id={liveId}>
          {formError ? (
            <div
              className="lp-web-form__error lp-web-form__error--form"
              role="alert"
            >
              <AlertCircle size={18} aria-hidden />
              <p>
                {t(formError === "rate" ? "rateError" : "serverError")}{" "}
                <CallLink dataCta="call-dock" ariaLabel="Call +1 (307) 500-3371">
                  +1 (307) 500-3371
                </CallLink>
                .
              </p>
            </div>
          ) : null}
        </div>

        <Button
          type="submit"
          size="lg"
          className="lp-web-form__submit"
          disabled={status === "submitting"}
          aria-busy={status === "submitting"}
          enterKeyHint="go"
          arrow={status !== "submitting"}
        >
          {status === "submitting" ? (
            <>
              <LoaderCircle
                className="lp-web-form__spinner"
                size={18}
                aria-hidden
              />
              {t("sending")}
            </>
          ) : step === 1 ? (
            (page.continueLabel ?? "Next: where should we call you?")
          ) : (
            page.submitLabel
          )}
        </Button>

        {step === 2 ? (
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
