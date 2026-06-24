import * as Sentry from "@sentry/nextjs";

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
  dsn: SENTRY_DSN,
  tracesSampleRate: 0.1,
  enabled: Boolean(SENTRY_DSN),
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  // Only register the Replay integration when a DSN is present — the SDK
  // still initialises DOM listeners even when `enabled: false` otherwise.
  integrations: SENTRY_DSN ? [Sentry.replayIntegration()] : [],
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
