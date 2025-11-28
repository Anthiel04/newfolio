"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

export default function TerminalEgg() {
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  const commands = ["> weather", "> time", "> cv", "> projects"];

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;

    // Animación de apertura/cierre
    if (open) {
      gsap.fromTo(
        el,
        { opacity: 0, scale: 0.9, y: 10 },
        { opacity: 1, scale: 1, y: 0, duration: 0.25, ease: "power2.out" }
      );
    } else {
      gsap.to(el, {
        opacity: 0,
        scale: 0.95,
        y: 10,
        duration: 0.2,
        ease: "power2.in",
      });
    }
  }, [open]);

  return (
    <div className="fixed bottom-4 right-4 text-xs z-50 select-none">
      <button
        onClick={() => setOpen(!open)}
        className="opacity-50 hover:opacity-100 transition bg-black font-mono px-2 py-1 border rounded-md
                   border-white/30 dark:border-white/20 dark:text-white text-white"
        aria-label="Toggle terminal"
      >
        {open ? "✕" : ">_"}
      </button>

      <div
        ref={boxRef}
        style={{ pointerEvents: open ? "auto" : "none" }}
        className="absolute right-0 bottom-full mb-2 w-40 p-3 rounded-md border backdrop-blur-md font-mono
                   bg-black/70 dark:bg-white/10 text-white border-white/10"
      >
        {commands.map((cmd, i) => (
          <p key={i}>{cmd}</p>
        ))}
      </div>
    </div>
  );
}
