import { getLocale, getTranslations } from "next-intl/server";
import {
  Activity,
  Layers,
  Search,
  type LucideIcon,
} from "lucide-react";
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
  build: Layers,
  run: Activity,
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
      <div className="shell chapter-shell--tight relative">
        <Reveal variant="rise" when="chapter" className="mb-10 md:mb-14">
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
          className="process-spine"
          stagger={duration.staggerTight}
          delayChildren={0.06}
          aria-label={t("howWeWorkAria")}
        >
          {steps.map((step) => {
            const Icon = PROCESS_ICONS[step.id] ?? Search;
            return (
              <RevealItem key={step.id} as="li" variant="fadeUp">
                <article className="process-spine__step">
                  <span className="icon-well" aria-hidden>
                    <Icon strokeWidth={1.5} />
                  </span>
                  <h3 className="process-spine__title">{step.title}</h3>
                  <p className="process-spine__body">{step.description}</p>
                </article>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
