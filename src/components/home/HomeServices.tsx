import Image from "next/image";
import "@/styles/routes/home-services.css";
import { getLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { ChapterLead } from "@/components/ui/ChapterLead";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { getHomeServices, type HomeService } from "@/content/home-services";
import { serviceVisuals } from "@/content/service-visuals";
import { cn } from "@/lib/cn";
import { duration } from "@/lib/motion";

function ServiceRow({
  service,
  flipped,
}: {
  service: HomeService;
  flipped: boolean;
}) {
  const visual = serviceVisuals[service.slug];

  return (
    <Link
      href={service.href}
      className={cn(
        "service-spread__link group",
        flipped && "service-spread__link--flip",
      )}
    >
      <div className={cn("service-spread__art", `service-spread__art--${service.slug}`)}>
        <div className="service-spread__plate">
          <Image
            src={visual.src}
            alt={visual.alt}
            fill
            sizes="(max-width: 899px) 100vw, 46vw"
            quality={90}
            className="service-spread__img"
          />
        </div>
      </div>
      <div className="service-spread__copy">
        <p className="service-spread__role">{service.role}</p>
        <h3 className="service-spread__title">{service.shortTitle}</h3>
        <p className="service-spread__dek">{service.description}</p>
        <ul className="service-spread__caps" aria-label={`${service.title} capabilities`}>
          {service.capabilities.slice(0, 3).map((cap) => (
            <li key={cap}>{cap}</li>
          ))}
        </ul>
      </div>
    </Link>
  );
}

export async function HomeServices() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("home");
  const services = getHomeServices(locale);

  return (
    <section
      id="services"
      aria-labelledby="home-services-heading"
      className="services-section chapter chapter--void relative"
    >
      <div className="shell chapter-shell--standard relative">
        <Reveal variant="rise" when="chapter" className="mb-12 md:mb-16 lg:mb-20">
          <ChapterLead
            eyebrow={t("servicesEyebrow")}
            headingId="home-services-heading"
            title={t("servicesTitle")}
            headingClassName="max-w-[20ch]"
            dek={t("servicesDek")}
          >
            <Button href="/services" variant="link" arrow>
              {t("servicesCta")}
            </Button>
          </ChapterLead>
        </Reveal>

        <RevealGroup
          as="ul"
          className="service-spread"
          stagger={duration.staggerTight}
          delayChildren={0.08}
          aria-label={t("demandProgramAria")}
        >
          {services.map((service, index) => (
            <RevealItem key={service.slug} as="li" variant="fadeUp">
              <ServiceRow service={service} flipped={index % 2 === 1} />
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal variant="fadeUp" className="service-spread__cta">
          <p className="service-spread__cta-copy">{t("viewAllServicesDek")}</p>
          <Button href="/services" size="lg" arrow>
            {t("viewAllServicesTitle")}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
