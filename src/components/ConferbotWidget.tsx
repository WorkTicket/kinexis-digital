"use client";

import { useEffect } from "react";
import { PUBLIC_CONFERBOT_BOT_ID } from "@/lib/conferbot-config";

const SCRIPT_ID = "conferbot-js";
const SCRIPT_SRC = "https://cdn.conferbot.com/dist/v1/widget.min.js";
/** After `load`: idle callback deadline / setTimeout fallback when rIC is missing. */
const IDLE_FALLBACK_MS = 2_500;
/** Match site float-cta mobile band (`globals.css` max-width:860px). */
const MOBILE_MQ = "(max-width: 860px)";
const HOST_SEL = "conferbot-widget";
const STYLE_ID = "kx-chat-lift";
const HOST_CLASS = "kx-chat-lift";
const GAP_ABOVE_BAR_PX = 12;
/** Extra lift for greet CTA / open panel above the launcher bubble. */
const CTA_ABOVE_LAUNCHER_PX = 62;
const PANEL_ABOVE_LAUNCHER_PX = 58;

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
 * Conferbot mounts `<conferbot-widget>` with an open shadow root. Launcher
 * `.chatbot__icon` / CTA live inside that shadow with inline bottoms and
 * widget CSS `bottom:…!important` media queries — light-DOM site CSS never
 * reaches them. Measure the sticky float bar and push the launcher to
 * barHeight + 12px (+ safe-area already reflected in the float's top).
 */
function startLauncherPositioner(): () => void {
  let raf = 0;
  let pollId = 0;
  let hostObserver: MutationObserver | null = null;
  let classObserver: MutationObserver | null = null;
  let floatObserver: MutationObserver | null = null;
  let shadowObserver: MutationObserver | null = null;
  let resizeObs: ResizeObserver | null = null;
  let watchingHost: Element | null = null;

  const clearShadowLift = (host: HTMLElement) => {
    host.classList.remove(HOST_CLASS);
    host.removeAttribute("data-cb-own-m-bottom");
    host.style.removeProperty("--kx-chat-bottom");
    host.style.removeProperty("--cb-o-m-bottom");
    host.shadowRoot?.getElementById(STYLE_ID)?.remove();
  };

  const apply = () => {
    const host = document.querySelector(HOST_SEL) as HTMLElement | null;
    if (!host?.shadowRoot) return;

    if (watchingHost !== host) {
      watchingHost = host;
      shadowObserver?.disconnect();
      shadowObserver = new MutationObserver(schedule);
      shadowObserver.observe(host.shadowRoot, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["style", "class"],
      });
    }

    const mobile = window.matchMedia(MOBILE_MQ).matches;
    if (!mobile) {
      clearShadowLift(host);
      return;
    }

    const html = document.documentElement;
    const floatHidden =
      html.classList.contains("no-float") || html.classList.contains("consent-open");
    const float = document.querySelector(".float-cta") as HTMLElement | null;
    const fr = float?.getBoundingClientRect();
    // boot.js only adds `.is-in` after the hero; until then the bar is translated
    // off-screen but still has a layout box — require is-in before measuring.
    const floatVisible =
      Boolean(float) &&
      !floatHidden &&
      Boolean(float?.classList.contains("is-in")) &&
      Boolean(fr && fr.height > 1 && fr.top < window.innerHeight && fr.bottom > 0) &&
      getComputedStyle(float!).display !== "none" &&
      getComputedStyle(float!).visibility !== "hidden";

    let bottomPx: number;
    if (floatVisible && fr) {
      // Distance from viewport bottom to float top, plus ~12px gap.
      bottomPx = Math.max(GAP_ABOVE_BAR_PX, Math.round(window.innerHeight - fr.top + GAP_ABOVE_BAR_PX));
    } else {
      const sab = Number.parseFloat(getComputedStyle(html).getPropertyValue("--sab")) || 0;
      const stackGap = Number.parseFloat(getComputedStyle(html).getPropertyValue("--float-gap")) || 16;
      bottomPx = Math.round(Math.max(stackGap, sab) + GAP_ABOVE_BAR_PX);
    }

    const bottom = `${bottomPx}px`;
    const ctaBottom = `${bottomPx + CTA_ABOVE_LAUNCHER_PX}px`;
    const panelBottom = `${bottomPx + PANEL_ABOVE_LAUNCHER_PX}px`;

    host.classList.add(HOST_CLASS);
    host.style.setProperty("--kx-chat-bottom", bottom);
    // Conferbot's own ≤550px override hook (beats their mobile !important rules).
    host.setAttribute("data-cb-own-m-bottom", "");
    host.style.setProperty("--cb-o-m-bottom", bottom);

    let styleEl = host.shadowRoot.getElementById(STYLE_ID) as HTMLStyleElement | null;
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = STYLE_ID;
      host.shadowRoot.appendChild(styleEl);
    }
    styleEl.textContent = `
:host(.${HOST_CLASS}) .chatbot__icon{
  bottom:var(--kx-chat-bottom)!important;
}
:host(.${HOST_CLASS}) .chatbot__icon__cta,
:host(.${HOST_CLASS}) #chat-cta{
  bottom:calc(var(--kx-chat-bottom) + ${CTA_ABOVE_LAUNCHER_PX}px)!important;
}
:host(.${HOST_CLASS}) .live_chat__chat__screen.show__chat{
  bottom:calc(var(--kx-chat-bottom) + ${PANEL_ABOVE_LAUNCHER_PX}px)!important;
}
`.trim();

    const icon = host.shadowRoot.querySelector(".chatbot__icon") as HTMLElement | null;
    if (icon) icon.style.setProperty("bottom", bottom, "important");

    const cta = host.shadowRoot.querySelector(
      ".chatbot__icon__cta, #chat-cta",
    ) as HTMLElement | null;
    if (cta) {
      // Greet bubble often uses `inset: … !important`; longhand bottom alone can lose.
      cta.style.setProperty("bottom", ctaBottom, "important");
      const inset = cta.style.inset || cta.getAttribute("style") || "";
      if (/inset\s*:/i.test(inset) || cta.style.getPropertyValue("inset")) {
        cta.style.setProperty("inset", `auto 8px ${ctaBottom} auto`, "important");
      }
    }

    const panel = host.shadowRoot.querySelector(
      ".live_chat__chat__screen.show__chat",
    ) as HTMLElement | null;
    if (panel) panel.style.setProperty("bottom", panelBottom, "important");
  };

  const schedule = () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(apply);
  };

  hostObserver = new MutationObserver(schedule);
  hostObserver.observe(document.documentElement, { childList: true, subtree: true });

  classObserver = new MutationObserver(schedule);
  classObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });

  window.addEventListener("resize", schedule);
  window.visualViewport?.addEventListener("resize", schedule);
  window.visualViewport?.addEventListener("scroll", schedule);
  window.matchMedia(MOBILE_MQ).addEventListener("change", schedule);

  const float = document.querySelector(".float-cta");
  if (float) {
    floatObserver = new MutationObserver(schedule);
    floatObserver.observe(float, { attributes: true, attributeFilter: ["class", "style", "inert"] });
    if (typeof ResizeObserver !== "undefined") {
      resizeObs = new ResizeObserver(schedule);
      resizeObs.observe(float);
    }
  }

  window.addEventListener("scroll", schedule, { passive: true });

  schedule();
  pollId = window.setInterval(schedule, 500);
  window.setTimeout(() => {
    if (pollId) window.clearInterval(pollId);
    pollId = 0;
  }, 20_000);

  return () => {
    if (pollId) window.clearInterval(pollId);
    cancelAnimationFrame(raf);
    hostObserver?.disconnect();
    classObserver?.disconnect();
    floatObserver?.disconnect();
    shadowObserver?.disconnect();
    resizeObs?.disconnect();
    window.removeEventListener("resize", schedule);
    window.removeEventListener("scroll", schedule);
    window.visualViewport?.removeEventListener("resize", schedule);
    window.visualViewport?.removeEventListener("scroll", schedule);
    const host = document.querySelector(HOST_SEL) as HTMLElement | null;
    if (host) clearShadowLift(host);
  };
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

    const stopPositioner = startLauncherPositioner();

    if (widgetBooted) {
      return () => {
        stopPositioner();
      };
    }

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
      stopPositioner();
    };
  }, [locale]);

  return null;
}
