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
        <div className="w-[700px] h-[700px] bg-[#E2B44F]/10 rounded-full blur-[120px]" />
      </div>

      {/* Titre */}
      <h2 className="text-center text-4xl md:text-6xl font-bebas tracking-wider text-[#E2B44F] mb-14 drop-shadow-[0_0_25px_rgba(226,180,79,0.5)]">
        Avec le soutien des grandes maisons horlogères
      </h2>

      {/* Logos défilants */}
      <div className="overflow-hidden">
        <div ref={scrollRef} className="flex gap-16 animate-loop">
          {partners.map((partner, i) => (
            <div
              key={i}
              className="flex-shrink-0 flex flex-col items-center justify-center group"
            >
              <div className="relative transition-transform duration-700 ease-out group-hover:z-50">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={120}
                  height={120}
                  unoptimized
                  className="object-contain opacity-85 transition-transform duration-700 ease-out group-hover:scale-[4.5] group-hover:opacity-100 drop-shadow-[0_0_20px_rgba(226,180,79,0.4)] group-hover:drop-shadow-[0_0_60px_rgba(226,180,79,0.8)]"
                />
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
