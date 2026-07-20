import { ArrowUpRight, Github } from "lucide-react";

import { projects, site } from "@/data/portfolio";

export function ProjectsSection() {
  return (
    <section id="projects" className="section-anchor relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="flex flex-col items-start">
            <span className="skeuo-chip text-primary">{projects.kicker}</span>
            <h2 className="font-display emboss mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
              {projects.title}
            </h2>
            <p className="text-muted-foreground mt-3 max-w-lg">{projects.subtitle}</p>
          </div>
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer"
            className="skeuo-btn-ghost flex shrink-0 items-center gap-2 rounded-full px-5 py-3 text-sm font-bold"
          >
            <Github className="size-4" />
            {projects.githubLabel}
          </a>
        </div>

        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
          {projects.items.map((project) => (
            <div
              key={project.title}
              className="skeuo-card group relative overflow-hidden rounded-3xl p-2.5"
            >
              <div className="relative h-[200px] overflow-hidden rounded-[1.25rem]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                <span className="skeuo-chip text-primary absolute top-3 left-3">{project.status}</span>
                <a
                  href={site.github}
                  target="_blank"
                  rel="noreferrer"
                  className="skeuo-btn-ghost absolute top-3 right-3 grid size-9 place-items-center rounded-full opacity-0 transition-opacity group-hover:opacity-100"
                  aria-label={`View ${project.title} on GitHub`}
                >
                  <ArrowUpRight className="size-4" />
                </a>
              </div>

              <div className="p-4">
                <h3 className="font-display text-lg font-bold">{project.title}</h3>
                <p className="text-primary mt-0.5 text-xs font-bold">{project.subtitle}</p>
                <p className="text-muted-foreground mt-3 line-clamp-3 text-sm leading-relaxed">
                  {project.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span key={tag} className="skeuo-chip !px-2.5 !py-1 !text-[11px]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
