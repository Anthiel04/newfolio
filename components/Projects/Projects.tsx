"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLocale, useTranslations } from "next-intl";
import { useRef } from "react";
import { linksWithLocale } from "./data/linksWithLocale";

gsap.registerPlugin(useGSAP);

export const Projects = () => {
  const projectsRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("projects");
  const locale = useLocale();
  const projects = linksWithLocale(locale);
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!projectsRef.current) return;

    const cards = projectsRef.current.querySelectorAll(".project-card");
    if (!cards || cards.length === 0) return;

    ScrollTrigger.batch(".project-card", {
      start: "top 80%",
      onEnter: (batch: gsap.TweenTarget) =>
        gsap.to(batch, { opacity: 1, y: 0, stagger: 0.2, duration: 0.8 }),
    });
  });

  return (
    <section
      id="projects"
      ref={projectsRef}
      className="relative w-full py-20 text-primary dark:text-text-dark z-50 bg-bg"
    >
      <div className="max-w-6xl mx-auto px-6 flex flex-col space-y-12">
        <h2 className="text-3xl font-bold tracking-tight">
          {t("projects_title")}
        </h2>
        <p className="text-muted">{t("projects_subtitle")}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <a
              key={project.id}
              href={project.link ?? "#"}
              className="project-card bg-bg-overlay dark:bg-bg-overlay-dark rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
            >
              <div className="w-full h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={t(project.titleKey)}
                  className="w-full h-full bg-accent-foreground object-contain md:object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg">{t(project.titleKey)}</h3>
                <p className="text-muted text-sm mt-1">{t(project.descKey)}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
