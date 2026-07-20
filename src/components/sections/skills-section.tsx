import type { ComponentType } from "react";
import { Code2, Brain, Sparkles, BarChart3, Server, Database, Terminal } from "lucide-react";

import { skillGroups } from "@/data/portfolio";

const ICONS: Record<string, ComponentType<{ className?: string }>> = {
  code: Code2,
  psychology: Brain,
  auto_awesome: Sparkles,
  insights: BarChart3,
  dns: Server,
  database: Database,
  terminal: Terminal,
};

export function SkillsSection() {
  return (
    <section id="skills" className="section-anchor relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 flex flex-col items-center text-center">
          <span className="skeuo-chip text-primary">Skills</span>
          <h2 className="font-display emboss mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            What I work with.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {skillGroups.map((group) => {
            const Icon = ICONS[group.icon] ?? Code2;
            return (
              <div key={group.title} className="skeuo-card rounded-3xl p-6">
                <div className="mb-5 flex items-center gap-3">
                  <span className="skeuo-medallion grid size-12 place-items-center rounded-2xl">
                    <Icon className="size-6" />
                  </span>
                  <h3 className="font-display text-lg font-bold">{group.title}</h3>
                </div>
                <div className="skeuo-inset flex flex-wrap gap-2 rounded-2xl p-3">
                  {group.tags.map((tag) => (
                    <span key={tag} className="skeuo-chip !py-1.5 !text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
