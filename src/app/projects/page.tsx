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
        <div className="space-y-1">
          {projects.map((project) => {
            const href = project.url || project.repo;
            const Card = (
              <div className="flex gap-4">
                {project.image && (
                  <div className="shrink-0 mt-0.5">
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={80}
                      height={80}
                      className="rounded-md object-cover w-20 h-20 border border-border"
                    />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <h2 className="font-serif text-lg font-medium group-hover:text-accent transition-colors">
                    {project.title}
                  </h2>
                  <p className="text-muted text-[0.95rem] leading-relaxed mt-1">
                    {project.description}
                  </p>

                  {project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-sans text-xs px-2 py-0.5 rounded-full border border-border text-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
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
                className="group block -mx-4 px-4 py-5 no-underline"
              >
                {Card}
              </a>
            ) : (
              <article
                key={project.slug}
                className="group -mx-4 px-4 py-5"
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
