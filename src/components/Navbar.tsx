// src/components/Navbar.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Search,
  ChevronDown,
  Compass,
  Eye,
  Swords,
  Wrench,
  Droplet,
  Sparkles,
  Radio,
  BookOpen,
  Globe,
  Users,
  Calendar,
  Newspaper,
  Award
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import LanguageSelector from "@/components/LanguageSelector";

interface NavbarProps {
  onSearchClick?: () => void;
}

export default function Navbar({ onSearchClick }: NavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Close dropdown on route change
  useEffect(() => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  }, [pathname]);

  const handleMouseEnter = (name: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(name);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  // Structured sections for Mobile Drawer
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
      title: "Atelier & Métrologie",
      links: [
        { href: "/pratique/laboratoire", label: "Laboratoire (11 Bancs)" },
        { href: "/pratique/inspection-loupe", label: "Loupe Macro 20x" },
        { href: "/pratique/defi-chronometre", label: "⚔️ Défi Chrono" },
        { href: "/outils", label: "Outils d'Établi" },
        { href: "/pratique/huilage", label: "Guide de Huilage" },
      ],
    },
    {
      title: "Patrimoine",
      links: [
        { href: "/suisse", label: "🇨🇭 Suisse" },
        { href: "/podcasts", label: "Podcasts" },
        { href: "/culture", label: "Culture" },
        { href: "/fuseaux-horaires", label: "Fuseaux" },
      ],
    },
    {
      title: "Cercle",
      links: [
        { href: "/communaute", label: "Communauté" },
        { href: "/evenements", label: "Événements" },
        { href: "/actualites", label: "Actualités" },
      ],
    },
  ];

  const isLinkActive = (href: string) => {
    if (href === "/theorie") return pathname.startsWith("/theorie");
    if (href === "/pratique") return pathname === "/pratique";
    return pathname === href;
  };

  return (
    <header className="sticky top-3 sm:top-4 z-50 px-3 sm:px-5 lg:px-8 max-w-[1720px] mx-auto w-full transition-all duration-300">
      <nav className="w-full bg-white/95 dark:bg-[#07090E]/95 text-slate-900 dark:text-white border border-gray-200/90 dark:border-amber-500/25 rounded-2xl backdrop-blur-xl shadow-xl dark:shadow-[0_10px_35px_rgba(0,0,0,0.7)] transition-colors duration-300">
        <div className="px-3 sm:px-5 lg:px-7 py-2 sm:py-2.5 flex items-center justify-between gap-3 xl:gap-6">
          
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

          {/* RUBAN CAPSULE ÉPURÉ HAUTE HORLOGERIE (7 ÉLÉMENTS AÉRÉS AU LIEU DE 13) */}
          <div className="hidden lg:flex items-center p-1 rounded-full bg-slate-100/90 dark:bg-slate-900/85 border border-slate-200/90 dark:border-amber-500/25 shadow-md shadow-black/5 dark:shadow-[0_4px_25px_rgba(0,0,0,0.5)] backdrop-blur-xl">
            
            {/* 1. Théorie */}
            <Link
              href="/theorie"
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                isLinkActive("/theorie")
                  ? "bg-amber-500/20 text-amber-700 dark:text-amber-300 font-bold border border-amber-500/30 shadow-sm"
                  : "text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-300 hover:bg-slate-200/50 dark:hover:bg-slate-800/50"
              }`}
            >
              Théorie
            </Link>

            {/* 2. Pratique */}
            <Link
              href="/pratique"
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                isLinkActive("/pratique")
                  ? "bg-amber-500/20 text-amber-700 dark:text-amber-300 font-bold border border-amber-500/30 shadow-sm"
                  : "text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-300 hover:bg-slate-200/50 dark:hover:bg-slate-800/50"
              }`}
            >
              Pratique
            </Link>

            {/* 3. Grand Laboratoire (avec puce dorée pulsante) */}
            <Link
              href="/pratique/laboratoire"
              className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                pathname === "/pratique/laboratoire"
                  ? "bg-amber-500/25 text-amber-800 dark:text-amber-300 border border-amber-500/50 shadow-sm"
                  : "text-slate-800 dark:text-slate-200 hover:text-amber-600 dark:hover:text-amber-300 hover:bg-slate-200/50 dark:hover:bg-slate-800/50"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 dark:bg-amber-400 animate-pulse" />
              <span>Laboratoire</span>
            </Link>

            {/* Séparateur subtil */}
            <span className="w-px h-3.5 bg-slate-300 dark:bg-slate-800 mx-1" />

            {/* 4. Menu Déroulant : Ateliers & Métrologie */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("atelier")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1 transition-all ${
                  activeDropdown === "atelier" || pathname.startsWith("/pratique/inspection-loupe") || pathname.startsWith("/pratique/defi-chronometre") || pathname === "/outils"
                    ? "text-amber-700 dark:text-amber-300 font-bold bg-amber-500/15 border border-amber-500/30"
                    : "text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-300 hover:bg-slate-200/50 dark:hover:bg-slate-800/50"
                }`}
              >
                <span>Atelier</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === "atelier" ? "rotate-180 text-amber-500" : "opacity-60"}`} />
              </button>

              {activeDropdown === "atelier" && (
                <div className="absolute top-full left-0 mt-2 w-72 p-2 rounded-2xl bg-white/95 dark:bg-[#0c121e]/95 border border-slate-200 dark:border-amber-500/30 shadow-2xl backdrop-blur-xl space-y-1 font-mono text-xs animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                  <Link
                    href="/pratique/laboratoire"
                    className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-amber-500/10 dark:hover:bg-amber-500/15 transition group"
                  >
                    <Compass className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                    <div>
                      <strong className="block text-slate-900 dark:text-white group-hover:text-amber-500 font-sans text-xs">
                        Grand Laboratoire d&apos;Établi
                      </strong>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400">
                        11 bancs d&apos;essais Witschi, came 7750, Lavet
                      </span>
                    </div>
                  </Link>

                  <Link
                    href="/pratique/inspection-loupe"
                    className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-amber-500/10 dark:hover:bg-amber-500/15 transition group"
                  >
                    <Eye className="w-4 h-4 text-cyan-500 mt-0.5 shrink-0" />
                    <div>
                      <strong className="block text-slate-900 dark:text-white group-hover:text-cyan-400 font-sans text-xs">
                        Loupe Macro d&apos;Atelier ×20
                      </strong>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400">
                        Inspection de défauts réels sous binoculaire
                      </span>
                    </div>
                  </Link>

                  <Link
                    href="/pratique/defi-chronometre"
                    className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-amber-500/10 dark:hover:bg-amber-500/15 transition group"
                  >
                    <Swords className="w-4 h-4 text-rose-500 mt-0.5 shrink-0" />
                    <div>
                      <strong className="block text-slate-900 dark:text-white group-hover:text-rose-400 font-sans text-xs">
                        Défi Chronométré (Mode Duel)
                      </strong>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400">
                        10 questions sous pression &amp; partage WhatsApp
                      </span>
                    </div>
                  </Link>

                  <Link
                    href="/outils"
                    className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-amber-500/10 dark:hover:bg-amber-500/15 transition group"
                  >
                    <Wrench className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                    <div>
                      <strong className="block text-slate-900 dark:text-white group-hover:text-emerald-400 font-sans text-xs">
                        Arsenal d&apos;Outils &amp; Équipement
                      </strong>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400">
                        Brucelles Dumont, tournevis, potence Robur
                      </span>
                    </div>
                  </Link>

                  <Link
                    href="/pratique/huilage"
                    className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-amber-500/10 dark:hover:bg-amber-500/15 transition group"
                  >
                    <Droplet className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                    <div>
                      <strong className="block text-slate-900 dark:text-white group-hover:text-amber-400 font-sans text-xs">
                        Guide &amp; Cartographie de Huilage
                      </strong>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400">
                        Protocole des 25 points Moebius 4 godets
                      </span>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* 5. Menu Déroulant : Patrimoine */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("patrimoine")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1 transition-all ${
                  activeDropdown === "patrimoine" || pathname === "/suisse" || pathname === "/podcasts" || pathname === "/culture" || pathname === "/fuseaux-horaires"
                    ? "text-amber-700 dark:text-amber-300 font-bold bg-amber-500/15 border border-amber-500/30"
                    : "text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-300 hover:bg-slate-200/50 dark:hover:bg-slate-800/50"
                }`}
              >
                <span>Patrimoine</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === "patrimoine" ? "rotate-180 text-amber-500" : "opacity-60"}`} />
              </button>

              {activeDropdown === "patrimoine" && (
                <div className="absolute top-full left-0 mt-2 w-64 p-2 rounded-2xl bg-white/95 dark:bg-[#0c121e]/95 border border-slate-200 dark:border-amber-500/30 shadow-2xl backdrop-blur-xl space-y-1 font-mono text-xs animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                  <Link
                    href="/suisse"
                    className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-amber-500/10 dark:hover:bg-amber-500/15 transition group"
                  >
                    <span className="text-base shrink-0">🇨🇭</span>
                    <div>
                      <strong className="block text-slate-900 dark:text-white group-hover:text-amber-500 font-sans text-xs">
                        Suisse Horlogère
                      </strong>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400">
                        Berceau des manufactures &amp; vallées
                      </span>
                    </div>
                  </Link>

                  <Link
                    href="/podcasts"
                    className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-amber-500/10 dark:hover:bg-amber-500/15 transition group"
                  >
                    <Radio className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                    <div>
                      <strong className="block text-slate-900 dark:text-white group-hover:text-cyan-400 font-sans text-xs">
                        Podcasts d&apos;Artisans
                      </strong>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400">
                        Paroles d&apos;horlogers &amp; récits d&apos;établi
                      </span>
                    </div>
                  </Link>

                  <Link
                    href="/culture"
                    className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-amber-500/10 dark:hover:bg-amber-500/15 transition group"
                  >
                    <BookOpen className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                    <div>
                      <strong className="block text-slate-900 dark:text-white group-hover:text-amber-400 font-sans text-xs">
                        Culture &amp; Complications
                      </strong>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400">
                        Histoire des calibres mythiques
                      </span>
                    </div>
                  </Link>

                  <Link
                    href="/fuseaux-horaires"
                    className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-amber-500/10 dark:hover:bg-amber-500/15 transition group"
                  >
                    <Globe className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    <div>
                      <strong className="block text-slate-900 dark:text-white group-hover:text-emerald-400 font-sans text-xs">
                        Fuseaux Horaires &amp; GMT
                      </strong>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400">
                        Horloge mondiale &amp; calcul d&apos;heures
                      </span>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* 6. Menu Déroulant : Cercle */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("cercle")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1 transition-all ${
                  activeDropdown === "cercle" || pathname === "/communaute" || pathname === "/evenements" || pathname === "/actualites"
                    ? "text-amber-700 dark:text-amber-300 font-bold bg-amber-500/15 border border-amber-500/30"
                    : "text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-300 hover:bg-slate-200/50 dark:hover:bg-slate-800/50"
                }`}
              >
                <span>Cercle</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === "cercle" ? "rotate-180 text-amber-500" : "opacity-60"}`} />
              </button>

              {activeDropdown === "cercle" && (
                <div className="absolute top-full right-0 mt-2 w-64 p-2 rounded-2xl bg-white/95 dark:bg-[#0c121e]/95 border border-slate-200 dark:border-amber-500/30 shadow-2xl backdrop-blur-xl space-y-1 font-mono text-xs animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                  <Link
                    href="/communaute"
                    className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-amber-500/10 dark:hover:bg-amber-500/15 transition group"
                  >
                    <Users className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                    <div>
                      <strong className="block text-slate-900 dark:text-white group-hover:text-cyan-400 font-sans text-xs">
                        Communauté d&apos;Établi
                      </strong>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400">
                        Échanges entre passionnés &amp; artisans
                      </span>
                    </div>
                  </Link>

                  <Link
                    href="/evenements"
                    className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-amber-500/10 dark:hover:bg-amber-500/15 transition group"
                  >
                    <Calendar className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                    <div>
                      <strong className="block text-slate-900 dark:text-white group-hover:text-amber-400 font-sans text-xs">
                        Événements &amp; Salons
                      </strong>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400">
                        Watches &amp; Wonders, Geneva Watch Days
                      </span>
                    </div>
                  </Link>

                  <Link
                    href="/actualites"
                    className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-amber-500/10 dark:hover:bg-amber-500/15 transition group"
                  >
                    <Newspaper className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    <div>
                      <strong className="block text-slate-900 dark:text-white group-hover:text-emerald-400 font-sans text-xs">
                        Actualités Horlogères
                      </strong>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400">
                        Dernières parutions &amp; nouveautés
                      </span>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* Séparateur subtil */}
            <span className="w-px h-3.5 bg-slate-300 dark:bg-slate-800 mx-1" />

            {/* 7. Quiz */}
            <Link
              href="/quiz"
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                isLinkActive("/quiz")
                  ? "bg-amber-500/20 text-amber-700 dark:text-amber-300 font-bold border border-amber-500/30 shadow-sm"
                  : "text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-300 hover:bg-slate-200/50 dark:hover:bg-slate-800/50"
              }`}
            >
              Quiz
            </Link>

          </div>

          {/* Actions Droite Desktop (Recherche + Langue + Thème) */}
          <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
            {onSearchClick && (
              <button
                onClick={onSearchClick}
                className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-amber-500/50 transition-colors text-xs notranslate cursor-pointer"
                translate="no"
                title="Rechercher (Ctrl K)"
              >
                <Search className="w-3.5 h-3.5 text-gray-700 dark:text-gray-300 flex-shrink-0" />
                <kbd className="px-1.5 py-0.5 text-[10px] bg-white dark:bg-slate-950 rounded border border-gray-300 dark:border-gray-700 text-gray-500 font-mono">
                  ⌘K
                </kbd>
              </button>
            )}

            <LanguageSelector />
            <ThemeToggle />
          </div>

          {/* Actions Droite Mobile/Tablette (Recherche + Langue + Thème + Menu) */}
          <div className="lg:hidden flex items-center gap-1.5 sm:gap-2">
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
          <div className="lg:hidden border-t border-slate-200/80 dark:border-amber-500/20 bg-white/95 dark:bg-[#07090E]/98 px-4 py-5 space-y-5 rounded-b-2xl">
            {navSections.map((section, idx) => (
              <div key={section.title} className="space-y-2">
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#E2B44F] font-bold flex items-center gap-2">
                  <span>0{idx + 1}.</span>
                  <span>{section.title}</span>
                  <span className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
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

            <div className="pt-2">
              <Link
                href="/theorie"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
              >
                <span>Entrer dans l&apos;Atelier</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
