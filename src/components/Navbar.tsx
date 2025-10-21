"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Heart } from "lucide-react";
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
    <nav className="fixed top-0 w-full bg-slate-950/90 backdrop-blur-xl border-b border-amber-500/10 z-50 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <Image
              src="/logos/Logo.jpg"
              alt="HorloLearn Logo"
              width={48}
              height={48}
              className="rounded-full border border-amber-500/30"
              priority
            />
            <div className="flex flex-col">
              <span className="text-lg md:text-xl font-bold text-white">
                Horlo<span className="text-amber-400">Learn</span>
              </span>
              <span className="text-xs text-amber-300/70 leading-tight">
                Culture & savoir-faire horloger
              </span>
            </div>
          </Link>

          {/* Liens Desktop */}
          <div className="hidden lg:flex items-center gap-8 font-medium text-sm">
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
                    ? "text-amber-400 font-semibold"
                    : "text-gray-300 hover:text-amber-400"
                }`}
              >
                Théorie
                <ChevronDown
                  className={`w-4 h-4 mt-0.5 transition-transform duration-200 ${
                    theorieOpenDesktop ? "rotate-180 text-amber-400" : ""
                  }`}
                />
              </Link>

              {theorieOpenDesktop && (
                <div
                  className="absolute top-full left-0 mt-3 w-56 bg-slate-900/95 border border-amber-500/20 rounded-xl shadow-lg z-50"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href="/theorie/lecture-de-plan"
                    className="block px-4 py-3 text-sm text-gray-300 hover:bg-amber-500/10 hover:text-amber-400 transition-colors rounded-md"
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
                className={`transition-colors ${
                  pathname === href
                    ? "text-amber-400 font-semibold"
                    : "text-gray-300 hover:text-amber-400"
                }`}
              >
                {label}
              </Link>
            ))}

            {/* Bouton Contribuer */}
            <button className="flex items-center space-x-2 px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full hover:shadow-lg hover:shadow-amber-500/40 transition-all font-semibold text-white">
              <Heart className="w-4 h-4" />
              <span>Contribuer</span>
            </button>
          </div>

          {/* Thème + menu mobile */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-amber-400"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
