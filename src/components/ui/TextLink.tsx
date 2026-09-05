import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type TextLinkProps = {
  href?: string;
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md";
  showArrow?: boolean;
};

/**
 * Text secondary CTA — same visual language as `Button variant="link"`.
 * Use when nesting inside another interactive card (span form).
 */
export default function TextLink({
  href,
  children,
  className,
  size = "md",
  showArrow = true,
}: TextLinkProps) {
  const classes = cn(
    "btn btn--link group",
    size === "sm" && "text-sm",
    className,
  );

  const content = (
    <>
      <span className="btn__label">{children}</span>
      {showArrow ? (
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
      ) : null}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return <span className={classes}>{content}</span>;
}
