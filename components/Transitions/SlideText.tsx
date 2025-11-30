"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

const words = [
  "code",
  "dev",
  "debug",
  "code",
  "dev",
  "debug",
  "code",
  "dev",
  "debug",
  "code",
  "dev",
  "debug",
  "code",
  "dev",
  "debug",
  "code",
  "dev",
  "debug",
  "code",
  "dev",
  "debug",
  "code",
  "dev",
  "debug",
  "code",
  "dev",
  "debug",
  "code",
  "dev",
  "debug",
  "code",
  "dev",
  "debug",
  "code",
  "dev",
  "debug",
  "code",
  "dev",
  "debug",
  "code",
  "dev",
  "debug",
  "code",
  "dev",
  "debug",
  "code",
  "dev",
  "debug",
  "code",
  "dev",
  "debug",
  "code",
  "dev",
  "debug",
  "code",
  "dev",
  "debug",
  "code",
  "dev",
  "debug",
  "code",
  "dev",
  "debug",
  "code",
  "dev",
  "debug",
  "code",
  "dev",
  "debug",
  "code",
  "dev",
  "debug",
  "code",
  "dev",
  "debug",
  "code",
  "dev",
  "debug",
  "code",
  "dev",
  "debug",
];

export const SlideText = () => {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      gsap.registerPlugin(ScrollTrigger);

      const wrapper = sectionRef.current;

      ScrollTrigger.create({
        trigger: wrapper,
        start: "top 50%",
        end: "bottom 0%",
        scrub: 2,
        animation: gsap.fromTo(
          wrapper,
          { rotateZ: 0, scale: 1 },
          { rotateZ: 90, scale: 3, ease: "none" }
        ),
      });

      ScrollTrigger.create({
        trigger: wrapper,
        start: "top 80%",
        end: "bottom 20%",
        scrub: 0.5,
        animation: gsap.fromTo(
          ".trigger1",
          { x: -2000, opacity: 1 },
          { x: 0, opacity: 0, ease: "none" }
        ),
      });

      ScrollTrigger.create({
        trigger: wrapper,
        start: "top 80%",
        end: "bottom 20%",
        scrub: 2,
        animation: gsap.fromTo(
          ".trigger2",
          { translateX: 0, opacity: 1 },
          { translateX: -2000, opacity: 0, ease: "none" }
        ),
      });

      ScrollTrigger.create({
        trigger: wrapper,
        start: "top 80%",
        end: "bottom 20%",
        scrub: 2,
        animation: gsap.fromTo(
          ".trigger3",
          { translateX: -2000, opacity: 1 },
          { translateX: 0, opacity: 0, ease: "none" }
        ),
      });
    },
    { scope: sectionRef }
  );
  return (
    <div className="h-screen overflow-hidden">
      <section
        ref={sectionRef}
        className="wrapper flex flex-col gap-8 overflow-hidden my-20 bg-gray-800 text-white dark:bg-white dark:text-black py-12"
      >
        <ul className="flex gap-3 md:gap-6 trigger1">
          {words.map((val, i) => {
            return (
              <li className="text_item text-7xl" key={"medium" + i}>
                {val}
              </li>
            );
          })}
        </ul>
        <ul className="flex gap-3 md:gap-6 trigger2">
          {words.map((val, i) => {
            return (
              <li className="text_item text-9xl" key={"large" + i}>
                {val.charAt(0).toUpperCase() + val.slice(1)}
              </li>
            );
          })}
        </ul>
        <ul className="flex gap-3 md:gap-6 trigger3">
          {words.map((val, i) => {
            return (
              <li className="text_item text-4xl" key={"small" + i}>
                {val}
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
};
