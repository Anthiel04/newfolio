"use client";

import { useEffect, useState } from "react";

export const Stats = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const [loaded, setLoaded] = useState({
    stats: false,
    streak: false,
    trophies: false,
  });

  useEffect(() => {
    const stored = localStorage.getItem("theme") as "light" | "dark" | null;
    setTheme(stored ?? "light");

    const handler = () => {
      const updated = localStorage.getItem("theme") as "light" | "dark" | null;
      setTheme(updated ?? "light");
    };

    window.addEventListener("themeStorage", handler);
    return () => window.removeEventListener("themeStorage", handler);
  }, []);

  const streakUrl = `https://streak-stats.demolab.com?user=anthiel04&theme=${
    theme === "dark" ? "tokyonight" : "default"
  }`;

  const trophyUrl = `https://github-profile-trophy.vercel.app/?username=anthiel04&theme=${
    theme === "dark" ? "darkhub" : "flat"
  }`;

  const statsUrl = `https://github-readme-stats-git-masterrstaa-rickstaa.vercel.app/api?username=anthiel04&show_icons=true&theme=${
    theme === "dark" ? "tokyonight" : "default"
  }`;

  return (
    <div className="w-full mx-auto flex flex-col md:flex-row items-center justify-around gap-10 py-12 px-6">
      {/* COMPONENT */}
      {[
        { title: "Streak", src: streakUrl, key: "streak" },
        { title: "Trophies", src: trophyUrl, key: "trophies" },
      ].map(({ title, src, key }) => (
        <div key={key} className="flex flex-col items-center w-full max-w-2xl">
          <h3 className="text-3xl dark:text-white text-center mb-4">{title}</h3>

          {/* Loader */}
          {!loaded[key as keyof typeof loaded] && (
            <div className="w-full h-[180px] flex items-center justify-center">
              <div className="animate-spin rounded-full h-10 w-10 border-4 border-accent border-t-transparent"></div>
            </div>
          )}

          {/* Imagen */}
          <img
            src={src}
            alt={title}
            className={`w-full h-full transition-opacity duration-700 ${
              loaded[key as keyof typeof loaded] ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() =>
              setLoaded((prev) => ({ ...prev, [key]: true }))
            }
          />
        </div>
      ))}
    </div>
  );
};
