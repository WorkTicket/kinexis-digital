"use client";

import { m as motion } from "@/lib/framer";
import SectionHeader from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";
import { useMotionVariants } from "@/hooks/useMotionVariants";
import {
  AlertTriangle,
  ArrowDownRight,
  Smartphone,
  Zap,
  Map,
  Palette,
  MousePointerClick,
  Gauge,
  type LucideIcon,
} from "lucide-react";

type Variant = "problem" | "solution";

type SeoInsightPanelProps = {
  variant: Variant;
  title: string;
  intro: string;
  points: string[];
};

const problemIcons: LucideIcon[] = [AlertTriangle, ArrowDownRight, Smartphone, Zap];
const solutionIcons: LucideIcon[] = [Map, Palette, MousePointerClick, Gauge];

const themes: Record<
  Variant,
  {
    section: string;
    introCard: string;
    introGlow: string;
    pointCard: string;
    pointText: string;
    iconBox: string;
    iconColor: string;
  }
> = {
  problem: {
    section: "section-padding section--editorial",
    introCard:
      "rounded-2xl border border-red-500/10 bg-gradient-to-br from-red-950/30 via-red-950/10 to-transparent p-8 md:p-10",
    introGlow: "bg-red-500/[0.07]",
    pointCard:
      "group rounded-2xl border border-red-500/[0.08] bg-red-950/10 p-6 transition-all duration-500 hover:border-red-500/20 hover:bg-red-950/15",
    pointText: "text-sm leading-relaxed text-red-100/70 md:text-base",
    iconBox:
      "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-red-500/15 bg-red-500/10 transition-all duration-500 group-hover:border-red-400/30 group-hover:bg-red-500/15",
    iconColor: "text-red-400/80",
  },
  solution: {
    section: "section-padding section--data",
    introCard:
      "rounded-2xl border border-neon-cyan/10 bg-gradient-to-br from-neon-cyan/[0.08] via-emerald-950/20 to-transparent p-8 md:p-10",
    introGlow: "bg-neon-cyan/[0.06]",
    pointCard:
      "group rounded-2xl border border-white/[0.06] bg-white/[0.025] p-6 transition-all duration-500 hover:border-neon-cyan/20 hover:bg-white/[0.04]",
    pointText: "text-sm leading-relaxed text-muted md:text-base",
    iconBox:
      "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-neon-cyan/15 bg-neon-cyan/10 transition-all duration-500 group-hover:border-neon-cyan/30 group-hover:shadow-glow-sm",
    iconColor: "text-neon-cyan",
  },
};

export default function SeoInsightPanel({ variant, title, intro, points }: SeoInsightPanelProps) {
  const { fadeUp, stagger } = useMotionVariants();
  const theme = themes[variant];
  const icons = variant === "problem" ? problemIcons : solutionIcons;

  return (
    <section className={theme.section}>
      <div className="container-site">
        <SectionHeader pattern="B" title={title} />

        <div className="section-content grid gap-grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start">
          <motion.div
            className={cn("relative overflow-hidden", theme.introCard)}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className={cn(
                "pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full blur-[60px]",
                theme.introGlow,
              )}
              aria-hidden
            />
            <p className="relative text-base leading-relaxed text-muted md:text-lg">{intro}</p>
          </motion.div>

          <motion.ul
            className="grid gap-grid-sm sm:grid-cols-2"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {points.map((point, i) => {
              const Icon = icons[i % icons.length];
              return (
                <motion.li key={point.slice(0, 48)} variants={fadeUp} className={theme.pointCard}>
                  <div className="flex gap-4">
                    <div className={theme.iconBox} aria-hidden>
                      <Icon className={cn("h-5 w-5", theme.iconColor)} />
                    </div>
                    <p className={theme.pointText}>{point}</p>
                  </div>
                </motion.li>
              );
            })}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
