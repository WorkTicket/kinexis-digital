import { getTranslations } from "next-intl/server";
import { ServiceLaneArt } from "@/components/page/ServiceLaneArt";
import { Button } from "@/components/ui/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import type { ServicePage } from "@/content/services";

type Props = {
  service: ServicePage;
  index: number;
};

function CheckIcon() {
  return (
    <svg
      className="svc-offer__check"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
    >
      <path
        d="M4.2 10.4 8 14.1 15.8 5.8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export async function ServiceProgramChapter({ service }: Props) {
  const t = await getTranslations("common");
  const headingId = `${service.slug}-heading`;

  return (
    <article
      id={service.slug}
      aria-labelledby={headingId}
      className="svc-offer"
    >
      <Reveal variant="fade" when="chapter" className="svc-offer__still">
        <ServiceLaneArt slug={service.slug} />
      </Reveal>

      <div className="svc-offer__body">
        <Reveal variant="rise" when="chapter">
          <p className="svc-offer__role">{service.role}</p>
          <h2 id={headingId} className="svc-offer__title">
            {service.title}
          </h2>
          <p className="svc-offer__lede">{service.heroCopy}</p>
        </Reveal>

        <Reveal variant="fadeUp" delay={0.08} when="chapter">
          <p className="svc-offer__copy">{service.problemCopy}</p>
          <p className="svc-offer__copy">{service.approachCopy}</p>
        </Reveal>

        <div className="svc-offer__facts">
          <div>
            <Reveal variant="fadeUp" delay={0.1} when="chapter">
              <h3 className="svc-offer__label">{t("whatsIncluded")}</h3>
            </Reveal>
            <RevealGroup
              as="ul"
              className="svc-offer__included"
              stagger={0.055}
              delayChildren={0.06}
            >
              {service.deliverables.map((item) => (
                <RevealItem as="li" key={item.title} variant="fadeUp">
                  <CheckIcon />
                  <span>
                    <strong>{item.title}.</strong> {item.description}
                  </span>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

          <RevealGroup
            className="svc-offer__side"
            stagger={0.1}
            delayChildren={0.08}
          >
            <RevealItem>
              <h3 className="svc-offer__label">{t("whatYouGet")}</h3>
              <ul className="svc-offer__list">
                {service.outcomes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </RevealItem>
            <RevealItem>
              <h3 className="svc-offer__label">{t("aFitIf")}</h3>
              <ul className="svc-offer__list">
                {service.fitFor.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </RevealItem>
          </RevealGroup>
        </div>

        <Reveal
          variant="fadeUp"
          delay={0.14}
          when="chapter"
          className="svc-offer__cta"
        >
          <Button href="/contact" arrow>
            {t("talkAbout", { name: service.shortTitle })}
          </Button>
        </Reveal>
      </div>
    </article>
  );
}
