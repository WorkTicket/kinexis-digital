"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

const REVEAL_Y = 480;

export function BackToTop() {
  const t = useTranslations("a11y");
  const [visible, setVisible] = useState(false);
  const traveling = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (traveling.current) {
        if (y <= 1) traveling.current = false;
        setVisible(y > 1);
        return;
      }
      setVisible(y > REVEAL_Y);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      className="back-to-top"
      hidden={!visible}
      onClick={() => {
        const reduce = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;
        const behavior = reduce ? "auto" : "smooth";
        traveling.current = true;
        const root = document.scrollingElement ?? document.documentElement;
        root.scrollTo({ top: 0, behavior });
        if (behavior === "auto") {
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0;
          traveling.current = false;
          setVisible(false);
        }
      }}
    >
      <svg viewBox="0 0 24 24" aria-hidden focusable="false">
        <path
          d="M6 14.5 12 8.5l6 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="sr-only">{t("backToTop")}</span>
    </button>
  );
}
