"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef } from "react";

gsap.registerPlugin(useGSAP); // register any plugins, including the useGSAP hook

type Props = { children: React.ReactNode };
export default function HorizontalScroll({ children }: Props) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    let stInstance: any | null = null;

    gsap.registerPlugin(ScrollTrigger);

    if (!wrapperRef.current || !innerRef.current) return;

    const inner = innerRef.current!;
    const wrapper = wrapperRef.current!;

    // Convert children in DOM into panels: we used Tailwind classes below,
    // but ensure DOM layout is consistent (flex row).
    inner.style.display = "flex";
    inner.style.flexWrap = "nowrap";
    inner.style.height = "100vh";
    inner.style.willChange = "transform";

    // ensure each direct child of inner is full-viewport panel
    const panels = Array.from(inner.children) as HTMLElement[];
    panels.forEach((p) => {
      // Tailwind already sets width/height via classes; ensure flex behavior:
      p.classList.add("flex-none", "w-screen", "h-screen");
      p.style.boxSizing = "border-box";
    });

    // total horizontal distance to scroll
    let totalScroll = inner.scrollWidth - window.innerWidth;
    if (totalScroll <= 0) {
      // nothing to do (panels not wider than viewport)
      return;
    }

    stInstance = gsap.to(inner, {
      x: -(inner.scrollWidth - window.innerWidth),
      ease: "none",
      scrollTrigger: {
        trigger: wrapper,
        start: "top top",
        end: () => `+=${inner.scrollWidth - window.innerWidth}`,
        scrub: 1,
        pin: true,
        invalidateOnRefresh: true,
        snap: {
          snapTo: 1 / (panels.length - 1),
          duration: 0.4,
          ease: "power1.out",
          directional: true,
        },
      },
    });

    let resizeTimer: number;

    const handleResize = () => {
      // Reiniciamos el temporizador
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        ScrollTrigger.refresh()
      }, 150);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
    };
  });

  return (
    <section ref={wrapperRef} className="relative w-full overflow-hidden">
      <div ref={innerRef} className="flex">
        {/* We map children into direct siblings (panels). If children are already wrapper elements,
            they remain. If you pass components that include root elements, they'll be panels. */}
        {React.Children.map(children, (child, i) => (
          <div key={i} className="h-panel flex-none w-screen h-screen">
            {child}
          </div>
        ))}
      </div>
    </section>
  );
}
