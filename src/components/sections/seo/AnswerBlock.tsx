"use client";

import { useTranslations } from "next-intl";
import Section from "@/components/shared/services/Section";
import { cardClasses } from "@/lib/card-styles";

type AnswerBlockProps = {
  text: string;
  surfaceIndex?: number;
};

/**
 * Renders visible in SSR — no opacity/scroll gating. This block often sits
 * near the top of a template (e.g. industry detail leads with it), so hiding
 * it behind a hydration-gated reveal made it the LCP element and pushed LCP to
 * ~3.3s on mobile. Content-first is both faster and better practice.
 */
export default function AnswerBlock({ text, surfaceIndex = 0 }: AnswerBlockProps) {
  const t = useTranslations("common");

  return (
    <Section id="answer-block" surfaceIndex={surfaceIndex}>
      <div aria-label="Service summary">
        <div className="container-site">
          <div
            className={cardClasses({
              hover: false,
              className:
                "relative mx-auto max-w-3xl overflow-hidden bg-gradient-to-br from-surface-hover via-surface-base to-transparent !p-8 text-center md:!p-12",
            })}
          >
            <div
              className="pointer-events-none absolute inset-y-4 left-0 w-1 rounded-full bg-gradient-to-b from-neon-cyan via-neon-blue to-transparent"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-neon-cyan/[0.05] blur-[70px]"
              aria-hidden
            />
            <span className="relative mb-5 inline-flex items-center rounded-full border border-strong bg-surface-glass px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-neon-cyan/70">
              {t("atAGlance")}
            </span>
            <p className="relative mx-auto max-w-2xl text-base leading-relaxed text-white/90 md:text-lg md:leading-relaxed">
              {text}
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
