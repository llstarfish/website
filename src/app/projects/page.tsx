import Image from "next/image";
import { getAllProjects } from "@/lib/projects";

export const metadata = {
  title: "Projects - Michael Shen",
  description: "Side projects and apps by Michael Shen.",
};

export default function ProjectsPage(): React.ReactElement {
  const projects = getAllProjects();

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="font-serif text-3xl font-semibold tracking-tight mb-2">
        Projects
      </h1>
      <p className="text-muted mb-10">Things I&apos;ve built.</p>

      {projects.length === 0 ? (
        <p className="text-muted">No projects yet.</p>
      ) : (
        <div className="space-y-3">
          {projects.map((project) => {
            const href = project.url || project.repo;
            const Card = (
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
                {project.image && (
                  <div className="shrink-0">
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={1440}
                      height={1024}
                      sizes="(max-width: 640px) 100vw, 176px"
                      className="w-full sm:w-44 rounded-md border border-border object-cover aspect-[45/32]"
                    />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <h2 className="font-serif text-lg font-medium tracking-tight group-hover:text-accent transition-colors">
                    {project.title}
                  </h2>
                  <p className="text-muted text-[0.95rem] leading-relaxed mt-1">
                    {project.description}
                  </p>
                  {project.tags.length > 0 && (
                    <p className="font-sans text-[0.72rem] uppercase tracking-[0.16em] text-muted mt-2">
                      {project.tags.join(" · ")}
                    </p>
                  )}
                </div>
              </div>
            );

            return href ? (
              <a
                key={project.slug}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block -mx-4 px-4 py-4 no-underline"
              >
                {Card}
              </a>
            ) : (
              <article
                key={project.slug}
                className="group -mx-4 px-4 py-4"
              >
                {Card}
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
