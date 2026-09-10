"use client";

import { Link } from "@shared/i18n/navigation";
import { useLanguage } from "../../hooks/index";

export function LanguageSelect() {
  const { locale, locales, pathname } = useLanguage();

  return (
    <div
      aria-label="Language"
      className="flex overflow-hidden rounded-[4px] border border-slate-200 text-xs font-medium dark:border-slate-700"
    >
      {locales.map((item) => (
        <Link
          aria-current={item === locale ? "page" : undefined}
          className={
            item === locale
              ? "bg-slate-950 px-2.5 py-2 text-white dark:bg-white dark:text-slate-950"
              : "bg-white px-2.5 py-2 text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white"
          }
          href={pathname}
          key={item}
          locale={item}
        >
          {item.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
