import { getTranslations } from "next-intl/server";
import { serviceMarks } from "@/components/home/studio-marks";
import { Button } from "@/components/ui/Button";
import { LcpImage } from "@/components/ui/LcpImage";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import type { ServicePage } from "@/content/services";
import { serviceVisuals } from "@/content/service-visuals";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import "@/styles/components/page-stages.css";

type Props = {
  service: ServicePage;
  index: number;
  /** Hub chapters show the photograph. Detail chapters show the studio drawing. */
  still?: boolean;
  /** Hub chapters link through to the service page. */
  linkPage?: boolean;
};

export async function ServiceProgramChapter({
  service,
  index,
  still = true,
  linkPage = false,
}: Props) {
  const t = await getTranslations("common");
  const headingId = `${service.slug}-heading`;
  const visual = serviceVisuals[service.slug];
  const Mark = serviceMarks[service.slug];

  return (
    <article
      id={service.slug}
      aria-labelledby={headingId}
      className={cn(
        "svc-offer",
        !still && Mark && "svc-offer--mark",
        !still && !Mark && "svc-offer--copy",
        still && index % 2 === 1 && "svc-offer--flip",
      )}
    >
      {!still && Mark ? (
        <div className="svc-offer__mark" aria-hidden>
          <Mark />
        </div>
      ) : null}
      {still ? (
        <Reveal variant="fade" when="chapter" className="svc-offer__still">
          {linkPage ? (
            <Link
              href={service.href}
              className="svc-offer__still-link"
              aria-label={service.title}
            >
              <div className="ind-offer__media">
                <LcpImage
                  src={visual.src}
                  alt=""
                  sizes="(max-width: 1023px) 100vw, 46vw"
                  quality={90}
                  width={1200}
                  height={750}
                />
              </div>
            </Link>
          ) : (
            <div className="ind-offer__media" aria-hidden>
              <LcpImage
                src={visual.src}
                alt=""
                sizes="(max-width: 1023px) 100vw, 46vw"
                quality={90}
                width={1200}
                height={750}
              />
            </div>
          )}
        </Reveal>
      ) : null}

      <div className="svc-offer__body">
        <Reveal variant="rise" when="chapter">
          <p className="svc-offer__role">{service.role}</p>
          <h2 id={headingId} className="svc-offer__title">
            {linkPage ? (
              <Link href={service.href}>{service.title}</Link>
            ) : (
              service.title
            )}
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
                  <strong>{item.title}.</strong> {item.description}
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
          {linkPage ? (
            <>
              <Button href={service.href} arrow>
                {t("seeServicePage", { name: service.shortTitle })}
              </Button>
              <Button href="/contact" variant="link" arrow>
                {t("bookStrategyCall")}
              </Button>
            </>
          ) : (
            <Button href="/contact" arrow>
              {t("talkAbout", { name: service.shortTitle })}
            </Button>
          )}
        </Reveal>
      </div>
    </article>
  );
}
