/**
 * All marketing cards → <Card> or cardClasses()
 * CardFamily → only when semantic family (glass/editorial/dashboard) matters
 * MetricCard → proof stats, case study metrics
 * Never inline: rounded-2xl border border-surface bg-surface-raised
 */
import { cardClasses, type CardSurface } from "@/lib/card-styles";
import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type CardProps = {
  surface?: CardSurface;
  hover?: boolean;
  animated?: boolean;
  press?: boolean;
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<"div">, "children">;

export default function Card({
  surface = "default",
  hover = true,
  animated = false,
  press = false,
  className,
  children,
  ...props
}: CardProps) {
  const classes = cardClasses({
    surface,
    hover,
    className: cn(
      animated && "motion-section",
      press && "active:scale-[0.982] transition-transform",
      className,
    ),
  });

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}

/** Compact row card for dashboard-style list items. */
export function CardRow({
  animated = false,
  className,
  children,
  ...props
}: Omit<CardProps, "surface">) {
  return (
    <Card
      surface="elevated"
      hover={false}
      animated={animated}
      className={cn(
        "flex flex-wrap items-center justify-between gap-4 px-5 py-4 md:px-6 md:py-5",
        className,
      )}
      {...props}
    >
      {children}
    </Card>
  );
}
