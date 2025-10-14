"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoverTheory, setHoverTheory] = useState(false);
  let closeTimeout: NodeJS.Timeout;

  const navLinks = [
    { href: "/pratique", label: "Pratique" },
    { href: "/quiz", label: "Quiz" },
    { href: "/quiz-longueurs-horlogerie", label: "Quiz Longueurs" },
    { href: "/outils", label: "Outils" },
    { href: "/ressources", label: "Ressources" },
    { href: "/suisse", label: "🇨🇭 Horlogerie Suisse" },
    { href: "/podcasts", label: "Podcasts" },
    { href: "/culture", label: "Culture" },
    { href: "/evenements", label: "Événements" },
    { href: "/communaute", label: "Communauté" },
  ];

  return (
    <nav className="flex flex-wrap items-center justify-between px-10 md:px-16 py-4 bg-[#0A0A0A] text-white border-b border-gray-800 relative z-50">
      {/* Logo principal */}
      <Link
        className="flex items-center gap-3 hover:opacity-90 transition-opacity"
        href="/"
      >
        <div className="pl-2 md:pl-4 flex items-center gap-3">
          <Image
            src="/logos/Logo.jpg"
            alt="HorloLearn Logo"
            width={50}
            height={50}
            className="rounded-full"
            priority
          />
          <div className="flex flex-col">
            <span className="text-xl font-bold text-white">
              Horlo<span className="text-[#E2B44F]">Learn</span>
            </span>
            <span className="text-xs text-[#E2B44F]">
              Culture & savoir-faire horloger
            </span>
          </div>
        </div>
      </Link>

      {/* Navigation Desktop */}
      <div className="hidden lg:flex gap-6 xl:gap-8 text-sm font-medium items-center">
        {/* Bloc Théorie avec flèche et menu déroulant */}
        <div
          className="relative"
          onMouseEnter={() => {
            clearTimeout(closeTimeout);
            setHoverTheory(true);
          }}
          onMouseLeave={() => {
            closeTimeout = setTimeout(() => setHoverTheory(false), 150);
          }}
        >
          <button
            className={`flex items-center gap-1 transition-colors duration-200 ${
              pathname.startsWith("/theorie")
                ? "text-[#E2B44F] font-semibold border-b-2 border-[#E2B44F]"
                : "hover:text-[#E2B44F]"
            }`}
          >
            Théorie
            <ChevronDown
              size={16}
              className={`text-[#E2B44F] transition-transform duration-300 ${
                hoverTheory ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Menu déroulant stable au survol */}
          {hoverTheory && (
            <div
              className="absolute left-0 mt-3 bg-[#111] border border-[#E2B44F]/30 rounded-lg shadow-lg w-56 py-2"
              onMouseEnter={() => clearTimeout(closeTimeout)}
              onMouseLeave={() => {
                closeTimeout = setTimeout(() => setHoverTheory(false), 150);
              }}
            >
              <Link
                href="/theorie/lecture-de-plan"
                className="block px-4 py-2 text-sm text-white hover:text-[#E2B44F] hover:bg-[#E2B44F]/10 transition"
              >
                Lecture de plan
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
        {mobileMenuOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      {/* Menu mobile */}
      {mobileMenuOpen && (
        <div className="lg:hidden w-full mt-4 pb-4 border-t border-gray-800 pt-4">
          <div className="flex flex-col space-y-3">
            <Link
              href="/theorie/lecture-de-plan"
              className="text-gray-300 hover:text-[#E2B44F] hover:bg-gray-900 px-2 py-2 rounded"
              onClick={() => setMobileMenuOpen(false)}
            >
              Théorie – Lecture de plan
            </Link>
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`transition-colors duration-200 py-2 px-2 rounded ${
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
