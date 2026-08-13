import Image from "next/image";
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

const tileClass =
  "group flex h-full flex-col overflow-hidden rounded-2xl bg-[color-mix(in_oklab,var(--foreground)_4%,transparent)] text-inherit no-underline transition-[transform,background-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:bg-[color-mix(in_oklab,var(--foreground)_7%,transparent)] hover:shadow-[0_24px_48px_-32px_color-mix(in_oklab,#000_55%,transparent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--hero-signal)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:hover:shadow-none";

function ServiceTile({
  service,
  priority = false,
}: {
  service: HomeService;
  priority?: boolean;
}) {
  const visual = serviceVisuals[service.slug];

  return (
    <Link href={service.href} className={tileClass}>
      <div className="relative aspect-[16/10] overflow-hidden bg-[#06070b]">
        <Image
          src={visual.src}
          alt={visual.alt}
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 1099px) 50vw, 33vw"
          className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          priority={priority}
        />
      </div>
      <div className="flex flex-1 flex-col p-6 md:p-7">
        <p className="text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-[color:var(--hero-signal)]">
          {service.role}
        </p>
        <h3 className="mt-2.5 font-[family-name:var(--font-display)] text-[1.55rem] font-bold leading-[1.08] tracking-[-0.04em] text-balance text-foreground transition-colors duration-300 group-hover:text-[color:var(--hero-signal)] md:text-[1.75rem]">
          {service.shortTitle}
        </h3>
        <p className="mt-3 text-[0.975rem] leading-relaxed text-pretty text-muted md:text-base">
          {service.description}
        </p>
        <ul
          className="mt-auto flex flex-wrap gap-x-4 gap-y-1.5 pt-5 text-[0.8125rem] font-medium tracking-[-0.01em] text-[color-mix(in_oklab,var(--foreground)_42%,var(--muted))]"
          aria-label={`${service.title} capabilities`}
        >
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
      <div className="shell relative py-24 md:py-32 lg:py-40">
        <Reveal variant="rise" when="chapter" className="mb-12 md:mb-16 lg:mb-20">
          <ChapterLead
            eyebrow={t("servicesEyebrow")}
            headingId="home-services-heading"
            title={t("servicesTitle")}
            className="mx-auto text-center md:mx-0 md:text-left"
            headingClassName="mx-auto max-w-none md:mx-0 md:max-w-[12ch]"
            dek={t("servicesDek")}
          >
            <Button href="/services" variant="link" arrow>
              {t("servicesCta")}
            </Button>
          </ChapterLead>
        </Reveal>

        <RevealGroup
          as="ul"
          className="grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5"
          stagger={duration.staggerTight}
          delayChildren={0.08}
          aria-label={t("demandProgramAria")}
        >
          {services.map((service, index) => (
            <RevealItem key={service.slug} as="li" variant="fadeUp">
              <ServiceTile service={service} priority={index === 0} />
            </RevealItem>
          ))}
          <RevealItem as="li" variant="fadeUp">
            <Link
              href="/services"
              className={cn(tileClass, "p-6 md:p-7")}
            >
              <p className="text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-[color:var(--hero-signal)]">
                {t("programLabel")}
              </p>
              <h3 className="mt-2.5 font-[family-name:var(--font-display)] text-[1.55rem] font-bold leading-[1.08] tracking-[-0.04em] text-balance text-foreground transition-colors duration-300 group-hover:text-[color:var(--hero-signal)] md:text-[1.75rem]">
                {t("viewAllServicesTitle")}
              </h3>
              <p className="mt-3 text-[0.975rem] leading-relaxed text-pretty text-muted md:text-base">
                {t("viewAllServicesDek")}
              </p>
              <ul
                className="mt-auto grid gap-1.5 pt-8 font-[family-name:var(--font-display)] text-[1.0625rem] font-bold tracking-[-0.03em] text-foreground"
                aria-label={t("onServicesPageAria")}
              >
                <li>{t("theMix")}</li>
                <li>{t("whatsIncluded")}</li>
                <li>{t("whereToStart")}</li>
              </ul>
              <span
                aria-hidden
                className="mt-8 inline-flex items-center gap-2.5 text-base font-semibold tracking-[0.03em] text-[color-mix(in_oklab,var(--foreground)_62%,transparent)] transition-colors duration-200 group-hover:text-foreground"
              >
                <span className="border-b-[1.5px] border-transparent pb-[0.12em] transition-[border-color] duration-300 group-hover:border-foreground">
                  {t("servicesCta")}
                </span>
                <span className="transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none">
                  →
                </span>
              </span>
            </Link>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}
