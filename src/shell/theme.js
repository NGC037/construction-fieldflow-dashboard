const STORAGE_KEY = "cfm_theme_v1";

export function getInitialTheme() {
  const stored = readStoredTheme();
  if (stored) return stored;
  return window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ? "dark" : "light";
}

export function readStoredTheme() {
  try {
    const t = localStorage.getItem(STORAGE_KEY);
    if (t === "dark" || t === "light") return t;
    return null;
  } catch {
    return null;
  }
}

export function setTheme(theme) {
  if (theme !== "dark" && theme !== "light") return;
  document.documentElement.classList.toggle("ff-dark", theme === "dark");
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // ignore
  }
}

