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

/**
 * The device color scheme wins on phones, tablets, and computers.
 * A previously saved toggle must not keep the site on the other theme.
 */
export function resolveTheme(
  _stored: string | null,
  system: ThemeMode = "light",
): ThemeMode {
  return system;
}

/** Apply theme via data-theme only — React owns html.className, so .dark is unreliable. */
export function applyTheme(theme: ThemeMode) {
  const root = document.documentElement;
  root.setAttribute("data-theme", theme);
  root.style.colorScheme = theme;
}

/** Always the live device preference. Drops any saved override. */
export function readDeviceTheme(): ThemeMode {
  try {
    localStorage.removeItem(THEME_STORAGE_KEY);
  } catch {
    // private mode / blocked storage
  }
  return getSystemTheme();
}

export const THEME_PREFLIGHT_SCRIPT = `(function(){try{var k=${JSON.stringify(THEME_STORAGE_KEY)};try{localStorage.removeItem(k)}catch(e){}var t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";var r=document.documentElement;r.setAttribute("data-theme",t);r.style.colorScheme=t;var m=window.matchMedia("(prefers-color-scheme: dark)");var sync=function(){var n=m.matches?"dark":"light";r.setAttribute("data-theme",n);r.style.colorScheme=n};if(m.addEventListener)m.addEventListener("change",sync);else if(m.addListener)m.addListener(sync)}catch(e){}})();`;
