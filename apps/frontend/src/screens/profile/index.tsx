"use client";

import { useLocale, useTranslations } from "next-intl";
import { useEffect } from "react";
import { Button } from "@shared/components";
import { DEFAULT_LOCALE } from "@shared/i18n";
import { APP_ROUTES } from "@shared/routes";
import { Link, useRouter } from "@shared/i18n/navigation";
import { authClient } from "../../lib/auth-client";

export function ProfileScreen() {
  const router = useRouter();
  const locale = useLocale();
  const auth = useTranslations("auth");
  const nav = useTranslations("nav");
  const profile = useTranslations("profile");
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session?.user) {
      const localePrefix = locale === DEFAULT_LOCALE ? "" : `/${locale}`;
      const profilePath = `${localePrefix}${APP_ROUTES.profile}`;
      const signInPath = `${localePrefix}${APP_ROUTES.signin}`;

      router.replace(`${signInPath}?redirectTo=${encodeURIComponent(profilePath)}`);
    }
  }, [isPending, locale, router, session?.user]);

  if (isPending || !session?.user) {
    return (
      <main className="flex-1 bg-slate-50 p-8 text-sm text-slate-600 dark:bg-slate-950 dark:text-slate-300">
        {auth("checkingSession")}
      </main>
    );
  }

  return (
    <main className="flex-1 bg-slate-50 px-5 py-6 text-slate-950 dark:bg-slate-950 dark:text-white sm:px-8">
      <section className="mx-auto grid w-full max-w-3xl gap-6 border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">{profile("title")}</h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{session.user.email}</p>
          </div>
          <Link
            className="rounded-[4px] border border-slate-200 bg-white px-3 py-2 text-sm font-medium hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800"
            href={APP_ROUTES.home}
          >
            {nav("home")}
          </Link>
        </div>

        <dl className="grid gap-3 text-sm">
          <div>
            <dt className="font-medium text-slate-700 dark:text-slate-300">{profile("name")}</dt>
            <dd className="mt-1 text-slate-950 dark:text-white">{session.user.name}</dd>
          </div>
          <div>
            <dt className="font-medium text-slate-700 dark:text-slate-300">{profile("email")}</dt>
            <dd className="mt-1 text-slate-950 dark:text-white">{session.user.email}</dd>
          </div>
        </dl>

        <Button
          className="w-fit rounded-[4px] border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
          onClick={() => authClient.signOut()}
          variant="outline"
        >
          {auth("signOut")}
        </Button>
      </section>
    </main>
  );
}
