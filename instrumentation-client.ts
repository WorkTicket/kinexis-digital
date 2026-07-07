const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;

let sentryInitPromise: Promise<typeof import("@sentry/nextjs")> | null = null;

function loadSentry() {
  if (!SENTRY_DSN) return null;
  sentryInitPromise ??= import("@sentry/nextjs");
  return sentryInitPromise;
}

function initSentryClient() {
  const sentryPromise = loadSentry();
  if (!sentryPromise) return;

  void sentryPromise.then((Sentry) => {
    Sentry.init({
      dsn: SENTRY_DSN,
      tracesSampleRate: 0.1,
      enabled: true,
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1.0,
      integrations: [Sentry.replayIntegration()],
    });
  });
}

if (SENTRY_DSN) {
  if (typeof requestIdleCallback !== "undefined") {
    requestIdleCallback(initSentryClient, { timeout: 4000 });
  } else {
    setTimeout(initSentryClient, 1500);
  }
}

export const onRouterTransitionStart = (
  ...args: Parameters<typeof import("@sentry/nextjs").captureRouterTransitionStart>
) => {
  const sentryPromise = loadSentry();
  if (!sentryPromise) return;
  void sentryPromise.then((Sentry) => {
    Sentry.captureRouterTransitionStart(...args);
  });
};
