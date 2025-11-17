"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Search } from "lucide-react";
import { useState, useRef } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";

interface NavbarProps {
  onSearchClick?: () => void;
}

export default function Navbar({ onSearchClick }: NavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // La gestion du sous-menu/caret/flèche n'est plus utile
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
        {/* Bloc Théorie sans flèche ni sous-menu */}
        <Link
          href="/theorie"
          className={`flex items-center transition-colors ${
            pathname.startsWith("/theorie")
              ? "text-[#E2B44F] font-semibold border-b-2 border-[#E2B44F]"
              : "hover:text-[#E2B44F] text-slate-700 dark:text-gray-300"
          }`}
        >
          Théorie
        </Link>

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
              <div className="flex items-center">
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
              </div>
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
