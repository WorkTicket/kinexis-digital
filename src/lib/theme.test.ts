import { describe, expect, it } from "vitest";
import {
  THEME_PREFLIGHT_SCRIPT,
  THEME_STORAGE_KEY,
  isThemeMode,
  resolveTheme,
} from "@/lib/theme";

describe("theme resolution", () => {
  it("accepts only light and dark", () => {
    expect(isThemeMode("light")).toBe(true);
    expect(isThemeMode("dark")).toBe(true);
    expect(isThemeMode("system")).toBe(false);
    expect(isThemeMode(null)).toBe(false);
  });

  it("uses a stored choice over the system preference", () => {
    expect(resolveTheme("dark")).toBe("dark");
    expect(resolveTheme("light")).toBe("light");
  });

  it("falls back to light when the system preference is not available", () => {
    expect(resolveTheme(null)).toBe("light");
    expect(resolveTheme("system")).toBe("light");
  });
});

describe("THEME_PREFLIGHT_SCRIPT", () => {
  it("applies stored theme, otherwise the device light/dark preference, before first paint", () => {
    expect(THEME_PREFLIGHT_SCRIPT).toContain(THEME_STORAGE_KEY);
    expect(THEME_PREFLIGHT_SCRIPT).toContain("localStorage.getItem");
    expect(THEME_PREFLIGHT_SCRIPT).toContain(
      'window.matchMedia("(prefers-color-scheme: dark)")',
    );
    expect(THEME_PREFLIGHT_SCRIPT).toContain('setAttribute("data-theme"');
    expect(THEME_PREFLIGHT_SCRIPT).toContain("colorScheme");
  });
});
