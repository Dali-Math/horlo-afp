"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theorieOpen, setTheorieOpen] = useState(false);
  const [outilsOpen, setOutilsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (setOpen: (v: boolean) => void) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleMouseLeave = (setOpen: (v: boolean) => void) => {
    timeoutRef.current = setTimeout(() => setOpen(false), 200);
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
          <span className="text-[11px] text-[#E2B44F] leading-tight tracking-wide">
            Culture & savoir-faire horloger
          </span>
        </div>
      </Link>

      {/* Liens desktop */}
      <div className="hidden lg:flex items-center gap-6 text-sm font-medium relative">
        {/* --- Bloc Théorie --- */}
        <div
          className="relative"
          onMouseEnter={() => handleMouseEnter(setTheorieOpen)}
          onMouseLeave={() => handleMouseLeave(setTheorieOpen)}
        >
          <Link
            href="/theorie"
            className={`flex items-center gap-1 transition-colors duration-300 ${
              pathname.startsWith("/theorie")
                ? "text-[#E2B44F] font-semibold border-b border-[#E2B44F]"
                : "hover:text-[#E2B44F] text-slate-700 dark:text-gray-300"
            }`}
          >
            Théorie
            <ChevronDown
              className={`w-3.5 h-3.5 mt-0.5 transition-transform duration-200 ${
                theorieOpen ? "rotate-180 text-[#E2B44F]" : ""
              }`}
            />
          </Link>

          <AnimatePresence>
            {theorieOpen && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-full left-0 mt-2 w-48 bg-white/95 dark:bg-[#111]/90 backdrop-blur-sm border border-[#E2B44F33] rounded-lg shadow-lg z-50"
              >
                <Link
                  href="/theorie/lecture-de-plan"
                  className="block px-4 py-2.5 text-sm text-slate-700 dark:text-gray-300 hover:bg-[#E2B44F22] hover:text-[#E2B44F] border-l-2 border-transparent hover:border-[#E2B44F] transition-all duration-200 shadow-[inset_0_0_10px_#e2b44f22]"
                >
                  Lecture de Plan
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* --- Bloc Outils --- */}
        <div
          className="relative"
          onMouseEnter={() => handleMouseEnter(setOutilsOpen)}
          onMouseLeave={() => handleMouseLeave(setOutilsOpen)}
        >
          <Link
            href="/outils"
            className={`flex items-center gap-1 transition-colors duration-300 ${
              pathname.startsWith("/outils")
                ? "text-[#E2B44F] font-semibold border-b border-[#E2B44F]"
                : "hover:text-[#E2B44F] text-slate-700 dark:text-gray-300"
            }`}
          >
            Outils
            <ChevronDown
              className={`w-3.5 h-3.5 mt-0.5 transition-transform duration-200 ${
                outilsOpen ? "rotate-180 text-[#E2B44F]" : ""
              }`}
            />
          </Link>

          <AnimatePresence>
            {outilsOpen && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-full left-0 mt-2 w-56 bg-white/95 dark:bg-[#111]/90 backdrop-blur-sm border border-[#E2B44F33] rounded-lg shadow-lg z-50"
              >
                <Link
                  href="/outils/analyseur"
                  className="block px-4 py-2.5 text-sm text-slate-700 dark:text-gray-300 hover:bg-[#E2B44F22] hover:text-[#E2B44F] border-l-2 border-transparent hover:border-[#E2B44F] transition-all duration-200 shadow-[inset_0_0_10px_#e2b44f22]"
                >
                  🔍 Analyseur de Montres IA
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* --- Autres liens --- */}
        {[
          ["Pratique", "/pratique"],
          ["Quiz", "/quiz"],
          ["Ressources", "/ressources"],
          ["🇨🇭 Horlogerie Suisse", "/suisse"],
          ["Podcasts", "/podcasts"],
          ["Culture", "/culture"],
          ["Événements", "/evenements"],
          ["Communauté", "/communaute"],
          ["Actualités", "/actualites"],
        ].map(([label, href]) => (
          <Link
            key={href}
            href={href}
            className={`hover:text-[#E2B44F] transition-colors duration-300 ${
              pathname === href
                ? "text-[#E2B44F] font-semibold"
                : "text-slate-700 dark:text-gray-300"
            }`}
          >
            {label}
          </Link>
        ))}
      </div>

      {/* --- Thème + menu --- */}
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-slate-900 dark:text-white hover:text-[#E2B44F] lg:hidden"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* --- Menu mobile animé --- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-full left-0 w-full bg-white/95 dark:bg-[#0A0A0A]/95 backdrop-blur-sm border-t border-gray-200 dark:border-gray-800 shadow-lg lg:hidden"
          >
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="overflow-hidden flex flex-col p-6 space-y-4"
            >
              {/* --- Sous-menu Théorie --- */}
              <button
                onClick={() => setTheorieOpen(!theorieOpen)}
                className="flex justify-between items-center text-left font-medium text-slate-800 dark:text-gray-200 hover:text-[#E2B44F]"
              >
                <span>Théorie</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    theorieOpen ? "rotate-180 text-[#E2B44F]" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {theorieOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="ml-4 space-y-2"
                  >
                    <Link
                      href="/theorie/lecture-de-plan"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-sm text-gray-400 hover:text-[#E2B44F]"
                    >
                      Lecture de Plan
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* --- Sous-menu Outils --- */}
              <button
                onClick={() => setOutilsOpen(!outilsOpen)}
                className="flex justify-between items-center text-left font-medium text-slate-800 dark:text-gray-200 hover:text-[#E2B44F]"
              >
                <span>Outils</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    outilsOpen ? "rotate-180 text-[#E2B44F]" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {outilsOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="ml-4 space-y-2"
                  >
                    <Link
                      href="/outils/analyseur"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-sm text-gray-400 hover:text-[#E2B44F]"
                    >
                      🔍 Analyseur de Montres IA
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* --- Autres liens --- */}
              {[
                ["Pratique", "/pratique"],
                ["Quiz", "/quiz"],
                ["Ressources", "/ressources"],
                ["🇨🇭 Horlogerie Suisse", "/suisse"],
                ["Podcasts", "/podcasts"],
                ["Culture", "/culture"],
                ["Événements", "/evenements"],
                ["Communauté", "/communaute"],
                ["Actualités", "/actualites"],
              ].map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block font-medium text-slate-800 dark:text-gray-200 hover:text-[#E2B44F] hover:bg-[#E2B44F10] rounded-md px-2 py-1 transition-colors duration-200"
                >
                  {label}
                </Link>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
