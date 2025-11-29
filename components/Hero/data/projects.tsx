export const getProjects = (theme: string ) => {
  const t = theme ?? "light";

  return [
    {
      image: "/assets/showcase/kpanelclosed.webp",
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
    {
      image: "/assets/projects/commerce.webp",
    },
    {
      image: "/assets/showcase/memes.webp",
    },
    {
      image: "/assets/showcase/news.webp",
    },
    {
      image: "/assets/showcase/blog.webp",
    },
    {
      image: "/assets/showcase/kpanel.webp",
    },
    {
      image: "/assets/showcase/eion.webp",
    },

  ];
};
