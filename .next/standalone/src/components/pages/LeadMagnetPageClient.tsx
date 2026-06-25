"use client";

import { Link } from "@/i18n/navigation";
import { useState } from "react";
import { m as motion } from "@/lib/framer";
import Button from "@/components/ui/Button";
import HeroArchetype from "@/components/ui/HeroArchetype";
import { Download, TrendingUp, Search, Code, CheckCircle } from "lucide-react";
import { useMotionVariants } from "@/hooks/useMotionVariants";

import type { LeadMagnetContent } from "@/content/lead-magnet";
import TwoLineText from "@/components/ui/TwoLineText";


type AuditType = "seo" | "ads" | "website";

type Props = { content: LeadMagnetContent };

export default function LeadMagnetPageClient({ content: c }: Props) {
  const { fadeUp, stagger } = useMotionVariants();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [auditType, setAuditType] = useState<AuditType>("seo");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const audits = [
    { type: "seo" as AuditType, icon: Search, title: c.audits.seo.title, desc: c.audits.seo.desc },
    { type: "ads" as AuditType, icon: TrendingUp, title: c.audits.ads.title, desc: c.audits.ads.desc },
    { type: "website" as AuditType, icon: Code, title: c.audits.website.title, desc: c.audits.website.desc },
  ];

  const selectedAuditTitle = audits.find((a) => a.type === auditType)?.title ?? "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          auditType: selectedAuditTitle,
          source: "lead-magnet",
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <HeroArchetype
        archetype="showcase"
        label={c.badge}
        headline={
          <>
            <span className="type-hero-line">{c.heroTitlePrefix}</span>
            <span className="type-hero-line text-accent">{c.heroTitleAccent}</span>
          </>
        }
        subtitle={c.heroSubtitle}
        ctaLabel={`Get Your Free ${c.heroTitleAccent}`}
        ctaHref="#audit-form"
      />

      <motion.section
        id="audit-form"
        className="section-padding"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        <div className="container-site">
          <div className="section-header">
            <motion.div
              className="mb-12"
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              <motion.h2 variants={fadeUp} className="section-title mt-0">
                <TwoLineText text={c.chooseAuditTitle} variant="section" />
              </motion.h2>
              <motion.div variants={fadeUp} className="mx-auto mt-3 h-px w-10 bg-accent/30" />
            </motion.div>
          </div>

          <div className="mx-auto max-w-4xl">
            <motion.div
              className="grid grid-cols-1 gap-4 md:grid-cols-3 mb-16"
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {audits.map((audit) => (
                <motion.div key={audit.type} variants={fadeUp}>
                  <button type="button" onClick={() => setAuditType(audit.type)}
                    className={`text-left rounded-2xl border border-white/[0.06] p-6 w-full min-h-touch-lg transition-all duration-200 touch-manipulation ${
                      auditType === audit.type ? "ring-2 ring-accent shadow-md border-accent/30" : "hover:border-white/10"
                    }`}>
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                      <audit.icon className="h-5 w-5" />
                    </div>
                    <h3 className="service-card__title">{audit.title}</h3>
                    <p className="service-card__body text-sm">{audit.desc}</p>
                  </button>
                </motion.div>
              ))}
            </motion.div>

            {submitted ? (
              <div className="rounded-2xl border border-white/[0.06] p-12 text-center max-w-lg mx-auto">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent/10 mb-5">
                  <Download className="h-7 w-7 text-accent" />
                </div>
                <h3 className="text-2xl font-bold">{c.successTitle}</h3>
                <p className="mt-3 text-text-secondary">{c.successMessage.replace("{audit}", selectedAuditTitle)}</p>
                <p className="mt-2 text-sm text-text-muted">{c.successCtaBefore}<Link href="/contact" className="text-accent underline">{c.successCtaLink}</Link>.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="max-w-md mx-auto form-stack">
                <div className="form-group">
                  <label htmlFor="lead-name" className="form-label">{c.namePlaceholder}</label>
                  <input type="text" id="lead-name" required value={name} onChange={(e) => setName(e.target.value)}
                    className="form-input"
                    autoComplete="name" />
                </div>
                <div className="form-group">
                  <label htmlFor="lead-email" className="form-label">{c.emailPlaceholder}</label>
                  <input type="email" id="lead-email" required value={email} onChange={(e) => setEmail(e.target.value)}
                    className="form-input"
                    autoComplete="email" />
                </div>
                <Button type="submit" variant="primary" fullWidthMobile disabled={submitting}>
                  {submitting ? "Submitting..." : c.submitButton}
                </Button>
                {error ? <p className="text-xs text-center text-red-400">{error}</p> : null}
                <p className="text-xs text-center text-text-muted">{c.noSpam}</p>
              </form>
            )}
          </div>
        </div>
      </motion.section>

      <motion.section
        className="section-padding bg-bg"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        <div className="container-site">
          <div className="section-header">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              <motion.h2 variants={fadeUp} className="section-title mt-0">
                <TwoLineText text={c.whatYouGetTitle} variant="section" />
              </motion.h2>
              <motion.div variants={fadeUp} className="mx-auto mt-3 h-px w-10 bg-accent/30" />
            </motion.div>
            <motion.div
              className="section-content grid gap-grid-sm md:grid-cols-3"
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {c.benefits.map((item) => (
                <motion.div key={item.title} variants={fadeUp}>
                  <div className="rounded-2xl border border-white/[0.06] p-6">
                    <CheckCircle className="h-5 w-5 text-accent mb-3" />
                    <h3 className="font-bold">{item.title}</h3>
                    <p className="mt-2 text-sm text-text-secondary">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>
    </>
  );
}
