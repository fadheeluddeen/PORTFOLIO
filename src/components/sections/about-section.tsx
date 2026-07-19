import { about, site } from "@/data/portfolio";

export function AboutSection() {
  return (
    <section id="about" className="section-anchor relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center gap-12 lg:flex-row">
          <div className="relative w-full max-w-sm shrink-0 lg:w-2/5">
            <div className="radius-morph border-border/60 relative overflow-hidden border shadow-2xl">
              <img
                src={site.profilePath}
                alt={site.name}
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            <div className="glass-panel absolute -top-6 -right-4 flex items-center gap-3 rounded-2xl px-4 py-3 shadow-xl sm:right-0">
              <span className="bg-3d flex size-11 items-center justify-center rounded-xl text-lg">
                🎓
              </span>
              <div className="text-left">
                <p className="font-display text-sm leading-none font-bold">B.E. CSE · 2026</p>
                <p className="text-muted-foreground text-xs">CGPA 7.05</p>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <span className="text-primary text-sm font-bold tracking-wide uppercase">
              {about.kicker}
            </span>
            <h2 className="font-display mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
              {about.title}
            </h2>
            <p className="text-muted-foreground mt-2 text-base">{about.subtitle}</p>

            <div className="mt-6 space-y-4">
              {about.paragraphs.map((p) => (
                <p key={p} className="text-foreground/80 leading-relaxed">
                  {p}
                </p>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {about.cards.map((card) => (
                <div
                  key={card.label}
                  className="glass-panel flex items-center gap-3 rounded-2xl p-4"
                >
                  <span className="text-2xl">{card.icon}</span>
                  <div>
                    <p className="text-muted-foreground text-xs font-semibold uppercase">
                      {card.label}
                    </p>
                    <p className="font-display text-sm font-bold">{card.value}</p>
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
