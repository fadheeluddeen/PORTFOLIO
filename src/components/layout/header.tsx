import { useEffect, useState } from "react";
import { Download, Menu, X } from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";
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
          "fixed inset-x-0 top-4 z-50 mx-auto hidden w-fit max-w-[calc(100%-2rem)] items-center gap-1.5 rounded-full p-2 transition-all duration-300 md:flex",
          "skeuo",
        )}
      >
        <a
          href="#top"
          className="font-display mr-1 flex items-center gap-2 rounded-full px-2 py-1 text-sm font-bold tracking-tight"
        >
          <span className="skeuo-medallion font-display size-9 rounded-2xl text-xs font-extrabold">
            FK
          </span>
        </a>

        <nav className="skeuo-inset flex items-center gap-0.5 rounded-full p-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "relative rounded-full px-3.5 py-1.5 text-sm font-semibold transition-all",
                active === link.href
                  ? "skeuo-chip text-primary !px-3.5 !py-1.5"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <ThemeToggle />

        <a href={site.resumePath} download className="skeuo-btn ml-0.5 flex items-center gap-2 px-4 py-2 text-sm font-bold">
          <Download className="size-4" />
          Resume
        </a>
      </header>

      {/* Mobile header */}
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between px-4 transition-all duration-300 md:hidden",
          scrolled && "skeuo !rounded-none",
        )}
      >
        <a href="#top" className="font-display flex items-center gap-2 font-bold">
          <span className="skeuo-medallion font-display size-9 rounded-2xl text-xs font-extrabold">
            FK
          </span>
          {site.name}
        </a>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="skeuo-btn-ghost grid size-10 place-items-center rounded-full"
          >
            <Menu className="size-5" />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-[60] transition-opacity duration-300 md:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <div className="bg-foreground/40 absolute inset-0 backdrop-blur-sm" onClick={() => setOpen(false)} />
        <div
          className={cn(
            "skeuo absolute top-3 right-3 bottom-3 flex w-[78%] max-w-xs flex-col gap-1 rounded-3xl p-5 transition-transform duration-300",
            open ? "translate-x-0" : "translate-x-[110%]",
          )}
        >
          <div className="mb-4 flex items-center justify-between">
            <span className="font-display font-bold">{site.name}</span>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="skeuo-btn-ghost grid size-9 place-items-center rounded-full"
            >
              <X className="size-4" />
            </button>
          </div>
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-2xl px-4 py-3 text-sm font-semibold transition-colors",
                  active === link.href
                    ? "skeuo-inset text-primary"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <a
            href={site.resumePath}
            download
            onClick={() => setOpen(false)}
            className="skeuo-btn mt-4 flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold"
          >
            <Download className="size-4" />
            Download Resume
          </a>
        </div>
      </div>
    </>
  );
}
