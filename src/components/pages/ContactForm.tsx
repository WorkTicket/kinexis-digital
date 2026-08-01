"use client";

import { useState } from "react";
import { CheckCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import type { ContactContent } from "@/content/contact";
import { useFormHoneypot } from "@/hooks/useFormHoneypot";
import { getAttributionPayload } from "@/lib/analytics/click-ids";
import { stashPendingConversion } from "@/lib/analytics/pending-conversion";
import { useRouter } from "@/i18n/navigation";

type Props = {
  content: ContactContent;
  /** When true, omit outer card chrome (used inside ContactIntake). */
  embedded?: boolean;
};

/** Let the short success flash register before navigating. */
const THANK_YOU_DELAY_MS = 1200;

/** Client island — only the interactive form hydrates; the rest of the page is static SSR. */
export default function ContactForm({ content: c, embedded = false }: Props) {
  const router = useRouter();
  const { honeypotProps, honeypotPayload } = useFormHoneypot();
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  });

  const set = (field: keyof typeof formData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setFormData((prev) => ({ ...prev, [field]: e.target.value }));

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

  const shellClass = embedded
    ? ""
    : "rounded-2xl border border-surface bg-surface-raised p-5 md:p-6 lg:p-7";

  if (status === "success") {
    return (
      <div className={shellClass || undefined}>
        <div
          role="status"
          aria-live="polite"
          className="flex flex-col items-center justify-center gap-3 py-16 text-center"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neon-cyan/15 ring-1 ring-neon-cyan/30">
            <CheckCircle className="h-6 w-6 text-neon-cyan" strokeWidth={1.5} />
          </div>
          <p className="text-xl font-semibold text-neon-cyan">{c.confirmFlash}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={shellClass || undefined}>
      <div className="mb-5">
        <h2 className="text-lg font-semibold tracking-tight text-white md:text-xl">
          {c.formTitle}
        </h2>
        <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-text-secondary">
          {c.formSubtitle}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="relative space-y-5">
        <input type="text" {...honeypotProps} />

        <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] md:items-stretch md:gap-6">
          <div className="flex flex-col gap-3">
            <div className="form-group !mb-0">
              <label htmlFor="contact-name" className="form-label !mb-1.5 !text-xs">
                {c.nameLabel} <span className="text-neon-cyan">*</span>
              </label>
              <input
                type="text"
                id="contact-name"
                required
                value={formData.name}
                onChange={set("name")}
                className="form-input !py-2.5 !text-sm"
                placeholder={c.namePlaceholder}
                autoComplete="name"
              />
            </div>

            <div className="form-group !mb-0">
              <label htmlFor="contact-email" className="form-label !mb-1.5 !text-xs">
                {c.emailLabel} <span className="text-neon-cyan">*</span>
              </label>
              <input
                type="email"
                id="contact-email"
                required
                value={formData.email}
                onChange={set("email")}
                className="form-input !py-2.5 !text-sm"
                placeholder={c.emailPlaceholder}
                autoComplete="email"
              />
            </div>

            <div className="form-group !mb-0">
              <label htmlFor="contact-service" className="form-label !mb-1.5 !text-xs">
                {c.serviceLabel}
              </label>
              <select
                id="contact-service"
                value={formData.service}
                onChange={set("service")}
                className="form-input !py-2.5 !text-sm appearance-none cursor-pointer"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.3)' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 16px center",
                }}
              >
                <option value="" style={{ background: "#05060a" }}>
                  {c.servicePlaceholder}
                </option>
                {c.serviceOptions.map((opt) => (
                  <option key={opt} value={opt} style={{ background: "#05060a" }}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group !mb-0 flex h-full min-h-[12.75rem] flex-col">
            <label htmlFor="contact-message" className="form-label !mb-1.5 !text-xs">
              {c.messageLabel}
            </label>
            <textarea
              id="contact-message"
              value={formData.message}
              onChange={set("message")}
              className="form-textarea !min-h-0 flex-1 !py-2.5 !text-sm"
              placeholder={c.messagePlaceholder}
              rows={8}
              maxLength={5000}
            />
          </div>
        </div>

        <div className="min-h-[2.75rem]">
          {status === "error" && errorMsg ? (
            <p
              role="alert"
              aria-live="assertive"
              aria-atomic="true"
              className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2.5 text-sm text-red-400"
            >
              {errorMsg}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-2 border-t border-white/[0.06] pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-text-muted sm:max-w-xs">{c.formFootnote}</p>
          <Button
            type="submit"
            variant="primary"
            disabled={status === "submitting"}
            className={
              status === "submitting"
                ? "cursor-not-allowed opacity-70 sm:min-w-[12rem]"
                : "sm:min-w-[12rem]"
            }
          >
            {status === "submitting" ? (
              <>
                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                {c.submittingButton}
              </>
            ) : (
              c.submitButton
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
