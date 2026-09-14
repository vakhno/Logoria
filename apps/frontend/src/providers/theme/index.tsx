"use client";

import { useEffect, useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { THEME, type Theme } from "@shared/theme";
import { ThemeContext, type ThemeContextValue } from "../../hooks/useTheme";

const themeBootstrapScript = `
(function () {
  try {
    var theme = localStorage.getItem("theme") || "system";
    var isDark = theme === "dark" ||
      (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList.toggle("dark", isDark);
    document.documentElement.dataset.themePreference = theme;
  } catch (_) {}
})();
`;

function isTheme(value: string | null): value is Theme {
  return value === THEME.LIGHT || value === THEME.DARK || value === THEME.SYSTEM;
}

function getStoredTheme(): Theme | null {
  const value = window.localStorage.getItem("theme");
  return isTheme(value) ? value : null;
}

function applyTheme(theme: Theme) {
  const resolvedTheme =
    theme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme;

  document.documentElement.classList.toggle("dark", resolvedTheme === "dark");
  document.documentElement.dataset.themePreference = theme;
  document.cookie = `theme-preference=${theme}; Path=/; Max-Age=31536000; SameSite=Lax`;
  window.localStorage.setItem("theme", theme);
}

export function ThemeProvider({
  children,
  initialTheme,
}: {
  children: React.ReactNode;
  initialTheme: Theme;
}) {
  useServerInsertedHTML(() => (
    <script
      dangerouslySetInnerHTML={{ __html: themeBootstrapScript }}
      suppressHydrationWarning
    />
  ));

  const [selectedTheme, setSelectedTheme] = useState<Theme>(initialTheme);

  useEffect(() => {
    const storedTheme = getStoredTheme();
    if (storedTheme) setSelectedTheme(storedTheme);
  }, []);

  useEffect(() => {
    applyTheme(selectedTheme);

    if (selectedTheme !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => applyTheme("system");

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [selectedTheme]);

  const value: ThemeContextValue = {
    selectedTheme,
    selectTheme: setSelectedTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
