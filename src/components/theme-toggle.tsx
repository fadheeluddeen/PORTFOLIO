import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button, Tooltip } from "@heroui/react";

function getInitialDark() {
  if (typeof window === "undefined") return false;
  const stored = localStorage.getItem("theme");
  if (stored) return stored === "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function ThemeToggle({ className }: { className?: string }) {
  const [dark, setDark] = useState(getInitialDark);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", dark);
    root.classList.toggle("light", !dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <Tooltip>
      <Button
        aria-label="Toggle color theme"
        isIconOnly
        onPress={() => setDark((d) => !d)}
        className={`skeuo-btn-ghost grid size-10 place-items-center rounded-full ${className ?? ""}`}
      >
        {dark ? <Moon className="size-[1.15rem]" /> : <Sun className="size-[1.15rem]" />}
      </Button>
      <Tooltip.Content className="skeuo rounded-lg px-2.5 py-1 text-xs font-semibold">
        {dark ? "Switch to light" : "Switch to dark"}
      </Tooltip.Content>
    </Tooltip>
  );
}
