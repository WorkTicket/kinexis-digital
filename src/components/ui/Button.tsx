"use client";

import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";

type ButtonSize = "default" | "sm" | "icon" | "fab";

type ButtonProps = {
  variant?: "primary" | "secondary" | "ghost";
  size?: ButtonSize;
  href?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  fullWidthMobile?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  variant = "primary",
  size = "default",
  href,
  children,
  className,
  onClick,
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
      "text-white/70 border border-surface hover:text-[#05060a] hover:bg-neon-cyan hover:border-neon-cyan hover:shadow-glow-sm",
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

  if (href) {
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} onClick={onClick} {...props}>
      {children}
    </button>
  );
}
