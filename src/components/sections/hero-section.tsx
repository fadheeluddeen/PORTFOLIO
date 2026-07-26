import { Linkedin, Download } from "lucide-react";
import { site } from "@/data/portfolio";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Subtle float / parallax for the whole container
    const container = containerRef.current;
    if (!container) return;

    // Mouse movement parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 20; // max 20px movement
      const y = (e.clientY / innerHeight - 0.5) * 20;

      gsap.to(container, {
        x: x * 0.5,
        y: y * 0.5,
        rotateX: y * -0.05,
        rotateY: x * 0.05,
        ease: "power2.out",
        duration: 1
      });

      if (imageRef.current) {
        gsap.to(imageRef.current, {
          x: x * -0.8,
          y: y * -0.8,
          scale: 1.05,
          ease: "power2.out",
          duration: 1.5
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      id="top"
      className="relative flex min-h-screen w-full items-center justify-center p-4 md:p-8 shrink-0 overflow-hidden"
    >
      {/* Floating Container */}
      <div
        ref={containerRef}
        className="relative flex w-full max-w-7xl min-h-[85vh] h-auto lg:min-h-0 lg:h-[80vh] rounded-[2.5rem] bg-card/80 backdrop-blur-2xl border border-white/10 overflow-hidden shadow-2xl"
        style={{
          boxShadow: '0 25px 50px -12px var(--elev-lo-strong), 0 0 0 1px var(--elev-edge)'
        }}
      >
        {/* Floating Navigation Inside Container */}
        <nav className="absolute top-8 right-12 z-50 flex items-center gap-8">
          <a href="#about" className="text-sm font-semibold tracking-wider text-muted-foreground hover:text-foreground transition-colors">
            ABOUT
          </a>
          <a href="#projects" className="text-sm font-semibold tracking-wider text-muted-foreground hover:text-foreground transition-colors">
            PROJECTS
          </a>
          <a href="#contact" className="text-sm font-semibold tracking-wider text-muted-foreground hover:text-foreground transition-colors">
            CONTACT
          </a>
          <a
            href={site.resumePath}
            download
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-bold tracking-wide shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <Download className="size-4" />
            Resume
          </a>
        </nav>

        {/* Left Side: Content */}
        <div className="relative z-10 flex w-full lg:w-7/12 flex-col px-10 md:px-16 lg:px-20 h-full pt-6 md:pt-8 pb-8 md:pb-12">

          {/* Brand name at top */}
          <div className="text-lg md:text-2xl font-bold font-display tracking-wide text-muted-foreground/40 pointer-events-none select-none">
            {site.name}
          </div>

          <div className="relative z-20 flex-1 flex flex-col justify-center mt-6 sm:mt-8 md:mt-0">
            <span className="text-tertiary-foreground bg-tertiary/20 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-6 inline-flex w-fit shadow-sm border border-tertiary/30">
              {site.title || "AI Engineer"}
            </span>

            <h1 className="font-display text-5xl md:text-6xl lg:text-[5.5rem] font-bold leading-[1.05] mb-6 text-foreground drop-shadow-sm">
              Crafting
              <br />
              <span className="text-3d italic pe-2">Digital</span>
              <br />
              Realities.
            </h1>



            <div className="flex flex-wrap items-center gap-4">
              <a
                href={site.linkedin || "#"}
                className="skeuo-btn-ghost px-8 py-4 rounded-full font-bold shadow-sm transition-all flex items-center gap-2"
              >
                <Linkedin className="size-4" />
                Connect
              </a>
            </div>
          </div>
        </div>

        {/* Right Side: Portrait inside Organic SVG mask */}
        <div className="absolute inset-y-0 right-0 w-full lg:w-6/12 pointer-events-none hidden lg:block z-10">

          {/* SVG Definition for the organic clippath */}
          <svg width="0" height="0" className="absolute">
            <defs>
              <clipPath id="heroBlob" clipPathUnits="objectBoundingBox">
                <path d="M 0.25 0 C 0.5 0.3, 0.05 0.7, 0.3 1 L 1 1 L 1 0 Z" />
              </clipPath>
            </defs>
          </svg>

          {/* Masked Image Container */}
          <div
            className="absolute inset-0 w-full h-full bg-surface-tertiary"
            style={{ clipPath: 'url(#heroBlob)' }}
          >
            {/* The image itself */}
            <img
              ref={imageRef}
              src={site.profilePath}
              alt={site.name}
              className="w-full h-full object-cover object-[center_20%] opacity-90 mix-blend-luminosity filter contrast-125"
            />
            {/* Inner glow overlay on the image */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent mix-blend-overlay" />
          </div>
        </div>

      </div>
    </section>
  );
}
