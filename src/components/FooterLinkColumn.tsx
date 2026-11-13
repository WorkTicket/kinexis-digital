"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

const link =
  "footer-link inline-flex items-center text-[0.88rem] leading-snug text-white/78 transition-colors hover:text-[var(--brand-orange)] focus-visible:text-[var(--brand-orange)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-cyan-bright";

const MOBILE_MQ = "(max-width: 639px)";

export default function FooterLinkColumn({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  const ref = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mq = window.matchMedia(MOBILE_MQ);

    const syncBreakpoint = () => {
      el.open = !mq.matches;
    };

    const onToggle = () => {
      if (!mq.matches || !el.open) return;
      const root = el.parentElement;
      if (!root) return;
      root.querySelectorAll<HTMLDetailsElement>("details.footer-column").forEach((other) => {
        if (other !== el) other.open = false;
      });
    };

    syncBreakpoint();
    mq.addEventListener("change", syncBreakpoint);
    el.addEventListener("toggle", onToggle);
    return () => {
      mq.removeEventListener("change", syncBreakpoint);
      el.removeEventListener("toggle", onToggle);
    };
  }, []);

  return (
    <details ref={ref} className="footer-column" open>
      <summary className="footer-column__title">
        <span>{title}</span>
        <svg className="footer-column__chevron" viewBox="0 0 20 20" aria-hidden="true" fill="none">
          <path d="M5 7.5 10 12.5 15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </summary>
      <nav aria-label={title}>
        <ul className="footer-column__list">
          {links.map((item) => (
            <li key={item.href}>
              <Link className={link} href={item.href} prefetch={false}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </details>
  );
}
