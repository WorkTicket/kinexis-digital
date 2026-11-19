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
  const CHAT_PRIMING_CLASS = "kx-chat-priming";
  const GAP_ABOVE_BAR_PX = 12;
  const CTA_ABOVE_LAUNCHER_PX = 62;
  const PANEL_ABOVE_LAUNCHER_PX = 58;
  const PUBLIC_BOT_ID = "6afa0edabbad567d637ee189";
  // Conferbot inserts <conferbot-widget> after <body>, then attaches its open
  // shadow root and paints the launcher ~1s later. Poll per frame for that
  // long before falling back to the 1s interval (and lifting the CSS gate).
  const SHADOW_WAIT_MS = 6000;
  // Matches the launcher's (and CTA's) .7s exit transform: stay lifted while
  // fading out instead of dropping ~100px at the start of the exit.
  const LIFT_HOLD_MS = 750;

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
    let hostSeenAt = 0;
    // True once the launcher's hidden resting style has been computed while the
    // host is rendered. Showing before that snaps instead of transitioning.
    let primed = false;
    let lastShown = false;
    let liftedPx = 0;
    let liftHoldUntil = 0;
    let liftHoldTimer = 0;
    const mobileMq = window.matchMedia(MOBILE_MQ);

    // Only write when the value changes: every write is a mutation record that
    // re-schedules apply(), and Conferbot re-styles itself on host attr changes.
    const setClass = (el, cls, on) => {
      if (el.classList.contains(cls) !== on) el.classList.toggle(cls, on);
    };
    const setVar = (el, name, value) => {
      if (el.style.getPropertyValue(name) !== value) el.style.setProperty(name, value);
    };
    const clearVar = (el, name) => {
      if (el.style.getPropertyValue(name)) el.style.removeProperty(name);
    };

    // Keep our <style> after Conferbot's own sheets so equal-specificity
    // !important ties resolve our way. Re-appending on every pass (the old
    // behaviour) fed the shadow MutationObserver and looped apply() each frame.
    const ensureLast = (root, el) => {
      if (el.parentNode !== root) {
        root.appendChild(el);
        return;
      }
      for (let n = el.nextElementSibling; n; n = n.nextElementSibling) {
        if ((n.tagName === "STYLE" || n.tagName === "LINK") && !String(n.id).startsWith("kx-")) {
          root.appendChild(el);
          return;
        }
      }
    };

    const clearShadowLift = (host) => {
      setClass(host, HOST_CLASS, false);
      if (host.hasAttribute("data-cb-own-m-bottom")) host.removeAttribute("data-cb-own-m-bottom");
      clearVar(host, "--kx-chat-bottom");
      clearVar(host, "--cb-o-m-bottom");
      host.shadowRoot?.getElementById(STYLE_ID)?.remove();
      clearInlineLift(host.shadowRoot);
    };

    const bindFloat = (float) => {
      if (float === watchingFloat) return;
      floatObserver?.disconnect();
      resizeObs?.disconnect();
      watchingFloat = float;
      if (!float) return;
      floatObserver = new MutationObserver(applyNow);
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
        // Conferbot re-writes the (hidden) proactive bubble's inline position
        // every animation frame; reacting to that ran apply() + forced layout
        // 60x/s. Ignore those writes, keep everything else.
        shadowObserver = new MutationObserver((records) => {
          const relevant = records.some(
            (m) =>
              m.type !== "attributes" ||
              m.attributeName !== "style" ||
              !m.target.closest?.("#chat-cta, .chatbot__icon__cta"),
          );
          if (relevant) schedule();
        });
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
      const existing = root.getElementById(CHAT_VISIBLE_STYLE_ID);
      if (existing) {
        ensureLast(root, existing);
        return;
      }
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
  transition:opacity .5s ease,transform .7s cubic-bezier(.16,1,.3,1),visibility 0s linear .7s;
}
:host(.${CHAT_VISIBLE_CLASS}) #open-chatbot.chatbot__icon,
:host(.${CHAT_VISIBLE_CLASS}) .chatbot__icon{
  opacity:1!important;
  visibility:visible!important;
  transform:translateY(0)!important;
  pointer-events:auto!important;
  transition:opacity .5s ease,transform .7s cubic-bezier(.16,1,.3,1),visibility 0s linear 0s;
}
:host(.${CHAT_PRIMING_CLASS}) #open-chatbot.chatbot__icon,
:host(.${CHAT_PRIMING_CLASS}) .chatbot__icon{
  transition:none!important;
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
      if (!host) {
        hostSeenAt = 0;
        primed = false;
        return;
      }
      if (!hostSeenAt) hostSeenAt = performance.now();
      const waiting = performance.now() - hostSeenAt < SHADOW_WAIT_MS;
      if (!host.shadowRoot) {
        // attachShadow() fires no mutation; poll per frame while Conferbot boots.
        // If the shadow never opens, lift the globals.css gate so chat still works.
        if (waiting) schedule();
        else setClass(host, CHAT_READY_CLASS, true);
        return;
      }
      bindHost(host);
      hideProactiveBubbles(host.shadowRoot);
      installChatVisibilityStyle(host.shadowRoot);
      const html = document.documentElement;
      const float = document.querySelector(".float-cta");
      const floatCs = float ? getComputedStyle(float) : null;
      // Decide from the CTA's target (resting) box, not its in-flight rect: at
      // the moment .is-in flips the bar is still translated below the fold, so
      // a getBoundingClientRect() check would hold the launcher back a frame or
      // more and lift it to the wrong height mid-transition. The enter/exit
      // transform is vertical-only, so layout bottom + height give the rest top.
      const floatH = float ? float.offsetHeight : 0;
      const floatRestTop = float
        ? viewportHeight() - (Number.parseFloat(floatCs.bottom) || 0) - floatH
        : 0;
      const stickyShown =
        Boolean(float) &&
        html.classList.contains("sticky-chrome-in") &&
        !html.classList.contains("consent-open") &&
        Boolean(float?.classList.contains("is-in")) &&
        floatH > 1 &&
        floatRestTop < viewportHeight() &&
        floatRestTop + floatH > 0 &&
        floatCs?.display !== "none" &&
        floatCs?.visibility !== "hidden";
      if (lastShown && !stickyShown) liftHoldUntil = performance.now() + LIFT_HOLD_MS;
      if (stickyShown) liftHoldUntil = 0;
      lastShown = stickyShown;
      const launcher = host.shadowRoot.querySelector("#open-chatbot.chatbot__icon, .chatbot__icon");
      const hostRendered = getComputedStyle(host).display !== "none";
      if (!launcher || !hostRendered) {
        // consent-open (display:none) or a re-render drops the computed style.
        primed = false;
        setClass(host, CHAT_VISIBLE_CLASS, false);
        if (!launcher && waiting) schedule();
        if (!launcher) return;
      }
      // Lift the globals.css gate only now that the hidden launcher style is in
      // the shadow root, so Conferbot's first-paint launcher never flashes.
      setClass(host, CHAT_READY_CLASS, true);
      if (hostRendered && !primed) {
        // Commit the hidden resting style first (forced style flush) so the
        // first show transitions in with the CTA instead of snapping. This
        // covers the widget loading after the CTA is already in (first-input
        // scroll), and consent-open closing while scrolled.
        // Snap (no transition) from Conferbot's first-paint launcher to hidden.
        setClass(host, CHAT_VISIBLE_CLASS, false);
        setClass(host, CHAT_PRIMING_CLASS, true);
        void getComputedStyle(launcher).opacity;
        setClass(host, CHAT_PRIMING_CLASS, false);
        primed = true;
      }
      setClass(host, CHAT_VISIBLE_CLASS, stickyShown && primed);
      if (!mobileMq.matches) {
        clearShadowLift(host);
        return;
      }
      const htmlStyles = getComputedStyle(html);
      bindFloat(float);
      const stackFloor =
        cssPx(htmlStyles, "--float-gap", 16) +
        cssPx(htmlStyles, "--float-bar-h", 96) +
        GAP_ABOVE_BAR_PX;

      let bottomPx;
      const holdLeft = liftHoldUntil - performance.now();
      if (stickyShown) {
        bottomPx = Math.max(
          GAP_ABOVE_BAR_PX,
          Math.round(viewportHeight() - floatRestTop + GAP_ABOVE_BAR_PX),
        );
        bottomPx = Math.max(bottomPx, Math.round(stackFloor));
        liftedPx = bottomPx;
      } else if (liftedPx && holdLeft > 0 && !html.classList.contains("consent-open")) {
        bottomPx = liftedPx;
        if (!liftHoldTimer) {
          liftHoldTimer = window.setTimeout(() => {
            liftHoldTimer = 0;
            schedule();
          }, holdLeft + 20);
        }
      } else {
        liftedPx = 0;
        const sab = cssPx(htmlStyles, "--sab", 0);
        const stackGap = cssPx(htmlStyles, "--float-gap", 16);
        bottomPx = Math.round(Math.max(stackGap, sab) + GAP_ABOVE_BAR_PX);
      }
      const bottom = `${bottomPx}px`;
      setClass(host, HOST_CLASS, true);
      setVar(host, "--kx-chat-bottom", bottom);
      if (!host.hasAttribute("data-cb-own-m-bottom")) host.setAttribute("data-cb-own-m-bottom", "");
      setVar(host, "--cb-o-m-bottom", bottom);
      let styleEl = host.shadowRoot.getElementById(STYLE_ID);
      if (!styleEl) {
        styleEl = document.createElement("style");
        styleEl.id = STYLE_ID;
      }
      const liftCss = `
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
      if (styleEl.textContent !== liftCss) styleEl.textContent = liftCss;
      ensureLast(host.shadowRoot, styleEl);
      clearInlineLift(host.shadowRoot);
    };

    // CTA enter/leave (.float-cta.is-in, html.sticky-chrome-in) starts its CSS
    // transition in the same frame as the class flip. MutationObserver callbacks
    // run before that frame renders, so toggling here keeps the launcher in
    // lockstep with the CTA instead of a frame (or two) behind.
    function applyNow() {
      if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
      apply();
    }

    // One frame (not two): the CTA's .is-in / sticky-chrome-in class flips start
    // its transition immediately, so the launcher must toggle in the same frame
    // to move in sync. Coalesce instead of cancel so steady mutations can't starve it.
    function schedule() {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        apply();
      });
    }

    hostObserver = new MutationObserver(schedule);
    hostObserver.observe(document.documentElement, { childList: true, subtree: true });
    classObserver = new MutationObserver(applyNow);
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
