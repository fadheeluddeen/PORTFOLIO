import { cn } from "@/lib/utils";

type AuroraBackgroundProps = {
  variant?: "hero" | "ambient";
  className?: string;
};

/**
 * Layered animated aurora gradients. `hero` is vivid and local to a section;
 * `ambient` is a subtle fixed wash behind the whole page.
 */
export function AuroraBackground({ variant = "hero", className }: AuroraBackgroundProps) {
  const isHero = variant === "hero";

  return (
    <div
      aria-hidden="true"
      className={cn(
        "noise-overlay overflow-hidden",
        isHero ? "absolute inset-0 z-0" : "fixed inset-0 -z-10",
        className,
      )}
    >
      <div
        className={cn(
          "aurora-blob aurora-blob-1 -top-1/4 -left-1/4 h-[60vh] w-[60vw]",
          isHero ? "opacity-40" : "opacity-15",
        )}
        style={{
          background:
            "radial-gradient(ellipse at center, oklch(0.55 0.24 285 / 0.55), transparent 65%)",
        }}
      />
      <div
        className={cn(
          "aurora-blob aurora-blob-2 top-1/4 -right-1/4 h-[55vh] w-[55vw]",
          isHero ? "opacity-35" : "opacity-12",
        )}
        style={{
          background:
            "radial-gradient(ellipse at center, oklch(0.6 0.18 195 / 0.5), transparent 65%)",
        }}
      />
      <div
        className={cn(
          "aurora-blob aurora-blob-3 -bottom-1/4 left-1/3 h-[50vh] w-[50vw]",
          isHero ? "opacity-30" : "opacity-10",
        )}
        style={{
          background:
            "radial-gradient(ellipse at center, oklch(0.62 0.2 330 / 0.45), transparent 65%)",
        }}
      />
    </div>
  );
}
