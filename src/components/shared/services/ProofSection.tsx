import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import Section from "@/components/shared/services/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";
import type { ProofData } from "@/content/services/architecture/types";
import { uiChrome } from "@/content/ui-chrome";
import type { Locale } from "@/i18n/routing";

type Props = ProofData & {
  surfaceIndex: number;
  locale?: Locale;
};

export default function ProofSection({
  title,
  subtitle,
  caseStudy,
  logos,
  beforeAfter,
  surfaceIndex,
  locale = "en",
}: Props) {
  const copy = uiChrome[locale].proof;
  const resolvedTitle = title ?? copy.title;
  const resolvedSubtitle = subtitle ?? copy.subtitle;
  const hasContent = caseStudy || logos?.length || beforeAfter;

  if (!hasContent) return null;

  return (
    <Section id="proof" variant="proof" surfaceIndex={surfaceIndex}>
      <div className="container-site">
        <SectionHeader title={resolvedTitle} description={resolvedSubtitle} />

        <Reveal stagger className="section-content mx-auto max-w-3xl space-y-10">
          {caseStudy ? (
            <article className="text-left">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neon-cyan/70">
                {copy.caseStudy}
              </span>
              <h3 className="type-subheader mt-3">{caseStudy.client}</h3>

              <div className="mt-6 space-y-5 text-base leading-relaxed md:text-lg">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted">{copy.challenge}</p>
                  <p className="mt-2 text-muted">{caseStudy.challenge}</p>
                </div>

                {caseStudy.approach ? (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted">{copy.approach}</p>
                    <p className="mt-2 text-muted">{caseStudy.approach}</p>
                  </div>
                ) : null}

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted">{copy.results}</p>
                  <p className="mt-2 text-white/90">{caseStudy.outcome}</p>
                </div>
              </div>

              {caseStudy.href ? (
                <Link
                  href={caseStudy.href}
                  className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-neon-cyan transition-colors hover:text-white"
                >
                  {copy.readFull}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ) : null}
            </article>
          ) : null}

          {logos && logos.length > 0 ? (
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-70 md:gap-12">
              {logos.map((logo) => (
                <div key={logo.alt} className="relative h-8 w-24 md:h-10 md:w-32">
                  <Image src={logo.src} alt={logo.alt} fill className="object-contain object-center grayscale" />
                </div>
              ))}
            </div>
          ) : null}

          {beforeAfter ? (
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-red-500/20 bg-red-500/[0.04] p-6 text-center">
                <span className="text-xs font-semibold uppercase tracking-wider text-red-400">
                  {beforeAfter.beforeLabel}
                </span>
                <p className="mt-2 type-metric text-red-300">{beforeAfter.beforeValue}</p>
                <p className="mt-1 text-sm text-muted">{beforeAfter.metric}</p>
              </div>
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.04] p-6 text-center">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                  {beforeAfter.afterLabel}
                </span>
                <p className="mt-2 type-metric text-emerald-300">{beforeAfter.afterValue}</p>
                <p className="mt-1 text-sm text-muted">{beforeAfter.metric}</p>
              </div>
            </div>
          ) : null}
        </Reveal>
      </div>
    </Section>
  );
}
