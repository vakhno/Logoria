import { useTranslations } from "next-intl";

export function HomeScreen() {
  const t = useTranslations("home");

  return (
    <main className="flex-1 bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-white">
      <section className="mx-auto grid w-full max-w-3xl gap-6 px-5 py-16 sm:px-8">
        <div>
          <h1 className="text-[34px] font-bold leading-[1.18] sm:text-[48px]">{t("title")}</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
            {t("description")}
          </p>
        </div>
      </section>
    </main>
  );
}
