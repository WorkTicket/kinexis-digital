"use client";

import { useState } from "react";
import { CheckCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import type { ContactContent } from "@/content/contact";
import { useFormHoneypot } from "@/hooks/useFormHoneypot";

type Props = { content: ContactContent };

/** Client island — only the interactive form hydrates; the rest of the page is static SSR. */
export default function ContactForm({ content: c }: Props) {
  const { honeypotProps, honeypotPayload } = useFormHoneypot();
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
  });

  const set = (field: keyof typeof formData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, ...honeypotPayload }),
      });

      if (res.ok) {
        setStatus("success");
        if (typeof window !== "undefined" && Array.isArray((window as Window & { dataLayer?: unknown[] }).dataLayer)) {
          (window as Window & { dataLayer: unknown[] }).dataLayer.push({
            event: "generate_lead",
            form_type: "contact",
            service_interest: formData.service || "not_specified",
          });
        }
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

  return (
    <Card hover={false} className="!p-8 md:!p-10">
      <h2 className="type-subheader">{c.formTitle}</h2>
      <p className="mt-3 type-body text-text-secondary prose-readable-sm">
        {c.formSubtitle}
      </p>

      {status === "success" ? (
        <Card hover={false} className="mt-10 flex flex-col items-center gap-5 !px-8 !py-14 text-center bg-surface-base">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-neon-cyan/20 to-accent/20 ring-1 ring-neon-cyan/30">
            <CheckCircle className="h-8 w-8 text-neon-cyan" strokeWidth={1.5} />
          </div>
          <div>
            <p className="type-subheader text-white">{c.successTitle}</p>
            <p className="mt-2 type-body text-text-secondary">{c.successSubtitle}</p>
          </div>
        </Card>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8 form-stack relative">
          <input type="text" {...honeypotProps} />
          <div className="form-group">
            <label htmlFor="contact-name" className="form-label">
              {c.nameLabel} <span className="text-neon-cyan">*</span>
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

          <div className="form-group">
            <label htmlFor="contact-email" className="form-label">
              {c.emailLabel} <span className="text-neon-cyan">*</span>
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

          <div className="form-group">
            <label htmlFor="contact-service" className="form-label">
              {c.serviceLabel}
            </label>
            <select
              id="contact-service"
              value={formData.service}
              onChange={set("service")}
              className="form-input appearance-none cursor-pointer"
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

          {status === "error" && (
            <p
              role="alert"
              aria-live="assertive"
              aria-atomic="true"
              className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400"
            >
              {errorMsg}
            </p>
          )}

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4">
              <Button
                type="submit"
                variant="primary"
                fullWidthMobile
                disabled={status === "submitting"}
                className={status === "submitting" ? "opacity-70 cursor-not-allowed" : ""}
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
            <p className="text-xs text-text-muted">
              {c.formFootnote}
            </p>
          </div>
        </form>
      )}
    </Card>
  );
}
