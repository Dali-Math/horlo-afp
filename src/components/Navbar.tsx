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
        { href: "/pratique/laboratoire", label: "Laboratoire" },
        { href: "/pratique/inspection-loupe", label: "Loupe 20x" },
        { href: "/pratique/defi-chronometre", label: "⚔️ Duel" },
        { href: "/outils", label: "Outils" },
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
    <header className="sticky top-3 sm:top-4 z-50 px-3 sm:px-5 lg:px-8 max-w-[1720px] mx-auto w-full transition-all duration-300">
      <nav className="w-full bg-white/90 dark:bg-[#07090E]/95 text-slate-900 dark:text-white border border-gray-200/80 dark:border-amber-500/25 rounded-2xl backdrop-blur-xl shadow-xl dark:shadow-[0_10px_35px_rgba(0,0,0,0.7)] transition-colors duration-300">
        <div className="px-3 sm:px-5 lg:px-7 py-2 sm:py-2.5 flex items-center justify-between gap-2 xl:gap-4">
          
          {/* Logo HorloLearn Officiel */}
          <Link
            href="/"
            className="flex items-center gap-2.5 hover:opacity-90 transition-opacity flex-shrink-0 notranslate"
            translate="no"
          >
            <Image
              src="/logos/Logo.jpg"
              alt="HorloLearn Logo"
              width={36}
              height={36}
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
                className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg hover:border-amber-500/50 transition-colors text-xs notranslate cursor-pointer"
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
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 text-gray-700 dark:text-gray-300 hover:text-[#E2B44F] border border-slate-200 dark:border-slate-800 cursor-pointer"
                aria-label="Rechercher"
              >
                <Search className="w-4 h-4" />
              </button>
            )}

            <LanguageSelector />
            <ThemeToggle />

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-900 dark:text-white hover:text-[#E2B44F] transition-colors rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 cursor-pointer"
              aria-label="Menu Principal"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* TIROIR MOBILE & TABLETTE DÉROULANT AVEC STRUCTURE DES 4 PÔLES */}
        {mobileMenuOpen && (
          <div className="xl:hidden border-t border-slate-200/80 dark:border-amber-500/20 bg-white/95 dark:bg-[#07090E]/98 px-4 py-5 space-y-5 rounded-b-2xl">
            {navSections.map((section, idx) => (
              <div key={section.title} className="space-y-2">
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#E2B44F] font-bold flex items-center gap-2">
                  <span>0{idx + 1}.</span>
                  <span>{section.title}</span>
                  <span className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {section.links.map(({ href, label }) => {
                    const active = isLinkActive(href);
                    return (
                      <Link
                        key={href}
                        href={href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`px-3 py-2 rounded-xl text-xs text-center font-medium transition-all ${
                          active
                            ? "bg-amber-500/20 text-amber-700 dark:text-amber-300 font-bold border border-amber-500/40"
                            : "bg-slate-100 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"
                        }`}
                      >
                        {label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Bouton CTA d'action mobile */}
            <div className="pt-2">
              <Link
                href="/theorie"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
              >
                <span>Entrer dans l'Atelier</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
