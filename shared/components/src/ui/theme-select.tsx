"use client";

import type { ReactNode } from "react";

export type ThemeSelectProps<T extends string> = {
  options: readonly T[];
  selectedTheme: T;
  onSelectTheme: (theme: T) => void;
  renderOption?: (theme: T) => ReactNode;
};

export function ThemeSelect<T extends string>({
  options,
  selectedTheme,
  onSelectTheme,
  renderOption = (theme) => theme,
}: ThemeSelectProps<T>) {
  return (
    <div
      aria-label="Theme"
      className="flex overflow-hidden rounded-[4px] border border-slate-200 text-xs font-medium dark:border-slate-700"
      role="group"
    >
      {options.map((theme) => (
        <button
          aria-pressed={theme === selectedTheme}
          className={
            theme === selectedTheme
              ? "bg-slate-950 px-2.5 py-2 text-white outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-0 dark:bg-white dark:text-slate-950"
              : "bg-white px-2.5 py-2 text-slate-600 outline-none hover:bg-slate-100 hover:text-slate-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-0 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white"
          }
          key={theme}
          onClick={() => onSelectTheme(theme)}
          suppressHydrationWarning
          type="button"
        >
          {renderOption(theme)}
        </button>
      ))}
    </div>
  );
}
