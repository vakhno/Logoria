import { useEffect, useState, type ReactNode } from "react";
import { THEME, type Theme } from "@shared/theme";
import { ThemeContext } from "../../hooks/useTheme";

function storedTheme(): Theme {
  const value = window.localStorage.getItem("theme");
  return value === THEME.LIGHT || value === THEME.DARK ? value : THEME.SYSTEM;
}

function applyTheme(theme: Theme) {
  const dark =
    theme === THEME.DARK ||
    (theme === THEME.SYSTEM && window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.classList.toggle("dark", dark);
  document.documentElement.dataset.themePreference = theme;
  document.cookie = `theme-preference=${theme}; Path=/; Max-Age=31536000; SameSite=Lax`;
  window.localStorage.setItem("theme", theme);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [selectedTheme, selectTheme] = useState<Theme>(storedTheme);

  useEffect(() => {
    applyTheme(selectedTheme);
    if (selectedTheme !== THEME.SYSTEM) return;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => applyTheme(THEME.SYSTEM);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [selectedTheme]);

  return (
    <ThemeContext.Provider value={{ selectedTheme, selectTheme }}>{children}</ThemeContext.Provider>
  );
}
