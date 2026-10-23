(()=>{const cfg=window.__KINEXIS_CFG__||{};
const root = document.documentElement;
const reduce = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
let path = location.pathname;
let menuOpen = false;
let megaTimer = 0;
let megaShutUntil = 0;
let unlock = () => {};
let heroStop = () => {};
let markIo = null;
const marked = new WeakSet();
let revealStop = () => {};
let revealOn = false;
const revealEvents = ["pointerdown", "keydown", "touchstart", "scroll"];
const REVEAL = "main h2, main .card, main .tier, main .faq, main .work, main a.shot, main .compare, main .panel, main .logo-ph, main .video-thumb, main .lead__copy, main .lead__card, main .two-col > *";
const fbTimers = new WeakMap();

function syncChrome() {
  const p = location.pathname;
  const noLead = p === "/contact" || p === "/audit" || p === "/strategy-call" || p.startsWith("/pay");
  const noFloat = p.startsWith("/pay") || p === "/strategy-call";
  root.classList.toggle("no-lead", noLead);
  root.classList.toggle("no-float", noFloat);
  document.querySelectorAll("[data-nav],[data-nav-match]").forEach((el) => {
    const href = el.getAttribute("href") || el.getAttribute("data-nav-match") || "";
    const prefix = el.hasAttribute("data-nav-prefix");
    const on = !!href && (prefix ? p === href || p.startsWith(href + "/") : href === p);
    el.classList.toggle("is-current", on);
    if (on) el.setAttribute("aria-current", el.tagName === "A" ? "page" : "true");
    else el.removeAttribute("aria-current");
  });
}

function desktopMega() {
  return matchMedia("(hover: hover) and (pointer: fine)").matches && matchMedia("(min-width: 1025px)").matches;
}
function setMega(open) {
  if (open && performance.now() < megaShutUntil) return;
  if (open) clearTimeout(megaTimer);
  const mega = document.querySelector("[data-mega]");
  if (!mega) return;
  const mobile = matchMedia("(max-width: 1024px)").matches;
  if (mega.classList.contains("is-open") !== open) {
    mega.classList.toggle("is-open", open);
    const btn = mega.querySelector(".mega__btn");
    if (btn) btn.setAttribute("aria-expanded", String(open));
  }
  const nav = document.getElementById("nav");
  if (nav) nav.classList.toggle("mega-open", open && mobile);
  if (!open) clearTimeout(megaTimer);
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
  if (!open) { setMega(false); return; }
  const y = window.scrollY;
  root.style.setProperty("--header-bottom", Math.round(header.getBoundingClientRect().bottom) + "px");
  const hold = () => { if (window.scrollY !== y) window.scrollTo(0, y); };
  const block = (event) => {
    const sheet = document.getElementById("nav");
    if (sheet && sheet.scrollHeight > sheet.clientHeight && event.target instanceof Node && sheet.contains(event.target)) return;
    event.preventDefault();
  };
  const onMq = () => { if (!mq.matches) setOpen(false); };
  const mq = matchMedia("(max-width: 1024px)");
  addEventListener("scroll", hold, { passive: true });
  document.addEventListener("touchmove", block, { passive: false });
  document.addEventListener("wheel", block, { passive: false });
  mq.addEventListener("change", onMq);
  unlock = () => {
    root.classList.remove("nav-open");
    removeEventListener("scroll", hold);
    document.removeEventListener("touchmove", block);
    document.removeEventListener("wheel", block);
    mq.removeEventListener("change", onMq);
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

function openDialog(id, src) {
  const dlg = document.getElementById(id === "video" ? "dlg-video" : "dlg-guarantee");
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
          });
        }
        video.muted = false;
        video.volume = 1;
        try { video.currentTime = 0; } catch {}
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
  if (!dlg.open) dlg.showModal();
}
function closeDialogs() {
  document.querySelectorAll("dialog.dlg[open]").forEach((dlg) => dlg.close());
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

function armReveal() {
  if (reduce() || !("IntersectionObserver" in window)) return () => {};
  const timers = [];
  const io = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    io.unobserve(el);
    el.classList.add("in");
    timers.push(setTimeout(() => {
      el.classList.remove("reveal", "in", "from-left", "from-right");
      el.style.transitionDelay = "";
    }, 1100));
  }), { threshold: 0.12 });
  document.querySelectorAll(REVEAL).forEach((el) => {
    if (el.querySelector(".hl") || el.closest(".stepper") || el.closest("[data-island]")) return;
    el.classList.add("reveal");
    if (el.matches(".two-col > *, .lead__copy, .lead__card")) el.classList.add(el.matches(".two-col > :first-child, .lead__copy") ? "from-left" : "from-right");
    const idx = el.parentElement ? Array.from(el.parentElement.children).indexOf(el) : 0;
    el.style.transitionDelay = Math.min(idx, 5) * 70 + "ms";
    io.observe(el);
  });
  return () => {
    io.disconnect();
    timers.forEach(clearTimeout);
  };
}
function startReveal() {
  if (revealOn) return;
  revealOn = true;
  revealStop = armReveal();
}
function resetReveal() {
  revealStop();
  revealStop = () => {};
  revealOn = false;
  for (const name of revealEvents) removeEventListener(name, startReveal);
  for (const name of revealEvents) addEventListener(name, startReveal, { once: true, passive: true });
}

const heroArmed = new WeakSet();
function armHero() {
  const el = document.querySelector("video.hero__film");
  if (!el || heroArmed.has(el)) return;
  heroArmed.add(el);
  if (reduce()) return;
  const events = ["pointerdown", "keydown", "touchstart", "scroll"];
  const onPlaying = () => el.classList.add("is-playing");
  const play = () => { el.muted = true; el.play().catch(() => {}); };
  const start = () => {
    if (el.querySelector("source")) return;
    for (const [src, type] of [["/assets/video/hero-rLicrajNvqM.mp4", "video/mp4"]]) {
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
const live = new Set();
function motion(shot) {
  let state = shots.get(shot);
  if (!state) {
    state = { offset: 0, raf: 0 };
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
  return Math.max(0, box.track.offsetHeight - box.frame.clientHeight);
}
function place(shot, y) {
  const state = motion(shot);
  state.offset = y;
  const track = parts(shot).track;
  if (track) track.style.transform = "translate3d(0, " + (-y) + "px, 0)";
}
function startShot(shot) {
  if (reduce()) return;
  const state = motion(shot);
  cancelAnimationFrame(state.raf);
  const duration = Number(shot.getAttribute("data-duration")) || 5000;
  const step = () => {
    if (!shot.isConnected) return;
    const total = distance(shot);
    if (total <= 1) return;
    const px = Math.max(1.5, total / (duration / 16.67));
    place(shot, Math.min(total, state.offset + px));
    if (state.offset < total - 0.5) state.raf = requestAnimationFrame(step);
  };
  state.raf = requestAnimationFrame(step);
}
function stopShot(shot) {
  const state = motion(shot);
  cancelAnimationFrame(state.raf);
  if (!parts(shot).track) return;
  if (reduce()) { place(shot, 0); return; }
  const from = state.offset;
  const started = performance.now();
  const back = (now) => {
    const progress = Math.min(1, (now - started) / 320);
    place(shot, from * (1 - progress));
    if (progress < 1) state.raf = requestAnimationFrame(back);
  };
  state.raf = requestAnimationFrame(back);
}
function clickStart(shot) {
  if (distance(shot) - motion(shot).offset <= 2) place(shot, 0);
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
    }, { rootMargin: "0px 0px 800px 0px" });
    imageIo = io;
  }
  nodes.forEach((img) => {
    armedImgs.add(img);
    if (imageIo) imageIo.observe(img);
    else showImg(img);
  });
}
function whenPainted(done) {
  let fired = false;
  const go = () => {
    if (fired) return;
    fired = true;
    requestAnimationFrame(() => requestAnimationFrame(done));
  };
  let wait = 0;
  const settle = () => {
    clearTimeout(wait);
    wait = setTimeout(go, 200);
  };
  try {
    const po = new PerformanceObserver((list) => {
      if (list.getEntries().length) settle();
    });
    po.observe({ type: "largest-contentful-paint", buffered: true });
  } catch {
    go();
  }
  setTimeout(go, 1500);
}
function scheduleImages() {
  if (imagePending) return;
  imagePending = true;
  requestAnimationFrame(() => {
    imagePending = false;
    if ([...document.querySelectorAll("img[data-src]")].some((img) => !armedImgs.has(img))) whenPainted(watchImages);
  });
}

function paintNew() {
  armHero();
  armMarks();
  scheduleImages();
}
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
  resetFloat();
  resetReveal();
  resetMarks();
  syncChrome();
  paintNew();
}

const bar = document.querySelector(".float-cta");
if (bar) {
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
    const past = sentinel ? sentinel.getBoundingClientRect().bottom <= 1 : scrollY > 320;
    const covered = !!footer && footer.getBoundingClientRect().top < innerHeight - 80;
    const shown = past && !covered;
    bar.classList.toggle("is-in", shown);
    if (shown) bar.removeAttribute("inert");
    else bar.setAttribute("inert", "");
  };
  const onScroll = () => { if (!frame) frame = requestAnimationFrame(measure); };
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", onScroll);
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
    if (!desktopMega()) {
      const mega = megaBtn.closest("[data-mega]");
      setMega(!(mega && mega.classList.contains("is-open")));
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
  setMega(true);
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
  setMega(true);
});
document.addEventListener("focusout", (event) => {
  const mega = event.target instanceof Element ? event.target.closest("[data-mega]") : null;
  if (!mega || !desktopMega()) return;
  const next = event.relatedTarget;
  if (next instanceof Node && mega.contains(next)) return;
  clearTimeout(megaTimer);
  megaTimer = setTimeout(() => setMega(false), 120);
});
matchMedia("(max-width: 1024px)").addEventListener("change", () => setMega(false));
document.addEventListener("keydown", (event) => {
  const megaOpen = document.querySelector("[data-mega].is-open");
  if (event.key === "Escape" && megaOpen) {
    setMega(false);
    if (!menuOpen) megaOpen.querySelector(".mega__btn")?.focus({ preventScroll: true });
    return;
  }
  if (event.key === "ArrowDown" && event.target instanceof Element && event.target.closest(".mega__btn")) {
    const mega = event.target.closest("[data-mega]");
    const first = mega && mega.querySelector(".mega__grid a");
    if (first instanceof HTMLElement) {
      event.preventDefault();
      setMega(true);
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
document.addEventListener("mouseover", (event) => { const shot = entered(event); if (shot) startShot(shot); });
document.addEventListener("mouseout", (event) => { const shot = entered(event); if (shot) stopShot(shot); });
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
document.addEventListener("submit", async (event) => {
  const form = event.target;
  if (!(form instanceof HTMLFormElement) || !form.hasAttribute("data-lead")) return;
  event.preventDefault();
  let firstBad = null;
  form.querySelectorAll("[required]").forEach((el) => {
    if (!(el instanceof HTMLInputElement) && !(el instanceof HTMLTextAreaElement)) return;
    const ok = !!el.value.trim() && el.checkValidity();
    el.classList.toggle("invalid", !ok);
    el.setAttribute("aria-invalid", String(!ok));
    if (!ok && !firstBad) firstBad = el;
  });
  const msg = form.querySelector(".form__msg");
  if (firstBad) {
    if (msg) msg.textContent = "Please fill in the highlighted fields.";
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
        strong.textContent = "Thanks! We’ll be in touch soon.";
        msg.append(check, strong);
      }
      return;
    }
    if (res.status === 503) {
      const lines = [...data.entries()].filter((entry) => entry[0] !== "_gotcha" && typeof entry[1] === "string" && entry[1].trim() !== "").map(([key, value]) => key + ": " + value).join("\n");
      location.href = "mailto:" + cfg.email + "?subject=" + encodeURIComponent("Message from the Kinexis Digital website") + "&body=" + encodeURIComponent(lines);
      if (msg) {
        msg.replaceChildren();
        msg.append("Your email app should open with this message. If it does not, email ");
        const link = document.createElement("a");
        link.href = "mailto:" + cfg.email;
        link.textContent = cfg.email;
        msg.append(link, ".");
      }
      return;
    }
    if (msg) msg.textContent = typeof body.error === "string" && body.error ? body.error : "Something went wrong. Please try again.";
  } catch {
    if (msg) msg.textContent = "Network error. Please try again.";
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
  dlg.addEventListener("close", () => dlg.querySelector("iframe")?.remove());
});

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
    window.dataLayer.push(["js", new Date()]);
    window.dataLayer.push(["config", cfg.ga]);
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
