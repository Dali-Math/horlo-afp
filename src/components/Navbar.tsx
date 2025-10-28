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
              className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-[#111] border border-[#E2B44F33] rounded-lg shadow-lg z-50"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href="/theorie/lecture-de-plan"
                className="block px-4 py-3 text-sm text-slate-700 dark:text-gray-300 hover:bg-[#E2B44F22] hover:text-[#E2B44F]"
              >
                Lecture de Plan
              </Link>
            </div>
          )}
        </div>

        {/* Outils avec flèche visuelle */}
        <Link
          href="/outils"
          className={`flex items-center gap-1 transition-colors ${
            pathname.startsWith("/outils")
              ? "text-[#E2B44F] font-semibold border-b-2 border-[#E2B44F]"
              : "hover:text-[#E2B44F] text-slate-700 dark:text-gray-300"
          }`}
        >
          Outils
          <ChevronDown className="w-4 h-4 mt-0.5 text-gray-400 dark:text-gray-400" />
        </Link>

        {/* Autres liens */}
        <Link
          href="/pratique"
          className={`transition-colors duration-200 ${
            pathname === "/pratique"
              ? "text-[#E2B44F] font-semibold border-b-2 border-[#E2B44F]"
              : "hover:text-[#E2B44F] text-slate-700 dark:text-gray-300"
          }`}
        >
          Pratique
        </Link>
        <Link
          href="/quiz"
          className={`transition-colors duration-200 ${
            pathname === "/quiz"
              ? "text-[#E2B44F] font-semibold border-b-2 border-[#E2B44F]"
              : "hover:text-[#E2B44F] text-slate-700 dark:text-gray-300"
          }`}
        >
          Quiz
        </Link>
        <Link
          href="/ressources"
          className={`transition-colors duration-200 ${
            pathname === "/ressources"
              ? "text-[#E2B44F] font-semibold border-b-2 border-[#E2B44F]"
              : "hover:text-[#E2B44F] text-slate-700 dark:text-gray-300"
          }`}
        >
          Ressources
        </Link>
        <Link
          href="/suisse"
          className={`transition-colors duration-200 ${
            pathname === "/suisse"
              ? "text-[#E2B44F] font-semibold border-b-2 border-[#E2B44F]"
              : "hover:text-[#E2B44F] text-slate-700 dark:text-gray-300"
          }`}
        >
          🇨🇭 Horlogerie Suisse
        </Link>
        <Link
          href="/podcasts"
          className={`transition-colors duration-200 ${
            pathname === "/podcasts"
              ? "text-[#E2B44F] font-semibold border-b-2 border-[#E2B44F]"
              : "hover:text-[#E2B44F] text-slate-700 dark:text-gray-300"
          }`}
        >
          Podcasts
        </Link>
        <Link
          href="/culture"
          className={`transition-colors duration-200 ${
            pathname === "/culture"
              ? "text-[#E2B44F] font-semibold border-b-2 border-[#E2B44F]"
              : "hover:text-[#E2B44F] text-slate-700 dark:text-gray-300"
          }`}
        >
          Culture
        </Link>
        <Link
          href="/evenements"
          className={`transition-colors duration-200 ${
            pathname === "/evenements"
              ? "text-[#E2B44F] font-semibold border-b-2 border-[#E2B44F]"
              : "hover:text-[#E2B44F] text-slate-700 dark:text-gray-300"
          }`}
        >
          Événements
        </Link>
        <Link
          href="/communaute"
          className={`transition-colors duration-200 ${
            pathname === "/communaute"
              ? "text-[#E2B44F] font-semibold border-b-2 border-[#E2B44F]"
              : "hover:text-[#E2B44F] text-slate-700 dark:text-gray-300"
          }`}
        >
          Communauté
        </Link>
        <Link
          href="/actualites"
          className={`transition-colors duration-200 ${
            pathname === "/actualites"
              ? "text-[#E2B44F] font-semibold border-b-2 border-[#E2B44F]"
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
          className="p-2 text-slate-900 dark:text-white hover:text-[#E2B44F]"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
    </nav>
  );
}
