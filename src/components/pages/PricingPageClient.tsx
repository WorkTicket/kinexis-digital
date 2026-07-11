"use client";

import { Shield, Clock, FileText } from "lucide-react";
import { m as motion } from "@/lib/framer";
import AnswerBlock from "@/components/sections/seo/AnswerBlock";
import ComparisonTable from "@/components/sections/seo/ComparisonTable";
import RelatedLinks from "@/components/sections/RelatedLinks";
import ServiceFAQSection from "@/components/shared/services/ServiceFAQSection";
import PricingCTASection from "@/components/pages/pricing/PricingCTASection";
import PricingIncludedSection from "@/components/pages/pricing/PricingIncludedSection";
import PricingTierProof from "@/components/pages/pricing/PricingTierProof";
import PricingTrustStrip from "@/components/pages/pricing/PricingTrustStrip";
import Section from "@/components/shared/services/Section";
import { getServiceRelatedLinks } from "@/lib/service-related-links";
import { getPricingRelatedLinks } from "@/lib/pricing-related-links";
import type { PricingSlug } from "@/content/registry/site-routes";
import type { Locale } from "@/i18n/routing";
import type { PricingPageContent } from "@/content/pricing/pricing-pages";

type Props = {
  slug: PricingSlug;
  locale: Locale;
  content: PricingPageContent;
  serviceHref: string;
  serviceLabel: string;
};

const guaranteeItems = {
  en: [
    { icon: Shield, label: "No hidden fees", desc: "Everything is scoped before you sign. No surprise line items." },
    { icon: Clock, label: "No long-term contracts", desc: "Month to month. Our results earn your renewal, not a locked clause." },
    { icon: FileText, label: "Fixed scope at each tier", desc: "You always know what's included before we start." },
  ],
  es: [
    { icon: Shield, label: "Sin cargos ocultos", desc: "Todo está definido antes de firmar. Sin sorpresas en la factura." },
    { icon: Clock, label: "Sin contratos a largo plazo", desc: "Mes a mes. Nuestros resultados ganan tu renovación, no una cláusula." },
    { icon: FileText, label: "Alcance fijo en cada nivel", desc: "Siempre sabes qué incluye antes de empezar." },
  ],
};

export default function PricingPageClient({
  slug,
  locale: _locale,
  content: c,
  serviceHref,
  serviceLabel,
}: Props) {
  const relatedLinks = getServiceRelatedLinks(slug);
  const pricingLinks = getPricingRelatedLinks(slug);
  const tiersSection = c.tiersSection!;
  const includedSection = c.includedSection!;
  const packages = c.comparison;
  const guarantees = _locale === "es" ? guaranteeItems.es : guaranteeItems.en;

  let surfaceIndex = 0;

  return (
    <>
      <AnswerBlock text={c.answerBlock} surfaceIndex={surfaceIndex++} />

      <section className="pb-0 pt-2">
        <div className="container-site">
          <PricingTrustStrip locale={_locale} />
          {c.tierProof && <PricingTierProof proof={c.tierProof} />}
        </div>
      </section>

      <ComparisonTable
        title={packages.title}
        subtitle={packages.subtitle}
        layout="progression"
        columns={packages.columns}
        rows={packages.rows}
        footerNote={tiersSection.note}
        surfaceIndex={surfaceIndex++}
      />

      {/* Guarantee strip */}
      <Section id="pricing-guarantee" surfaceIndex={surfaceIndex++} compact>
        <div className="container-site">
          <motion.div
            className="mx-auto max-w-4xl rounded-2xl border border-emerald-500/[0.12] bg-gradient-to-br from-emerald-500/[0.04] via-transparent to-transparent px-8 py-10 md:px-12 md:py-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="grid gap-8 sm:grid-cols-3">
              {guarantees.map((item) => (
                <div key={item.label} className="text-center sm:text-left">
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-500/15 bg-emerald-500/[0.06]">
                    <item.icon className="h-5 w-5 text-emerald-400" aria-hidden />
                  </div>
                  <p className="font-semibold text-white">{item.label}</p>
                  <p className="mt-2 text-sm leading-relaxed text-white/45">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </Section>

      <PricingIncludedSection
        title={includedSection.title}
        subtitle={includedSection.subtitle}
        items={includedSection.items}
        surfaceIndex={surfaceIndex++}
      />

      <ServiceFAQSection items={c.faqs} surfaceIndex={surfaceIndex++} />

      <RelatedLinks
        surfaceIndex={surfaceIndex++}
        serviceLinks={[
          { href: serviceHref, label: serviceLabel },
          ...relatedLinks.services.filter((link) => link.href !== serviceHref).slice(0, 2),
        ]}
        pricingLinks={pricingLinks}
        caseStudyLinks={relatedLinks.caseStudies.slice(0, 2)}
        blogLinks={relatedLinks.blog.slice(0, 2)}
      />

      <PricingCTASection
        headline={c.ctaHeadline}
        subtitle={c.ctaSubtitle}
        ctaLabel={c.ctaLabel}
        secondaryCtaLabel={
          _locale === "es" ? `Ver alcance de ${serviceLabel}` : `See ${serviceLabel} scope`
        }
        secondaryCtaHref={serviceHref}
        contractNote={
          _locale === "es" ? "Sin contratos largos. Mes a mes." : "No long-term contracts. Month to month."
        }
      />
    </>
  );
}
