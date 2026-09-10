"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { getAppBaseUrl } from "../../lib/app-base-url";
import { authClient } from "../../lib/auth-client";

function SignInContent() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/";
  const t = useTranslations("auth");

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-xl items-center justify-center bg-slate-50 p-8 text-slate-950 dark:bg-slate-950 dark:text-white">
      <section className="grid w-full gap-4 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h1 className="text-2xl font-semibold">{t("signInRequired")}</h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">{t("signInDescription")}</p>
        <button
          className="rounded-lg bg-slate-900 px-4 py-3 text-sm font-medium text-white dark:bg-white dark:text-slate-950"
          onClick={() =>
            authClient.signIn.social({
              provider: "google",
              callbackURL: `${getAppBaseUrl()}${redirectTo}`,
            })
          }
          type="button"
        >
          {t("signInWithGoogle")}
        </button>
      </section>
    </main>
  );
}

export function SignInScreen() {
  return (
    <Suspense>
      <SignInContent />
    </Suspense>
  );
}
