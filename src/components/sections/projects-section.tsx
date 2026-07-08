import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Github, MoveRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeader } from "@/components/layout/section-shell";
import { TiltCard } from "@/components/tilt-card";
import { projects, site } from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger);

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();

    // Desktop: pin the section and scrub the track horizontally
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const getDistance = () => track.scrollWidth - section.offsetWidth;

      const tween = gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressRef.current) {
              progressRef.current.style.width = `${self.progress * 100}%`;
            }
          },
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    // Mobile / reduced motion: simple stagger fade for the cards
    mm.add("(max-width: 1023px)", () => {
      const cards = track.children;
      const anim = gsap.fromTo(
        cards,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: track,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
      return () => {
        anim.scrollTrigger?.kill();
        anim.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="scroll-mt-20 overflow-hidden py-20 md:py-24 lg:flex lg:min-h-screen lg:flex-col lg:justify-center">
      <div className="mx-auto w-full max-w-6xl px-6">
        <SectionHeader kicker={projects.kicker} title={projects.title} subtitle={projects.subtitle} />
        <div className="mb-8 flex items-center justify-between">
          <p className="text-muted-foreground hidden items-center gap-2 text-sm lg:flex">
            Keep scrolling — the gallery slides sideways
            <MoveRight className="size-4 animate-pulse" />
          </p>
          <p className="text-muted-foreground text-sm lg:hidden">{projects.githubLabel}</p>
          <a href={site.github} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 inline-flex items-center gap-1.5 text-sm font-medium transition-colors">
            <Github className="size-4" /> View all
          </a>
        </div>
      </div>

      <div className="lg:pl-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))]">
        <div
          ref={trackRef}
          className="grid gap-6 px-6 md:grid-cols-2 lg:flex lg:w-max lg:gap-8 lg:px-0 lg:pr-24"
        >
          {projects.items.map((project) => (
            <TiltCard key={project.title} className="group lg:w-[420px] lg:shrink-0">
              <Card className="overflow-hidden border-0 bg-card/50 shadow-none backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-primary/10">
                <div className="relative aspect-video overflow-hidden">
                  <img src={project.image} alt={project.title} loading="lazy" className="size-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                  <Badge className="absolute top-3 left-3 rounded-full bg-background/80 text-xs backdrop-blur-sm">{project.panel}</Badge>
                  <div className="absolute right-3 bottom-3 flex gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <a href={site.github} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.title}`} className="bg-background/90 hover:bg-primary hover:text-primary-foreground flex size-8 items-center justify-center rounded-full backdrop-blur-sm transition-colors">
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
      </div>

      <div className="mx-auto mt-10 hidden w-full max-w-6xl px-6 lg:block">
        <div className="bg-border/60 h-1 w-full overflow-hidden rounded-full">
          <div ref={progressRef} className="bg-primary h-full w-0 rounded-full transition-[width] duration-150 ease-out" />
        </div>
      </div>
    </section>
  );
}
