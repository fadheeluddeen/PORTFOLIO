import { Award, Trophy, Clock, GraduationCap, ExternalLink } from "lucide-react";

import { certifications } from "@/data/portfolio";

export function CertificationsSection() {
  const credentials = certifications.items.filter((c) => c.image);
  const coursework = certifications.items.filter((c) => !c.image);

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

        {/* Credential gallery — scanned certificates */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {credentials.map((cert) => (
            <a
              key={cert.title}
              href={cert.image}
              target="_blank"
              rel="noopener noreferrer"
              className="tilt-card glass-panel group relative flex flex-col overflow-hidden rounded-3xl"
            >
              {cert.featured && (
                <span className="bg-3d absolute top-4 left-4 z-10 flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.7rem] font-bold uppercase tracking-wide">
                  <Trophy className="size-3.5" />
                  Featured
                </span>
              )}
              <div className="bg-muted/40 relative aspect-[4/3] overflow-hidden">
                <img
                  src={cert.image}
                  alt={`${cert.title} certificate`}
                  loading="lazy"
                  className="size-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <span className="bg-background/85 text-foreground absolute right-3 bottom-3 flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
                  <ExternalLink className="size-3" />
                  View
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-sm leading-snug font-bold">{cert.title}</h3>
                  {cert.year && (
                    <span className="text-muted-foreground shrink-0 text-xs font-bold">
                      {cert.year}
                    </span>
                  )}
                </div>
                <p className="text-primary mt-2 text-xs font-bold uppercase tracking-wide">
                  {cert.org}
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* Coursework — text-only certificates */}
        {coursework.length > 0 && (
          <div className="glass-panel radius-morph mt-8 p-7">
            <span className="text-secondary mb-4 flex items-center gap-2 text-sm font-bold uppercase">
              <GraduationCap className="size-4" />
              Coursework
            </span>
            <div className="flex flex-wrap gap-3">
              {coursework.map((cert) => (
                <span
                  key={cert.title}
                  className="skill-chip !text-xs"
                  title={cert.org}
                >
                  <Award className="text-primary mr-2 size-3.5" />
                  {cert.title}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="glass-panel radius-morph-alt p-7">
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

          <div className="glass-panel radius-morph p-7">
            <span className="text-primary mb-3 flex items-center gap-2 text-sm font-bold uppercase">
              <Trophy className="size-4" />
              Achievements
            </span>
            <ul className="space-y-2.5">
              {certifications.achievements.map((item) => (
                <li key={item} className="flex gap-2 text-sm leading-relaxed font-medium">
                  <span className="text-primary mt-1.5 block size-1.5 shrink-0 rounded-full bg-current" />
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
