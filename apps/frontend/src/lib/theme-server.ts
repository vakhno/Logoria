import "server-only";

import { cookies } from "next/headers";
import { DEFAULT_THEME, THEME, type Theme } from "@shared/theme";

export async function getThemePreference(): Promise<Theme> {
  const storedTheme = (await cookies()).get("theme-preference")?.value;

  return storedTheme === THEME.LIGHT || storedTheme === THEME.DARK || storedTheme === THEME.SYSTEM
    ? storedTheme
    : DEFAULT_THEME;
}
