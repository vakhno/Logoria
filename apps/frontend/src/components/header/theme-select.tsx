"use client";

import { type Theme, useTheme } from "../../hooks";

const themeOptions: Theme[] = ["light", "dark", "system"];
const selectedThemeClassNames: Record<Theme, string> = {
  light:
    "[html[data-theme-preference=light]_&]:bg-slate-950 [html[data-theme-preference=light]_&]:text-white dark:[html[data-theme-preference=light]_&]:bg-white dark:[html[data-theme-preference=light]_&]:text-slate-950",
  dark: "[html[data-theme-preference=dark]_&]:bg-slate-950 [html[data-theme-preference=dark]_&]:text-white dark:[html[data-theme-preference=dark]_&]:bg-white dark:[html[data-theme-preference=dark]_&]:text-slate-950",
  system:
    "[html[data-theme-preference=system]_&]:bg-slate-950 [html[data-theme-preference=system]_&]:text-white dark:[html[data-theme-preference=system]_&]:bg-white dark:[html[data-theme-preference=system]_&]:text-slate-950",
};

export function ThemeSelect() {
  const { selectTheme, selectedTheme } = useTheme();

  return (
    <div
      aria-label="Theme"
      className="flex overflow-hidden rounded-[4px] border border-slate-200 text-xs font-medium dark:border-slate-700"
      role="group"
    >
      {themeOptions.map((item) => (
        <button
          aria-pressed={item === selectedTheme}
          className={`bg-white px-2.5 py-2 text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white ${selectedThemeClassNames[item]}`}
          key={item}
          onClick={() => selectTheme(item)}
          suppressHydrationWarning
          type="button"
        >
          {item.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
