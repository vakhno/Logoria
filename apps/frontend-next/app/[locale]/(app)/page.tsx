import type { Metadata, Viewport } from "next";
import { MESSAGES, type Locale } from "@shared/i18n";
import { HomeScreen } from "../../../src/screens/home";

type PageProps = {
  params: Promise<{
    locale: Locale;
  }>;
};

function getHomeSeo(locale: Locale) {
  return {
    defaults: MESSAGES[locale].seo.defaults,
    route: MESSAGES[locale].seo.routes.home,
  };
}

export async function generateViewport({ params }: PageProps): Promise<Viewport> {
  const { locale } = await params;
  const { defaults } = getHomeSeo(locale);

  return {
    initialScale: 1,
    themeColor: defaults.themeColor,
    width: "device-width",
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const { defaults, route } = getHomeSeo(locale);
  const appUrl = process.env.APP_PUBLIC_URL ?? "http://localhost:3001";
  const localePath = locale === "en" ? "" : `/${locale}`;
  const canonicalUrl = `${appUrl}${localePath}`;

  return {
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: appUrl,
        es: `${appUrl}/es`,
      },
    },
    authors: [{ name: route.author }],
    description: route.description,
    keywords: route.keywords,
    openGraph: {
      description: route.ogDescription,
      images: defaults.ogImage
        ? [
            {
              alt: defaults.ogImageAlt || undefined,
              height: Number(defaults.ogImageHeight) || undefined,
              url: defaults.ogImage,
              width: Number(defaults.ogImageWidth) || undefined,
            },
          ]
        : undefined,
      locale: defaults.ogLocale,
      siteName: route.ogSiteName,
      title: route.ogTitle,
      type: defaults.ogType as "website",
      url: canonicalUrl,
    },
    robots: route.robots,
    title: route.title,
    twitter: {
      card: defaults.twitterCard as "summary_large_image",
      description: route.twitterDescription,
      images: defaults.twitterImage ? [defaults.twitterImage] : undefined,
      site: defaults.twitterSite || undefined,
      title: route.twitterTitle,
    },
  };
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  const seo = MESSAGES[locale].seo.routes.home;

  return (
    <>
      <HomeScreen />
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(seo.jsonLd) }}
        type="application/ld+json"
      />
    </>
  );
}
