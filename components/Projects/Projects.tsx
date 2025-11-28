"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import { useRef } from "react";

gsap.registerPlugin(useGSAP)

interface Project {
  id: string;
  titleKey: string; // i18next key
  descKey: string; // i18next key
  image: string;
  link?: string;
}

export const Projects = () => {
  const projectsRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("projects");

  // Example placeholder projects
  const projects: Project[] = [
    {
      id: "1",
      titleKey: "project1.title",
      descKey: "project1.description",
      image: "/assets/projects/project1.png",
      link: "#",
    },
    {
      id: "2",
      titleKey: "project2.title",
      descKey: "project2.description",
      image: "/assets/projects/project2.png",
      link: "#",
    },
    {
      id: "3",
      titleKey: "project3.title",
      descKey: "project3.description",
      image: "/assets/projects/project3.png",
      link: "#",
    },
  ];

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
      className="relative w-full py-20 bg-bg dark:bg-bg-dark text-primary dark:text-text-dark"
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
                  className="w-full h-full object-cover"
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
