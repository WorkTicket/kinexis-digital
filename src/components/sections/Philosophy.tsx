"use client";

import { useTranslations } from "next-intl";
import { Check, X } from "lucide-react";
import Button from "@/components/ui/Button";
import SectionHeader from "@/components/ui/SectionHeader";
import Section from "@/components/shared/services/Section";

type Props = { surfaceIndex?: number };

export default function Philosophy({ surfaceIndex = 0 }: Props) {
  const t = useTranslations("philosophy");
  const tCommon = useTranslations("common");

  const dimensions = t.raw("dimensions") as string[];
  const beforeDetails = t.raw("beforeDetails") as string[];
  const afterDetails = t.raw("afterDetails") as string[];
  const rows = dimensions.map((dimension, index) => ({
    dimension,
    before: beforeDetails[index] ?? "",
    after: afterDetails[index] ?? "",
  }));

  return (
    <Section id="philosophy" surfaceIndex={surfaceIndex}>
      <div className="container-site">
        <SectionHeader
          badge={t("label")}
          title={t("title")}
          description={t("subtitle")}
          headingId="philosophy-heading"
          align="center"
        />

        <div className="section-content mx-auto max-w-5xl overflow-x-auto rounded-2xl border border-surface">
          <div className="min-w-[40rem]">
            <div className="grid grid-cols-[11rem_1fr_1fr] border-b border-surface">
              <div className="border-r border-surface bg-bg-dark/40 px-5 py-4" />
              <div className="border-r border-surface bg-bg-dark/40 px-5 py-4">
                <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/40">
                  <X className="h-3.5 w-3.5 text-white/30" aria-hidden />
                  {t("typicalAgency")}
                </p>
              </div>
              <div className="bg-neon-cyan/[0.04] px-5 py-4">
                <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-neon-cyan/85">
                  <Check className="h-3.5 w-3.5 text-neon-cyan" aria-hidden />
                  KINEXIS
                </p>
              </div>
            </div>

            <ul>
              {rows.map((row) => (
                <li
                  key={row.dimension}
                  className="grid grid-cols-[11rem_1fr_1fr] border-b border-surface last:border-b-0"
                >
                  <div className="border-r border-surface bg-bg-dark/20 px-5 py-5">
                    <p className="text-sm font-semibold text-white">{row.dimension}</p>
                  </div>
                  <div className="border-r border-surface px-5 py-5">
                    <p className="text-sm leading-relaxed text-white/40">{row.before}</p>
                  </div>
                  <div className="bg-neon-cyan/[0.02] px-5 py-5">
                    <p className="text-sm font-medium leading-relaxed text-white/90">{row.after}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="section-cta-row">
          <Button href="/about" variant="secondary">
            {tCommon("learnAboutUs")}
          </Button>
        </div>
      </div>
    </Section>
  );
}
