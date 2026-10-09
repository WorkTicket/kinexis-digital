import { cn } from "@/lib/cn";

type Props = {
  href: string;
  label: string;
  /** Accessible name when the visible label is shortened for the mobile bar. */
  ariaLabel?: string;
  /**
   * `nav` / `menu` replace the header phone slot on Spanish locales.
   * `hero` / `plan` are labeled lander CTAs. `icon` is the sticky phone-bar mark.
   */
  variant?: "nav" | "menu" | "hero" | "plan" | "icon";
  className?: string;
  dataCta?: string;
};

/** WhatsApp support link. Header slot is Spanish-only; lander CTAs pass their own copy. */
export function WhatsAppLink({
  href,
  label,
  ariaLabel,
  variant = "nav",
  className,
  dataCta,
}: Props) {
  if (variant === "icon") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn("lp-web-reach__icon lp-web-reach__icon--whatsapp", className)}
        data-cta={dataCta ?? "whatsapp-sticky"}
        aria-label={ariaLabel ?? label}
      >
        <WhatsAppMark />
      </a>
    );
  }

  if (variant === "plan") {
    return (
      <p className={cn("lp-web-plan__whatsapp", className)}>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          data-cta={dataCta ?? "whatsapp-plan"}
        >
          {label}
        </a>
      </p>
    );
  }

  if (variant === "hero") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn("lp-web-hero__whatsapp", className)}
        data-cta={dataCta ?? "whatsapp-hero"}
        aria-label={ariaLabel ?? label}
      >
        <WhatsAppMark />
        <span>{label}</span>
      </a>
    );
  }

  const isMenu = variant === "menu";
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        isMenu ? "site-menu__phone" : "site-header__phone",
        "site-header__whatsapp",
        className,
      )}
      data-cta={isMenu ? "whatsapp-menu" : "whatsapp-nav"}
      aria-label={ariaLabel ?? label}
    >
      <WhatsAppMark className="site-header__whatsapp-mark" />
      <span className={isMenu ? "site-menu__phone-num" : "site-header__phone-num"}>
        {label}
      </span>
    </a>
  );
}

export function WhatsAppMark({ className }: { className?: string }) {
  return (
    <svg
      className={cn("whatsapp-link__mark", className)}
      viewBox="0 0 24 24"
      aria-hidden
      focusable="false"
    >
      <path
        fill="currentColor"
        d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.87 9.87 0 0 0 12.04 2m0 1.82c4.46 0 8.09 3.63 8.09 8.09 0 4.46-3.63 8.09-8.09 8.09-1.42 0-2.8-.37-4.01-1.07l-.29-.17-3.12.82.83-3.04-.19-.31a8.03 8.03 0 0 1-1.23-4.32c0-4.46 3.63-8.09 8.01-8.09m4.52 10.28c-.2-.1-1.18-.58-1.36-.65-.18-.06-.32-.1-.45.1-.13.2-.5.65-.62.78-.11.13-.23.15-.43.05-.2-.1-.84-.31-1.61-.99-.59-.53-.99-1.18-1.11-1.38-.11-.2-.01-.31.09-.41.09-.09.2-.23.3-.35.1-.11.13-.2.2-.33.06-.13.03-.25-.02-.35-.05-.1-.45-1.08-.62-1.48-.16-.39-.33-.33-.45-.34h-.38c-.13 0-.35.05-.53.25-.18.2-.7.68-.7 1.66s.72 1.93.82 2.06c.1.13 1.41 2.15 3.42 3.02.48.21.85.33 1.14.42.48.15.92.13 1.26.08.39-.06 1.18-.48 1.35-.95.17-.46.17-.86.12-.95-.05-.08-.18-.13-.38-.23"
      />
    </svg>
  );
}
