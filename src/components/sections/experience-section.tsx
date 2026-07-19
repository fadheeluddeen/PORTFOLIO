import { GraduationCap, Briefcase } from "lucide-react";

import { experience } from "@/data/portfolio";

export function ExperienceSection() {
  return (
    <section id="experience" className="section-anchor relative py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-14 text-center">
          <span className="text-primary text-sm font-bold tracking-wide uppercase">
            {experience.kicker}
          </span>
          <h2 className="font-display mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
            {experience.title}
          </h2>
          <p className="text-muted-foreground mt-3">{experience.subtitle}</p>
        </div>

        <div className="space-y-6">
          {experience.jobs.map((job) => (
            <div key={job.company} className="tilt-card glass-panel rounded-3xl p-6 sm:p-8">
              <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                <div className="flex items-start gap-4">
                  <span className="bg-3d flex size-11 shrink-0 items-center justify-center rounded-xl">
                    <Briefcase className="size-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold">{job.role}</h3>
                    <p className="text-muted-foreground text-sm font-semibold">
                      {job.company} · {job.location}
                    </p>
                  </div>
                </div>
                <span className="skill-chip w-fit shrink-0 text-xs">{job.period}</span>
              </div>

              <ul className="text-foreground/80 mt-5 space-y-2 pl-1">
                {job.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-2 text-sm leading-relaxed sm:text-base">
                    <span className="text-primary mt-1.5 block size-1.5 shrink-0 rounded-full bg-current" />
                    {bullet}
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap gap-2">
                {job.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-accent text-accent-foreground rounded-full px-3 py-1 text-xs font-bold"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {experience.education.map((edu) => (
            <div key={edu.school} className="glass-panel rounded-3xl p-6">
              <span className="bg-3d mb-3 flex size-11 items-center justify-center rounded-xl">
                <GraduationCap className="size-5" />
              </span>
              <h4 className="font-display font-bold">{edu.school}</h4>
              <p className="text-muted-foreground mt-1 text-sm">{edu.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
