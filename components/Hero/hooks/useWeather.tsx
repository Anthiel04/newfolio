"use client";

import { useLocale } from "next-intl";
import { useEffect, useState } from "react";

export function useWeather() {
  const [weather, setWeather] = useState<any>(null);
  const [city, setCity] = useState<string>("");
  const locale = useLocale()
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=${locale}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_KEY}`
      );

      const data = await res.json();
      setWeather(data);
      setCity(data.name);
    });
  }, []);

  return { weather, city };
}
