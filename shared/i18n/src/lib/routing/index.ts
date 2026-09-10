import { defineRouting } from "next-intl/routing";
import { DEFAULT_LOCALE, LOCALES_LIST } from "../../constants";

export const routing = defineRouting({
  defaultLocale: DEFAULT_LOCALE,
  localeDetection: false,
  localePrefix: "as-needed",
  locales: LOCALES_LIST,
});
