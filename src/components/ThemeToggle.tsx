"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const btnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        aria-hidden="true"
        className={`h-8 w-16 rounded-full border border-[#d7d0c4] dark:border-white/10 bg-[#e4e7ee] dark:bg-[#090c13] opacity-60 ${className}`}
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const nextIsDark = !isDark;

    // Coordonnées exactes du bouton pour faire jaillir la pluie de météorites
    let x = e.clientX;
    let y = e.clientY;
    if (btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      x = rect.left + rect.width / 2;
      y = rect.top + rect.height / 2;
    }

    // Déclenchement de l'animation de cascade continue Voronoï
    window.dispatchEvent(
      new CustomEvent("horlo:trigger-theme-transition", {
        detail: {
          x,
          y,
          nextIsDark,
          commitTheme: () => {
            const systemIsDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            const meta = document.querySelector<HTMLMetaElement>('meta[name="color-scheme"]');
            if (nextIsDark === systemIsDark) {
              setTheme("system");
              if (meta) meta.setAttribute("content", "light dark");
            } else {
              const explicitTheme = nextIsDark ? "dark" : "light";
              setTheme(explicitTheme);
              if (meta) meta.setAttribute("content", explicitTheme);
            }
          },
        },
      })
    );
  };

  return (
    <button
      ref={btnRef}
      type="button"
      onClick={handleClick}
      aria-label={isDark ? "Activer le mode atelier clair" : "Activer le mode céleste sombre"}
      title={isDark ? "Mode atelier clair" : "Mode céleste sombre"}
      className={`relative inline-flex h-8 w-16 items-center rounded-full border p-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#c2a36d]/50 cursor-pointer ${
        isDark
          ? "border-violet-500/30 bg-[#090c13] shadow-[0_0_15px_rgba(167,139,250,0.2)]"
          : "border-[#d7d0c4] bg-[#e4e7ee] shadow-sm hover:border-[#9c7a43]/60"
      } ${className}`}
    >
      <span
        className={`grid h-7 w-7 transform place-items-center rounded-full text-xs transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          isDark
            ? "translate-x-8 bg-[#1a2032] text-[#c4b5fd] shadow-[0_0_10px_rgba(167,139,250,0.6)]"
            : "translate-x-0 bg-white text-[#ea8d24] shadow-md"
        }`}
      >
        {isDark ? (
          <Moon className="h-3.5 w-3.5" strokeWidth={2.2} />
        ) : (
          <Sun className="h-3.5 w-3.5" strokeWidth={2.2} />
        )}
      </span>
      <span className="sr-only">
        {isDark ? "Passer au mode clair" : "Passer au mode sombre"}
      </span>
    </button>
  );
}

export default ThemeToggle;
