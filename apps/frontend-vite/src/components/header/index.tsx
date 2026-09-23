"use client";

import { useTranslations } from "next-intl";
import { Button, Header as HeaderPrimitive } from "@shared/components";
import { APP_NAME } from "@shared/i18n/constants";
import type { Locale } from "@shared/i18n";
import { APP_ROUTES } from "@shared/routes";
import { authClient } from "../../lib/auth-client";
import { useLocale } from "next-intl";
import { useState } from "react";
import { routeFor } from "../../routes";
import { LanguageSelect } from "./language-select";
import { ThemeSelect } from "./theme-select";

export function Header() {
  const locale = useLocale() as Locale;
  const [signingOut, setSigningOut] = useState(false);
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const auth = useTranslations("auth");
  const nav = useTranslations("nav");

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
    <HeaderPrimitive className="sticky top-0 z-50 border-b border-slate-200 bg-white px-5 py-3 text-slate-950 dark:border-slate-800 dark:bg-slate-950 dark:text-white sm:px-8 lg:px-10">
      <HeaderPrimitive.Brand>
        <a
          className="flex items-center gap-3 text-sm font-semibold"
          href={routeFor(locale, APP_ROUTES.home)}
        >
          <span
            aria-hidden="true"
            className="grid size-6 place-items-center border border-slate-950 bg-slate-950 text-[11px] text-white dark:border-white dark:bg-white dark:text-slate-950"
          >
            A
          </span>
          <span>{APP_NAME}</span>
        </a>
      </HeaderPrimitive.Brand>
      <HeaderPrimitive.Actions className="max-w-full flex-wrap">
        <LanguageSelect />
        <ThemeSelect />
        {user ? (
          <>
            <a
              className="hidden text-right text-sm sm:block"
              href={routeFor(locale, APP_ROUTES.profile)}
            >
              <p className="font-medium">{user.name}</p>
              <p className="text-slate-600 dark:text-slate-300">{user.email}</p>
            </a>
            <a
              className="rounded-[4px] border border-slate-200 bg-white px-4 py-2 text-sm font-medium hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:hover:bg-slate-900"
              href={routeFor(locale, APP_ROUTES.profile)}
            >
              {nav("profile")}
            </a>
          </>
        ) : (
          <span className="hidden text-sm text-slate-600 dark:text-slate-300 sm:inline">
            {auth("browsingAnonymously")}
          </span>
        )}
        {user ? (
          <Button
            className="rounded-[4px] border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:hover:bg-slate-900"
            disabled={signingOut}
            onClick={signOut}
            variant="outline"
          >
            {auth("signOut")}
          </Button>
        ) : (
          <a
            className="rounded-[4px] bg-slate-950 px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-slate-950"
            href={routeFor(locale, APP_ROUTES.signin)}
          >
            {auth("signIn")}
          </a>
        )}
      </HeaderPrimitive.Actions>
    </HeaderPrimitive>
  );
}
