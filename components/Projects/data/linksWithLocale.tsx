import { Project } from "../../../types/project";

export function linksWithLocale(locale: string): Project[] {
  return [
    {
      id: "1",
      titleKey: "project1.title",
      descKey: "project1.description",
      image: "/assets/projects/commerce.webp",
      link: "/" + locale + "/project1",
    },
    {
      id: "2",
      titleKey: "project2.title",
      descKey: "project2.description",
      image: "/assets/projects/python.webp",
      link: "/" + locale + "/project2",
    },
    {
      id: "3",
      titleKey: "project3.title",
      descKey: "project3.description",
      image: "/assets/projects/python.webp",
      link: "/" + locale + "/project3",
    },
  ];
}