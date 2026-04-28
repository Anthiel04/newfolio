import { Project } from "../../../types/project";

export function linksWithLocale(locale: string): Project[] {
  return [
    {
      id: "1",
      titleKey: "project1.title",
      descKey: "project1.description",
      image: "/assets/projects/kcommerce.webp",
      link: "/" + locale + "/project1",
    },
    {
      id: "2",
      titleKey: "project2.title",
      descKey: "project2.description",
      image: "/assets/projects/kblog.png",
      link: "/" + locale + "/project2",
    },
    {
      id: "3",
      titleKey: "project3.title",
      descKey: "project3.description",
      image: "/assets/projects/kadmin.png",
      link: "/" + locale + "/project3",
    },
    {
      id: "4",
      titleKey: "project4.title",
      descKey: "project4.description",
      image: "/assets/projects/python.webp",
      link: "/" + locale + "/project4",
    },
    {
      id: "5",
      titleKey: "project5.title",
      descKey: "project5.description",
      image: "/assets/projects/cag.png",
      link: "/" + locale + "/project5",
    },
    {
      id: "6",
      titleKey: "project6.title",
      descKey: "project6.description",
      image: "/assets/projects/python.webp",
      link: "/" + locale + "/project6",
    },
    {
      id: "7",
      titleKey: "project7.title",
      descKey: "project7.description",
      image: "/assets/projects/python.webp",
      link: "/" + locale + "/project7",
    },
  ];
}