"use client";

import { useState } from "react";
import { m as motion, AnimatePresence } from "@/lib/framer";
import { CheckCircle, ArrowRight, Clock, Shield, Sparkles, Mail } from "lucide-react";
import Button from "@/components/ui/Button";
import HeroArchetype from "@/components/ui/HeroArchetype";
import { useMotionVariants } from "@/hooks/useMotionVariants";

import type { ContactContent } from "@/content/contact";

type Props = { content: ContactContent };

const SERVICE_OPTIONS = [
  "Web Design & Development",
  "Search Engine Optimization (SEO)",
  "Paid Ads (Google / Meta)",
  "Social Media Marketing",
  "Branding & Identity",
  "Email Marketing",
  "Content Marketing",
  "Growth Consulting",
  "Other / Not Sure Yet",
];

const stepIcons = [
  <Clock key="clock" className="h-5 w-5" />,
  <Mail key="mail" className="h-5 w-5" />,
  <Sparkles key="sparkles" className="h-5 w-5" />,
];

export default function ContactPageClient({ content: c }: Props) {
  const { fadeUp, stagger } = useMotionVariants();
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
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        // GA4 conversion event
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

  const steps = [
    { title: c.step1Title, desc: c.step1Desc },
    { title: c.step2Title, desc: c.step2Desc },
    { title: c.step3Title, desc: c.step3Desc },
  ];

  const trustBadges = [
    { icon: <Clock className="h-4 w-4" />, label: c.trustLabel1 },
    { icon: <Shield className="h-4 w-4" />, label: c.trustLabel2 },
    { icon: <Sparkles className="h-4 w-4" />, label: c.trustLabel3 },
  ];

  return (
    <>
      <HeroArchetype
        archetype="conversion"
        compact
        label="Contact"
        headline={c.heroTitle}
        subtitle={c.heroSubtitle}
      />

      <motion.section
        className="section-padding"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        <div className="container-site">
          <motion.div
            className="grid gap-10 lg:gap-14 xl:gap-16 lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_460px]"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {/* ── LEFT: Contact Form ─────────────────────────────────── */}
            <motion.div variants={fadeUp}>
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-8 md:p-10">
                <h2 className="type-subheader">{c.formTitle}</h2>
                <p className="mt-3 type-body text-text-secondary prose-readable-sm">
                  {c.formSubtitle}
                </p>

                <AnimatePresence mode="wait">
                  {status === "success" ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="mt-10 flex flex-col items-center gap-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-8 py-14 text-center"
                    >
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-neon-cyan/20 to-accent/20 ring-1 ring-neon-cyan/30">
                        <CheckCircle className="h-8 w-8 text-neon-cyan" strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="text-xl font-bold text-white">{c.successTitle}</p>
                        <p className="mt-2 type-body text-text-secondary">{c.successSubtitle}</p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="mt-8 form-stack"
                    >
                      {/* Name */}
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

                      {/* Email */}
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

                      {/* What are you looking for */}
                      <div className="form-group">
                        <label htmlFor="contact-service" className="form-label">
                          What are you looking for?
                        </label>
                        <select
                          id="contact-service"
                          value={formData.service}
                          onChange={set("service")}
                          className="form-input appearance-none cursor-pointer"
                          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.3)' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 16px center" }}
                        >
                          <option value="" style={{ background: "#05060a" }}>Select a service…</option>
                          {SERVICE_OPTIONS.map((opt) => (
                            <option key={opt} value={opt} style={{ background: "#05060a" }}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Error */}
                      {status === "error" && (
                        <p className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
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
                              <>
                                {c.submitButton}
                                <ArrowRight className="h-4 w-4" />
                              </>
                            )}
                          </Button>
                        </div>
                        <p className="text-xs text-text-muted">
                          No long-term contracts. Month to month. We&apos;ll never share your details.
                        </p>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* ── RIGHT: What Happens Next ───────────────────────────── */}
            <motion.div variants={fadeUp} className="flex flex-col gap-6">
              {/* Process card */}
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-8">
                <h2 className="text-xl font-bold text-white">{c.sidebarTitle}</h2>
                <p className="mt-2 text-sm text-text-secondary">{c.sidebarSubtitle}</p>

                <ol className="mt-8 space-y-7">
                  {steps.map((step, i) => (
                    <li key={i} className="flex gap-4">
                      <div className="relative flex flex-col items-center">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-neon-cyan/20 to-accent/10 ring-1 ring-white/[0.08] text-neon-cyan">
                          {stepIcons[i]}
                        </div>
                        {i < steps.length - 1 && (
                          <div className="mt-2 h-full w-px bg-gradient-to-b from-white/[0.08] to-transparent" />
                        )}
                      </div>
                      <div className="pb-2 pt-1">
                        <p className="text-sm font-semibold text-white">{step.title}</p>
                        <p className="mt-1 text-sm leading-relaxed text-text-secondary">
                          {step.desc}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Trust badges */}
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-6">
                <div className="flex flex-col gap-3">
                  {trustBadges.map((badge, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-neon-cyan/10 text-neon-cyan">
                        {badge.icon}
                      </div>
                      <span className="text-sm font-medium text-white/80">{badge.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Direct contact */}
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-text-muted">
                  Or reach us directly
                </p>
                <a
                  href="mailto:hello@kinexisdigital.com"
                  className="mt-3 flex items-center gap-3 group"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] ring-1 ring-white/[0.06] text-text-muted group-hover:text-neon-cyan group-hover:ring-neon-cyan/30 transition-colors duration-300">
                    <Mail className="h-4 w-4" />
                  </div>
                  <span className="text-sm text-text-secondary group-hover:text-white transition-colors duration-300">
                    hello@kinexisdigital.com
                  </span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </>
  );
}
