import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "es"],
  defaultLocale: "en",
  localePrefix: "always",
  pathnames: {
    "/": { en: "/", es: "/" },
  },
});

export type Locale = (typeof routing.locales)[number];

/* locale-aware replacers for next/link & hooks */
export const { Link, redirect, useRouter, usePathname } =
  createNavigation(routing);
