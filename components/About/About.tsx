"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

export const About = () => {
  const aboutRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("about"); // namespace common o el que tengas

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!aboutRef.current) return;

    const children = aboutRef.current.querySelectorAll(".about-child");

    gsap.from(children, {
      opacity: 0,
      y: 30,
      stagger: 0.2,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: aboutRef.current,
        start: "top 80%",
      },
    });
  });

  return (
    <section
      id="about"
      ref={aboutRef}
      className="relative flex justify-center items-center w-screen h-screen bg-bg text-primary"
    >
      <div className="max-w-5xl mx-auto px-6 flex flex-col lg:flex-row items-center lg:items-start gap-12">
        {/* Imagen / Foto */}
        <div className="shrink-0 w-48 h-48 rounded-full overflow-hidden border-4 border-accent about-child">
          <Image
            width={200}
            height={200}
            src="/assets/Me.webp"
            alt="Will"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Contenido */}
        <div className="flex-1 space-y-4">
          <h2 className="text-3xl font-bold tracking-tight about-child">
            {t("title")}
          </h2>
          <p className="text-muted about-child">{t("paragraph1")}</p>

          <p className="text-muted about-child">{t("paragraph2")}</p>

          {/* CTA opcional */}
          <a
            href="#projects"
            className="inline-block px-6 py-3 bg-accent text-bg rounded-md font-medium hover:opacity-90 transition about-child"
          >
            {t("cta")}
          </a>
        </div>
      </div>
    </section>
  );
};
