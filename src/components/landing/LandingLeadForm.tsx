"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { useFormHoneypot } from "@/hooks/useFormHoneypot";
import { getAttributionPayload } from "@/lib/analytics/click-ids";
import { stashPendingConversion } from "@/lib/analytics/pending-conversion";
import { cardClasses } from "@/lib/card-styles";
import { useRouter } from "@/i18n/navigation";

type Props = {
  serviceLabel: string;
  formTitle: string;
  formSubtitle: string;
  submitLabel: string;
  formFootnote: string;
  id?: string;
};

export default function LandingLeadForm({
  serviceLabel,
  formTitle,
  formSubtitle,
  submitLabel,
  formFootnote,
  id = "lp-form",
}: Props) {
  const router = useRouter();
  const { honeypotProps, honeypotPayload } = useFormHoneypot();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
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
          service: serviceLabel,
          source: "landing-page",
          ...honeypotPayload,
          ...attribution,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      stashPendingConversion({
        type: "lead",
        email,
        serviceInterest: serviceLabel,
        formType: "landing-page",
      });
      router.push("/thank-you");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  return (
    <div
      id={id}
      className={cardClasses({
        surface: "glass",
        hover: false,
        className: "shadow-lg !bg-surface-base/80 backdrop-blur-sm md:!p-8",
      })}
    >
      <h2 className="type-subheader text-white">{formTitle}</h2>
      <p className="mt-2 text-sm text-text-secondary leading-relaxed">{formSubtitle}</p>

      <form onSubmit={handleSubmit} className="mt-6 form-stack relative">
        <input type="text" {...honeypotProps} />
        <div className="form-group">
          <label htmlFor={`${id}-name`} className="form-label">
            Name <span className="text-neon-cyan">*</span>
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
        <div className="form-group">
          <label htmlFor={`${id}-email`} className="form-label">
            Work email <span className="text-neon-cyan">*</span>
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

        {status === "error" ? (
          <p
            role="alert"
            aria-live="assertive"
            className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400"
          >
            {errorMsg}
          </p>
        ) : null}

        <Button
          type="submit"
          variant="primary"
          fullWidthMobile
          disabled={status === "submitting"}
          className={status === "submitting" ? "opacity-70 cursor-not-allowed" : ""}
        >
          {status === "submitting" ? "Submitting…" : submitLabel}
        </Button>
        <p className="text-xs text-text-muted text-center sm:text-left">{formFootnote}</p>
      </form>
    </div>
  );
}
