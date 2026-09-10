import { LOCALES_LIST } from "../../constants";
import { type Locale } from "../../types";

export function isLocale(locale: string | undefined): locale is Locale {
  return LOCALES_LIST.includes(locale as Locale);
}
