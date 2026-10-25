"use client";

import Image from "next/image";
import Link from "next/link";

const COLUMNS = [
  {
    title: "Explorer",
    links: [
      ["/theorie", "Théorie"],
      ["/pratique", "Pratique"],
      ["/outils", "Outils"],
      ["/quiz", "Quiz"],
    ],
  },
  {
    title: "Culture",
    links: [
      ["/suisse", "Horlogerie suisse"],
      ["/culture", "Culture"],
      ["/podcasts", "Podcasts"],
      ["/actualites", "Actualités"],
    ],
  },
  {
    title: "HorloLearn",
    links: [
      ["/ressources", "Ressources"],
      ["/communaute", "Communauté"],
      ["/evenements", "Événements"],
      ["/contact", "Contact"],
    ],
  },
] as const;

export default function Footer() {
  return (
    <footer className="border-t border-hl bg-[var(--hl-surface)] text-[var(--hl-ink)]">
      <div className="hl-container py-14 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-md">
            <div className="flex items-center gap-3">
              <Image
                src="/logos/Logo.jpg"
                alt="HorloLearn"
                width={44}
                height={44}
                className="rounded-full border border-hl"
              />
              <div>
                <div className="font-serif text-2xl tracking-[-0.02em]">
                  Horlo<span className="text-hl-metal">Learn</span>
                </div>
                <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-hl-muted">
                  Passion & découverte horlogère
                </div>
              </div>
            </div>

            <p className="mt-6 max-w-sm text-sm leading-7 text-hl-muted">
              Bibliothèque ouverte dédiée à la culture horlogère suisse, aux mécanismes, aux gestes d’atelier et à la compréhension du temps mécanique.
            </p>

            <div className="mt-7 border-l border-[var(--hl-metal)] pl-4">
              <div className="hl-kicker">Genève · Suisse</div>
              <p className="mt-2 text-xs leading-6 text-hl-muted">
                Ressource indépendante. HorloLearn ne délivre pas de formation officielle.
              </p>
            </div>
          </div>

          {COLUMNS.map((column) => (
            <div key={column.title}>
              <h3 className="hl-kicker">{column.title}</h3>
              <ul className="mt-5 space-y-3">
                {column.links.map(([href, label]) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm text-hl-muted transition hover:text-[var(--hl-ink)]"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-5 border-t border-hl pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-hl-muted">
            © {new Date().getFullYear()} HorloLearn · Culture horlogère suisse
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-[0.12em] text-hl-muted">
            <a href="mailto:contact.horlogeries@gmail.com" className="transition hover:text-hl-metal">
              Contact
            </a>
            <span>NIHS · ISO · Documentation technique</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
