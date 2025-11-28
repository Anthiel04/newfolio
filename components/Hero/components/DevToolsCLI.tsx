"use client";

import { useEffect } from "react";
import { useWeather } from "../hooks/useWeather";

export default function DevtoolsCLI() {
  const { weather, city } = useWeather();

  useEffect(() => {
    // @ts-ignore
    window.weatherCLI = {
      weather: () => {
        if (!weather) {
          console.log("⚠️ Weather data not available yet.");
          return;
        }

        const weatherMain = weather.weather?.[0]?.main ?? "Unknown";
        const temp = Math.round(weather.main?.temp ?? 0);
        const desc = weather.weather?.[0]?.description ?? "";
        const cityName = city ?? "Unknown";

        console.log(
          `%cWeather in ${cityName}: %c${weatherMain} — ${temp}°C — ${desc}`,
          "color: cyan; font-weight: bold;",
          "color: white;"
        );
        return { city: cityName, weather: weatherMain, temp, desc };
      },

      time: () => {
        const now = new Date();
        console.log(`%cCurrent Time: ${now.toLocaleTimeString()}`, "color: yellow; font-weight: bold;");
        return now;
      },

      cv: () => {
        console.log("%cHey just hit the button on the hero", "color: green; font-weight: bold;");
        return "Please?";
      },

      projects: () => {
        console.log("%cI have a special project somewhere hehe", "color: orange; font-weight: bold;");
        return "#easterEgg";
      },

      help: () => {
        console.log("%cAvailable commands: weather, time, cv, projects, help", "color: purple; font-weight: bold;");
      },
    };

    console.log("%cDevTools CLI loaded! Type %cweatherCLI.help()%c to see commands.",
      "color: lime; font-weight: bold;",
      "color: white; font-weight: normal;",
      "color: lime; font-weight: bold;"
    );
  }, [weather, city]);

  return null;
}
