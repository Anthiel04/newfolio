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

  const showcaseRef = useRef<HTMLDivElement>(null);

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

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!showcaseRef.current) return;

    const cards = showcaseRef.current.querySelectorAll(".project-card");

    cards.forEach((card) => {
      const isEven = card.classList.contains("even");

      gsap.to(card, {
        x: isEven ? 500 : -500, // derecha si es EVEN, izquierda si es ODD
        opacity: 0.15,
        ease: "none",
        scrollTrigger: {
          trigger: card,
          start: "top 85%", // empieza cuando cada card entra al viewport
          end: "bottom 20%", // termina cuando se va
          scrub: true,
        },
      });
    });
  });

  return (
    <div
      className="mt-20 flex flex-col justify-center items-center gap-12 grayscale-25 overflow-hidden"
      ref={showcaseRef}
    >
      {projects.map((proj, i) => {
        return (
          <div key={i}>
            <Image
              height={480}
              width={640}
              src={proj.image}
              className={`project-card rounded-2xl ${
                i % 2 === 0 ? "even" : "odd"
              }`}
              alt="website screenshot"
            />
          </div>
        );
      })}
    </div>
  );
};
