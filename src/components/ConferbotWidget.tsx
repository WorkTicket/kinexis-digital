"use client";

import { useEffect } from "react";
import { PUBLIC_CONFERBOT_BOT_ID } from "@/lib/conferbot-config";

const SCRIPT_ID = "conferbot-js";
const SCRIPT_SRC = "https://cdn.conferbot.com/dist/v1/widget.min.js";
/** After `load`: idle callback deadline / setTimeout fallback when rIC is missing. */
const IDLE_FALLBACK_MS = 2_500;
/**
 * If CookieConsent never mounts (broken chrome), still arm idle/input after this
 * so chat is not permanently blocked. While `html.consent-open` we keep waiting.
 */
const CONSENT_CHROME_WAIT_MS = 8_000;
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

/**
 * Page-lifetime positioner. React remounts must NOT tear this down — clearing
 * the lift on effect cleanup was a regression window where Conferbot sat on the
 * sticky bar until observers re-armed.
 */
let liftArmed = false;

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

function cssPx(styles: CSSStyleDeclaration, name: string, fallback: number) {
  const raw = styles.getPropertyValue(name).trim();
  if (!raw) return fallback;
  // Resolve simple `Npx` or leave calc()/max() to measured float path.
  const n = Number.parseFloat(raw);
  return Number.isFinite(n) && !raw.includes("(") ? n : fallback;
}

function viewportHeight() {
  const vv = window.visualViewport;
  // Layout viewport height; float getBoundingClientRect is in layout coords.
  return window.innerHeight || vv?.height || document.documentElement.clientHeight || 0;
}

type KxLiftWindow = Window & {
  __kxStartLauncherPositioner?: () => void;
};

/**
 * Strip leftover inline bottom/inset from shadow launcher nodes.
 * Conferbot (and older lift code) write `bottom:…!important` inline; those
 * survive desktop clear if we only remove the host class / stylesheet.
 */
function clearInlineLift(root: ShadowRoot | null | undefined) {
  if (!root) return;
  const nodes = root.querySelectorAll<HTMLElement>(
    "#open-chatbot.chatbot__icon, .chatbot__icon, .chatbot__icon__cta, #chat-cta, .live_chat__chat__screen",
  );
  nodes.forEach((node) => {
    node.style.removeProperty("bottom");
    node.style.removeProperty("inset");
  });
}

/**
 * Conferbot mounts `<conferbot-widget>` with an open shadow root. Launcher
 * `#open-chatbot.chatbot__icon` lives inside that shadow with inline bottoms and
 * widget CSS `bottom:…!important` media queries — light-DOM site CSS never
 * reaches them. Measure `.float-cta` and set bottom = vh - bar.top + 12 via
 * host CSS variables + a mobile-MQ-scoped shadow stylesheet (no sticky inline
 * bottoms that can survive a desktop resize).
 */
function startLauncherPositioner() {
  if (liftArmed || typeof window === "undefined") return;
  liftArmed = true;

  let raf = 0;
  let hostObserver: MutationObserver | null = null;
  let classObserver: MutationObserver | null = null;
  let floatObserver: MutationObserver | null = null;
  let hostAttrObserver: MutationObserver | null = null;
  let shadowObserver: MutationObserver | null = null;
  let resizeObs: ResizeObserver | null = null;
  let watchingHost: Element | null = null;
  let watchingFloat: Element | null = null;
  const mobileMq = window.matchMedia(MOBILE_MQ);

  const clearShadowLift = (host: HTMLElement) => {
    host.classList.remove(HOST_CLASS);
    host.removeAttribute("data-cb-own-m-bottom");
    host.style.removeProperty("--kx-chat-bottom");
    host.style.removeProperty("--cb-o-m-bottom");
    host.shadowRoot?.getElementById(STYLE_ID)?.remove();
    clearInlineLift(host.shadowRoot);
  };

  const bindFloat = (float: Element | null) => {
    if (float === watchingFloat) return;
    floatObserver?.disconnect();
    resizeObs?.disconnect();
    watchingFloat = float;
    if (!float) return;
    floatObserver = new MutationObserver(schedule);
    floatObserver.observe(float, {
      attributes: true,
      attributeFilter: ["class", "style", "inert", "hidden"],
    });
    if (typeof ResizeObserver !== "undefined") {
      resizeObs = new ResizeObserver(schedule);
      resizeObs.observe(float);
    }
  };

  const bindHost = (host: HTMLElement) => {
    if (watchingHost === host) return;
    watchingHost = host;
    shadowObserver?.disconnect();
    hostAttrObserver?.disconnect();

    if (host.shadowRoot) {
      shadowObserver = new MutationObserver(schedule);
      shadowObserver.observe(host.shadowRoot, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["style", "class", "id"],
      });
    }

    hostAttrObserver = new MutationObserver(schedule);
    hostAttrObserver.observe(host, {
      attributes: true,
      attributeFilter: ["class", "style", "data-cb-own-m-bottom"],
    });
  };

  const apply = () => {
    const host = document.querySelector(HOST_SEL) as HTMLElement | null;
    if (!host?.shadowRoot) return;

    bindHost(host);

    const mobile = mobileMq.matches;
    if (!mobile) {
      clearShadowLift(host);
      return;
    }

    const html = document.documentElement;
    const htmlStyles = getComputedStyle(html);
    const floatHidden =
      html.classList.contains("no-float") || html.classList.contains("consent-open");
    const float = document.querySelector(".float-cta") as HTMLElement | null;
    bindFloat(float);

    const fr = float?.getBoundingClientRect();
    const floatCs = float ? getComputedStyle(float) : null;
    // boot.js only adds `.is-in` after the hero; until then the bar is translated
    // off-screen but still has a layout box — require is-in before measuring.
    const floatVisible =
      Boolean(float) &&
      !floatHidden &&
      Boolean(float?.classList.contains("is-in")) &&
      Boolean(fr && fr.height > 1 && fr.top < viewportHeight() && fr.bottom > 0) &&
      floatCs?.display !== "none" &&
      floatCs?.visibility !== "hidden" &&
      Number.parseFloat(floatCs?.opacity || "0") > 0.5;

    const stackFloor =
      cssPx(htmlStyles, "--float-gap", 16) +
      cssPx(htmlStyles, "--float-bar-h", 96) +
      GAP_ABOVE_BAR_PX;

    let bottomPx: number;
    if (floatVisible && fr) {
      // Distance from viewport bottom to float top, plus ~12px gap.
      bottomPx = Math.max(
        GAP_ABOVE_BAR_PX,
        Math.round(viewportHeight() - fr.top + GAP_ABOVE_BAR_PX),
      );
      // Never under-lift relative to the CSS sticky-band floor.
      bottomPx = Math.max(bottomPx, Math.round(stackFloor));
    } else {
      const sab = cssPx(htmlStyles, "--sab", 0);
      const stackGap = cssPx(htmlStyles, "--float-gap", 16);
      bottomPx = Math.round(Math.max(stackGap, sab) + GAP_ABOVE_BAR_PX);
    }

    const bottom = `${bottomPx}px`;

    host.classList.add(HOST_CLASS);
    host.style.setProperty("--kx-chat-bottom", bottom);
    // Conferbot's own ≤550px override hook (beats their mobile !important rules).
    host.setAttribute("data-cb-own-m-bottom", "");
    host.style.setProperty("--cb-o-m-bottom", bottom);

    let styleEl = host.shadowRoot.getElementById(STYLE_ID) as HTMLStyleElement | null;
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = STYLE_ID;
    }
    // Always re-append so our rules stay after Conferbot stylesheets it injects later.
    host.shadowRoot.appendChild(styleEl);
    // Mobile MQ scopes the lift so leftover host class / vars cannot stick the
    // launcher raised after a resize past the float-cta breakpoint.
    styleEl.textContent = `
@media (max-width: 860px) {
:host(.${HOST_CLASS}) #open-chatbot.chatbot__icon,
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
}
`.trim();

    // Prefer CSS variables over sticky inline bottoms. Strip competing inlines
    // (Conferbot or prior lift) so the MQ-scoped stylesheet can win.
    clearInlineLift(host.shadowRoot);
  };

  const schedule = () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      requestAnimationFrame(apply);
    });
  };

  hostObserver = new MutationObserver(schedule);
  hostObserver.observe(document.documentElement, { childList: true, subtree: true });

  classObserver = new MutationObserver(schedule);
  classObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class", "style"],
  });

  window.addEventListener("resize", schedule);
  window.addEventListener("orientationchange", schedule);
  window.visualViewport?.addEventListener("resize", schedule);
  window.visualViewport?.addEventListener("scroll", schedule);
  mobileMq.addEventListener("change", schedule);
  window.addEventListener("scroll", schedule, { passive: true });

  bindFloat(document.querySelector(".float-cta"));
  schedule();
  // Keep syncing for the life of the page — Conferbot rewrites launcher styles
  // well after first paint; a 20s poll cutoff left a wipe window.
  window.setInterval(schedule, 1000);
}

/**
 * CookieConsent has painted (dock or preferences FAB). Used so we do not race
 * ahead of `html.consent-open` being applied on first paint.
 */
function consentChromePresent() {
  return Boolean(document.querySelector(".consent-fab, .consent-dock"));
}

/** Cookie dock is up — launcher is CSS-hidden; do not inject script/socket yet. */
function consentDockOpen() {
  return document.documentElement.classList.contains("consent-open");
}

/**
 * Lazy Conferbot live chat. Off unless NEXT_PUBLIC_CONFERBOT_ENABLED=1.
 * Functional feature — loads for every public visitor (not gated on analytics
 * consent). Waits until the cookie dock is dismissed (`!html.consent-open`), then
 * after page `load` schedules via requestIdleCallback (or ~2.5s setTimeout);
 * first scroll / pointer / touch / key also loads immediately. Avoids loading
 * `widget.min.js` / socket.io while the launcher is hidden (and skips the
 * Conferbot websocket-upgrade console 400 during typical first-visit audits).
 * Skips `/admin`. No PII in customData. Never double-inits.
 */
export default function ConferbotWidget({ locale }: { locale?: string }) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    // e2e / diagnostics: arm after injecting a mock `<conferbot-widget>` host
    // even when NEXT_PUBLIC_CONFERBOT_ENABLED is off in CI.
    (window as KxLiftWindow).__kxStartLauncherPositioner = startLauncherPositioner;

    if (!widgetEnabled()) return;
    if (window.location.pathname.startsWith("/admin")) return;

    // Arm once for the page lifetime (survives React remount / locale changes).
    startLauncherPositioner();

    if (widgetBooted) return;

    let idleTimer: ReturnType<typeof setTimeout> | undefined;
    let idleCallbackId: number | undefined;
    let consentWaitTimer: ReturnType<typeof setTimeout> | undefined;
    let consentObserver: MutationObserver | null = null;
    let cleaned = false;
    let armed = false;
    let waitingForLoad = false;
    let waitingForConsent = false;
    /** After CONSENT_CHROME_WAIT_MS with no dock/FAB, allow arm without chrome. */
    let chromeWaitExpired = false;

    const readyToArm = () => {
      if (consentDockOpen()) return false;
      return consentChromePresent() || chromeWaitExpired;
    };

    const load = () => {
      if (cleaned || widgetBooted) return;
      if (window.location.pathname.startsWith("/admin")) return;
      // Never inject while the cookie dock is open (script would open socket.io
      // and log Conferbot's websocket-upgrade 400 while the launcher is hidden).
      if (consentDockOpen()) {
        waitForConsentThenArm();
        return;
      }
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
        // Host may appear a tick after boot — nudge the page-lifetime positioner.
        startLauncherPositioner();
        window.dispatchEvent(new Event("resize"));
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
      if (consentDockOpen()) {
        waitForConsentThenArm();
        return;
      }
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
      if (!readyToArm()) {
        waitForConsentThenArm();
        return;
      }
      armed = true;
      stopConsentWait();
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

    function stopConsentWait() {
      consentObserver?.disconnect();
      consentObserver = null;
      if (consentWaitTimer) {
        clearTimeout(consentWaitTimer);
        consentWaitTimer = undefined;
      }
      waitingForConsent = false;
    }

    function waitForConsentThenArm() {
      if (cleaned || widgetBooted) return;
      if (readyToArm()) {
        armTriggers();
        return;
      }
      if (waitingForConsent) return;
      waitingForConsent = true;
      armed = false;
      // Drop any idle/input that raced while the dock was open.
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
        idleCallbackId = undefined;
      }

      const tryArm = () => {
        if (cleaned || widgetBooted) return;
        if (readyToArm()) armTriggers();
      };

      consentObserver?.disconnect();
      consentObserver = new MutationObserver(tryArm);
      consentObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
        childList: true,
        subtree: true,
      });

      if (!consentWaitTimer) {
        consentWaitTimer = setTimeout(() => {
          consentWaitTimer = undefined;
          if (cleaned || widgetBooted) return;
          // Banner still up: keep observing; never load while hidden.
          if (consentDockOpen()) return;
          chromeWaitExpired = true;
          tryArm();
        }, CONSENT_CHROME_WAIT_MS);
      }

      tryArm();
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
      stopConsentWait();
    }

    waitForConsentThenArm();

    return () => {
      cleaned = true;
      cleanupTriggers();
      // Intentionally do NOT stop the launcher positioner or clear the lift —
      // remounts must not drop the bubble back onto the sticky bar.
    };
  }, [locale]);

  return null;
}
