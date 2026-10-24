"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  // Collection d'Élite des Grandes Manufactures et Sceaux Suisses (Vecteurs SVG ultra-légers ~1 Ko)
  const icons = [
    { src: "/icons/patek.svg", alt: "Patek Philippe – Genève 1839" },
    { src: "/icons/rolex.svg", alt: "Rolex – Manufacture Genève" },
    { src: "/icons/vacheron.svg", alt: "Vacheron Constantin – Depuis 1755" },
    { src: "/icons/audemars.svg", alt: "Audemars Piguet – Le Brassus" },
    { src: "/icons/jaeger-lecoultre.svg", alt: "Jaeger-LeCoultre – Vallée de Joux" },
    { src: "/icons/breguet.svg", alt: "Breguet – Haute Horlogerie 1775" },
    { src: "/icons/blancpain.svg", alt: "Blancpain – Villeret 1735" },
    { src: "/icons/omega.svg", alt: "Omega – Bienne 1848" },
    { src: "/icons/iwc.svg", alt: "IWC Schaffhausen – Probus Scafusia" },
    { src: "/icons/zenith.svg", alt: "Zenith – Le Locle 1865 · El Primero" },
    { src: "/icons/chopard.svg", alt: "Chopard – Manufacture L.U.C Genève" },
    { src: "/icons/tag-heuer.svg", alt: "TAG Heuer – Swiss Avant-Garde 1860" },
    { src: "/icons/swiss-made.svg", alt: "Swiss Made – Label Fédéral Officiel" },
  ];

  return (
    <footer className="bg-[#08090c] text-gray-300 border-t border-slate-800/80 pt-12 pb-8 px-4 sm:px-6 relative overflow-hidden">
      {/* Animation CSS optimisée avec transform3d pour une fluidité 60 FPS sur mobile */}
      <style>{`
        @keyframes marqueeInfinite {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .animate-marquee-smooth {
          display: flex;
          width: max-content;
          will-change: transform;
          animation: marqueeInfinite 32s linear infinite;
        }
        .animate-marquee-smooth:hover {
          animation-play-state: paused;
        }
        .mask-fade-luxury {
          mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
        }
      `}</style>

      {/* Halo d'ambiance dorée Haute Horlogerie (dégradé radial CSS natif à 0 ms de calcul GPU) */}
      <div 
        className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-32 pointer-events-none rounded-full opacity-60" 
        style={{ background: 'radial-gradient(ellipse at center, rgba(245, 158, 11, 0.08) 0%, transparent 70%)' }}
      />

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
                loading="lazy"
                decoding="async"
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
                  Contact & Échange
                </Link>
              </li>
            </ul>
          </div>

          {/* Sceau d'authenticité & Soutien */}
          <div className="flex flex-col items-center md:items-end justify-center gap-2">
            <p className="text-sm font-medium text-gray-400">
              &copy; {new Date().getFullYear()} HorloLearn. Tous droits réservés.
            </p>
            <p className="text-xs text-gray-500">
              Conçu avec rigueur horlogère genevoise.
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] text-amber-400/90 mt-2">
              <span>Genève &bull; Suisse</span>
            </div>

            {/* Soutien d'Atelier / Café Horloger */}
            <a
              href="https://www.paypal.com/donate/?business=contact.horlogeries@gmail.com&currency_code=CHF&item_name=Soutien+a+l+Atelier+HorloLearn"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/15 via-amber-500/20 to-amber-500/10 hover:from-amber-500/25 hover:to-amber-500/20 border border-amber-500/40 hover:border-amber-400 text-xs font-semibold text-amber-300 hover:text-white transition-all duration-300 shadow-sm mt-2 group"
              title="Soutenir la transmission du savoir-faire horloger suisse"
            >
              <span className="text-sm group-hover:scale-110 transition-transform">☕</span>
              <span>Offrir un café à l'établi</span>
              <span className="text-[10px] text-amber-400/80 font-normal pl-1.5 border-l border-amber-500/30">Soutenir</span>
            </a>
          </div>
        </div>

        {/* VITRINE DE HAUTE HORLOGERIE : LES GRANDES MAISONS & STANDARDS SUISSES */}
        <div className="relative rounded-2xl bg-gradient-to-b from-slate-900/80 via-slate-950/90 to-[#08090c] border border-slate-800/80 p-6 sm:p-7 shadow-2xl overflow-hidden">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 mb-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase text-amber-400 font-mono">
                Manufactures & Sceaux d'Excellence
              </span>
            </div>
            <h4 className="text-xs sm:text-sm font-bold text-white tracking-[0.25em] uppercase font-serif">
              Hommage aux Grandes Maisons de Haute Horlogerie Suisse
            </h4>
          </div>

          {/* Carrousel infini fluide avec dégradé d'ombre latéral */}
          <div className="relative overflow-hidden mask-fade-luxury py-2">
            <div className="animate-marquee-smooth flex items-center gap-5">
              {/* Premier groupe de logos d'élite */}
              <div className="flex items-center gap-5 shrink-0">
                {icons.map((icon, i) => (
                  <div
                    key={`icon-1-${i}`}
                    title={icon.alt}
                    className="group flex items-center justify-center h-16 w-40 px-3 py-2 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/60 shadow-lg hover:shadow-amber-500/10 transition-all duration-300 hover:scale-105 backdrop-blur-sm cursor-pointer"
                  >
                    <img
                      src={icon.src}
                      alt={icon.alt}
                      width={128}
                      height={50}
                      loading="lazy"
                      decoding="async"
                      className="max-h-12 max-w-[128px] object-contain transition-opacity duration-300 group-hover:brightness-110"
                    />
                  </div>
                ))}
              </div>

              {/* Deuxième groupe identique pour boucle infinie parfaite */}
              <div className="flex items-center gap-5 shrink-0">
                {icons.map((icon, i) => (
                  <div
                    key={`icon-2-${i}`}
                    title={icon.alt}
                    className="group flex items-center justify-center h-16 w-40 px-3 py-2 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/60 shadow-lg hover:shadow-amber-500/10 transition-all duration-300 hover:scale-105 backdrop-blur-sm cursor-pointer"
                  >
                    <img
                      src={icon.src}
                      alt={icon.alt}
                      width={128}
                      height={50}
                      loading="lazy"
                      decoding="async"
                      className="max-h-12 max-w-[128px] object-contain transition-opacity duration-300 group-hover:brightness-110"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 text-center">
            <p className="text-xs text-slate-500 tracking-wider font-mono">
              Genève · Vallée de Joux · Schaffhouse · Bienne · Le Locle · La Chaux-de-Fonds
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
