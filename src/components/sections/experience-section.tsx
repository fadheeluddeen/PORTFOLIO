import { GraduationCap, Briefcase, ChevronRight } from "lucide-react";
import { experience } from "@/data/portfolio";
import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── Stacked-card accent colours ─────────────────────────────── */
const CARD_ACCENTS = [
  "oklch(0.65 0.25 320)",  // neon pink
  "oklch(0.70 0.15 230)",  // cyan
  "oklch(0.65 0.20 15)",   // rose
  "oklch(0.60 0.20 280)",  // violet
];

export function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const jobs = experience.jobs;
  const total = jobs.length;

  /* cycle to the next card, looping back to 0 */
  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % total);
  }, [total]);

  /* animate the stack whenever the active card changes */
  useEffect(() => {
    if (!stackRef.current) return;
    const cards = stackRef.current.querySelectorAll<HTMLElement>(".stack-card");

    cards.forEach((card, i) => {
      /* distance from the active card (wrapping) */
      const offset = (i - active + total) % total;

      gsap.to(card, {
        x: offset * 50,
        y: offset * 16,
        scale: 1 - offset * 0.04,
        opacity: offset === 0 ? 1 : Math.max(0.6, 1 - offset * 0.2),
        zIndex: total - offset,
        duration: 0.5,
        ease: "power3.out",
      });
    });
  }, [active, total]);

  /* scroll-triggered entrance */
  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".stack-wrapper",
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: ".stack-wrapper", start: "top 85%" },
        }
      );

      gsap.fromTo(
        ".edu-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".edu-container", start: "top 85%" },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="experience"
      className="relative py-32 overflow-hidden z-10 w-full shrink-0 bg-transparent"
    >
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/3 right-0 w-[40vw] h-[40vw] bg-tertiary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-6xl px-6 relative z-10">
        {/* Section Header */}
        <div className="mb-24 flex flex-col items-center justify-center text-center">
          <span className="text-secondary font-bold tracking-widest uppercase text-sm mb-4">
            {experience.kicker}
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground drop-shadow-sm">
            Professional <span className="text-3d italic pe-2">Journey</span>.
          </h2>
          <p className="text-muted-foreground mt-6 text-lg max-w-2xl font-medium">
            {experience.subtitle}
          </p>
        </div>

        {/* ── Stacked Card Carousel ───────────────────────────── */}
        <div className="stack-wrapper relative mx-auto max-w-2xl">
          {/* Card stack */}
          <div
            ref={stackRef}
            className="relative cursor-pointer"
            style={{ minHeight: 340 }}
            onClick={next}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                next();
              }
            }}
            aria-label="Click to see next experience"
          >
            {jobs.map((job, i) => {
              const accent = CARD_ACCENTS[i % CARD_ACCENTS.length];
              return (
                <div
                  key={job.company}
                  className="stack-card absolute inset-x-0 top-0 transition-none"
                  style={{ zIndex: total - i }}
                >
                  <div className="relative p-[1px] rounded-[2rem] overflow-hidden group">
                    {/* Gradient border glow */}
                    <div
                      className="absolute inset-0 opacity-30 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `linear-gradient(135deg, ${accent}, transparent 60%)`,
                      }}
                    />

                    <div className="relative bg-card/80 backdrop-blur-2xl rounded-[calc(2rem-1px)] p-8 shadow-2xl border border-white/5 group-hover:border-white/20 transition-all duration-300">
                      {/* Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        <div className="flex items-center gap-4">
                          <span
                            className="flex size-12 shadow-inner shrink-0 items-center justify-center rounded-2xl bg-surface-secondary"
                            style={{ color: accent }}
                          >
                            <Briefcase className="size-5" />
                          </span>
                          <div>
                            <h3 className="font-display text-xl lg:text-2xl font-bold leading-tight">
                              {job.role}
                            </h3>
                            <p className="text-secondary font-bold text-sm tracking-wide mt-1">
                              {job.company}
                            </p>
                          </div>
                        </div>
                        <span className="inline-flex items-center rounded-full bg-surface-tertiary px-3 py-1 text-xs font-bold text-muted-foreground border border-white/5 whitespace-nowrap">
                          {job.period}
                        </span>
                      </div>

                      {/* Bullets */}
                      <ul className="text-muted-foreground space-y-3 mb-6">
                        {job.bullets.map((bullet) => (
                          <li
                            key={bullet}
                            className="flex gap-3 text-sm md:text-[0.95rem] leading-relaxed"
                          >
                            <span
                              className="mt-1.5 block size-1.5 shrink-0 rounded-full bg-current shadow-[0_0_5px_currentColor]"
                              style={{ color: accent }}
                            />
                            {bullet}
                          </li>
                        ))}
                      </ul>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                        {job.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1.5 rounded-full text-xs font-semibold bg-surface-secondary/50 text-foreground border border-white/5 shadow-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Progress indicator + hint */}
          <div className="mt-8 flex items-center justify-center gap-4">
            {/* Dots */}
            <div className="flex gap-2">
              {jobs.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActive(i);
                  }}
                  className={`size-2.5 rounded-full transition-all duration-300 ${i === active
                    ? "bg-primary scale-125 shadow-[0_0_8px_var(--primary)]"
                    : "bg-white/20 hover:bg-white/40"
                    }`}
                  aria-label={`Go to experience ${i + 1}`}
                />
              ))}
            </div>
            <span className="text-muted-foreground text-xs flex items-center gap-1 select-none">
              Click card <ChevronRight className="size-3 animate-pulse" />
            </span>
          </div>
        </div>

        {/* ── Education Section ───────────────────────────────── */}
        <div className="edu-container mt-24 grid gap-6 sm:grid-cols-2 pt-12 border-t border-white/5 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 inline-flex items-center justify-center px-4 py-1 rounded-full bg-surface shadow-sm border border-border text-xs font-bold tracking-widest text-muted-foreground uppercase">
            Education
          </div>

          {experience.education.map((edu) => (
            <div
              key={edu.school}
              className="edu-card relative p-[1px] rounded-[2rem] overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent group-hover:opacity-100 opacity-50 transition-opacity" />
              <div className="relative h-full bg-card/60 backdrop-blur-2xl rounded-[calc(2rem-1px)] p-8 shadow-xl border border-white/5 hover:border-gold/20 transition-all duration-300">
                <span className="flex size-12 shadow-inner mb-6 shrink-0 items-center justify-center rounded-2xl bg-gold/10 text-gold">
                  <GraduationCap className="size-6" />
                </span>
                <h4 className="font-display text-xl font-bold text-foreground leading-tight">
                  {edu.school}
                </h4>
                <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                  {edu.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
