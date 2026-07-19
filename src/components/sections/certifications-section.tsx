import { Award, Trophy, Clock } from "lucide-react";

import { certifications } from "@/data/portfolio";

export function CertificationsSection() {
  return (
    <section id="certifications" className="section-anchor relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 text-center">
          <span className="text-primary text-sm font-bold tracking-wide uppercase">
            {certifications.kicker}
          </span>
          <h2 className="font-display mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
            {certifications.title}
          </h2>
          <p className="text-muted-foreground mt-3">{certifications.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {certifications.items.map((cert) => (
            <div key={cert.title} className="tilt-card glass-panel rounded-3xl p-6">
              <span className="bg-3d mb-4 flex size-12 items-center justify-center rounded-2xl">
                <Award className="size-6" />
              </span>
              <h3 className="font-display text-sm leading-snug font-bold">{cert.title}</h3>
              <p className="text-muted-foreground mt-2 text-xs font-bold uppercase">{cert.org}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="glass-panel radius-morph p-7">
            <span className="text-secondary mb-3 flex items-center gap-2 text-sm font-bold uppercase">
              <Clock className="size-4" />
              Currently pursuing
            </span>
            <ul className="space-y-2">
              {certifications.inProgress.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm font-semibold">
                  <span className="bg-secondary block size-1.5 rounded-full" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-panel radius-morph-alt p-7">
            <span className="text-primary mb-3 flex items-center gap-2 text-sm font-bold uppercase">
              <Trophy className="size-4" />
              Achievements
            </span>
            <ul className="space-y-2">
              {certifications.achievements.map((item) => (
                <li key={item} className="text-sm leading-relaxed font-medium">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
