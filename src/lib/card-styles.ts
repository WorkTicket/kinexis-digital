import { cn } from "@/lib/utils";

export type CardSurface = "default" | "glass" | "elevated";

/** Shared card class strings — single source of truth for Card, CardFamily, and service cards. */
export const cardSurfaces: Record<CardSurface, string> = {
  default: "rounded-2xl border border-surface bg-surface-raised card-pad",
  glass: "rounded-2xl border border-surface bg-surface-glass backdrop-blur-xl card-pad",
  elevated:
    "rounded-2xl border border-surface bg-surface-base card-pad transition-colors duration-300 hover:border-strong hover:bg-surface-glass",
};

type CardClassOptions = {
  surface?: CardSurface;
  hover?: boolean;
  className?: string;
};

export function cardClasses({
  surface = "default",
  hover = true,
  className,
}: CardClassOptions = {}): string {
  return cn(cardSurfaces[surface], hover && "motion-card", className);
}
