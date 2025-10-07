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

      {/* Carrousel infini */}
      <div className="relative w-full overflow-hidden">
        <div className="flex w-max animate-marquee">
          {[...partners, ...partners].map((partner, i) => (
            <div
              key={i}
              className="flex-shrink-0 mx-12 flex flex-col items-center"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={120}
                height={120}
                unoptimized
                className="object-contain opacity-85 hover:opacity-100 transition duration-500 drop-shadow-[0_0_15px_rgba(226,180,79,0.3)]"
              />
            </div>
          ))}
        </div>
        {/* Deuxième bande collée pour continuité */}
        <div className="flex w-max animate-marquee2 absolute top-0 left-0">
          {[...partners, ...partners].map((partner, i) => (
            <div
              key={`dup-${i}`}
              className="flex-shrink-0 mx-12 flex flex-col items-center"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={120}
                height={120}
                unoptimized
                className="object-contain opacity-85 hover:opacity-100 transition duration-500 drop-shadow-[0_0_15px_rgba(226,180,79,0.3)]"
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
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes marquee2 {
          0% {
            transform: translateX(50%);
          }
          100% {
            transform: translateX(0);
          }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-marquee2 {
          animation: marquee2 40s linear infinite;
        }
      `}</style>
    </section>
  );
}
