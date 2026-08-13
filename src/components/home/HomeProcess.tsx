import { Search, TrendingUp, Wrench, type LucideIcon } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Button } from "@/components/ui/Button";
import { ChapterLead } from "@/components/ui/ChapterLead";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import {
  getHomeProcessSteps,
  type HomeProcessStepId,
} from "@/content/home-process";
import { duration } from "@/lib/motion";

const PROCESS_ICONS: Record<HomeProcessStepId, LucideIcon> = {
  audit: Search,
  build: Wrench,
  run: TrendingUp,
};

export async function HomeProcess() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("home");
  const steps = getHomeProcessSteps(locale);

  return (
    <section
      id="process"
      aria-labelledby="home-process-heading"
      className="process-section chapter chapter--void relative"
    >
      <div className="shell relative py-24 md:py-32 lg:py-40">
        <Reveal variant="rise" when="chapter" className="mb-12 md:mb-16 lg:mb-20">
          <ChapterLead
            eyebrow={t("processEyebrow")}
            headingId="home-process-heading"
            title={t("processTitle")}
            headingClassName="max-w-[12ch]"
            dek={t("processDek")}
          >
            <Button href="/about" variant="link" arrow>
              {t("processCta")}
            </Button>
          </ChapterLead>
        </Reveal>

        <RevealGroup
          as="ol"
          className="grid list-none grid-cols-1 gap-4 p-0 md:grid-cols-3 md:gap-5"
          stagger={duration.staggerTight}
          delayChildren={0.08}
          aria-label={t("howWeWorkAria")}
        >
          {steps.map((step) => {
            const Icon = PROCESS_ICONS[step.id];
            return (
              <RevealItem key={step.id} as="li" variant="fadeUp">
                <article className="motion-card surface-tile">
                  <span className="icon-well mb-5" aria-hidden>
                    <Icon strokeWidth={1.5} />
                  </span>
                  <h3 className="font-[family-name:var(--font-display)] text-[clamp(1.85rem,3vw,2.35rem)] font-bold leading-[1.05] tracking-[-0.045em] text-balance text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-[0.975rem] leading-relaxed text-pretty text-muted md:text-base">
                    {step.description}
                  </p>
                </article>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
