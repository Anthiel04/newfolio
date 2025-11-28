"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

type Props = {
  phrases?: string[];
  minVh?: number; // min vertical height in vh (default 150)
};

export default function InfiniteWordCarousel({ phrases, minVh = 150 }: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null);

  const defaultPhrases = [
    "software",
    "code",
    "design",
    "product",
    "cloud",
    "performance",
    "accessibility",
  ];

  const getWords = () => {
    if (phrases && phrases.length) return phrases;
    if (typeof window !== "undefined" && window.innerWidth < 640) {
      return defaultPhrases.slice(0, 4);
    }
    return defaultPhrases;
  };

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    let ctx: gsap.Context | null = null;
    let leftTween: gsap.core.Tween | null = null;
    let rightTween: gsap.core.Tween | null = null;

    async function setup() {
      const { ScrollTrigger } = await import("gsap/dist/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (!wrapRef.current) return;
      ctx = gsap.context(() => {
        const wrapper = wrapRef.current!;
        const leftTrack = wrapper.querySelector<HTMLElement>(".wc-left-track");
        const rightTrack = wrapper.querySelector<HTMLElement>(".wc-right-track");
        if (!leftTrack || !rightTrack) return;

        // Ensure the inner sets are inline-flex and measure one set
        const leftSet = leftTrack.querySelector<HTMLElement>(".wc-set");
        const rightSet = rightTrack.querySelector<HTMLElement>(".wc-set");
        if (!leftSet || !rightSet) return;

        // Duplicate sets until the track is wide enough to feel infinite.
        // Strategy: require track.scrollWidth >= viewportWidth * minCopiesFactor
        const vw = window.innerWidth;
        const minCopiesFactor = 6; // how many viewport widths to cover (tweakable)
        const ensureWideEnough = (track: HTMLElement, baseSet: HTMLElement) => {
          // If width is already enough, do nothing.
          let attempts = 0;
          while (track.scrollWidth < vw * minCopiesFactor && attempts < 30) {
            const clone = baseSet.cloneNode(true) as HTMLElement;
            track.appendChild(clone);
            attempts++;
          }
        };

        // make sure sets/layout don't wrap
        leftTrack.style.whiteSpace = "nowrap";
        rightTrack.style.whiteSpace = "nowrap";
        leftTrack.style.display = "inline-flex";
        rightTrack.style.display = "inline-flex";

        ensureWideEnough(leftTrack, leftSet);
        ensureWideEnough(rightTrack, rightSet);

        // Recompute widths after duplication
        const leftWidth = leftSet.offsetWidth; // width of single set
        const rightWidth = rightSet.offsetWidth;
        const leftTotal = leftTrack.scrollWidth;
        const rightTotal = rightTrack.scrollWidth;

        // debug info
        // eslint-disable-next-line no-console
        console.log("InfiniteWordCarousel widths:", {
          vw,
          leftSet: leftWidth,
          leftTotal,
          rightSet: rightWidth,
          rightTotal,
          minVh,
        });

        if (leftTotal === 0 || rightTotal === 0) return;

        // scroll length (how many pixels the user scrolls while pinned)
        const scrollLength = window.innerHeight * (minVh / 100);

        // Decide movement: move half the total track width so words visibly flow
        const leftMovement = leftTotal / 2;
        const rightMovement = rightTotal / 2;

        // left track: move left by leftMovement during pinned scroll
        leftTween = gsap.to(leftTrack, {
          x: -leftMovement,
          ease: "none",
          scrollTrigger: {
            trigger: wrapper,
            start: "top top",
            end: () => `+=${scrollLength}`,
            scrub: 0.6,
            pin: true,
            invalidateOnRefresh: true,
            // markers: true,
          },
        });

        // right track: move right by rightMovement
        rightTween = gsap.to(rightTrack, {
          x: rightMovement,
          ease: "none",
          scrollTrigger: {
            trigger: wrapper,
            start: "top top",
            end: () => `+=${scrollLength}`,
            scrub: 0.6,
            pin: true,
            invalidateOnRefresh: true,
            // markers: true,
          },
        });
      }, wrapRef);
    }

    setup();

    return () => {
      try {
        if (ctx) ctx.revert();
      } catch {}
      try {
        leftTween?.kill();
        rightTween?.kill();
      } catch {}
    };
  }, [phrases, minVh]);

  const words = getWords();

  return (
    <section
      ref={wrapRef}
      className={`w-full relative overflow-hidden bg-bg dark:bg-bg-dark pt-20`} // pt-20 to clear fixed header; change if your header is different
      aria-hidden="true"
    >
      {/* pinned area min 150vh so users can scroll a lot while words move */}
      <div className="w-full max-w-6xl px-6 py-12 min-h-[150vh] mx-auto">
        {/* LEFT TRACK */}
        <div className="wc-left-track overflow-hidden">
          <div className="wc-set inline-flex gap-8 items-center">
            {words.map((w, i) => (
              <span key={`l-${i}`} className="wc-word font-mono text-5xl sm:text-6xl md:text-7xl opacity-90 mr-8">
                {w}
              </span>
            ))}
          </div>
          {/* duplicated set (initially one clone) - duplication in JS will add more if needed */}
          <div className="wc-set inline-flex gap-8 items-center">
            {words.map((w, i) => (
              <span key={`l2-${i}`} className="wc-word font-mono text-5xl sm:text-6xl md:text-7xl opacity-90 mr-8">
                {w}
              </span>
            ))}
          </div>
        </div>

        <div className="h-12" />

        {/* RIGHT TRACK */}
        <div className="wc-right-track overflow-hidden">
          <div className="wc-set inline-flex gap-10 items-center">
            {words.map((w, i) => (
              <span key={`r-${i}`} className="wc-word font-mono text-4xl sm:text-5xl md:text-6xl opacity-80 mr-10">
                {w}
              </span>
            ))}
          </div>
          <div className="wc-set inline-flex gap-10 items-center">
            {words.map((w, i) => (
              <span key={`r2-${i}`} className="wc-word font-mono text-4xl sm:text-5xl md:text-6xl opacity-80 mr-10">
                {w}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
