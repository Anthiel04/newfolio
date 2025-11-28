"use client";

import { useEffect, useState } from "react";

export default function Time() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const id = setInterval(() => {
      const d = new Date();
      setTime(d.toLocaleTimeString("es-ES", { hour12: false }));
    }, 1000);

    return () => clearInterval(id);
  }, []);

  return (
    <p className="font-mono text-sm opacity-80">{time}</p>
  );
}
