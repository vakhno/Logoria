"use client";

import { useTranslations } from "next-intl";
import { Button, SiteHeader } from "@shared/components";
import { APP_NAME } from "@shared/i18n";
import { APP_ROUTES } from "@shared/routes";
import { Link } from "@shared/i18n/navigation";
import { LanguageSelect } from "./language-select";
import { ThemeSelect } from "./theme-select";

type HeaderSession = {
  user?: {
    name?: string | null;
    email?: string | null;
  } | null;
} | null;

type HeaderProps = {
  onSignOut: () => void;
  session: HeaderSession;
  sessionPending: boolean;
};

export function Header({ onSignOut, session, sessionPending }: HeaderProps) {
  const user = session?.user;
  const auth = useTranslations("auth");
  const nav = useTranslations("nav");

  return (
    <SiteHeader className="sticky top-0 z-50 border-b border-slate-200 bg-white px-5 py-3 text-slate-950 dark:border-slate-800 dark:bg-slate-950 dark:text-white sm:px-8 lg:px-10">
      <SiteHeader.Brand>
        <Link className="flex items-center gap-3 text-sm font-semibold" href={APP_ROUTES.home}>
          <span
            aria-hidden="true"
            className="grid size-6 place-items-center border border-slate-950 bg-slate-950 text-[11px] text-white dark:border-white dark:bg-white dark:text-slate-950"
          >
            A
          </span>
          <span>{APP_NAME}</span>
        </Link>
      </SiteHeader.Brand>
      <SiteHeader.Actions>
        <LanguageSelect />
        <ThemeSelect />
        {user ? (
          <>
            <Link className="hidden text-right text-sm sm:block" href={APP_ROUTES.profile}>
              <p className="font-medium">{user.name}</p>
              <p className="text-slate-600 dark:text-slate-300">{user.email}</p>
            </Link>
            <Link
              className="rounded-[4px] border border-slate-200 bg-white px-4 py-2 text-sm font-medium hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:hover:bg-slate-900"
              href={APP_ROUTES.profile}
            >
              {nav("profile")}
            </Link>
          </>
        ) : (
          <span className="hidden text-sm text-slate-600 dark:text-slate-300 sm:inline">
            {sessionPending ? auth("checkingSession") : auth("browsingAnonymously")}
          </span>
        )}
        {user ? (
          <Button
            className="rounded-[4px] border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:hover:bg-slate-900"
            onClick={onSignOut}
            variant="outline"
          >
            {auth("signOut")}
          </Button>
        ) : (
          <Link
            className="rounded-[4px] bg-slate-950 px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-slate-950"
            href={APP_ROUTES.signin}
          >
            {auth("signIn")}
          </Link>
        )}
      </SiteHeader.Actions>
    </SiteHeader>
  );
}
