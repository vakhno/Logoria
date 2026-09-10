"use client";

import { ThemeProvider as NextThemeProvider } from "next-themes";

const themePreferenceScript = `
try {
  const storedTheme = localStorage.getItem("theme");
  document.documentElement.dataset.themePreference =
    storedTheme === "light" || storedTheme === "dark" || storedTheme === "system"
      ? storedTheme
      : "system";
} catch {}
`;

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: themePreferenceScript }}
        suppressHydrationWarning
      />
      <NextThemeProvider
        attribute="class"
        defaultTheme="system"
        disableTransitionOnChange
        enableSystem
      >
        {children}
      </NextThemeProvider>
    </>
  );
}
