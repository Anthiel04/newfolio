"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function LocaleSwitch({ locale }: { locale: string }) {
  const pathname = usePathname(); // /en/projects or /es/about
  const searchParams = useSearchParams();
  const targetLocale = locale === "en" ? "es" : "en";

  const query = searchParams.toString();
  // Reemplaza la parte del locale en la ruta
  const newPath = pathname.replace(/^\/(en|es)/, `/${targetLocale}`);
  const href = query ? `${newPath}?${query}` : newPath;

  return (
    <Link
      href={href}
      prefetch={false}
      scroll={false}
      className="rounded-md bg-gray-900 dark:bg-gray-100 py-2 px-3 text-white dark:text-black"
    >
      {targetLocale.toUpperCase()}
    </Link>
  );
}