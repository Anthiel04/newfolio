"use client";

import gsap from "gsap";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useRef } from "react";

export const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("common"); // "common" corresponde a tus archivos JSON

  useEffect(() => {
    if (!footerRef.current) return;

    gsap.from(footerRef.current.children, {
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.6,
      ease: "power2.out",
    });
  }, []);

  return (
    <footer ref={footerRef} className="py-10 px-6 sm:px-12 bg-bg">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between gap-6">
        <p className="text-sm sm:text-base max-w-md opacity-80 text-primary">
          {t("footer_description")}
        </p>

        <ul className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center items-start sm:items-center text-lg font-medium">
          <li className="hover:text-accent transition-colors cursor-pointer">
            <Link href="#home">{t("home")}</Link>
          </li>
          <li className="hover:text-accent transition-colors cursor-pointer">
            <Link href="#projects">{t("projects")}</Link>
          </li>
          <li className="hover:text-accent transition-colors cursor-pointer">
            <Link href="#about">{t("about")}</Link>
          </li>
          <li className="hover:text-accent transition-colors cursor-pointer">
            <Link href="#contact">{t("contact")}</Link>
          </li>
        </ul>

        <ul className="flex gap-4 justify-center items-center">
          <li className="hover:text-accent transition-colors cursor-pointer">
            <Link href="https://github.com/Anthiel04" target="_blank">
              GitHub
            </Link>
          </li>
          <li className="hover:text-accent transition-colors cursor-pointer">
            <Link
              href="https://www.linkedin.com/in/richard-william-moreira-hernández-9141b52ab"
              target="_blank"
            >
              LinkedIn
            </Link>
          </li>
          <li className="hover:text-accent transition-colors cursor-pointer">
            <Link href="https://t.me/reinstalador" target="_blank">
              Telegram
            </Link>
          </li>
        </ul>
      </div>

      <p className="text-center text-xs opacity-60 mt-8 text-primary">
        &copy; {new Date().getFullYear()} Will Dev. All rights reserved.
      </p>
    </footer>
  );
};
