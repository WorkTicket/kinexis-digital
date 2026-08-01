"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Search, BarChart3, Monitor, Filter } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import SectionHeader from "@/components/ui/SectionHeader";
import Section from "@/components/shared/services/Section";
import { featureCardGridClass } from "@/lib/card-styles";
import { getServiceExploreLabel } from "@/lib/service-explore-labels";

const pillars = [
  {
    key: "seo" as const,
    serviceKey: "seo" as const,
    href: "/services/seo",
    icon: Search,
  },
  {
    key: "paid" as const,
    serviceKey: "paidAds" as const,
    href: "/services/ppc-management",
    icon: BarChart3,
  },
  {
    key: "web" as const,
    serviceKey: "webDesignShort" as const,
    href: "/services/web-design",
    icon: Monitor,
  },
  {
    key: "funnels" as const,
    serviceKey: "funnelsShort" as const,
    href: "/services/funnels",
    icon: Filter,
  },
] as const;

type Props = { surfaceIndex?: number };

export default function ServicesEcosystem({ surfaceIndex = 0 }: Props) {
  const t = useTranslations("servicesEcosystem");
  const tServices = useTranslations("services");
  const tCommon = useTranslations("common");

  return (
    <Section id="services-ecosystem" surfaceIndex={surfaceIndex}>
      <div className="container-site">
        <SectionHeader
          badge={t("label")}
          title={t("title")}
          description={t("subtitle")}
          headingId="services-ecosystem-heading"
          align="center"
        />

        <ul className={`section-content ${featureCardGridClass(4)}`}>
          {pillars.map((pillar) => (
            <li key={pillar.href}>
              <Link href={pillar.href} className="group block h-full touch-manipulation">
                <Card className="flex h-full flex-col">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 transition-colors group-hover:bg-white/10">
                    <pillar.icon className="h-5 w-5 text-neon-cyan" aria-hidden />
                  </div>
                  <h3 className="card-heading transition-colors duration-200 group-hover:text-neon-cyan">
                    {tServices(pillar.serviceKey)}
                  </h3>
                  <p className="mt-3 flex-1 type-body text-muted">{t(`pillars.${pillar.key}`)}</p>
                  <div className="mt-8 border-t border-strong pt-5">
                    <span className="inline-flex min-h-touch items-center gap-2 text-sm font-semibold text-neon-cyan">
                      {getServiceExploreLabel(pillar.href)}
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Card>
              </Link>
            </li>
          ))}
        </ul>

        <div className="section-cta-row">
          <Button href="/services" variant="secondary" fullWidthMobile>
            {tCommon("viewAllServices")}
          </Button>
        </div>
      </div>
    </Section>
  );
}
