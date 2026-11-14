"use client";

import { useEffect } from "react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import type { ThemeProviderProps } from "next-themes";

function ColorSchemeMetaSync() {
  const { theme } = useTheme();

  useEffect(() => {
    const syncMeta = () => {
      const meta = document.querySelector<HTMLMetaElement>('meta[name="color-scheme"]');
      if (!meta) return;
      let activeTheme = theme;
      if (!activeTheme) {
        try {
          activeTheme = localStorage.getItem("horlolearn-theme") ?? "system";
        } catch {
          activeTheme = "system";
        }
      }
      meta.setAttribute(
        "content",
        activeTheme === "dark" || activeTheme === "light" ? activeTheme : "light dark"
      );
    };

    syncMeta();
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "horlolearn-theme" || e.key === null) {
        syncMeta();
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [theme]);

  return null;
}

export default function ThemeProvider({
  children,
  ...props
}: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      storageKey="horlolearn-theme"
      disableTransitionOnChange
      {...props}
    >
      <ColorSchemeMetaSync />
      {children}
    </NextThemesProvider>
  );
}
