"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

export const SlideHorizontal = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadGsap() {
      const { ScrollTrigger } = await import("gsap/dist/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (!sectionRef.current) return;

      const track = sectionRef.current.querySelector(".slide-track");

      gsap.fromTo(
        track,
        { x: "-40vw" },     // starts slightly off-screen to left
        {
          x: "40vw",       // moves to the right as user scrolls
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,   // smooth scroll-linked motion
          },
        }
      );
    }

    loadGsap();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[60vh] w-full overflow-hidden bg-bg flex items-center justify-center"
    >
      <div className="slide-track text-5xl font-bold text-accent whitespace-nowrap">
        Slide to About →
      </div>
    </section>
  );
};
