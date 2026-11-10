(()=>{const cfg=window.__KINEXIS_CFG__||{};
const root = document.documentElement;
const reduce = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const ua = navigator.userAgent || "";
/** Facebook / Instagram in-app browsers need extra bottom clearance for their chrome. */
const isMetaWebview = /FBAN|FBAV|FB_IAB|FB4A|FBIOS|Instagram|IGTV|Line\//i.test(ua);
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
function syncVisualViewport() {
  const vv = window.visualViewport;
  if (!vv) {
    root.style.setProperty("--vv-bottom", "0px");
    return;
  }
  const inset = Math.max(0, Math.round(window.innerHeight - vv.height - vv.offsetTop));
  root.style.setProperty("--vv-bottom", inset + "px");
}
syncVisualViewport();
if (window.visualViewport) {
  visualViewport.addEventListener("resize", syncVisualViewport, { passive: true });
  visualViewport.addEventListener("scroll", syncVisualViewport, { passive: true });
}
addEventListener("resize", syncVisualViewport, { passive: true });
addEventListener("orientationchange", () => setTimeout(syncVisualViewport, 120));

function syncChrome() {
  // Match DocumentShell route-chrome: strip locale, then toggle every chrome
  // class on each navigation so add-only first-paint classes cannot stick.
  const raw = location.pathname;
  const p = englishPath(raw);
  const noLead = p === "/contact" || p === "/audit" || p === "/strategy-call" || p.startsWith("/pay") || p.startsWith("/lp/");
  const noFloat = p === "/contact" || p === "/upgrades" || p.startsWith("/pay") || p === "/strategy-call" || p.startsWith("/lp/");
  const noAudit = p === "/contact" || p === "/audit" || p === "/privacy" || p === "/terms" || p === "/update" || p.startsWith("/pay");
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
  // Any open (non-closing) mega collapses bottom CTAs so the full dropdown can show.
  const anyOpen = !!document.querySelector("[data-mega].is-open:not(.is-closing)");
  nav.classList.toggle("mega-open", mobile && anyOpen);
}
function finishMegaClose(mega) {
  mega.classList.remove("is-open", "is-closing");
  mega.querySelector(".mega__btn")?.setAttribute("aria-expanded", "false");
}
/** Fade out, then snap shut — avoids the choppy height-squash close. */
function closeMega(mega, onDone) {
  if (!mega.classList.contains("is-open")) {
    if (typeof onDone === "function") onDone();
    return;
  }
  const soft = matchMedia("(max-width: 1320px)").matches && !reduce() && !desktopMega();
  if (!soft) {
    finishMegaClose(mega);
    if (typeof onDone === "function") onDone();
    return;
  }
  if (mega.classList.contains("is-closing")) return;
  mega.classList.add("is-closing");
  const panel = mega.querySelector(".mega__panel");
  let done = false;
  const finish = () => {
    if (done) return;
    done = true;
    finishMegaClose(mega);
    if (typeof onDone === "function") onDone();
  };
  const fallback = setTimeout(finish, 180);
  if (panel instanceof HTMLElement) {
    panel.addEventListener("transitionend", (event) => {
      if (event.target !== panel || event.propertyName !== "opacity") return;
      clearTimeout(fallback);
      finish();
    }, { once: true });
  }
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
      mega.classList.remove("is-closing");
      mega.classList.add("is-open");
      mega.querySelector(".mega__btn")?.setAttribute("aria-expanded", "true");
    } else if (mega.classList.contains("is-open")) {
      closeMega(mega);
    } else {
      mega.querySelector(".mega__btn")?.setAttribute("aria-expanded", "false");
    }
  });
  syncMegaNav();
  if (matchMedia("(max-width: 1320px)").matches && !reduce()) {
    setTimeout(() => {
      active.querySelector(".mega__btn")?.scrollIntoView({ block: "nearest", behavior: "auto" });
    }, 320);
  }
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
  window.scrollTo(0, scrollY);
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
  const nodes = [...document.querySelectorAll("main .hl")].filter((el) => !el.closest(".hero, .page-hero, [data-island]"));
  if (reduce() || !("IntersectionObserver" in window)) {
    nodes.forEach((el) => el.classList.add("is-marked"));
    return;
  }
  if (!markIo) {
    const io = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      io.unobserve(entry.target);
      entry.target.classList.add("is-marked");
    }), { threshold: 0.7, rootMargin: "0px 0px -6% 0px" });
    markIo = io;
  }
  nodes.forEach((el) => {
    if (marked.has(el)) return;
    marked.add(el);
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
  // The loop is decorative. Mobile devices keep the lightweight poster;
  // visitors can still open the full video explicitly with the play button.
  if (!matchMedia("(min-width: 861px) and (hover: hover) and (pointer: fine)").matches) return;
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
    // A video frame can replace the poster as LCP. Let visitors see the poster
    // first, then begin the same loop once the page is settled (or immediately
    // on their first interaction).
    timer = setTimeout(go, 5000);
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
}
let measureFloat = () => {};
function resetFloat() {
  const bar = document.querySelector(".float-cta");
  bar?.classList.remove("is-in");
  bar?.setAttribute("inert", "");
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
  paintNew();
  requestAnimationFrame(measureFloat);
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
      return;
    }
    const sentinel = document.querySelector(".hero__btns, .page-hero");
    const footer = document.querySelector("footer");
    const vh = innerHeight;
    const sentinelBottom = sentinel ? sentinel.getBoundingClientRect().bottom : 0;
    const footerTop = (footer ? footer.getBoundingClientRect().top : document.documentElement.scrollHeight) + scrollY;
    const heroBottom = sentinelBottom + scrollY;
    const past = sentinel ? sentinelBottom <= 1 : scrollY > 320;
    const covered = !!footer && footer.getBoundingClientRect().top < vh - 80;
    // Scroll distance available while the bar is on screen, before the footer
    // takes over the bottom of the viewport.
    const room = footerTop - heroBottom - vh + 80;
    const roomy = room >= vh * MIN_ROOM_SCREENS;
    const shown = past && roomy && !covered;
    bar.classList.toggle("is-in", shown);
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

addEventListener("scroll", stuck, { passive: true });
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
    chip.parentElement?.parentElement?.querySelectorAll("[data-cat]").forEach((el) => {
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

document.addEventListener("submit", async (event) => {
  const form = event.target;
  if (!(form instanceof HTMLFormElement) || !form.hasAttribute("data-lead")) return;
  event.preventDefault();
  const copy = formCopy();
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
  const data = new FormData(form);
  if (data.get("_gotcha")) return;
  const button = form.querySelector("button[type=submit]");
  button?.classList.add("is-loading");
  if (button) button.disabled = true;
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
        strong.textContent = copy.thanks;
        msg.append(check, strong);
      }
      track("generate_lead", {
        form_id: form.getAttribute("name") || form.id || "lead",
        page_path: location.pathname,
        source: String(data.get("source") || ""),
        landing_page: String(data.get("landing_page") || location.pathname),
      });
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

function track(name, params) {
  if (!cfg.ga || !/^G-[A-Z0-9]+$/.test(cfg.ga)) return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(["event", name, params || {}]);
}

function englishPath(pathname) {
  if (pathname === "/es" || pathname === "/es-es") return "/";
  if (pathname.startsWith("/es-es/")) return pathname.slice(6) || "/";
  if (pathname.startsWith("/es/")) return pathname.slice(3) || "/";
  return pathname;
}

if (cfg.ga && /^G-[A-Z0-9]+$/.test(cfg.ga)) {
  let loaded = false;
  const loadGa = () => {
    if (loaded) return;
    loaded = true;
    removeEventListener("pointerdown", loadGa);
    removeEventListener("keydown", loadGa);
    removeEventListener("touchstart", loadGa);
    removeEventListener("scroll", onGaScroll);
    clearTimeout(gaTimer);
    window.dataLayer = window.dataLayer || [];
    function gtag(){ window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag("js", new Date());
    gtag("config", cfg.ga);
    const script = document.createElement("script");
    script.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(cfg.ga);
    script.async = true;
    document.head.appendChild(script);
  };
  const started = performance.now();
  const onGaScroll = () => { if (performance.now() - started >= 2500) loadGa(); };
  addEventListener("pointerdown", loadGa, { once: true, passive: true });
  addEventListener("keydown", loadGa, { once: true });
  addEventListener("touchstart", loadGa, { once: true, passive: true });
  addEventListener("scroll", onGaScroll, { passive: true });
  const gaTimer = setTimeout(loadGa, 45000);

  document.addEventListener("click", (event) => {
    const link = event.target instanceof Element ? event.target.closest("a[href]") : null;
    if (!(link instanceof HTMLAnchorElement)) return;
    const href = link.getAttribute("href") || "";
    if (href.startsWith("tel:")) {
      loadGa();
      track("phone_tap", { link_url: href, page_path: location.pathname });
      return;
    }
    let path = "";
    try { path = new URL(link.href, location.origin).pathname; } catch { return; }
    const en = englishPath(path);
    if (en === "/strategy-call" || en.startsWith("/strategy-call/")) {
      loadGa();
      track("strategy_call_click", { link_url: path, page_path: location.pathname });
      return;
    }
    if (en === "/pricing" || en.startsWith("/pricing")) {
      loadGa();
      track("pricing_click", { link_url: path, page_path: location.pathname });
    }
  });
}

syncChrome();
resetReveal();
paintNew();
new MutationObserver(() => {
  if (location.pathname !== path) {
    path = location.pathname;
    onNavigate();
    return;
  }
  paintNew();
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



