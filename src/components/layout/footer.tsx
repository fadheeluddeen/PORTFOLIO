import { site } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="border-border/60 relative border-t">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="bg-3d flex size-9 items-center justify-center rounded-xl text-xs font-extrabold">
            FK
          </span>
          <div>
            <p className="font-display font-bold">{site.name}</p>
            <p className="text-muted-foreground text-sm">{site.title}</p>
          </div>
        </div>
        <p className="text-muted-foreground text-sm">
          Built with React, Tailwind &amp; filter coffee · © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
