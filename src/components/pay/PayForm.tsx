"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import type { PayContent } from "@/content/pay";
import { useFormHoneypot } from "@/hooks/useFormHoneypot";

type Props = {
  content: PayContent;
  defaults: {
    amount: string;
    description: string;
    name: string;
    email: string;
    company: string;
  };
};

export function PayForm({ content: c, defaults }: Props) {
  const { honeypotProps, honeypotPayload } = useFormHoneypot();
  const submitLock = useRef(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState(defaults);

  const set =
    (field: keyof typeof formData) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitLock.current) return;
    submitLock.current = true;
    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: formData.amount,
          description: formData.description,
          name: formData.name,
          email: formData.email,
          company: formData.company.trim() || undefined,
          idempotencyKey: crypto.randomUUID(),
          ...honeypotPayload,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && typeof data.url === "string") {
        window.location.assign(data.url);
        return;
      }
      submitLock.current = false;
      setErrorMsg(typeof data.error === "string" ? data.error : c.errorFallback);
      setStatus("error");
    } catch {
      submitLock.current = false;
      setErrorMsg(c.errorFallback);
      setStatus("error");
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl bg-[color-mix(in_oklab,var(--foreground)_4%,transparent)] p-6 sm:p-8">
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

        <div>
          <label htmlFor="pay-amount" className="form-label">
            {c.amountLabel} <span className="text-foreground">*</span>
          </label>
          <input
            id="pay-amount"
            name="amount"
            inputMode="decimal"
            autoComplete="transaction-amount"
            required
            value={formData.amount}
            onChange={set("amount")}
            className="form-input"
            placeholder="2500"
          />
          <p className="mt-1.5 text-xs text-muted">{c.amountHint}</p>
        </div>

        <div>
          <label htmlFor="pay-description" className="form-label">
            {c.descriptionLabel} <span className="text-foreground">*</span>
          </label>
          <input
            id="pay-description"
            name="description"
            required
            maxLength={140}
            value={formData.description}
            onChange={set("description")}
            className="form-input"
            placeholder={c.descriptionPlaceholder}
          />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label htmlFor="pay-name" className="form-label">
              {c.nameLabel} <span className="text-foreground">*</span>
            </label>
            <input
              id="pay-name"
              name="name"
              type="text"
              required
              autoComplete="name"
              maxLength={120}
              value={formData.name}
              onChange={set("name")}
              className="form-input"
              placeholder={c.namePlaceholder}
            />
          </div>
          <div>
            <label htmlFor="pay-email" className="form-label">
              {c.emailLabel} <span className="text-foreground">*</span>
            </label>
            <input
              id="pay-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              maxLength={200}
              value={formData.email}
              onChange={set("email")}
              className="form-input"
              placeholder={c.emailPlaceholder}
            />
          </div>
        </div>

        <div>
          <label htmlFor="pay-company" className="form-label">
            {c.companyLabel}{" "}
            <span className="form-label__optional">({c.companyPlaceholder})</span>
          </label>
          <input
            id="pay-company"
            name="organization"
            type="text"
            autoComplete="organization"
            maxLength={120}
            value={formData.company}
            onChange={set("company")}
            className="form-input"
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
          <p className="text-xs text-muted sm:max-w-xs">{c.footnote}</p>
          <Button
            type="submit"
            size="lg"
            disabled={status === "submitting"}
            className="sm:min-w-[12rem]"
          >
            {status === "submitting" ? c.submitting : c.submit}
          </Button>
        </div>
      </form>
    </div>
  );
}
