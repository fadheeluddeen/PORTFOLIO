import { GraduationCap, Briefcase } from "lucide-react";
import { experience } from "@/data/portfolio";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      // Glow line animation
      gsap.fromTo(
        ".journey-line",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".journey-container",
            start: "top 50%",
            end: "bottom 80%",
            scrub: true,
          }
        }
      );

      // Card reveals
      gsap.utils.toArray<HTMLElement>(".journey-card").forEach((card, i) => {
        const isLeft = i % 2 === 0;
        gsap.fromTo(
          card,
          { opacity: 0, x: isLeft ? -50 : 50, y: 30 },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            }
          }
        );
      });

      // Edu reveals
      gsap.fromTo(
        ".edu-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".edu-container",
            start: "top 85%",
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="experience" className="relative py-32 overflow-hidden z-10 w-full shrink-0 bg-background">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/3 right-0 w-[40vw] h-[40vw] bg-tertiary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-6xl px-6 relative z-10">

        <div className="mb-24 flex flex-col items-center justify-center text-center">
          <span className="text-secondary font-bold tracking-widest uppercase text-sm mb-4">
            {experience.kicker}
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground drop-shadow-sm">
            Professional <span className="text-3d italic pe-2">Journey</span>.
          </h2>
          <p className="text-muted-foreground mt-6 text-lg max-w-2xl font-medium">{experience.subtitle}</p>
        </div>

        {/* The Timeline Container */}
        <div className="journey-container relative w-full lg:min-h-[800px] pb-20">

          {/* Middle glowing path for Desktop */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2">
            <div className="journey-line absolute top-0 left-0 w-full h-full bg-gradient-to-b from-primary via-secondary to-tertiary origin-top drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
          </div>

          <div className="flex flex-col gap-12 lg:gap-0 lg:space-y-0">
            {experience.jobs.map((job, i) => {
              const isEven = i % 2 === 0;
              return (
                <div key={job.company} className={`journey-card relative flex flex-col lg:flex-row items-center w-full ${isEven ? 'lg:justify-end' : 'lg:justify-start lg:flex-row-reverse'} lg:-mt-12 first:mt-0`}>

                  {/* Timeline Node Point (Desktop) */}
                  <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-14 items-center justify-center z-20">
                    <div className="size-4 rounded-full bg-primary shadow-[0_0_15px_var(--primary)] border-2 border-background" />
                  </div>

                  {/* Card Content */}
                  <div className={`w-full lg:w-[45%] ${isEven ? 'lg:pr-12' : 'lg:pl-12'}`}>
                    <div className="relative p-[1px] rounded-[2rem] overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent group-hover:opacity-100 opacity-50 transition-opacity" />

                      <div className="relative bg-card/60 backdrop-blur-2xl rounded-[calc(2rem-1px)] p-8 shadow-2xl border border-white/5 hover:border-white/20 transition-all duration-300 hover:shadow-[0_0_40px_-10px_rgba(0,0,0,0.3)]">

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                          <div className="flex items-center gap-4">
                            <span className="flex size-12 shadow-inner shrink-0 items-center justify-center rounded-2xl bg-surface-secondary text-primary">
                              <Briefcase className="size-5" />
                            </span>
                            <div>
                              <h3 className="font-display text-xl lg:text-2xl font-bold leading-tight">{job.role}</h3>
                              <p className="text-secondary font-bold text-sm tracking-wide mt-1">
                                {job.company}
                              </p>
                            </div>
                          </div>
                          <span className="inline-flex items-center rounded-full bg-surface-tertiary px-3 py-1 text-xs font-bold text-muted-foreground border border-white/5 whitespace-nowrap">
                            {job.period}
                          </span>
                        </div>

                        <ul className="text-muted-foreground space-y-3 mb-6">
                          {job.bullets.map((bullet) => (
                            <li key={bullet} className="flex gap-3 text-sm md:text-[0.95rem] leading-relaxed">
                              <span className="text-primary mt-1.5 block size-1.5 shrink-0 rounded-full bg-current shadow-[0_0_5px_currentColor]" />
                              {bullet}
                            </li>
                          ))}
                        </ul>

                        <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                          {job.tags.map((tag) => (
                            <span key={tag} className="px-3 py-1.5 rounded-full text-xs font-semibold bg-surface-secondary/50 text-foreground border border-white/5 shadow-sm">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* Education Section */}
        <div className="edu-container mt-12 grid gap-6 sm:grid-cols-2 pt-12 border-t border-white/5 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 inline-flex items-center justify-center px-4 py-1 rounded-full bg-surface shadow-sm border border-border text-xs font-bold tracking-widest text-muted-foreground uppercase">
            Education
          </div>

          {experience.education.map((edu) => (
            <div key={edu.school} className="edu-card relative p-[1px] rounded-[2rem] overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent group-hover:opacity-100 opacity-50 transition-opacity" />
              <div className="relative h-full bg-card/60 backdrop-blur-2xl rounded-[calc(2rem-1px)] p-8 shadow-xl border border-white/5 hover:border-gold/20 transition-all duration-300">
                <span className="flex size-12 shadow-inner mb-6 shrink-0 items-center justify-center rounded-2xl bg-gold/10 text-gold">
                  <GraduationCap className="size-6" />
                </span>
                <h4 className="font-display text-xl font-bold text-foreground leading-tight">{edu.school}</h4>
                <p className="text-muted-foreground mt-3 text-sm leading-relaxed">{edu.detail}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
