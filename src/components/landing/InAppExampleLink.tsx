"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Keep the WebView back button usable; desktop examples still open separately. */
export function InAppExampleLink({ href, className, children }: {
  href: string | undefined;
  className?: string;
  children: ReactNode;
}) {
  const link = useRef<HTMLAnchorElement>(null);
  const syncTarget = () => {
    if (document.documentElement.classList.contains("in-app-browser")) {
      link.current?.removeAttribute("target");
    }
  };
  useEffect(syncTarget, []);

  return (
    <a ref={link} href={href} className={className} target="_blank" rel="noopener noreferrer" onClick={syncTarget}>
      {children}
    </a>
  );
}
