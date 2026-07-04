import { site } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="border-border/60 border-t">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-md text-xs font-bold">
            FK
          </span>
          <div>
            <p className="font-semibold">{site.name}</p>
            <p className="text-muted-foreground text-sm">{site.title}</p>
          </div>
        </div>
        <p className="text-muted-foreground text-sm">
          Built with React, shadcn/ui and filter coffee · © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
