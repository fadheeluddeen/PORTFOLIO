import { Award, Trophy, Clock, GraduationCap, ExternalLink } from "lucide-react";

import { certifications } from "@/data/portfolio";

export function CertificationsSection() {
  const credentials = certifications.items.filter((c) => c.image);
  const coursework = certifications.items.filter((c) => !c.image);

  return (
    <section id="certifications" className="section-anchor relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 flex flex-col items-center text-center">
          <span className="skeuo-chip text-primary">{certifications.kicker}</span>
          <h2 className="font-display emboss mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
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
              className="skeuo-card group relative flex flex-col overflow-hidden rounded-3xl p-2.5"
            >
              {cert.featured && (
                <span className="skeuo-chip text-primary absolute top-4 left-4 z-10">
                  <Trophy className="size-3.5" />
                  Featured
                </span>
              )}
              <div className="skeuo-inset relative aspect-[4/3] overflow-hidden rounded-2xl">
                <img
                  src={cert.image}
                  alt={`${cert.title} certificate`}
                  loading="lazy"
                  className="size-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <span className="skeuo-chip absolute right-3 bottom-3 opacity-0 transition-opacity group-hover:opacity-100">
                  <ExternalLink className="size-3" />
                  View
                </span>
              </div>
              <div className="flex flex-1 flex-col p-4">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-sm leading-snug font-bold">{cert.title}</h3>
                  {cert.year && (
                    <span className="text-muted-foreground shrink-0 text-xs font-bold">
                      {cert.year}
                    </span>
                  )}
                </div>
                <p className="text-primary mt-2 text-xs font-bold tracking-wide uppercase">
                  {cert.org}
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* Coursework — text-only certificates */}
        {coursework.length > 0 && (
          <div className="skeuo radius-morph mt-8 p-7">
            <span className="text-secondary mb-4 flex items-center gap-2 text-sm font-bold uppercase">
              <GraduationCap className="size-4" />
              Coursework
            </span>
            <div className="skeuo-inset flex flex-wrap gap-3 rounded-2xl p-4">
              {coursework.map((cert) => (
                <span key={cert.title} className="skeuo-chip !text-xs" title={cert.org}>
                  <Award className="text-primary size-3.5" />
                  {cert.title}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="skeuo radius-morph-alt p-7">
            <span className="text-secondary mb-4 flex items-center gap-2 text-sm font-bold uppercase">
              <Clock className="size-4" />
              Currently pursuing
            </span>
            <ul className="space-y-2.5">
              {certifications.inProgress.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm font-semibold">
                  <span className="skeuo-medallion size-2 rounded-full" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="skeuo radius-morph p-7">
            <span className="text-primary mb-4 flex items-center gap-2 text-sm font-bold uppercase">
              <Trophy className="size-4" />
              Achievements
            </span>
            <ul className="space-y-3">
              {certifications.achievements.map((item) => (
                <li key={item} className="flex gap-2.5 text-sm leading-relaxed font-medium">
                  <span className="skeuo-medallion mt-1.5 size-2 shrink-0 rounded-full" />
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
