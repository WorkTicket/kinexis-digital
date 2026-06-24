"use client";

import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import type { ComponentPropsWithoutRef } from "react";

type ButtonSize = "default" | "sm" | "icon" | "fab";

type BaseProps = {
  variant?: "primary" | "secondary" | "ghost";
  size?: ButtonSize;
  children: React.ReactNode;
  className?: string;
  fullWidthMobile?: boolean;
};

type ButtonAsButton = BaseProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof BaseProps> & { href?: undefined };

type ButtonAsLink = BaseProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, keyof BaseProps> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsLink;

export default function Button({
  variant = "primary",
  size = "default",
  href,
  children,
  className,
  fullWidthMobile = false,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 font-semibold tracking-wide rounded-xl backface-hidden touch-manipulation motion-btn";

  const sizes: Record<ButtonSize, string> = {
    default: "min-h-touch-lg min-w-touch-lg px-5 py-4 text-base",
    sm: "min-h-touch min-w-0 px-4 py-2.5 text-sm font-medium",
    icon: "min-h-touch min-w-touch-lg p-0 text-base",
    fab: "h-14 w-14 min-h-0 min-w-0 p-0 rounded-full shadow-glow text-base",
  };

  const variants = {
    primary: "bg-gradient text-white sm:hover:shadow-glow",
    secondary:
      "text-white/70 border border-surface hover:text-bg hover:bg-neon-cyan hover:border-neon-cyan hover:shadow-glow-sm",
    ghost: "text-muted hover:text-white transition-colors duration-200 ease-out",
  };

  const classes = cn(
    base,
    sizes[size],
    variants[variant],
    size === "default" && variant === "ghost" && "min-h-touch min-w-0 px-4 py-2",
    fullWidthMobile && "w-full sm:w-auto",
    className
  );

  if (href !== undefined) {
    const { onClick, ...linkProps } = props as ButtonAsLink;
    return (
      <Link href={href} className={classes} onClick={onClick} {...linkProps}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(props as ButtonAsButton)}>
      {children}
    </button>
  );
}
