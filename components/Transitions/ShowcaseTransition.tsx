"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { getProjects } from "../Hero/data/projects";

gsap.registerPlugin(useGSAP);

export const ShowcaseTransition = () => {
  const [projects, setProjects] = useState(() => getProjects("light"));

  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const theme = localStorage.getItem("theme") ?? "light";
    setProjects(getProjects(theme));

    const handleThemeChange = () => {
      const updatedTheme = localStorage.getItem("theme") ?? "light";
      setProjects(getProjects(updatedTheme));
    };

    window.addEventListener("themeStorage", handleThemeChange);

    return () => {
      window.removeEventListener("themeStorage", handleThemeChange);
    };
  }, []);

useGSAP(
    () => {
      if (!sectionRef.current) return;

      gsap.registerPlugin(ScrollTrigger);

      const wrapper = sectionRef.current;

      ScrollTrigger.create({
        trigger: wrapper,
        start: "top 80%",
        end: "bottom 20%",
        scrub: 0.5,
        animation: gsap.fromTo(
          ".trigger1",
          { x: -500 },
          { x: 0, ease: "none" }
        ),
      });

      ScrollTrigger.create({
        trigger: wrapper,
        start: "top 80%",
        end: "bottom 20%",
        scrub: 2,
        animation: gsap.fromTo(
          ".trigger2",
          { x: 0 },
          { x: -500, ease: "none" }
        ),
      });

      ScrollTrigger.create({
        trigger: wrapper,
        start: "top 80%",
        end: "bottom 20%",
        scrub: 2,
        animation: gsap.fromTo(
          ".trigger3",
          { x: -500 },
          { x: 0, ease: "none" }
        ),
      });
    },
    { scope: sectionRef }
  );

  return (
    <div
      className="mt-20 flex flex-col justify-center items-center gap-12 grayscale-25 overflow-hidden"
      ref={sectionRef}
    >
      <div className="flex gap-2 md:gap-6 trigger1">
        {projects.slice(0, 3).map((proj, i) => {
          return (
            <Image
              key={i}
              height={480}
              width={640}
              src={proj.image}
              className={`project-card rounded-2xl`}
              alt="website screenshot"
            />
          );
        })}
      </div>
      <div className="flex gap-2 md:gap-6 trigger2">
        {projects.slice(3, 7).map((proj, i) => {
          return (
            <Image
              key={i}
              height={480}
              width={640}
              src={proj.image}
              className={`project-card rounded-2xl`}
              alt="website screenshot"
            />
          );
        })}
      </div>
      <div className="flex gap-2 md:gap-6 trigger3">
        {projects.slice(7, 10).map((proj, i) => {
          return (
            <Image
              key={i}
              height={480}
              width={640}
              src={proj.image}
              className={`project-card rounded-2xl`}
              alt="website screenshot"
            />
          );
        })}
      </div>
    </div>
  );
};
