import { useLocale } from "next-intl";
import { LOCALES_LIST } from "@shared/i18n/constants";
import type { Locale } from "@shared/i18n";
import { currentRoute } from "../../routes";

export function useLanguage() {
  const locale = useLocale() as Locale;
  const { path } = currentRoute(window.location.pathname);
  return { locale, locales: LOCALES_LIST, pathname: path };
}
