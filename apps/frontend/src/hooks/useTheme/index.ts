"use client";

import { createContext, useContext } from "react";
import type { Theme } from "@shared/theme";

export type { Theme } from "@shared/theme";

export type ThemeContextValue = {
  selectedTheme: Theme;
  selectTheme: (theme: Theme) => void;
};

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }

  return context;
}
