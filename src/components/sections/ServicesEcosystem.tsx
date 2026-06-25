"use client";

import { m as motion } from "@/lib/framer";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Search, BarChart3, Monitor, Filter, Palette, FileText } from "lucide-react";
import Button from "@/components/ui/Button";
import TwoLineText from "@/components/ui/TwoLineText";

const hubServiceKeys = [
  { key: "seo" as const, href: "/services/seo", icon: Search, position: "top" as const },
  { key: "webDesignShort" as const, href: "/services/web-design", icon: Monitor, position: "left" as const },
  { key: "paidAds" as const, href: "/services/paid-ads", icon: BarChart3, position: "right" as const },
  { key: "funnelsShort" as const, href: "/services/funnels", icon: Filter, position: "bottom" as const },
];

const secondaryServiceKeys = [
  { key: "content" as const, href: "/services/content-marketing", icon: FileText },
  { key: "branding" as const, href: "/services/branding", icon: Palette },
];

const stroke = "rgba(0, 212, 255,0.2)";
const HUB_RADIUS = 12;
const GAP = 4;

const hubConnectors = [
  { angle: -Math.PI / 2 },
  { angle: Math.PI },
  { angle: 0 },
  { angle: Math.PI / 2 },
] as const;

function hubLinePoints(angle: number) {
  const cx = 50;
  const cy = 50;
  const endDist = 50 - GAP;
  const startDist = HUB_RADIUS + 1;
  return {
    x1: cx + Math.cos(angle) * startDist,
    y1: cy + Math.sin(angle) * startDist,
    x2: cx + Math.cos(angle) * endDist,
    y2: cy + Math.sin(angle) * endDist,
  };
}

function HubNode({
  href,
  icon: Icon,
  title,
  className,
  delay,
}: {
  href: string;
  icon: typeof Search;
  title: string;
  className?: string;
  delay: number;
}) {
  return (
    <Link href={href} className={className}>
      <motion.div
        className="rounded-xl border border-white/[0.08] bg-bg-secondary/95 backdrop-blur-sm px-6 py-4 hover:border-neon-cyan/30 transition-all duration-500"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay }}
      >
        <div className="flex items-center gap-3 whitespace-nowrap">
          <Icon className="h-4 w-4 text-neon-cyan shrink-0" />
          <span className="font-bold">{title}</span>
        </div>
      </motion.div>
    </Link>
  );
}

function SecondaryNode({
  href,
  icon: Icon,
  title,
  delay,
}: {
  href: string;
  icon: typeof FileText;
  title: string;
  delay: number;
}) {
  return (
    <Link href={href} className="group">
      <motion.div
        className="flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.02] px-5 py-2.5 hover:border-neon-cyan/20 transition-all duration-500"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay }}
      >
        <Icon className="h-3.5 w-3.5 text-neon-cyan/70" />
        <span className="text-sm font-semibold text-muted group-hover:text-white transition-colors">
          {title}
        </span>
      </motion.div>
    </Link>
  );
}

export default function ServicesEcosystem() {
  const t = useTranslations("servicesEcosystem");
  const tServices = useTranslations("services");
  const tCommon = useTranslations("common");

  const hubServices = hubServiceKeys.map((s) => ({
    ...s,
    title: tServices(s.key),
  }));

  const secondaryServices = secondaryServiceKeys.map((s) => ({
    ...s,
    title: tServices(s.key),
  }));

  return (
    <section className="section-padding border-t border-white/[0.06]">
      <div className="container-site">
        <div className="section-header">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            {t("label")}
          </span>
          <h2 className="section-title"><TwoLineText text={t("title")} variant="section" /></h2>
          <p className="section-subtitle"><TwoLineText text={t("subtitle")} variant="body" /></p>
        </div>

        <div className="relative mx-auto mt-20 hidden md:grid max-w-lg grid-cols-[1fr_auto_1fr] grid-rows-[auto_auto_auto_auto] items-center justify-items-center gap-y-8 gap-x-4">
          <HubNode
            href="/services/seo"
            icon={Search}
            title={tServices("seo")}
            className="col-start-2 row-start-1"
            delay={0.4}
          />

          <HubNode
            href="/services/web-design"
            icon={Monitor}
            title={tServices("webDesignShort")}
            className="col-start-1 row-start-2 justify-self-end"
            delay={0.5}
          />

          <div className="col-start-2 row-start-2 relative flex h-36 w-36 items-center justify-center">
            <svg
              viewBox="0 0 100 100"
              className="absolute inset-0 h-full w-full pointer-events-none"
              fill="none"
              aria-hidden
            >
              <motion.g
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                {hubConnectors.map((conn, i) => {
                  const line = hubLinePoints(conn.angle);
                  return (
                    <line
                      key={i}
                      x1={line.x1}
                      y1={line.y1}
                      x2={line.x2}
                      y2={line.y2}
                      stroke={stroke}
                      strokeWidth="0.6"
                      strokeDasharray="3 2"
                    />
                  );
                })}

                {hubConnectors.map((conn, i) => {
                  const line = hubLinePoints(conn.angle);
                  return (
                    <motion.circle
                      key={`pulse-${i}`}
                      r="1.2"
                      fill="#00d4ff"
                      initial={{ cx: line.x1, cy: line.y1, opacity: 0 }}
                      animate={{
                        cx: [line.x1, line.x2, line.x1],
                        cy: [line.y1, line.y2, line.y1],
                        opacity: [0, 0.9, 0],
                      }}
                      transition={{
                        duration: 2.8,
                        repeat: Infinity,
                        delay: i * 0.55,
                        ease: "easeInOut",
                      }}
                    />
                  );
                })}
              </motion.g>
            </svg>

            <motion.div
              className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full border-2 border-neon-cyan/30 bg-bg-dark shadow-xl shadow-neon-cyan/10"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <motion.span
                className="absolute inset-0 rounded-full border border-neon-cyan/20"
                animate={{ scale: [1, 1.12, 1], opacity: [0.4, 0, 0.4] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="text-sm font-bold tracking-[0.15em] text-neon-cyan">KINEXIS</span>
            </motion.div>
          </div>

          <HubNode
            href="/services/paid-ads"
            icon={BarChart3}
            title={tServices("paidAds")}
            className="col-start-3 row-start-2 justify-self-start"
            delay={0.5}
          />

          <HubNode
            href="/services/funnels"
            icon={Filter}
            title={tServices("funnelsShort")}
            className="col-start-2 row-start-3"
            delay={0.6}
          />

          <div className="col-span-3 row-start-4 flex justify-center gap-6 pt-2">
            {secondaryServices.map((service, i) => (
              <SecondaryNode
                key={service.href}
                href={service.href}
                icon={service.icon}
                title={service.title}
                delay={0.7 + i * 0.1}
              />
            ))}
          </div>
        </div>

        <div className="section-content grid grid-cols-1 gap-3 md:hidden">
          {[...hubServices, ...secondaryServices].map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.href}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <Link href={service.href} className="group block touch-manipulation">
                  <div className="service-card">
                    <div className="flex items-center gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-neon-cyan/10">
                        <Icon className="h-5 w-5 text-neon-cyan" />
                      </div>
                      <span className="service-card__title">{service.title}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="section-cta-row">
          <Button href="/services" variant="secondary" fullWidthMobile>
            {tCommon("viewAllServices")}
          </Button>
        </div>
      </div>
    </section>
  );
}
