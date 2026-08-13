"use client";

import {
  m,
  useReducedMotion,
  type Transition,
  type Variants,
} from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { duration, ease, viewport } from "@/lib/motion";
import { useDeferMotion } from "@/hooks/useDeferMotion";

type RevealVariant = "fade" | "fadeUp" | "rise" | "clip" | "blur" | "pop";
type RevealTag =
  | "div"
  | "li"
  | "header"
  | "article"
  | "ul"
  | "ol"
  | "section"
  | "dl"
  | "span"
  | "p"
  | "h2"
  | "h3"
  | "h4"
  | "nav"
  | "aside"
  | "figure"
  | "figcaption";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: RevealVariant;
  as?: RevealTag;
  when?: keyof typeof viewport;
  eager?: boolean;
  stagger?: boolean;
};

function buildItemVariants(soft: boolean): Record<RevealVariant, Variants> {
  const yShort = soft ? 16 : 28;
  const yRise = soft ? 28 : 52;
  const blur = soft ? 0 : 12;
  const riseBlur = soft ? 0 : 14;
  const scaleFrom = soft ? 0.995 : 0.985;

  return {
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    fadeUp: {
      hidden: { opacity: 0, y: yShort },
      visible: { opacity: 1, y: 0 },
    },
    rise: {
      hidden: {
        opacity: 0,
        y: yRise,
        filter: `blur(${riseBlur}px)`,
        scale: scaleFrom,
      },
      visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        scale: 1,
      },
    },
    clip: {
      hidden: {
        opacity: 0,
        clipPath: soft ? "inset(6% 4% 6% 4%)" : "inset(14% 10% 14% 10%)",
        scale: soft ? 1.02 : 1.045,
      },
      visible: {
        opacity: 1,
        clipPath: "inset(0% 0 0% 0%)",
        scale: 1,
      },
    },
    blur: {
      hidden: {
        opacity: 0,
        y: yShort,
        filter: `blur(${blur}px)`,
      },
      visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
      },
    },
    pop: {
      hidden: { opacity: 0, y: soft ? 8 : 12, scale: soft ? 0.97 : 0.94 },
      visible: { opacity: 1, y: 0, scale: 1 },
    },
  };
}

const variantDuration: Record<RevealVariant, number> = {
  fade: duration.fade,
  fadeUp: duration.fadeUp,
  rise: duration.rise,
  clip: duration.clip,
  blur: duration.blur,
  pop: 0.42,
};

function transitionFor(variant: RevealVariant, delay = 0): Transition {
  if (variant === "rise" || variant === "blur") {
    return {
      duration: variantDuration[variant],
      delay,
      ease: ease.cinematic,
    };
  }

  if (variant === "clip") {
    return {
      duration: variantDuration.clip,
      delay,
      ease: ease.media,
    };
  }

  if (variant === "fadeUp") {
    return {
      duration: variantDuration.fadeUp,
      delay,
      ease: ease.outExpo,
    };
  }

  if (variant === "pop") {
    return {
      duration: variantDuration.pop,
      delay,
      ease: ease.outExpo,
    };
  }

  return {
    duration: variantDuration.fade,
    delay,
    ease: ease.out,
  };
}

export function Reveal({
  children,
  className,
  delay = 0,
  variant = "fadeUp",
  as = "div",
  when = "once",
  eager = false,
  stagger = false,
}: RevealProps) {
  const reduced = useReducedMotion();
  const soft = useDeferMotion();
  const MotionTag = m[as];
  const itemVariants = buildItemVariants(soft);

  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  if (stagger) {
    return (
      <MotionTag
        className={cn(className)}
        initial="hidden"
        {...(eager
          ? { animate: "visible" as const }
          : { whileInView: "visible" as const, viewport: viewport[when] })}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: soft ? duration.staggerTight : duration.stagger,
              delayChildren: delay,
            },
          },
        }}
      >
        {children}
      </MotionTag>
    );
  }

  return (
    <MotionTag
      className={cn(className)}
      initial="hidden"
      {...(eager
        ? { animate: "visible" as const }
        : { whileInView: "visible" as const, viewport: viewport[when] })}
      variants={itemVariants[variant]}
      transition={transitionFor(variant, delay)}
    >
      {children}
    </MotionTag>
  );
}

type RevealGroupProps = {
  children: ReactNode;
  className?: string;
  as?: RevealTag;
  stagger?: number;
  delayChildren?: number;
  when?: keyof typeof viewport;
  "aria-label"?: string;
};

export function RevealGroup({
  children,
  className,
  as = "div",
  stagger = duration.stagger,
  delayChildren = 0.06,
  when = "once",
  "aria-label": ariaLabel,
}: RevealGroupProps) {
  const reduced = useReducedMotion();
  const soft = useDeferMotion();
  const MotionTag = m[as];

  if (reduced) {
    const Tag = as;
    return (
      <Tag className={className} aria-label={ariaLabel}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag
      className={cn(className)}
      aria-label={ariaLabel}
      initial="hidden"
      whileInView="visible"
      // Tall lists (e.g. industries hub) never meet fractional `amount`
      // thresholds — use "some" so stagger starts when the group enters view.
      viewport={{ ...viewport[when], amount: "some" as const }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: soft ? Math.min(stagger, duration.staggerTight) : stagger,
            delayChildren: soft ? Math.min(delayChildren, 0.04) : delayChildren,
          },
        },
      }}
    >
      {children}
    </MotionTag>
  );
}

type RevealItemProps = {
  children: ReactNode;
  className?: string;
  variant?: RevealVariant;
  as?: RevealTag;
  id?: string;
};

export function RevealItem({
  children,
  className,
  variant = "fadeUp",
  as = "div",
  id,
}: RevealItemProps) {
  const reduced = useReducedMotion();
  const soft = useDeferMotion();
  const MotionTag = m[as];
  const itemVariants = buildItemVariants(soft);

  if (reduced) {
    const Tag = as;
    return (
      <Tag className={className} id={id}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag
      className={cn(className)}
      id={id}
      variants={itemVariants[variant]}
      transition={transitionFor(variant)}
    >
      {children}
    </MotionTag>
  );
}

type MediaRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "wipe" | "float";
  from?: "left" | "right";
};

export function MediaReveal({
  children,
  className,
  delay = 0,
  variant = "wipe",
  from = "left",
}: MediaRevealProps) {
  const reduced = useReducedMotion();
  const soft = useDeferMotion();

  if (reduced || soft) {
    return <div className={cn("media-reveal", className)}>{children}</div>;
  }

  if (variant === "float") {
    const x = from === "right" ? 42 : -42;
    return (
      <m.div
        className={cn("media-reveal media-reveal--float", className)}
        initial="hidden"
        whileInView="visible"
        viewport={viewport.media}
        style={{ transformPerspective: 1600 }}
        variants={{
          hidden: {
            opacity: 0,
            y: 64,
            x,
            rotateX: 12,
            rotateY: from === "right" ? -8 : 8,
            scale: 0.92,
            filter: "blur(10px)",
          },
          visible: {
            opacity: 1,
            y: 0,
            x: 0,
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            filter: "blur(0px)",
          },
        }}
        transition={{
          duration: 1.2,
          delay,
          ease: ease.cinematic,
        }}
      >
        {children}
      </m.div>
    );
  }

  return (
    <m.div
      className={cn("media-reveal", className)}
      initial="hidden"
      whileInView="visible"
      viewport={viewport.media}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0,
            delayChildren: delay,
          },
        },
      }}
    >
      <m.div
        className="media-reveal__mask"
        variants={{
          hidden: { clipPath: "inset(100% 0 0 0)" },
          visible: { clipPath: "inset(0% 0 0 0)" },
        }}
        transition={{
          duration: duration.clip,
          ease: ease.media,
        }}
      >
        <m.div
          className="media-reveal__scale"
          variants={{
            hidden: { scale: 1.1, opacity: 0.65 },
            visible: { scale: 1, opacity: 1 },
          }}
          transition={{
            duration: duration.clip + 0.25,
            ease: ease.cinematic,
          }}
        >
          {children}
        </m.div>
      </m.div>
    </m.div>
  );
}

export default Reveal;
