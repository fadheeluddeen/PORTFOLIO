import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeader, SectionShell } from "@/components/layout/section-shell";
import { marqueeSkills, skillGroups } from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger);

export function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const track = [...marqueeSkills, ...marqueeSkills];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power3.out",
            scrollTrigger: { trigger: headerRef.current, start: "top 85%", toggleActions: "play none none reverse" },
          }
        );
      }
      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, ease: "power3.out",
            scrollTrigger: { trigger: cardsRef.current, start: "top 85%", toggleActions: "play none none reverse" },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <SectionShell id="skills" className="py-0 md:py-0">
      <div ref={sectionRef} className="py-20 md:py-24">
        <div ref={headerRef}>
          <SectionHeader
            kicker="Chapter · Skills"
            title="The toolbox, laid bare."
            subtitle="Languages, ML frameworks, web stack, data tooling — what I reach for on a Tuesday morning."
          />
        </div>
      </div>
      <div className="border-border/60 overflow-hidden border-y py-4">
        <div className="animate-marquee flex w-max gap-3">
          {track.map((skill, index) => (
            <Badge key={`${skill}-${index}`} variant="outline" className="rounded-full px-3 py-1">{skill}</Badge>
          ))}
        </div>
      </div>
      <div ref={cardsRef} className="grid gap-5 py-20 md:grid-cols-2 xl:grid-cols-3">
        {skillGroups.map((group) => (
          <Card key={group.title} className="shadow-none">
            <CardHeader><CardTitle>{group.title}</CardTitle></CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {group.tags.map((tag) => <Badge key={tag} variant="secondary">{tag}</Badge>)}
            </CardContent>
          </Card>
        ))}
      </div>
    </SectionShell>
  );
}
