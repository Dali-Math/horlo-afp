"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  // Liste des prestigieuses manufactures et standards horlogers
  const icons = [
    { src: "/icons/rolex.png", alt: "Rolex" },
    { src: "/icons/patek.png", alt: "Patek Philippe" },
    { src: "/icons/vacheron.png", alt: "Vacheron Constantin" },
    { src: "/icons/audemars.png", alt: "Audemars Piguet" },
    { src: "/icons/omega.png", alt: "Omega" },
    { src: "/icons/tag-heuer.png", alt: "TAG Heuer" },
    { src: "/icons/chopard.png", alt: "Chopard" },
    { src: "/icons/iso128-2.png", alt: "Norme ISO 128-2" },
    { src: "/icons/eta-movement.png", alt: "Mouvement ETA" },
    { src: "/icons/swiss-made.png", alt: "Swiss Made" },
  ];

  return (
    <footer className="bg-[#08090c] text-gray-300 border-t border-slate-800/80 pt-12 pb-8 px-4 sm:px-6 relative overflow-hidden">
      {/* Animation CSS intégrée pour un défilement infini ultra-fluide */}
      <style>{`
        @keyframes marqueeInfinite {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-smooth {
          display: flex;
          width: max-content;
          animation: marqueeInfinite 28s linear infinite;
        }
        .animate-marquee-smooth:hover {
          animation-play-state: paused;
        }
        .mask-fade-luxury {
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
      `}</style>

      {/* Halo d'ambiance dorée Haute Horlogerie */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-32 bg-amber-500/5 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto space-y-10 relative z-10">
        {/* Grille supérieure : Identité, Navigation, Genève */}
        <div className="grid md:grid-cols-3 gap-10 text-center md:text-left items-center md:items-start">
          {/* Logo et description */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="flex items-center gap-3">
              <Image
                src="/logos/Logo.jpg"
                alt="HorloLearn Logo"
                width={48}
                height={48}
                className="rounded-full border border-amber-500/30 object-cover shadow-lg shadow-amber-500/5"
              />
              <h2 className="text-2xl font-bold tracking-tight text-white">
                Horlo<span className="text-[#E2B44F]">Learn</span>
              </h2>
            </div>
            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              Culture, excellence & savoir-faire horloger suisse. Plateforme ouverte dédiée aux
              passionnés et professionnels du temps.
            </p>
          </div>

          {/* Liens de navigation */}
          <div className="md:pl-8">
            <h3 className="text-[#E2B44F] text-xs font-bold uppercase tracking-[0.2em] mb-4 flex items-center justify-center md:justify-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/suisse"
                  className="text-gray-400 hover:text-white transition flex items-center justify-center md:justify-start gap-2 group"
                >
                  <span className="text-xs group-hover:scale-110 transition-transform">🇨🇭</span>
                  Horlogerie Suisse
                </Link>
              </li>
              <li>
                <Link
                  href="/pratique"
                  className="text-gray-400 hover:text-white transition flex items-center justify-center md:justify-start gap-2 group"
                >
                  <span className="text-xs group-hover:scale-110 transition-transform">⚙️</span>
                  Pratique Horlogère
                </Link>
              </li>
              <li>
                <Link
                  href="/outils"
                  className="text-gray-400 hover:text-white transition flex items-center justify-center md:justify-start gap-2 group"
                >
                  <span className="text-xs group-hover:scale-110 transition-transform">📐</span>
                  Outils & Calculateurs
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-white transition flex items-center justify-center md:justify-start gap-2 group"
                >
                  <span className="text-xs group-hover:scale-110 transition-transform">✉️</span>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Copyright et label Suisse */}
          <div className="flex flex-col justify-center items-center md:items-end space-y-2">
            <p className="text-sm text-gray-400 font-medium">
              &copy; {new Date().getFullYear()} HorloLearn. Tous droits réservés.
            </p>
            <p className="text-xs text-gray-500">
              Conçu avec rigueur horlogère genevoise.
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] text-amber-400/90 mt-2">
              <span>Genève &bull; Suisse</span>
            </div>
          </div>
        </div>

        {/* ✅ NOUVELLE VITRINE DES MANUFACTURES & STANDARDS */}
        <div className="relative rounded-2xl bg-gradient-to-b from-slate-900/60 via-slate-950/80 to-[#08090c] border border-slate-800/80 p-6 sm:p-7 shadow-2xl overflow-hidden">
          {/* En-tête raffiné (Séparé du défilement pour éviter tout chevauchement) */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 mb-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase text-amber-400">
                Standards & Manufactures
              </span>
            </div>
            <h4 className="text-xs sm:text-sm font-bold text-white tracking-[0.2em] uppercase">
              Hommage aux Grandes Maisons & Normes Suisses
            </h4>
          </div>

          {/* Carrousel infini fluide avec dégradé d'ombre latéral */}
          <div className="relative overflow-hidden mask-fade-luxury py-1">
            <div className="animate-marquee-smooth flex items-center gap-4">
              {/* Premier groupe de logos */}
              <div className="flex items-center gap-4 shrink-0">
                {icons.map((icon, i) => (
                  <div
                    key={`icon-1-${i}`}
                    title={icon.alt}
                    className="group flex items-center justify-center h-16 w-36 px-3 py-2 rounded-xl bg-slate-900/80 border border-slate-800/90 hover:border-amber-500/50 shadow-md transition-all duration-300 hover:scale-105"
                  >
                    <Image
                      src={icon.src}
                      alt={icon.alt}
                      width={100}
                      height={44}
                      className="max-h-11 max-w-[110px] object-contain rounded"
                    />
                  </div>
                ))}
              </div>

              {/* Deuxième groupe identique pour boucle infinie sans saut ni coupure */}
              <div className="flex items-center gap-4 shrink-0">
                {icons.map((icon, i) => (
                  <div
                    key={`icon-2-${i}`}
                    title={icon.alt}
                    className="group flex items-center justify-center h-16 w-36 px-3 py-2 rounded-xl bg-slate-900/80 border border-slate-800/90 hover:border-amber-500/50 shadow-md transition-all duration-300 hover:scale-105"
                  >
                    <Image
                      src={icon.src}
                      alt={icon.alt}
                      width={100}
                      height={44}
                      className="max-h-11 max-w-[110px] object-contain rounded"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mention discrète légale & éducative */}
          <div className="mt-4 text-center">
            <p className="text-xs text-slate-500 tracking-wider">
              Plateforme éducative indépendante &bull; Transmission & valorisation du patrimoine
              horloger suisse
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
