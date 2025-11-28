"use client";

import { createNavigation } from "next-intl/navigation";
import { routing } from "../../../app/i18n/routing";

const { Link } = createNavigation(routing);

export default function LocaleSwitch({ locale }: { locale: string }) {
  const targetLocale = locale === "en" ? "es" : "en";

  // quitamos el prefijo de idioma para mantener la ruta

  return (
    <Link
      href="/"
      locale={targetLocale}
      prefetch={false}
      scroll={false}
      onClick={() => {
        setTimeout(() => {
          const hero = document.getElementById("hero");
          hero?.scrollIntoView({ behavior: "smooth" });
        }, 50);
      }}
      className="px-3 py-1 border rounded-md hover:bg-accent hover:text-white transition"
    >
      {targetLocale.toUpperCase()}
    </Link>
  );
}
