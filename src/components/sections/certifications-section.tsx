import { Trophy } from "lucide-react";

import { Bookshelf } from "@/components/bookshelf";
import { certifications } from "@/data/portfolio";

export function CertificationsSection() {
  return (
    <section id="certifications" className="section-anchor relative py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-12 flex flex-col items-center text-center">
          <span className="skeuo-chip text-gold">{certifications.kicker}</span>
          <h2 className="font-display mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            {certifications.title}
          </h2>
          <p className="text-muted-foreground mt-3 max-w-lg">{certifications.subtitle}</p>
          <p className="text-muted-foreground/80 mt-2 text-xs">
            Tip: books with a certificate are clickable — pull one off the shelf.
          </p>
        </div>

        {/* The bookshelf — courses, awards & current reads */}
        <Bookshelf items={certifications.items} inProgress={certifications.inProgress} />

        {/* Achievements — engraved brass plaques */}
        <div className="skeuo radius-morph mt-12 p-7">
          <span className="text-gold mb-5 flex items-center gap-2 text-sm font-bold tracking-wide uppercase">
            <Trophy className="size-4" />
            On the record
          </span>
          <div className="grid gap-3 sm:grid-cols-2">
            {certifications.achievements.map((item) => (
              <div key={item} className="plaque text-sm leading-relaxed font-medium">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
