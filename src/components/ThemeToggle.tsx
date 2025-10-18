"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

// ⚙️ Change cette valeur pour changer le style du bouton
// Options: "default" | "switch" | "minimal" | "withText"
const TOGGLE_STYLE: "default" | "switch" | "minimal" | "withText" = "default";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Placeholder pendant le chargement
  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-lg bg-white/10 dark:bg-white/5 animate-pulse" />
    );
  }

  // 🎨 VARIANTE 1 : DEFAULT (icône avec animation rotate)
  if (TOGGLE_STYLE === "default") {
    return (
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="relative group p-2.5 rounded-xl bg-white/10 hover:bg-white/20 dark:bg-white/5 dark:hover:bg-white/10 border border-white/20 dark:border-white/10 transition-all duration-300 hover:scale-110 active:scale-95"
        aria-label={theme === "dark" ? "Activer le mode clair" : "Activer le mode sombre"}
        title={theme === "dark" ? "Mode clair" : "Mode sombre"}
      >
        <div className="relative w-5 h-5">
          <Sun className="absolute inset-0 w-5 h-5 text-amber-500 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute inset-0 w-5 h-5 text-blue-400 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
        </div>
        
        {/* Tooltip */}
        <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-black/90 dark:bg-white/90 text-white dark:text-black text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none shadow-lg z-50">
          {theme === "dark" ? "Mode clair" : "Mode sombre"}
        </span>
      </button>
    );
  }

  // 🎨 VARIANTE 2 : SWITCH (style iOS toggle)
  if (TOGGLE_STYLE === "switch") {
    return (
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="relative w-14 h-7 bg-slate-300 dark:bg-neutral-700 rounded-full transition-colors duration-300 hover:bg-slate-400 dark:hover:bg-neutral-600"
        aria-label={theme === "dark" ? "Activer le mode clair" : "Activer le mode sombre"}
        title={theme === "dark" ? "Mode clair" : "Mode sombre"}
      >
        <div 
          className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 flex items-center justify-center ${
            theme === "dark" ? "translate-x-7" : ""
          }`}
        >
          {theme === "dark" ? (
            <Moon className="w-3 h-3 text-blue-500" />
          ) : (
            <Sun className="w-3 h-3 text-amber-500" />
          )}
        </div>
      </button>
    );
  }

  // 🎨 VARIANTE 3 : MINIMAL (sans bordure)
  if (TOGGLE_STYLE === "minimal") {
    return (
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="p-2 rounded-lg hover:bg-white/10 dark:hover:bg-white/5 transition-all duration-200 active:scale-95"
        aria-label={theme === "dark" ? "Activer le mode clair" : "Activer le mode sombre"}
        title={theme === "dark" ? "Mode clair" : "Mode sombre"}
      >
        {theme === "dark" ? (
          <Moon className="w-5 h-5 text-blue-400 transition-transform duration-300 hover:rotate-12" />
        ) : (
          <Sun className="w-5 h-5 text-amber-500 transition-transform duration-300 hover:rotate-90" />
        )}
      </button>
    );
  }

  // 🎨 VARIANTE 4 : WITH TEXT (avec texte)
  if (TOGGLE_STYLE === "withText") {
    return (
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 dark:bg-white/5 dark:hover:bg-white/10 border border-white/20 dark:border-white/10 transition-all duration-300 hover:scale-105 active:scale-95"
        aria-label={theme === "dark" ? "Activer le mode clair" : "Activer le mode sombre"}
      >
        {theme === "dark" ? (
          <>
            <Moon className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-white">Sombre</span>
          </>
        ) : (
          <>
            <Sun className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-medium text-slate-900">Clair</span>
          </>
        )}
      </button>
    );
  }

  // Fallback par défaut
  return null;
}
