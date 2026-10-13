/** Schedule library work after the first viewport has decoded and painted. */
export function afterPrimaryPaint(callback: () => void, waitForFonts = false): () => void {
  let cancelled = false;
  let firstFrame = 0;
  let secondFrame = 0;
  let idle = 0;
  let fallback = 0;
  const enable = () => { if (!cancelled) callback(); };
  const hero = document.querySelector<HTMLImageElement>(".lp-web-hero__devices img");
  const ready = hero ? hero.decode() : waitForFonts ? document.fonts.ready : Promise.resolve();
  void ready.catch(() => {}).then(() => {
    if (cancelled) return;
    firstFrame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(() => {
        if (typeof window.requestIdleCallback === "function") idle = window.requestIdleCallback(enable, { timeout: 1000 });
        else fallback = window.setTimeout(enable, 0);
      });
    });
  });
  return () => {
    cancelled = true;
    cancelAnimationFrame(firstFrame);
    cancelAnimationFrame(secondFrame);
    if (idle) window.cancelIdleCallback(idle);
    clearTimeout(fallback);
  };
}
