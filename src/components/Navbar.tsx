"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Search } from "lucide-react";
import { useState, useRef } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";

interface NavbarProps {
  onSearchClick?: () => void;
}

export default function Navbar({ onSearchClick }: NavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theorieOpen, setTheorieOpen] = useState(false);
  const [theorieOpenDesktop, setTheorieOpenDesktop] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const navLinks = [
    { href: "/pratique", label: "Pratique" },
    { href: "/quiz", label: "Quiz" },
    { href: "/outils", label: "Outils" },
    { href: "/ressources", label: "Ressources" },
    { href: "/suisse", label: "🇨🇭 Horlogerie Suisse" },
    { href: "/podcasts", label: "Podcasts" },
    { href: "/culture", label: "Culture" },
    { href: "/evenements", label: "Événements" },
    { href: "/communaute", label: "Communauté" },
    { href: "/actualites", label: "Actualités" },
  ];

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setTheorieOpenDesktop(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setTheorieOpenDesktop(false), 250);
  };

  return (
    <nav className="flex flex-wrap items-center justify-between px-6 md:px-12 py-4 bg-white dark:bg-[#0A0A0A] text-slate-900 dark:text-white border-b border-gray-200 dark:border-gray-800 relative z-50 transition-colors duration-300">
      {/* Logo */}
      <Link
        href="/"
        className="flex items-center gap-3 hover:opacity-90 transition-opacity"
      >
        <Image
          src="/logos/Logo.jpg"
          alt="HorloLearn Logo"
          width={48}
          height={48}
          className="rounded-full"
          priority
        />
        <div className="flex flex-col">
          <span className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">
            Horlo<span className="text-[#E2B44F]">Learn</span>
          </span>
          <span className="text-xs text-[#E2B44F] leading-tight">
            Culture & savoir-faire horloger
          </span>
        </div>
      </Link>

      {/* Liens desktop */}
      <div className="hidden lg:flex items-center gap-6 text-sm font-medium relative">
        {/* Bloc Théorie avec sous-menu */}
        <div
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Link
            href="/theorie"
            className={`flex items-center gap-1 transition-colors ${
              pathname.startsWith("/theorie")
                ? "text-[#E2B44F] font-semibold border-b-2 border-[#E2B44F]"
                : "hover:text-[#E2B44F] text-slate-700 dark:text-gray-300"
            }`}
          >
            Théorie{" "}
            <ChevronDown
              className={`w-4 h-4 mt-0.5 transition-transform duration-200 ${
                theorieOpenDesktop ? "rotate-180 text-[#E2B44F]" : ""
              }`}
            />
          </Link>

          {theorieOpenDesktop && (
            <div
              className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-[#111] border border-[#E2B44F33] rounded-lg shadow-lg transition-all duration-200 ease-out opacity-100 translate-y-0 z-50"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href="/theorie/lecture-de-plan"
                className="block px-4 py-3 text-sm text-slate-700 dark:text-gray-300 hover:bg-[#E2B44F22] hover:text-[#E2B44F] transition-colors"
              >
                Lecture de Plan
              </Link>
            </div>
          )}
        </div>

        {/* Autres liens */}
        {navLinks.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`transition-colors duration-200 ${
              pathname === href
                ? "text-[#E2B44F] font-semibold border-b-2 border-[#E2B44F]"
                : "hover:text-[#E2B44F] text-slate-700 dark:text-gray-300"
            }`}
          >
            {label}
          </Link>
        ))}
      </div>

      {/* Boutons à droite (Desktop) */}
      <div className="hidden lg:flex items-center gap-3">
        {/* 🔍 Bouton de recherche */}
        {onSearchClick && (
          <button
            onClick={onSearchClick}
            className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <Search className="w-4 h-4 text-gray-700 dark:text-gray-300" />
            <span className="hidden sm:inline text-sm text-gray-700 dark:text-gray-300">
              Rechercher...
            </span>
            <kbd className="hidden lg:inline px-2 py-0.5 text-xs bg-white dark:bg-gray-900 rounded border border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400">
              Ctrl K
            </kbd>
          </button>
        )}

        <ThemeToggle />
      </div>

      {/* Bouton menu mobile */}
      <div className="lg:hidden flex items-center gap-3">
        <ThemeToggle />
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-slate-900 dark:text-white hover:text-[#E2B44F] transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Menu mobile */}
      {mobileMenuOpen && (
        <div className="lg:hidden w-full mt-4 pb-4 border-t border-gray-200 dark:border-gray-800 pt-4 bg-white dark:bg-[#0A0A0A] rounded-lg">
          <div className="flex flex-col space-y-3">
            <div className="flex flex-col">
              <div className="flex items-center justify-between">
                <Link
                  href="/theorie"
                  className={`flex-1 py-2 px-2 rounded ${
                    pathname.startsWith("/theorie")
                      ? "text-[#E2B44F] font-semibold bg-gray-100 dark:bg-gray-900 border-l-4 border-[#E2B44F]"
                      : "text-slate-700 dark:text-gray-300 hover:text-[#E2B44F] hover:bg-gray-100 dark:hover:bg-gray-900"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Théorie
                </Link>
                <button
                  onClick={() => setTheorieOpen(!theorieOpen)}
                  className="p-2 text-slate-700 dark:text-gray-300 hover:text-[#E2B44F]"
                  aria-label="Toggle sous-menu Théorie"
                >
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      theorieOpen ? "rotate-180 text-[#E2B44F]" : ""
                    }`}
                  />
                </button>
              </div>

              {theorieOpen && (
                <Link
                  href="/theorie/lecture-de-plan"
                  className="pl-6 py-2 text-slate-600 dark:text-gray-400 hover:text-[#E2B44F] transition-colors block"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  ↳ Lecture de Plan
                </Link>
              )}
            </div>

            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`py-2 px-2 rounded ${
                  pathname === href
                    ? "text-[#E2B44F] font-semibold bg-gray-100 dark:bg-gray-900 border-l-4 border-[#E2B44F]"
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
