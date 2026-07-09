"use client";

import type { ReactNode } from "react";
import { m as motion } from "@/lib/framer";
import type { Variants } from "@/lib/framer";
import TwoLineText from "@/components/ui/TwoLineText";
import {
  heroLabelClassName,
  heroSubtitleClassName,
  heroTitleClassName,
  type HeroSubtitleVariant,
  type HeroTitleVariant,
} from "@/components/ui/hero/HeroContent";

type MotionHeroLabelProps = {
  children: ReactNode;
  className?: string;
  variants?: Variants;
};

export function MotionHeroLabel({ children, className, variants }: MotionHeroLabelProps) {
  return (
    <motion.span variants={variants} className={heroLabelClassName(className)}>
      {children}
    </motion.span>
  );
}

type MotionHeroTitleProps = {
  children: ReactNode;
  className?: string;
  variant?: HeroTitleVariant;
  variants?: Variants;
};

export function MotionHeroTitle({ children, className, variant = "default", variants }: MotionHeroTitleProps) {
  return (
    <motion.h1 variants={variants} className={heroTitleClassName(variant, className)}>
      {children}
    </motion.h1>
  );
}

type MotionHeroSubtitleProps = {
  children?: ReactNode;
  text?: string;
  className?: string;
  lineClassName?: string;
  variant?: HeroSubtitleVariant;
  variants?: Variants;
};

export function MotionHeroSubtitle({
  children,
  text,
  className,
  lineClassName,
  variant = "hero",
  variants,
}: MotionHeroSubtitleProps) {
  return (
    <motion.p variants={variants} className={heroSubtitleClassName(variant, className)}>
      {children ?? (text ? <TwoLineText text={text} variant="body" className={lineClassName} /> : null)}
    </motion.p>
  );
}
