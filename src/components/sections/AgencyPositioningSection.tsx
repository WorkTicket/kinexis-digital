"use client";

import { m as motion } from "@/lib/framer";
import {
  Building2,
  Home,
  Layers,
  MapPin,
  Rocket,
  ShoppingCart,
  type LucideIcon,
} from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import TwoLineText from "@/components/ui/TwoLineText";
import { cn } from "@/lib/utils";
import { cardClasses } from "@/lib/card-styles";
import type { AgencyHubContent } from "@/content/agency-hub";
import Section from "@/components/shared/services/Section";

type Props = {
  positioning: AgencyHubContent["positioning"];
  outro: AgencyHubContent["outro"];
  surfaceIndex?: number;
};

const pillarMeta: { icon: LucideIcon; accent: string }[] = [
  { icon: Home, accent: "#00d4ff" },
  { icon: MapPin, accent: "#00a8e8" },
  { icon: ShoppingCart, accent: "#0099cc" },
  { icon: Building2, accent: "#00b8d9" },
  { icon: Layers, accent: "#00c4e0" },
  { icon: Rocket, accent: "#00d4ff" },
];

function SpectrumScale() {
  return (
    <div className="mx-auto mt-14 max-w-3xl lg:mt-16" aria-hidden>
      <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">
        <span>Local</span>
        <span className="hidden sm:inline">National</span>
        <span className="hidden md:inline">Enterprise</span>
        <span>SaaS</span>
      </div>
      <div className="relative mt-3 h-1 overflow-hidden rounded-full bg-surface-hover">
        <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/20 via-neon-cyan/50 to-neon-cyan" />
        <motion.div
          className="absolute inset-y-0 left-0 w-full origin-left bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}

function PillarCard({
  index,
  title,
  description,
  icon: Icon,
  accent,
}: {
  index: number;
  title: string;
  description: string;
  icon: LucideIcon;
  accent: string;
}) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      className={cn(cardClasses({ surface: "elevated" }), "group relative flex h-full flex-col p-6 md:p-7")}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full blur-[60px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `${accent}18` }}
        aria-hidden
      />

      <div className="relative flex items-start justify-between gap-4">
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-all duration-500 group-hover:shadow-[0_0_20px_-4px_rgba(0,212,255,0.35)]"
          style={{
            borderColor: `${accent}30`,
            backgroundColor: `${accent}10`,
          }}
        >
          <Icon className="h-5 w-5" style={{ color: accent }} strokeWidth={1.75} />
        </span>
        <span className="text-[10px] font-bold tabular-nums tracking-[0.18em] text-white/25">{num}</span>
      </div>

      <h3 className="card-heading relative mt-5">{title}</h3>
      <p className="type-body text-muted relative mt-3 flex-1">{description}</p>
    </motion.div>
  );
}

export default function AgencyPositioningSection({ positioning, outro, surfaceIndex = 0 }: Props) {
  return (
    <Section id="agency-positioning" surfaceIndex={surfaceIndex} className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.028)_1px,transparent_1px)] bg-[size:26px_26px] opacity-35"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/4 h-[24rem] w-[24rem] -translate-x-1/2 rounded-full bg-neon-cyan/[0.04] blur-[120px]"
        aria-hidden
      />

      <div className="container-site relative z-10">
        <SectionHeader
          className="max-w-[54rem]"
          badge="Full Spectrum"
          title={positioning.title}
          description={positioning.subtitle}
          headingId="agency-positioning-heading"
        />

        <SpectrumScale />

        <div className="section-content mx-auto mt-10 grid max-w-6xl gap-3 md:grid-cols-2 lg:grid-cols-3 lg:gap-grid-sm auto-rows-fr">
          {positioning.pillars.map((pillar, i) => {
            const meta = pillarMeta[i] ?? pillarMeta[0];
            return (
              <PillarCard
                key={pillar.title}
                index={i}
                title={pillar.title}
                description={pillar.description}
                icon={meta.icon}
                accent={meta.accent}
              />
            );
          })}
        </div>

        <motion.div
          className="section-content mx-auto mt-14 max-w-3xl lg:mt-16"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative overflow-hidden rounded-2xl border border-strong bg-gradient-to-br from-white/[0.04] via-bg-secondary/90 to-bg-dark px-6 py-8 text-center md:px-10 md:py-10">
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-br from-neon-cyan/[0.03] via-transparent to-transparent"
              aria-hidden
            />
            <p className="relative type-subheader text-balance">
              <TwoLineText text={outro.title} variant="subheader" />
            </p>
            <p className="relative mt-4 section-intro section-intro--center mx-auto max-w-2xl text-muted">
              {outro.paragraphs[0]}
            </p>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
