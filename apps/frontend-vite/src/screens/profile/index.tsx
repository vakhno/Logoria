"use client";

import { useTranslations } from "next-intl";
import { Button } from "@shared/components";
import type { ClientSession } from "@shared/auth/types";
import { authClient } from "../../lib/auth-client";
import { APP_ROUTES } from "@shared/routes";
import { useLocale } from "next-intl";
import { useState } from "react";
import { type Locale } from "@shared/i18n";
import { routeFor } from "../../routes";

export function ProfileScreen({ session }: { session: ClientSession }) {
  const locale = useLocale() as Locale;
  const [signingOut, setSigningOut] = useState(false);
  const auth = useTranslations("auth");
  const nav = useTranslations("nav");
  const profile = useTranslations("profile");
  const user = session.user;

  async function signOut() {
    setSigningOut(true);
    const { error } = await authClient.signOut();
    if (error) {
      setSigningOut(false);
      return;
    }
    window.location.assign(routeFor(locale, APP_ROUTES.home));
  }

  return (
    <main className="flex-1 bg-slate-50 px-5 py-6 text-slate-950 dark:bg-slate-950 dark:text-white sm:px-8">
      <section className="mx-auto grid w-full max-w-3xl gap-6 border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">{profile("title")}</h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{user.email}</p>
          </div>
          <a
            className="rounded-[4px] border border-slate-200 bg-white px-3 py-2 text-sm font-medium hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800"
            href={routeFor(locale, APP_ROUTES.home)}
          >
            {nav("home")}
          </a>
        </div>

        <dl className="grid gap-3 text-sm">
          <div>
            <dt className="font-medium text-slate-700 dark:text-slate-300">{profile("name")}</dt>
            <dd className="mt-1 text-slate-950 dark:text-white">{user.name}</dd>
          </div>
          <div>
            <dt className="font-medium text-slate-700 dark:text-slate-300">{profile("email")}</dt>
            <dd className="mt-1 text-slate-950 dark:text-white">{user.email}</dd>
          </div>
        </dl>

        <Button
          className="w-fit rounded-[4px] border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
          disabled={signingOut}
          onClick={signOut}
          variant="outline"
        >
          {auth("signOut")}
        </Button>
      </section>
    </main>
  );
}
