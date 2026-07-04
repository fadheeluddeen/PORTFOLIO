import { type ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  kicker: string;
  title: string;
  subtitle?: string;
  className?: string;
  action?: ReactNode;
};

export function SectionHeader({
  kicker,
  title,
  subtitle,
  className,
  action,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <div className="max-w-2xl space-y-3">
        <p className="text-primary text-xs font-semibold tracking-[0.2em] uppercase">
          {kicker}
        </p>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
        {subtitle ? (
          <p className="text-muted-foreground text-base leading-relaxed">{subtitle}</p>
        ) : null}
      </div>
      {action}
    </div>
  );
}

export function SectionShell({
  id,
  children,
  className,
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("scroll-mt-20 py-20 md:py-24", className)}>
      <div className="mx-auto max-w-6xl px-6">{children}</div>
    </section>
  );
}
