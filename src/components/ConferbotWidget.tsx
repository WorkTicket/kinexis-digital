"use client";

import { useEffect } from "react";
import { PUBLIC_CONFERBOT_BOT_ID } from "@/lib/conferbot-config";

const SCRIPT_ID = "conferbot-js";
const SCRIPT_SRC = "https://cdn.conferbot.com/dist/v1/widget.min.js";
/** After `load`: idle callback deadline / setTimeout fallback when rIC is missing. */
const IDLE_FALLBACK_MS = 2_500;

/** Module-level guard so client navigations / remounts never double-init. */
let widgetBooted = false;

function widgetEnabled() {
  return process.env.NEXT_PUBLIC_CONFERBOT_ENABLED === "1";
}

function configuredBotId() {
  const id = (process.env.NEXT_PUBLIC_CONFERBOT_BOT_ID || "").trim();
  return id || PUBLIC_CONFERBOT_BOT_ID;
}

function localeFromPath(pathname: string) {
  if (pathname === "/es" || pathname.startsWith("/es/")) return "es";
  if (pathname === "/es-es" || pathname.startsWith("/es-es/")) return "es-ES";
  return "en";
}

/**
 * Lazy Conferbot live chat. Off unless NEXT_PUBLIC_CONFERBOT_ENABLED=1.
 * Functional feature — loads for every public visitor (not gated on analytics
 * consent). After page `load`, schedules via requestIdleCallback (or ~2.5s
 * setTimeout); first scroll / pointer / touch / key also loads immediately.
 * Skips `/admin`. No PII in customData. Never double-inits.
 */
export default function ConferbotWidget({ locale }: { locale?: string }) {
  useEffect(() => {
    if (!widgetEnabled()) return;
    if (typeof window === "undefined") return;
    if (window.location.pathname.startsWith("/admin")) return;
    if (widgetBooted) return;

    let idleTimer: ReturnType<typeof setTimeout> | undefined;
    let idleCallbackId: number | undefined;
    let cleaned = false;
    let armed = false;
    let waitingForLoad = false;

    const load = () => {
      if (cleaned || widgetBooted) return;
      if (window.location.pathname.startsWith("/admin")) return;
      widgetBooted = true;
      cleanupTriggers();

      const botId = configuredBotId();
      const pathname = window.location.pathname;
      const customData = {
        source: "kinexis-digital-site",
        locale: locale || localeFromPath(pathname),
        pathname,
      };

      const boot = () => {
        try {
          window.ConferbotWidget?.(botId, "live_chat", { customData });
        } catch (error) {
          console.error("Conferbot widget init failed", {
            message: error instanceof Error ? error.message : "unknown",
          });
        }
      };

      const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
      if (existing) {
        if (window.ConferbotWidget) boot();
        else existing.addEventListener("load", boot, { once: true });
        return;
      }

      const script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.src = SCRIPT_SRC;
      script.async = true;
      script.addEventListener("load", boot, { once: true });
      script.addEventListener(
        "error",
        () => {
          console.error("Conferbot widget script failed to load");
          widgetBooted = false;
        },
        { once: true },
      );
      document.body.appendChild(script);
    };

    const onFirstInput = () => load();

    const scheduleIdle = () => {
      if (cleaned || widgetBooted) return;
      if (typeof window.requestIdleCallback === "function") {
        idleCallbackId = window.requestIdleCallback(() => load(), {
          timeout: IDLE_FALLBACK_MS,
        });
      } else {
        idleTimer = setTimeout(load, IDLE_FALLBACK_MS);
      }
    };

    function armTriggers() {
      if (cleaned || widgetBooted || armed) return;
      armed = true;
      window.addEventListener("pointerdown", onFirstInput, { once: true, passive: true });
      window.addEventListener("touchstart", onFirstInput, { once: true, passive: true });
      window.addEventListener("keydown", onFirstInput, { once: true });
      window.addEventListener("scroll", onFirstInput, { once: true, passive: true, capture: true });

      if (document.readyState === "complete") {
        scheduleIdle();
      } else {
        waitingForLoad = true;
        window.addEventListener("load", scheduleIdle, { once: true });
      }
    }

    function cleanupTriggers() {
      window.removeEventListener("pointerdown", onFirstInput);
      window.removeEventListener("touchstart", onFirstInput);
      window.removeEventListener("keydown", onFirstInput);
      window.removeEventListener("scroll", onFirstInput, true);
      if (waitingForLoad) {
        window.removeEventListener("load", scheduleIdle);
        waitingForLoad = false;
      }
      if (idleTimer) clearTimeout(idleTimer);
      if (
        idleCallbackId !== undefined &&
        typeof window.cancelIdleCallback === "function"
      ) {
        window.cancelIdleCallback(idleCallbackId);
      }
    }

    armTriggers();

    return () => {
      cleaned = true;
      cleanupTriggers();
    };
  }, [locale]);

  return null;
}
