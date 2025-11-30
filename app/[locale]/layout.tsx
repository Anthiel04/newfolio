import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Geist, Geist_Mono } from "next/font/google";
import Head from "next/head";
import { notFound } from "next/navigation";
import { Footer } from "../../components/Layout/Footer";
import { Header } from "../../components/Layout/Header";
import "../globals.css";
import { getAllMessages } from "../i18n/getAllMessages";
import { routing } from "../i18n/routing";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  const messages = getAllMessages(locale);

  return (
    <html lang={locale}>
      <Head>
        <link rel="alternate" hrefLang="en" />
        <link rel="alternate" hrefLang="es" />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased grid-[auto, 1fr, auto]`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header lang={locale} />
          <div className="grain" />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
