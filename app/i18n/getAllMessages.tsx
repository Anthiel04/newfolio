import aboutEn from "../messages/en/about.json";
import commonEn from "../messages/en/common.json";
import contactEn from "../messages/en/contact.json";
import projectsEn from "../messages/en/projects.json";

import aboutEs from "../messages/es/about.json";
import commonEs from "../messages/es/common.json";
import contactEs from "../messages/es/contact.json";
import projectsEs from "../messages/es/projects.json";

export function getAllMessages(locale: string) {
  switch (locale) {
    case "en":
      return {
        about: aboutEn,
        common: commonEn,
        contact: contactEn,
        projects: projectsEn,
      };
    case "es":
      return {
        about: aboutEs,
        common: commonEs,
        contact: contactEs,
        projects: projectsEs,
      };
    default:
      return {
        about: aboutEn,
        common: commonEn,
        contact: contactEn,
        projects: projectsEn,
      };
  }
}
