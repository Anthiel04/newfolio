import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Geist, Geist_Mono } from "next/font/google";
import Head from "next/head";
import { Footer } from "../../components/Layout/Footer";
import { Header } from "../../components/Layout/Header";
import "../globals.css";
import { getAllMessages } from "../i18n/getAllMessages";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  setRequestLocale(locale); // importante para que los hooks client sepan el locale

  const messages = getAllMessages(locale);
  console.log("LOCALE RECIBIDO:", locale);

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
          <div className="grain"/>
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
