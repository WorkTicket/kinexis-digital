import type { IndustrySlug } from "@/content/industries";
import { cn } from "@/lib/cn";
import {
  House,
  ShoppingCart,
  HeartPulse,
  Smile,
  Scale,
  Building2,
  UtensilsCrossed,
  Cloud,
  Car,
  Dumbbell,
  HardHat,
  BriefcaseBusiness,
  TrendingUp,
  GraduationCap,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

type GlyphProps = {
  slug: IndustrySlug;
  className?: string;
};

const ICONS: Record<IndustrySlug, LucideIcon> = {
  "home-services": House,
  ecommerce: ShoppingCart,
  healthcare: HeartPulse,
  dental: Smile,
  legal: Scale,
  "real-estate": Building2,
  restaurants: UtensilsCrossed,
  saas: Cloud,
  automotive: Car,
  fitness: Dumbbell,
  construction: HardHat,
  "professional-services": BriefcaseBusiness,
  "financial-services": TrendingUp,
  education: GraduationCap,
  "beauty-wellness": Sparkles,
};

export function IndustryGlyph({ slug, className }: GlyphProps) {
  const Icon = ICONS[slug];

  return (
    <Icon
      aria-hidden
      className={cn("industry-glyph", className)}
      strokeWidth={1.5}
    />
  );
}
