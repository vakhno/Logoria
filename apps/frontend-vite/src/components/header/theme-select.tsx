"use client";

import { ThemeSelect as SharedThemeSelect } from "@shared/components";
import { THEME_OPTIONS, type Theme } from "@shared/theme";
import { useTheme } from "../../hooks";

export function ThemeSelect() {
  const { selectTheme, selectedTheme } = useTheme();

  return (
    <SharedThemeSelect<Theme>
      options={THEME_OPTIONS}
      selectedTheme={selectedTheme}
      onSelectTheme={selectTheme}
      renderOption={(theme) => theme.toUpperCase()}
    />
  );
}
