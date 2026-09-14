export const THEME = {
  LIGHT: "light",
  DARK: "dark",
  SYSTEM: "system",
} as const;

export const THEME_OPTIONS = [THEME.LIGHT, THEME.DARK, THEME.SYSTEM] as const;
export const DEFAULT_THEME = THEME.SYSTEM;
