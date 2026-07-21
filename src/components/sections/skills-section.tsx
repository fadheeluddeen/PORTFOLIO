import type { ComponentType } from "react";
import { Code2, Brain, Sparkles, BarChart3, Server, Database, Terminal } from "lucide-react";
import { skillGroups } from "@/data/portfolio";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ICONS: Record<string, ComponentType<{ className?: string }>> = {
  code: Code2,
  psychology: Brain,
  auto_awesome: Sparkles,
  insights: BarChart3,
  dns: Server,
  database: Database,
  terminal: Terminal,
};

// Distinct personalities for each skill group
const ACCENT_COLORS: Record<string, string> = {
  "Programming": "oklch(0.70 0.15 230)", // Cyan
  "AI / ML": "oklch(0.65 0.25 320)",      // Neon Pink
  "ML Libraries & Tools": "oklch(0.65 0.20 15)", // Rose
  "Data & Visualization": "oklch(0.60 0.20 280)", // Violet
  "Web & Backend": "oklch(0.70 0.15 160)", // Emerald
  "Databases": "oklch(0.75 0.15 85)",      // Gold
  "DevOps & Tools": "oklch(0.60 0.05 250)", // Slate
};

export function SkillsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".skill-card",
        { y: 80, opacity: 0, rotateX: -10 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          stagger: 0.1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" className="relative py-32 overflow-hidden bg-background">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/4 w-[50vw] h-[50vw] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div ref={containerRef} className="mx-auto max-w-7xl px-6 lg:px-12 relative z-10">

        <div className="mb-20 flex flex-col items-center text-center">
          <span className="text-secondary font-bold tracking-widest uppercase text-sm mb-4">
            Capabilities
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground drop-shadow-sm">
            Technical <span className="text-3d italic pe-2">Arsenal</span>.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3 perspective-[1000px]">
          {skillGroups.map((group) => {
            const Icon = ICONS[group.icon] ?? Code2;
            const accent = ACCENT_COLORS[group.title] || "var(--primary)";

            return (
              <div
                key={group.title}
                className="skill-card group relative p-[1px] rounded-[2rem] overflow-hidden transition-transform duration-500 hover:-translate-y-2 hover:scale-[1.02]"
              >
                {/* Animated Border Gradient */}
                <div
                  className="absolute inset-0 opacity-20 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${accent}, transparent 60%)`
                  }}
                />

                {/* Card Body */}
                <div className="relative h-full w-full bg-card/80 backdrop-blur-xl rounded-[calc(2rem-1px)] p-8 flex flex-col shadow-xl">

                  {/* Glowing background blob on hover */}
                  <div
                    className="absolute -top-16 -right-16 w-32 h-32 blur-[60px] rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none"
                    style={{ background: accent }}
                  />

                  <div className="mb-6 flex items-center gap-4">
                    <span
                      className="flex size-14 items-center justify-center rounded-2xl shadow-inner bg-surface-secondary group-hover:scale-110 transition-transform duration-500"
                      style={{ color: accent }}
                    >
                      <Icon className="size-7 drop-shadow-md" />
                    </span>
                    <h3 className="font-display text-xl font-bold text-foreground">
                      {group.title}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2.5 mt-auto relative z-10">
                    {group.tags.map((tag, i) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 rounded-full text-xs font-semibold bg-surface-tertiary/50 text-muted-foreground border border-white/5 shadow-sm transition-all duration-300 group-hover:bg-surface-secondary group-hover:text-foreground group-hover:border-white/10"
                        style={{
                          transitionDelay: `${i * 30}ms`
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
