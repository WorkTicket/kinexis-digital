"use client";

import { useRouter } from "@/i18n/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import type { ContactContent } from "@/content/contact";
import { useFormHoneypot } from "@/hooks/useFormHoneypot";
import { getAttributionPayload } from "@/lib/analytics/click-ids";
import { stashPendingConversion } from "@/lib/analytics/pending-conversion";

type Props = {
  content: ContactContent;
};

const THANK_YOU_DELAY_MS = 1200;

export function ContactForm({ content: c }: Props) {
  const router = useRouter();
  const { honeypotProps, honeypotPayload } = useFormHoneypot();
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [errorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  });

  const set =
    (field: keyof typeof formData) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) =>
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    try {
      const attribution = getAttributionPayload();
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          message: formData.message.trim() || undefined,
          ...honeypotPayload,
          ...attribution,
        }),
      });

      if (res.ok) {
        stashPendingConversion({
          type: "lead",
          email: formData.email,
          serviceInterest: formData.service || "not_specified",
          formType: "contact",
        });
        setStatus("success");
        window.setTimeout(() => {
          router.push("/thank-you");
        }, THANK_YOU_DELAY_MS);
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(data.error || c.errorMessage);
        setStatus("error");
      }
    } catch {
      setErrorMsg(c.errorMessage);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex flex-col items-center justify-center gap-3 py-16 text-center"
      >
        <p className="text-xl font-semibold text-foreground">{c.confirmFlash}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-5">
        <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight text-foreground">
          {c.formTitle}
        </h2>
        <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-muted">
          {c.formSubtitle}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="relative space-y-5">
        <input type="text" {...honeypotProps} />

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label htmlFor="contact-name" className="form-label">
              {c.nameLabel} <span className="text-foreground">*</span>
            </label>
            <input
              type="text"
              id="contact-name"
              required
              value={formData.name}
              onChange={set("name")}
              className="form-input"
              placeholder={c.namePlaceholder}
              autoComplete="name"
            />
          </div>

          <div>
            <label htmlFor="contact-email" className="form-label">
              {c.emailLabel} <span className="text-foreground">*</span>
            </label>
            <input
              type="email"
              id="contact-email"
              required
              value={formData.email}
              onChange={set("email")}
              className="form-input"
              placeholder={c.emailPlaceholder}
              autoComplete="email"
            />
          </div>
        </div>

        <div>
          <label htmlFor="contact-service" className="form-label">
            {c.serviceLabel}
          </label>
          <select
            id="contact-service"
            value={formData.service}
            onChange={set("service")}
            className="form-select"
          >
            <option value="">{c.servicePlaceholder}</option>
            {c.serviceOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="contact-message" className="form-label">
            {c.messageLabel}
          </label>
          <textarea
            id="contact-message"
            value={formData.message}
            onChange={set("message")}
            className="form-textarea"
            placeholder={c.messagePlaceholder}
            rows={6}
            maxLength={5000}
          />
        </div>

        <div className="min-h-[2.75rem]">
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
          <p className="text-xs text-muted sm:max-w-xs">{c.formFootnote}</p>
          <Button
            type="submit"
            size="lg"
            disabled={status === "submitting"}
            className="sm:min-w-[12rem]"
          >
            {status === "submitting" ? c.submittingButton : c.submitButton}
          </Button>
        </div>
      </form>
    </div>
  );
}
