export const THEME_STORAGE_KEY = "kinexis-theme";

export type ThemeMode = "light" | "dark";

export function isThemeMode(value: unknown): value is ThemeMode {
  return value === "light" || value === "dark";
}

export function getSystemTheme(): ThemeMode {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function resolveTheme(stored: string | null): ThemeMode {
  if (isThemeMode(stored)) return stored;
  return getSystemTheme();
}

/** Apply theme via data-theme only — React owns html.className, so .dark is unreliable. */
export function applyTheme(theme: ThemeMode) {
  const root = document.documentElement;
  root.setAttribute("data-theme", theme);
  root.style.colorScheme = theme;
}

/** Prefer localStorage over the DOM attribute — React can reset data-theme from SSR props. */
export function readStoredTheme(): ThemeMode {
  try {
    return resolveTheme(localStorage.getItem(THEME_STORAGE_KEY));
  } catch {
    return getSystemTheme();
  }
}

export const THEME_PREFLIGHT_SCRIPT = `(function(){try{var k=${JSON.stringify(THEME_STORAGE_KEY)};var s=localStorage.getItem(k);var t=(s==="light"||s==="dark")?s:(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");var r=document.documentElement;r.setAttribute("data-theme",t);r.style.colorScheme=t}catch(e){}})();`;
