"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        aria-hidden="true"
        className="h-9 w-9 border border-hl bg-hl-surface"
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Activer le mode clair" : "Activer le mode sombre"}
      title={isDark ? "Mode clair" : "Mode sombre"}
      className="group relative grid h-9 w-9 place-items-center border border-hl bg-hl-surface text-[var(--hl-ink)] transition hover:border-[var(--hl-metal)] hover:text-[var(--hl-metal)]"
    >
      {isDark ? (
        <Sun className="h-4 w-4" strokeWidth={1.6} />
      ) : (
        <Moon className="h-4 w-4" strokeWidth={1.6} />
      )}
      <span className="sr-only">
        {isDark ? "Passer au mode clair" : "Passer au mode sombre"}
      </span>
    </button>
  );
}
