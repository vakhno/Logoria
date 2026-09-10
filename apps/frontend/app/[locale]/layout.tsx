import { MESSAGES, resolveLocale } from "@shared/i18n";
import { routing } from "@shared/i18n/routing";
import localFont from "next/font/local";
import { NextIntlProvider, QueryProvider, ThemeProvider } from "../../src/providers";
import "../globals.css";

const montserrat = localFont({
  src: [
    {
      path: "../../assets/fonts/montserrat/montserrat-v31-cyrillic_cyrillic-ext_latin_latin-ext-100.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../assets/fonts/montserrat/montserrat-v31-cyrillic_cyrillic-ext_latin_latin-ext-100italic.woff2",
      weight: "100",
      style: "italic",
    },
    {
      path: "../../assets/fonts/montserrat/montserrat-v31-cyrillic_cyrillic-ext_latin_latin-ext-200.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../assets/fonts/montserrat/montserrat-v31-cyrillic_cyrillic-ext_latin_latin-ext-200italic.woff2",
      weight: "200",
      style: "italic",
    },
    {
      path: "../../assets/fonts/montserrat/montserrat-v31-cyrillic_cyrillic-ext_latin_latin-ext-300.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../assets/fonts/montserrat/montserrat-v31-cyrillic_cyrillic-ext_latin_latin-ext-300italic.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "../../assets/fonts/montserrat/montserrat-v31-cyrillic_cyrillic-ext_latin_latin-ext-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../assets/fonts/montserrat/montserrat-v31-cyrillic_cyrillic-ext_latin_latin-ext-italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../assets/fonts/montserrat/montserrat-v31-cyrillic_cyrillic-ext_latin_latin-ext-500.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../assets/fonts/montserrat/montserrat-v31-cyrillic_cyrillic-ext_latin_latin-ext-500italic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../assets/fonts/montserrat/montserrat-v31-cyrillic_cyrillic-ext_latin_latin-ext-600.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../assets/fonts/montserrat/montserrat-v31-cyrillic_cyrillic-ext_latin_latin-ext-600italic.woff2",
      weight: "600",
      style: "italic",
    },
    {
      path: "../../assets/fonts/montserrat/montserrat-v31-cyrillic_cyrillic-ext_latin_latin-ext-700.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../assets/fonts/montserrat/montserrat-v31-cyrillic_cyrillic-ext_latin_latin-ext-700italic.woff2",
      weight: "700",
      style: "italic",
    },
    {
      path: "../../assets/fonts/montserrat/montserrat-v31-cyrillic_cyrillic-ext_latin_latin-ext-800.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../assets/fonts/montserrat/montserrat-v31-cyrillic_cyrillic-ext_latin_latin-ext-800italic.woff2",
      weight: "800",
      style: "italic",
    },
    {
      path: "../../assets/fonts/montserrat/montserrat-v31-cyrillic_cyrillic-ext_latin_latin-ext-900.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "../../assets/fonts/montserrat/montserrat-v31-cyrillic_cyrillic-ext_latin_latin-ext-900italic.woff2",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-montserrat",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const locale = resolveLocale((await params).locale);

  return (
    <html lang={locale} suppressHydrationWarning className={montserrat.variable}>
      <body>
        <NextIntlProvider locale={locale} messages={MESSAGES[locale]}>
          <ThemeProvider>
            <QueryProvider>{children}</QueryProvider>
          </ThemeProvider>
        </NextIntlProvider>
      </body>
    </html>
  );
}
