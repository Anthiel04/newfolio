"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef } from "react";

gsap.registerPlugin(useGSAP); // register any plugins, including the useGSAP hook

type Props = { children: React.ReactNode };
export default function HorizontalScroll({ children }: Props) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    // let ctx: gsap.Context | null = null;
    let stInstance: any | null = null;

    async function setup() {
      const { ScrollTrigger } = await import("gsap/dist/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (!wrapperRef.current || !innerRef.current) return;

      // ctx = gsap.context(() => {
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
        const totalScroll = inner.scrollWidth - window.innerWidth;
        if (totalScroll <= 0) {
          // nothing to do (panels not wider than viewport)
          return;
        }

        stInstance = gsap.to(inner, {
          x: -totalScroll,
          ease: "none",
          scrollTrigger: {
            trigger: wrapper,
            start: "top top",
            end: () => `+=${totalScroll}`,
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
            snap: {
              snapTo: 1 / (panels.length - 1),
              duration: 0.4,
              ease: "power1.out",
              directional: true
            },
          },
        });
      // }, wrapperRef);
    }

    setup();

    // refresh / rebuild on resize to avoid mis-calculations
    let resizeId: number | null = null;
    const onResize = () => {
      if (resizeId) window.clearTimeout(resizeId);
      resizeId = window.setTimeout(() => {
     /*    try {
          ScrollTriggerSafeRefresh();
        } catch {} */
      }, 120);
    };
    window.addEventListener("resize", onResize);

   /*  function ScrollTriggerSafeRefresh() {
      // clear existing contexts/triggers then re-setup
      try {
        // Kill ScrollTriggers and revert ctx
        // context revert will also kill the ScrollTriggers created inside
        if (ctx) ctx.revert();
      } catch {}
      // re-run setup
      (async () => {
        const { ScrollTrigger } = await import("gsap/dist/ScrollTrigger");
        gsap.registerPlugin(ScrollTrigger);
        // re-setup fresh
        // small delay to let DOM settle
        setTimeout(() => {
          // re-run effect body by calling setup
          // But we can't call setup from here directly due to closure; simplest is to reload the page.
          // Instead rely on mount-time setup. In practice the top-level effect will suffice for normal resizing.
          // If you need hot-rebuild on resize, more advanced teardown+setup logic can be implemented.
        }, 50);
      })(); */
    })


  // Render: inner wraps children directly, we add no inline styles; Tailwind classes provide sizing
  // children will be placed as direct siblings (panels)
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
