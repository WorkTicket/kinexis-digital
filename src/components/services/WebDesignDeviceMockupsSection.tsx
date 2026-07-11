"use client";

import { m as motion } from "@/lib/framer";
import Section from "@/components/shared/services/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import WebDesignDeviceMockupsViz, {
  type DeviceMockupVariant,
} from "@/components/services/hero-viz/WebDesignDeviceMockupsViz";
import { webDesignContent } from "@/content/services/web-design";
import { useMotionVariants } from "@/hooks/useMotionVariants";
import { featureCardGridClass } from "@/lib/card-styles";
import { useLocale } from "next-intl";
import type { Locale } from "@/i18n/routing";

const DEVICE_VARIANTS: DeviceMockupVariant[] = ["desktop", "laptop", "tablet", "mobile"];

type Props = {
  surfaceIndex: number;
};

export default function WebDesignDeviceMockupsSection({ surfaceIndex }: Props) {
  const locale = useLocale() as Locale;
  const { fadeUp, stagger } = useMotionVariants();
  const content = webDesignContent[locale];
  const isEn = locale === "en";
  const description = isEn ? "Responsive across breakpoints" : "Responsive en breakpoints";

  return (
    <Section id="device-mockups" variant="visual" surfaceIndex={surfaceIndex}>
      <div className="container-site">
        <SectionHeader title={content.surfacesTitle} description={content.surfacesSubtitle} />

        <motion.div
          className={featureCardGridClass(content.devices.length, "section-content gap-10 md:gap-8")}
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {content.devices.map((device, index) => (
            <motion.div key={device.name} variants={fadeUp} className="group flex flex-col items-center text-center">
              <div className="mb-6 flex h-[280px] w-full items-center justify-center">
                <WebDesignDeviceMockupsViz variant={DEVICE_VARIANTS[index]} delay={0.2 + index * 0.15} />
              </div>
              <h3 className="font-bold">{device.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}
