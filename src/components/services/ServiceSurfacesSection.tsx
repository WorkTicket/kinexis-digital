"use client";

import { useLocale } from "next-intl";
import { m as motion } from "@/lib/framer";
import Section from "@/components/shared/services/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import ServiceSurfacesViz from "@/components/services/hero-viz/ServiceSurfacesViz";
import { serviceSurfacesContent } from "@/content/services/service-surfaces";
import { useMotionVariants } from "@/hooks/useMotionVariants";
import { featureCardGridClass } from "@/lib/card-styles";
import type { ServiceSeoSlug } from "@/content/service-seo/types";
import type { Locale } from "@/i18n/routing";

type Props = {
  slug: ServiceSeoSlug;
  surfaceIndex: number;
};

export default function ServiceSurfacesSection({ slug, surfaceIndex }: Props) {
  const locale = useLocale() as Locale;
  const { fadeUp, stagger } = useMotionVariants();

  const content = serviceSurfacesContent[slug]?.[locale];
  if (!content) return null;

  return (
    <Section id="surfaces" variant="visual" surfaceIndex={surfaceIndex}>
      <div className="container-site">
        <SectionHeader title={content.title} description={content.subtitle} />

        <motion.div
          className={featureCardGridClass(content.surfaces.length, "section-content gap-10 md:gap-8")}
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {content.surfaces.map((surface) => (
            <motion.div
              key={surface.name}
              variants={fadeUp}
              className="group flex flex-col items-center text-center"
            >
              <div className="mb-6 flex h-[220px] w-full items-center justify-center">
                <ServiceSurfacesViz variant={surface.variant} />
              </div>
              <h3 className="font-bold">{surface.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{surface.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}
