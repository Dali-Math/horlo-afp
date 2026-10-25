"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, X } from "lucide-react";
import LanguageSelector from "@/components/LanguageSelector";
import { ThemeToggle } from "@/components/ThemeToggle";

interface NavbarProps {
  onSearchClick?: () => void;
}

const PRIMARY_LINKS = [
  { href: "/theorie", label: "Théorie" },
  { href: "/pratique", label: "Pratique" },
  { href: "/outils", label: "Outils" },
  { href: "/suisse", label: "Suisse" },
  { href: "/quiz", label: "Quiz" },
  { href: "/actualites", label: "Actualités" },
];

const SECONDARY_LINKS = [
  { href: "/ressources", label: "Ressources" },
  { href: "/podcasts", label: "Podcasts" },
  { href: "/culture", label: "Culture" },
  { href: "/evenements", label: "Événements" },
  { href: "/communaute", label: "Communauté" },
  { href: "/fuseaux-horaires", label: "Fuseaux horaires" },
];

export default function Navbar({ onSearchClick }: NavbarProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string): boolean =>
    pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));

  return (
    <header className="sticky top-0 z-50 border-b border-hl bg-[color:var(--hl-bg)]/94 backdrop-blur-xl">
      <div className="hl-container">
        <div className="flex h-[72px] items-center justify-between gap-4">
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-3 notranslate"
            translate="no"
            onClick={() => setOpen(false)}
          >
            <Image
              src="/logos/Logo.jpg"
              alt="HorloLearn"
              width={38}
              height={38}
              priority
              className="rounded-full border border-[var(--hl-line)] object-cover grayscale-[12%] transition group-hover:grayscale-0"
            />
            <div className="leading-none">
              <div className="font-serif text-[21px] tracking-[-0.02em] text-[var(--hl-ink)]">
                Horlo<span className="text-hl-metal">Learn</span>
              </div>
              <div className="mt-1 font-mono text-[8px] uppercase tracking-[0.22em] text-hl-muted">
                Culture horlogère suisse
              </div>
            </div>
          </Link>

          <nav className="hidden lg:flex h-full items-center gap-6 xl:gap-8" aria-label="Navigation principale">
            {PRIMARY_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative flex h-full items-center text-[13px] transition-colors ${
                    active
                      ? "text-[var(--hl-ink)]"
                      : "text-hl-muted hover:text-[var(--hl-ink)]"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-0 h-px transition-all ${
                      active ? "w-full bg-[var(--hl-metal)]" : "w-0 bg-[var(--hl-metal)]"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {onSearchClick && (
              <button
                type="button"
                onClick={onSearchClick}
                className="inline-flex h-10 w-10 items-center justify-center border border-hl bg-transparent text-hl-muted transition hover:border-[var(--hl-line-strong)] hover:text-[var(--hl-ink)]"
                aria-label="Rechercher"
                title="Rechercher — Ctrl K"
              >
                <Search className="h-4 w-4" />
              </button>
            )}

            <div className="hidden sm:block">
              <LanguageSelector />
            </div>
            <ThemeToggle />

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              className="inline-flex h-10 w-10 items-center justify-center border border-hl text-[var(--hl-ink)] lg:hidden"
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={open}
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="border-t border-hl bg-[var(--hl-surface)] lg:hidden">
          <div className="hl-container py-7">
            <div className="mb-7 flex items-center justify-between border-b border-hl pb-4">
              <span className="hl-kicker">Sommaire HorloLearn</span>
              <div className="sm:hidden">
                <LanguageSelector />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-0 sm:grid-cols-2">
              {PRIMARY_LINKS.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="group flex items-center justify-between border-b border-hl py-4 sm:odd:pr-6 sm:even:pl-6"
                >
                  <span className="flex items-baseline gap-3">
                    <span className="font-mono text-[10px] text-hl-metal">0{index + 1}</span>
                    <span className="font-serif text-xl text-[var(--hl-ink)]">{link.label}</span>
                  </span>
                  <span className="text-hl-muted transition group-hover:translate-x-1 group-hover:text-hl-metal">→</span>
                </Link>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3">
              {SECONDARY_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="font-mono text-[10px] uppercase tracking-[0.12em] text-hl-muted transition hover:text-hl-metal"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
