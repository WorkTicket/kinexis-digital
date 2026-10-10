"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { useFormHoneypot } from "@/hooks/useFormHoneypot";
import { getAttributionPayload } from "@/lib/analytics/click-ids";
import { trackAuditLead } from "@/lib/analytics/events";
import {
  createMetaEventId,
  stashPendingConversion,
} from "@/lib/analytics/pending-conversion";
import { navigateAfterSubmit } from "@/lib/in-app-browser";
import { useRouter } from "@/i18n/navigation";
import type { MarketingAuditContent } from "@/content/marketing-audit";

type Props = {
  content: MarketingAuditContent;
};

const SERVICE = "Marketing audit";

export function MarketingAuditForm({ content }: Props) {
  const router = useRouter();
  const { honeypotProps, honeypotPayload } = useFormHoneypot();
  const submitLock = useRef(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [focus, setFocus] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const focusLabel =
    content.focusOptions.find((option) => option.value === focus)?.label ?? "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitLock.current) return;
    submitLock.current = true;
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
          businessName: company.trim() || undefined,
          phone: phone.trim() || undefined,
          website: website.trim(),
          websiteRequired: true,
          need: focusLabel,
          goal: notes.trim() || focusLabel,
          service: SERVICE,
          source: "lead-magnet",
          auditType: SERVICE,
          ...honeypotPayload,
          ...attribution,
        }),
      });

      if (!res.ok) {
        submitLock.current = false;
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error || content.errorMessage);
      }

      const metaEventId = createMetaEventId("Lead");
      stashPendingConversion({
        type: "audit",
        email,
        phone: phone.trim() || undefined,
        serviceInterest: SERVICE,
        formType: "lead-magnet",
        conversionAlreadyFired: true,
        metaEvent: "Lead",
        metaEventId,
      });
      trackAuditLead({
        email,
        phone: phone.trim() || undefined,
        formType: "lead-magnet",
        serviceInterest: SERVICE,
        metaEventId,
      });
      navigateAfterSubmit("/thank-you/audit", router);
    } catch (err) {
      submitLock.current = false;
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : content.errorMessage);
    }
  };

  return (
    <div className="audit-form">
      <div>
        <h2 id="audit-form-heading" className="audit-form__title">
          {content.formTitle}
        </h2>
        <p className="audit-form__dek">{content.formSubtitle}</p>
      </div>

      <form onSubmit={handleSubmit}>
        <input {...honeypotProps} />

        <div className="audit-form__grid">
          <label className="audit-field">
            <span className="form-label">
              {content.nameLabel} <span className="text-foreground">*</span>
            </span>
            <input
              required
              name="name"
              autoComplete="name"
              className="form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label className="audit-field">
            <span className="form-label">
              {content.emailLabel} <span className="text-foreground">*</span>
            </span>
            <input
              required
              type="email"
              name="email"
              autoComplete="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="audit-field">
            <span className="form-label">
              {content.companyLabel}{" "}
              <span className="form-label__optional">({content.companyOptional})</span>
            </span>
            <input
              name="organization"
              autoComplete="organization"
              className="form-input"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </label>
          <label className="audit-field">
            <span className="form-label">
              {content.phoneLabel}{" "}
              <span className="form-label__optional">({content.phoneOptional})</span>
            </span>
            <input
              type="tel"
              name="phone"
              autoComplete="tel"
              className="form-input"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </label>
        </div>

        <label className="audit-field">
          <span className="form-label">
            {content.websiteLabel} <span className="text-foreground">*</span>
          </span>
          <input
            required
            type="text"
            inputMode="url"
            name="website"
            autoComplete="url"
            className="form-input"
            placeholder={content.websitePlaceholder}
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </label>

        <label className="audit-field">
          <span className="form-label">
            {content.focusLabel} <span className="text-foreground">*</span>
          </span>
          <select
            required
            name="focus"
            className="form-select"
            value={focus}
            onChange={(e) => setFocus(e.target.value)}
          >
            <option value="">{content.focusPlaceholder}</option>
            {content.focusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="audit-field">
          <span className="form-label">
            {content.notesLabel}{" "}
            <span className="form-label__optional">({content.notesOptional})</span>
          </span>
          <textarea
            name="notes"
            className="form-textarea"
            rows={5}
            maxLength={1000}
            placeholder={content.notesPlaceholder}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </label>

        {status === "error" ? (
          <p className="audit-form__error" role="alert">
            {errorMsg}
          </p>
        ) : null}

        <div className="audit-form__submit">
          <p className="audit-form__footnote">{content.formFootnote}</p>
          <Button type="submit" size="lg" arrow disabled={status === "submitting"}>
            {status === "submitting" ? content.submittingLabel : content.submitLabel}
          </Button>
        </div>
      </form>
    </div>
  );
}
