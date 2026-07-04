import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Github } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeader, SectionShell } from "@/components/layout/section-shell";
import { TiltCard } from "@/components/tilt-card";
import { projects, site } from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger);

export function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { opacity: 0, y: 80, rotateX: 15 },
          {
            opacity: 1, y: 0, rotateX: 0, duration: 0.8, stagger: 0.15, ease: "power3.out",
            scrollTrigger: { trigger: cardsRef.current, start: "top 85%", toggleActions: "play none none reverse" },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <SectionShell id="projects">
      <SectionHeader kicker={projects.kicker} title={projects.title} subtitle={projects.subtitle} />
      <div className="mb-8 flex items-center justify-between">
        <p className="text-muted-foreground text-sm">{projects.githubLabel}</p>
        <a href={site.github} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 inline-flex items-center gap-1.5 text-sm font-medium transition-colors">
          <Github className="size-4" /> View all
        </a>
      </div>
      <div ref={cardsRef} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.items.map((project) => (
          <TiltCard key={project.title} className="group">
            <Card className="overflow-hidden border-0 bg-card/50 shadow-none backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-primary/5">
              <div className="relative aspect-video overflow-hidden">
                <img src={project.image} alt={project.title} className="size-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                <Badge className="absolute top-3 left-3 rounded-full bg-background/80 text-xs backdrop-blur-sm">{project.panel}</Badge>
                <div className="absolute right-3 bottom-3 flex gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <a href="#" className="bg-background/90 hover:bg-primary hover:text-primary-foreground flex size-8 items-center justify-center rounded-full backdrop-blur-sm transition-colors">
                    <ExternalLink className="size-4" />
                  </a>
                </div>
              </div>
              <CardContent className="space-y-3 pt-4">
                <h3 className="text-lg font-semibold leading-tight">{project.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.tags.map((tag) => <Badge key={tag} variant="secondary" className="text-[10px]">{tag}</Badge>)}
                </div>
              </CardContent>
            </Card>
          </TiltCard>
        ))}
      </div>
    </SectionShell>
  );
}
