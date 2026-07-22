import { about, site } from "@/data/portfolio";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      // Staggered reveal for texts
      gsap.fromTo(
        ".about-text-reveal",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          }
        }
      );

      // Image subtle parallax depth
      gsap.fromTo(
        imageRef.current,
        { y: 100, opacity: 0.5 },
        {
          y: -20,
          opacity: 1,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            scrub: 1,
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative py-32 md:py-48 overflow-hidden z-10 w-full shrink-0">

      {/* Background large editorial text */}
      <div className="absolute top-10 left-[-5%] text-[15vw] font-display font-bold leading-none text-muted/30 select-none hidden md:block whitespace-nowrap z-0">
        ABOUT ME.
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24">

          {/* Left: Image with Overlap and Depth */}
          <div ref={imageRef} className="relative w-full max-w-md shrink-0 lg:w-[45%]">
            <div className="relative rounded-[2rem] overflow-hidden bg-card/40 p-4 border border-white/10 backdrop-blur-md shadow-2xl">
              <img
                src={site.profilePath}
                alt={site.name}
                className="w-full aspect-[3/4] object-cover rounded-[1.5rem] filter contrast-110 saturate-50"
              />

              {/* Floating Academic Overlap */}
              <div className="absolute -bottom-8 -right-8 flex items-center gap-4 rounded-3xl bg-surface/90 backdrop-blur-xl px-6 py-5 shadow-2xl border border-white/10">
                <span className="flex size-14 items-center justify-center rounded-full bg-gold/20 text-gold text-2xl shadow-inner">
                  🎓
                </span>
                <div className="text-left">
                  <p className="font-display text-base leading-tight font-bold text-foreground">B.E. CSE · 2026</p>
                  <p className="text-primary font-semibold mt-1 text-xs uppercase tracking-widest">CGPA 7.05</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Editorial Typography */}
          <div ref={textRef} className="flex-1 max-w-2xl mt-12 lg:mt-0">
            <div className="about-text-reveal">
              <span className="text-tertiary-foreground bg-tertiary/20 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-6 inline-flex border border-tertiary/30">
                {about.kicker}
              </span>
            </div>

            <h2 className="about-text-reveal font-display mt-6 text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.1]">
              {about.title}
            </h2>

            <p className="about-text-reveal text-primary mt-6 text-lg md:text-xl font-medium tracking-wide">
              {about.subtitle}
            </p>

            <div className="about-text-reveal mt-8 space-y-6">
              {about.paragraphs.map((p, i) => (
                <p key={i} className="text-muted-foreground text-base md:text-lg leading-relaxed">
                  {p}
                </p>
              ))}
            </div>

            {/* Premium Stat Cards */}
            <div className="mt-12 grid grid-cols-2 gap-6">
              {about.cards.map((card) => (
                <div key={card.label} className="about-text-reveal group relative flex items-center gap-4 rounded-3xl bg-card/60 border border-white/5 p-5 shadow-lg backdrop-blur-md hover:-translate-y-2 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="relative flex size-12 shrink-0 items-center justify-center rounded-2xl bg-surface-secondary text-2xl shadow-inner group-hover:scale-110 group-hover:text-gold transition-all duration-300">
                    {card.icon}
                  </span>
                  <div className="relative">
                    <p className="text-muted-foreground text-[0.65rem] font-bold tracking-widest uppercase">
                      {card.label}
                    </p>
                    <p className="font-display mt-1 text-lg font-bold text-foreground">{card.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
