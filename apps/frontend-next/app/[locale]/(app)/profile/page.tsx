import type { Metadata } from "next";
import { MESSAGES, type Locale } from "@shared/i18n";
import { ProfileScreen } from "../../../../src/screens/profile";
import { getServerSession } from "../../../../src/lib/auth-server";
import { redirect } from "next/navigation";

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

export default async function ProfilePage() {
  const session = await getServerSession();

  if (!session) redirect("/signin");

  return <ProfileScreen session={session} />;
}
