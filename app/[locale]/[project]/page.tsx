import { getTranslations } from "next-intl/server";
import Link from "next/link";

type ProjectDetails = {
  image: string;
  github: string | false;
  preview: string | false;
};

const PROJECTS: Record<string, ProjectDetails> = {
  project1: {
    image: "/assets/projects/commerce.webp",
    github: false,
    preview: "https://project1.vercel.app",
  },
  project2: {
    image: "/assets/projects/python.webp",
    github: "https://github.com/anthiel04/project2",
    preview: false,
  },
  project3: {
    image: "/assets/projects/python.webp",
    github: "https://github.com/anthiel04/project2",
    preview: false,
  },
};

export default async function Page({
  params,
}: {
  params: { project: string; locale: string };
}) {
  const values = await params;
  const t = await getTranslations({
    locale: values.locale,
    namespace: "projects",
  });
  console.log(t);
  const project = PROJECTS[values.project] ?? {
    image: "",
    github: "#",
    preview: "#",
  };

  return (
    <div className="min-h-screen mt-20 p-12">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold">{t(`${values.project}.title`)}</h1>

        <p>{t(`${values.project}.description`)}</p>

        <div className="flex gap-4">
          {project.github && (
            <Link
              href={project.github}
              className="px-4 py-2 bg-black dark:bg-gray-200 text-white dark:text-black rounded-lg"
            >
              GitHub
            </Link>
          )}

          {project.preview && (
            <Link
              href={project.preview}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Preview
            </Link>
          )}
        </div>

        <div className="rounded-3xl overflow-hidden w-full h-96 bg-neutral-200 dark:bg-neutral-800">
          {project.image ? (
            <img
              src={project.image}
              alt={t(`${values.project}.title`)}
              className="w-full h-full bg-accent-foreground object-contain md:object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center opacity-50">
              No image
            </div>
          )}
        </div>

        <p>{t(`${values.project}.story`)}</p>
      </div>
    </div>
  );
}
