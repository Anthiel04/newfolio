"use client";

import { useLocale } from "next-intl";
import { Header } from "../Header";

export function HeaderClient() {
  const locale = useLocale(); // triggers re-render when locale changes
  return <Header key={locale} lang={locale} />;
}