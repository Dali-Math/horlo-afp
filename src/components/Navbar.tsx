"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState, useRef } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Navbar() {
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
      <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
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
        {/* Bloc Théorie avec sous-menu fluide */}
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

          {/* Sous-menu stable */}
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

      {/* Menu mobile/tablette */}
      {mobileMenuOpen && (
        <div className="lg:hidden w-full mt-4 pb-4 border-t border-gray-200 dark:border-gray-800 pt-4 bg-white dark:bg-[#0A0A0A] rounded-lg">
          <div className="flex flex-col space-y-3">
            {/* ✅ Bloc Théorie cliquable + toggle séparé */}
            <div className="flex flex-col">
              {/* Ligne avec lien + bouton toggle */}
              <div className="flex items-center justify-between">
                {/* Lien cliquable vers /theorie */}
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
                
                {/* Bouton toggle sous-menu */}
                <button
                  onClick={() => setTheorieOpen(!theorieOpen)}
                  className="p-2 text-slate-700 dark:text-gray-300 hover:text-[#E2B44F]"
                  aria-label="Toggle sous-menu Théorie"
                >
                  <ChevronDown 
                    className={`w-4 h-4 transition-transform ${
                      theorieOpen ? 'rotate-180 text-[#E2B44F]' : ''
                    }`}
                  />
                </button>
              </div>
              
              {/* Sous-menu */}
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

            {/* Autres liens */}
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
