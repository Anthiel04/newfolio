"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

export const Cylinder = () => {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      gsap.registerPlugin(ScrollTrigger);
      const title = sectionRef.current.querySelector(
        ".cylinder_trigger"
      ) as HTMLElement;
      const textWrapper = sectionRef.current.querySelector(
        ".cylinder__text__wrapper"
      ) as HTMLElement;
      const textItems = sectionRef.current.querySelectorAll(
        ".cylinder__text__item"
      ) as NodeListOf<HTMLElement>;
      const wrapper = sectionRef.current;

      function calculatePositions(): void {
        const offset = 0.4;
        const radius = Math.min(window.innerWidth, window.innerHeight) * offset;
        const spacing = 180 / textItems.length;

        textItems.forEach((item, index) => {
          const angle = (index * spacing * Math.PI) / 180;
          const rotationAngle = index * -spacing;

          const x = (window.innerWidth * 2) / 5;
          const y = Math.sin(angle) * radius;
          const z = Math.cos(angle) * radius;

          item.style.transform = `translate3d(-50%, -50%, 0) translate3d(${x}px, ${y}px, ${z}px) rotateX(${rotationAngle}deg)`;
        });
      }
      calculatePositions();

      ScrollTrigger.create({
        trigger: title,
        start: "center center",
        end: "+=2000svh",
        pin: wrapper,
        scrub: 2,
        animation: gsap.fromTo(
          textWrapper,
          { rotateX: -80 },
          { rotateX: 270, ease: "none" }
        ),
      });
    },
    { scope: sectionRef }
  );
  return (
    <section ref={sectionRef} className="cylinder__wrapper text-black dark:text-white">
      <p className="cylinder_trigger"></p>
      <ul className="cylinder__text__wrapper">
        <li className="cylinder__text__item">Speed</li>
        <li className="cylinder__text__item">Quality</li>
        <li className="cylinder__text__item">Reliability</li>
        <li className="cylinder__text__item">Security</li>
        <li className="cylinder__text__item">Experience</li>
        <li className="cylinder__text__item">Performance</li>
        <li className="cylinder__text__item">Innovation</li>
        <li className="cylinder__text__item">Usability</li>
        <li className="cylinder__text__item">Engagement</li>
        <li className="cylinder__text__item">Conversion graphic</li>
        <li className="cylinder__text__item">Efficiency</li>
        <li className="cylinder__text__item">Optimization</li>
      </ul>
    </section>
  );
};
