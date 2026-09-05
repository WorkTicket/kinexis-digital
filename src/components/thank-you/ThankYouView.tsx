import { Calendar, Mail, Search } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { ThankYouConversion } from "@/components/analytics/ThankYouConversion";
import { PageHero } from "@/components/page/PageHero";
import { ChapterLead } from "@/components/ui/ChapterLead";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { getLeadConversionPixelUrl } from "@/lib/analytics/ads-config";
import { duration } from "@/lib/motion";

type ThankYouCopyNamespace = "pages.thankYou" | "pages.thankYouAudit";

const STEP_ICONS = [Search, Mail, Calendar] as const;

export async function ThankYouView({
  namespace,
}: {
  namespace: ThankYouCopyNamespace;
}) {
  const t = await getTranslations(namespace);
  const tCommon = await getTranslations("common");

  const conversionPixel = getLeadConversionPixelUrl();

  const steps = [
    { title: t("step1Title"), detail: t("step1Detail"), icon: STEP_ICONS[0] },
    { title: t("step2Title"), detail: t("step2Detail"), icon: STEP_ICONS[1] },
    { title: t("step3Title"), detail: t("step3Detail"), icon: STEP_ICONS[2] },
  ];

  return (
    <main className="flex flex-1 flex-col">
      {conversionPixel ? (
        <noscript>
          {/* Conversion pixel must be a raw img; next/image cannot run in noscript. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img height={1} width={1} alt="" src={conversionPixel} />
        </noscript>
      ) : null}
      <ThankYouConversion />
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        signal={t("signal")}
        copy={t("copy")}
        hideActions
      />

      <section
        aria-labelledby="thank-you-next-heading"
        className="chapter chapter--void relative"
      >
        <div className="shell relative py-24 md:py-32 lg:py-40">
          <Reveal variant="rise" when="chapter" className="mb-12 md:mb-16 lg:mb-20">
            <ChapterLead
              eyebrow={t("nextEyebrow")}
              headingId="thank-you-next-heading"
              title={t("nextTitle")}
              headingClassName="max-w-[12ch]"
              dek={t("nextDek")}
            />
          </Reveal>

          <RevealGroup
            as="ol"
            className="grid list-none grid-cols-1 gap-4 p-0 md:grid-cols-3 md:gap-5"
            stagger={duration.staggerTight}
            delayChildren={0.08}
            aria-label={t("nextAria")}
          >
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <RevealItem key={step.title} as="li" variant="fadeUp">
                  <article className="motion-card surface-tile">
                    <span className="icon-well mb-5" aria-hidden>
                      <Icon strokeWidth={1.5} />
                    </span>
                    <h3 className="font-[family-name:var(--font-display)] text-[clamp(1.85rem,3vw,2.35rem)] font-bold leading-[1.05] tracking-[-0.045em] text-balance text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-4 text-[0.975rem] leading-relaxed text-pretty text-muted md:text-base">
                      {step.detail}
                    </p>
                  </article>
                </RevealItem>
              );
            })}
          </RevealGroup>

          <Reveal variant="fadeUp" delay={0.2} when="chapter">
            <div className="mt-12 flex flex-col gap-3 sm:mt-16 sm:flex-row sm:items-center">
              {namespace === "pages.thankYouAudit" ? (
                <Button href="/contact" size="lg" arrow>
                  {tCommon("bookCall")}
                </Button>
              ) : (
                <Button href="/" size="lg" arrow>
                  {tCommon("backToHome")}
                </Button>
              )}
              <Button href="/case-studies" variant="link" arrow>
                {tCommon("seeTheWork")}
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
