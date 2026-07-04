import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Clock } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeader, SectionShell } from "@/components/layout/section-shell";
import { TiltCard } from "@/components/tilt-card";
import { blog } from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger);

export function BlogSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { opacity: 0, y: 70, rotateY: -10 },
          {
            opacity: 1, y: 0, rotateY: 0, duration: 0.8, stagger: 0.15, ease: "power3.out",
            scrollTrigger: { trigger: cardsRef.current, start: "top 85%", toggleActions: "play none none reverse" },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <SectionShell id="blog">
      <SectionHeader kicker={blog.kicker} title={blog.title} subtitle={blog.subtitle} />
      <div ref={cardsRef} className="grid gap-6 md:grid-cols-3">
        {blog.posts.map((post) => (
          <TiltCard key={post.title} className="group cursor-pointer" tiltAmount={8}>
            <Card className="overflow-hidden border-0 bg-card/50 shadow-none backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-primary/5">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img src={post.image} alt={post.title} className="size-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <Badge className="absolute top-3 left-3 rounded-full bg-background/80 backdrop-blur-sm">{post.category}</Badge>
              </div>
              <CardContent className="space-y-3 pt-4">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="size-3" /> {post.readTime}
                </div>
                <h3 className="font-semibold leading-tight group-hover:text-primary transition-colors">{post.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{post.excerpt}</p>
                <div className="flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Read article <ArrowUpRight className="size-3" />
                </div>
              </CardContent>
            </Card>
          </TiltCard>
        ))}
      </div>
    </SectionShell>
  );
}
