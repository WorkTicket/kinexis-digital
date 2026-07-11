import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import TwoLineText from "@/components/ui/TwoLineText";

export type HeroTitleVariant = "default" | "split" | "center" | "article" | "section";

export const heroTitleVariantClasses: Record<HeroTitleVariant, string> = {
  default: "type-hero",
  split: "type-hero type-hero--split",
  center: "type-hero type-hero--center",
  article: "type-hero type-hero--center type-hero--article",
  section: "type-section type-section--center",
};

export type HeroSubtitleVariant = "hero" | "intro" | "intro-center" | "intro-plain" | "meta";

export function heroLabelClassName(className?: string) {
  return cn("hero-label", className);
}

export function heroTitleClassName(variant: HeroTitleVariant = "default", className?: string) {
  return cn(heroTitleVariantClasses[variant], "font-bold tracking-tight text-balance", className);
}

export function heroSubtitleClassName(variant: HeroSubtitleVariant = "hero", className?: string) {
  const variantClass =
    variant === "hero"
      ? "hero__subtitle"
      : variant === "intro"
        ? "section-intro-lg mt-8"
        : variant === "intro-center"
          ? "section-intro-lg section-intro-lg--center"
          : variant === "intro-plain"
            ? "section-intro-lg"
            : "mt-3 text-sm text-muted";

  return cn(variantClass, className);
}

/** Eyebrow label above hero headlines. */
export const HeroLabel = forwardRef<
  HTMLSpanElement,
  { children: ReactNode; className?: string }
>(function HeroLabel({ children, className }, ref) {
  return (
    <span ref={ref} className={heroLabelClassName(className)}>
      {children}
    </span>
  );
});

type HeroTitleProps = HTMLAttributes<HTMLHeadingElement> & {
  children: ReactNode;
  className?: string;
  id?: string;
  variant?: HeroTitleVariant;
};

/** Hero headline wrapper — pass pre-composed title content. */
export const HeroTitle = forwardRef<HTMLHeadingElement, HeroTitleProps>(function HeroTitle(
  { children, className, id, variant = "default", ...rest },
  ref,
) {
  return (
    <h1 ref={ref} id={id} className={heroTitleClassName(variant, className)} {...rest}>
      {children}
    </h1>
  );
});

type HeroSubtitleProps = {
  children?: ReactNode;
  text?: string;
  className?: string;
  lineClassName?: string;
  variant?: HeroSubtitleVariant;
};

/** Hero supporting copy — canonical muted opacity via variant classes. */
export const HeroSubtitle = forwardRef<HTMLParagraphElement, HeroSubtitleProps & HTMLAttributes<HTMLParagraphElement>>(
  function HeroSubtitle(
    { children, text, className, lineClassName, variant = "hero", ...rest },
    ref,
  ) {
    return (
      <p ref={ref} className={heroSubtitleClassName(variant, className)} {...rest}>
        {children ?? (text ? <TwoLineText text={text} variant="body" className={lineClassName} /> : null)}
      </p>
    );
  },
);
