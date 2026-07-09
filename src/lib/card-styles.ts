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

/**
 * Site-wide feature card grids:
 * - 4 cards → centered 2×2 (default for capability sections)
 * - 3 cards → centered single row (legacy fallback; prefer 4 cards in content)
 * - 2 cards → avoid in content; fallback keeps a narrow 2-col grid
 */
export function featureCardGridClass(count: number, className?: string): string {
  return cn(
    "mx-auto grid w-full gap-grid-sm",
    count === 1 && "max-w-md",
    count === 2 && "max-w-3xl grid-cols-1 sm:grid-cols-2",
    count === 3 && "max-w-5xl grid-cols-1 md:grid-cols-3",
    count === 4 && "max-w-5xl grid-cols-1 sm:grid-cols-2",
    count >= 5 && count % 4 === 0 && "max-w-5xl grid-cols-1 sm:grid-cols-2",
    count >= 5 && count % 3 === 0 && "max-w-5xl grid-cols-1 md:grid-cols-3",
    count >= 5 && count % 4 !== 0 && count % 3 !== 0 && "max-w-5xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    className,
  );
}
