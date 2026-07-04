import { ArrowDown, Download, MapPin } from "lucide-react";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ParticleHero } from "@/components/particle-hero";
import { hero, site } from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const image = imageRef.current;
    if (!section || !content || !image) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        content.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.12,
          ease: "power3.out", delay: 0.2,
        }
      );

      gsap.fromTo(
        image,
        { opacity: 0, scale: 0.9, x: 60 },
        { opacity: 1, scale: 1, x: 0, duration: 1, ease: "power3.out", delay: 0.5 }
      );

      gsap.to(image, {
        y: -80,
        ease: "none",
        scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: 1 },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="top" className="relative overflow-hidden pt-12 pb-20 md:pt-16 md:pb-28">
      <ParticleHero />
      <div className="from-primary/5 via-background/80 to-background pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]" />
      <div className="relative z-10 mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div ref={contentRef} className="space-y-8">
          <Badge variant="secondary" className="rounded-full px-3 py-1">✦ {hero.kicker}</Badge>
          <div className="space-y-4">
            <h1 className="text-4xl leading-[1.05] font-bold tracking-tight sm:text-5xl lg:text-6xl">
              {hero.headline}<br /><span className="text-primary">{hero.highlight}</span>
            </h1>
            <p className="text-muted-foreground max-w-xl text-lg leading-relaxed">{hero.tagline}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button asChild size="lg">
              <a href="#projects"><ArrowDown />See my work</a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href={site.resumePath} download><Download />Download CV</a>
            </Button>
            <Badge variant="outline" className="rounded-full px-3 py-1.5">
              <MapPin className="size-3.5" />{site.location}
            </Badge>
          </div>
          <div className="grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-4">
            {hero.stats.map((stat) => (
              <Card key={stat.label} className="py-4 shadow-none">
                <CardContent className="space-y-1 px-4">
                  <p className="text-primary text-xl font-bold">{stat.value}</p>
                  <p className="text-muted-foreground text-[11px] font-semibold tracking-[0.16em] uppercase">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <div ref={imageRef} className="relative mx-auto w-full max-w-md">
          <Card className="overflow-hidden py-0 shadow-lg">
            <div className="relative aspect-[4/5]">
              <img src={site.profilePath} alt={`Portrait of ${site.name}`} className="size-full object-cover" />
              <Badge className="absolute top-4 left-4 rounded-full">{hero.badge}</Badge>
              <div className="bg-background/95 absolute left-4 bottom-4 rounded-lg border px-3 py-2">
                <p className="text-primary text-sm font-semibold">{hero.caption.title}</p>
                <p className="text-muted-foreground text-[10px] font-semibold tracking-[0.16em] uppercase">{hero.caption.subtitle}</p>
              </div>
            </div>
          </Card>
          <Card className="absolute -right-2 -bottom-4 max-w-[220px] rotate-2 py-3 shadow-md">
            <CardContent className="px-4">
              <p className="font-semibold">{hero.floatBadge.primary}</p>
              <p className="text-muted-foreground text-[10px] font-semibold tracking-[0.16em] uppercase">{hero.floatBadge.secondary}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
