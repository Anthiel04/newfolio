"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

export const SlideRightTransition = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadGsap() {
      const { ScrollTrigger } = await import("gsap/dist/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (!containerRef.current) return;

      const panel = containerRef.current.querySelector(".slide-panel");

      gsap.to(panel, {
        x: "100%",
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          pin: true,
        },
      });
    }

    loadGsap();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-bg dark:bg-bg-dark"
    >
      <div
        className="
          slide-panel 
          absolute inset-0 
          bg-accent 
          dark:bg-accent-dark
          flex items-center justify-center
        "
      >
        <h2 className="text-4xl font-bold text-bg dark:text-text-dark tracking-tight">
          {/* This text is optional — remove if you want pure color */}
          Transitioning...
        </h2>
      </div>
    </section>
  );
};
