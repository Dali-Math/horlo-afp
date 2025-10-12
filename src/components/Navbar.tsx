"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/theorie", label: "Théorie" },
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
    <nav className="flex flex-wrap items-center justify-between px-10 md:px-16 py-4 bg-[#0A0A0A] text-white border-b border-gray-800">
      {/* Logo reculé */}
      <Link className="flex items-center gap-3 hover:opacity-90 transition-opacity" href="/">
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
            <span className="text-xl font-bold text-white">Horlo<span className="text-[#E2B44F]">Learn</span></span>
            <span className="text-xs text-[#E2B44F]">Culture & savoir-faire horloger</span>
          </div>
        </div>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex gap-6 xl:gap-8 text-sm font-medium">
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

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="lg:hidden p-2 text-white hover:text-[#E2B44F] transition-colors"
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden w-full mt-4 pb-4 border-t border-gray-800 pt-4">
          <div className="flex flex-col space-y-3">
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
