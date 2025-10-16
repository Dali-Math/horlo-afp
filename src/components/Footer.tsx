"use client";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  // Tableau d'icônes (remplace src par tes fichiers : /icons/nom-icone.png)
  const icons = [
    { src: "/icons/iso128-2.png", alt: "Norme ISO 128-2" },
    { src: "/icons/eta-movement.png", alt: "Mouvement ETA" },
    { src: "/icons/swiss-made.png", alt: "Swiss Made" },
    { src: "/icons/rolex-badge.png", alt: "Certification Rolex" },
    { src: "/icons/federation-horlogere.png", alt: "Fédération Horlogère" },
    { src: "/icons/outil-pivot.png", alt: "Outil Pivot" },
    { src: "/icons/precision-gauge.png", alt: "Jauge Précision" },
    { src: "/icons/horlolearn-cert.png", alt: "Certificat HorloLearn" },
  ];

  return (
    <footer className="bg-[#0A0A0A] text-gray-300 border-t border-gray-800 py-10 px-6">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Grille existante (logo + liens + copyright) */}
        <div className="grid md:grid-cols-3 gap-10 text-center md:text-left">
          {/* Logo et description */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <Image
              src="/logos/Logo.jpg"
              alt="HorloLearn Logo"
              width={60}
              height={60}
              className="rounded-full"
            />
            <h2 className="text-xl font-bold text-white">
              Horlo<span className="text-[#E2B44F]">Learn</span>
            </h2>
            <p className="text-sm text-gray-400">
              Culture & savoir-faire horloger suisse  
              — partager la passion du temps.
            </p>
          </div>

          {/* Liens utiles */}
          <div>
            <h3 className="text-[#E2B44F] text-lg font-semibold mb-4">
              Navigation
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/suisse" className="hover:text-[#E2B44F] transition">
                  🇨🇭 Horlogerie Suisse
                </Link>
              </li>
              <li>
                <Link href="/pratique" className="hover:text-[#E2B44F] transition">
                  Pratique Horlogère
                </Link>
              </li>
              <li>
                <Link href="/ressources" className="hover:text-[#E2B44F] transition">
                  Ressources
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#E2B44F] transition">
                  📩 Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Copyright */}
          <div className="flex flex-col justify-center items-center md:items-end">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} HorloLearn. Tous droits réservés.
            </p>
            <p className="text-xs text-gray-600 mt-1">
              Développé avec passion par{" "}
              <span className="text-[#E2B44F]">HorloLearn</span>.
            </p>
          </div>
        </div>

        {/* Nouvelle section : Marquee infini d'icônes (comme sur horlolearn.ch) */}
        <div className="relative overflow-hidden bg-black/20 py-4 border-t border-gray-700">
          <p className="text-xs text-center text-gray-500 mb-2 uppercase tracking-wide font-semibold text-[#E2B44F]">
            Normes, Outils & Partenaires Horlogers
          </p>
          <div 
            className="flex animate-marquee-footer whitespace-nowrap"
            style={{ 
              animationDuration: '20s' // Vitesse : 20s (ajuste 15-30s)
            }}
          >
            {/* Contenu original des icônes */}
            <div className="flex items-center gap-8 px-4">
              {icons.map((icon, i) => (
                <div key={i} className="flex-shrink-0">
                  <Image
                    src={icon.src}
                    alt={icon.alt}
                    width={80}
                    height={50}
                    className="opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0" // Effet hover subtil
                  />
                </div>
              ))}
            </div>
            {/* Duplication pour loop seamless */}
            <div className="flex items-center gap-8 px-4">
              {icons.map((icon, i) => (
                <div key={`dup-${i}`} className="flex-shrink-0">
                  <Image
                    src={icon.src}
                    alt={icon.alt}
                    width={80}
                    height={50}
                    className="opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
