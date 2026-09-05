"use client";

import { useMemo, useRef, useState } from "react";
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
import {
  AUDIT_MAX_SCORE,
  scoreAuditBand,
  type MarketingAuditContent,
} from "@/content/marketing-audit";
import { cn } from "@/lib/cn";

type Props = {
  content: MarketingAuditContent;
};

export function MarketingAuditForm({ content }: Props) {
  const router = useRouter();
  const { honeypotProps, honeypotPayload } = useFormHoneypot();
  const submitLock = useRef(false);
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const score = useMemo(
    () => Object.values(answers).reduce((sum, points) => sum + points, 0),
    [answers],
  );
  const complete = Object.keys(answers).length === content.questions.length;
  const band = complete ? scoreAuditBand(score, content.bands) : null;
  const question = content.questions[step];

  const selectOption = (points: number) => {
    if (!question) return;
    setAnswers((prev) => ({ ...prev, [question.id]: points }));
    if (step < content.questions.length - 1) {
      setStep((current) => current + 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!complete || !band) return;
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
          phone: phone.trim() || undefined,
          website: website.trim() || undefined,
          goal: `${band.title} — ${band.summary}`,
          service: "Marketing scorecard",
          source: "marketing-audit",
          auditType: "Marketing scorecard",
          score,
          ...honeypotPayload,
          ...attribution,
        }),
      });

      if (!res.ok) {
        submitLock.current = false;
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      const metaEventId = createMetaEventId("Lead");
      stashPendingConversion({
        type: "audit",
        email,
        phone: phone.trim() || undefined,
        serviceInterest: "Marketing scorecard",
        formType: "lead-magnet",
        conversionAlreadyFired: true,
        metaEvent: "Lead",
        metaEventId,
      });
      trackAuditLead({
        email,
        phone: phone.trim() || undefined,
        formType: "lead-magnet",
        serviceInterest: "Marketing scorecard",
        metaEventId,
      });
      navigateAfterSubmit("/thank-you/audit", router);
    } catch (err) {
      submitLock.current = false;
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  if (!started) {
    return (
      <div className="audit-panel">
        <Button size="lg" arrow onClick={() => setStarted(true)}>
          {content.startLabel}
        </Button>
      </div>
    );
  }

  if (complete && band) {
    return (
      <div className="audit-panel audit-panel--result">
        <p className="audit-score">
          <span className="audit-score__label">{content.scoreLabel}</span>
          <span className="audit-score__value">
            {score}
            <span className="audit-score__max">/{AUDIT_MAX_SCORE}</span>
          </span>
        </p>
        <h2 className="audit-band__title">{band.title}</h2>
        <p className="audit-band__summary">{band.summary}</p>

        <form className="audit-lead" onSubmit={handleSubmit} noValidate>
          <div className="audit-lead__head">
            <h3 className="audit-lead__title">{content.formTitle}</h3>
            <p className="audit-lead__dek">{content.formSubtitle}</p>
          </div>

          <div className="audit-lead__grid">
            <label className="audit-field">
              <span>Name</span>
              <input
                required
                name="name"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label className="audit-field">
              <span>Email</span>
              <input
                required
                type="email"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className="audit-field">
              <span>Phone</span>
              <input
                type="tel"
                name="phone"
                autoComplete="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </label>
            <label className="audit-field">
              <span>Website</span>
              <input
                type="url"
                name="website"
                autoComplete="url"
                placeholder="https://"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </label>
          </div>

          <input {...honeypotProps} />

          {status === "error" ? (
            <p className="audit-lead__error" role="alert">
              {errorMsg}
            </p>
          ) : null}

          <Button
            type="submit"
            size="lg"
            arrow
            disabled={status === "submitting"}
          >
            {status === "submitting" ? "Sending…" : content.submitLabel}
          </Button>
          <p className="audit-lead__footnote">{content.formFootnote}</p>
        </form>
      </div>
    );
  }

  if (!question) return null;

  return (
    <div className="audit-panel">
      <p className="audit-progress">
        {step + 1} / {content.questions.length}
      </p>
      <h2 className="audit-question">{question.prompt}</h2>
      <ul className="audit-options">
        {question.options.map((option) => {
          const selected = answers[question.id] === option.points;
          return (
            <li key={option.label}>
              <button
                type="button"
                className={cn(
                  "audit-option",
                  selected && "audit-option--selected",
                )}
                onClick={() => selectOption(option.points)}
              >
                {option.label}
              </button>
            </li>
          );
        })}
      </ul>
      <div className="audit-nav">
        <Button
          type="button"
          variant="ghost"
          disabled={step === 0}
          onClick={() => setStep((current) => Math.max(0, current - 1))}
        >
          {content.backLabel}
        </Button>
      </div>
    </div>
  );
}
