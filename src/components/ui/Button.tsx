"use client";

import { buttonClasses } from "@/lib/button-styles";
import { Link } from "@/i18n/navigation";
import type { ComponentPropsWithoutRef } from "react";
import type { ButtonSize } from "@/lib/button-styles";

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
  const classes = buttonClasses({ variant, size, fullWidthMobile, className });

  if (href !== undefined) {
    const { onClick, ...linkProps } = props as Omit<ButtonAsLink, "href">;
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
