import { DEFAULT_LOCALE } from "../../constants";
import { isLocale } from "../isLocale";
import { type Locale } from "../../types";

export function resolveLocale(locale: string | undefined): Locale {
  return isLocale(locale) ? locale : DEFAULT_LOCALE;
}
