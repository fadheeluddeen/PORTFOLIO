import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Quote } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { SectionHeader, SectionShell } from "@/components/layout/section-shell";
import { testimonials } from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger);

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { opacity: 0, y: 60, scale: 0.95 },
          {
            opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.15, ease: "power3.out",
            scrollTrigger: { trigger: cardsRef.current, start: "top 85%", toggleActions: "play none none reverse" },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <SectionShell id="testimonials">
      <SectionHeader kicker={testimonials.kicker} title={testimonials.title} subtitle={testimonials.subtitle} />
      <div ref={cardsRef} className="grid gap-6 md:grid-cols-3">
        {testimonials.items.map((item) => (
          <Card key={item.name} className="hover:border-primary/40 hover:shadow-primary/5 relative overflow-hidden shadow-none transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <Quote aria-hidden="true" className="text-primary/10 absolute -top-2 -right-2 size-24 rotate-12" />
            <CardContent className="space-y-4 pt-6">
              <div className="bg-primary/10 flex size-12 items-center justify-center rounded-full text-lg font-bold text-primary">{item.initial}</div>
              <blockquote className="text-muted-foreground leading-relaxed">"{item.quote}"</blockquote>
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-muted-foreground text-xs">{item.role}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </SectionShell>
  );
}
