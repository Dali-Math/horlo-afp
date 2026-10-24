// src/components/Navbar.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Search } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import LanguageSelector from "@/components/LanguageSelector";

interface NavbarProps {
  onSearchClick?: () => void;
}

export default function Navbar({ onSearchClick }: NavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Groupes thématiques structurés pour le Ruban Capsule Haute Horlogerie
  const navSections = [
    {
      title: "Académie",
      links: [
        { href: "/theorie", label: "Théorie" },
        { href: "/pratique", label: "Pratique" },
        { href: "/quiz", label: "Quiz" },
      ],
    },
    {
      title: "Atelier",
      links: [
        { href: "/outils", label: "Outils" },
        { href: "/ressources", label: "Ressources" },
        { href: "/fuseaux-horaires", label: "Fuseaux" },
      ],
    },
    {
      title: "Patrimoine",
      links: [
        { href: "/suisse", label: "🇨🇭 Suisse" },
        { href: "/podcasts", label: "Podcasts" },
        { href: "/culture", label: "Culture" },
      ],
    },
    {
      title: "Cercle",
      links: [
        { href: "/evenements", label: "Événements" },
        { href: "/communaute", label: "Communauté" },
        { href: "/actualites", label: "Actualités" },
      ],
    },
  ];

  const isLinkActive = (href: string) => {
    if (href === "/theorie") {
      return pathname.startsWith("/theorie");
    }
    return pathname === href;
  };

  return (
    <nav className="w-full bg-white/90 dark:bg-[#07090E]/90 text-slate-900 dark:text-white border-b border-gray-200/80 dark:border-amber-500/20 sticky top-0 z-50 backdrop-blur-xl transition-colors duration-300 shadow-sm">
      <div className="max-w-[1680px] mx-auto px-3 sm:px-5 lg:px-8 py-2.5 flex items-center justify-between gap-2 xl:gap-4">
        
        {/* Logo HorloLearn Officiel */}
        <Link
          href="/"
          className="flex items-center gap-2.5 hover:opacity-90 transition-opacity flex-shrink-0 notranslate"
          translate="no"
        >
          <Image
            src="/logos/Logo.jpg"
            alt="HorloLearn Logo"
            width={38}
            height={38}
            className="rounded-full flex-shrink-0 ring-1 ring-amber-500/30"
            priority
          />
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-white notranslate tracking-tight font-serif" translate="no">
              Horlo<span className="text-[#E2B44F]">Learn</span>
            </span>
            <span className="text-[9px] text-[#E2B44F] leading-tight hidden sm:block whitespace-nowrap tracking-wider uppercase font-mono">
              Culture &amp; Savoir-Faire
            </span>
          </div>
        </Link>

        {/* PROPOSITION 1 : Le Ruban Capsule & Glassmorphism Flottant (Écrans larges & Laptops) */}
        <div className="hidden xl:flex items-center p-1 rounded-full bg-slate-100/90 dark:bg-slate-900/85 border border-slate-200/80 dark:border-amber-500/25 shadow-lg shadow-black/5 dark:shadow-[0_4px_25px_rgba(0,0,0,0.5)] backdrop-blur-xl max-w-full overflow-x-auto no-scrollbar">
          {navSections.map((section, sIdx) => (
            <React.Fragment key={section.title}>
              {sIdx > 0 && (
                <span className="w-px h-3.5 bg-slate-300 dark:bg-slate-800 mx-1 flex-shrink-0" />
              )}
              {section.links.map(({ href, label }) => {
                const active = isLinkActive(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`px-2.5 2xl:px-3 py-1 2xl:py-1.5 rounded-full text-[11px] 2xl:text-xs font-medium whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 flex-shrink-0 ${
                      active
                        ? "bg-gradient-to-r from-amber-500/20 via-amber-400/15 to-amber-500/20 border border-amber-500/40 text-amber-700 dark:text-amber-300 font-semibold shadow-sm"
                        : "text-slate-600 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-300 hover:bg-slate-200/60 dark:hover:bg-slate-800/60"
                    }`}
                  >
                    {active && (
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 dark:bg-amber-400 animate-pulse flex-shrink-0" />
                    )}
                    <span>{label}</span>
                  </Link>
                );
              })}
            </React.Fragment>
          ))}
        </div>

        {/* Actions Droite Desktop (Recherche + Langue + Thème) */}
        <div className="hidden xl:flex items-center gap-2 2xl:gap-3 flex-shrink-0">
          {/* 🔍 Bouton de recherche compact */}
          {onSearchClick && (
            <button
              onClick={onSearchClick}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg hover:border-amber-500/50 transition-colors text-xs notranslate"
              translate="no"
              title="Rechercher (Ctrl K)"
            >
              <Search className="w-3.5 h-3.5 text-gray-700 dark:text-gray-300 flex-shrink-0" />
              <span className="hidden 2xl:inline text-xs text-gray-700 dark:text-gray-300 notranslate" translate="no">
                Recherche
              </span>
              <kbd className="px-1.5 py-0.5 text-[10px] bg-white dark:bg-slate-950 rounded border border-gray-300 dark:border-gray-700 text-gray-500 font-mono">
                ⌘K
              </kbd>
            </button>
          )}

          {/* 🌐 Sélecteur de langue */}
          <LanguageSelector />

          {/* 🌓 Bascule Thème Clair / Sombre */}
          <ThemeToggle />
        </div>

        {/* Actions Droite Mobile/Tablette (Recherche + Langue + Thème + Menu) */}
        <div className="xl:hidden flex items-center gap-1.5 sm:gap-2">
          {onSearchClick && (
            <button
              onClick={onSearchClick}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 text-gray-700 dark:text-gray-300 hover:text-[#E2B44F] border border-slate-200 dark:border-slate-800"
              aria-label="Rechercher"
            >
              <Search className="w-4 h-4" />
            </button>
          )}

          <LanguageSelector />
          <ThemeToggle />

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-900 dark:text-white hover:text-[#E2B44F] transition-colors rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
            aria-label="Menu de navigation"
            aria-controls="mobile-menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-amber-500" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Menu Déroulant Mobile/Tablette (Harmonisé Capsule Haute Horlogerie & 100% Responsive) */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          className="xl:hidden w-full border-t border-slate-200 dark:border-amber-500/20 bg-white/95 dark:bg-[#07090E]/95 backdrop-blur-2xl px-4 py-5 shadow-2xl transition-all animate-in fade-in slide-in-from-top-2 duration-200"
        >
          <div className="max-w-xl mx-auto space-y-3.5">
            {navSections.map((section) => (
              <div
                key={section.title}
                className="p-2 rounded-2xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 shadow-sm"
              >
                <div className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest text-amber-600 dark:text-amber-400 font-bold">
                  {section.title}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 mt-1">
                  {section.links.map(({ href, label }) => {
                    const active = isLinkActive(href);
                    return (
                      <Link
                        key={href}
                        href={href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`px-3 py-2.5 rounded-xl text-xs font-medium flex items-center justify-between transition-all min-h-[42px] ${
                          active
                            ? "bg-amber-500/15 text-amber-700 dark:text-amber-300 font-bold border border-amber-500/30 shadow-sm"
                            : "text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-300 hover:bg-slate-100 dark:hover:bg-slate-800/60"
                        }`}
                      >
                        <span>{label}</span>
                        {active && (
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 dark:bg-amber-400 animate-pulse" />
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Accès rapide direct Atelier */}
            <div className="pt-1">
              <Link
                href="/theorie"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 active:scale-[0.99] transition-transform"
              >
                <span>Entrer dans l'Atelier Horloger</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
