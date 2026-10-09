import { getLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { ProcessStage } from "@/components/home/ProcessStage";
import { Button } from "@/components/ui/Button";
import { ChapterLead } from "@/components/ui/ChapterLead";
import { Reveal } from "@/components/ui/Reveal";
import { getHomeProcessSteps } from "@/content/home-process";

type Props = {
  headingId?: string;
  sectionId?: string;
  ctaHref?: string;
};

export async function HomeProcess({
  headingId = "home-process-heading",
  sectionId = "process",
  ctaHref = "/about",
}: Props = {}) {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("home");
  const steps = getHomeProcessSteps(locale);

  return (
    <section
      id={sectionId}
      aria-labelledby={headingId}
      className="process-section chapter chapter--void relative"
    >
      <div className="shell chapter-shell--standard relative">
        <Reveal variant="rise" when="chapter" className="mb-12 md:mb-16 lg:mb-20">
          <ChapterLead
            eyebrow={t("processEyebrow")}
            headingId={headingId}
            title={t("processTitle")}
            headingClassName="max-w-[20ch]"
            dek={t("processDek")}
          >
            <Button href={ctaHref} variant="link" arrow>
              {t("processCta")}
            </Button>
          </ChapterLead>
        </Reveal>

        <Reveal variant="rise" when="chapter">
          <ProcessStage steps={steps} ariaLabel={t("howWeWorkAria")} />
        </Reveal>
      </div>
    </section>
  );
}
