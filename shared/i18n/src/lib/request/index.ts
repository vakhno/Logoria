import { getRequestConfig } from "next-intl/server";
import { MESSAGES } from "../../messages";
import { resolveLocale } from "../resolveLocale";

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = resolveLocale(await requestLocale);

  return {
    locale,
    messages: MESSAGES[locale],
  };
});
