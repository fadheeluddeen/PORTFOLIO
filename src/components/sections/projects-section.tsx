import { ArrowUpRight, Github } from "lucide-react";
import { projects, site } from "@/data/portfolio";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".bento-card",
        { y: 100, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.1,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const getBentoClass = (index: number) => {
    // Premium Bento Grid Mapping
    if (index === 0) return "md:col-span-2 xl:col-span-2 min-h-[450px]"; // Hero feature
    if (index === 3) return "md:col-span-2 xl:col-span-2 min-h-[400px]"; // Secondary large
    if (index === 6) return "md:col-span-2 xl:col-span-3 min-h-[400px]"; // Massive footer feature
    return "col-span-1 min-h-[350px]";
  };

  return (
    <section id="projects" className="relative py-32 overflow-hidden bg-background shrink-0 w-full z-10">

      {/* Editorial Title */}
      <div className="mx-auto max-w-7xl px-6 lg:px-12 relative z-10">
        <div className="mb-20 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end border-b border-border pb-12">
          <div className="flex flex-col items-start">
            <span className="text-secondary font-bold tracking-widest uppercase text-sm mb-4">
              {projects.kicker}
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-foreground leading-none">
              Featured <span className="text-3d italic">Work</span>.
            </h2>
            <p className="text-muted-foreground mt-6 text-lg max-w-xl font-medium leading-relaxed">
              {projects.subtitle}
            </p>
          </div>
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer"
            className="skeuo-btn-ghost flex shrink-0 items-center gap-3 rounded-full px-6 py-4 text-sm font-bold shadow-lg"
          >
            <Github className="size-5" />
            {projects.githubLabel}
          </a>
        </div>

        {/* Bento Grid */}
        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-auto">
          {projects.items.map((project, i) => (
            <div
              key={project.title}
              className={`bento-card group relative overflow-hidden rounded-[2.5rem] bg-card border border-white/10 shadow-2xl ${getBentoClass(i)}`}
            >
              {/* Background Image full cover */}
              <div className="absolute inset-0 w-full h-full">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110 filter saturate-50 group-hover:saturate-100"
                  loading="lazy"
                />
              </div>

              {/* Advanced Gradient Overlays for text legibility and premium feel */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent opacity-80" />

              <span className="absolute top-6 left-6 inline-flex items-center rounded-full bg-surface-tertiary px-3 py-1 text-xs font-bold text-muted-foreground border border-white/10 z-20 backdrop-blur-md">
                {project.status}
              </span>

              <a
                href={site.github}
                target="_blank"
                rel="noreferrer"
                className="absolute top-6 right-6 flex size-12 items-center justify-center rounded-full bg-foreground text-background opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 z-20 hover:scale-110 shadow-xl"
                aria-label={`View ${project.title} on GitHub`}
              >
                <ArrowUpRight className="size-5" />
              </a>

              {/* Content area pushed to bottom */}
              <div className="relative h-full w-full p-8 md:p-10 flex flex-col justify-end z-10 transition-transform duration-500 group-hover:-translate-y-2">

                <p className="text-secondary font-bold text-sm tracking-widest uppercase mb-3 drop-shadow-md transform transition-all duration-500 group-hover:translate-x-2">
                  {project.subtitle}
                </p>
                <h3 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight drop-shadow-md">
                  {project.title}
                </h3>

                <p className="text-muted-foreground/90 max-w-2xl line-clamp-2 md:line-clamp-3 text-base leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                  {project.description}
                </p>

                <div className="mt-8 flex flex-wrap gap-2.5 opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-4 py-1.5 rounded-full text-xs font-semibold bg-surface-secondary/50 text-foreground border border-white/10 shadow-sm backdrop-blur-md hover:bg-gold/20 hover:text-gold transition-colors">
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
