import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeader, SectionShell } from "@/components/layout/section-shell";
import { experience } from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger);

export function ExperienceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      if (timelineRef.current) {
        gsap.fromTo(
          timelineRef.current.children,
          { opacity: 0, x: -60, scale: 0.97 },
          {
            opacity: 1, x: 0, scale: 1, duration: 0.7, stagger: 0.2, ease: "power3.out",
            scrollTrigger: { trigger: timelineRef.current, start: "top 80%", toggleActions: "play none none reverse" },
          }
        );
      }
      if (educationRef.current) {
        gsap.fromTo(
          educationRef.current.children,
          { opacity: 0, x: 60, scale: 0.97 },
          {
            opacity: 1, x: 0, scale: 1, duration: 0.7, stagger: 0.15, ease: "power3.out",
            scrollTrigger: { trigger: educationRef.current, start: "top 80%", toggleActions: "play none none reverse" },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <SectionShell id="experience">
      <SectionHeader kicker={experience.kicker} title={experience.title} subtitle={experience.subtitle} />
      <div ref={sectionRef} className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
        <div ref={timelineRef} className="relative space-y-6 border-l pl-8">
          {experience.jobs.map((job) => (
            <div key={job.company} className="relative">
              <span className="bg-primary absolute top-6 -left-[41px] size-3 rounded-full ring-4 ring-background" />
              <Card className="shadow-none">
                <CardContent className="space-y-4 pt-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary">{job.role}</Badge>
                    <span className="text-primary font-semibold">@ {job.company}</span>
                    <Badge variant="outline">{job.location}</Badge>
                  </div>
                  <p className="text-muted-foreground text-xs font-semibold tracking-[0.16em] uppercase">{job.period}</p>
                  <ul className="space-y-2">
                    {job.bullets.map((bullet) => (
                      <li key={bullet.slice(0, 30)} className="text-muted-foreground flex gap-2 text-sm">
                        <span className="text-primary mt-1.5 size-1.5 shrink-0 rounded-full" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {job.tags.map((tag) => <Badge key={tag} variant="outline" className="text-[10px]">{tag}</Badge>)}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
        <div ref={educationRef} className="space-y-6">
          <Card className="shadow-none">
            <CardHeader><CardTitle>Education</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {experience.education.map((edu) => (
                <div key={edu.school}>
                  <p className="font-semibold">{edu.school}</p>
                  <p className="text-muted-foreground text-sm whitespace-pre-line">{edu.detail}</p>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card className="shadow-none">
            <CardHeader><CardTitle>Certifications</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {experience.certifications.map((cert) => (
                <div key={cert} className="flex items-center gap-2">
                  <span className="text-primary size-2 rounded-full" />
                  <p className="text-muted-foreground text-sm">{cert}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </SectionShell>
  );
}
