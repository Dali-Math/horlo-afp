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

  const navLinks = [
    { href: "/pratique", label: "Pratique" },
    { href: "/quiz", label: "Quiz" },
    { href: "/outils", label: "Outils" },
    { href: "/ressources", label: "Ressources" },
    { href: "/suisse", label: "🇨🇭 Suisse" },
    { href: "/fuseaux-horaires", label: "Fuseaux Horaires" },
    { href: "/podcasts", label: "Podcasts" },
    { href: "/culture", label: "Culture" },
    { href: "/evenements", label: "Événements" },
    { href: "/communaute", label: "Communauté" },
    { href: "/actualites", label: "Actualités" },
  ];

  return (
    <nav className="w-full bg-white dark:bg-[#0A0A0A] text-slate-900 dark:text-white border-b border-gray-200 dark:border-gray-800 relative z-50 transition-colors duration-300">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-2 xl:gap-4">
        
        {/* Logo (Notranslate pour éviter les déformations) */}
        <Link
          href="/"
          className="flex items-center gap-2.5 hover:opacity-90 transition-opacity flex-shrink-0 notranslate"
          translate="no"
        >
          <Image
            src="/logos/Logo.jpg"
            alt="HorloLearn Logo"
            width={40}
            height={40}
            className="rounded-full flex-shrink-0"
            priority
          />
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-white notranslate tracking-tight" translate="no">
              Horlo<span className="text-[#E2B44F]">Learn</span>
            </span>
            <span className="text-[10px] text-[#E2B44F] leading-tight hidden sm:block whitespace-nowrap">
              Culture &amp; savoir-faire horloger
            </span>
          </div>
        </Link>

        {/* Liens Desktop (Visibles sur écrans larges avec espacement optimisé) */}
        <div className="hidden xl:flex items-center gap-2.5 2xl:gap-4 text-[12px] 2xl:text-[13px] font-medium whitespace-nowrap overflow-hidden">
          <Link
            href="/theorie"
            className={`transition-colors py-1 ${
              pathname.startsWith("/theorie")
                ? "text-[#E2B44F] font-bold border-b-2 border-[#E2B44F]"
                : "hover:text-[#E2B44F] text-slate-700 dark:text-gray-300"
            }`}
          >
            Théorie
          </Link>

          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`transition-colors py-1 ${
                pathname === href
                  ? "text-[#E2B44F] font-bold border-b-2 border-[#E2B44F]"
                  : "hover:text-[#E2B44F] text-slate-700 dark:text-gray-300"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Actions Droite Desktop (Recherche + Langue + Thème) */}
        <div className="hidden xl:flex items-center gap-2 2xl:gap-3 flex-shrink-0">
          {/* 🔍 Bouton de recherche compact */}
          {onSearchClick && (
            <button
              onClick={onSearchClick}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-xs notranslate"
              translate="no"
              title="Rechercher (Ctrl K)"
            >
              <Search className="w-3.5 h-3.5 text-gray-700 dark:text-gray-300 flex-shrink-0" />
              <span className="hidden 2xl:inline text-xs text-gray-700 dark:text-gray-300 notranslate" translate="no">
                Recherche
              </span>
              <kbd className="px-1.5 py-0.5 text-[10px] bg-white dark:bg-gray-900 rounded border border-gray-300 dark:border-gray-700 text-gray-500 font-mono">
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
        <div className="xl:hidden flex items-center gap-2">
          {onSearchClick && (
            <button
              onClick={onSearchClick}
              className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-[#E2B44F]"
              aria-label="Rechercher"
            >
              <Search className="w-4 h-4" />
            </button>
          )}

          <LanguageSelector />
          <ThemeToggle />

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-slate-900 dark:text-white hover:text-[#E2B44F] transition-colors rounded-lg bg-gray-100 dark:bg-gray-800"
            aria-label="Toggle menu"
            aria-controls="mobile-menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Menu Déroulant Mobile/Tablette */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          className="xl:hidden w-full border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0A0A0A] px-4 py-4 shadow-xl"
        >
          <div className="flex flex-col space-y-1">
            <Link
              href="/theorie"
              className={`py-2 px-3 rounded-lg text-sm transition-colors ${
                pathname.startsWith("/theorie")
                  ? "text-[#E2B44F] font-bold bg-amber-500/10 border-l-4 border-[#E2B44F]"
                  : "text-slate-700 dark:text-gray-300 hover:text-[#E2B44F] hover:bg-gray-100 dark:hover:bg-gray-900"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Théorie
            </Link>

            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`py-2 px-3 rounded-lg text-sm transition-colors ${
                  pathname === href
                    ? "text-[#E2B44F] font-bold bg-amber-500/10 border-l-4 border-[#E2B44F]"
                    : "text-slate-700 dark:text-gray-300 hover:text-[#E2B44F] hover:bg-gray-100 dark:hover:bg-gray-900"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
