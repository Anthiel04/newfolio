"use client";

import gsap from "gsap";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import LangToggle from "./components/LangToggle";

export const Header = ({ lang }: { lang: string }) => {
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return (
        localStorage.theme === "dark" ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      );
    }
    return false;
  });
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLUListElement>(null);
  const t = useTranslations("common");
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const match = pathname.match(/^\/(en|es)/);
  const locale = match ? match[1] : "en";
  const navItems = [
    { label: t("home"), href: `/${locale}#home` },
    { label: t("projects"), href: `/${locale}#projects` },
    { label: t("about"), href: `/${locale}#about` },
    { label: t("contact"), href: `/${locale}#contact` },
  ];

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animate nav items

  useEffect(() => {
    if (!navRef.current) return;
    gsap.from(navRef.current.children, {
      opacity: 0,
      y: -10,
      stagger: 0.1,
      duration: 0.5,
      ease: "power2.out",
    });
  }, []);

  // Dark mode toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
      window.dispatchEvent(new Event("themeStorage"));
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
      window.dispatchEvent(new Event("themeStorage"));
    }
  }, [darkMode]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // o render fallback

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-500 ${
        scrolled ? "bg-bg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center h-20 px-6 sm:px-8">
        {/* Logo / Title */}
        <p className="text-2xl sm:text-3xl font-extrabold tracking-wide text-primary ">
          <span className="text-accent">Will</span> Dev
        </p>

        {/* Desktop menu */}
        <ul className="hidden sm:flex space-x-6 text-lg font-medium">
          {navItems.map((item) => (
            <li
              key={item.href}
              className="nav-item hover:text-accent transition-colors cursor-pointer"
            >
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>

        {/* Right controls */}
        <div className="flex items-center gap-3">
          {/* Language switcher */}
          <LangToggle key={locale} locale={locale} />

          {/* Dark/light toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="rounded-md border py-1 px-3 text-primary border-muted "
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

          {/* Mobile menu toggle */}
          <button
            className="sm:hidden p-2 rounded-md border text-primary border-muted "
            onClick={() => setOpen(!open)}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className={`sm:hidden transition-all duration-500 ${
            scrolled ? "bg-bg" : "bg-transparent"
          }`}
        >
          <ul
            ref={navRef}
            className="flex flex-col items-center space-y-4 py-4 text-lg font-medium text-primary "
          >
            {navItems.map((item) => (
              <li
                key={item.href}
                className="hover:text-accent transition-colors cursor-pointer nav-item"
              >
                <Link href={item.href} onClick={() => setOpen(false)}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};
