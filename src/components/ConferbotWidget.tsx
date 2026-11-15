"use client";

import { useEffect, useRef } from "react";
import { parseConsentCookie } from "@/lib/invoice-core";
import { PUBLIC_CONFERBOT_BOT_ID } from "@/lib/conferbot-config";

const SCRIPT_ID = "conferbot-js";
const SCRIPT_SRC = "https://cdn.conferbot.com/dist/v1/widget.min.js";
/** Idle fallback after analytics consent — mirrors boot.js deferred third-party pattern. */
const IDLE_LOAD_MS = 45_000;

function widgetEnabled() {
  return process.env.NEXT_PUBLIC_CONFERBOT_ENABLED === "1";
}

function configuredBotId() {
  const id = (process.env.NEXT_PUBLIC_CONFERBOT_BOT_ID || "").trim();
  return id || PUBLIC_CONFERBOT_BOT_ID;
}

function analyticsAllowed() {
  if (typeof document === "undefined") return false;
  const match = document.cookie.match(/(?:^|; )kinexis_consent=([^;]*)/);
  const raw = match ? match[1] : null;
  const consent = parseConsentCookie(raw);
  return consent.decided && consent.analytics;
}

function localeFromPath(pathname: string) {
  if (pathname === "/es" || pathname.startsWith("/es/")) return "es";
  if (pathname === "/es-es" || pathname.startsWith("/es-es/")) return "es-ES";
  return "en";
}

/**
 * Lazy Conferbot live chat. Off unless NEXT_PUBLIC_CONFERBOT_ENABLED=1.
 * Loads only after analytics consent, then on first input or after 45s.
 * No PII in customData.
 */
export default function ConferbotWidget({ locale }: { locale?: string }) {
  const started = useRef(false);

  useEffect(() => {
    if (!widgetEnabled()) return;
    if (typeof window === "undefined") return;
    if (window.location.pathname.startsWith("/admin")) return;

    let idleTimer: ReturnType<typeof setTimeout> | undefined;
    let cleaned = false;

    const load = () => {
      if (cleaned || started.current) return;
      if (!analyticsAllowed()) return;
      started.current = true;
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
          started.current = false;
        },
        { once: true },
      );
      document.body.appendChild(script);
    };

    const onConsent = () => {
      if (!analyticsAllowed()) return;
      armTriggers();
    };

    const onFirstInput = () => load();

    function armTriggers() {
      if (cleaned || started.current) return;
      window.addEventListener("pointerdown", onFirstInput, { once: true, passive: true });
      window.addEventListener("keydown", onFirstInput, { once: true });
      idleTimer = setTimeout(load, IDLE_LOAD_MS);
    }

    function cleanupTriggers() {
      window.removeEventListener("pointerdown", onFirstInput);
      window.removeEventListener("keydown", onFirstInput);
      if (idleTimer) clearTimeout(idleTimer);
    }

    window.addEventListener("kinexis:consent", onConsent);
    if (analyticsAllowed()) armTriggers();

    return () => {
      cleaned = true;
      window.removeEventListener("kinexis:consent", onConsent);
      cleanupTriggers();
    };
  }, [locale]);

  return null;
}
