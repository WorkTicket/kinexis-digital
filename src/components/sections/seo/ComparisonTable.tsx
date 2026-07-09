"use client";

import SectionHeader from "@/components/ui/SectionHeader";
import Section from "@/components/shared/services/Section";
import type { ComparisonColumn, ComparisonLayout, ComparisonRow } from "@/content/service-seo/types";
import ContrastComparison from "./comparisons/ContrastComparison";
import ImpactComparison from "./comparisons/ImpactComparison";
import LedgerComparison from "./comparisons/LedgerComparison";
import ProgressionComparison from "./comparisons/ProgressionComparison";
import StackedComparison from "./comparisons/StackedComparison";
import TierComparison from "./comparisons/TierComparison";

type ComparisonTableProps = {
  title: string;
  subtitle: string;
  layout?: ComparisonLayout;
  columns: ComparisonColumn[];
  rows: ComparisonRow[];
  surfaceIndex?: number;
  footerNote?: string;
};

function resolveLayout(layout: ComparisonLayout | undefined, columnCount: number): ComparisonLayout | "tier" {
  if (layout) return layout;
  if (columnCount === 2) return "ledger";
  return "tier";
}

export default function ComparisonTable({
  title,
  subtitle,
  layout,
  columns,
  rows,
  surfaceIndex = 0,
  footerNote,
}: ComparisonTableProps) {
  const resolved = resolveLayout(layout, columns.length);
  const isProgression = resolved === "progression";

  return (
    <Section
      id="comparison"
      surfaceIndex={surfaceIndex}
      className={isProgression ? "relative overflow-hidden" : undefined}
    >
      {isProgression && (
        <>
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.028)_1px,transparent_1px)] bg-[size:26px_26px] opacity-35"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon-cyan/[0.04] blur-[120px]"
            aria-hidden
          />
        </>
      )}

      <div className="container-site relative z-10">
        <SectionHeader title={title} description={subtitle} headingId="comparison-heading" />

        <div className={isProgression ? "section-content mx-auto max-w-6xl" : "section-content mx-auto max-w-5xl"}>
          {resolved === "progression" && <ProgressionComparison columns={columns} rows={rows} />}
          {resolved === "contrast" && <ContrastComparison columns={columns} rows={rows} />}
          {resolved === "impact" && <ImpactComparison columns={columns} rows={rows} />}
          {resolved === "ledger" && <LedgerComparison columns={columns} rows={rows} />}
          {resolved === "stacked" && <StackedComparison columns={columns} rows={rows} />}
          {resolved === "tier" && <TierComparison columns={columns} rows={rows} />}
        </div>

        {footerNote && (
          <p className="section-content mx-auto mt-8 max-w-2xl text-center text-sm leading-relaxed text-muted">
            {footerNote}
          </p>
        )}
      </div>
    </Section>
  );
}
