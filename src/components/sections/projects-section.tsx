import { ArrowUpRight, Github } from "lucide-react";

import { projects, site } from "@/data/portfolio";

export function ProjectsSection() {
  return (
    <section id="projects" className="section-anchor relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="text-primary text-sm font-bold tracking-wide uppercase">
              {projects.kicker}
            </span>
            <h2 className="font-display mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
              {projects.title}
            </h2>
            <p className="text-muted-foreground mt-3 max-w-lg">{projects.subtitle}</p>
          </div>
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer"
            className="glass-panel btn-3d flex shrink-0 items-center gap-2 rounded-full px-5 py-3 text-sm font-bold"
          >
            <Github className="size-4" />
            {projects.githubLabel}
          </a>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.items.map((project) => (
            <div
              key={project.title}
              className="tilt-card group bg-card border-border/60 relative overflow-hidden rounded-3xl border"
            >
              <div className="relative h-[200px] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <span className="bg-3d absolute top-4 left-4 rounded-full px-3 py-1 text-xs font-bold">
                  {project.status}
                </span>
              </div>

              <div className="p-6">
                <h3 className="font-display text-lg font-bold">{project.title}</h3>
                <p className="text-primary mt-0.5 text-xs font-bold">{project.subtitle}</p>
                <p className="text-muted-foreground mt-3 line-clamp-3 text-sm leading-relaxed">
                  {project.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-accent text-accent-foreground rounded-full px-2.5 py-1 text-[11px] font-bold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <a
                href={site.github}
                target="_blank"
                rel="noreferrer"
                className="absolute top-4 right-4 flex size-9 items-center justify-center rounded-full bg-white/90 text-black opacity-0 shadow-lg transition-opacity group-hover:opacity-100"
                aria-label={`View ${project.title} on GitHub`}
              >
                <ArrowUpRight className="size-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
