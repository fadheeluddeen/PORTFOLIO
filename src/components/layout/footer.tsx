import { site } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="relative px-6 pb-10">
      <div className="skeuo mx-auto flex max-w-6xl flex-col gap-4 rounded-3xl px-7 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="skeuo-medallion font-display grid size-10 place-items-center rounded-xl text-xs font-extrabold">
            FK
          </span>
          <div>
            <p className="font-display font-bold">{site.name}</p>
            <p className="text-muted-foreground text-sm">{site.title}</p>
          </div>
        </div>
        <p className="text-muted-foreground text-sm">
          Built with React, HeroUI, Tailwind &amp; filter coffee · © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
