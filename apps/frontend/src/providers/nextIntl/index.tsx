import { NextIntlClientProvider } from "next-intl";
import { type ComponentProps, type ReactNode } from "react";

type NextIntlProviderProps = {
  children: ReactNode;
  locale: ComponentProps<typeof NextIntlClientProvider>["locale"];
  messages: ComponentProps<typeof NextIntlClientProvider>["messages"];
};

export function NextIntlProvider({
  children,
  locale,
  messages,
}: NextIntlProviderProps) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
