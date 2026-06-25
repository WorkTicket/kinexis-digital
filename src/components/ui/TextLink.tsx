"use client";

import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type TextLinkProps = {
  href?: string;
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md";
  showArrow?: boolean;
};

export default function TextLink({
  href,
  children,
  className,
  size = "md",
  showArrow = true,
}: TextLinkProps) {
  const classes = cn(
    "inline-flex items-center font-semibold text-neon-cyan transition-all duration-premium ease-premium",
    size === "sm" ? "gap-1.5 text-xs group-hover:gap-2.5" : "gap-2 text-sm group-hover:gap-3",
    className
  );

  const content = (
    <>
      {children}
      {showArrow && (
        <ArrowRight className={size === "sm" ? "h-3 w-3" : "h-4 w-4"} />
      )}
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
