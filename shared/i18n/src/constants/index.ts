import { Locale } from "../types";

export const APP_NAME = "app_name";

export const LOCALES_LIST = ["en", "es"] as const;

export const DEFAULT_LOCALE = "en" satisfies Locale;

export default {
  APP_NAME,
  DEFAULT_LOCALE,
  LOCALES_LIST,
};
