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

  it("keeps a saved light or dark choice and otherwise follows the device", () => {
    expect(resolveTheme("dark")).toBe("dark");
    expect(resolveTheme("light")).toBe("light");
    expect(resolveTheme(null)).toBe("light");
    expect(resolveTheme("system")).toBe("light");
  });
});

describe("THEME_PREFLIGHT_SCRIPT", () => {
  it("applies a saved theme before first paint, and the device theme when nothing is saved", () => {
    expect(THEME_PREFLIGHT_SCRIPT).toContain(THEME_STORAGE_KEY);
    expect(THEME_PREFLIGHT_SCRIPT).toContain("localStorage.getItem");
    expect(THEME_PREFLIGHT_SCRIPT).not.toContain("localStorage.removeItem");
    expect(THEME_PREFLIGHT_SCRIPT).toContain(
      'window.matchMedia("(prefers-color-scheme: dark)")',
    );
    expect(THEME_PREFLIGHT_SCRIPT).toContain('setAttribute("data-theme"');
    expect(THEME_PREFLIGHT_SCRIPT).toContain("colorScheme");
  });
});
