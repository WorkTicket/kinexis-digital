import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "default" | "sm" | "header" | "icon" | "fab";

/** Shared button class strings — single source of truth for Button and inline link CTAs. */
export const buttonBase =
  "inline-flex items-center justify-center gap-2 font-semibold tracking-wide rounded-xl backface-hidden touch-manipulation motion-btn";

export const buttonSizes: Record<ButtonSize, string> = {
  default: "min-h-touch-lg min-w-touch-lg px-5 py-4 text-base",
  sm: "min-h-touch min-w-0 px-4 py-2.5 text-sm font-medium",
  header:
    "h-[var(--header-control-h)] min-h-0 min-w-0 px-3 text-xs font-medium rounded-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] ring-1 ring-white/10 sm:hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.22),var(--shadow-glow-sm)] active:scale-[0.98]",
  icon: "min-h-touch min-w-touch-lg p-0 text-base",
  fab: "h-14 w-14 min-h-0 min-w-0 p-0 rounded-full shadow-glow text-base",
};

export const buttonVariants: Record<ButtonVariant, string> = {
  primary: "bg-gradient text-white sm:hover:shadow-glow",
  secondary:
    "text-white/70 border border-surface hover:text-bg hover:bg-neon-cyan hover:border-neon-cyan hover:shadow-glow-sm",
  ghost: "text-muted hover:text-white transition-colors duration-200 ease-out",
};

type ButtonClassOptions = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidthMobile?: boolean;
  className?: string;
};

export function buttonClasses({
  variant = "primary",
  size = "default",
  fullWidthMobile = false,
  className,
}: ButtonClassOptions = {}): string {
  return cn(
    buttonBase,
    buttonSizes[size],
    buttonVariants[variant],
    size === "default" && variant === "ghost" && "min-h-touch min-w-0 px-4 py-2",
    fullWidthMobile && "w-full sm:w-auto",
    className,
  );
}
