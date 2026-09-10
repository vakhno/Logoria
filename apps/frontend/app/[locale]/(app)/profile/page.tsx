import type { Metadata } from "next";
import { MESSAGES, type Locale } from "@shared/i18n";
import { ProfileScreen } from "../../../../src/screens/profile";

export function generateMetadata({
  params,
}: {
  params: Promise<{
    locale: Locale;
  }>;
}): Promise<Metadata> {
  return params.then(({ locale }) => ({
    title: MESSAGES[locale].seo.routes.profile.title,
  }));
}

export default function ProfilePage() {
  return <ProfileScreen />;
}
