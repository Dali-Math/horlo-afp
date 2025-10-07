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
    <section className="relative flex flex-col items-center justify-center py-32 bg-[#0A0A0A] overflow-hidden">
      {/* Halo doré */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[700px] h-[700px] bg-[#E2B44F]/10 rounded-full blur-[120px]" />
      </div>

      {/* Titre au centre */}
      <h2 className="text-center text-4xl md:text-6xl font-bebas tracking-wide text-[#E2B44F] mb-24 drop-shadow-[0_0_25px_rgba(226,180,79,0.4)] z-10">
        Avec le soutien des grandes maisons horlogères
      </h2>

      {/* Conteneur du cercle */}
      <div className="relative w-[500px] h-[500px]">
        <div className="absolute inset-0 animate-orbit">
          {partners.map((partner, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2"
              style={{
                transform: `rotate(${(360 / partners.length) * i}deg) translateX(200px) rotate(-${(360 / partners.length) * i}deg)`,
                transformOrigin: "center center",
              }}
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={100}
                height={100}
                unoptimized
                className="object-contain opacity-90 hover:opacity-100 transition duration-500 drop-shadow-[0_0_12px_rgba(226,180,79,0.25)]"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Légende */}
      <p className="mt-14 text-center text-sm text-slate-400">
        Ressources gratuites et open-source pour la formation en horlogerie.
      </p>

      <style jsx global>{`
        @keyframes orbit {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-orbit {
          animation: orbit 40s linear infinite;
          transform-origin: center center;
        }
      `}</style>
    </section>
  );
}
