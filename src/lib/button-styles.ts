import { cn } from "@/lib/cn";

/** Canonical variants. `secondary` is an alias for `outline` (legacy call sites). */
export type ButtonVariant =
  | "primary"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";
export type ButtonSize =
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "header"
  | "icon"
  | "icon-sm"
  /** Floating action button — circular fixed-control size (chat launcher). */
  | "fab";

export type ButtonStyleOptions = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  /** Full width below `sm`, auto width from `sm` up — preferred for CTA rows. */
  fullWidthMobile?: boolean;
  lift?: boolean;
  className?: string;
};

const variantClass: Record<Exclude<ButtonVariant, "secondary">, string> = {
  primary: "btn--primary",
  outline: "btn--outline",
  ghost: "btn--ghost",
  link: "btn--link",
};

function resolveVariant(
  variant: ButtonVariant,
): Exclude<ButtonVariant, "secondary"> {
  return variant === "secondary" ? "outline" : variant;
}

const sizeClass: Record<ButtonSize, string> = {
  sm: "btn--sm",
  md: "btn--md",
  lg: "btn--lg",
  xl: "btn--xl",
  header: "btn--header",
  icon: "btn--icon",
  "icon-sm": "btn--icon-sm",
  fab: "btn--icon h-14 w-14 min-h-0 min-w-0 rounded-full p-0",
};

export function buttonClasses({
  variant = "primary",
  size = "md",
  fullWidth = false,
  fullWidthMobile = false,
  lift = false,
  className,
}: ButtonStyleOptions = {}) {
  const resolved = resolveVariant(variant);
  return cn(
    "btn",
    variantClass[resolved],
    resolved !== "link" && sizeClass[size],
    fullWidth && "btn--full",
    fullWidthMobile && "w-full sm:w-auto",
    lift && resolved === "primary" && "btn--lift",
    className,
  );
}
