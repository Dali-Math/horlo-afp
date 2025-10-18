"use client";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  // Tableau d'icônes (ajusté pour "grandes maisons" – remplace src par tes logos)
  const icons = [
    { src: "/icons/rolex.png", alt: "Rolex" },
    { src: "/icons/omega.png", alt: "Omega" },
    { src: "/icons/patek.png", alt: "Patek Philippe" },
    { src: "/icons/audemars.png", alt: "Audemars Piguet" },
    { src: "/icons/tag-heuer.png", alt: "Tag Heuer" },
    { src: "/icons/iso128-2.png", alt: "Norme ISO 128-2" },
    { src: "/icons/eta-movement.png", alt: "Mouvement ETA" },
    { src: "/icons/swiss-made.png", alt: "Swiss Made" },
  ];

  // Titre texte (intégrée au scroll)
  const titleText = "Avec le soutien des grandes maisons horlogères";

  return (
    <footer className="bg-[#0A0A0A] text-gray-300 border-t border-gray-800 py-10 px-6">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Grille existante – inchangée */}
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

        {/* ✅ Section LOGOS DÉFILANTS CORRIGÉE */}
        <div className="relative overflow-hidden bg-black border border-gray-700 rounded-lg py-3">
          {/* Container avec overflow caché */}
          <div className="flex items-center">
            {/* ✅ Changé : animate-marquee-footer → animate-scroll */}
            <div className="marquee-container flex animate-scroll whitespace-nowrap">
              {/* Contenu original : Titre + icônes */}
              <div className="flex items-center gap-6 px-4">
                {/* Titre jaune intégré au scroll */}
                <span className="text-sm md:text-base font-semibold text-[#E2B44F] uppercase tracking-widest min-w-max whitespace-nowrap flex-shrink-0">
                  {titleText}
                </span>
                {/* Icônes après titre */}
                {icons.map((icon, i) => (
                  <div key={i} className="flex-shrink-0">
                    <Image
                      src={icon.src}
                      alt={icon.alt}
                      width={80}
                      height={50}
                      className="opacity-80 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
                    />
                  </div>
                ))}
              </div>
              
              {/* Duplication : Titre + icônes pour loop seamless */}
              <div className="flex items-center gap-6 px-4">
                <span className="text-sm md:text-base font-semibold text-[#E2B44F] uppercase tracking-widest min-w-max whitespace-nowrap flex-shrink-0">
                  {titleText}
                </span>
                {icons.map((icon, i) => (
                  <div key={`dup-${i}`} className="flex-shrink-0">
                    <Image
                      src={icon.src}
                      alt={icon.alt}
                      width={80}
                      height={50}
                      className="opacity-80 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Texte bas fixe */}
          <p className="mt-2 text-xs text-gray-500 text-center opacity-75">
            Ressources gratuites et open-source pour la formation en horlogerie.
          </p>
        </div>
      </div>
    </footer>
  );
}
