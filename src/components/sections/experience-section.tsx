import { GraduationCap, Briefcase, ChevronDown } from "lucide-react";
import { Accordion } from "@heroui/react";

import { experience } from "@/data/portfolio";

export function ExperienceSection() {
  const allKeys = experience.jobs.map((_, i) => `exp-${i}`);

  return (
    <section id="experience" className="section-anchor relative py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-14 flex flex-col items-center text-center">
          <span className="skeuo-chip text-primary">{experience.kicker}</span>
          <h2 className="font-display emboss mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            {experience.title}
          </h2>
          <p className="text-muted-foreground mt-3">{experience.subtitle}</p>
        </div>

        <Accordion
          allowsMultipleExpanded
          defaultExpandedKeys={allKeys}
          hideSeparator
          className="flex flex-col gap-6"
        >
          {experience.jobs.map((job, i) => (
            <Accordion.Item key={job.company} id={`exp-${i}`} className="skeuo-card rounded-3xl">
              <Accordion.Heading>
                <Accordion.Trigger className="flex w-full items-center gap-4 rounded-3xl p-6 text-left outline-none sm:p-7">
                  <span className="skeuo-medallion grid size-11 shrink-0 place-items-center rounded-xl">
                    <Briefcase className="size-5" />
                  </span>
                  <div className="flex-1">
                    <h3 className="font-display text-lg font-bold">{job.role}</h3>
                    <p className="text-muted-foreground text-sm font-semibold">
                      {job.company} · {job.location}
                    </p>
                  </div>
                  <span className="skeuo-chip hidden shrink-0 sm:inline-flex">{job.period}</span>
                  <Accordion.Indicator>
                    <ChevronDown className="text-muted-foreground size-5 transition-transform duration-300 group-data-[expanded]:rotate-180" />
                  </Accordion.Indicator>
                </Accordion.Trigger>
              </Accordion.Heading>
              <Accordion.Panel className="px-6 pb-7 sm:px-7">
                <div className="skeuo-inset rounded-2xl p-5">
                  <span className="skeuo-chip mb-4 inline-flex sm:hidden">{job.period}</span>
                  <ul className="text-foreground/85 space-y-2.5">
                    {job.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-2.5 text-sm leading-relaxed sm:text-[0.95rem]">
                        <span className="text-primary mt-1.5 block size-1.5 shrink-0 rounded-full bg-current" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {job.tags.map((tag) => (
                      <span key={tag} className="skeuo-chip !py-1 !text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {experience.education.map((edu) => (
            <div key={edu.school} className="skeuo-card rounded-3xl p-6">
              <span className="skeuo-medallion mb-4 grid size-11 place-items-center rounded-xl">
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
