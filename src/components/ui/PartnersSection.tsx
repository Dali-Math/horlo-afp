"use client";
import Image from "next/image";

export default function PartnersSection() {
  const partners = [
    { name: "Rolex", logo: "/images/partners/rolex.png" },
    { name: "Patek Philippe", logo: "/images/partners/patek.png" },
    { name: "Audemars Piguet", logo: "/images/partners/audemars.png" },
    { name: "Vacheron Constantin", logo: "/images/partners/vacheron.png" },
    { name: "Piaget", logo: "/images/partners/piaget.png" },
    { name: "Chopard", logo: "/images/partners/chopard.png" },
    { name: "Franck Muller", logo: "/images/partners/muller.png" },
  ];

  // On répète plusieurs fois les logos pour boucler visuellement
  const repeated = [...partners, ...partners, ...partners];

  return (
    <section className="relative py-20 bg-[#0A0A0A] overflow-hidden">
      {/* Halo décoratif */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[700px] h-[700px] bg-[#E2B44F]/10 rounded-full blur-[120px]" />
      </div>

      {/* Titre */}
      <h2 className="text-center text-4xl md:text-6xl font-bebas tracking-wider text-[#E2B44F] mb-14 drop-shadow-[0_0_25px_rgba(226,180,79,0.5)]">
        Avec le soutien des grandes maisons horlogères
      </h2>

      {/* Bande défilante infinie */}
      <div className="relative w-full overflow-hidden">
        <div className="flex items-center justify-center gap-16 animate-scroll whitespace-nowrap">
          {repeated.map((partner, i) => (
            <div key={i} className="flex-shrink-0 flex flex-col items-center">
              <Image
                src={partner.logo}
                alt={partner.name}
                width={120}
                height={120}
                unoptimized
                className="object-contain opacity-80 hover:opacity-100 transition duration-500 drop-shadow-[0_0_15px_rgba(226,180,79,0.3)]"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Légende */}
      <p className="mt-12 text-center text-sm text-slate-400">
        Ressources gratuites et open-source pour la formation en horlogerie.
      </p>

      <style jsx global>{`
        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-33.333%);
          }
        }

        .animate-scroll {
          animation: scroll 30s linear infinite;
          display: inline-flex;
        }
      `}</style>
    </section>
  );
}
