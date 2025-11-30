"use client";

import gsap from "gsap";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import DevtoolsCLI from "./components/DevToolsCLI";
import TerminalEgg from "./components/TerminalEgg";
import Time from "./components/Time";
import TimeZone from "./components/TimeZone";
import { getVideoFor } from "./data/WeatherVideoMap";
import { useWeather } from "./hooks/useWeather";

export const Hero = () => {
  const [mounted, setMounted] = useState(false);
  const t = useTranslations("common"); // "common" corresponde a tus archivos JSON
  const locale = useLocale()
  const { weather, city } = useWeather();
  const weatherMain = weather?.weather?.[0]?.main;
  const temp = Math.round(weather?.main?.temp ?? 0);
  const desc = weather?.weather?.[0]?.description;
  const { video, poster } = getVideoFor(weatherMain);

  const messages: Record<string, string> = {
    Clear: t("weather_messages.Clear"),
    Rain: t("weather_messages.Rain"),
    Snow: t("weather_messages.Snow"),
    Clouds: t("weather_messages.Clouds"),
    Default: t("weather_messages.Default"),
  };

  const message = messages[weatherMain ?? "Default"];

  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { duration: 0.8, ease: "power2.out" },
    });
    if (overlayRef.current)
      tl.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1 });
    if (contentRef.current)
      tl.fromTo(
        contentRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0 },
        "<0.2"
      );
    if (ctasRef.current)
      tl.fromTo(
        ctasRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0 },
        "<0.2"
      );
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render placeholder neutro para SSR
    return (
      <video
        className="absolute inset-0 w-full h-full object-cover"
        muted
        playsInline
      />
    );
  }
  return (
    <section className="relative w-full h-screen overflow-hidden bg-bg">
      {/* VIDEO */}
      <video
        src={video}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-80 sepia-50 dark:grayscale-50"
        style={{ pointerEvents: "none" }}
      />

      {/* OVERLAY */}
      <div ref={overlayRef} className="absolute inset-0 bg-overlay" />

      {/* CONTENT */}
      <div className="relative w-full h-full flex items-center justify-center px-6">
        <div ref={contentRef} className="max-w-3xl text-center space-y-6">
          {/* TIME + WEATHER + LOCATION */}
            {city && <p className="sm:hidden">{t("location_format", { city, temp, desc })}</p>}
          <div className="flex justify-center items-center gap-4 font-mono text-sm opacity-90 text-primary ">
            <Time />
            {city && <p className="hidden sm:block">{t("location_format", { city, temp, desc })}</p>}
            <TimeZone />
          </div>

          {/* NAME */}
          <h1 className="text-5xl font-bold tracking-tight text-accent">{`Will`}</h1>

          {/* TITLE */}
          <p className="text-xl opacity-90 text-primary">
            Full-Stack Developer — React, Node & Cloud
          </p>

          {/* Weather Message */}
          <p className="text-sm opacity-80 bg-accent rounded-xs text-bg">{message}</p>

          {/* Call to actions */}
          <div ref={ctasRef} className="flex justify-center gap-4 mt-6">
            <Link
              href={`/cv_${locale}.pdf`}
              className="px-6 py-3 rounded-md font-medium text-bg bg-bg hover:scale-105 active:scale-90 duration-300 transition-all"
            >
              {t("download_cv")}
            </Link>
            <Link
              href="#projects"
              className="px-6 py-3 rounded-md font-medium border border-accent text-primary active:scale-90 scroll-smooth hover:ring-4 hover:ring-accent duration-300 transition-all"
            >
              {t("projects")}
            </Link>
          </div>
        </div>
      </div>

      <TerminalEgg />
      <DevtoolsCLI />
    </section>
  );
};
