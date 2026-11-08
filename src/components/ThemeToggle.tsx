"use client";

import React, { useEffect, useRef, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    setMounted(true);

    // Initialisation
    const isCurrentlyDark =
      document.documentElement.classList.contains("dark") ||
      localStorage.getItem("theme") === "dark" ||
      (!localStorage.getItem("theme") &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    setIsDark(isCurrentlyDark);
    if (isCurrentlyDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Écoute de synchronisation
    const handleThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ isDark: boolean }>;
      if (customEvent.detail && typeof customEvent.detail.isDark === "boolean") {
        setIsDark(customEvent.detail.isDark);
      } else {
        setIsDark(document.documentElement.classList.contains("dark"));
      }
    };

    window.addEventListener("horlo:theme-changed", handleThemeChange);
    return () => window.removeEventListener("horlo:theme-changed", handleThemeChange);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const nextIsDark = !isDark;
    setIsDark(nextIsDark);

    // Coordonnées du bouton pour faire jaillir les météorites précisément depuis son centre
    let x = e.clientX;
    let y = e.clientY;

    if (btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      x = rect.left + rect.width / 2;
      y = rect.top + rect.height / 2;
    }

    // Émission de l'événement de transition cascade
    window.dispatchEvent(
      new CustomEvent("horlo:trigger-theme-transition", {
        detail: { x, y, nextIsDark },
      })
    );
  };

  if (!mounted) {
    return (
      <div
        aria-hidden="true"
        className={`h-9 w-14 rounded-full border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-900 ${className}`}
      />
    );
  }

  return (
    <button
      ref={btnRef}
      type="button"
      onClick={handleClick}
      aria-label={isDark ? "Activer le mode clair" : "Activer le mode sombre"}
      title={isDark ? "Passer en mode atelier clair" : "Passer en mode céleste sombre"}
      className={`relative inline-flex h-8 w-14 items-center rounded-full border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#c2a36d]/50 cursor-pointer ${
        isDark
          ? "border-violet-500/40 bg-[#0c0e17] shadow-[0_0_12px_rgba(167,139,250,0.25)]"
          : "border-[#d7d0c4] bg-[#faf7f1] shadow-sm hover:border-[#9c7a43]/50"
      } ${className}`}
    >
      <span
        className={`grid h-6 w-6 transform place-items-center rounded-full text-xs transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          isDark
            ? "translate-x-7 bg-[#1c2136] text-[#c4b5fd] shadow-[0_0_8px_rgba(167,139,250,0.5)]"
            : "translate-x-1 bg-white text-[#ea8d24] shadow-md"
        }`}
      >
        {isDark ? (
          <Moon className="h-3.5 w-3.5" strokeWidth={2} />
        ) : (
          <Sun className="h-3.5 w-3.5" strokeWidth={2} />
        )}
      </span>
      <span className="sr-only">
        {isDark ? "Mode clair" : "Mode sombre"}
      </span>
    </button>
  );
}

export default ThemeToggle;
