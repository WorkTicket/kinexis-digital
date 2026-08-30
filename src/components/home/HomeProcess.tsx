import { getLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Button } from "@/components/ui/Button";
import { ChapterLead } from "@/components/ui/ChapterLead";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { getHomeProcessSteps } from "@/content/home-process";
import { duration } from "@/lib/motion";

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
            layout="split"
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
          {steps.map((step) => (
            <RevealItem key={step.id} as="li" variant="fadeUp">
              <article className="process-spine__step">
                <h3 className="process-spine__title">{step.title}</h3>
                <p className="process-spine__body">{step.description}</p>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
