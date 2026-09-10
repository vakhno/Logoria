"use client";

import { useTheme as useNextTheme } from "next-themes";
import { useEffect, useState } from "react";

export type Theme = "light" | "dark" | "system";

function isTheme(value: string | undefined): value is Theme {
  return value === "light" || value === "dark" || value === "system";
}

function setThemePreferenceAttribute(theme: Theme) {
  if (typeof window === "undefined") {
    return;
  }

  window.document.documentElement.dataset.themePreference = theme;
}

function getThemePreferenceAttribute(): Theme {
  if (typeof window === "undefined") {
    return "system";
  }

  const themePreference = window.document.documentElement.dataset.themePreference;

  if (isTheme(themePreference)) {
    return themePreference;
  }

  const storedTheme = window.localStorage.getItem("theme") ?? undefined;

  return isTheme(storedTheme) ? storedTheme : "system";
}

export function useTheme() {
  const { setTheme, theme } = useNextTheme();
  const [selectedTheme, setSelectedTheme] = useState<Theme | undefined>();

  useEffect(() => {
    const nextTheme = isTheme(theme) ? theme : getThemePreferenceAttribute();

    setSelectedTheme(nextTheme);
    setThemePreferenceAttribute(nextTheme);
  }, [theme]);

  function selectTheme(theme: Theme) {
    setSelectedTheme(theme);
    setThemePreferenceAttribute(theme);
    setTheme(theme);
  }

  return { selectTheme, selectedTheme };
}
