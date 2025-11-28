import { isMobile } from "../../../lib/isMobile";

export const videoByWeather: Record<string, string> = {
  Clear: "/assets/hero/sunnyDe.mp4",
  Clouds: "/assets/hero/lightDe.mp4",
  Mist: "/assets/hero/lightDe.mp4",
  Fog: "/assets/hero/lightDe.mp4",
  Haze: "/assets/hero/lightDe.mp4",
  Rain: "/assets/hero/lightDe.mp4",
  Drizzle: "/assets/hero/lightDe.mp4",
  Snow: "/assets/hero/snowDe.mp4",
  Thunderstorm: "/assets/hero/thunderDe.mp4",
  Default: "/assets/hero/lightDe.mp4"
};

export const baseNames: Record<string, string> = {
  Clear: "sunny",
  Clouds: "light",
  Mist: "light",
  Fog: "light",
  Haze: "light",
  Rain: "light",
  Drizzle: "light",
  Snow: "snow",
  Thunderstorm: "thunder",
  Default: "sunny"
};


export function getVideoFor(weatherMain: string | undefined) {
  const base = baseNames[weatherMain ?? "Default"] ?? "sunny";

  // mobile vs desktop
  const variant = isMobile() ? "Mo" : "De";

  return {
    video: `/assets/hero/${base}${variant}.mp4`,
    poster: `/assets/hero/${base}${variant}.jpg`,
  };
}
