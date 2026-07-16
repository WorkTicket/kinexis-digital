import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "node",
    include: ["**/*.test.{ts,tsx}"],
    setupFiles: ["./vitest-setup.ts"],
    env: {
      NEXT_PUBLIC_SITE_URL: "http://localhost:3000",
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
    },
  },
});
