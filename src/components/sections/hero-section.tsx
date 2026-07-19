import { ArrowRight, Sparkles } from "lucide-react";

import { CountUp } from "@/components/count-up";
import { Button } from "@/components/ui/button";
import { hero, site } from "@/data/portfolio";

export function HeroSection() {
  return (
    <section
      id="top"
      className="section-anchor hero-gradient relative flex min-h-screen items-center overflow-hidden pt-28 pb-16"
    >
      {/* floating parallax shapes */}
      <div
        aria-hidden
        className="bg-primary/15 animate-float-slow absolute top-24 left-[8%] size-24 rounded-[2rem] blur-[2px] md:size-32"
      />
      <div
        aria-hidden
        className="bg-tertiary/15 animate-float-medium absolute right-[10%] bottom-32 size-20 rounded-full blur-[2px] md:size-28"
      />
      <div
        aria-hidden
        className="border-primary/20 animate-float-slow absolute top-1/2 right-[18%] size-14 rounded-2xl border-2 md:size-20"
      />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
        <span className="glass-panel text-primary mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold">
          <Sparkles className="size-4" />
          {hero.kicker}
        </span>

        <h1 className="font-display text-4xl leading-[1.05] font-extrabold tracking-tight sm:text-5xl md:text-6xl">
          {hero.headline}
          <br />
          <span className="text-3d">{hero.highlight}</span>
        </h1>

        <p className="text-muted-foreground mt-6 max-w-xl text-base leading-relaxed sm:text-lg">
          {hero.tagline}
        </p>

        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
          <Button asChild size="lg" className="btn-3d bg-3d rounded-2xl border-0 px-7">
            <a href="#projects">
              See my work
              <ArrowRight className="size-4" />
            </a>
          </Button>
          <Button asChild variant="outline" size="lg" className="glass-panel rounded-2xl border-0 px-7">
            <a href={site.resumePath} download>
              Download resume
            </a>
          </Button>
        </div>

        <div className="glass-panel radius-morph mt-16 grid w-full max-w-2xl grid-cols-2 gap-6 px-8 py-8 sm:grid-cols-4">
          {hero.stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1">
              <span className="text-3d font-display text-2xl font-extrabold sm:text-3xl">
                <CountUp value={stat.value} />
              </span>
              <span className="text-muted-foreground text-center text-xs font-semibold tracking-wide uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
