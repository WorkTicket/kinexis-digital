"use client";

import { useEffect } from "react";

export function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;

    const scrollY = window.scrollY;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.paddingRight = `${scrollbarWidth}px`;
    document.body.style.top = `-${scrollY}px`;
    document.documentElement.style.setProperty(
      "--scrollbar-compensation",
      `${scrollbarWidth}px`
    );
    document.body.classList.add("mobile-menu-open");

    return () => {
      document.body.classList.remove("mobile-menu-open");
      document.body.style.paddingRight = "";
      document.body.style.top = "";
      document.documentElement.style.removeProperty("--scrollbar-compensation");
      window.scrollTo(0, scrollY);
    };
  }, [locked]);
}
