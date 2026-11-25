import { defineConfig, devices } from "@playwright/test";

// Prefer localhost so Next.js 16 allowedDevOrigins + hydration match the Host header.
const baseURL = process.env.PLAYWRIGHT_BASE_URL || "http://localhost:3100";

export default defineConfig({
  testDir: "e2e",
  timeout: 60_000,
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  // Production deploy gates and CI both need one retry for occasional Turbopack
  // JSON.parse races under parallel workers (dev webServer only).
  retries: process.env.CI || process.env.APPROVED_SHA ? 1 : 0,
  reporter: [["list"]],
  use: {
    baseURL,
    trace: "on-first-retry",
    ...devices["Desktop Chrome"],
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
  webServer: process.env.PLAYWRIGHT_BASE_URL
    ? undefined
    : {
        command: "npm run dev -- --port 3100",
        url: baseURL,
        // The test process must own the server it probes. Reusing a listener on
        // this port can silently test a stale next start/dev instance.
        reuseExistingServer: false,
        timeout: 120_000,
      },
});
