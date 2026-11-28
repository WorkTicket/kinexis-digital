(()=>{const cfg=window.__KINEXIS_CFG__||{};
const root = document.documentElement;
const reduce = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const ua = navigator.userAgent || "";
/** Facebook / Instagram / Messenger in-app browsers need extra bottom clearance for their chrome. */
const isMetaWebview = /FBAN|FBAV|FB_IAB|FB4A|FBIOS|Instagram|IGTV|Messenger|Line\//i.test(ua);
if (isMetaWebview) root.classList.add("is-meta-webview");
let path = location.pathname;
let menuOpen = false;
let megaTimer = 0;
let megaCtaTimer = 0;
let megaShutUntil = 0;
let unlock = () => {};
let heroStop = () => {};
let markIo = null;
const marked = new WeakSet();
let revealStop = () => {};
const fbTimers = new WeakMap();

/** Keep fixed chrome clear of the soft keyboard and Meta/IG bottom bars. */
let visualViewportFrame = 0;
function syncVisualViewport() {
  const vv = window.visualViewport;
  const inset = vv ? Math.max(0, Math.round(window.innerHeight - vv.height - vv.offsetTop)) : 0;
  const value = inset + "px";
  if (root.style.getPropertyValue("--vv-bottom") !== value) {
    root.style.setProperty("--vv-bottom", value);
  }
}
function scheduleVisualViewportSync() {
  if (visualViewportFrame) return;
  visualViewportFrame = requestAnimationFrame(() => {
    visualViewportFrame = 0;
    syncVisualViewport();
  });
}
syncVisualViewport();
if (window.visualViewport) {
  visualViewport.addEventListener("resize", scheduleVisualViewportSync, { passive: true });
  visualViewport.addEventListener("scroll", scheduleVisualViewportSync, { passive: true });
}
addEventListener("resize", scheduleVisualViewportSync, { passive: true });
addEventListener("orientationchange", () => setTimeout(scheduleVisualViewportSync, 120));

function syncChrome() {
  // Match DocumentShell route-chrome: strip locale, then toggle every chrome
  // class on each navigation so add-only first-paint classes cannot stick.
  const raw = location.pathname;
  const p = englishPath(raw);
  const noLead = p === "/contact" || p === "/audit" || p === "/strategy-call" || p.startsWith("/pay") || p.startsWith("/lp/");
  const noFloat = p === "/contact" || p === "/upgrades" || p.startsWith("/pay") || p === "/strategy-call" || p.startsWith("/lp/");
  const noAudit = p === "/contact" || p === "/audit" || p === "/privacy" || p === "/terms" || p === "/update" || p.startsWith("/pay") || p.startsWith("/lp/");
  const lpRoute = p.startsWith("/lp/");
  root.classList.toggle("no-lead", noLead);
  root.classList.toggle("no-float", noFloat);
  root.classList.toggle("no-audit", noAudit);
  root.classList.toggle("lp-route", lpRoute);
  document.querySelectorAll("[data-nav],[data-nav-match]").forEach((el) => {
    const href = el.getAttribute("href") || el.getAttribute("data-nav-match") || "";
    const prefix = el.hasAttribute("data-nav-prefix");
    const on = !!href && (prefix ? raw === href || raw.startsWith(href + "/") : href === raw);
    el.classList.toggle("is-current", on);
    if (on) el.setAttribute("aria-current", el.tagName === "A" ? "page" : "true");
    else el.removeAttribute("aria-current");
  });
}

function desktopMega() {
  return matchMedia("(hover: hover) and (pointer: fine)").matches && matchMedia("(min-width: 1321px)").matches;
}
function allMegas() {
  return [...document.querySelectorAll("[data-mega]")];
}
function syncMegaNav() {
  const nav = document.getElementById("nav");
  if (!nav) return;
  const mobile = matchMedia("(max-width: 1320px)").matches;
  // An open mega collapses the bottom CTAs so the dropdown has room.
  const anyOpen = !!document.querySelector("[data-mega].is-open");
  nav.classList.toggle("mega-open", mobile && anyOpen);
}
function finishMegaClose(mega) {
  mega.classList.remove("is-open");
  mega.querySelector(".mega__btn")?.setAttribute("aria-expanded", "false");
}
/** Drop .is-open immediately. Mobile height eases in CSS; desktop panels just hide. */
function closeMega(mega, onDone) {
  if (!mega.classList.contains("is-open")) {
    if (typeof onDone === "function") onDone();
    return;
  }
  finishMegaClose(mega);
  if (typeof onDone === "function") onDone();
}
function setMega(open, target = null) {
  if (open && performance.now() < megaShutUntil) return;
  if (open) clearTimeout(megaTimer);
  const megas = allMegas();
  if (!megas.length) return;
  if (!open) {
    clearTimeout(megaTimer);
    clearTimeout(megaCtaTimer);
    const openMegas = megas.filter((mega) => mega.classList.contains("is-open"));
    if (!openMegas.length) {
      syncMegaNav();
      return;
    }
    let left = openMegas.length;
    openMegas.forEach((mega) => {
      closeMega(mega, () => {
        left -= 1;
        if (left <= 0) syncMegaNav();
      });
    });
    return;
  }
  const active = target instanceof Element ? target.closest("[data-mega]") : null;
  if (!active) return;
  clearTimeout(megaCtaTimer);
  megas.forEach((mega) => {
    if (mega === active) {
      mega.classList.add("is-open");
      mega.querySelector(".mega__btn")?.setAttribute("aria-expanded", "true");
    } else if (mega.classList.contains("is-open")) {
      closeMega(mega);
    } else {
      mega.querySelector(".mega__btn")?.setAttribute("aria-expanded", "false");
    }
  });
  syncMegaNav();
}

function setOpen(open) {
  const btn = document.querySelector(".burger");
  const header = document.querySelector(".header");
  const nav = document.getElementById("nav");
  if (!btn || !header || !nav) return;
  if (open === menuOpen) return;
  menuOpen = open;
  unlock();
  unlock = () => {};
  btn.classList.toggle("is-open", open);
  btn.setAttribute("aria-expanded", String(open));
  btn.querySelector(".burger__word--open")?.setAttribute("aria-hidden", String(open));
  btn.querySelector(".burger__word--close")?.setAttribute("aria-hidden", String(!open));
  header.classList.toggle("is-open", open);
  nav.classList.toggle("is-open", open);
  root.classList.toggle("nav-open", open);
  if (!open) {
    root.style.removeProperty("--header-bottom");
    setMega(false);
    return;
  }
  // Measure sticky header + scroll Y before any lock/DOM pin. Overflow and
  // position locks break sticky; pinning the header can also nudge window.scrollY.
  const y = window.scrollY || window.pageYOffset;
  const pre = header.getBoundingClientRect();
  const pinTop = Math.max(0, Math.round(pre.top));
  const spacer = document.createElement("div");
  spacer.setAttribute("data-nav-header-spacer", "");
  spacer.style.cssText = "height:" + Math.round(pre.height) + "px;margin:0;padding:0;border:0;pointer-events:none;";
  header.after(spacer);
  header.style.position = "fixed";
  header.style.top = pinTop + "px";
  header.style.left = "0";
  header.style.right = "0";
  header.style.width = "100%";
  header.style.zIndex = "80";
  lockScroll();
  // lockScroll reads scrollY after the pin; keep the pre-pin value for restore.
  scrollY = y;
  document.body.style.top = "-" + y + "px";
  const headerBottom = Math.round(header.getBoundingClientRect().bottom);
  root.style.setProperty("--header-bottom", Math.max(headerBottom, pinTop + Math.round(pre.height)) + "px");
  const block = (event) => {
    const sheet = document.getElementById("nav");
    if (sheet && sheet.scrollHeight > sheet.clientHeight && event.target instanceof Node && sheet.contains(event.target)) return;
    event.preventDefault();
  };
  const onMq = () => { if (!mq.matches) setOpen(false); };
  const mq = matchMedia("(max-width: 1320px)");
  document.addEventListener("touchmove", block, { passive: false });
  document.addEventListener("wheel", block, { passive: false });
  mq.addEventListener("change", onMq);
  unlock = () => {
    root.classList.remove("nav-open");
    root.style.removeProperty("--header-bottom");
    document.removeEventListener("touchmove", block);
    document.removeEventListener("wheel", block);
    mq.removeEventListener("change", onMq);
    const restoreY = y;
    // Prevent scroll anchoring from shifting the page when the sticky header
    // re-enters normal flow after the fixed pin + spacer are removed.
    root.style.overflowAnchor = "none";
    unlockScroll();
    header.style.position = "";
    header.style.top = "";
    header.style.left = "";
    header.style.right = "";
    header.style.width = "";
    header.style.zIndex = "";
    document.querySelector("[data-nav-header-spacer]")?.remove();
    window.scrollTo(0, restoreY);
    requestAnimationFrame(() => {
      window.scrollTo(0, restoreY);
      root.style.overflowAnchor = "";
    });
  };
}

function stuck() {
  const header = document.querySelector(".header");
  if (header) header.classList.toggle("is-stuck", window.scrollY > 8);
}

function setFb(node, open) {
  const pending = fbTimers.get(node);
  if (pending) clearTimeout(pending);
  fbTimers.delete(node);
  node.classList.toggle("is-open", open);
  node.querySelector("button")?.setAttribute("aria-expanded", String(open));
}
function showFb(node) { setFb(node, true); }
function hideFb(node) {
  const pending = fbTimers.get(node);
  if (pending) clearTimeout(pending);
  fbTimers.set(node, setTimeout(() => setFb(node, false), 140));
}

let scrollY = 0;
function lockScroll() {
  if (document.documentElement.dataset.scrollLock === "1") return;
  scrollY = window.scrollY || window.pageYOffset;
  document.documentElement.dataset.scrollLock = "1";
  document.documentElement.style.overflow = "hidden";
  document.body.style.overflow = "hidden";
  document.body.style.position = "fixed";
  document.body.style.top = `-${scrollY}px`;
  document.body.style.left = "0";
  document.body.style.right = "0";
  document.body.style.width = "100%";
}
function unlockScroll() {
  if (document.querySelector("dialog.dlg[open]")) return;
  delete document.documentElement.dataset.scrollLock;
  document.documentElement.style.overflow = "";
  document.body.style.overflow = "";
  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.left = "";
  document.body.style.right = "";
  document.body.style.width = "";
  const root = document.documentElement;
  const previousScrollBehavior = root.style.scrollBehavior;
  root.style.scrollBehavior = "auto";
  const restore = () => window.scrollTo(0, scrollY);
  restore();
  requestAnimationFrame(() => {
    restore();
    root.style.scrollBehavior = previousScrollBehavior;
  });
}
function openDialog(id, src) {
  const dlgId = id === "video" ? "dlg-video" : id === "refund" ? "dlg-refund" : "dlg-guarantee";
  const dlg = document.getElementById(dlgId);
  if (!(dlg instanceof HTMLDialogElement)) return;
  if (id === "video") {
    const url = src || dlg.getAttribute("data-video") || "";
    const slot = dlg.querySelector("[data-video-slot]");
    if (url && slot) {
      const file = /\.(mp4|webm)(\?|$)/i.test(url);
      if (file) {
        let video = slot.querySelector("video");
        if (!(video instanceof HTMLVideoElement) || video.getAttribute("src") !== url) {
          video = document.createElement("video");
          video.controls = false;
          video.playsInline = true;
          video.preload = "auto";
          video.src = url;
          video.setAttribute("controlsList", "nodownload");
          slot.replaceChildren(video);
        }
        if (!dlg.dataset.bound) {
          dlg.dataset.bound = "1";
          dlg.addEventListener("close", () => {
            const playing = dlg.querySelector("video");
            if (playing instanceof HTMLVideoElement) playing.pause();
            const loop = document.querySelector("video.hero__film");
            if (loop instanceof HTMLVideoElement && loop.querySelector("source") && !reduce()) loop.play().catch(() => {});
            unlockScroll();
          });
        }
        video.muted = false;
        video.volume = 1;
        try { video.currentTime = 0; } catch {}
        lockScroll();
        if (!dlg.open) dlg.showModal();
        video.play().catch(() => {});
        const hero = document.querySelector("video.hero__film");
        if (hero instanceof HTMLVideoElement) hero.pause();
        return;
      }
      if (!slot.querySelector("iframe")) {
        const frame = document.createElement("iframe");
        frame.title = "Video";
        frame.allow = "autoplay; encrypted-media; fullscreen";
        frame.src = url + (url.includes("?") ? "&" : "?") + "autoplay=1";
        slot.replaceChildren(frame);
      }
    }
  }
  lockScroll();
  if (!dlg.open) dlg.showModal();
}
function closeDialogs() {
  document.querySelectorAll("dialog.dlg[open]").forEach((dlg) => dlg.close());
  unlockScroll();
}

function armMarks() {
  const nodes = [...document.querySelectorAll("main h1 .hl, main h2 .hl")]
    .filter((el) => !el.closest(".hero, .page-hero, [data-island]"));
  if (reduce() || !("IntersectionObserver" in window)) {
    nodes.forEach((el) => {
      el.classList.remove("is-pending");
      el.classList.add("is-marked");
    });
    return;
  }
  if (!markIo) {
    const io = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      io.unobserve(entry.target);
      entry.target.classList.remove("is-pending");
      entry.target.classList.add("is-marked");
    }), { threshold: 0.7, rootMargin: "0px 0px -6% 0px" });
    markIo = io;
  }
  nodes.forEach((el) => {
    if (marked.has(el)) return;
    marked.add(el);
    const rect = el.getBoundingClientRect();
    if (rect.bottom > 0 && rect.top < innerHeight) {
      el.classList.add("is-marked");
      return;
    }
    el.classList.add("is-pending");
    markIo.observe(el);
  });
}
function resetMarks() {
  markIo?.disconnect();
  markIo = null;
}

function resetReveal() {
  // Scroll-reveal used to set opacity:0 on matched nodes as soon as boot ran.
  // That left cards/shots blank on first load. Keep nodes painted.
  revealStop();
  revealStop = () => {};
}

const heroArmed = new WeakSet();
function armHero() {
  const el = document.querySelector("video.hero__film");
  if (!el || heroArmed.has(el)) return;
  heroArmed.add(el);
  if (reduce()) return;
  // Muted preview loop on all viewports (save-data / 2G keep the poster).
  // Full-sound playback still goes through the play button → dialog.
  const conn = navigator.connection;
  if (conn && (conn.saveData || /(^|-)2g$/.test(conn.effectiveType || ""))) return;
  const events = ["pointerdown", "keydown", "scroll"];
  const onPlaying = () => el.classList.add("is-playing");
  const play = () => { el.muted = true; el.play().catch(() => {}); };
  const start = () => {
    if (el.querySelector("source")) return;
    for (const [src, type] of [["/assets/video/kinexis-explainer-v5f-preview.mp4", "video/mp4"]]) {
      const source = document.createElement("source");
      source.src = src;
      source.type = type;
      el.appendChild(source);
    }
    el.addEventListener("playing", onPlaying);
    el.addEventListener("canplay", play);
    el.muted = true;
    el.load();
  };
  let timer = 0;
  const go = () => {
    clearTimeout(timer);
    for (const name of events) removeEventListener(name, go);
    start();
  };
  const arm = () => {
    for (const name of events) addEventListener(name, go, { once: true, passive: true });
    // Poster paints as LCP first; start the muted loop almost immediately after
    // so the hero does not sit on a static frame for seconds.
    timer = setTimeout(go, 400);
  };
  const poster = el.parentElement?.querySelector("img");
  if (poster instanceof HTMLImageElement && !poster.complete) poster.addEventListener("load", arm, { once: true });
  else arm();
  heroStop = () => {
    clearTimeout(timer);
    poster?.removeEventListener("load", arm);
    for (const name of events) removeEventListener(name, go);
    el.removeEventListener("playing", onPlaying);
    el.removeEventListener("canplay", play);
  };
}

const shots = new WeakMap();
// Hover-scroll needs a real mouse/trackpad. Do not key off viewport width —
// a narrow desktop window still has hover.
function canHoverScroll() {
  try { return matchMedia("(hover: hover) and (pointer: fine)").matches; }
  catch { return true; }
}
const live = new Set();
const SHOT_SCROLL_SPEED = 540;
let hotShot = null;
let pointerX = 0;
let pointerY = 0;
let pointerSeen = false;
let hotScrollRaf = 0;
function motion(shot) {
  let state = shots.get(shot);
  if (!state) {
    state = { offset: 0, raf: 0, playing: false };
    shots.set(shot, state);
    live.add(shot);
  }
  return state;
}
function parts(shot) {
  return { frame: shot.querySelector(".shot__page"), track: shot.querySelector(".shot__track") };
}
function distance(shot) {
  const box = parts(shot);
  if (!box.frame || !box.track) return 0;
  const trackH = Math.max(box.track.offsetHeight, box.track.scrollHeight);
  return Math.max(0, trackH - box.frame.clientHeight);
}
function place(shot, y) {
  const state = motion(shot);
  state.offset = y;
  const track = parts(shot).track;
  if (track) track.style.transform = "translate3d(0, " + (-y) + "px, 0)";
}
function startShot(shot) {
  if (reduce() || shot.classList.contains("shot--static")) return;
  const state = motion(shot);
  cancelAnimationFrame(state.raf);
  state.playing = true;
  let previous = performance.now();
  let waits = 0;
  const step = (now) => {
    if (!shot.isConnected || hotShot !== shot) {
      state.playing = false;
      return;
    }
    const total = distance(shot);
    // After content-visibility resumes (or before the image lays out), height
    // can briefly read as 0. Keep trying instead of dying on the first frame.
    if (total <= 1) {
      if (waits++ < 45) state.raf = requestAnimationFrame(step);
      else state.playing = false;
      return;
    }
    waits = 0;
    const elapsed = Math.min(50, now - previous);
    previous = now;
    const px = SHOT_SCROLL_SPEED * elapsed / 1000;
    place(shot, Math.min(total, state.offset + px));
    if (state.offset < total - 0.5) state.raf = requestAnimationFrame(step);
    else state.playing = false;
  };
  state.raf = requestAnimationFrame(step);
}
function stopShot(shot) {
  const state = motion(shot);
  state.playing = false;
  cancelAnimationFrame(state.raf);
  if (!parts(shot).track) return;
  if (reduce()) { place(shot, 0); return; }
  const from = state.offset;
  const started = performance.now();
  const back = (now) => {
    if (hotShot === shot) return;
    const progress = Math.min(1, (now - started) / 320);
    place(shot, from * (1 - progress));
    if (progress < 1) state.raf = requestAnimationFrame(back);
  };
  state.raf = requestAnimationFrame(back);
}
function syncHotShot(shot) {
  const next = shot && !shot.classList.contains("shot--static") && shot.isConnected ? shot : null;
  if (next === hotShot) {
    // Resume only if scroll/content-visibility killed the loop while still hovered.
    if (next && !motion(next).playing) startShot(next);
    return;
  }
  const prev = hotShot;
  hotShot = next;
  if (prev) stopShot(prev);
  if (next) startShot(next);
}
function shotFromPoint(x, y) {
  const el = document.elementFromPoint(x, y);
  if (!(el instanceof Element)) return null;
  const shot = el.closest(".shot");
  return shot && !shot.classList.contains("shot--static") ? shot : null;
}
function refreshHotShot() {
  hotScrollRaf = 0;
  if (!canHoverScroll() || reduce() || !pointerSeen) return;
  const under = shotFromPoint(pointerX, pointerY);
  // Only restart when a shot is under the pointer. Never clear from scroll —
  // stale coordinates after a long scroll were killing an active hover.
  if (under) syncHotShot(under);
}
function clickStart(shot) {
  if (distance(shot) - motion(shot).offset <= 2) place(shot, 0);
  hotShot = shot;
  startShot(shot);
}
function shotOf(event) {
  const target = event.target;
  if (!(target instanceof Element)) return null;
  return target.closest(".shot");
}
function entered(event) {
  const shot = shotOf(event);
  if (!shot) return null;
  const from = event.relatedTarget;
  if (from instanceof Node && shot.contains(from)) return null;
  return shot;
}
function showShotFallback(shot) {
  if (shot.querySelector(".shot__fallback")) return;
  const name = shot.getAttribute("data-name") || "Project";
  const page = shot.querySelector(".shot__page");
  if (!page) return;
  const box = document.createElement("div");
  box.className = "shot__fallback";
  box.setAttribute("role", "img");
  box.setAttribute("aria-label", name + " screenshot coming soon");
  const title = document.createElement("span");
  title.textContent = name;
  const note = document.createElement("small");
  note.textContent = "Preview coming soon";
  box.append(title, note);
  page.replaceWith(box);
}
function showImageFallback(img) {
  const label = img.getAttribute("data-fallback");
  if (!label) return;
  const box = document.createElement("div");
  box.className = "safe-image-fallback" + (img.className ? " " + img.className : "");
  box.setAttribute("role", "img");
  box.setAttribute("aria-label", label);
  const span = document.createElement("span");
  span.textContent = label;
  box.append(span);
  img.replaceWith(box);
}

let imageIo = null;
let imagePending = false;
const armedImgs = new WeakSet();
function showImg(img) {
  const picture = img.parentElement;
  if (picture && picture.tagName === "PICTURE") {
    const source = picture.querySelector("source[media]");
    const media = source && source.getAttribute("media");
    if (media && matchMedia(media).matches) return;
    picture.querySelectorAll("source[data-srcset]").forEach((source) => {
      const sourceSet = source.getAttribute("data-srcset");
      if (sourceSet) source.setAttribute("srcset", sourceSet);
    });
  }
  const next = img.getAttribute("data-src");
  if (!next || img.getAttribute("src") === next) return;
  const set = img.getAttribute("data-srcset");
  if (set) img.setAttribute("srcset", set);
  img.setAttribute("src", next);
}
function watchImages() {
  const nodes = [...document.querySelectorAll("img[data-src]")].filter((img) => !armedImgs.has(img));
  if (!nodes.length) return;
  if (!imageIo && "IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        showImg(entry.target);
        io.unobserve(entry.target);
      }
    }, { rootMargin: "0px 0px 1200px 0px" });
    imageIo = io;
  }
  nodes.forEach((img) => {
    armedImgs.add(img);
    if (imageIo) imageIo.observe(img);
    else showImg(img);
  });
}
function scheduleImages() {
  if (imagePending) return;
  imagePending = true;
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const run = () => {
        imagePending = false;
        watchImages();
      };
      // Start observing after the first paint instead of waiting for LCP to
      // settle. Requests remain low priority, but nearby art is ready sooner.
      if ("requestIdleCallback" in window) requestIdleCallback(run, { timeout: 600 });
      else setTimeout(run, 0);
    });
  });
}

function paintNew() {
  armHero();
  armMarks();
  scheduleImages();
  syncFooterColumns();
}

/** Coalesce hydration/DOM churn into one paint pass — cuts long main-thread tasks. */
let paintQueued = false;
function schedulePaintNew() {
  if (paintQueued) return;
  paintQueued = true;
  requestAnimationFrame(() => {
    paintQueued = false;
    paintNew();
  });
}

const FOOTER_MQ = "(max-width: 639px)";
let footerColumnsArmed = false;
function footerColumns() {
  return document.querySelectorAll("details.footer-column");
}
function syncFooterColumns() {
  const mq = matchMedia(FOOTER_MQ);
  footerColumns().forEach((el) => {
    el.open = !mq.matches;
  });
  if (footerColumnsArmed) return;
  footerColumnsArmed = true;
  mq.addEventListener("change", () => {
    footerColumns().forEach((el) => {
      el.open = !mq.matches;
    });
  });
  document.addEventListener("toggle", (event) => {
    const el = event.target;
    if (!(el instanceof HTMLDetailsElement) || !el.classList.contains("footer-column")) return;
    if (!mq.matches || !el.open) return;
    const rootCol = el.parentElement;
    if (!rootCol) return;
    rootCol.querySelectorAll("details.footer-column").forEach((other) => {
      if (other !== el) other.open = false;
    });
  }, true);
}

/** Desktop header CTA nudge — same timing as the former HeaderCta effect. */
(function armHeaderCtaNudge() {
  // Match cta-nudge keyframe length; leave a beat before the next gap timer.
  const PLAY_MS = 1600;
  const GAP_MIN_MS = 6000;
  const GAP_MAX_MS = 11000;
  const FIRST_DELAY_MS = 2800;
  // Desktop inline nav only (≥1321). Tablet header CTA is too tight — the
  // tilt/sheen reads as a broken fast loop next to Menu.
  const desktopMq = matchMedia("(min-width: 1321px) and (hover: hover) and (pointer: fine)");
  function nextGap() {
    return GAP_MIN_MS + Math.floor(Math.random() * (GAP_MAX_MS - GAP_MIN_MS + 1));
  }
  function visibleCta() {
    return [...document.querySelectorAll(".header__cta")].find((el) => {
      if (!(el instanceof HTMLElement)) return false;
      return getComputedStyle(el).display !== "none";
    }) || null;
  }
  function start() {
    if (reduce()) return;
    if (!desktopMq.matches) return;
    let gapTimer = 0;
    let clearTimer = 0;
    let stopped = false;
    let playing = false;
    const clearNudge = (el) => {
      el?.removeAttribute("data-cta-nudge");
    };
    const schedule = (delay) => {
      window.clearTimeout(gapTimer);
      gapTimer = window.setTimeout(play, delay);
    };
    const play = () => {
      if (stopped || document.hidden || playing || !desktopMq.matches) return;
      window.clearTimeout(clearTimer);
      const el = visibleCta();
      if (!el) {
        schedule(nextGap());
        return;
      }
      if (el.matches(":hover, :focus-visible, :active")) {
        schedule(nextGap());
        return;
      }
      playing = true;
      clearNudge(el);
      void el.offsetWidth;
      el.dataset.ctaNudge = "1";
      clearTimer = window.setTimeout(() => {
        clearNudge(el);
        playing = false;
        schedule(nextGap());
      }, PLAY_MS);
    };
    const onVisibility = () => {
      if (document.hidden) {
        window.clearTimeout(gapTimer);
        window.clearTimeout(clearTimer);
        playing = false;
        clearNudge(visibleCta());
      } else if (!stopped && desktopMq.matches) {
        schedule(nextGap());
      }
    };
    const onDesktopChange = () => {
      if (!desktopMq.matches) {
        window.clearTimeout(gapTimer);
        window.clearTimeout(clearTimer);
        playing = false;
        clearNudge(visibleCta());
      } else if (!stopped && !document.hidden) {
        schedule(FIRST_DELAY_MS);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    if (typeof desktopMq.addEventListener === "function") desktopMq.addEventListener("change", onDesktopChange);
    else desktopMq.addListener(onDesktopChange);
    schedule(FIRST_DELAY_MS);
  }
  if (document.readyState === "complete") start();
  else addEventListener("load", start, { once: true });
})();
let measureFloat = () => {};
function resetFloat() {
  const bar = document.querySelector(".float-cta");
  bar?.classList.remove("is-in");
  bar?.setAttribute("inert", "");
  root.classList.remove("sticky-chrome-in");
}
function onNavigate() {
  heroStop();
  heroStop = () => {};
  setMega(false);
  setOpen(false);
  closeDialogs();
  document.querySelectorAll("[data-fb].is-open").forEach((node) => setFb(node, false));
  live.forEach((shot) => cancelAnimationFrame(motion(shot).raf));
  live.clear();
  hotShot = null;
  resetFloat();
  resetReveal();
  resetMarks();
  syncChrome();
  syncLangSwitch();
  paintNew();
  requestAnimationFrame(measureFloat);
  // Soft navigations need a fresh PageView for Meta Events Manager.
  trackPageView();
}

const bar = document.querySelector(".float-cta");
if (bar) {
  // A short page would flash the bar for a moment before the footer arrives.
  // Only show it when there is enough content left to keep it on screen for a
  // useful stretch of scrolling. Add-ons, FAQ and similar summary pages sit
  // under this floor and get no floating CTA at all.
  const MIN_ROOM_SCREENS = 2.5;
  let frame = 0;
  const measure = () => {
    frame = 0;
    if (root.classList.contains("no-float")) {
      bar.classList.remove("is-in");
      bar.setAttribute("inert", "");
      root.classList.remove("sticky-chrome-in");
      return;
    }
    const sentinel = document.querySelector(".hero__btns, .page-hero");
    const footer = document.querySelector("footer");
    const vh = innerHeight;
    const sentinelBottom = sentinel?.getBoundingClientRect().bottom ?? 0;
    const footerRect = footer?.getBoundingClientRect();
    const pageY = window.scrollY;
    const footerTop = (footerRect?.top ?? document.documentElement.scrollHeight) + pageY;
    const heroBottom = sentinelBottom + pageY;
    const past = sentinel ? sentinelBottom <= 1 : pageY > 320;
    const covered = !!footerRect && footerRect.top < vh - 80;
    // Scroll distance available while the bar is on screen, before the footer
    // takes over the bottom of the viewport.
    const room = footerTop - heroBottom - vh + 80;
    const roomy = room >= vh * MIN_ROOM_SCREENS;
    const shown = past && roomy && !covered;
    bar.classList.toggle("is-in", shown);
    root.classList.toggle("sticky-chrome-in", shown);
    if (shown) bar.removeAttribute("inert");
    else bar.setAttribute("inert", "");
  };
  measureFloat = measure;
  const onScroll = () => { if (!frame) frame = requestAnimationFrame(measure); };
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", onScroll);
  addEventListener("load", measure, { once: true });
  measure();
}

let stuckFrame = 0;
addEventListener("scroll", () => {
  if (stuckFrame) return;
  stuckFrame = requestAnimationFrame(() => {
    stuckFrame = 0;
    stuck();
  });
}, { passive: true });
stuck();
document.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof Element)) return;
  const burger = target.closest(".burger");
  if (burger) { setOpen(!menuOpen); return; }
  const megaBtn = target.closest(".mega__btn");
  if (megaBtn) {
    const mega = megaBtn.closest("[data-mega]");
    if (mega) {
      // Mobile/tablet: tap toggles. Desktop uses hover/focus (below).
      if (!desktopMega()) setMega(!mega.classList.contains("is-open"), mega);
    }
    return;
  }
  if (!target.closest("[data-mega]")) setMega(false);
  const opener = target.closest("[data-dialog]");
  if (opener) { openDialog(opener.getAttribute("data-dialog"), opener.getAttribute("data-video-src") || ""); return; }
  const closer = target.closest("[data-dialog-close]");
  if (closer) closer.closest("dialog")?.close();
  if (target instanceof HTMLDialogElement && target.classList.contains("dlg")) {
    const rect = target.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) target.close();
  }
  const navLink = target.closest("#nav a");
  if (navLink && navLink.closest("[data-mega]")) {
    megaShutUntil = performance.now() + 700;
    const active = document.activeElement;
    if (active instanceof HTMLElement && active.closest("[data-mega]")) active.blur();
  }
  if (navLink) setMega(false);
  if (navLink && menuOpen) setOpen(false);
  const chip = target.closest("[data-filter]");
  if (chip) {
    const cat = chip.getAttribute("data-filter");
    chip.parentElement?.querySelectorAll(".chip").forEach((el) => {
      const on = el === chip;
      el.classList.toggle("is-active", on);
      el.setAttribute("aria-pressed", String(on));
    });
    let scope = chip.parentElement;
    while (scope && !scope.querySelector("[data-cat]")) scope = scope.parentElement;
    scope?.querySelectorAll("[data-cat]").forEach((el) => {
      if (cat === "all" || el.getAttribute("data-cat") === cat) el.removeAttribute("hidden");
      else el.setAttribute("hidden", "");
    });
  }
  const tab = target.closest(".stepper [role=tab]");
  if (tab) {
    const stepper = tab.closest(".stepper");
    const tabs = [...stepper.querySelectorAll("[role=tab]")];
    selectTab(stepper, tabs.indexOf(tab), false);
  }
  const fbBtn = target.closest("[data-fb] > button");
  if (fbBtn && !matchMedia("(hover: hover) and (pointer: fine)").matches) {
    const node = fbBtn.closest("[data-fb]");
    setFb(node, !node.classList.contains("is-open"));
  }
});
document.addEventListener("pointerover", (event) => {
  const node = event.target instanceof Element ? event.target.closest("[data-fb]") : null;
  if (!node || event.pointerType === "touch") return;
  const from = event.relatedTarget;
  if (from instanceof Node && node.contains(from)) return;
  showFb(node);
});
document.addEventListener("pointerout", (event) => {
  const node = event.target instanceof Element ? event.target.closest("[data-fb]") : null;
  if (!node || event.pointerType === "touch") return;
  const to = event.relatedTarget;
  if (to instanceof Node && node.contains(to)) return;
  hideFb(node);
});
document.addEventListener("focusin", (event) => {
  const node = event.target instanceof Element ? event.target.closest("[data-fb]") : null;
  if (node) showFb(node);
});
document.addEventListener("focusout", (event) => {
  const node = event.target instanceof Element ? event.target.closest("[data-fb]") : null;
  if (!node) return;
  const next = event.relatedTarget;
  if (next instanceof Node && node.contains(next)) return;
  hideFb(node);
});
document.addEventListener("pointerdown", (event) => {
  document.querySelectorAll("[data-fb].is-open").forEach((node) => {
    if (event.target instanceof Node && node.contains(event.target)) return;
    setFb(node, false);
  });
});
document.addEventListener("pointerover", (event) => {
  if (!desktopMega() || event.pointerType === "touch") return;
  const mega = event.target instanceof Element ? event.target.closest("[data-mega]") : null;
  if (!mega) return;
  const from = event.relatedTarget;
  if (from instanceof Node && mega.contains(from)) return;
  clearTimeout(megaTimer);
  setMega(true, mega);
});
document.addEventListener("pointerout", (event) => {
  if (!desktopMega() || event.pointerType === "touch") return;
  const mega = event.target instanceof Element ? event.target.closest("[data-mega]") : null;
  if (!mega) return;
  const to = event.relatedTarget;
  if (to instanceof Node && mega.contains(to)) return;
  clearTimeout(megaTimer);
  megaTimer = setTimeout(() => setMega(false), 200);
});
document.addEventListener("focusin", (event) => {
  const mega = event.target instanceof Element ? event.target.closest("[data-mega]") : null;
  if (!mega || !desktopMega()) return;
  clearTimeout(megaTimer);
  setMega(true, mega);
});
document.addEventListener("focusout", (event) => {
  const mega = event.target instanceof Element ? event.target.closest("[data-mega]") : null;
  if (!mega || !desktopMega()) return;
  const next = event.relatedTarget;
  if (next instanceof Node && mega.contains(next)) return;
  clearTimeout(megaTimer);
  megaTimer = setTimeout(() => setMega(false), 120);
});
matchMedia("(max-width: 1320px)").addEventListener("change", () => setMega(false));
document.addEventListener("keydown", (event) => {
  const megaOpen = document.querySelector("[data-mega].is-open");
  if (event.key === "Escape" && megaOpen) {
    setMega(false);
    if (!menuOpen) megaOpen.querySelector(".mega__btn")?.focus({ preventScroll: true });
    return;
  }
  if (event.key === "ArrowDown" && event.target instanceof Element && event.target.closest(".mega__btn")) {
    const mega = event.target.closest("[data-mega]");
    const first = mega && mega.querySelector(".mega__panel a");
    if (first instanceof HTMLElement) {
      event.preventDefault();
      setMega(true, mega);
      first.focus();
    }
  }
  if (event.key === "Escape" && menuOpen) {
    setOpen(false);
    document.querySelector(".burger")?.focus({ preventScroll: true });
    return;
  }
  if (event.key === "Escape") document.querySelectorAll("[data-fb].is-open").forEach((node) => setFb(node, false));
  const tab = event.target instanceof Element ? event.target.closest(".stepper [role=tab]") : null;
  if (tab) {
    const stepper = tab.closest(".stepper");
    const tabs = [...stepper.querySelectorAll("[role=tab]")];
    const map = { ArrowRight: tabs.indexOf(tab) + 1, ArrowLeft: tabs.indexOf(tab) - 1, Home: 0, End: tabs.length - 1 };
    if (event.key in map) {
      event.preventDefault();
      selectTab(stepper, (map[event.key] + tabs.length) % tabs.length, true);
    }
  }
  if (event.key !== "Enter" && event.key !== " ") return;
  const shot = event.target instanceof Element ? event.target.closest(".shot--click") : null;
  if (!shot) return;
  event.preventDefault();
  clickStart(shot);
});
function selectTab(stepper, index, focus) {
  const tabs = [...stepper.querySelectorAll("[role=tab]")];
  const panels = [...stepper.querySelectorAll("[role=tabpanel]")];
  tabs.forEach((tab, k) => {
    const on = k === index;
    tab.classList.toggle("is-active", on);
    tab.setAttribute("aria-selected", String(on));
    tab.tabIndex = on ? 0 : -1;
    if (on && focus) tab.focus();
  });
  panels.forEach((panel, k) => panel.classList.toggle("is-active", k === index));
}
if (canHoverScroll()) {
  document.addEventListener("pointermove", (event) => {
    pointerSeen = true;
    pointerX = event.clientX;
    pointerY = event.clientY;
  }, { passive: true });
  document.addEventListener("mouseover", (event) => {
    const shot = entered(event);
    if (shot && !shot.classList.contains("shot--static")) syncHotShot(shot);
  });
  document.addEventListener("mouseout", (event) => {
    const shot = entered(event);
    if (!shot || shot !== hotShot) return;
    syncHotShot(null);
  });
  // After a long scroll, a shot can sit back under the cursor with no new
  // mouseover. Re-hit-test to restart; mouseout still owns clearing.
  addEventListener("scroll", () => {
    if (hotScrollRaf) return;
    hotScrollRaf = requestAnimationFrame(refreshHotShot);
  }, { passive: true });
}

// Touch/pen: press-and-hold scrolls the preview like desktop hover.
// A quick tap still opens linked project pages.
{
  const HOLD_MS = 160;
  const MOVE_CANCEL_PX = 12;
  let holdShot = null;
  let holdPointerId = 0;
  let holdTimer = 0;
  let holdX = 0;
  let holdY = 0;
  let holdActive = false;
  let suppressShotClick = false;
  function clearHold(rewind) {
    if (holdTimer) {
      clearTimeout(holdTimer);
      holdTimer = 0;
    }
    const shot = holdShot;
    holdShot = null;
    holdPointerId = 0;
    if (!shot) return;
    shot.classList.remove("is-holding");
    if (holdActive) {
      holdActive = false;
      if (rewind && hotShot === shot) syncHotShot(null);
    }
  }
  function armHold(shot) {
    holdActive = true;
    shot.classList.add("is-holding");
    if (distance(shot) - motion(shot).offset <= 2) place(shot, 0);
    syncHotShot(shot);
  }
  document.addEventListener("pointerdown", (event) => {
    if (event.pointerType !== "touch" && event.pointerType !== "pen") return;
    if (reduce() || event.button > 0) return;
    const shot = shotOf(event);
    if (!shot || shot.classList.contains("shot--static")) return;
    // Compact homepage previews should not activate their hold-scroll animation.
    if (shot.closest(".portfolio--home") && matchMedia("(max-width: 720px)").matches) return;
    clearHold(false);
    holdShot = shot;
    holdPointerId = event.pointerId;
    holdX = event.clientX;
    holdY = event.clientY;
    holdActive = false;
    holdTimer = window.setTimeout(() => {
      holdTimer = 0;
      if (holdShot === shot) armHold(shot);
    }, HOLD_MS);
  }, { passive: true });
  document.addEventListener("pointermove", (event) => {
    if (!holdShot || event.pointerId !== holdPointerId) return;
    if (holdActive) return;
    const dx = event.clientX - holdX;
    const dy = event.clientY - holdY;
    if (dx * dx + dy * dy > MOVE_CANCEL_PX * MOVE_CANCEL_PX) clearHold(false);
  }, { passive: true });
  function endHold(event) {
    if (!holdShot || event.pointerId !== holdPointerId) return;
    const shot = holdShot;
    const scrolled = holdActive || motion(shot).offset > 8;
    clearHold(true);
    if (scrolled && shot.matches("a")) suppressShotClick = true;
  }
  document.addEventListener("pointerup", endHold, { passive: true });
  document.addEventListener("pointercancel", endHold, { passive: true });
  document.addEventListener("click", (event) => {
    if (!suppressShotClick) return;
    suppressShotClick = false;
    const shot = shotOf(event);
    if (!shot) return;
    event.preventDefault();
    event.stopPropagation();
  }, true);
}
document.addEventListener("click", (event) => {
  const shot = shotOf(event);
  if (!shot || shot.matches("a")) return;
  if (shot.classList.contains("shot--click")) clickStart(shot);
  else startShot(shot);
});
addEventListener("error", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLImageElement) || target.closest("[data-island]")) return;
  const shot = target.closest(".shot");
  if (shot) showShotFallback(shot);
  else if (target.hasAttribute("data-fallback")) showImageFallback(target);
}, true);
function formCopy() {
  const es = String(document.documentElement.lang || "").toLowerCase().startsWith("es");
  return es ? {
    contactOr: "Agrega un teléfono o un correo.",
    fill: "Completa los campos marcados.",
    thanks: "Gracias. Te enviaremos tu vista previa en un máximo de 2 días hábiles.",
    mailOpen: "Debería abrirse tu correo con este mensaje. Si no, escribe a ",
    mailSubject: "Mensaje desde el sitio de Kinexis Digital",
    error: "Algo salió mal. Inténtalo de nuevo.",
    network: "Error de red. Inténtalo de nuevo.",
  } : {
    contactOr: "Please add a phone number or email.",
    fill: "Please fill in the highlighted fields.",
    thanks: "Thanks. We’ll send your preview within 2 business days.",
    mailOpen: "Your email app should open with this message. If it does not, email ",
    mailSubject: "Message from the Kinexis Digital website",
    error: "Something went wrong. Please try again.",
    network: "Network error. Please try again.",
  };
}

const leadFormsInFlight = new WeakSet();
const leadFormStartedAt = new WeakMap();
document.addEventListener("focusin", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;
  const form = target.closest("form[data-lead]");
  if (!(form instanceof HTMLFormElement)) return;
  if (!leadFormStartedAt.has(form)) leadFormStartedAt.set(form, Date.now());
  ensureTurnstileWidget(form);
});
document.addEventListener("change", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLInputElement)) return;
  const form = target.closest("form[data-contact-inquiry]");
  if (!(form instanceof HTMLFormElement)) return;
  const assetError = form.querySelector("[data-preview-asset-error]");
  if (target.matches("[data-preview-upload], [data-preview-asset-consent]")) {
    if (assetError) assetError.textContent = "";
    form.querySelector("[data-preview-asset-consent]")?.removeAttribute("aria-invalid");
  }
  if (target.name !== "inquiry") return;

  const previewRequested = !!form.querySelector('input[name="inquiry"][value="free-preview"]:checked');
  const details = form.querySelector("[data-preview-details]");
  if (details instanceof HTMLFieldSetElement) {
    details.hidden = !previewRequested;
    if (!previewRequested) {
      details.querySelectorAll('input[type="file"][data-preview-upload]').forEach((input) => {
        if (input instanceof HTMLInputElement) input.value = "";
      });
      const assetConsent = details.querySelector("[data-preview-asset-consent]");
      if (assetConsent instanceof HTMLInputElement) {
        assetConsent.checked = false;
        assetConsent.removeAttribute("aria-invalid");
      }
      if (assetError) assetError.textContent = "";
    }
    details.querySelectorAll("[data-preview-required]").forEach((field) => {
      if (!(field instanceof HTMLInputElement) && !(field instanceof HTMLTextAreaElement)) return;
      field.required = previewRequested;
      if (!previewRequested) {
        field.classList.remove("invalid");
        field.removeAttribute("aria-invalid");
      }
    });
  }
  const button = form.querySelector('button[type="submit"]');
  if (button instanceof HTMLButtonElement) {
    button.textContent = previewRequested
      ? button.getAttribute("data-preview-button") || button.textContent
      : button.getAttribute("data-default-button") || button.textContent;
  }
  const error = form.querySelector("[data-inquiry-error]");
  if (error) error.textContent = "";
});

function ensureTurnstileWidget(form) {
  const siteKey = cfg.turnstileSiteKey;
  if (!siteKey || typeof siteKey !== "string") return;
  if (form.querySelector(".cf-turnstile, input[name='cf-turnstile-response']")) return;
  if (!document.querySelector('script[src*="challenges.cloudflare.com/turnstile"]')) {
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    document.head.appendChild(script);
  }
  const mount = document.createElement("div");
  mount.className = "cf-turnstile";
  mount.dataset.sitekey = siteKey;
  mount.dataset.size = "compact";
  const submit = form.querySelector('button[type="submit"]');
  if (submit) submit.before(mount);
  else form.append(mount);
  const tryRender = () => {
    if (window.turnstile && typeof window.turnstile.render === "function") {
      try { window.turnstile.render(mount); } catch { /* ignore */ }
      return;
    }
    setTimeout(tryRender, 200);
  };
  tryRender();
}

document.addEventListener("submit", async (event) => {
  const form = event.target;
  if (!(form instanceof HTMLFormElement) || !form.hasAttribute("data-lead")) return;
  event.preventDefault();
  if (leadFormsInFlight.has(form)) return;
  const copy = formCopy();
  const isContactInquiry = form.hasAttribute("data-contact-inquiry");
  const inquiryChecks = isContactInquiry
    ? Array.from(form.querySelectorAll('input[name="inquiry"]'))
    : [];
  const previewRequested = isContactInquiry
    && !!form.querySelector('input[name="inquiry"][value="free-preview"]:checked');
  const inquiryError = form.querySelector("[data-inquiry-error]");
  if (isContactInquiry && !inquiryChecks.some((input) => input.checked)) {
    if (inquiryError) inquiryError.textContent = form.getAttribute("data-inquiry-error-copy") || "Choose an option.";
    inquiryChecks[0]?.focus();
    return;
  }
  if (inquiryError) inquiryError.textContent = "";
  const assetError = form.querySelector("[data-preview-asset-error]");
  if (assetError) assetError.textContent = "";
  let firstBad = null;
  let contactMsg = "";
  form.querySelectorAll("[required]").forEach((el) => {
    if (!(el instanceof HTMLInputElement) && !(el instanceof HTMLTextAreaElement)) return;
    const ok = !!el.value.trim() && el.checkValidity();
    el.classList.toggle("invalid", !ok);
    el.setAttribute("aria-invalid", String(!ok));
    if (!ok && !firstBad) firstBad = el;
  });
  if (form.hasAttribute("data-contact-or")) {
    const email = form.querySelector('input[name="email"]');
    const phone = form.querySelector('input[name="phone"]');
    if (email instanceof HTMLInputElement && phone instanceof HTMLInputElement) {
      const emailVal = email.value.trim();
      const phoneVal = phone.value.trim();
      const emailBad = emailVal ? !email.checkValidity() : !phoneVal;
      const phoneBad = phoneVal ? phoneVal.replace(/\D/g, "").length < 7 : !emailVal;
      email.classList.toggle("invalid", emailBad);
      phone.classList.toggle("invalid", phoneBad);
      email.setAttribute("aria-invalid", String(emailBad));
      phone.setAttribute("aria-invalid", String(phoneBad));
      if ((emailBad || phoneBad) && !firstBad) firstBad = emailBad ? email : phone;
      if (!emailVal && !phoneVal) contactMsg = copy.contactOr;
    }
  }
  const msg = form.querySelector(".form__msg");
  if (firstBad) {
    if (msg) msg.textContent = contactMsg || copy.fill;
    firstBad.focus();
    return;
  }
  const maxFiles = Number(form.getAttribute("data-max-files") || 0);
  const maxFileMb = Number(form.getAttribute("data-max-file-mb") || 0);
  if (maxFiles > 0 || maxFileMb > 0) {
    const picked = [];
    form.querySelectorAll('input[type="file"]').forEach((input) => {
      if (!(input instanceof HTMLInputElement) || !input.files) return;
      for (const file of input.files) picked.push(file);
    });
    if (maxFiles > 0 && picked.length > maxFiles) {
      if (msg) msg.textContent = "Please attach " + maxFiles + " files or fewer.";
      return;
    }
    if (maxFileMb > 0) {
      const limit = maxFileMb * 1024 * 1024;
      const oversized = picked.find((file) => file.size > limit);
      if (oversized) {
        if (msg) msg.textContent = "Each file must be " + maxFileMb + " MB or smaller.";
        return;
      }
    }
  }
  if (previewRequested) {
    const logo = form.querySelector('input[name="logo"]');
    const photos = form.querySelector('input[name="photos"]');
    const assetConsent = form.querySelector("[data-preview-asset-consent]");
    const hasLogo = logo instanceof HTMLInputElement && !!logo.files?.length;
    const hasPhotos = photos instanceof HTMLInputElement && !!photos.files?.length;
    const canUseFallback = assetConsent instanceof HTMLInputElement && assetConsent.checked;
    if ((!hasLogo || !hasPhotos) && !canUseFallback) {
      if (assetError) assetError.textContent = form.getAttribute("data-preview-asset-error-copy") || "Upload a logo and job photos, or allow replacement assets for anything missing.";
      if (assetConsent instanceof HTMLInputElement) {
        assetConsent.setAttribute("aria-invalid", "true");
        assetConsent.focus();
      }
      return;
    }
  }
  const data = new FormData(form);
  if (data.get("_gotcha")) return;
  let conversion = form.getAttribute("data-conversion");
  if (isContactInquiry) conversion = previewRequested ? "preview" : null;
  const metaForm = form.getAttribute("data-meta-form") || "";
  const metaContentName = Object.prototype.hasOwnProperty.call(cfg.metaContentNameByForm || {}, metaForm)
    ? cfg.metaContentNameByForm[metaForm]
    : "";
  data.set("kx_form_path", location.pathname);
  data.set("kx_landing_page", (() => {
    try {
      const touch = readFirstTouch() || currentFirstTouch();
      return String(touch.landing_page || location.pathname).slice(0, 200);
    } catch {
      return location.pathname;
    }
  })());
  // First focus/interaction time — not submit time — so too-fast spam checks work.
  if (!leadFormStartedAt.has(form)) leadFormStartedAt.set(form, Date.now());
  data.set("kx_form_started_at", String(leadFormStartedAt.get(form)));
  if (conversion === "preview" || conversion === "audit") {
    data.set("kx_conversion", conversion);
  }
  // Attribution on all counted marketing forms (first-touch UTMs — no PII).
  const isCountedLead = Boolean(metaContentName) && !String(data.get("request") || "").trim();
  if (isCountedLead) appendAttribution(data);
  let metaEventId = "";
  let transactionId = "";
  if (isCountedLead) {
    try { metaEventId = crypto.randomUUID(); } catch { /* unavailable */ }
    try { transactionId = crypto.randomUUID(); } catch { /* unavailable */ }
    if (metaEventId) {
      data.set("kx_meta_form", metaForm);
      data.set("kx_event_id", metaEventId);
      data.set("kx_form_path", location.pathname);
    }
    if (transactionId) data.set("kx_transaction_id", transactionId);
  }
  const button = form.querySelector("button[type=submit]");
  button?.classList.add("is-loading");
  if (button) button.disabled = true;
  leadFormsInFlight.add(form);
  try {
    const res = await fetch("/api/contact", { method: "POST", headers: { Accept: "application/json" }, body: data });
    const body = await res.json().catch(() => ({}));
    if (res.ok) {
      form.reset();
      form.classList.add("is-done");
      if (msg) {
        msg.replaceChildren();
        const check = document.createElement("span");
        check.className = "check";
        check.setAttribute("aria-hidden", "true");
        check.textContent = "✓";
        const strong = document.createElement("b");
        strong.textContent = (previewRequested && form.getAttribute("data-preview-thanks"))
          || form.getAttribute("data-thanks")
          || copy.thanks;
        msg.append(check, strong);
        if (previewRequested) {
          const href = form.getAttribute("data-preview-href");
          if (href) {
            const followup = document.createElement("a");
            followup.className = "btn btn--primary";
            followup.href = href;
            followup.textContent = form.getAttribute("data-followup-label") || "Add details and photos";
            msg.append(followup);
          }
        }
      }
      const accepted = body && body.accepted === true;
      const tradeRaw = String(data.get("trade") || "").trim();
      const TRADE_ENUM = new Set(["Plumbing", "Landscaping", "Roofing", "Tree service", "Other trade"]);
      const inquiryType = conversion === "preview" || conversion === "audit"
        ? conversion
        : (metaForm || "contact");
      // Unified generate_lead (Prompt 4): all mapped marketing forms after accepted delivery.
      // Params are enums/paths only — never name/email/phone/business/city free text.
      const leadPayload = {
        form_id: form.getAttribute("name") || form.id || metaForm || "lead",
        page_path: location.pathname,
        source: String(data.get("kx_attr_utm_source") || data.get("source") || "").slice(0, 100),
        landing_page: String(data.get("kx_landing_page") || location.pathname).slice(0, 200),
        method: "form",
        inquiry_type: String(inquiryType).slice(0, 40),
        transaction_id: transactionId || metaEventId || "",
      };
      if (TRADE_ENUM.has(tradeRaw)) leadPayload.trade = tradeRaw;
      const formVariant = form.classList.contains("form--slim") ? "slim" : "full";
      if (accepted && isCountedLead) {
        track("generate_lead", leadPayload);
      }
      if (accepted && conversion === "preview") {
        track("preview_form_submit", {
          form_variant: formVariant,
          page_path: location.pathname,
          event_role: "diagnostic",
        });
      } else if (accepted && conversion === "audit") {
        track("audit_request", {
          form_id: form.getAttribute("name") || form.id || "audit",
          page_path: location.pathname,
          event_role: "diagnostic",
        });
      }
      if (accepted && metaEventId) {
        const pendingMetaLead = { form: metaForm, path: location.pathname, eventId: metaEventId };
        if (window.__KINEXIS_TRACK_META_LEAD__) {
          window.__KINEXIS_TRACK_META_LEAD__(pendingMetaLead.form, pendingMetaLead.path, pendingMetaLead.eventId);
        } else {
          (window.__KINEXIS_PENDING_META_LEADS__ ||= []).push(pendingMetaLead);
        }
      }
      return;
    }
    if (res.status === 503) {
      const lines = [...data.entries()].filter((entry) => entry[0] !== "_gotcha" && typeof entry[1] === "string" && entry[1].trim() !== "").map(([key, value]) => key + ": " + value).join("\n");
      location.href = "mailto:" + cfg.email + "?subject=" + encodeURIComponent(copy.mailSubject) + "&body=" + encodeURIComponent(lines);
      if (msg) {
        msg.replaceChildren();
        msg.append(copy.mailOpen);
        const link = document.createElement("a");
        link.href = "mailto:" + cfg.email;
        link.textContent = cfg.email;
        msg.append(link, ".");
      }
      return;
    }
    if (msg) msg.textContent = typeof body.error === "string" && body.error ? body.error : copy.error;
  } catch {
    if (msg) msg.textContent = copy.network;
  } finally {
    leadFormsInFlight.delete(form);
    button?.classList.remove("is-loading");
    if (button) button.disabled = false;
  }
});
document.addEventListener("input", (event) => {
  const target = event.target;
  if (target instanceof HTMLElement && target.closest("form[data-lead]")) target.classList.remove("invalid");
});
document.querySelectorAll("dialog.dlg").forEach((dlg) => {
  dlg.addEventListener("close", () => {
    dlg.querySelector("iframe")?.remove();
    if (!document.querySelector("dialog.dlg[open]")) unlockScroll();
  });
});

/** Cookie: kinexis_consent=v1|a=0|d=0 — a=analytics, d=ads. Undecided/reject → no trackers.
 *  Dock/FAB UI is wired by the inline script in CookieConsent (before boot). */
function readConsent() {
  const m = document.cookie.match(/(?:^|; )kinexis_consent=([^;]*)/);
  if (!m) return { decided: false, analytics: false, ads: false };
  try {
    const v = decodeURIComponent(m[1]);
    if (!v.startsWith("v1|")) return { decided: false, analytics: false, ads: false };
    const analytics = /(?:^|\|)a=1(?:\||$)/.test(v);
    const ads = /(?:^|\|)d=1(?:\||$)/.test(v);
    return { decided: true, analytics, ads };
  } catch {
    return { decided: false, analytics: false, ads: false };
  }
}
function syncLangSwitch() {
  const mirrors = window.__KINEXIS_MIRRORS__;
  if (!Array.isArray(mirrors)) return;
  const englishFallbacks = window.__KINEXIS_ENGLISH_FALLBACKS__ || {};
  const spanishUtilityPaths = window.__KINEXIS_SPANISH_UTILITY_PATHS__ || [];
  const path = location.pathname;
  document.querySelectorAll("[data-lang-switch] a[data-lang-locale]").forEach((a) => {
    const loc = a.getAttribute("data-lang-locale");
    if (!loc) return;
    const en = englishPath(path);
    const target =
      loc === "en" && englishFallbacks[en]
        ? englishFallbacks[en]
        : spanishUtilityPaths.includes(en)
          ? en
        : mirrors.includes(en)
          ? en
          : "/";
    const href =
      loc === "en" ? target : target === "/" ? "/es" : `/es${target}`;
    a.setAttribute("href", href);
  });
}
/** Production GA4 only — never load production measurement on localhost/preview/workers.dev. */
function isProductionAnalyticsHost() {
  // E2E / Playwright may set this after granting mock consent; never set in production HTML.
  if (window.__KINEXIS_ALLOW_ANALYTICS_HOST__ === true) return true;
  const host = (location.hostname || "").toLowerCase();
  return host === "kinexisdigital.com" || host === "www.kinexisdigital.com";
}
function consentAllowsAnalytics() {
  const c = readConsent();
  return c.decided && c.analytics;
}
function consentAllowsAds() {
  const c = readConsent();
  return c.decided && c.ads;
}

const ATTRIBUTION_KEY = "kinexis_first_touch_v1";
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
function attributionValue(value, max, pattern) {
  const text = String(value || "").trim();
  return text.length > 0 && text.length <= max && pattern.test(text) ? text : "";
}
function currentFirstTouch() {
  const values = { landing_page: location.pathname };
  const params = new URLSearchParams(location.search);
  for (const key of UTM_KEYS) {
    const all = params.getAll(key);
    if (all.length === 1) values[key] = attributionValue(all[0], 100, /^[\p{L}\p{N} ._~:+-]+$/u);
  }
  for (const key of ["fbclid", "gclid"]) {
    const all = params.getAll(key);
    if (all.length === 1) values[key] = attributionValue(all[0], 256, /^[A-Za-z0-9._~-]+$/);
  }
  try {
    const ref = document.referrer ? new URL(document.referrer) : null;
    if (ref && /^https?:$/.test(ref.protocol) && ref.origin !== location.origin) {
      values.referrer = (ref.origin + ref.pathname).slice(0, 300);
    }
  } catch {
    /* Malformed referrers are omitted. */
  }
  return values;
}
function readFirstTouch() {
  try {
    const raw = sessionStorage.getItem(ATTRIBUTION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
function captureFirstTouch() {
  if (!consentAllowsAnalytics()) {
    try { sessionStorage.removeItem(ATTRIBUTION_KEY); } catch { /* storage may be disabled */ }
    return;
  }
  try {
    const existing = readFirstTouch() || {};
    const current = currentFirstTouch();
    const keys = consentAllowsAds()
      ? UTM_KEYS.concat(["fbclid", "gclid", "referrer"])
      : UTM_KEYS.concat(["referrer"]);
    let changed = false;
    for (const key of keys) {
      if (!existing[key] && current[key]) {
        existing[key] = current[key];
        changed = true;
      }
    }
    if (changed || sessionStorage.getItem(ATTRIBUTION_KEY) === null) {
      sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(existing));
    }
  } catch {
    /* Storage may be disabled; current-page attribution is still attached below. */
  }
}
function appendAttribution(data) {
  if (!consentAllowsAnalytics()) return;
  captureFirstTouch();
  const values = readFirstTouch() || currentFirstTouch();
  for (const key of UTM_KEYS) {
    const clean = attributionValue(values[key], 100, /^[\p{L}\p{N} ._~:+-]+$/u);
    if (clean) data.set("kx_attr_" + key, clean);
  }
  if (consentAllowsAds()) {
    for (const key of ["fbclid", "gclid"]) {
      const clean = attributionValue(values[key], 256, /^[A-Za-z0-9._~-]+$/);
      if (clean) data.set("kx_attr_" + key, clean);
    }
  }
  if (typeof values.referrer === "string" && values.referrer.length <= 300) {
    try {
      const ref = new URL(values.referrer);
      if (/^https?:$/.test(ref.protocol) && ref.origin !== location.origin) {
        data.set("kx_attr_referrer", ref.origin + ref.pathname);
      }
    } catch {
      /* Invalid referrer omitted. */
    }
  }
}

const PENDING_TRACK_KEY = "kinexis_pending_track_v1";
const QUEUEABLE_GA = new Set(["generate_lead", "purchase", "subscription_created"]);
const QUEUEABLE_META = new Set(["Lead", "Purchase"]);
let lastGaPageViewPath = "";
let lastMetaPageViewPath = "";

function readPendingTrack() {
  try {
    const raw = sessionStorage.getItem(PENDING_TRACK_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
function writePendingTrack(items) {
  try {
    if (!items.length) sessionStorage.removeItem(PENDING_TRACK_KEY);
    else sessionStorage.setItem(PENDING_TRACK_KEY, JSON.stringify(items.slice(-20)));
  } catch {
    /* Storage may be disabled. */
  }
}
function queuePendingTrack(channel, name, params, options) {
  const items = readPendingTrack();
  items.push({
    channel,
    name,
    params: params || {},
    options: options || null,
    at: Date.now(),
  });
  writePendingTrack(items);
}
function flushPendingTrack(channel) {
  const items = readPendingTrack();
  if (!items.length) return;
  const kept = [];
  for (const item of items) {
    if (!item || typeof item.name !== "string") continue;
    if (channel && item.channel !== channel) {
      kept.push(item);
      continue;
    }
    if (item.channel === "ga") {
      if (!consentAllowsAnalytics() || !gaLoaded) {
        kept.push(item);
        continue;
      }
      try {
        if (typeof window.gtag === "function") window.gtag("event", item.name, item.params || {});
      } catch { /* ignore */ }
      continue;
    }
    if (item.channel === "meta") {
      if (!consentAllowsAds() || !metaBooted) {
        kept.push(item);
        continue;
      }
      try {
        if (typeof window.fbq !== "function") continue;
        if (item.options) window.fbq("track", item.name, item.params || {}, item.options);
        else window.fbq("track", item.name, item.params || {});
      } catch { /* ignore */ }
    }
  }
  writePendingTrack(kept);
}

function track(name, params, options) {
  if (!isProductionAnalyticsHost()) return;
  if (!consentAllowsAnalytics()) {
    if (!options?.skipQueue && QUEUEABLE_GA.has(name)) queuePendingTrack("ga", name, params);
    return;
  }
  if (!cfg.ga || !/^G-[A-Z0-9]+$/.test(cfg.ga)) return;
  // Keep gtag.js off the critical path for page/funnel diagnostics. Lead and
  // purchase events force-load so conversions are not waiting on a later click.
  if (!gaLoaded) {
    if (QUEUEABLE_GA.has(name)) {
      loadGa();
    } else {
      if (!options?.skipQueue) queuePendingTrack("ga", name, params);
      armGa();
      return;
    }
  }
  try {
    if (typeof window.gtag === "function") {
      window.gtag("event", name, params || {});
      return;
    }
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(["event", name, params || {}]);
  } catch {
    /* Analytics failure must never interrupt lead delivery/UI. */
  }
}

function trackPageView() {
  const pagePath = location.pathname;
  if (consentAllowsAnalytics() && lastGaPageViewPath !== pagePath) {
    lastGaPageViewPath = pagePath;
    track("page_view", { page_path: pagePath });
  }
  if (consentAllowsAds() && lastMetaPageViewPath !== pagePath) {
    lastMetaPageViewPath = pagePath;
    trackMeta("PageView");
  }
}

let metaBooted = false;
let metaTimer = 0;
let metaArmed = false;
function clearMetaArm() {
  removeEventListener("pointerdown", ensureMeta);
  removeEventListener("keydown", ensureMeta);
  removeEventListener("touchstart", ensureMeta);
  clearTimeout(metaTimer);
  metaArmed = false;
}
function ensureMeta() {
  if (!consentAllowsAds()) return false;
  if (!cfg.metaPixel || !/^\d{5,20}$/.test(cfg.metaPixel)) return false;
  if (metaBooted) {
    try { window.fbq("consent", "grant"); } catch { /* unavailable */ }
    return false;
  }
  metaBooted = true;
  clearMetaArm();
  if (!window.fbq) {
    const fbq = function (...args) {
      if (fbq.callMethod) fbq.callMethod(...args);
      else fbq.queue.push(args);
    };
    window.fbq = fbq;
    if (!window._fbq) window._fbq = fbq;
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = "2.0";
    fbq.queue = [];
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    const first = document.getElementsByTagName("script")[0];
    first?.parentNode?.insertBefore(script, first);
  }
  try {
    window.fbq("init", cfg.metaPixel);
    window.fbq("consent", "grant");
    lastMetaPageViewPath = location.pathname;
    window.fbq("track", "PageView");
  } catch {
    /* Pixel blocked or unavailable — ignore. */
  }
  flushPendingTrack("meta");
  return true;
}
function armMeta() {
  if (!consentAllowsAds() || !cfg.metaPixel || !/^\d{5,20}$/.test(cfg.metaPixel)) {
    clearMetaArm();
    return;
  }
  if (metaBooted || metaArmed) return;
  metaArmed = true;
  // No scroll arm — Lighthouse scrolls during lab and would pull Meta into TBT.
  addEventListener("pointerdown", ensureMeta, { once: true, passive: true });
  addEventListener("keydown", ensureMeta, { once: true });
  addEventListener("touchstart", ensureMeta, { once: true, passive: true });
  metaTimer = setTimeout(ensureMeta, 45000);
}

function trackMeta(name, params, options, trackOptions) {
  if (!consentAllowsAds()) {
    if (!trackOptions?.skipQueue && QUEUEABLE_META.has(name)) {
      queuePendingTrack("meta", name, params, options);
    }
    return;
  }
  if (!cfg.metaPixel || !/^\d{5,20}$/.test(cfg.metaPixel)) return;
  if (!metaBooted) {
    if (QUEUEABLE_META.has(name)) {
      ensureMeta();
    } else {
      if (!trackOptions?.skipQueue) queuePendingTrack("meta", name, params, options);
      armMeta();
      return;
    }
  }
  if (typeof window.fbq !== "function") return;
  try {
    if (options) window.fbq("track", name, params || {}, options);
    else window.fbq("track", name, params || {});
  } catch {
    /* Pixel blocked or unavailable — ignore. */
  }
}
window.__KINEXIS_TRACK_META_LEAD__ = (form, formPath, eventId) => {
  if (!Object.prototype.hasOwnProperty.call(cfg.metaContentNameByForm || {}, form)) return;
  trackMeta("Lead", {
    content_name: cfg.metaContentNameByForm[form],
    form_path: formPath,
    lang: document.documentElement.lang.toLowerCase().startsWith("es") ? "es" : "en",
  }, eventId ? { eventID: eventId } : undefined);
};
for (const pending of window.__KINEXIS_PENDING_META_LEADS__ || []) {
  window.__KINEXIS_TRACK_META_LEAD__(pending.form, pending.path, pending.eventId);
}
delete window.__KINEXIS_PENDING_META_LEADS__;

function englishPath(pathname) {
  if (pathname === "/es" || pathname === "/es-es") return "/";
  if (pathname.startsWith("/es-es/")) return pathname.slice(6) || "/";
  if (pathname.startsWith("/es/")) return pathname.slice(3) || "/";
  return pathname;
}

let gaLoaded = false;
let gaTimer = 0;
let gaArmed = false;
function clearGaArm() {
  removeEventListener("pointerdown", loadGa);
  removeEventListener("keydown", loadGa);
  removeEventListener("touchstart", loadGa);
  clearTimeout(gaTimer);
  gaArmed = false;
}
function loadGa() {
  if (!isProductionAnalyticsHost()) return;
  if (!consentAllowsAnalytics()) return;
  if (!cfg.ga || !/^G-[A-Z0-9]+$/.test(cfg.ga)) return;
  if (gaLoaded) return;
  gaLoaded = true;
  clearGaArm();
  window.dataLayer = window.dataLayer || [];
  function gtag(){ window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag("js", new Date());
  // GA4 only — never grant Google ad_storage. Meta Pixel uses fbq consent separately.
  // Granting Google ads signals pulls linked AW-/DoubleClick tags we do not run.
  gtag("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  gtag("consent", "update", {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  gtag("config", cfg.ga, {
    send_page_view: false,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });
  const script = document.createElement("script");
  script.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(cfg.ga);
  script.async = true;
  document.head.appendChild(script);
  if (lastGaPageViewPath !== location.pathname) {
    lastGaPageViewPath = location.pathname;
    try { window.gtag("event", "page_view", { page_path: location.pathname }); } catch { /* ignore */ }
  }
  flushPendingTrack("ga");
}
function armGa() {
  if (!consentAllowsAnalytics() || !cfg.ga || !/^G-[A-Z0-9]+$/.test(cfg.ga)) {
    clearGaArm();
    return;
  }
  if (gaLoaded || gaArmed) return;
  gaArmed = true;
  // No scroll arm — Lighthouse scrolls during lab and would pull GA into TBT.
  addEventListener("pointerdown", loadGa, { once: true, passive: true });
  addEventListener("keydown", loadGa, { once: true });
  addEventListener("touchstart", loadGa, { once: true, passive: true });
  gaTimer = setTimeout(loadGa, 45000);
}

function armTrackersFromConsent() {
  const analyticsAllowed = consentAllowsAnalytics();
  const adsAllowed = consentAllowsAds();
  if (gaLoaded && typeof window.gtag === "function") {
    window.gtag("consent", "update", {
      analytics_storage: analyticsAllowed ? "granted" : "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
  }
  if (metaBooted && typeof window.fbq === "function") {
    try {
      window.fbq("consent", adsAllowed ? "grant" : "revoke");
    } catch { /* unavailable */ }
  }
  captureFirstTouch();
  armGa();
  armMeta();
  if (analyticsAllowed && gaLoaded) flushPendingTrack("ga");
  if (adsAllowed && metaBooted) flushPendingTrack("meta");
}
armTrackersFromConsent();
addEventListener("kinexis:consent", armTrackersFromConsent);
addEventListener("kinexis:track", (event) => {
  const detail = event instanceof CustomEvent ? event.detail : null;
  if (!detail || typeof detail.name !== "string") return;
  track(detail.name, detail.params || {});
});
addEventListener("kinexis:track-meta", (event) => {
  const detail = event instanceof CustomEvent ? event.detail : null;
  if (!detail || typeof detail.name !== "string") return;
  trackMeta(detail.name, detail.params || {}, detail.options);
});

/* Preview funnel (PII-free). Fires only when analytics consent allows tracking. */
(function previewFunnel() {
  const seen = new WeakSet();
  const started = new WeakSet();
  function variant(form) {
    return form.classList.contains("form--slim") ? "slim" : "full";
  }
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const form = entry.target;
        if (!(form instanceof HTMLFormElement) || seen.has(form)) continue;
        seen.add(form);
        track("preview_form_view", { form_variant: variant(form), page_path: location.pathname });
      }
    }, { threshold: 0.4 });
    document.querySelectorAll('form[data-conversion="preview"]').forEach((form) => io.observe(form));
  }
  document.addEventListener("focusin", (event) => {
    const form = event.target instanceof Element ? event.target.closest('form[data-conversion="preview"]') : null;
    if (!(form instanceof HTMLFormElement) || started.has(form)) return;
    started.add(form);
    track("preview_form_start", { form_variant: variant(form), page_path: location.pathname });
  });
})();

document.addEventListener("click", (event) => {
  const link = event.target instanceof Element ? event.target.closest("a[href]") : null;
  if (!(link instanceof HTMLAnchorElement)) return;
  const href = link.getAttribute("href") || "";
  if (href.startsWith("tel:")) {
    // Diagnostic only — phone taps are not GA4 generate_lead / CRM leads.
    track("phone_tap", { page_path: location.pathname, event_role: "diagnostic" });
    let phoneEventId = "";
    try { phoneEventId = crypto.randomUUID(); } catch { /* unavailable */ }
    trackMeta("Lead", {
      content_name: "phone_tap",
      form_path: location.pathname,
      content_category: location.pathname,
      lang: document.documentElement.lang.toLowerCase().startsWith("es") ? "es" : "en",
    }, phoneEventId ? { eventID: phoneEventId } : undefined);
    return;
  }
  if (!cfg.ga || !/^G-[A-Z0-9]+$/.test(cfg.ga)) return;
  let clickPath = "";
  try { clickPath = new URL(link.href, location.origin).pathname; } catch { return; }
  const en = englishPath(clickPath);
  if (en === "/strategy-call" || en.startsWith("/strategy-call/")) {
    track("strategy_call_click", { link_url: clickPath, page_path: location.pathname });
    return;
  }
  if (en === "/pricing" || en.startsWith("/pricing")) {
    track("pricing_click", { link_url: clickPath, page_path: location.pathname });
  }
});

syncChrome();
syncLangSwitch();
resetReveal();
schedulePaintNew();
new MutationObserver(() => {
  if (location.pathname !== path) {
    path = location.pathname;
    onNavigate();
    return;
  }
  schedulePaintNew();
}).observe(document.body, { childList: true, subtree: true });
const push = history.pushState;
history.pushState = function () {
  push.apply(this, arguments);
  if (location.pathname === path) return;
  path = location.pathname;
  onNavigate();
};
const replace = history.replaceState;
history.replaceState = function () {
  replace.apply(this, arguments);
  if (location.pathname === path) return;
  path = location.pathname;
  onNavigate();
};
addEventListener("popstate", () => {
  if (location.pathname === path) return;
  path = location.pathname;
  onNavigate();
});
new MutationObserver(syncChrome).observe(root, { attributes: true, attributeFilter: ["class"] });
requestAnimationFrame(() => requestAnimationFrame(syncChrome));
})();
