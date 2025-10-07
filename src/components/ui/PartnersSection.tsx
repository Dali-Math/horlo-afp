"use client";
import Image from "next/image";
import { useRef } from "react";

const logos = [
  { name: "Rolex", logo: "/images/partners/rolex.png" },
  { name: "Patek Philippe", logo: "/images/partners/patek.png" },
  { name: "Audemars Piguet", logo: "/images/partners/audemars.png" },
  { name: "Vacheron Constantin", logo: "/images/partners/vacheron.png" },
  { name: "Piaget", logo: "/images/partners/piaget.png" },
  { name: "Chopard", logo: "/images/partners/chopard.png" },
  { name: "Franck Muller", logo: "/images/partners/muller.png" },
];

export default function PartnersInfiniteCarousel() {
  // On double la liste pour l'effet seamless infini
  const logosLoop = [...logos, ...logos];

  return (
    <section className="relative py-20 bg-[#0A0A0A] overflow-hidden">
      <h2 className="text-center text-4xl md:text-6xl font-bebas tracking-wide text-[#E2B44F] mb-14 drop-shadow-[0_0_25px_rgba(226,180,79,0.4)]">
        Avec le soutien des grandes maisons horlogères
      </h2>
      {/* Bandeau défilant infini */}
      <div className="relative w-full overflow-x-hidden">
        <div
          className="flex gap-14 animate-carousel whitespace-nowrap"
          style={{
            animation: "carousel 24s linear infinite",
          }}
        >
          {logosLoop.map((partner, i) => (
            <div
              key={`${partner.name}-${i}`}
              className="inline-flex flex-col items-center justify-center min-w-[140px] max-w-[160px]"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={140}
                height={60}
                className="object-contain opacity-90 hover:opacity-100 transition duration-500 drop-shadow-[0_0_12px_rgba(226,180,79,0.2)]"
                unoptimized
              />
              <span className="mt-2 text-xs text-gray-400 text-center">
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* Légende */}
      <p className="mt-12 text-center text-sm text-slate-400">
        Ressources gratuites et open-source pour la formation en horlogerie.
      </p>
      {/* Ajoute dans ton globals.css : */}
      {/* 
      @keyframes carousel {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      */}
    </section>
  );
}
