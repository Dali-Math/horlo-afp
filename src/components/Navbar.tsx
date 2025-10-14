"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState, useRef } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theorieOpen, setTheorieOpen] = useState(false);
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
    setTheorieOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setTheorieOpen(false), 250);
  };

  return (
    <nav className="flex flex-wrap items-center justify-between px-6 md:px-12 py-4 bg-[#0A0A0A] text-white border-b border-gray-800 relative z-50">
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
          <span className="text-lg md:text-xl font-bold text-white">
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
                : "hover:text-[#E2B44F]"
            }`}
          >
            Théorie{" "}
            <ChevronDown
              className={`w-4 h-4 mt-0.5 transition-transform duration-200 ${
                theorieOpen ? "rotate-180 text-[#E2B44F]" : ""
              }`}
            />
          </Link>

          {/* Sous-menu stable */}
          {theorieOpen && (
            <div
              className="absolute top-full left-0 mt-2 w-56 bg-[#111] border border-[#E2B44F33] rounded-lg shadow-lg
              transition-all duration-200 ease-out opacity-100 translate-y-0 z-50"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href="/theorie/lecture-de-plan"
                className="block px-4 py-3 text-sm hover:bg-[#E2B44F22] hover:text-[#E2B44F] transition-colors"
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
                : "hover:text-[#E2B44F]"
            }`}
          >
            {label}
          </Link>
        ))}
      </div>

      {/* Bouton menu mobile */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="lg:hidden p-2 text-white hover:text-[#E2B44F] transition-colors"
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Menu mobile/tablette */}
      {mobileMenuOpen && (
        <div className="lg:hidden w-full mt-4 pb-4 border-t border-gray-800 pt-4 bg-[#0A0A0A] rounded-lg">
          <div className="flex flex-col space-y-3">
            {/* Bloc Théorie dans mobile */}
            <details className="group">
              <summary
                className={`flex justify-between items-center py-2 px-2 rounded cursor-pointer ${
                  pathname.startsWith("/theorie")
                    ? "text-[#E2B44F] font-semibold bg-gray-900 border-l-4 border-[#E2B44F]"
                    : "text-gray-300 hover:text-[#E2B44F] hover:bg-gray-900"
                }`}
              >
                Théorie
                <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180 text-[#E2B44F]" />
              </summary>
              <Link
                href="/theorie/lecture-de-plan"
                className="pl-6 py-2 text-gray-400 hover:text-[#E2B44F] transition-colors block"
                onClick={() => setMobileMenuOpen(false)}
              >
                ↳ Lecture de Plan
              </Link>
            </details>

            {/* Autres liens */}
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`py-2 px-2 rounded ${
                  pathname === href
                    ? "text-[#E2B44F] font-semibold bg-gray-900 border-l-4 border-[#E2B44F]"
                    : "text-gray-300 hover:text-[#E2B44F] hover:bg-gray-900"
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
