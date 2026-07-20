import { ArrowRight, Download, Sparkles } from "lucide-react";

import { CountUp } from "@/components/count-up";
import { hero, site } from "@/data/portfolio";

export function HeroSection() {
  return (
    <section
      id="top"
      className="section-anchor hero-gradient relative flex min-h-screen items-center overflow-hidden pt-28 pb-16"
    >
      {/* floating tactile shapes */}
      <div
        aria-hidden
        className="skeuo animate-float-slow absolute top-24 left-[7%] size-24 rounded-[2rem] md:size-32"
      />
      <div
        aria-hidden
        className="skeuo animate-float-medium absolute right-[9%] bottom-32 size-20 rounded-full md:size-28"
      />
      <div
        aria-hidden
        className="skeuo-inset animate-float-slow absolute top-1/2 right-[19%] size-14 rounded-2xl md:size-20"
      />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
        <span className="skeuo-chip text-primary mb-7">
          <Sparkles className="size-4" />
          {hero.kicker}
        </span>

        <h1 className="font-display emboss text-4xl leading-[1.05] font-extrabold tracking-tight sm:text-5xl md:text-6xl">
          {hero.headline}
          <br />
          <span className="text-3d">{hero.highlight}</span>
        </h1>

        <p className="text-muted-foreground mt-6 max-w-xl text-base leading-relaxed sm:text-lg">
          {hero.tagline}
        </p>

        <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row">
          <a href="#projects" className="skeuo-btn flex items-center gap-2 px-7 py-3.5 text-sm font-bold">
            See my work
            <ArrowRight className="size-4" />
          </a>
          <a
            href={site.resumePath}
            download
            className="skeuo-btn-ghost flex items-center gap-2 px-7 py-3.5 text-sm font-bold"
          >
            <Download className="size-4" />
            Download resume
          </a>
        </div>

        <div className="skeuo radius-morph mt-16 grid w-full max-w-2xl grid-cols-2 gap-4 p-5 sm:grid-cols-4">
          {hero.stats.map((stat) => (
            <div
              key={stat.label}
              className="skeuo-inset flex flex-col items-center gap-1 rounded-2xl px-3 py-4"
            >
              <span className="text-3d font-display text-2xl font-extrabold sm:text-3xl">
                <CountUp value={stat.value} />
              </span>
              <span className="text-muted-foreground text-center text-[0.7rem] font-bold tracking-wide uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
