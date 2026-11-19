/**
 * Conferbot live chat — vanilla (no React). Preserves #57 consent-hide + #58
 * launcher lift. Loaded lazyOnload from Boot; positioner always arms so e2e can
 * inject a mock host when NEXT_PUBLIC_CONFERBOT_ENABLED is off.
 */
(() => {
  const cfg = window.__KINEXIS_CFG__ || {};
  const SCRIPT_ID = "conferbot-js";
  const SCRIPT_SRC = "https://cdn.conferbot.com/dist/v1/widget.min.js";
  const IDLE_FALLBACK_MS = 2500;
  const CONSENT_CHROME_WAIT_MS = 8000;
  const MOBILE_MQ = "(max-width: 860px)";
  const HIDE_CTA_STYLE_ID = "kx-hide-chat-cta";
  const HOST_SEL = "conferbot-widget";
  const STYLE_ID = "kx-chat-lift";
  const HOST_CLASS = "kx-chat-lift";
  const CHAT_VISIBLE_STYLE_ID = "kx-chat-visibility";
  const CHAT_VISIBLE_CLASS = "kx-sticky-chat-visible";
  const CHAT_READY_CLASS = "kx-chat-visibility-ready";
  const GAP_ABOVE_BAR_PX = 12;
  const CTA_ABOVE_LAUNCHER_PX = 62;
  const PANEL_ABOVE_LAUNCHER_PX = 58;
  const PUBLIC_BOT_ID = "6afa0edabbad567d637ee189";

  let widgetBooted = false;
  let liftArmed = false;

  function configuredBotId() {
    const id = String(cfg.conferbotBotId || "").trim();
    return id || PUBLIC_BOT_ID;
  }

  function widgetEnabled() {
    return Boolean(String(cfg.conferbotBotId || "").trim());
  }

  function localeFromPath(pathname) {
    if (pathname === "/es" || pathname.startsWith("/es/")) return "es";
    if (pathname === "/es-es" || pathname.startsWith("/es-es/")) return "es-ES";
    return "en";
  }

  function cssPx(styles, name, fallback) {
    const raw = styles.getPropertyValue(name).trim();
    if (!raw) return fallback;
    const n = Number.parseFloat(raw);
    return Number.isFinite(n) && !raw.includes("(") ? n : fallback;
  }

  function viewportHeight() {
    const vv = window.visualViewport;
    return window.innerHeight || vv?.height || document.documentElement.clientHeight || 0;
  }

  function clearInlineLift(root) {
    if (!root) return;
    root
      .querySelectorAll(
        "#open-chatbot.chatbot__icon, .chatbot__icon, .chatbot__icon__cta, #chat-cta, .live_chat__chat__screen",
      )
      .forEach((node) => {
        node.style.removeProperty("bottom");
        node.style.removeProperty("inset");
      });
  }

  function startLauncherPositioner() {
    if (liftArmed) return;
    liftArmed = true;

    let raf = 0;
    let hostObserver = null;
    let classObserver = null;
    let floatObserver = null;
    let hostAttrObserver = null;
    let shadowObserver = null;
    let resizeObs = null;
    let watchingHost = null;
    let watchingFloat = null;
    const mobileMq = window.matchMedia(MOBILE_MQ);

    const clearShadowLift = (host) => {
      host.classList.remove(HOST_CLASS);
      host.removeAttribute("data-cb-own-m-bottom");
      host.style.removeProperty("--kx-chat-bottom");
      host.style.removeProperty("--cb-o-m-bottom");
      host.shadowRoot?.getElementById(STYLE_ID)?.remove();
      clearInlineLift(host.shadowRoot);
    };

    const bindFloat = (float) => {
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

    const bindHost = (host) => {
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

    const hideProactiveBubbles = (root) => {
      if (root.getElementById(HIDE_CTA_STYLE_ID)) return;
      const el = document.createElement("style");
      el.id = HIDE_CTA_STYLE_ID;
      el.textContent = ".chatbot__icon__cta,#chat-cta{display:none!important;}";
      root.appendChild(el);
    };

    const installChatVisibilityStyle = (root) => {
      if (root.getElementById(CHAT_VISIBLE_STYLE_ID)) return;
      const el = document.createElement("style");
      el.id = CHAT_VISIBLE_STYLE_ID;
      el.textContent = `
:host #open-chatbot.chatbot__icon,
:host .chatbot__icon{
  opacity:0!important;
  visibility:hidden!important;
  transform:translateY(18px)!important;
  pointer-events:none!important;
}
:host(.${CHAT_READY_CLASS}) #open-chatbot.chatbot__icon,
:host(.${CHAT_READY_CLASS}) .chatbot__icon{
  transition:opacity .45s ease,transform .7s cubic-bezier(.16,1,.3,1),visibility 0s linear .45s;
}
:host(.${CHAT_VISIBLE_CLASS}) #open-chatbot.chatbot__icon,
:host(.${CHAT_VISIBLE_CLASS}) .chatbot__icon{
  opacity:1!important;
  visibility:visible!important;
  transform:translateY(0)!important;
  pointer-events:auto!important;
}
@media (prefers-reduced-motion:reduce){
:host #open-chatbot.chatbot__icon,
:host .chatbot__icon{
  transition:none!important;
}
}
`.trim();
      root.appendChild(el);
    };

    const apply = () => {
      const host = document.querySelector(HOST_SEL);
      if (!host?.shadowRoot) return;
      bindHost(host);
      hideProactiveBubbles(host.shadowRoot);
      installChatVisibilityStyle(host.shadowRoot);
      const html = document.documentElement;
      const float = document.querySelector(".float-cta");
      const fr = float?.getBoundingClientRect();
      const floatCs = float ? getComputedStyle(float) : null;
      const stickyShown =
        Boolean(float) &&
        html.classList.contains("sticky-chrome-in") &&
        !html.classList.contains("consent-open") &&
        Boolean(float?.classList.contains("is-in")) &&
        Boolean(fr && fr.height > 1 && fr.top < viewportHeight() && fr.bottom > 0) &&
        floatCs?.display !== "none" &&
        floatCs?.visibility !== "hidden";
      host.classList.toggle(CHAT_VISIBLE_CLASS, stickyShown);
      if (!host.classList.contains(CHAT_READY_CLASS)) {
        const launcher = host.shadowRoot.querySelector("#open-chatbot.chatbot__icon, .chatbot__icon");
        if (launcher) launcher.getBoundingClientRect();
        host.classList.add(CHAT_READY_CLASS);
      }
      if (!mobileMq.matches) {
        clearShadowLift(host);
        return;
      }
      const htmlStyles = getComputedStyle(html);
      bindFloat(float);
      const floatVisible =
        stickyShown && Number.parseFloat(floatCs?.opacity || "0") > 0.5;

      const stackFloor =
        cssPx(htmlStyles, "--float-gap", 16) +
        cssPx(htmlStyles, "--float-bar-h", 96) +
        GAP_ABOVE_BAR_PX;

      let bottomPx;
      if (floatVisible && fr) {
        bottomPx = Math.max(
          GAP_ABOVE_BAR_PX,
          Math.round(viewportHeight() - fr.top + GAP_ABOVE_BAR_PX),
        );
        bottomPx = Math.max(bottomPx, Math.round(stackFloor));
      } else {
        const sab = cssPx(htmlStyles, "--sab", 0);
        const stackGap = cssPx(htmlStyles, "--float-gap", 16);
        bottomPx = Math.round(Math.max(stackGap, sab) + GAP_ABOVE_BAR_PX);
      }
      const bottom = `${bottomPx}px`;
      host.classList.add(HOST_CLASS);
      host.style.setProperty("--kx-chat-bottom", bottom);
      host.setAttribute("data-cb-own-m-bottom", "");
      host.style.setProperty("--cb-o-m-bottom", bottom);
      let styleEl = host.shadowRoot.getElementById(STYLE_ID);
      if (!styleEl) {
        styleEl = document.createElement("style");
        styleEl.id = STYLE_ID;
      }
      host.shadowRoot.appendChild(styleEl);
      styleEl.textContent = `
@media (max-width: 860px) {
:host(.${HOST_CLASS}) .chatbot__icon__cta,
:host(.${HOST_CLASS}) #chat-cta{
  display:none!important;
}
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
    window.setInterval(schedule, 1000);
  }

  window.__kxStartLauncherPositioner = startLauncherPositioner;
  startLauncherPositioner();

  if (!widgetEnabled()) return;
  if (window.location.pathname.startsWith("/admin")) return;
  if (widgetBooted) return;

  let idleTimer;
  let idleCallbackId;
  let consentWaitTimer;
  let consentObserver = null;
  let cleaned = false;
  let armed = false;
  let waitingForLoad = false;
  let waitingForConsent = false;
  let chromeWaitExpired = false;

  function consentChromePresent() {
    return Boolean(document.querySelector(".consent-fab, .consent-dock"));
  }
  function consentDockOpen() {
    return document.documentElement.classList.contains("consent-open");
  }
  function readyToArm() {
    if (consentDockOpen()) return false;
    return consentChromePresent() || chromeWaitExpired;
  }

  function load() {
    if (cleaned || widgetBooted) return;
    if (window.location.pathname.startsWith("/admin")) return;
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
      locale: cfg.conferbotLocale || localeFromPath(pathname),
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
      startLauncherPositioner();
      window.dispatchEvent(new Event("resize"));
    };
    const existing = document.getElementById(SCRIPT_ID);
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
  }

  function onFirstInput() {
    load();
  }

  function scheduleIdle() {
    if (cleaned || widgetBooted) return;
    if (consentDockOpen()) {
      waitForConsentThenArm();
      return;
    }
    if (typeof window.requestIdleCallback === "function") {
      idleCallbackId = window.requestIdleCallback(() => load(), { timeout: IDLE_FALLBACK_MS });
    } else {
      idleTimer = setTimeout(load, IDLE_FALLBACK_MS);
    }
  }

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
    if (document.readyState === "complete") scheduleIdle();
    else {
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
    window.removeEventListener("pointerdown", onFirstInput);
    window.removeEventListener("touchstart", onFirstInput);
    window.removeEventListener("keydown", onFirstInput);
    window.removeEventListener("scroll", onFirstInput, true);
    if (waitingForLoad) {
      window.removeEventListener("load", scheduleIdle);
      waitingForLoad = false;
    }
    if (idleTimer) clearTimeout(idleTimer);
    if (idleCallbackId !== undefined && typeof window.cancelIdleCallback === "function") {
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
    if (idleCallbackId !== undefined && typeof window.cancelIdleCallback === "function") {
      window.cancelIdleCallback(idleCallbackId);
    }
    stopConsentWait();
  }

  waitForConsentThenArm();
})();
