import { useEffect, useState } from "react";
import { Download, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navLinks, site } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.querySelector<HTMLElement>(link.href))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Desktop floating pill nav */}
      <header
        className={cn(
          "fixed inset-x-0 top-4 z-50 mx-auto hidden w-fit max-w-[calc(100%-2rem)] items-center gap-1 rounded-full px-2 py-2 transition-all duration-300 md:flex",
          "glass-panel shadow-[0_20px_45px_-20px_rgba(0,0,0,0.25)]",
        )}
      >
        <a
          href="#top"
          className="text-foreground mr-1 flex items-center gap-2 rounded-full px-3 py-2 text-sm font-bold tracking-tight font-display"
        >
          <span className="bg-3d flex size-8 items-center justify-center rounded-xl text-xs font-extrabold">
            FK
          </span>
        </a>

        <nav className="flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "text-muted-foreground hover:text-foreground rounded-full px-3.5 py-2 text-sm font-semibold transition-colors",
                active === link.href && "bg-accent text-accent-foreground",
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <Button asChild size="sm" className="btn-3d bg-3d ml-1 rounded-full border-0">
          <a href={site.resumePath} download>
            <Download className="size-4" />
            Resume
          </a>
        </Button>
      </header>

      {/* Mobile header */}
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between px-4 transition-all duration-300 md:hidden",
          scrolled && "glass-panel",
        )}
      >
        <a href="#top" className="flex items-center gap-2 font-display font-bold">
          <span className="bg-3d flex size-8 items-center justify-center rounded-xl text-xs font-extrabold">
            FK
          </span>
          {site.brand}
        </a>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="rounded-full">
              <Menu />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>{site.brand}</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="hover:bg-accent rounded-md px-3 py-2 text-sm font-medium"
                >
                  {link.label}
                </a>
              ))}
              <Button asChild className="bg-3d mt-4 border-0">
                <a href={site.resumePath} download onClick={() => setOpen(false)}>
                  <Download />
                  Download Resume
                </a>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </header>
    </>
  );
}
