/** Run `fn` on idle, or on first scroll / after a timeout — whichever comes first. */
export function scheduleIdleOrScroll(fn: () => void, timeoutMs = 2500): () => void {
  let done = false;
  const run = () => {
    if (done) return;
    done = true;
    cleanup();
    fn();
  };

  let idleId = 0;
  let timeoutId = 0;

  const onScroll = () => run();

  const cleanup = () => {
    if (idleId && typeof cancelIdleCallback === "function") {
      cancelIdleCallback(idleId);
    }
    if (timeoutId) window.clearTimeout(timeoutId);
    window.removeEventListener("scroll", onScroll);
  };

  if (typeof requestIdleCallback === "function") {
    idleId = requestIdleCallback(run, { timeout: timeoutMs });
  } else {
    timeoutId = window.setTimeout(run, Math.min(1500, timeoutMs));
  }

  window.addEventListener("scroll", onScroll, { once: true, passive: true });

  return cleanup;
}
