"use client";

import { useLocale } from "next-intl";
import { LOCALES_LIST, type Locale } from "@shared/i18n";
import { usePathname } from "@shared/i18n/navigation";

export function useLanguage() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();

  return {
    locale,
    locales: LOCALES_LIST,
    pathname,
  };
}
