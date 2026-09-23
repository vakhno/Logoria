import { DEFAULT_LOCALE, LOCALES_LIST } from "@shared/i18n/constants";
import type { Locale } from "@shared/i18n";
import { APP_ROUTES } from "@shared/routes";

export function routeFor(locale: Locale, path: string) {
  return `${locale === DEFAULT_LOCALE ? "" : `/${locale}`}${path}`;
}

export function currentRoute(pathname: string) {
  const parts = pathname.split("/").filter(Boolean);
  const detectedLocale = LOCALES_LIST.find((item) => item === parts[0]);
  const locale = detectedLocale ?? DEFAULT_LOCALE;
  const path = `/${parts.slice(detectedLocale ? 1 : 0).join("/")}`;
  const validPath = [APP_ROUTES.home, APP_ROUTES.signin, APP_ROUTES.profile].includes(
    path as (typeof APP_ROUTES)[keyof typeof APP_ROUTES],
  );
  return { locale, path, validPath };
}
