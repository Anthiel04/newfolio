export const getProjects = (theme: string ) => {
  const t = theme ?? "light";

  return [
    {
      image: "/assets/showcase/K-Mart.webp",
    },

    {
      image:
        t === "dark"
          ? "/assets/showcase/portfolio-dark.webp"
          : "/assets/showcase/portfolio-light.webp",
    },
    {
      image:
        t === "dark"
          ? "/assets/showcase/services-dark.webp"
          : "/assets/showcase/services-light.webp",
    },
    {
      image: "/assets/showcase/vanilla.webp",
    },
  ];
};
