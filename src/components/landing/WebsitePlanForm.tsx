"use client";

import dynamic from "next/dynamic";
import { AlertCircle, Check, LoaderCircle, Lock } from "lucide-react";
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

/** Required contact fields, in order. Enter moves along this list. */
const CONTACT: LeadField[] = ["name", "phone", "email"];
/** Budget and timeline are optional; they never block submit. */
const CHOICES: ("budget" | "timeline")[] = ["budget", "timeline"];
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
  const [values, setValues] = useState(EMPTY);
  const valuesRef = useRef(values);
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
  const validate = (next = values) => validateLeadStep2(next);

  const markStarted = () => {
    if (started.current) return;
    started.current = true;
    trackLandingFunnel("form_start", {
      landingSlug: page.slug,
      placement: "plan-form",
    });
  };

  const focusField = (field: LeadField) => {
    const node = document.getElementById(fieldId(field));
    const input = node?.matches("input,select")
      ? node
      : node?.querySelector("input,select");
    if (input instanceof HTMLElement) input.focus({ preventScroll: true });
  };

  const update = (field: LeadField, value: string) => {
    lastField.current = field;
    markStarted();
    const next = { ...values, [field]: value };
    valuesRef.current = next;
    setValues(next);
    if (errors[field] || touched.current.has(field)) {
      const message = localizedErrors(validate(next))[field];
      setErrors((prev) => ({ ...prev, [field]: message }));
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
        form_step: "1",
        step: "1",
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

  const reportErrors = (next: LeadErrors) => {
    const fields = CONTACT.filter((field) => next[field]);
    setErrors(localizedErrors(next));
    setShowSummary(true);
    setStatus("error");
    const codes = fields.map((field) => LEAD_FIELD_CODES[field]).join("|");
    trackLandingFunnel("form_validation_error", {
      landingSlug: page.slug,
      form_step: "1",
      step: "1",
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
    const next = validate(values);
    if (Object.keys(next).length) {
      reportErrors(next);
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
          form_step: "1",
          status: responseStatus,
        });
        if (res.status === 400 && data.field && data.field in LEAD_FIELD_CODES) {
          const field = data.field as LeadField;
          reportErrors({ [field]: data.error ?? LEAD_MESSAGES[field] });
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
      // Custom funnel signal only. Never carries personal info or Meta standard events.
      trackLandingFunnel("form_submit_success", {
        budget_given: budget.trim() ? "yes" : "no",
        timeline_given: timeline.trim() ? "yes" : "no",
      });
      submitted.current = true;
      setStatus("success");
    } catch {
      submitLock.current = false;
      setFormError("server");
      setStatus("error");
      trackLandingFunnel("form_submit_error", {
        landingSlug: page.slug,
        form_step: "1",
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
    await submitLead();
  };

  const onInputKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    field: LeadField,
  ) => {
    if (event.key !== "Enter" || event.nativeEvent.isComposing) return;
    if (field !== "email") {
      event.preventDefault();
      const next = CONTACT[CONTACT.indexOf(field) + 1];
      if (next) focusField(next);
      return;
    }
    // Enter on email only submits when all three required fields are valid.
    const next = validate(values);
    if (Object.keys(next).length) {
      event.preventDefault();
      reportErrors(next);
    }
  };

  if (status === "success") {
    const showCalendar = qualifiesForProjectCall(role, timeline);
    if (!showCalendar) {
      return (
        <div className="lp-web-form__success" role="status" aria-live="polite">
          <span className="lp-web-form__success-icon" aria-hidden>
            <Check size={26} strokeWidth={2.5} />
          </span>
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

  const errorFields = CONTACT.filter((field) => errors[field]);

  const textField = (field: LeadField) => {
    const isPhone = field === "phone";
    const isEmail = field === "email";
    return (
      <div key={field} className="lp-web-form__field">
        <label className="form-label" htmlFor={fieldId(field)}>
          {fieldLabel(field)}
          <span className="lp-web-form__req" aria-hidden>
            {" "}
            *
          </span>
        </label>
        <input
          id={fieldId(field)}
          name={field}
          className="form-input"
          type={isPhone ? "tel" : isEmail ? "email" : "text"}
          inputMode={isPhone ? "tel" : isEmail ? "email" : "text"}
          autoComplete={
            field === "name" ? "name" : isPhone ? "tel" : "email"
          }
          autoCapitalize={field === "name" ? "words" : "none"}
          autoCorrect="off"
          spellCheck={false}
          enterKeyHint={isEmail ? "go" : "next"}
          required
          maxLength={LEAD_LIMITS[field]}
          placeholder={
            isPhone ? "(919) 555-1234" : isEmail ? "you@company.com" : undefined
          }
          value={values[field]}
          onFocus={() => {
            lastField.current = field;
            markStarted();
          }}
          onChange={(event) => update(field, event.target.value)}
          onBlur={() => blur(field)}
          onKeyDown={(event) => onInputKeyDown(event, field)}
          aria-invalid={Boolean(errors[field])}
          aria-describedby={errors[field] ? `${fieldId(field)}-error` : undefined}
        />
        <FieldError id={`${fieldId(field)}-error`} message={errors[field]} />
      </div>
    );
  };

  const choices = (
    field: "budget" | "timeline",
    options: LandingPageOption[] = [],
  ) => (
    <fieldset
      key={field}
      className="form-choice-set lp-web-form__fieldset"
      aria-describedby={undefined}
    >
      <legend className="form-label">
        {fieldLabel(field)}{" "}
        <span className="lp-web-form__optional">{t("optional")}</span>
      </legend>
      <div
        className="lp-web-form__choices lp-web-form__choices--chips"
        id={fieldId(field)}
      >
        {options.map((option) => (
          <label
            key={option.value}
            className="lp-web-form__choice lp-web-form__choice--chip"
          >
            <input
              type="radio"
              name={`${id}-${field}`}
              value={option.value}
              checked={values[field] === option.value}
              onFocus={() => {
                lastField.current = field;
              }}
              onClick={() => {
                if (values[field] === option.value) update(field, "");
              }}
              onBlur={() => blur(field)}
              onChange={() => update(field, option.value)}
            />
            <span>{option.label}</span>
            <Check className="lp-web-form__choice-check" size={18} aria-hidden />
          </label>
        ))}
      </div>
    </fieldset>
  );

  return (
    <div className="lp-web-form">
      <div className="lp-web-form__intro">
        <h3 className="lp-web-form__title">
          {page.formStep2Title ?? "Where should we call you?"}
        </h3>
        {page.formCtaHint ? (
          <p className="lp-web-form__hint">{page.formCtaHint}</p>
        ) : null}
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

        {CONTACT.map((field) => textField(field))}

        {CHOICES.map((field) =>
          field === "budget"
            ? choices("budget", page.budgetOptions)
            : choices("timeline", page.timelineOptions),
        )}

        {page.formTrust?.length ? (
          <ul className="lp-web-form__trust">
            {page.formTrust.map((item) => (
              <li key={item}>
                <Check size={15} strokeWidth={2.5} aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : null}

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

        <div className="lp-web-form__actions">
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
            ) : (
              page.submitLabel
            )}
          </Button>

          <p className="lp-web-form__privacy">
            <Lock size={13} aria-hidden />
            <span>
              {page.privacyMicrocopy ?? page.formFootnote}{" "}
              <Link href="/privacy">Privacy Policy</Link>.
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}
