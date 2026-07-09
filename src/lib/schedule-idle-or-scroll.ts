/** Defer non-critical work until the browser is idle or the user scrolls. */
export function scheduleIdleOrScroll(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};

  let done = false;
  const run = () => {
    if (done) return;
    done = true;
    callback();
  };

  if (typeof requestIdleCallback !== "undefined") {
    const id = requestIdleCallback(run, { timeout: 2500 });
    window.addEventListener("scroll", run, { once: true, passive: true });
    return () => {
      cancelIdleCallback(id);
      window.removeEventListener("scroll", run);
    };
  }

  const timer = window.setTimeout(run, 150);
  window.addEventListener("scroll", run, { once: true, passive: true });
  return () => {
    window.clearTimeout(timer);
    window.removeEventListener("scroll", run);
  };
}
