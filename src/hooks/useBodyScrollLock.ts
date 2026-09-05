"use client";

import { useEffect } from "react";

export function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;

    const { documentElement, body } = document;
    const scrollbarWidth = Math.max(
      0,
      window.innerWidth - documentElement.clientWidth,
    );

    documentElement.style.setProperty(
      "--scrollbar-compensation",
      `${scrollbarWidth}px`,
    );
    documentElement.classList.add("mobile-menu-open");
    body.classList.add("mobile-menu-open");

    return () => {
      documentElement.classList.remove("mobile-menu-open");
      body.classList.remove("mobile-menu-open");
      documentElement.style.removeProperty("--scrollbar-compensation");
    };
  }, [locked]);
}
