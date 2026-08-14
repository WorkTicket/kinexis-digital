import { Link } from "@/i18n/navigation";
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
  type Ref,
} from "react";
import {
  buttonClasses,
  type ButtonSize,
  type ButtonVariant,
} from "@/lib/button-styles";
import { cn } from "@/lib/cn";

type SharedProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  /** Full width below `sm`, auto width from `sm` up — preferred for CTA rows. */
  fullWidthMobile?: boolean;
  /** Subtle lift + shadow on hover — use once per page for the hero primary */
  lift?: boolean;
  arrow?: boolean;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = SharedProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof SharedProps | "href"> & {
    href?: undefined;
  };

type ButtonAsLink = SharedProps &
  Omit<ComponentPropsWithoutRef<"a">, keyof SharedProps> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

function ButtonArrow() {
  return (
    <span aria-hidden className="btn__arrow">
      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          className="btn__arrow-stem"
          d="M2.5 8h10"
          stroke="currentColor"
          strokeWidth="1.85"
          strokeLinecap="round"
        />
        <path
          className="btn__arrow-head"
          d="M8.25 3.25 13.5 8l-5.25 4.75"
          stroke="currentColor"
          strokeWidth="1.85"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function ButtonContent({
  arrow,
  children,
}: {
  arrow: boolean;
  children: ReactNode;
}) {
  return (
    <>
      <span className="btn__label">{children}</span>
      {arrow ? <ButtonArrow /> : null}
    </>
  );
}

function isNativeAnchor(href: string) {
  return (
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("#")
  );
}

export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(function Button(
  {
    variant = "primary",
    size = "md",
    fullWidth = false,
    fullWidthMobile = false,
    lift = false,
    arrow = false,
    className,
    children,
    ...props
  },
  ref,
) {
  const classes = buttonClasses({
    variant,
    size,
    fullWidth,
    fullWidthMobile,
    lift,
    className: cn(arrow && "group", className),
  });

  const content = <ButtonContent arrow={arrow}>{children}</ButtonContent>;

  if ("href" in props && props.href !== undefined) {
    const { href, ...linkProps } = props;

    if (isNativeAnchor(href)) {
      return (
        <a
          href={href}
          className={classes}
          ref={ref as Ref<HTMLAnchorElement>}
          {...linkProps}
        >
          {content}
        </a>
      );
    }

    return (
      <Link
        href={href}
        className={classes}
        ref={ref as Ref<HTMLAnchorElement>}
        {...linkProps}
      >
        {content}
      </Link>
    );
  }

  const { type = "button", ...buttonProps } = props as ButtonAsButton;
  return (
    <button
      type={type}
      className={classes}
      ref={ref as Ref<HTMLButtonElement>}
      {...buttonProps}
    >
      {content}
    </button>
  );
});

export default Button;
