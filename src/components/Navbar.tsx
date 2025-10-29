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
  const [theorieOpenDesktop, setTheorieOpenDesktop] = useState(false);
  const [outilsOpenDesktop, setOutilsOpenDesktop] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (setOpen: (value: boolean) => void) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleMouseLeave = (setOpen: (value: boolean) => void) => {
    timeoutRef.current = setTimeout(() => setOpen(false), 200);
  };

  return (
    <nav
      className="flex flex-wrap items-center justify-between px-6 md:px-12 py-4
      bg-white dark:bg-[#0A0A0A] text-slate-900 dark:text-white 
      border-b border-gray-200 dark:border-gray-800 relative z-50
      transition-all duration-300"
    >
      {/* Logo */}
      <Link
        href="/"
        className="flex items-center gap-3 hover:opacity-90 transition-opacity"
        aria-label="Accueil HorloLearn"
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
          <span className="text-[11px] text-[#E2B44F] leading-tight tracking-wide">
            Passion & Découverte
          </span>
        </div>
      </Link>

      {/* Liens desktop */}
      <div className="hidden lg:flex items-center gap-6 text-sm font-medium relative">
        {/* Bloc Théorie */}
        <div
          className="relative"
          onMouseEnter={() => handleMouseEnter(setTheorieOpenDesktop)}
          onMouseLeave={() => handleMouseLeave(setTheorieOpenDesktop)}
        >
          <Link
            href="/theorie"
            className={`flex items-center gap-1 py-2 transition-colors duration-200 ${
              pathname.startsWith("/theorie")
                ? "text-[#E2B44F] font-semibold"
                : "hover:text-[#E2B44F] text-slate-700 dark:text-gray-300"
            }`}
          >
            Théorie
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-200 ${
                theorieOpenDesktop ? "rotate-180" : ""
              }`}
            />
          </Link>

          {theorieOpenDesktop && (
            <div
              className="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-[#0F0F0F]
              border border-[#E2B44F]/20 rounded-lg shadow-2xl py-1 
              animate-fadeIn backdrop-blur-sm"
              role="menu"
            >
              <Link
                href="/theorie/lecture-de-plan"
                className="block px-4 py-2.5 text-sm text-slate-700 dark:text-gray-300 
                hover:bg-[#E2B44F]/10 hover:text-[#E2B44F] transition-all duration-200
                border-l-2 border-transparent hover:border-[#E2B44F]"
                onClick={() => setTheorieOpenDesktop(false)}
              >
                Lecture de Plan
              </Link>
            </div>
          )}
        </div>

        {/* Bloc Outils */}
        <div
          className="relative"
          onMouseEnter={() => handleMouseEnter(setOutilsOpenDesktop)}
          onMouseLeave={() => handleMouseLeave(setOutilsOpenDesktop)}
        >
          <Link
            href="/outils"
            className={`flex items-center gap-1 py-2 transition-colors duration-200 ${
              pathname.startsWith("/outils")
                ? "text-[#E2B44F] font-semibold"
                : "hover:text-[#E2B44F] text-slate-700 dark:text-gray-300"
            }`}
          >
            Outils
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-200 ${
                outilsOpenDesktop ? "rotate-180" : ""
              }`}
            />
          </Link>

          {outilsOpenDesktop && (
            <div
              className="absolute top-full left-0 mt-1 w-56 bg-white dark:bg-[#0F0F0F]
              border border-[#E2B44F]/20 rounded-lg shadow-2xl py-1
              animate-fadeIn backdrop-blur-sm"
              role="menu"
            >
              <Link
                href="/outils/analyseur"
                className="block px-4 py-2.5 text-sm text-slate-700 dark:text-gray-300
                hover:bg-[#E2B44F]/10 hover:text-[#E2B44F] transition-all duration-200
                border-l-2 border-transparent hover:border-[#E2B44F]"
                onClick={() => setOutilsOpenDesktop(false)}
              >
                🔍 Analyseur de Montres IA
              </Link>
            </div>
          )}
        </div>

        {/* Autres liens */}
        <Link
          href="/pratique"
          className={`py-2 transition-colors duration-200 ${
            pathname === "/pratique"
              ? "text-[#E2B44F] font-semibold"
              : "hover:text-[#E2B44F] text-slate-700 dark:text-gray-300"
          }`}
        >
          Pratique
        </Link>
        <Link
          href="/quiz"
          className={`py-2 transition-colors duration-200 ${
            pathname === "/quiz"
              ? "text-[#E2B44F] font-semibold"
              : "hover:text-[#E2B44F] text-slate-700 dark:text-gray-300"
          }`}
        >
          Quiz
        </Link>
        <Link
          href="/ressources"
          className={`py-2 transition-colors duration-200 ${
            pathname === "/ressources"
              ? "text-[#E2B44F] font-semibold"
              : "hover:text-[#E2B44F] text-slate-700 dark:text-gray-300"
          }`}
        >
          Ressources
        </Link>
        <Link
          href="/suisse"
          className={`py-2 transition-colors duration-200 ${
            pathname === "/suisse"
              ? "text-[#E2B44F] font-semibold"
              : "hover:text-[#E2B44F] text-slate-700 dark:text-gray-300"
          }`}
        >
          🇨🇭 Horlogerie Suisse
        </Link>
        <Link
          href="/podcasts"
          className={`py-2 transition-colors duration-200 ${
            pathname === "/podcasts"
              ? "text-[#E2B44F] font-semibold"
              : "hover:text-[#E2B44F] text-slate-700 dark:text-gray-300"
          }`}
        >
          Podcasts
        </Link>
        <Link
          href="/culture"
          className={`py-2 transition-colors duration-200 ${
            pathname === "/culture"
              ? "text-[#E2B44F] font-semibold"
              : "hover:text-[#E2B44F] text-slate-700 dark:text-gray-300"
          }`}
        >
          Culture
        </Link>
        <Link
          href="/evenements"
          className={`py-2 transition-colors duration-200 ${
            pathname === "/evenements"
              ? "text-[#E2B44F] font-semibold"
              : "hover:text-[#E2B44F] text-slate-700 dark:text-gray-300"
          }`}
        >
          Événements
        </Link>
        <Link
          href="/communaute"
          className={`py-2 transition-colors duration-200 ${
            pathname === "/communaute"
              ? "text-[#E2B44F] font-semibold"
              : "hover:text-[#E2B44F] text-slate-700 dark:text-gray-300"
          }`}
        >
          Communauté
        </Link>
        <Link
          href="/actualites"
          className={`py-2 transition-colors duration-200 ${
            pathname === "/actualites"
              ? "text-[#E2B44F] font-semibold"
              : "hover:text-[#E2B44F] text-slate-700 dark:text-gray-300"
          }`}
        >
          Actualités
        </Link>
      </div>

      {/* Thème + menu mobile */}
      <div className="flex items-center gap-3 lg:hidden">
        <ThemeToggle />
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-slate-900 dark:text-white hover:text-[#E2B44F] transition-colors"
          aria-label="Ouvrir le menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Menu Mobile */}
      {mobileMenuOpen && (
        <div
          className="w-full mt-4 bg-white dark:bg-[#0A0A0A] border-t border-gray-200 dark:border-gray-800
          flex flex-col gap-1 py-4 px-4 text-sm font-medium lg:hidden animate-slideDown"
          role="menu"
        >
          <Link 
            href="/theorie" 
            onClick={() => setMobileMenuOpen(false)} 
            className="px-3 py-2.5 rounded-lg hover:bg-[#E2B44F]/10 hover:text-[#E2B44F] transition-all duration-200"
          >
            Théorie
          </Link>
          <Link 
            href="/outils" 
            onClick={() => setMobileMenuOpen(false)} 
            className="px-3 py-2.5 rounded-lg hover:bg-[#E2B44F]/10 hover:text-[#E2B44F] transition-all duration-200"
          >
            Outils
          </Link>
          <Link 
            href="/pratique" 
            onClick={() => setMobileMenuOpen(false)} 
            className="px-3 py-2.5 rounded-lg hover:bg-[#E2B44F]/10 hover:text-[#E2B44F] transition-all duration-200"
          >
            Pratique
          </Link>
          <Link 
            href="/quiz" 
            onClick={() => setMobileMenuOpen(false)} 
            className="px-3 py-2.5 rounded-lg hover:bg-[#E2B44F]/10 hover:text-[#E2B44F] transition-all duration-200"
          >
            Quiz
          </Link>
          <Link 
            href="/ressources" 
            onClick={() => setMobileMenuOpen(false)} 
            className="px-3 py-2.5 rounded-lg hover:bg-[#E2B44F]/10 hover:text-[#E2B44F] transition-all duration-200"
          >
            Ressources
          </Link>
          <Link 
            href="/suisse" 
            onClick={() => setMobileMenuOpen(false)} 
            className="px-3 py-2.5 rounded-lg hover:bg-[#E2B44F]/10 hover:text-[#E2B44F] transition-all duration-200"
          >
            🇨🇭 Horlogerie Suisse
          </Link>
          <Link 
            href="/podcasts" 
            onClick={() => setMobileMenuOpen(false)} 
            className="px-3 py-2.5 rounded-lg hover:bg-[#E2B44F]/10 hover:text-[#E2B44F] transition-all duration-200"
          >
            Podcasts
          </Link>
          <Link 
            href="/culture" 
            onClick={() => setMobileMenuOpen(false)} 
            className="px-3 py-2.5 rounded-lg hover:bg-[#E2B44F]/10 hover:text-[#E2B44F] transition-all duration-200"
          >
            Culture
          </Link>
          <Link 
            href="/evenements" 
            onClick={() => setMobileMenuOpen(false)} 
            className="px-3 py-2.5 rounded-lg hover:bg-[#E2B44F]/10 hover:text-[#E2B44F] transition-all duration-200"
          >
            Événements
          </Link>
          <Link 
            href="/communaute" 
            onClick={() => setMobileMenuOpen(false)} 
            className="px-3 py-2.5 rounded-lg hover:bg-[#E2B44F]/10 hover:text-[#E2B44F] transition-all duration-200"
          >
            Communauté
          </Link>
          <Link 
            href="/actualites" 
            onClick={() => setMobileMenuOpen(false)} 
            className="px-3 py-2.5 rounded-lg hover:bg-[#E2B44F]/10 hover:text-[#E2B44F] transition-all duration-200"
          >
            Actualités
          </Link>
        </div>
      )}

      {/* Animations CSS */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            max-height: 0;
          }
          to {
            opacity: 1;
            max-height: 100vh;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-slideDown {
          animation: slideDown 0.25s ease-out;
        }
      `}</style>
    </nav>
  );
}
