import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeader, SectionShell } from "@/components/layout/section-shell";
import { about, site } from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger);

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      if (leftRef.current) {
        gsap.fromTo(
          leftRef.current.children,
          { opacity: 0, x: -60 },
          {
            opacity: 1, x: 0, duration: 0.8, stagger: 0.15, ease: "power3.out",
            scrollTrigger: { trigger: leftRef.current, start: "top 80%", toggleActions: "play none none reverse" },
          }
        );
      }
      if (rightRef.current) {
        gsap.fromTo(
          rightRef.current.children,
          { opacity: 0, x: 60, scale: 0.95 },
          {
            opacity: 1, x: 0, scale: 1, duration: 0.7, stagger: 0.12, ease: "power3.out",
            scrollTrigger: { trigger: rightRef.current, start: "top 80%", toggleActions: "play none none reverse" },
          }
        );
      }
      if (badgesRef.current) {
        gsap.fromTo(
          badgesRef.current.children,
          { opacity: 0, scale: 0.8, y: 20 },
          {
            opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "back.out(1.7)",
            scrollTrigger: { trigger: badgesRef.current, start: "top 90%", toggleActions: "play none none reverse" },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <SectionShell id="about">
      <SectionHeader kicker={about.kicker} title={about.title} subtitle={about.subtitle} />
      <div ref={sectionRef} className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div ref={leftRef} className="space-y-6">
          <Card className="shadow-none">
            <CardContent className="space-y-4 pt-6">
              {about.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 24)} className="text-muted-foreground leading-relaxed">{paragraph}</p>
              ))}
            </CardContent>
          </Card>
          <div className="flex items-center gap-3">
            <img src={site.profilePath} alt="" aria-hidden="true" className="size-12 rounded-lg border object-cover" />
            <div>
              <p className="font-semibold">{site.name}</p>
              <p className="text-muted-foreground text-xs font-semibold tracking-[0.2em] uppercase">{site.title}</p>
            </div>
          </div>
        </div>
        <div ref={rightRef} className="grid gap-4 sm:grid-cols-2">
          {about.cards.map((card) => (
            <Card key={card.label} className="shadow-none">
              <CardContent className="space-y-3 pt-6">
                <div className="bg-primary/10 flex size-10 items-center justify-center rounded-lg text-lg">{card.icon}</div>
                <p className="text-muted-foreground text-xs font-semibold tracking-[0.18em] uppercase">{card.label}</p>
                <p className="font-semibold">{card.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <div ref={badgesRef} className="mt-8 flex flex-wrap gap-3">
        {about.achievements.map((item) => (
          <Badge key={item} variant="secondary" className="rounded-full px-3 py-1.5">🏆 {item}</Badge>
        ))}
      </div>
    </SectionShell>
  );
}
