import type { ComponentType, SVGProps } from "react";
import type { HomeServiceSlug } from "@/content/home-services";

type IconProps = SVGProps<SVGSVGElement>;

function ServiceIcon({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {children}
    </svg>
  );
}

/** Branding — seal / mark */
export function BrandingIcon(props: IconProps) {
  return (
    <ServiceIcon {...props}>
      <path
        d="M32 8 52 20v24L32 56 12 44V20L32 8Z"
        stroke="currentColor"
        strokeWidth="3.25"
      />
      <path
        d="M32 20 42 26v12L32 44 22 38V26L32 20Z"
        stroke="currentColor"
        strokeWidth="3.25"
      />
      <circle cx="32" cy="32" r="3.25" fill="currentColor" />
    </ServiceIcon>
  );
}

/** Web — stacked viewport frames */
export function WebIcon(props: IconProps) {
  return (
    <ServiceIcon {...props}>
      <rect
        x="10"
        y="14"
        width="36"
        height="28"
        rx="3"
        stroke="currentColor"
        strokeWidth="3.25"
      />
      <path d="M10 22h36" stroke="currentColor" strokeWidth="3.25" />
      <circle cx="16.5" cy="18" r="1.6" fill="currentColor" />
      <circle cx="21.5" cy="18" r="1.6" fill="currentColor" />
      <path
        d="M22 46h32a3 3 0 0 0 3-3V24"
        stroke="currentColor"
        strokeWidth="3.25"
        opacity="0.45"
      />
    </ServiceIcon>
  );
}

/** SEO — search lock with rising rank */
export function SeoIcon(props: IconProps) {
  return (
    <ServiceIcon {...props}>
      <circle
        cx="28"
        cy="28"
        r="14"
        stroke="currentColor"
        strokeWidth="3.25"
      />
      <path
        d="M38.5 38.5 50 50"
        stroke="currentColor"
        strokeWidth="3.25"
      />
      <path
        d="M22 33V23l6 5.5L34 23v10"
        stroke="currentColor"
        strokeWidth="3.25"
      />
    </ServiceIcon>
  );
}

/** Paid — target burst */
export function PaidMediaIcon(props: IconProps) {
  return (
    <ServiceIcon {...props}>
      <circle
        cx="32"
        cy="32"
        r="18"
        stroke="currentColor"
        strokeWidth="3.25"
      />
      <circle
        cx="32"
        cy="32"
        r="10"
        stroke="currentColor"
        strokeWidth="3.25"
      />
      <circle cx="32" cy="32" r="3.5" fill="currentColor" />
      <path
        d="M32 8v6M32 50v6M8 32h6M50 32h6"
        stroke="currentColor"
        strokeWidth="3.25"
        opacity="0.4"
      />
    </ServiceIcon>
  );
}

/** Content — editorial columns */
export function ContentIcon(props: IconProps) {
  return (
    <ServiceIcon {...props}>
      <path
        d="M14 12h22l10 10v30a4 4 0 0 1-4 4H14a4 4 0 0 1-4-4V16a4 4 0 0 1 4-4Z"
        stroke="currentColor"
        strokeWidth="3.25"
      />
      <path
        d="M36 12v10h10"
        stroke="currentColor"
        strokeWidth="3.25"
      />
      <path
        d="M18 30h20M18 38h20M18 46h12"
        stroke="currentColor"
        strokeWidth="3.25"
      />
    </ServiceIcon>
  );
}

export const serviceIconsBySlug: Record<
  HomeServiceSlug,
  ComponentType<SVGProps<SVGSVGElement>>
> = {
  "web-design": WebIcon,
  seo: SeoIcon,
  branding: BrandingIcon,
  "paid-media": PaidMediaIcon,
  "content-marketing": ContentIcon,
};
