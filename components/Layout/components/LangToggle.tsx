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
      className="py-1 px-3 border text-primary border-muted rounded-md hover:bg-accent transition"
    >
      {targetLocale.toUpperCase()}
    </Link>
  );
}