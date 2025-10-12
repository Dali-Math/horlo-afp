"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
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
    <header className="bg-[#0A0A0A] text-white border-b border-gray-800 shadow-sm">
      <nav
        className="flex flex-wrap items-center justify-between px-6 py-4 max-w-[1400px] mx-auto"
        aria-label="Navigation principale"
      >
        {/* Logo animé */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Link
            href="/"
            className="flex items-center gap-3 hover:opacity-90 transition-opacity group"
          >
            <Image
              src="/logos/Logo.jpg"
              alt="Logo HorloLearn"
              width={46}
              height={46}
              className="rounded-full border border-[#E2B44F]/40 group-hover:border-[#E2B44F] transition-colors"
              priority
            />
            <div className="flex flex-col leading-tight">
              <span className="text-lg font-bold tracking-wide text-white">
                Horlo<span className="text-[#E2B44F]">Learn</span>
              </span>
              <span className="text-[11px] text-gray-400">
                Culture & savoir-faire horloger
              </span>
            </div>
          </Link>
        </motion.div>

        {/* Menu desktop */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="hidden lg:flex gap-6 xl:gap-8 text-sm font-medium"
        >
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
        </motion.div>

        {/* Bouton mobile */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-white hover:text-[#E2B44F] transition-colors"
          aria-label="Ouvrir le menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </motion.button>

        {/* Menu mobile */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden w-full mt-4 pb-4 border-t border-gray-800 pt-4"
          >
            <div className="flex flex-col space-y-2">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`transition-colors duration-200 py-2 px-3 rounded ${
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
          </motion.div>
        )}
      </nav>
    </header>
  );
}
