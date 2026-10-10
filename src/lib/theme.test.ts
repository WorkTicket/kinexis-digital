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

  it("follows the device on phones, tablets, and computers, even if a theme was saved", () => {
    expect(resolveTheme("dark", "light")).toBe("light");
    expect(resolveTheme("light", "dark")).toBe("dark");
    expect(resolveTheme(null, "dark")).toBe("dark");
    expect(resolveTheme("system", "light")).toBe("light");
  });
});

describe("THEME_PREFLIGHT_SCRIPT", () => {
  it("applies the device light/dark preference before first paint and drops a saved override", () => {
    expect(THEME_PREFLIGHT_SCRIPT).toContain(THEME_STORAGE_KEY);
    expect(THEME_PREFLIGHT_SCRIPT).toContain("localStorage.removeItem");
    expect(THEME_PREFLIGHT_SCRIPT).not.toContain("localStorage.getItem");
    expect(THEME_PREFLIGHT_SCRIPT).toContain(
      'window.matchMedia("(prefers-color-scheme: dark)")',
    );
    expect(THEME_PREFLIGHT_SCRIPT).toContain('setAttribute("data-theme"');
    expect(THEME_PREFLIGHT_SCRIPT).toContain("colorScheme");
    expect(THEME_PREFLIGHT_SCRIPT).toContain('addEventListener("change"');
  });
});
