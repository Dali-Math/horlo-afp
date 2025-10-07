"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";

export default function PartnersSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const partners = [
    { name: "Rolex", logo: "/images/partners/rolex.png" },
    { name: "Patek Philippe", logo: "/images/partners/patek.png" },
    { name: "Audemars Piguet", logo: "/images/partners/audemars.png" },
    { name: "Vacheron Constantin", logo: "/images/partners/vacheron.png" },
    { name: "Piaget", logo: "/images/partners/piaget.png" },
    { name: "Chopard", logo: "/images/partners/chopard.png" },
    { name: "Franck Muller", logo: "/images/partners/muller.png" },
  ];

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const clone = container.innerHTML;
    container.innerHTML += clone;
  }, []);

  return (
    <section className="relative py-20 bg-[#0A0A0A] overflow-hidden">
      {/* Halo doré */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[800px] h-[800px] bg-[#E2B44F]/10 rounded-full blur-[150px]" />
      </div>

      {/* Titre */}
      <h2 className="text-center text-4xl md:text-6xl font-bebas tracking-wider text-[#E2B44F] mb-14 drop-shadow-[0_0_30px_rgba(226,180,79,0.5)]">
        Avec le soutien des grandes maisons horlogères
      </h2>

      {/* Logos défilants */}
      <div className="overflow-hidden">
        <div ref={scrollRef} className="flex gap-16 animate-loop">
          {partners.map((partner, i) => (
            <div
              key={i}
              className="flex-shrink-0 flex flex-col items-center justify-center group relative"
            >
              <div className="relative transition-transform duration-[1200ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:z-50">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={120}
                  height={120}
                  unoptimized
                  className="object-contain opacity-85 transition-transform duration-[1200ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-[30] group-hover:opacity-100 group-hover:drop-shadow-[0_0_180px_rgba(226,180,79,1)]"
                />
                {/* Fond doré au survol */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-40 group-hover:blur-3xl transition duration-700 bg-[#E2B44F]/40 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-12 text-center text-sm text-slate-400">
        Ressources gratuites et open-source pour la formation en horlogerie.
      </p>

      <style jsx global>{`
        @keyframes loop {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-loop {
          animation: loop 40s linear infinite;
          width: max-content;
          will-change: transform;
        }
      `}</style>
    </section>
  );
}
