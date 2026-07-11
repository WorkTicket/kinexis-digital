import type { ReactNode } from "react";
import Section from "@/components/shared/services/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import SectionIntroWithVisualization from "@/components/shared/services/SectionIntroWithVisualization";
import Reveal from "@/components/ui/Reveal";
import type { EditorialData } from "@/content/services/architecture/types";

type Props = EditorialData & {
  surfaceIndex: number;
  visualization?: ReactNode;
};

/** Merged overview — prose-first editorial block replacing card-grid overview sections. */
export default function EditorialSection({
  headline,
  paragraphs,
  pullQuote,
  surfaceIndex,
  visualization,
}: Props) {
  return (
    <Section id="editorial" variant="editorial" surfaceIndex={surfaceIndex}>
      <div className="container-site">
        <SectionIntroWithVisualization
          header={<SectionHeader title={headline} />}
          visualization={visualization}
        />
        <Reveal stagger className="section-content mx-auto max-w-3xl space-y-6">
          {paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)} className="text-base leading-relaxed text-muted md:text-lg">
              {paragraph}
            </p>
          ))}
          {pullQuote ? (
            <blockquote className="border-l-2 border-neon-cyan/40 pl-6">
              <p className="text-base italic leading-relaxed text-white/90 md:text-lg">&ldquo;{pullQuote.quote}&rdquo;</p>
              <footer className="mt-3 text-sm text-muted">{pullQuote.attribution}</footer>
            </blockquote>
          ) : null}
        </Reveal>
      </div>
    </Section>
  );
}
